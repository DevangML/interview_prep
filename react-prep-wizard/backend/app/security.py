"""Password and session-token handling.

Passwords were previously stored as bare `sha256(password)` — unsalted and
fast, i.e. trivially crackable from a dump. New hashes are salted PBKDF2; the
legacy format is still *verified* so nobody is locked out, and every successful
legacy login is transparently rehashed to the new format.
"""
import datetime as dt
import hashlib
import hmac
import secrets

from .config import get_settings

_ALGO = "pbkdf2_sha256"
_ITERATIONS = 260_000


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), _ITERATIONS).hex()
    return f"{_ALGO}${_ITERATIONS}${salt}${digest}"


def verify_password(password: str, stored: str) -> bool:
    if stored.startswith(_ALGO + "$"):
        _, iterations, salt, digest = stored.split("$", 3)
        calc = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt.encode(), int(iterations)
        ).hex()
        return hmac.compare_digest(calc, digest)
    # Legacy unsalted sha256 from the old http.server backend.
    return hmac.compare_digest(hashlib.sha256(password.encode()).hexdigest(), stored)


def needs_rehash(stored: str) -> bool:
    return not stored.startswith(_ALGO + "$")


def new_token() -> str:
    return secrets.token_urlsafe(48)


def hash_token(token: str) -> str:
    """Peppered so a leaked `sessions` table cannot be replayed as live logins."""
    pepper = get_settings().token_pepper.encode()
    return hmac.new(pepper, token.encode(), hashlib.sha256).hexdigest()


def token_expiry() -> dt.datetime:
    days = get_settings().session_ttl_days
    return dt.datetime.now(dt.timezone.utc) + dt.timedelta(days=days)
