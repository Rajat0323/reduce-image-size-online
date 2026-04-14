from contextlib import asynccontextmanager

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from slugify import slugify

from app.config import settings
from app.db import Base, engine, get_db
from app.models import Article, InternalLink, Keyword
from app.schemas import (
    ArticleResponse,
    CompetitorAnalysisRequest,
    CompetitorAnalysisResponse,
    ContentDraftResponse,
    ContentGenerationRequest,
    KeywordGenerateRequest,
    KeywordResponse,
    ManualPipelineRequest,
    ManualPipelineResponse,
    PublishRequest,
    RankingResponse,
    RankingSyncResponse,
)
from app.services.competitor_analysis import CompetitorAnalysisService
from app.services.content_pipeline import (
    ContentGenerationService,
    InternalLinkingService,
    PublishingService,
    RankingService,
    SeoOptimizationService,
)
from app.services.keyword_discovery import KeywordDiscoveryService


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

allowed_origins = ["http://localhost:3000"]
if settings.next_frontend_url:
    allowed_origins.append(settings.next_frontend_url.rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(dict.fromkeys(allowed_origins)),
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

keyword_service = KeywordDiscoveryService()
analysis_service = CompetitorAnalysisService()
content_service = ContentGenerationService()
optimization_service = SeoOptimizationService()
internal_link_service = InternalLinkingService()
publishing_service = PublishingService()
ranking_service = RankingService()


@app.get("/health")
def healthcheck() -> dict:
    return {"status": "ok"}


@app.post("/keywords/generate", response_model=list[KeywordResponse])
def generate_keywords(payload: KeywordGenerateRequest, db: Session = Depends(get_db)):
    generated = keyword_service.generate(
        seed_keyword=payload.seed_keyword,
        niche=payload.niche,
        country=payload.country,
        max_results=payload.max_results,
    )

    created: list[Keyword] = []
    for item in generated:
        existing = db.scalar(select(Keyword).where(Keyword.keyword == item["keyword"]))
        if existing:
            created.append(existing)
            continue
        keyword = Keyword(**item)
        db.add(keyword)
        db.flush()
        created.append(keyword)

    db.commit()
    return created


@app.post("/analyze", response_model=CompetitorAnalysisResponse)
def analyze_keyword(payload: CompetitorAnalysisRequest):
    return analysis_service.analyze(payload.keyword, payload.country)


@app.post("/generate-content", response_model=ContentDraftResponse)
def generate_content(payload: ContentGenerationRequest, db: Session = Depends(get_db)):
    analysis = analysis_service.analyze(payload.keyword, payload.country)
    draft = content_service.generate(payload.keyword, analysis, payload.target_word_count)
    optimized = optimization_service.optimize(
        title=draft["title"],
        meta_title=draft["meta_title"],
        meta_description=draft["meta_description"],
        content_markdown=draft["content_markdown"],
        slug=draft["slug"],
    )
    content_with_links, _ = internal_link_service.inject_links(db, optimized["content_markdown"])

    return {
        "title": draft["title"],
        "meta_title": optimized["meta_title"],
        "meta_description": optimized["meta_description"],
        "slug": draft["slug"],
        "outline": draft["outline"],
        "content_markdown": content_with_links,
        "schema_json": optimized["schema_json"],
    }


@app.post("/pipeline/manual-run", response_model=ManualPipelineResponse)
def manual_run_pipeline(payload: ManualPipelineRequest, db: Session = Depends(get_db)):
    generated = keyword_service.generate(
        seed_keyword=payload.seed_keyword,
        niche=payload.niche,
        country=payload.country,
        max_results=payload.max_results,
    )

    created: list[Keyword] = []
    for item in generated:
        existing = db.scalar(select(Keyword).where(Keyword.keyword == item["keyword"]))
        if existing:
            created.append(existing)
            continue
        keyword = Keyword(**item)
        db.add(keyword)
        db.flush()
        created.append(keyword)

    published_articles = []
    for keyword in created[: payload.publish_count]:
        analysis = analysis_service.analyze(keyword.keyword, keyword.country)
        draft = content_service.generate(keyword.keyword, analysis, payload.target_word_count)
        optimized = optimization_service.optimize(
            title=draft["title"],
            meta_title=draft["meta_title"],
            meta_description=draft["meta_description"],
            content_markdown=draft["content_markdown"],
            slug=draft["slug"],
        )

        article = publishing_service.publish(
            db,
            {
                "keyword": keyword.keyword,
                "title": draft["title"],
                "slug": draft["slug"],
                "summary": f"Manual pipeline article for {keyword.keyword}",
                "meta_title": optimized["meta_title"],
                "meta_description": optimized["meta_description"],
                "content_markdown": optimized["content_markdown"],
                "schema_json": optimized["schema_json"],
                "status": "published",
                "outline": draft["outline"],
            },
        )

        content_with_links, links = internal_link_service.inject_links(db, article.content_markdown, article.slug)
        article.content_markdown = content_with_links
        publishing_service.reset_internal_links(db, article.id)
        for link in links:
            db.add(InternalLink(source_id=article.id, target_id=link["target_id"], anchor_text=link["anchor_text"]))

        keyword.status = "published"
        published_articles.append(
            {
                "keyword": keyword.keyword,
                "article_id": article.id,
                "title": article.title,
                "slug": article.slug,
                "status": article.status,
            }
        )

    db.commit()

    rankings_sync = None
    if payload.sync_rankings:
        rankings_sync = ranking_service.sync_rankings(db)

    return {
        "discovered_keywords": [keyword.keyword for keyword in created],
        "published_articles": published_articles,
        "rankings_sync": rankings_sync,
    }


@app.post("/publish", response_model=ArticleResponse)
def publish_article(payload: PublishRequest, db: Session = Depends(get_db)):
    slug = slugify(payload.slug or payload.title)
    article = publishing_service.publish(
        db,
        {
            "keyword": payload.keyword,
            "title": payload.title,
            "slug": slug,
            "summary": payload.summary,
            "meta_title": payload.meta_title,
            "meta_description": payload.meta_description,
            "content_markdown": payload.content_markdown,
            "schema_json": payload.schema_json,
            "status": payload.status,
            "outline": payload.outline,
        },
    )

    content_with_links, links = internal_link_service.inject_links(db, article.content_markdown, article.slug)
    article.content_markdown = content_with_links
    db.flush()

    publishing_service.reset_internal_links(db, article.id)
    for link in links:
        db.add(InternalLink(source_id=article.id, target_id=link["target_id"], anchor_text=link["anchor_text"]))

    db.commit()
    db.refresh(article)
    return article


@app.get("/rankings", response_model=list[RankingResponse])
def get_rankings(db: Session = Depends(get_db)):
    rankings = ranking_service.list_rankings(db)
    return [
        {
            "keyword": ranking.keyword.keyword if ranking.keyword else "",
            "position": ranking.position,
            "impressions": ranking.impressions,
            "clicks": ranking.clicks,
            "ctr": ranking.ctr,
            "date": ranking.date,
        }
        for ranking in rankings
    ]


@app.post("/rankings/sync", response_model=RankingSyncResponse)
def sync_rankings(db: Session = Depends(get_db)):
    return ranking_service.sync_rankings(db)


@app.get("/articles", response_model=list[ArticleResponse])
def list_articles(db: Session = Depends(get_db)):
    articles = db.scalars(select(Article).order_by(Article.published_at.desc().nullslast())).all()
    return articles


@app.get("/articles/{slug}", response_model=ArticleResponse)
def get_article(slug: str, db: Session = Depends(get_db)):
    article = db.scalar(select(Article).where(Article.slug == slug))
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
