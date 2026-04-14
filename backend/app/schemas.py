from datetime import date, datetime

from pydantic import BaseModel, Field


class KeywordGenerateRequest(BaseModel):
    seed_keyword: str
    niche: str | None = None
    country: str = "US"
    max_results: int = Field(default=25, ge=1, le=100)


class KeywordResponse(BaseModel):
    id: int
    keyword: str
    difficulty: float | None = None
    volume: int | None = None
    country: str
    status: str

    model_config = {"from_attributes": True}


class CompetitorAnalysisRequest(BaseModel):
    keyword: str
    country: str = "US"


class CompetitorAnalysisResponse(BaseModel):
    keyword: str
    country: str
    avg_word_count: int
    headings_structure: dict[str, list[str]]
    keyword_density: float
    top_ranking_urls: list[str]


class ContentGenerationRequest(BaseModel):
    keyword: str
    country: str = "US"
    competitor_urls: list[str] = Field(default_factory=list)
    target_word_count: int = Field(default=2200, ge=1200, le=4000)


class ContentDraftResponse(BaseModel):
    title: str
    meta_title: str
    meta_description: str
    slug: str
    outline: list[str]
    content_markdown: str
    schema_json: dict


class PublishRequest(BaseModel):
    keyword: str
    title: str
    meta_title: str
    meta_description: str
    content_markdown: str
    summary: str | None = None
    schema_json: dict | None = None
    slug: str | None = None
    outline: list[str] = Field(default_factory=list)
    status: str = "published"


class ArticleResponse(BaseModel):
    id: int
    title: str
    slug: str
    meta_title: str
    meta_description: str
    content_markdown: str
    status: str
    published_at: datetime | None

    model_config = {"from_attributes": True}


class RankingResponse(BaseModel):
    keyword: str
    position: float | None
    impressions: int | None
    clicks: int | None
    ctr: float | None
    date: date


class RankingSyncResponse(BaseModel):
    synced_keywords: int
    records_written: int
    source: str


class PipelineArticleSummary(BaseModel):
    keyword: str
    article_id: int
    title: str
    slug: str
    status: str


class ManualPipelineRequest(BaseModel):
    seed_keyword: str
    niche: str | None = None
    country: str = "IN"
    max_results: int = Field(default=5, ge=1, le=20)
    publish_count: int = Field(default=1, ge=1, le=5)
    target_word_count: int = Field(default=2200, ge=1200, le=4000)
    sync_rankings: bool = False


class ManualPipelineResponse(BaseModel):
    discovered_keywords: list[str]
    published_articles: list[PipelineArticleSummary]
    rankings_sync: RankingSyncResponse | None = None
