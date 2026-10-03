"""One-record-at-a-time reference worker; no checkpoint on infrastructure failure."""
from __future__ import annotations

import logging
import os
import signal
import threading
from dataclasses import dataclass
from typing import Any, Protocol

import psycopg
from confluent_kafka import Consumer, KafkaError, KafkaException, TopicPartition

from .domain import InvalidEvent, decode_event
from .store import PostgresStore

LOG = logging.getLogger("eventpulse.worker")
DEFAULT_DSN = "postgresql://eventpulse:eventpulse-local-only@localhost:55432/eventpulse"


class Store(Protocol):
    def apply_event(self, event: dict[str, Any]) -> str: ...
    def quarantine(self, topic: str, partition: int, offset: int, raw: bytes, reason: str) -> None: ...


@dataclass(frozen=True)
class Outcome:
    status: str
    event_id: str | None


def process_record(store: Store, raw: bytes, topic: str, partition: int, offset: int) -> Outcome:
    """Return only after a durable effect/duplicate/quarantine decision succeeds."""
    event = None
    try:
        event = decode_event(raw)
        status = store.apply_event(event)
        if status not in ("applied", "duplicate"):
            raise RuntimeError("unexpected durable outcome")
        return Outcome(status, event["event_id"])
    except InvalidEvent as error:
        store.quarantine(topic, partition, offset, raw, str(error))
        return Outcome("quarantined", event["event_id"] if event else None)


def commit_record(consumer: Any, topic: str, partition: int, offset: int) -> None:
    checkpoints = consumer.commit(offsets=[TopicPartition(topic, partition, offset + 1)], asynchronous=False)
    for checkpoint in checkpoints or []:
        if checkpoint.error is not None:
            raise KafkaException(checkpoint.error)


def maybe_crash(outcome: Outcome) -> None:
    # The abrupt exit is disabled unless both explicit testing controls match.
    if (os.environ.get("CRASH_STAGE") == "after_db_before_offset"
            and outcome.event_id is not None
            and os.environ.get("CRASH_ON_EVENT_ID") == outcome.event_id):
        LOG.warning("testing crash after durable DB outcome and before source checkpoint")
        os._exit(86)


def consumer_config() -> dict[str, Any]:
    return {
        "bootstrap.servers": os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "localhost:19092"),
        "group.id": os.environ.get("KAFKA_GROUP_ID", "eventpulse-worker"),
        "enable.auto.commit": False,
        "enable.auto.offset.store": False,
        "auto.offset.reset": "earliest",
        "partition.assignment.strategy": "range",
        "max.poll.interval.ms": 180000,
        "session.timeout.ms": 10000,
    }


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    stopped = threading.Event()
    def stop(_signal, _frame):
        stopped.set()
    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    store = PostgresStore(os.environ.get("DATABASE_URL", DEFAULT_DSN))
    consumer = Consumer(consumer_config())
    try:
        consumer.subscribe(["telemetry-raw"])
        while not stopped.is_set():
            message = consumer.poll(1.0)
            if message is None:
                continue
            error = message.error()
            if error is not None:
                if error.code() == KafkaError._PARTITION_EOF:
                    continue
                LOG.error("broker record error code=%s, leaving checkpoint unchanged", error.code())
                return 2
            topic, partition, offset = message.topic(), message.partition(), message.offset()
            raw = message.value() or b""
            outcome = None
            for attempt in range(3):
                if stopped.is_set():
                    return 0
                try:
                    outcome = process_record(store, raw, topic, partition, offset)
                    break
                except psycopg.Error as error:
                    # Do not log connection strings, SQL parameters or payloads.
                    LOG.warning("database failure class=%s attempt=%s, checkpoint unchanged",
                                type(error).__name__, attempt + 1)
                    if stopped.wait(min(2 ** attempt, 4)):
                        return 0
            if outcome is None:
                LOG.error("database retry budget exhausted; restart replays uncheckpointed work")
                return 2
            maybe_crash(outcome)
            commit_record(consumer, topic, partition, offset)
            LOG.info("durable status=%s topic=%s partition=%s offset=%s",
                     outcome.status, topic, partition, offset)
        return 0
    except KafkaException as error:
        LOG.error("Kafka failure class=%s; uncheckpointed work remains replayable", type(error).__name__)
        return 2
    except Exception as error:
        LOG.error("worker failure class=%s; leaving source checkpoint unchanged", type(error).__name__)
        return 2
    finally:
        consumer.close()
