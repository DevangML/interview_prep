"""Vercel serverless entrypoint.

Vercel looks for an ASGI application named `app` in this module. The real
application lives in `backend/`, which is bundled alongside via the
`includeFiles` setting in vercel.json.

Static assets are served by Vercel's CDN, not by FastAPI, so STATIC_DIR is
pointed at nothing — `app.main` simply skips mounting the SPA when the
directory is absent.
"""
import os
import sys
from pathlib import Path

BACKEND = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(BACKEND))

os.environ.setdefault("STATIC_DIR", "__served_by_cdn__")

from app.main import app  # noqa: E402,F401
