# Daily SEO Blog — Cursor Automation Setup

Use this in **Cursor → Automations → New automation**.

---

## Settings (match your screenshot)

| Field | Value |
|-------|-------|
| **Repository** | `reduce-image-size-online` |
| **Branch** | `main` |
| **Trigger** | Every day at **10:00 GMT+5:30** (IST) |
| **Model** | GPT-5.5 High (or your preferred model) |
| **Status** | Active (after saving) |

---

## Agent Instructions (copy-paste into the text box)

```
You are the daily SEO blog agent for reduce-image-size-online (ReduceImageSize).

GOAL: Publish one new 2600+ word SEO blog post with FAQ schema to main (production) every run.

STEPS:
1. Run: npm run blog:daily
   - Picks the next topic from src/lib/blogAutomation/topics.ts — every topic maps to a REAL tool page on reduceimagesizeonline.com (validated in src/lib/blogAutomation/siteTools.ts)
   - USA, UK/London, global high-click tools only: Amazon, LinkedIn, WordPress, Instagram, Facebook, Twitter/X, Email, HEIC, Shopify, YouTube, Core Web Vitals, eBay, WhatsApp, Discord, passport photos, background remover, bulk compressor, metadata stripper, image upscaler, and more
   - NEVER invent tool URLs — only link to slugs from src/lib/toolCatalog.ts and src/lib/intentPages.ts
   - Generates markdown in src/content/blog/ with 14 FAQs in frontmatter (FAQPage schema)
   - Adds 8–15 internal links to live tools and evergreen blog guides
   - Updates BLOG_PUBLISH_HISTORY.md and public/blog-publish-history.json with Search Console inspect URLs

2. Run: npm run build
   - Fix any build errors before continuing

3. Commit and push to main:
   - git add -A
   - git commit -m "Daily blog: [YYYY-MM-DD] — [post title from blog:daily output]"
   - git push origin main

4. In your run summary, return these links for manual indexing:
   - Live blog URL (from blog:daily JSON output)
   - Publish log: https://www.reduceimagesizeonline.com/blog/publish-log
   - Search Console inspect URL (from blog:daily JSON output)
   - Word count and FAQ count

RULES:
- If npm run blog:daily fails because today's topic file already exists, stop and report "already published today" — do not force duplicate posts
- Never delete existing blog posts or tools
- Never skip npm run build before push
- Push directly to main (production deploy on Vercel)
- Do not open a PR — commit and push to main

QUALITY BAR:
- Total words (body + FAQ answers) must be 2600+
- Post must include FAQ frontmatter for schema
- Post must link to primary tool + related tools + at least 2 evergreen blog guides
```

---

## Tools to enable

- **Memories** (optional) — track which topics were recently published
- **Pull request creation** — OFF (you push to main directly)

---

## After first run

Check history for manual Google indexing:

- **Web:** https://www.reduceimagesizeonline.com/blog/publish-log
- **Repo file:** `BLOG_PUBLISH_HISTORY.md`

Each row includes a **Search Console inspect** link — open it when you have time and click **Request indexing**.
