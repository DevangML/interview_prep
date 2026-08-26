"""Read/write the campaign save-game.

Every write also appends an immutable snapshot, so progress survives not only
disk loss (the platform's job) but bad writes and application bugs (ours).
"""
import copy
import json
import os
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import get_settings
from .models import Activity, StateSnapshot, UserState

_template_cache: dict | None = None

# How many snapshots to keep per user. Old ones are pruned on write so the
# table cannot grow without bound on a hobby-tier database.
SNAPSHOT_RETENTION = 200


def template_state() -> dict:
    global _template_cache
    if _template_cache is None:
        path = Path(__file__).resolve().parent.parent / get_settings().template_state_path
        path = Path(os.path.normpath(path))
        with open(path, encoding="utf-8") as fh:
            _template_cache = json.load(fh)
    return copy.deepcopy(_template_cache)


def load_state(db: Session, user_id: int) -> dict:
    row = db.get(UserState, user_id)
    if row is None:
        row = UserState(user_id=user_id, state=template_state(), revision=1)
        db.add(row)
        db.add(StateSnapshot(user_id=user_id, revision=1, state=row.state))
        db.commit()
    return copy.deepcopy(row.state)


def save_state(db: Session, user_id: int, state: dict) -> int:
    row = db.get(UserState, user_id)
    if row is None:
        row = UserState(user_id=user_id, state=state, revision=1)
        db.add(row)
    else:
        row.state = state
        row.revision = row.revision + 1
    db.flush()

    db.add(StateSnapshot(user_id=user_id, revision=row.revision, state=state))
    _prune_snapshots(db, user_id)
    db.commit()
    return row.revision


def _prune_snapshots(db: Session, user_id: int) -> None:
    keep = db.scalars(
        select(StateSnapshot.id)
        .where(StateSnapshot.user_id == user_id)
        .order_by(StateSnapshot.id.desc())
        .limit(SNAPSHOT_RETENTION)
    ).all()
    if len(keep) < SNAPSHOT_RETENTION:
        return
    db.query(StateSnapshot).filter(
        StateSnapshot.user_id == user_id, StateSnapshot.id < min(keep)
    ).delete(synchronize_session=False)


def append_activity(db: Session, user_id: int, event: dict) -> None:
    from .domain import now

    event = {**event, "at": now()}
    db.add(Activity(user_id=user_id, event=event))
    db.commit()
