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
        if generated:
            return generated

        outline = [
            f"Introduction to {keyword}",
            "What users need to know",
            "Competitor gaps and opportunities",
            "Step-by-step strategy",
            "Examples and FAQs",
            "Internal resources and next steps",
        ]
        title = f"{keyword.title()}: Complete Guide for 2026"
        meta_title = f"{keyword.title()} Guide | Better Than Competitors"
        meta_description = (
            f"Learn {keyword} with a clear, SEO-focused guide covering examples, FAQs, and practical next steps."
        )
        content_markdown = "\n\n".join(
            [
                f"# {title}",
                f"This article targets **{keyword}** with a deeper structure than the current top pages.",
                "## What you will learn\n\n- Search intent\n- Competitor gaps\n- Better structure\n- FAQs\n- Internal linking placeholders",
                "## Competitor insights\n\n"
                f"- Average word count: {competitor_insights['avg_word_count']}\n"
                f"- Keyword density: {competitor_insights['keyword_density']}\n"
                f"- Top URLs: {', '.join(competitor_insights['top_ranking_urls'])}",
                "## Better content plan\n\n"
                "Write for clarity, solve the exact query quickly, and then expand with richer examples, FAQs, and linked support content.",
                "## FAQ\n\n### What makes this article rank?\n\nDepth, clarity, search intent alignment, and internal linking.",
                "## Related reading\n\n[[INTERNAL_LINKS]]",
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
            "meta_title": meta_title[:60],
            "meta_description": meta_description[:155],
            "slug": slugify(keyword),
            "outline": outline,
            "content_markdown": content_markdown,
            "schema_json": schema_json,
        }

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
            article.status = payload.get("status", "published")
            article.published_at = datetime.utcnow()
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
                status=payload.get("status", "published"),
                published_at=datetime.utcnow(),
                keyword_id=keyword.id,
            )
            db.add(article)

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
