import json
from datetime import datetime

import httpx
from slugify import slugify
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.config import settings
from app.models import Article, InternalLink, Keyword, Ranking


class ContentGenerationService:
    def generate(self, keyword: str, competitor_insights: dict, target_word_count: int) -> dict:
        generated = self._generate_with_groq(keyword, competitor_insights, target_word_count)
        if generated and self._word_count(generated["content_markdown"]) >= self._minimum_word_count(target_word_count):
            return generated
        return self._build_rich_fallback(keyword, competitor_insights, target_word_count)

    def _generate_with_groq(self, keyword: str, competitor_insights: dict, target_word_count: int) -> dict | None:
        if not settings.groq_api_key:
            return None

        prompt = f"""
You are an expert SEO editor. Return valid JSON only.

Keyword: {keyword}
Country: {competitor_insights.get('country', 'US')}
Target word count: {target_word_count}
Average competitor word count: {competitor_insights.get('avg_word_count')}
Competitor headings: {json.dumps(competitor_insights.get('headings_structure', {}))}
Top URLs: {json.dumps(competitor_insights.get('top_ranking_urls', []))}

Write content that is better than competitors, original, clear, and practical.
Return JSON with keys:
title, meta_title, meta_description, slug, outline, content_markdown, schema_json

Requirements:
- 2000-3000 words if possible
- H1 once, H2/H3 sections
- FAQ section
- Use [[INTERNAL_LINKS]] placeholder once
- Natural keyword usage, no stuffing
- Include practical use cases, comparison table, mistakes to avoid, and a final CTA section
- Write for humans first; avoid generic filler and obvious AI phrasing
- Meta title under 60 chars
- Meta description under 155 chars
""".strip()

        try:
            response = httpx.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.groq_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.groq_model,
                    "temperature": 0.4,
                    "messages": [
                        {"role": "system", "content": "You output valid minified JSON only."},
                        {"role": "user", "content": prompt},
                    ],
                    "response_format": {"type": "json_object"},
                },
                timeout=90.0,
            )
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"]
            payload = json.loads(content)
        except Exception:
            return None

        if not isinstance(payload, dict):
            return None

        title = (payload.get("title") or keyword.title()).strip()
        meta_title = (payload.get("meta_title") or title).strip()[:60]
        meta_description = (payload.get("meta_description") or f"Learn {keyword} clearly.").strip()[:155]
        slug = slugify(payload.get("slug") or keyword)
        outline = payload.get("outline") if isinstance(payload.get("outline"), list) else []
        content_markdown = (payload.get("content_markdown") or "").strip()
        schema_json = payload.get("schema_json") if isinstance(payload.get("schema_json"), dict) else {}

        if not content_markdown:
            return None

        return {
            "title": title,
            "meta_title": meta_title,
            "meta_description": meta_description,
            "slug": slug,
            "outline": outline,
            "content_markdown": content_markdown,
            "schema_json": schema_json or {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "datePublished": datetime.utcnow().date().isoformat(),
            },
        }

    def _build_rich_fallback(self, keyword: str, competitor_insights: dict, target_word_count: int) -> dict:
        title = self._build_title(keyword, competitor_insights.get("country", "US"))
        meta_title = self._build_meta_title(keyword)
        meta_description = self._build_meta_description(keyword, competitor_insights.get("country", "US"))
        slug = slugify(keyword)
        outline = [
            "Quick answer",
            "Why people search for this",
            "How to get the best result",
            "Best settings and quality tips",
            "Common mistakes",
            "Frequently asked questions",
            "Related tools",
        ]

        target_context = self._describe_country_context(competitor_insights.get("country", "US"))
        content_markdown = "\n\n".join(
            [
                f"# {title}",
                f"Compressing images for **{keyword}** is usually about matching a strict file-size limit while keeping text, faces, and document edges readable. {target_context}",
                "## Quick answer",
                f"If you need **{keyword}**, start with a JPG or WEBP image, reduce dimensions if the file is very large, and then lower quality in small steps until the final file lands close to the target size. Avoid over-compressing in one jump because that often creates blurry edges and muddy colors.",
                "## Why people search for this",
                f"People usually search for **{keyword}** when they are uploading a document, photo, signature, or application image to a website that rejects larger files. A good page should help users understand both the file-size target and the quality trade-off so they can upload successfully on the first try.",
                "## Who this is useful for",
                "- Job application uploads\n- Government and exam portals\n- Passport or profile photos\n- Mobile uploads on slower connections\n- Website owners trying to improve page speed",
                "## How to get the best result",
                "1. Start with the cleanest source image available.\n2. Resize the image before applying heavy compression.\n3. Choose the right format: JPG for photos, PNG for graphics with hard edges, WEBP when supported.\n4. Reduce quality gradually and compare readability after each change.\n5. Download the final file and verify the exact KB size before submitting.",
                "### Step-by-step workflow",
                "Start by checking the file size of your original image. If the file is many times larger than the target, resizing the width and height first often delivers a cleaner final result than pushing compression alone. After that, lower the quality in measured steps and test the file after each export so you can stop once the file clears the upload limit.",
                "### Real-world use cases",
                "For government and exam portals, readability matters more than perfect color detail. For passport or profile photos, facial edges and skin tone should stay natural. For website uploads, you usually want the smallest file that still looks crisp on common mobile screens. Thinking about the final use case first helps you make better compression decisions.",
                "## Best settings and quality tips",
                f"The top-ranking pages for this topic average about **{competitor_insights.get('avg_word_count', target_word_count)} words**, which shows that users want practical guidance rather than a one-line answer. For most uploads, the best balance comes from combining moderate resizing with moderate compression instead of pushing quality extremely low. This keeps facial details, logos, and text more readable.",
                "### Format tips",
                "- Use JPG for camera photos and scanned documents.\n- Use PNG only when transparency or sharp graphic edges matter.\n- Use WEBP for modern website uploads where smaller file sizes matter most.",
                "### Quality checklist before downloading",
                "- Zoom in on text, signatures, and fine edges.\n- Make sure faces still look natural and not over-smoothed.\n- Check that the background does not show heavy blocky compression.\n- Reconfirm the final file size after each export because some portals reject even slightly oversized files.",
                "### Before you upload",
                "- Check that the image is upright.\n- Confirm the file size target exactly.\n- Zoom in and verify text, signatures, and faces remain clear.\n- Keep a second copy at slightly higher quality in case the portal rejects the first attempt.",
                "## Common mistakes",
                "- Compressing the image multiple times in different tools\n- Starting with a blurry source file\n- Ignoring dimensions and changing only quality\n- Using PNG when JPG would create a much smaller file\n- Uploading without rechecking the final size",
                "### How to avoid failed uploads",
                "A surprising number of failed uploads happen because the image technically meets the target but has become unreadable. If the page asks for a profile photo, keep the subject centered and avoid aggressive crops. If the page asks for a document, leave enough contrast so that small text stays legible. A slightly larger but acceptable file is usually better than an unreadable one.",
                "## Practical comparison",
                "| Goal | Best first step | Why it helps |\n| --- | --- | --- |\n| Large photo file | Resize dimensions first | Removes unnecessary pixels before quality loss |\n| Document image | Use clear crop and moderate JPG quality | Keeps text readable |\n| Website speed | Convert to WEBP if supported | Better compression for modern browsers |\n| Form upload | Verify target KB after each change | Avoid repeated rejections |",
                "## When to resize before compressing",
                "If your image comes from a modern smartphone, the original dimensions are often far larger than any form or website really needs. Reducing an image from a very large width to a more realistic upload size can remove a huge amount of unnecessary data before you touch the quality slider. That usually produces a better-looking final file at the same target KB.",
                "## When to keep more quality",
                "If the image contains printed text, handwritten signatures, certificates, or screenshots, be conservative with compression. These image types show artifacts earlier than portrait photos. In those cases, cropping empty margins and slightly reducing dimensions often works better than lowering quality too far.",
                "## Frequently asked questions",
                f"### Can I get **{keyword}** without losing quality?\nSome quality loss is normal when the target is strict, but you can keep the result professional by resizing first and compressing gradually.",
                f"### Which format is best for **{keyword}**?\nFor most photos, JPG gives the best balance. PNG is better for graphics, but it can stay larger unless the image is very simple.",
                "### Why does my image become blurry?\nHeavy compression removes visual detail. Reduce dimensions before lowering quality too far.",
                "### Should I keep editing the same file again and again?\nNo. Always work from the original file so quality does not degrade across repeated exports.",
                "### What should I do if the portal still rejects the image?\nCheck whether the website also requires a specific dimension, aspect ratio, or file format. Some forms mention KB size but silently reject files that do not match their image rules.",
                "## Related tools",
                "[[INTERNAL_LINKS]]",
                "## Final recommendation",
                f"If your goal is **{keyword}**, focus on clarity first and size second. A file that meets the limit but looks unreadable will still fail the real task. Use a reliable compressor, verify the final size, and keep a backup version in case you need a small adjustment. When possible, save one version that comfortably meets the target and another slightly higher-quality backup so you can react quickly if the upload portal behaves inconsistently.",
                "## Next step",
                "Once the file is ready, upload it immediately and confirm that the site accepts it before closing your session. If you are working against a deadline, keep the original image and your compressed copy together in one folder so you can retry in seconds.",
            ]
        )
        schema_json = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "datePublished": datetime.utcnow().date().isoformat(),
        }
        return {
            "title": title,
            "meta_title": meta_title,
            "meta_description": meta_description,
            "slug": slug,
            "outline": outline,
            "content_markdown": content_markdown,
            "schema_json": schema_json,
        }

    def _build_title(self, keyword: str, country: str) -> str:
        if country.upper() == "IN":
            return f"{keyword.title()}: Complete Guide for India"
        return f"{keyword.title()}: Complete Guide"

    def _build_meta_title(self, keyword: str) -> str:
        short = keyword.title()
        if len(short) > 52:
            short = short[:49].rstrip() + "..."
        return short

    def _build_meta_description(self, keyword: str, country: str) -> str:
        suffix = "for free without losing quality."
        if country.upper() == "IN":
            suffix = "for India forms, uploads, and websites."
        description = f"Learn how to {keyword} {suffix}"
        return description[:155]

    def _describe_country_context(self, country: str) -> str:
        if country.upper() == "IN":
            return (
                "For India-focused workflows, this often matters for application forms, KYC uploads, "
                "government portals, and mobile users working with limited bandwidth."
            )
        return (
            "This is especially useful when a website sets hard file-size limits for uploads or when page speed matters."
        )

    def _word_count(self, content_markdown: str) -> int:
        return len([word for word in content_markdown.split() if word.strip()])

    def _minimum_word_count(self, target_word_count: int) -> int:
        return max(1100, min(target_word_count - 350, 1600))


