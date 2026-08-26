import copy
from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_session
from ..deps import current_user
from ..models import User
from ..schemas import (
    FullStateSyncIn,
    LearnDiagramIn,
    LearnToggleIn,
    MasteryActiveIn,
    MasteryCodeIn,
    MasterySolveIn,
    PlaygroundSaveIn,
    PreferencesSaveIn,
    ProjectProgressIn,
    RapidFireRecordIn,
)
from ..state_service import append_activity, load_state, save_state

router = APIRouter(prefix="/api", tags=["sync"])


def _ensure_sections(state: dict[str, Any]) -> dict[str, Any]:
    """Ensure all sub-module keys exist in state."""
    state.setdefault("mastery", {
        "solved_units": {},
        "code_snapshots": {},
        "schedule": {},
        "active_unit_id": "js-closure-counter",
    })
    state["mastery"].setdefault("solved_units", {})
    state["mastery"].setdefault("code_snapshots", {})
    state["mastery"].setdefault("schedule", {})
    state["mastery"].setdefault("active_unit_id", "js-closure-counter")

    state.setdefault("learn", {
        "completed_topics": {},
        "diagrams": {},
    })
    state["learn"].setdefault("completed_topics", {})
    state["learn"].setdefault("diagrams", {})

    state.setdefault("library", {
        "mastery_nav": {},
        "learn_nav": {},
    })

    state.setdefault("playground", {
        "jsx": "",
        "css": "",
        "tab": "jsx",
    })

    state.setdefault("preferences", {
        "vim_mode": False,
        "editor_mode": "practice",
    })

    state.setdefault("rapid_fire", {
        "history": [],
        "high_score": 0,
        "total_attempted": 0,
    })

    state.setdefault("projects", {
        "progress": {},
        "audits": {},
    })

    return state


def _deep_merge_dict(target: dict, source: dict) -> dict:
    """Recursively merge source into target."""
    for key, value in source.items():
        if key in target and isinstance(target[key], dict) and isinstance(value, dict):
            _deep_merge_dict(target[key], value)
        elif value is not None:
            target[key] = copy.deepcopy(value)
    return target


@router.get("/sync/full-state")
def get_full_state(
    user: User = Depends(current_user), db: Session = Depends(get_session)
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)
    return {
        "mastery": state.get("mastery", {}),
        "learn": state.get("learn", {}),
        "library": state.get("library", {}),
        "playground": state.get("playground", {}),
        "preferences": state.get("preferences", {}),
        "rapid_fire": state.get("rapid_fire", {}),
        "projects": state.get("projects", {}),
    }


