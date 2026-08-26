from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session
import datetime as dt

from ..db import get_session
from ..deps import current_user
from ..models import User, UserCognitiveProfile, utcnow

router = APIRouter(prefix="/api/cognitive", tags=["cognitive"])


class CognitiveSyncIn(BaseModel):
    client_revision: int = 1
    rigor_level: str | None = None
    weakness_updates: dict[str, int] = Field(default_factory=dict)
    mastered_invariants: list[str] = Field(default_factory=list)
    jd_analyses: list[dict] = Field(default_factory=list)
    bug_drills: list[dict] = Field(default_factory=list)
    star_stories: list[dict] = Field(default_factory=list)
    cheat_sheets: list[dict] = Field(default_factory=list)


@router.get("/profile")
def get_cognitive_profile(
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    profile = db.scalar(
        select(UserCognitiveProfile).where(UserCognitiveProfile.user_id == user.id)
    )
    if not profile:
        profile = UserCognitiveProfile(
            user_id=user.id,
            rigor_level="Senior",
            weakness_heatmap={},
            mastered_invariants=[],
            jd_analyses=[],
            bug_drills=[],
            star_stories=[],
            cheat_sheets=[],
            revision=1,
            updated_at=utcnow(),
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "user_id": profile.user_id,
        "rigor_level": profile.rigor_level,
        "weakness_heatmap": profile.weakness_heatmap,
        "mastered_invariants": profile.mastered_invariants,
        "jd_analyses": profile.jd_analyses,
        "bug_drills": profile.bug_drills,
        "star_stories": profile.star_stories,
        "cheat_sheets": profile.cheat_sheets,
        "revision": profile.revision,
        "updated_at": profile.updated_at.isoformat(),
    }


@router.post("/sync")
def sync_cognitive_profile(
    body: CognitiveSyncIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    profile = db.scalar(
        select(UserCognitiveProfile).where(UserCognitiveProfile.user_id == user.id)
    )
    if not profile:
        profile = UserCognitiveProfile(
            user_id=user.id,
            rigor_level="Senior",
            weakness_heatmap={},
            mastered_invariants=[],
            jd_analyses=[],
            bug_drills=[],
            star_stories=[],
            cheat_sheets=[],
            revision=1,
            updated_at=utcnow(),
        )
        db.add(profile)

    # 1. Update Rigor Level if escalated
    if body.rigor_level:
        profile.rigor_level = body.rigor_level

    # 2. Merge Weakness Heatmap
    heatmap = dict(profile.weakness_heatmap or {})
    for tag, freq in body.weakness_updates.items():
        heatmap[tag] = heatmap.get(tag, 0) + freq
    profile.weakness_heatmap = heatmap

    # 3. Merge Mastered Invariants (Set union)
    current_invariants = set(profile.mastered_invariants or [])
    current_invariants.update(body.mastered_invariants)
    profile.mastered_invariants = list(current_invariants)

    # 4. Merge Record Collections by ID (Deduplicated Union)
    def merge_records(existing: list, incoming: list) -> list:
        by_id = {r["id"]: r for r in (existing or []) if isinstance(r, dict) and "id" in r}
        for inc in incoming:
            if isinstance(inc, dict) and "id" in inc:
                by_id[inc["id"]] = inc
        return list(by_id.values())

    profile.jd_analyses = merge_records(profile.jd_analyses, body.jd_analyses)
    profile.bug_drills = merge_records(profile.bug_drills, body.bug_drills)
    profile.star_stories = merge_records(profile.star_stories, body.star_stories)
    profile.cheat_sheets = merge_records(profile.cheat_sheets, body.cheat_sheets)

    # 5. Increment Monotonic Revision
    profile.revision += 1
    profile.updated_at = utcnow()

    db.commit()
    db.refresh(profile)

    return {
        "ok": True,
        "revision": profile.revision,
        "rigor_level": profile.rigor_level,
        "weakness_heatmap": profile.weakness_heatmap,
        "mastered_invariants": profile.mastered_invariants,
        "records_count": {
            "jd_analyses": len(profile.jd_analyses),
            "bug_drills": len(profile.bug_drills),
            "star_stories": len(profile.star_stories),
            "cheat_sheets": len(profile.cheat_sheets),
        },
        "updated_at": profile.updated_at.isoformat(),
    }
