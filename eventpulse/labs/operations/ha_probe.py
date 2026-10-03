#!/usr/bin/env python3
"""Supplied reference: isolated HA-lab Kafka admission and replay probe.

No database-effect or global exactly-once claim is made. Produce callbacks record
acknowledgements; a timeout may be ambiguous, so failed IDs are retained too.
"""
from __future__ import annotations

import argparse
import json
import time
import uuid
from collections import Counter
from pathlib import Path

from confluent_kafka import Consumer, KafkaException, Producer, TopicPartition
from confluent_kafka.admin import AdminClient, ConfigResource, NewTopic, ResourceType

BOOTSTRAP = "localhost:29092,localhost:29093,localhost:29094"


def checked_client(bootstrap: str) -> dict:
    endpoints = bootstrap.split(",")
    allowed = {f"{host}:{port}" for host in ("localhost", "127.0.0.1")
               for port in (29092, 29093, 29094)}
    if not endpoints or any(endpoint not in allowed for endpoint in endpoints):
        raise ValueError("This reference probe only targets loopback HA-lab ports 29092-29094")
    return {"bootstrap.servers": bootstrap, "socket.timeout.ms": 5000}


def prepare(config: dict, topic: str) -> dict:
    admin = AdminClient(config)
    try:
        admin.create_topics([
            NewTopic(topic, 1, 3, config={
                "min.insync.replicas": "2", "retention.ms": "86400000",
                "unclean.leader.election.enable": "false",
            })
        ])[topic].result(20)
    except KafkaException as exc:
        if exc.args[0].name() != "TOPIC_ALREADY_EXISTS":
            raise
    metadata = snapshot(config, topic)
    resource = ConfigResource(ResourceType.TOPIC, topic)
    settings = admin.describe_configs([resource])[resource].result(15)
    if any(len(p["replicas"]) != 3 for p in metadata["partitions"]):
        raise AssertionError("Probe topic must have replication factor 3")
    if settings["min.insync.replicas"].value != "2":
        raise AssertionError("Probe topic must have min.insync.replicas=2")
    return {"prepared": True, **metadata, "min_insync_replicas": 2}


def snapshot(config: dict, topic: str) -> dict:
    metadata = AdminClient(config).list_topics(topic=topic, timeout=12)
    entry = metadata.topics.get(topic)
    if entry is None or entry.error:
        raise RuntimeError(f"Cannot describe {topic}: {None if entry is None else entry.error}")
    return {"topic": topic, "brokers": sorted(metadata.brokers), "partitions": [
        {"partition": p.id, "leader": p.leader, "replicas": p.replicas, "isr": p.isrs}
        for p in sorted(entry.partitions.values(), key=lambda p: p.id)
    ]}


def send(config: dict, args: argparse.Namespace) -> dict:
    producer = Producer({
        **config, "enable.idempotence": True, "acks": "all",
        "delivery.timeout.ms": 8000, "request.timeout.ms": 3000,
        "retry.backoff.ms": 200,
    })
    expected = [str(uuid.uuid5(uuid.NAMESPACE_URL, f"eventpulse-ha:{args.run_id}:{i}"))
                for i in range(args.count)]
    acked, failures = [], []
    def delivered(error, message):
        event_id = message.key().decode()
        if error is None:
            acked.append(event_id)
        else:
            failures.append({"event_id": event_id, "error": str(error),
                             "outcome": "unknown-or-failed"})
    for i, event_id in enumerate(expected):
        producer.produce(args.topic, partition=0, key=event_id.encode(),
                         value=json.dumps({"event_id": event_id, "run_id": args.run_id,
                                           "sequence": i}).encode(),
                         on_delivery=delivered)
        producer.poll(0)
    outstanding = producer.flush(15)
    report = {"topic": args.topic, "run_id": args.run_id, "expected_ids": expected,
              "acknowledged_ids": acked, "failures": failures,
              "outstanding_callbacks": outstanding,
              "acknowledgement_boundary": "acks=all with RF3/minISR2; isolated lab"}
    args.ledger.parent.mkdir(parents=True, exist_ok=True)
    args.ledger.write_text(json.dumps(report, indent=2) + "\n")
    if args.expect_blocked:
        if acked or outstanding:
            raise AssertionError(f"Expected zero acknowledged records, saw {len(acked)}")
        report["expected_blocked_observed"] = True
    elif failures or outstanding or set(acked) != set(expected):
        raise AssertionError(f"Incomplete acknowledgements; evidence saved in {args.ledger}")
    return report


def verify(config: dict, args: argparse.Namespace) -> dict:
    ledger = json.loads(args.ledger.read_text())
    if ledger["topic"] != args.topic:
        raise ValueError("Ledger topic mismatch")
    expected = set(ledger["acknowledged_ids"])
    if not expected:
        raise ValueError("Verification needs an acknowledged-record ledger")
    consumer = Consumer({
        **config, "group.id": f"ha-lab-verification-{uuid.uuid4()}",
        "enable.auto.commit": False, "auto.offset.reset": "earliest",
    })
    counts = Counter()
    try:
        low, high = consumer.get_watermark_offsets(TopicPartition(args.topic, 0), timeout=12)
        consumer.assign([TopicPartition(args.topic, 0, low)])
        deadline = time.monotonic() + args.timeout
        position = low
        while position < high and time.monotonic() < deadline:
            message = consumer.poll(1)
            if message is None:
                continue
            if message.error():
                raise KafkaException(message.error())
            position = message.offset() + 1
            payload = json.loads(message.value())
            if payload.get("run_id") == ledger["run_id"]:
                counts[payload["event_id"]] += 1
        missing = sorted(expected - counts.keys())
        result = {"topic": args.topic, "run_id": ledger["run_id"],
                  "snapshot_low_offset": low, "snapshot_high_offset": high,
                  "read_next_offset": position, "acknowledged": len(expected),
                  "unique_observed": len(counts), "missing_acknowledged_ids": missing,
                  "extra_deliveries_for_run": sum(max(0, n - 1) for n in counts.values()),
                  "scope": "all acknowledged IDs observed within this retained log snapshot"}
        if missing or position < high:
            raise AssertionError(json.dumps(result))
        return result
    finally:
        consumer.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=("prepare", "snapshot", "send", "verify"))
    parser.add_argument("--bootstrap", default=BOOTSTRAP)
    parser.add_argument("--topic", default="ha-probe")
    parser.add_argument("--run-id", default="baseline")
    parser.add_argument("--count", type=int, default=20)
    parser.add_argument("--ledger", type=Path,
                        default=Path(__file__).parent / "artifacts" / "baseline.json")
    parser.add_argument("--expect-blocked", action="store_true")
    parser.add_argument("--timeout", type=float, default=30)
    args = parser.parse_args()
    if not args.topic.startswith("ha-") or not 1 <= args.count <= 1000:
        parser.error("Topic must start ha- and count must be 1-1000")
    config = checked_client(args.bootstrap)
    result = (prepare(config, args.topic) if args.operation == "prepare" else
              snapshot(config, args.topic) if args.operation == "snapshot" else
              send(config, args) if args.operation == "send" else verify(config, args))
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()