@router.post("/sync/bulk-merge")
def bulk_merge_state(
    body: FullStateSyncIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    payload = body.model_dump(exclude_unset=True, exclude_none=True)

    # Merge mastery
    if "mastery" in payload:
        client_mastery = payload["mastery"]
        if "solved_units" in client_mastery:
            state["mastery"]["solved_units"].update(client_mastery["solved_units"])
        if "code_snapshots" in client_mastery:
            state["mastery"]["code_snapshots"].update(client_mastery["code_snapshots"])
        if "schedule" in client_mastery:
            state["mastery"]["schedule"].update(client_mastery["schedule"])
        if "active_unit_id" in client_mastery and client_mastery["active_unit_id"]:
            state["mastery"]["active_unit_id"] = client_mastery["active_unit_id"]

    # Merge learn
    if "learn" in payload:
        client_learn = payload["learn"]
        if "completed_topics" in client_learn:
            state["learn"]["completed_topics"].update(client_learn["completed_topics"])
        if "diagrams" in client_learn:
            state["learn"]["diagrams"].update(client_learn["diagrams"])

    # Merge library
    if "library" in payload:
        _deep_merge_dict(state["library"], payload["library"])

    # Merge playground
    if "playground" in payload:
        _deep_merge_dict(state["playground"], payload["playground"])

    # Merge preferences
    if "preferences" in payload:
        _deep_merge_dict(state["preferences"], payload["preferences"])

    # Merge projects
    if "projects" in payload:
        _deep_merge_dict(state["projects"], payload["projects"])

    # Merge rapid fire
    if "rapid_fire" in payload:
        rf = payload["rapid_fire"]
        if "history" in rf and isinstance(rf["history"], list):
            # Combine history and keep latest 100 entries
            combined = state["rapid_fire"].get("history", []) + rf["history"]
            state["rapid_fire"]["history"] = combined[-100:]
        if "high_score" in rf:
            state["rapid_fire"]["high_score"] = max(
                state["rapid_fire"].get("high_score", 0), rf["high_score"]
            )

    save_state(db, user.id, state)
    return {
        "ok": True,
        "state": {
            "mastery": state["mastery"],
            "learn": state["learn"],
            "library": state["library"],
            "playground": state["playground"],
            "preferences": state["preferences"],
            "rapid_fire": state["rapid_fire"],
            "projects": state["projects"],
        },
    }


@router.post("/mastery/solve")
def post_mastery_solve(
    body: MasterySolveIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["mastery"]["solved_units"][body.unit_id] = body.done
    if body.code:
        state["mastery"]["code_snapshots"][body.unit_id] = body.code[:15000]
    if body.schedule_review:
        state["mastery"]["schedule"][body.unit_id] = body.schedule_review

    save_state(db, user.id, state)
    append_activity(
        db,
        user.id,
        {
            "ev": "mastery_solve",
            "unit_id": body.unit_id,
            "done": body.done,
        },
    )
    return {"ok": True, "solved_count": len(state["mastery"]["solved_units"])}


@router.post("/mastery/code")
def post_mastery_code(
    body: MasteryCodeIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["mastery"]["code_snapshots"][body.unit_id] = body.code[:15000]
    save_state(db, user.id, state)
    return {"ok": True}


@router.post("/mastery/active")
def post_mastery_active(
    body: MasteryActiveIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["mastery"]["active_unit_id"] = body.active_unit_id
    save_state(db, user.id, state)
    return {"ok": True}


@router.post("/learn/toggle")
def post_learn_toggle(
    body: LearnToggleIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["learn"]["completed_topics"][body.topic_id] = body.done
    save_state(db, user.id, state)
    append_activity(
        db,
        user.id,
        {
            "ev": "learn_toggle",
            "topic_id": body.topic_id,
            "done": body.done,
        },
    )
    return {"ok": True, "completed_count": len(state["learn"]["completed_topics"])}


@router.post("/learn/diagram")
def post_learn_diagram(
    body: LearnDiagramIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["learn"]["diagrams"][body.topic_id] = body.diagram_xml[:60000]
    save_state(db, user.id, state)
    return {"ok": True}


@router.post("/playground/save")
def post_playground_save(
    body: PlaygroundSaveIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    if body.jsx is not None:
        state["playground"]["jsx"] = body.jsx[:25000]
    if body.css is not None:
        state["playground"]["css"] = body.css[:25000]
    if body.tab is not None:
        state["playground"]["tab"] = body.tab

    save_state(db, user.id, state)
    return {"ok": True}


@router.post("/rapidfire/record")
def post_rapidfire_record(
    body: RapidFireRecordIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    entry = {
        "score": body.score,
        "total": body.total,
        "exam_mode": body.exam_mode,
        "details": body.details or {},
    }
    history = state["rapid_fire"].setdefault("history", [])
    history.append(entry)
    state["rapid_fire"]["history"] = history[-100:]
    state["rapid_fire"]["high_score"] = max(
        state["rapid_fire"].get("high_score", 0), body.score
    )
    state["rapid_fire"]["total_attempted"] = (
        state["rapid_fire"].get("total_attempted", 0) + body.total
    )

    save_state(db, user.id, state)
    append_activity(
        db,
        user.id,
        {
            "ev": "rapidfire_run",
            "score": body.score,
            "total": body.total,
            "exam_mode": body.exam_mode,
        },
    )
    return {"ok": True, "high_score": state["rapid_fire"]["high_score"]}


@router.post("/projects/progress")
def post_project_progress(
    body: ProjectProgressIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["projects"]["progress"][body.project_id] = {
        "status": body.status,
        "details": body.details or {},
    }
    save_state(db, user.id, state)
    return {"ok": True}


@router.post("/preferences/save")
def post_preferences_save(
    body: PreferencesSaveIn,
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
):
    state = load_state(db, user.id)
    state = _ensure_sections(state)

    state["preferences"].update(body.preferences)
    save_state(db, user.id, state)
    return {"ok": True}
