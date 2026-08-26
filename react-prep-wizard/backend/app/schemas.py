from typing import Any

from pydantic import BaseModel, EmailStr, Field


class Credentials(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=200)


class UserOut(BaseModel):
    id: int
    email: str


class AuthOut(BaseModel):
    token: str
    user: UserOut


class ChallengeIn(BaseModel):
    id: str
    done: bool = False
    code: str | None = None
    checks: Any | None = None
    hints_used: int | None = None


class LessonIn(BaseModel):
    key: str
    done: bool = False
    stage: str | None = None
    title: str | None = None


class MasterySolveIn(BaseModel):
    unit_id: str
    done: bool = True
    code: str | None = None
    schedule_review: dict[str, Any] | None = None


class MasteryCodeIn(BaseModel):
    unit_id: str
    code: str


class MasteryActiveIn(BaseModel):
    active_unit_id: str


class LearnToggleIn(BaseModel):
    topic_id: str
    done: bool = True


class LearnDiagramIn(BaseModel):
    topic_id: str
    diagram_xml: str


class PlaygroundSaveIn(BaseModel):
    jsx: str | None = None
    css: str | None = None
    tab: str | None = None


class RapidFireRecordIn(BaseModel):
    score: int
    total: int
    exam_mode: bool = False
    details: dict[str, Any] | None = None


class ProjectProgressIn(BaseModel):
    project_id: str
    status: str
    details: dict[str, Any] | None = None


class PreferencesSaveIn(BaseModel):
    preferences: dict[str, Any]


class FullStateSyncIn(BaseModel):
    mastery: dict[str, Any] | None = None
    learn: dict[str, Any] | None = None
    library: dict[str, Any] | None = None
    playground: dict[str, Any] | None = None
    preferences: dict[str, Any] | None = None
    rapid_fire: dict[str, Any] | None = None
    projects: dict[str, Any] | None = None

