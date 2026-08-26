from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..db import get_session
from ..deps import current_user
from ..models import SessionToken, User
from ..schemas import AuthOut, Credentials, UserOut
from ..security import (
    hash_password, hash_token, needs_rehash, new_token, token_expiry, verify_password,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _issue_token(db: Session, user: User) -> str:
    token = new_token()
    db.add(
        SessionToken(
            token_hash=hash_token(token), user_id=user.id, expires_at=token_expiry()
        )
    )
    db.commit()
    return token


@router.post("/register", response_model=AuthOut)
def register(body: Credentials, db: Session = Depends(get_session)):
    user = User(email=body.email.lower(), password_hash=hash_password(body.password))
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "email already exists")
    return AuthOut(token=_issue_token(db, user), user=UserOut(id=user.id, email=user.email))


@router.post("/login", response_model=AuthOut)
def login(body: Credentials, db: Session = Depends(get_session)):
    user = db.scalar(select(User).where(User.email == body.email.lower()))
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid credentials")

    # Silently upgrade anyone still on the old unsalted sha256 hash.
    if needs_rehash(user.password_hash):
        user.password_hash = hash_password(body.password)
        db.commit()

    return AuthOut(token=_issue_token(db, user), user=UserOut(id=user.id, email=user.email))


@router.post("/logout")
def logout(
    user: User = Depends(current_user),
    db: Session = Depends(get_session),
    authorization: str | None = None,
):
    db.query(SessionToken).filter(SessionToken.user_id == user.id).delete()
    db.commit()
    return {"ok": True}


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(current_user)):
    return UserOut(id=user.id, email=user.email)
