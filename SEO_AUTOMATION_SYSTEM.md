# SEO Automation System

This repository now includes a production-style scaffold for a fully automated SEO content ranking system.

## Folder Structure

```text
backend/
  app/
    config.py
    db.py
    main.py
    models.py
    schemas.py
    tasks.py
    services/
      competitor_analysis.py
      content_pipeline.py
      keyword_discovery.py
  scripts/
    run_pipeline.py
  .env.example
  Dockerfile
  requirements.txt

src/
  app/
    admin/seo/
      page.tsx
      articles/
        page.tsx
        [slug]/page.tsx
    articles/
      page.tsx
      [slug]/page.tsx
  lib/
    seoAutomationApi.ts

docker-compose.seo-system.yml
SEO_AUTOMATION_SYSTEM.md
```

## Backend Capabilities

- `POST /keywords/generate`
- `POST /analyze`
- `POST /generate-content`
- `POST /publish`
- `GET /rankings`
- `GET /articles`
- `GET /articles/{slug}`

## Database Models

- `keywords`
- `articles`
- `rankings`
- `internal_links`

## Automation Flow

1. Discover keywords from a seed keyword
2. Analyze competitors for the selected keyword
3. Generate a draft article
4. Optimize metadata and schema
5. Inject internal links from existing published articles
6. Publish to the database
7. Expose article data to the Next.js frontend

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Example Pipeline

```bash
python -m backend.scripts.run_pipeline
```

### Docker

```bash
docker compose -f docker-compose.seo-system.yml up --build
```

## Frontend Pages

- `/admin/seo`
- `/admin/seo/articles`
- `/admin/seo/articles/[slug]`
- `/articles`
- `/articles/[slug]`

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in real secrets there. Do not commit `backend/.env`.

Important values:

- `DATABASE_URL`
- `REDIS_URL`
- `OPENAI_API_KEY`
- `GROQ_API_KEY`
- `GROQ_MODEL`
- `GOOGLE_SEARCH_CONSOLE_CREDENTIALS_JSON`
- `GOOGLE_SEARCH_CONSOLE_SITE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `SERP_API_KEY`
- `DATAFORSEO_LOGIN`
- `DATAFORSEO_PASSWORD`
- `NEXT_PUBLIC_SEO_API_BASE_URL`

## Notes

- The keyword discovery and competitor analysis services are written as production-ready adapters with safe fallback logic, so you can swap in real APIs without rewriting the app structure.
- The content generation layer currently uses structured service boundaries, making it easy to connect Groq or OpenAI calls next.
- The Celery worker scaffold is included for daily automation jobs.
