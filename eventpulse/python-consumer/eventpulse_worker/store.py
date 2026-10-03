"""Durable inbox/effects and rejected-message/outbox transactions."""
from __future__ import annotations

import base64
from typing import Any

import psycopg
from psycopg.types.json import Jsonb

from .domain import InvalidEvent


class StoreInvariantError(RuntimeError):
    """Broken durable state is operational failure, not invalid input."""


class PostgresStore:
    def __init__(self, dsn: str):
        self.dsn = dsn

    def _connect(self):
        # A fresh bounded connection per transaction is intentionally simple for
        # this reference. Pooling and measured capacity are later exercises.
        return psycopg.connect(self.dsn, connect_timeout=5,
                               options="-c statement_timeout=5000 -c lock_timeout=3000")

    def apply_event(self, event: dict[str, Any]) -> str:
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO consumer_inbox(event_id,payload) VALUES (%s,%s) "
                    "ON CONFLICT(event_id) DO NOTHING RETURNING event_id",
                    (event["event_id"], Jsonb(event)),
                )
                inserted = cursor.fetchone()
                if inserted is None:
                    cursor.execute("SELECT payload = %s FROM consumer_inbox WHERE event_id=%s",
                                   (Jsonb(event), event["event_id"]))
                    existing = cursor.fetchone()
                    if existing is None:
                        raise StoreInvariantError("deduplication marker disappeared")
                    if not existing[0]:
                        raise InvalidEvent("event_id payload conflict")
                    result = "duplicate"
                else:
                    cursor.execute(
                        "INSERT INTO telemetry_events(event_id,warehouse_id,device_id,metric,value,occurred_at) "
                        "VALUES (%s,%s,%s,%s,%s,%s)",
                        (event["event_id"], event["warehouse_id"], event["device_id"],
                         event["metric"], event["value"], event["occurred_at"]),
                    )
                    if event["value"] > 100:
                        cursor.execute("INSERT INTO alerts(event_id,rule_version,reason) VALUES (%s,%s,%s)",
                                       (event["event_id"], "threshold-v1", "value > 100"))
                    result = "applied"
        # Exiting the connection context commits before returning a success.
        return result

    def quarantine(self, topic: str, partition: int, offset: int, raw: bytes, reason: str) -> None:
        source = {"topic": topic, "partition": partition, "offset": offset}
        coordinate = f"{topic}:{partition}:{offset}"
        envelope = {"source": source, "error": reason,
                    "raw_payload_base64": base64.b64encode(raw).decode("ascii")}
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO rejected_messages(source_topic,source_partition,source_offset,raw_payload,reason) "
                    "VALUES (%s,%s,%s,%s,%s) ON CONFLICT DO NOTHING",
                    (topic, partition, offset, raw, reason),
                )
                cursor.execute(
                    "INSERT INTO outbox(outbox_id,topic,message_key,payload) VALUES (%s,%s,%s,%s) "
                    "ON CONFLICT(outbox_id) DO NOTHING",
                    (f"reject:{coordinate}", "telemetry-dlq", coordinate, Jsonb(envelope)),
                )
