#!/usr/bin/env python3
"""One-time import of the old http.server data into the new database.

Sources, in order of precedence:
  1. `_bmad-output/react_crucible/app.db`  — the old SQLite file (users, state,
     activity). Password hashes come across as-is and are upgraded on next login.
  2. `SAVE_GAME_STATE.json` + `ACTIVITY_LOG.jsonl` — the pre-auth single-player
     files, attached to the user named by --claim-email.

Idempotent: re-running will not duplicate users, state or activity rows.

    python scripts/import_legacy.py --sqlite ../../_bmad-output/react_crucible/app.db
    python scripts/import_legacy.py --claim-email you@example.com
"""
import argparse
import json
import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import select  # noqa: E402

from app.db import SessionLocal  # noqa: E402
from app.models import Activity, StateSnapshot, User, UserState  # noqa: E402
from app.security import hash_password  # noqa: E402

ROOT = Path(__file__).resolve().parents[3]
CRUCIBLE = ROOT / "_bmad-output" / "react_crucible"


def _get_or_create_user(db, email: str, password_hash: str | None) -> User:
    user = db.scalar(select(User).where(User.email == email.lower()))
    if user:
        return user
    user = User(
        email=email.lower(),
        password_hash=password_hash or hash_password("change-me-on-first-login"),
    )
    db.add(user)
    db.flush()
    print(f"  + user {email} (id={user.id})")
    return user


def _set_state(db, user: User, state: dict) -> None:
    row = db.get(UserState, user.id)
    if row is None:
        row = UserState(user_id=user.id, state=state, revision=1)
        db.add(row)
        db.add(StateSnapshot(user_id=user.id, revision=1, state=state))
        print(f"  + state for user {user.id}")
    else:
        print(f"  = state for user {user.id} already present, left untouched")


def _add_activity(db, user: User, events: list[dict]) -> None:
    existing = db.scalar(
        select(Activity).where(Activity.user_id == user.id).limit(1)
    )
    if existing:
        print(f"  = activity for user {user.id} already present, skipping")
        return
    for ev in events:
        db.add(Activity(user_id=user.id, event=ev))
    print(f"  + {len(events)} activity rows for user {user.id}")


def import_sqlite(db, path: Path) -> None:
    print(f"reading legacy sqlite: {path}")
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row

    tables = {r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    if "users" not in tables:
        print("  ! no `users` table — nothing to import")
        return

    id_map: dict[int, int] = {}
    for row in conn.execute("SELECT id, email, password_hash FROM users"):
        user = _get_or_create_user(db, row["email"], row["password_hash"])
        id_map[row["id"]] = user.id

    if "user_state" in tables:
        for row in conn.execute("SELECT user_id, state_json FROM user_state"):
            new_id = id_map.get(row["user_id"])
            if new_id is None:
                continue
            _set_state(db, db.get(User, new_id), json.loads(row["state_json"]))

    if "user_activity" in tables:
        for old_id, new_id in id_map.items():
            events = [
                json.loads(r["event_json"])
                for r in conn.execute(
                    "SELECT event_json FROM user_activity WHERE user_id = ? ORDER BY id",
                    (old_id,),
                )
            ]
            if events:
                _add_activity(db, db.get(User, new_id), events)

    conn.close()


def import_files(db, email: str) -> None:
    state_path = CRUCIBLE / "SAVE_GAME_STATE.json"
    log_path = CRUCIBLE / "ACTIVITY_LOG.jsonl"
    print(f"claiming file-based progress for {email}")
    user = _get_or_create_user(db, email, None)

    if state_path.exists():
        _set_state(db, user, json.loads(state_path.read_text(encoding="utf-8")))
    else:
        print(f"  ! missing {state_path}")

    if log_path.exists():
        events = []
        for line in log_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                events.append(json.loads(line))
            except json.JSONDecodeError:
                print("  ! skipping malformed activity line")
        _add_activity(db, user, events)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sqlite", type=Path, default=CRUCIBLE / "app.db")
    parser.add_argument(
        "--claim-email",
        help="attach the file-based SAVE_GAME_STATE.json progress to this account",
    )
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    db = SessionLocal()
    try:
        if args.sqlite and args.sqlite.exists():
            import_sqlite(db, args.sqlite)
        else:
            print(f"no legacy sqlite at {args.sqlite}, skipping")

        if args.claim_email:
            import_files(db, args.claim_email)

        if args.dry_run:
            db.rollback()
            print("dry run — rolled back")
        else:
            db.commit()
            print("import committed")
    finally:
        db.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
