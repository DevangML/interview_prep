# ── stage 1: build the Vite bundle ───────────────────────────────────────────
FROM node:20-slim AS frontend

WORKDIR /build
COPY react-prep-wizard/package.json react-prep-wizard/package-lock.json ./
RUN npm ci

COPY react-prep-wizard/ ./
RUN npm run build

# ── stage 2: python runtime ──────────────────────────────────────────────────
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY react-prep-wizard/backend/requirements.txt ./backend/requirements.txt
RUN pip install -r backend/requirements.txt

COPY react-prep-wizard/backend/ ./backend/
# The seed state for brand-new accounts. Existing progress lives in Postgres.
COPY _bmad-output/react_crucible/SAVE_GAME_STATE.json ./_bmad-output/react_crucible/SAVE_GAME_STATE.json
COPY --from=frontend /build/dist ./dist

# Never run as root in a container that serves the public internet.
RUN useradd --create-home --uid 10001 app && chown -R app:app /app
USER app

ENV PORT=8000
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/api/health', timeout=4).status==200 else 1)"

WORKDIR /app/backend
CMD ["./start.sh"]
