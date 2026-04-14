from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class Keyword(Base):
    __tablename__ = "keywords"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    keyword: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    cluster_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    difficulty: Mapped[float | None] = mapped_column(Float, nullable=True)
    volume: Mapped[int | None] = mapped_column(Integer, nullable=True)
    country: Mapped[str] = mapped_column(String(10), default="US")
    status: Mapped[str] = mapped_column(String(50), default="discovered")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    articles: Mapped[list["Article"]] = relationship(back_populates="keyword")
    rankings: Mapped[list["Ranking"]] = relationship(back_populates="keyword")


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    meta_title: Mapped[str] = mapped_column(String(255))
    meta_description: Mapped[str] = mapped_column(String(320))
    schema_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    outline: Mapped[str | None] = mapped_column(Text, nullable=True)
    content_markdown: Mapped[str] = mapped_column(Text)
    content_html: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="draft")
    published_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    keyword_id: Mapped[int | None] = mapped_column(ForeignKey("keywords.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    keyword: Mapped[Keyword | None] = relationship(back_populates="articles")
    outgoing_links: Mapped[list["InternalLink"]] = relationship(
        back_populates="source_article",
        foreign_keys="InternalLink.source_id",
    )
    incoming_links: Mapped[list["InternalLink"]] = relationship(
        back_populates="target_article",
        foreign_keys="InternalLink.target_id",
    )


class Ranking(Base):
    __tablename__ = "rankings"
    __table_args__ = (UniqueConstraint("keyword_id", "date", name="uq_rankings_keyword_date"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    keyword_id: Mapped[int] = mapped_column(ForeignKey("keywords.id"), index=True)
    position: Mapped[float | None] = mapped_column(Float, nullable=True)
    impressions: Mapped[int | None] = mapped_column(Integer, nullable=True)
    clicks: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ctr: Mapped[float | None] = mapped_column(Float, nullable=True)
    date: Mapped[date] = mapped_column(Date, default=date.today)

    keyword: Mapped[Keyword] = relationship(back_populates="rankings")


class InternalLink(Base):
    __tablename__ = "internal_links"
    __table_args__ = (UniqueConstraint("source_id", "target_id", name="uq_internal_links"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    source_id: Mapped[int] = mapped_column(ForeignKey("articles.id"), index=True)
    target_id: Mapped[int] = mapped_column(ForeignKey("articles.id"), index=True)
    anchor_text: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    source_article: Mapped[Article] = relationship(
        back_populates="outgoing_links",
        foreign_keys=[source_id],
    )
    target_article: Mapped[Article] = relationship(
        back_populates="incoming_links",
        foreign_keys=[target_id],
    )