class SeoOptimizationService:
    def optimize(self, title: str, meta_title: str, meta_description: str, content_markdown: str, slug: str) -> dict:
        breadcrumb_schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.reduceimagesizeonline.com"},
                {"@type": "ListItem", "position": 2, "name": title, "item": f"https://www.reduceimagesizeonline.com/articles/{slug}"},
            ],
        }
        faq_schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [],
        }
        return {
            "meta_title": meta_title[:60],
            "meta_description": meta_description[:155],
            "content_markdown": content_markdown.strip(),
            "schema_json": {
                "article": {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": title,
                },
                "faq": faq_schema,
                "breadcrumb": breadcrumb_schema,
            },
        }


class InternalLinkingService:
    def inject_links(self, db: Session, content_markdown: str, source_slug: str | None = None) -> tuple[str, list[dict]]:
        articles = db.scalars(select(Article).where(Article.status == "published").limit(5)).all()
        if not articles:
            return content_markdown.replace("[[INTERNAL_LINKS]]", ""), []

        replacements = []
        bullets = []
        for article in articles:
            if source_slug and article.slug == source_slug:
                continue
            anchor = article.title
            bullets.append(f"- [{anchor}](/articles/{article.slug})")
            replacements.append({"target_id": article.id, "anchor_text": anchor})

        return content_markdown.replace("[[INTERNAL_LINKS]]", "\n".join(bullets)), replacements


