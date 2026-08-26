"""API error handling: one envelope, one place, nothing swallowed.

The login 500 that prompted this was invisible from both ends. The server
logged nothing — uvicorn's default handler prints a traceback only for truly
unhandled exceptions, and never correlates it with the request. The client got
`Internal Server Error` as *HTML*, so its `r.json()` threw and the user saw a
JSON parse error instead of the real failure.

Every error response now has the same shape, carries a request id that also
appears in the server log, and is always JSON:

    {"error": {"code", "message", "status", "requestId", "fields"?}}
"""
import logging
import uuid
from contextvars import ContextVar

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, OperationalError, SQLAlchemyError
from starlette.exceptions import HTTPException as StarletteHTTPException

log = logging.getLogger("api")

REQUEST_ID: ContextVar[str] = ContextVar("request_id", default="-")
HEADER = "X-Request-ID"


def envelope(status_code: int, code: str, message: str, **extra) -> JSONResponse:
    body = {"code": code, "message": message, "status": status_code, "requestId": REQUEST_ID.get()}
    body.update({k: v for k, v in extra.items() if v is not None})
    return JSONResponse(
        status_code=status_code,
        content={"error": body},
        headers={HEADER: REQUEST_ID.get()},
    )


class ApiError(Exception):
    """Raise this for expected failures that deserve a machine-readable code."""

    def __init__(self, status_code: int, code: str, message: str, **extra):
        super().__init__(message)
        self.status_code = status_code
        self.code = code
        self.message = message
        self.extra = extra


def install(app: FastAPI) -> None:
    """Wire the middleware and every handler onto the app."""

    @app.middleware("http")
    async def request_id_middleware(request: Request, call_next):
        rid = request.headers.get(HEADER) or uuid.uuid4().hex[:12]
        token = REQUEST_ID.set(rid)
        try:
            response = await call_next(request)
        except Exception:
            # An exception escaping the middleware chain bypasses the handlers
            # below, so it is logged and enveloped here rather than becoming a
            # bare 500 from Starlette with no record of what happened.
            log.exception("unhandled error rid=%s %s %s", rid, request.method, request.url.path)
            return envelope(500, "internal_error", "Something went wrong on our side.")
        finally:
            REQUEST_ID.reset(token)
        response.headers[HEADER] = rid
        return response

    @app.exception_handler(ApiError)
    async def _api_error(request: Request, exc: ApiError):
        log.warning("%s rid=%s %s %s", exc.code, REQUEST_ID.get(), request.method, request.url.path)
        return envelope(exc.status_code, exc.code, exc.message, **exc.extra)

    @app.exception_handler(StarletteHTTPException)
    async def _http_error(request: Request, exc: StarletteHTTPException):
        detail = exc.detail if isinstance(exc.detail, str) else "Request failed."
        code = {
            400: "bad_request", 401: "unauthorized", 403: "forbidden",
            404: "not_found", 409: "conflict", 429: "rate_limited",
        }.get(exc.status_code, "http_error")
        if exc.status_code >= 500:
            log.error("http %s rid=%s %s", exc.status_code, REQUEST_ID.get(), request.url.path)
        return envelope(exc.status_code, code, detail)

    @app.exception_handler(RequestValidationError)
    async def _validation_error(request: Request, exc: RequestValidationError):
        # Pydantic's raw list is unreadable in a form. Collapse it to
        # field -> message so the client can put the text under the input.
        fields: dict[str, str] = {}
        for err in exc.errors():
            name = ".".join(str(p) for p in err["loc"] if p != "body") or "body"
            fields.setdefault(name, err.get("msg", "Invalid value"))
        first = next(iter(fields.values()), "Invalid request.")
        return envelope(422, "validation_error", first, fields=fields)

    @app.exception_handler(IntegrityError)
    async def _integrity_error(request: Request, exc: IntegrityError):
        log.warning("integrity rid=%s %s", REQUEST_ID.get(), request.url.path)
        return envelope(409, "conflict", "That record already exists.")

    @app.exception_handler(OperationalError)
    async def _operational_error(request: Request, exc: OperationalError):
        # "no such table" and "connection refused" both land here. This is the
        # exact failure that produced the opaque login 500: the database was
        # reachable but unmigrated, so it is called out by name rather than
        # flattened into a generic 500.
        text = str(exc.orig)
        unmigrated = "no such table" in text or "does not exist" in text
        log.error(
            "database %s rid=%s %s: %s",
            "schema missing — run `alembic upgrade head`" if unmigrated else "unavailable",
            REQUEST_ID.get(), request.url.path, text,
        )
        return envelope(
            503, "database_unavailable",
            "The service is not ready. The database schema has not been migrated."
            if unmigrated else "The database is temporarily unavailable.",
        )

    @app.exception_handler(SQLAlchemyError)
    async def _sqlalchemy_error(request: Request, exc: SQLAlchemyError):
        log.exception("database error rid=%s %s", REQUEST_ID.get(), request.url.path)
        return envelope(500, "database_error", "A database error occurred.")

    @app.exception_handler(Exception)
    async def _unhandled(request: Request, exc: Exception):
        # Log everything, return nothing: the traceback is the operator's, the
        # request id is the user's, and they meet in the log.
        log.exception("unhandled rid=%s %s %s", REQUEST_ID.get(), request.method, request.url.path)
        return envelope(
            status.HTTP_500_INTERNAL_SERVER_ERROR, "internal_error",
            "Something went wrong on our side.",
        )
