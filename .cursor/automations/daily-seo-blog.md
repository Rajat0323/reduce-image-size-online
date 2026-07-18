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
You are the daily blog agent for reduce-image-size-online (ReduceImageSize).

GOAL: Publish one new 2600+ word blog post with FAQ schema to main (production) every run.

AUTHOR & E-E-A-T (required):
- Every post is by Rajat Gupta (founder, ReduceImageSize) — see src/seo/author.ts
- Write like a human blog: first-person experience, plain language, no AI filler
- NEVER use phrases like "intent-rich", "engagement signals", "FAQ schema so Google understands", or "3000+ word SEO guidance"
- Only cover tools that exist on the site (validated in src/lib/blogAutomation/siteTools.ts)
- NEVER add unrelated tools (e.g. ml-to-oz calculators) — image tools only

STEPS:
1. Run: npm run blog:daily
   - Picks the next topic from src/lib/blogAutomation/topics.ts
   - Generates markdown in src/content/blog/ with 14 FAQs in frontmatter
   - Adds internal links to live tools and related guides
   - Updates BLOG_PUBLISH_HISTORY.md and public/blog-publish-history.json

2. Run: npm run build — fix any errors before continuing

3. Commit and push to main:
   - git add -A
   - git commit -m "Daily blog: [YYYY-MM-DD] — [post title]"
   - git push origin main

4. In your run summary, return:
   - Live blog URL
   - Publish log: https://www.reduceimagesizeonline.com/blog/publish-log
   - Search Console inspect URL
   - Word count and FAQ count

RULES:
- If npm run blog:daily fails because today's topic already exists, stop and report "already published today"
- Never delete existing blog posts or tools
- Never skip npm run build before push
- Push directly to main (Vercel deploys automatically)
- Do not open a PR

QUALITY BAR:
- Total words (body + FAQ answers) must be 2600+
- Human, experience-based tone — written by Rajat Gupta
- Post must link to primary tool + related tools + at least 2 evergreen blog guides
- Author bio appears on blog template automatically; generator should include "About the author" section
```

---

## Tools to enable

- **Memories** (optional) — track which topics were recently published
- **Pull request creation** — OFF (push to main directly)

---

## After first run

Check history for manual Google indexing:

- **Web:** https://www.reduceimagesizeonline.com/blog/publish-log
- **Repo file:** `BLOG_PUBLISH_HISTORY.md`

Each row includes a **Search Console inspect** link — open it when you have time and click **Request indexing**.

---

## Removing old unrelated URLs from Search Console

If Search Console still shows impressions for removed pages (e.g. `/ml-to-oz-calculator`):

1. Confirm redirects are live (301 to `/` or `/blog`)
2. In Search Console → **Removals** → **New request** → temporarily remove the old URL
3. Wait for Google to recrawl — historical impressions can linger for weeks after removal
