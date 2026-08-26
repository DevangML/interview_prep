# Deployment & Durability Strategy — React Prep Wizard

## The problem this solves

The old stack ran `python3 server.py` and wrote to
`_bmad-output/react_crucible/app.db`, a SQLite file **inside the container's
filesystem**. On Render, Koyeb, Fly, Railway and every other container host,
that filesystem is ephemeral: every redeploy, crash, scale event or platform
restart wipes it. Progress was being lost silently, and the `app.db` committed
to git was the only reason any of it survived.

Durability now comes from three independent layers, because any single one can
fail:

| Layer | Protects against | Owner |
|---|---|---|
| Managed Postgres with PITR | disk loss, host loss | the platform |
| `state_snapshots` table (append-only, last 200 saves per user) | bad writes, application bugs, user error | the app |
| `scripts/backup.py` JSON dumps, stored off-platform | provider loss, account loss, accidental DB deletion | you |

Plus `/api/export`, so a user can always walk away with their own data.

## Architecture

```
┌──────────────────────────────────────────┐
│  Container (one image, one origin)       │
│                                          │
│   Vite bundle (dist/)  ← served by ──┐   │
│                                      │   │
│   FastAPI (uvicorn, 2 workers) ──────┘   │
│     /api/*   → JSON                      │
│     /*       → index.html (SPA routes)   │
└────────────────┬─────────────────────────┘
                 │ DATABASE_URL
        ┌────────▼─────────┐
        │ Managed Postgres │  ← daily backups + PITR
        └──────────────────┘
```

One service, one origin: no CORS, no separate static host, no chance of the
frontend and API drifting apart between deploys. `start.sh` runs
`alembic upgrade head` before uvicorn, so code never serves against an older
schema.

## Recommended host: Render

`render.yaml` in the repo root is a working blueprint — Postgres 16 (`starter`)
plus a Docker web service, with `DATABASE_URL` wired from the database and
`TOKEN_PEPPER` generated once by the platform.

**Use `starter`, not `free`, for Postgres.** Render's free Postgres is deleted
after 30 days and has no automated backups — which is precisely the failure this
migration exists to prevent. The paid starter tier is roughly $7/mo for the
database and $7/mo for the web service.

### First deploy

1. Push this branch to GitHub.
2. Render → **New → Blueprint** → pick the repo. It reads `render.yaml` and
   creates both the database and the web service.
3. Wait for the first deploy; `/api/health` should return `{"ok": true}`.
4. Import the existing progress (below).

### Importing existing progress

Run this **from your laptop**, not from the Render shell: the legacy `app.db`
and `SAVE_GAME_STATE.json` live on your machine and are deliberately excluded
from the image.

Copy the database's **External Connection String** from the Render dashboard
(Postgres → Connections → External), then:

```bash
cd react-prep-wizard/backend
export DATABASE_URL='<external connection string>'
.venv/bin/python scripts/import_legacy.py --dry-run --claim-email you@example.com
.venv/bin/python scripts/import_legacy.py --claim-email you@example.com
```

Verified against the real data: 619 activity events and the full campaign state
(XP 17, rank Initiate) import cleanly, and re-running changes nothing.

The old `app.db` password hash carries over unchanged, so the existing login
keeps working — and is silently upgraded to PBKDF2 on that first login.

## Alternatives, if Render is not the pick

| Host | Postgres | Notes |
|---|---|---|
| **Fly.io** | Neon/Supabase attach | Same Dockerfile; `fly launch` then `fly secrets set`. Cheapest at small scale. |
| **Railway** | built-in | Simplest UI; hands out `postgres://` URLs, which `config.py` normalises. |
| **Koyeb** | external (Neon) | The current Dockerfile already targets it; keeps the free tier. |

All four run the same image and the same `DATABASE_URL` contract — the choice is
reversible. **Do not** pick a host without managed Postgres backups; that puts
you back where you started.

## Required environment variables

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes in prod | Falls back to local SQLite for development only. |
| `TOKEN_PEPPER` | **yes in prod** | Rotating it logs everyone out. Generate with `secrets.token_urlsafe(48)`. |
| `SESSION_TTL_DAYS` | no | Default 30. |
| `WEB_CONCURRENCY` | no | uvicorn workers, default 2. |
| `CORS_ORIGINS` | no | Only if frontend is served from another origin. |
| `ENVIRONMENT` | no | Cosmetic; surfaced by `/api/health`. |

## Backup routine

Provider backups cover the platform's failures. This covers the provider's.

```bash
DATABASE_URL='<external connection string>' python scripts/backup.py --out backups/
```

Run it weekly and keep the output somewhere that is not the hosting provider —
a private repo, cloud drive, or local disk. Restore is a single command and was
verified to round-trip all 619 activity rows and the exact XP:

```bash
python scripts/backup.py --restore backups/backup-<stamp>.json
```

To automate, add a Render cron job on the same image running that dump and
uploading it, or run it locally on a schedule against the external URL.

## Schema changes from here

```bash
cd react-prep-wizard/backend
.venv/bin/alembic revision --autogenerate -m "what changed"
# read the generated file before committing it — autogenerate is a draft
.venv/bin/alembic upgrade head        # apply locally
```

Deploy applies it automatically. Never edit a migration that has already run in
production; write a new one.

## Rollback

Code rollback is Render's "Redeploy previous". A migration that must be undone
needs `alembic downgrade -1` run before the older image starts — which is why
schema changes should be additive (add a nullable column, backfill, then stop
writing the old one) rather than destructive.

## Verified

- Alembic migration applies from empty to full schema.
- Legacy import: real `app.db` + `SAVE_GAME_STATE.json` + 619-line activity log,
  idempotent on re-run.
- `tests_smoke.py`: auth (register/duplicate/wrong password/expiry-free login),
  401 on unauthenticated reads, XP advancing and persisting, unknown-challenge
  404, activity + export, legacy hash upgrade, tokens never stored in the clear.
- `start.sh` boots: `/api/health` 200, SPA and deep links served, `/api/state`
  401 without a token.
- **Not** verified: the Docker image build — the Docker daemon was not running
  on this machine. Run `docker build -t rpw .` once before the first deploy.
