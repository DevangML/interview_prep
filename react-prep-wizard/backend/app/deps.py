import datetime as dt

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from .db import get_session
from .models import SessionToken, User
from .security import hash_token


def current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_session),
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "unauthorized")

    row = db.get(SessionToken, hash_token(authorization.removeprefix("Bearer ").strip()))
    if row is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "unauthorized")

    expires = row.expires_at
    if expires.tzinfo is None:
        expires = expires.replace(tzinfo=dt.timezone.utc)
    if expires < dt.datetime.now(dt.timezone.utc):
        db.delete(row)
        db.commit()
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "session expired")

    user = db.get(User, row.user_id)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "unauthorized")
    return user
