"""Pure, shared-contract normalization. Infrastructure errors never become poison."""
from __future__ import annotations

import json
import math
import re
from datetime import datetime, timezone
from typing import Any
from uuid import UUID

FIELDS = frozenset({"schema_version", "event_id", "warehouse_id", "device_id", "metric", "value", "occurred_at"})
IDENTIFIER = re.compile(r"[A-Za-z0-9_.:-]{1,64}\Z", re.ASCII)
UUID_TEXT = re.compile(r"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\Z", re.ASCII)
TIMESTAMP = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]{1,6})?(?:Z|[+-][0-9]{2}:[0-9]{2})\Z", re.ASCII)


class InvalidEvent(ValueError):
    """An input-contract failure, safe to quarantine using source coordinates."""


def _reject_constant(_: str) -> None:
    raise InvalidEvent("nonfinite JSON number is invalid")


def _unique_object(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise InvalidEvent("duplicate JSON object key")
        result[key] = value
    return result


def normalize_event(payload: Any) -> dict[str, Any]:
    if not isinstance(payload, dict) or payload.keys() != FIELDS:
        raise InvalidEvent("exactly the seven event fields are required")
    if type(payload["schema_version"]) is not int or payload["schema_version"] != 1:
        raise InvalidEvent("schema_version must be integer 1")
    event_id = payload["event_id"]
    if not isinstance(event_id, str) or UUID_TEXT.fullmatch(event_id) is None:
        raise InvalidEvent("event_id must be canonical UUID text")
    canonical_id = str(UUID(event_id))
    for name in ("warehouse_id", "device_id", "metric"):
        value = payload[name]
        if not isinstance(value, str) or IDENTIFIER.fullmatch(value) is None:
            raise InvalidEvent(f"{name} must match ASCII [A-Za-z0-9_.:-]{{1,64}}")
    number = payload["value"]
    if type(number) not in (int, float):
        raise InvalidEvent("value must be a finite JSON number")
    try:
        number = float(number)
    except (OverflowError, ValueError) as error:
        raise InvalidEvent("value must be finite") from error
    if not math.isfinite(number):
        raise InvalidEvent("value must be finite")
    stamp = payload["occurred_at"]
    if not isinstance(stamp, str) or TIMESTAMP.fullmatch(stamp) is None:
        raise InvalidEvent("occurred_at has invalid timestamp syntax")
    if not stamp.endswith("Z"):
        hours, minutes = int(stamp[-5:-3]), int(stamp[-2:])
        if minutes >= 60 or hours > 18 or (hours == 18 and minutes != 0):
            raise InvalidEvent("occurred_at offset must be within 18 hours")
    try:
        instant = datetime.fromisoformat(stamp.replace("Z", "+00:00"))
        instant = instant.astimezone(timezone.utc)
    except (ValueError, OverflowError) as error:
        raise InvalidEvent("occurred_at must be valid in years 0001 through 9999") from error
    canonical_time = instant.isoformat(timespec="microseconds").replace("+00:00", "Z")
    return {
        "schema_version": 1,
        "event_id": canonical_id,
        "warehouse_id": payload["warehouse_id"],
        "device_id": payload["device_id"],
        "metric": payload["metric"],
        "value": number,
        "occurred_at": canonical_time,
    }


def decode_event(raw: bytes) -> dict[str, Any]:
    """Reject malformed UTF-8/JSON and duplicate keys; leave resource faults uncaught."""
    try:
        payload = json.loads(raw.decode("utf-8"), object_pairs_hook=_unique_object,
                             parse_constant=_reject_constant)
    except InvalidEvent:
        raise
    except (UnicodeDecodeError, ValueError) as error:
        raise InvalidEvent("invalid UTF-8 or JSON payload") from error
    return normalize_event(payload)
