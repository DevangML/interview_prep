from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_session
from ..deps import current_user
from ..domain import find_challenge, now, recount
from ..models import Activity, User
from ..schemas import ChallengeIn, LessonIn
from ..state_service import append_activity, load_state, save_state

router = APIRouter(prefix="/api", tags=["campaign"])


@router.get("/state")
def get_state(user: User = Depends(current_user), db: Session = Depends(get_session)):
    return load_state(db, user.id)


@router.get("/activity")
def get_activity(
    n: int = Query(default=12, ge=1, le=500),
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    rows = db.scalars(
        select(Activity)
        .where(Activity.user_id == user.id)
        .order_by(Activity.id.desc())
        .limit(n)
    ).all()
    return [r.event for r in rows]


@router.post("/activity")
def post_activity(
    body: dict, user: User = Depends(current_user), db: Session = Depends(get_session)
):
    append_activity(db, user.id, body)
    return {"ok": True}


@router.post("/challenge")
def post_challenge(
    body: ChallengeIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    quest, challenge = find_challenge(state, body.id)
    if challenge is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"unknown challenge {body.id}")

    was = challenge.get("done", False)
    challenge["done"] = body.done
    if body.done:
        challenge["completed_at"] = now()
    if body.code:
        challenge["last_code"] = body.code[:8000]
    if body.checks is not None:
        challenge["last_checks"] = body.checks
    if body.hints_used is not None:
        challenge["hints_used"] = body.hints_used

    progression = recount(state)
    if (
        body.done
        and all(c.get("done") for c in quest.get("challenges", []))
        and quest["status"] != "CLEARED"
    ):
        quest["status"] = "CHALLENGES_DONE"

    save_state(db, user.id, state)
    append_activity(
        db,
        user.id,
        {
            "ev": "challenge",
            "id": body.id,
            "done": body.done,
            "was": was,
            "quest": quest["id"],
            "hints": body.hints_used,
            "checks": body.checks,
        },
    )
    return {
        "ok": True,
        "progression": progression,
        "quest": quest["id"],
        "quest_status": quest["status"],
    }


@router.post("/lesson")
def post_lesson(
    body: LessonIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    ladder = state["active_campaign"].setdefault("ladder_progress", {})
    ladder[str(body.key)] = {
        "done": body.done,
        "at": now(),
        "stage": body.stage,
        "title": body.title,
    }
    state["active_campaign"]["progression"]["ladder_lessons_done"] = sum(
        1 for v in ladder.values() if v["done"]
    )
    save_state(db, user.id, state)
    append_activity(db, user.id, {"ev": "lesson", **body.model_dump()})
    return {"ok": True}


@router.get("/export")
def export_everything(
    user: User = Depends(current_user), db: Session = Depends(get_session)
):
    """A user-triggered full dump of their own data. Backups protect against
    our failures; this protects against us disappearing entirely."""
    rows = db.scalars(
        select(Activity).where(Activity.user_id == user.id).order_by(Activity.id)
    ).all()
    return {
        "user": {"id": user.id, "email": user.email},
        "state": load_state(db, user.id),
        "activity": [r.event for r in rows],
    }
