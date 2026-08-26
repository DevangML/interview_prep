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
