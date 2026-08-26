#!/usr/bin/env python3
"""Application-level backup: one JSON file containing every user's state and
activity.

This is deliberately *not* a replacement for the provider's automated Postgres
backups — it is the second, independent copy, in a format that can be restored
even if the database, the provider or this codebase is gone.

    python scripts/backup.py --out backups/
    python scripts/backup.py --restore backups/backup-2026-08-26.json
"""
import argparse
import datetime as dt
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import select  # noqa: E402

from app.db import SessionLocal  # noqa: E402
from app.models import Activity, StateSnapshot, User, UserState  # noqa: E402


def dump(out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    db = SessionLocal()
    try:
        payload = {"taken_at": dt.datetime.now(dt.timezone.utc).isoformat(), "users": []}
        for user in db.scalars(select(User).order_by(User.id)):
            state_row = db.get(UserState, user.id)
            payload["users"].append(
                {
                    "email": user.email,
                    "password_hash": user.password_hash,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                    "state": state_row.state if state_row else None,
                    "revision": state_row.revision if state_row else 0,
                    "activity": [
                        a.event
                        for a in db.scalars(
                            select(Activity)
                            .where(Activity.user_id == user.id)
                            .order_by(Activity.id)
                        )
                    ],
                }
            )
    finally:
        db.close()

    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H%M%SZ")
    path = out_dir / f"backup-{stamp}.json"
    path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {path} ({len(payload['users'])} users)")
    return path


def restore(path: Path) -> None:
    payload = json.loads(path.read_text(encoding="utf-8"))
    db = SessionLocal()
    try:
        for entry in payload["users"]:
            user = db.scalar(select(User).where(User.email == entry["email"]))
            if user is None:
                user = User(email=entry["email"], password_hash=entry["password_hash"])
                db.add(user)
                db.flush()
                print(f"  + restored user {user.email}")

            if entry.get("state") is not None and db.get(UserState, user.id) is None:
                db.add(UserState(user_id=user.id, state=entry["state"], revision=1))
                db.add(StateSnapshot(user_id=user.id, revision=1, state=entry["state"]))
                print(f"  + restored state for {user.email}")

            if entry.get("activity") and not db.scalar(
                select(Activity).where(Activity.user_id == user.id).limit(1)
            ):
                for ev in entry["activity"]:
                    db.add(Activity(user_id=user.id, event=ev))
                print(f"  + restored {len(entry['activity'])} activity rows for {user.email}")
        db.commit()
    finally:
        db.close()
    print("restore complete")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("backups"))
    parser.add_argument("--restore", type=Path)
    args = parser.parse_args()
    if args.restore:
        restore(args.restore)
    else:
        dump(args.out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
