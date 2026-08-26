import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from .config import get_settings
from .db import engine
from .routers import auth, campaign

settings = get_settings()

app = FastAPI(title="React Prep Wizard API", version="2.0.0")

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


@app.get("/api/health")
def health():
    """Liveness + readiness in one: the platform restarts the container when
    the database is unreachable rather than serving 500s to the user."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        db_ok = False
    return {"ok": db_ok, "environment": settings.environment, "database": db_ok}


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
