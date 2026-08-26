from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import NullPool

from .config import get_settings

settings = get_settings()

_connect_args = {}
if settings.sqlalchemy_url.startswith("sqlite"):
    _connect_args["check_same_thread"] = False

_pool_kwargs: dict = {"pool_pre_ping": True, "pool_recycle": 1800}

if settings.serverless:
    # On a serverless platform each invocation may run in a fresh, short-lived
    # sandbox. A local pool would hold connections that the next invocation
    # cannot reuse but Postgres still counts against max_connections, so it
    # exhausts the database instead of helping. Pool on the provider's side
    # (Neon's pooled endpoint) and keep none here.
    _pool_kwargs = {"poolclass": NullPool}

engine = create_engine(settings.sqlalchemy_url, connect_args=_connect_args, **_pool_kwargs)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


def get_session() -> Iterator[Session]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
