# React Prep Wizard — Backend

FastAPI + SQLAlchemy + Alembic over Postgres. Replaces the previous
`server.py` (`http.server` + a local SQLite file), whose data did not survive a
container restart.

## What changed

| | Before | Now |
|---|---|---|
| Server | `http.server`, hand-rolled routing | FastAPI, validated request bodies, OpenAPI at `/docs` |
| Database | SQLite file inside the container | Managed Postgres via `DATABASE_URL` |
| Schema | `CREATE TABLE IF NOT EXISTS` at boot | Alembic migrations, applied on deploy |
| Passwords | unsalted `sha256` | salted PBKDF2, legacy hashes verified then upgraded on login |
| Sessions | plaintext tokens, never expire | hashed + peppered, 30-day expiry |
| Durability | lost on redeploy | Postgres + per-write state snapshots + JSON backups |

The HTTP contract is unchanged: `/api/auth/{register,login,me}`, `/api/state`,
`/api/activity`, `/api/challenge`, `/api/lesson`. The frontend needs no edits.
New: `/api/health`, `/api/auth/logout`, `/api/export`.

## Local development

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env          # the sqlite default works with no DATABASE_URL
.venv/bin/alembic upgrade head
.venv/bin/uvicorn app.main:app --reload --port 8777
```

From the repo's `react-prep-wizard/` directory, `npm run dev:all` runs Vite and
this API together.

## Importing the old data

```bash
python scripts/import_legacy.py --claim-email you@example.com
```

Reads the old `app.db` and the file-based `SAVE_GAME_STATE.json` /
`ACTIVITY_LOG.jsonl`. Idempotent — safe to re-run. `--dry-run` to rehearse.

## Backups

```bash
python scripts/backup.py --out backups/          # dump every user to one JSON
python scripts/backup.py --restore backups/x.json
```

See [../../docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md) for the deployment and
durability strategy.

## Tests

```bash
.venv/bin/python tests_smoke.py
```
