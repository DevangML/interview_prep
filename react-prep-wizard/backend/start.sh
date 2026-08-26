#!/usr/bin/env sh
# Container entrypoint: migrate, then serve. Running migrations here means a
# deploy can never serve code against an older schema.
set -e
cd "$(dirname "$0")"
alembic upgrade head
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --workers "${WEB_CONCURRENCY:-2}"
