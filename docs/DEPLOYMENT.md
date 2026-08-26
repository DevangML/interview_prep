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

One repo, two deploy targets that share the same code and the same
`DATABASE_URL` contract:

- **Vercel (current)** — CDN serves `dist/`, a Python function serves `/api/*`.
- **Docker (`Dockerfile`)** — one container serving both, for any host that
  takes an image. Verified working; kept so the platform choice stays
  reversible.

Nothing in `backend/app` knows which one it is running under, apart from
`config.serverless`, which only decides whether to pool connections locally.

## Deployment: Vercel + Neon, no card, free perpetually

Both halves are free forever and neither asks for a payment method:

| | Service | Card | Expiry |
|---|---|---|---|
| App + CDN | Vercel Hobby | none | none — free forever, non-commercial use |
| Database | Neon free | none | none — scales to zero, idle projects are not deleted |

Render was dropped because creating anything there now wants a card, and its
free Postgres is deleted after 30 days regardless.

Vercel runs the API as a **serverless function**, which has a useful
consequence: there is no always-on instance to spin down, so there is no
cold-start-after-idle penalty of the Render kind, and no monthly instance-hour
budget to exhaust.

### What runs where

```
  Vercel CDN            /            → dist/index.html  (the React SPA)
                        /assets/*    → hashed bundles, cached at the edge
  Vercel Function       /api/*       → api/index.py → FastAPI (backend/)
                                            │
  Neon                                      └── DATABASE_URL → Postgres
```

`vercel.json` wires exactly that. `api/index.py` is a five-line shim that puts
`backend/` on the path and re-exports the ASGI app; `includeFiles` ships the
`backend/` tree into the function bundle.

### 1. Create the database (Neon)

1. Sign up at **neon.tech** with GitHub — no card.
2. Create a project; choose the region closest to you.
3. Open **Connection Details** and copy the **Pooled connection** string
   (it has `-pooler` in the host). It looks like:
   `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`

   The pooled endpoint matters: serverless functions open a connection per
   invocation, and Neon's pooler is what keeps that from exhausting
   `max_connections`. The app sets SQLAlchemy to `NullPool` automatically when
   it detects a serverless runtime, so pooling happens on Neon's side only.

### 2. Create the schema

Migrations are run from your laptop, not at deploy time — a serverless function
has no boot step to hang them off, and running DDL from a request handler is a
bad idea anyway.

```bash
cd react-prep-wizard/backend
export DATABASE_URL='<neon pooled connection string>'
.venv/bin/alembic upgrade head
```

### 3. Deploy (Vercel)

1. **vercel.com** → sign up with GitHub — no card.
2. **Add New → Project** → import `DevangML/interview_prep`.
3. **Root Directory: `react-prep-wizard`** — this is the one setting that is
   easy to miss and breaks everything if wrong.
4. Framework preset: **Other**. Build command and output directory come from
   `vercel.json`; leave them.
5. **Environment Variables**, before the first deploy:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the Neon pooled string |
   | `TOKEN_PEPPER` | `python3 -c "import secrets; print(secrets.token_urlsafe(48))"` |
   | `ENVIRONMENT` | `production` |

6. **Deploy**.

### 4. Verify

```bash
curl https://<your-project>.vercel.app/api/health
```

Expect `{"database": true, "schema": true, "ok": true}`. If `schema` is false,
step 2 did not run against the same database the function is using.

## Importing existing progress

Run this **from your laptop**. The legacy `app.db` and `SAVE_GAME_STATE.json`
live on your machine and are deliberately not shipped to the server.

Use the same Neon connection string, then:

```bash
cd react-prep-wizard/backend
export DATABASE_URL='<neon connection string>'
.venv/bin/python scripts/import_legacy.py --dry-run --claim-email you@example.com
.venv/bin/python scripts/import_legacy.py --claim-email you@example.com
```

Verified against the real data: 619 activity events and the full campaign state
(XP 17, rank Initiate) import cleanly, and re-running changes nothing.

The old `app.db` password hash carries over unchanged, so the existing login
keeps working — and is silently upgraded to PBKDF2 on that first login.

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
DATABASE_URL='<neon connection string>' python scripts/backup.py --out backups/
```

Run it weekly and keep the output somewhere that is not the hosting provider —
a private repo, cloud drive, or local disk. Restore is a single command and was
verified to round-trip all 619 activity rows and the exact XP:

```bash
python scripts/backup.py --restore backups/backup-<stamp>.json
```

Neon keeps its own 7-day history on the free tier, so this JSON is the copy
that survives losing the Neon account itself. A monthly calendar reminder is
enough; there is no server-side cron to configure on Hobby.

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

Code rollback is Vercel's **Instant Rollback** (Deployments → ⋯ → Promote to Production on an earlier build). A migration that must be undone
needs `alembic downgrade -1` run before the older image starts — which is why
schema changes should be additive (add a nullable column, backfill, then stop
writing the old one) rather than destructive.

## Verified

Run on this machine before writing any of the above:

- Alembic migration applies from empty to full schema (sqlite and Postgres 16).
- Legacy import against a real Postgres: the actual `app.db` +
  `SAVE_GAME_STATE.json` + 619-line activity log → **XP 17, rank Initiate, 619
  activity rows**. Idempotent on re-run.
- `backup.py` dump → restore round-trips all 619 rows and the exact XP.
- `tests_smoke.py`: auth paths, 401 on unauthenticated reads, XP advancing and
  persisting, unknown-challenge 404, activity + export, legacy sha256 hash
  upgraded on login, tokens never stored in the clear.
- Docker image builds (269 MB) and serves against Postgres; **the container was
  destroyed and recreated and the account plus progress survived** — the exact
  failure this migration set out to fix.
- Vercel path: `api/index.py` imported the way the platform imports it, against
  Postgres — serverless detected, `NullPool` active, seed state loaded from
  `backend/seed/`, XP 17 → 34 persisted, SPA correctly not served by the
  function.
- `npm run build` passes (it did not before: `NodeJS.Timeout` in
  `RapidFirePage.tsx` failed `tsc -b` because `@types/node` is not a dependency).

Not verified: the live Vercel deploy itself, which needs your account.
