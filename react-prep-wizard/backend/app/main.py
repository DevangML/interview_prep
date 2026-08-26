import logging
import os
from pathlib import Path

from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, text

from . import errors
from .config import get_settings
from .db import Base, engine
from . import models  # noqa: F401 - registers every table on Base.metadata
from .routers import auth, campaign, diagram, cognitive, user_state_router

log = logging.getLogger("api")
settings = get_settings()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(name)s %(message)s",
)

app = FastAPI(title="React Prep Wizard API", version="2.0.0")

# Registered before the routers so nothing can return an un-enveloped error.
errors.install(app)

if settings.origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router)
app.include_router(campaign.router)
app.include_router(diagram.router)
app.include_router(cognitive.router)
app.include_router(user_state_router.router)



# Derived from the models, not hand-listed: a new table joins this check by
# existing, and a renamed one cannot silently drop out of it.
_REQUIRED_TABLES = tuple(sorted(Base.metadata.tables))


@app.get("/api/health")
def health(response: Response):
    """Readiness, not just liveness.

    The previous version ran `SELECT 1` and reported ok. That succeeds against
    a database with no tables in it, which is exactly the state that produced
    opaque 500s on every login: healthy by this check, unusable in practice.
    Readiness now means the schema is actually migrated, and an unready service
    says so with a 503 the platform can act on.
    """
    detail = {"environment": settings.environment, "database": False, "schema": False}
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        detail["database"] = True
        present = set(inspect(engine).get_table_names())
        missing = [t for t in _REQUIRED_TABLES if t not in present]
        detail["schema"] = not missing
        if missing:
            detail["missing_tables"] = missing
            detail["hint"] = "run `alembic upgrade head`"
    except Exception as exc:  # noqa: BLE001 - health must never raise
        log.exception("health check failed")
        detail["error"] = type(exc).__name__

    detail["ok"] = detail["database"] and detail["schema"]
    if not detail["ok"]:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    return detail


# ── SPA ──────────────────────────────────────────────────────────────────────
# In production the same service serves the built Vite bundle, so there is one
# origin, no CORS, and no separate static host to keep in sync.
_static = Path(os.path.normpath(Path(__file__).resolve().parent.parent / settings.static_dir))

if _static.is_dir():
    app.mount("/assets", StaticFiles(directory=_static / "assets"), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def spa(full_path: str):
        candidate = _static / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(_static / "index.html")
