import datetime as dt

from sqlalchemy import (
    JSON, DateTime, ForeignKey, Index, Integer, String, Text, func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base

# JSONB on Postgres (indexable, binary), plain JSON on the sqlite fallback.
JSONType = JSON().with_variant(JSONB(), "postgresql")


def utcnow() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    state: Mapped["UserState | None"] = relationship(back_populates="user", uselist=False)


class SessionToken(Base):
    __tablename__ = "sessions"

    # Only the hash is stored: a database dump cannot be replayed as a login.
    token_hash: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    expires_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), index=True)


class UserState(Base):
    """The campaign save-game. One row per user, updated in place, with a
    monotonic revision so a lost-update can be detected rather than silently
    overwriting a newer save."""

    __tablename__ = "user_state"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    state: Mapped[dict] = mapped_column(JSONType)
    revision: Mapped[int] = mapped_column(Integer, default=1)
    updated_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, onupdate=utcnow
    )

    user: Mapped[User] = relationship(back_populates="state")


class StateSnapshot(Base):
    """Append-only history of every save. This is what makes progress
    recoverable even from application-level corruption, not just disk loss."""

    __tablename__ = "state_snapshots"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    revision: Mapped[int] = mapped_column(Integer)
    state: Mapped[dict] = mapped_column(JSONType)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


Index("ix_state_snapshots_user_created", StateSnapshot.user_id, StateSnapshot.created_at.desc())


class Activity(Base):
    __tablename__ = "user_activity"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    event: Mapped[dict] = mapped_column(JSONType)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


Index("ix_user_activity_user_id_desc", Activity.user_id, Activity.id.desc())


class UserCognitiveProfile(Base):
    """Persistent evolving cognitive profile of the user across any device.
    Tracks adaptive rigor level, weakness heatmap, mastered invariants,
    and cloud backups of JD analyses, bug drills, STAR stories, and cheat sheets."""

    __tablename__ = "user_cognitive_profile"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    rigor_level: Mapped[str] = mapped_column(String(32), default="Senior")
    weakness_heatmap: Mapped[dict] = mapped_column(JSONType, default=dict)
    mastered_invariants: Mapped[list] = mapped_column(JSONType, default=list)
    jd_analyses: Mapped[list] = mapped_column(JSONType, default=list)
    bug_drills: Mapped[list] = mapped_column(JSONType, default=list)
    star_stories: Mapped[list] = mapped_column(JSONType, default=list)
    cheat_sheets: Mapped[list] = mapped_column(JSONType, default=list)
    revision: Mapped[int] = mapped_column(Integer, default=1)
    updated_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, onupdate=utcnow
    )

    user: Mapped[User] = relationship()

