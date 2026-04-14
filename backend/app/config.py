from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "ReduceImageSize SEO Automation API"
    environment: str = "development"
    database_url: str = Field(
        default="postgresql+psycopg://postgres:postgres@localhost:5432/reduceimagesize_seo"
    )
    redis_url: str = "redis://localhost:6379/0"
    next_frontend_url: str = "http://localhost:3000"
    content_webhook_secret: str = "change-me"
    openai_api_key: str = ""
    groq_api_key: str = ""
    google_search_console_credentials_json: str = ""
    google_search_console_site_url: str = ""
    serp_api_key: str = ""
    groq_model: str = "llama-3.3-70b-versatile"
    dataforseo_login: str = ""
    dataforseo_password: str = ""
    google_client_id: str = ""
    google_client_secret: str = ""
    google_refresh_token: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
