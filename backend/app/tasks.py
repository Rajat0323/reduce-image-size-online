from celery import Celery
from celery.schedules import crontab
from sqlalchemy import select

from app.config import settings
from app.db import SessionLocal
from app.models import Keyword
from app.services.competitor_analysis import CompetitorAnalysisService
from app.services.content_pipeline import (
    ContentGenerationService,
    InternalLinkingService,
    PublishingService,
    RankingService,
    SeoOptimizationService,
)

celery_app = Celery("seo_automation", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.beat_schedule = {
    "publish-one-article-daily": {
        "task": "seo.run_daily_pipeline",
        "schedule": crontab(hour=6, minute=0),
    },
    "sync-rankings-daily": {
        "task": "seo.sync_rankings",
        "schedule": crontab(hour=7, minute=0),
    },
}
celery_app.conf.timezone = "Asia/Calcutta"


@celery_app.task(name="seo.run_daily_pipeline")
def run_daily_pipeline() -> dict:
    db = SessionLocal()
    try:
      keyword = db.scalar(
          select(Keyword).where(Keyword.status.in_(["discovered", "approved"])).order_by(Keyword.created_at.asc())
      )
      if not keyword:
          return {"status": "skipped", "reason": "no keywords queued"}

      analysis = CompetitorAnalysisService().analyze(keyword.keyword, keyword.country)
      draft = ContentGenerationService().generate(keyword.keyword, analysis, 2200)
      optimized = SeoOptimizationService().optimize(
          title=draft["title"],
          meta_title=draft["meta_title"],
          meta_description=draft["meta_description"],
          content_markdown=draft["content_markdown"],
          slug=draft["slug"],
      )
      content_with_links, _ = InternalLinkingService().inject_links(db, optimized["content_markdown"])

      article = PublishingService().publish(
          db,
          {
              "keyword": keyword.keyword,
              "title": draft["title"],
              "slug": draft["slug"],
              "summary": f"Automated article for {keyword.keyword}",
              "meta_title": optimized["meta_title"],
              "meta_description": optimized["meta_description"],
              "content_markdown": content_with_links,
              "schema_json": optimized["schema_json"],
              "status": "published",
              "outline": draft["outline"],
          },
      )
      keyword.status = "published"
      db.commit()
      return {"status": "published", "article_slug": article.slug, "keyword": keyword.keyword}
    finally:
      db.close()


@celery_app.task(name="seo.sync_rankings")
def sync_rankings() -> dict:
    db = SessionLocal()
    try:
        return RankingService().sync_rankings(db)
    finally:
        db.close()