class PublishingService:
    def publish(self, db: Session, payload: dict) -> Article:
        keyword = db.scalar(select(Keyword).where(Keyword.keyword == payload["keyword"]))
        if not keyword:
            keyword = Keyword(keyword=payload["keyword"], country="US", status="published")
            db.add(keyword)
            db.flush()

        resolved_slug = slugify(payload.get("slug") or payload["title"])
        article = db.scalar(select(Article).where(Article.keyword_id == keyword.id))
        if not article:
            article = db.scalar(select(Article).where(Article.slug == resolved_slug))
        if not article:
            article = db.scalar(select(Article).where(Article.title == payload["title"]))

        status = payload.get("status", "draft")

        if article:
            article.title = payload["title"]
            article.slug = resolved_slug
            article.summary = payload.get("summary")
            article.meta_title = payload["meta_title"]
            article.meta_description = payload["meta_description"]
            article.schema_json = json.dumps(payload.get("schema_json") or {})
            article.outline = json.dumps(payload.get("outline") or [])
            article.content_markdown = payload["content_markdown"]
            article.content_html = None
            article.status = status
            article.published_at = datetime.utcnow() if status == "published" else None
            article.keyword_id = keyword.id
        else:
            article = Article(
                title=payload["title"],
                slug=resolved_slug,
                summary=payload.get("summary"),
                meta_title=payload["meta_title"],
                meta_description=payload["meta_description"],
                schema_json=json.dumps(payload.get("schema_json") or {}),
                outline=json.dumps(payload.get("outline") or []),
                content_markdown=payload["content_markdown"],
                content_html=None,
                status=status,
                published_at=datetime.utcnow() if status == "published" else None,
                keyword_id=keyword.id,
            )
            db.add(article)

        keyword.status = "published" if status == "published" else "approved"
        db.flush()
        return article

    def reset_internal_links(self, db: Session, source_id: int) -> None:
        db.execute(delete(InternalLink).where(InternalLink.source_id == source_id))


