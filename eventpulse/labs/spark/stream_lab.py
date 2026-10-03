"""Checkpointed file-based Structured Streaming experiment, using real Spark.

Two queries keep dedup and aggregate state separate. Watermark-bounded dedup is
not a permanent global inbox. The finite fixtures deliberately advance event
time to expose late-data behavior. These are query restarts, not a host crash.
"""
from __future__ import annotations

import argparse
import json
import os
import uuid
from pathlib import Path

from pyspark.sql import functions as F

from telemetry_lab import (
    INPUT_SCHEMA, NORMALIZED_SCHEMA, normalize_events, row_summary,
    session, window_aggregates,
)


def sample(n, second, value=10.0, warehouse="pune-1"):
    return {"schema_version": 1,
            "event_id": str(uuid.uuid5(uuid.NAMESPACE_URL, f"eventpulse-spark:{n}")),
            "warehouse_id": warehouse, "device_id": "scanner-1",
            "metric": "latency_ms", "value": value,
            "occurred_at": f"2026-10-03T00:{second // 60:02d}:{second % 60:02d}.000000Z"}


def seed(work: Path, phase: int):
    folder = work / "input"
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"phase-{phase}.json"
    if path.exists():
        raise ValueError(f"{path} already exists; retain checkpoint evidence, choose a fresh work path")
    if phase == 1:
        first = sample("early-1", 10, 101.0)
        rows = [first, first, sample("early-2", 40, 99.0)]
    elif phase == 2:
        rows = [sample("advance-1", 600, warehouse="clock-fixture")]
    elif phase == 3:
        rows = [sample("too-late", 30, 1000.0),
                sample("advance-2", 660, warehouse="clock-fixture")]
    else:
        raise ValueError("phase must be 1,2,3")
    temporary = work / f"phase-{phase}.partial"
    temporary.write_text("".join(json.dumps(row) + "\n" for row in rows))
    os.replace(temporary, path)


def finish(query, work: Path, label: str):
    if not query.awaitTermination(150):
        query.stop()
        raise TimeoutError(f"{label} exceeded the bounded experiment deadline")
    record = {"query": label, "query_id": str(query.id), "run_id": str(query.runId),
              "progress": list(query.recentProgress)}
    with (work / "progress.jsonl").open("a") as output:
        output.write(json.dumps(record) + "\n")


def run(spark, work: Path):
    work.mkdir(parents=True, exist_ok=True)
    (work / "input").mkdir(exist_ok=True)
    incoming = (spark.readStream.schema(INPUT_SCHEMA).option("maxFilesPerTrigger", 1)
                .json(str(work / "input")))
    deduped = (normalize_events(incoming).withWatermark("event_time", "2 minutes")
               .dropDuplicatesWithinWatermark(["event_id"]))
    query = (deduped.writeStream.format("parquet").outputMode("append")
             .option("path", str(work / "deduplicated"))
             .option("checkpointLocation", str(work / "checkpoint-dedup"))
             .trigger(availableNow=True).start())
    finish(query, work, "dedup")

    canonical = (spark.readStream.schema(NORMALIZED_SCHEMA).option("maxFilesPerTrigger", 1)
                 .parquet(str(work / "deduplicated"))
                 .withWatermark("event_time", "2 minutes"))
    aggregate = window_aggregates(canonical)
    query = (aggregate.writeStream.format("parquet").outputMode("append")
             .option("path", str(work / "windows"))
             .option("checkpointLocation", str(work / "checkpoint-windows"))
             .trigger(availableNow=True).start())
    finish(query, work, "windows")


def report(spark, work: Path):
    deduplicated = spark.read.schema(NORMALIZED_SCHEMA).parquet(str(work / "deduplicated"))
    expected = {sample("early-1", 10)["event_id"], sample("early-2", 40)["event_id"],
                sample("advance-1", 600)["event_id"], sample("advance-2", 660)["event_id"]}
    seen = {r.event_id for r in deduplicated.select("event_id").collect()}
    if seen != expected or deduplicated.count() != 4:
        raise AssertionError(f"Expected 4 deduplicated records with late event excluded; got {seen}")
    windows = spark.read.parquet(str(work / "windows")).where("warehouse_id = 'pune-1'")
    result = row_summary(windows)
    if (len(result) != 1 or result[0]["event_count"] != 2
            or result[0]["mean_value"] != 100.0 or result[0]["above_threshold"] != 1):
        raise AssertionError(f"Window differs from finite expected result: {result}")
    runs = [json.loads(line) for line in (work / "progress.jsonl").read_text().splitlines()]
    identities = {label: {r["query_id"] for r in runs if r["query"] == label}
                  for label in ("dedup", "windows")}
    if any(len(ids) != 1 for ids in identities.values()):
        raise AssertionError(f"Checkpointed query identity was not preserved: {identities}")
    dropped = sum(int(op.get("numRowsDroppedByWatermark", 0))
                  for r in runs if r["query"] == "dedup"
                  for progress in r["progress"] for op in progress.get("stateOperators", []))
    evidence = {"spark_version": spark.version, "unique_output_ids": len(seen),
                "late_event_excluded": True, "dedup_watermark_drop_metric": dropped,
                "warehouse_window": [{**r, "window_start": str(r["window_start"]),
                                      "window_end": str(r["window_end"])} for r in result],
                "checkpoint_query_identity_preserved": True,
                "scope": "finite 3-phase real Spark file-stream restart experiment"}
    (work / "result.json").write_text(json.dumps(evidence, indent=2) + "\n")
    print(json.dumps(evidence, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=("seed", "run", "report", "experiment"))
    parser.add_argument("--work", type=Path, required=True)
    parser.add_argument("--phase", type=int, choices=(1, 2, 3))
    args = parser.parse_args()
    if args.operation == "seed":
        if args.phase is None:
            parser.error("--phase required for seed")
        seed(args.work, args.phase)
        return
    spark = session()
    try:
        if args.operation == "experiment":
            if (args.work / "input").exists() and any((args.work / "input").iterdir()):
                raise ValueError("Experiment requires a fresh work path; do not erase retained evidence")
            for phase in (1, 2, 3):
                seed(args.work, phase)
                run(spark, args.work)
            report(spark, args.work)
        elif args.operation == "run":
            run(spark, args.work)
        else:
            report(spark, args.work)
    finally:
        spark.stop()


if __name__ == "__main__":
    main()

