"""Runtime configuration. Everything comes from the environment so the same
image runs locally, in staging and in production."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # postgresql+psycopg://user:pass@host:5432/db  — set by the platform.
    # The sqlite fallback exists so `uvicorn app.main:app` works with no setup.
    database_url: str = "sqlite+pysqlite:///./local.db"

    # Opaque session tokens are stored hashed; this pepper means a database
    # leak alone does not hand out live sessions.
    token_pepper: str = "dev-only-change-me"
    session_ttl_days: int = 30

    # Comma-separated. Empty means same-origin only, which is the deployed shape.
    cors_origins: str = ""

    # Directory holding the built Vite bundle. Served as the SPA when present.
    static_dir: str = "../dist"

    # One-time seed for a brand new user's campaign state.
    template_state_path: str = "../../_bmad-output/react_crucible/SAVE_GAME_STATE.json"

    environment: str = "development"

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def sqlalchemy_url(self) -> str:
        # Platforms (Render, Heroku, Railway) hand out `postgres://` URLs that
        # SQLAlchemy 2 no longer accepts; normalise instead of making the
        # operator remember to rewrite it.
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg://", 1)
        return url


@lru_cache
def get_settings() -> Settings:
    return Settings()
