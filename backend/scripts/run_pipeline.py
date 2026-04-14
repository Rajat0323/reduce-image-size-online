from app.db import Base, engine, SessionLocal
from app.models import Keyword
from app.services.competitor_analysis import CompetitorAnalysisService
from app.services.content_pipeline import (
    ContentGenerationService,
    InternalLinkingService,
    PublishingService,
    SeoOptimizationService,
)
from app.services.keyword_discovery import KeywordDiscoveryService


def main() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        service = KeywordDiscoveryService()
        keywords = service.generate("seo content automation", "saas", "US", 5)
        if not db.query(Keyword).first():
            for item in keywords:
                db.add(Keyword(**item))
            db.commit()

        keyword = db.query(Keyword).first()
        analysis = CompetitorAnalysisService().analyze(keyword.keyword, keyword.country)
        draft = ContentGenerationService().generate(keyword.keyword, analysis, 2200)
        optimized = SeoOptimizationService().optimize(
            title=draft["title"],
            meta_title=draft["meta_title"],
            meta_description=draft["meta_description"],
            content_markdown=draft["content_markdown"],
            slug=draft["slug"],
        )
        linked_content, _ = InternalLinkingService().inject_links(db, optimized["content_markdown"])

        article = PublishingService().publish(
            db,
            {
                "keyword": keyword.keyword,
                "title": draft["title"],
                "slug": draft["slug"],
                "summary": f"Example pipeline output for {keyword.keyword}",
                "meta_title": optimized["meta_title"],
                "meta_description": optimized["meta_description"],
                "content_markdown": linked_content,
                "schema_json": optimized["schema_json"],
                "status": "published",
                "outline": draft["outline"],
            },
        )
        db.commit()
        print(f"Published article: {article.slug}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