class RankingService:
    def list_rankings(self, db: Session) -> list[Ranking]:
        return db.scalars(select(Ranking).order_by(Ranking.date.desc()).limit(100)).all()

    def sync_rankings(self, db: Session) -> dict:
        from datetime import date

        from google.oauth2.credentials import Credentials
        from googleapiclient.discovery import build

        if not (
            settings.google_search_console_site_url
            and settings.google_client_id
            and settings.google_client_secret
            and settings.google_refresh_token
        ):
            return {"synced_keywords": 0, "records_written": 0, "source": "gsc_not_configured"}

        credentials = Credentials(
            token=None,
            refresh_token=settings.google_refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=settings.google_client_id,
            client_secret=settings.google_client_secret,
            scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
        )
        service = build("searchconsole", "v1", credentials=credentials, cache_discovery=False)

        keywords = db.scalars(select(Keyword).where(Keyword.status.in_(["discovered", "approved", "published"]))).all()
        if not keywords:
            return {"synced_keywords": 0, "records_written": 0, "source": "gsc"}

        today = date.today()
        records_written = 0
        for keyword in keywords:
            request = {
                "startDate": today.isoformat(),
                "endDate": today.isoformat(),
                "dimensions": ["query"],
                "dimensionFilterGroups": [
                    {
                        "filters": [
                            {
                                "dimension": "query",
                                "operator": "equals",
                                "expression": keyword.keyword,
                            }
                        ]
                    }
                ],
                "rowLimit": 1,
            }
            try:
                response = (
                    service.searchanalytics()
                    .query(siteUrl=settings.google_search_console_site_url, body=request)
                    .execute()
                )
            except Exception:
                continue

            row = (response.get("rows") or [None])[0]
            if not row:
                continue

            ranking = db.scalar(select(Ranking).where(Ranking.keyword_id == keyword.id, Ranking.date == today))
            if not ranking:
                ranking = Ranking(keyword_id=keyword.id, date=today)
                db.add(ranking)

            ranking.clicks = int(row.get("clicks") or 0)
            ranking.impressions = int(row.get("impressions") or 0)
            ranking.ctr = float(row.get("ctr") or 0)
            ranking.position = float(row.get("position") or 0)
            records_written += 1

        db.commit()
        return {"synced_keywords": len(keywords), "records_written": records_written, "source": "gsc"}
