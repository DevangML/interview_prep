# EventPulse implementation contract, version 1

This is a supplied reference learning project. Building, testing or reading it does not establish the learner's authorship or mastery. The curriculum tracks those independently. The project is not Cognizant's prescribed architecture.

## Core behavior

`POST /v1/events` accepts a JSON object with exactly these fields:

```json
{"schema_version":1,"event_id":"11111111-1111-4111-8111-111111111111","warehouse_id":"pune-1","device_id":"scanner-1","metric":"latency_ms","value":120.0,"occurred_at":"2026-10-03T09:00:00Z"}
```

- `event_id` is a UUID chosen by the caller for one logical event; retries reuse it.
- `warehouse_id`, `device_id`, and `metric` match ASCII `[A-Za-z0-9_.:-]{1,64}`; `value` is a finite JSON number (not a boolean/string); `schema_version` is the integer 1 (not a boolean/string); `occurred_at` matches `YYYY-MM-DDTHH:MM:SS[.1-to-6-digits](Z|+HH:MM|-HH:MM)` and parses to a valid date/time. Reject leap seconds and precision beyond six fractional digits. Require years 0001–9999 both before and after UTC conversion and offsets of at most 18 hours in absolute value (18:00 is the limit). Both languages normalize timestamps to UTC with exactly six fractional digits and `Z`, and normalize UUID text to its canonical lowercase form. This shared normalization prevents nanosecond truncation and Unicode-length disagreement.
- A new accepted event inserts both `ingress_events` and `outbox` in one PostgreSQL transaction, then returns 202. This means **durably queued in the lab database**, not yet processed.
- An identical normalized payload for the same event ID returns 200 with `duplicate:true`; a different payload for that ID returns 409. Invalid input returns 400. Infrastructure failures must not produce a success acknowledgement.
- A local bearer token from `EVENTPULSE_API_TOKEN` protects `/v1/**`; comparison must not log credentials. This is a local lab access gate, not OAuth/RBAC implementation. Health can be public.

## Shared SQL tables

Root owns `sql/init.sql`; Java and Python conform to this schema.

- `ingress_events(event_id uuid primary key, payload jsonb not null, accepted_at timestamptz)`.
- `outbox(outbox_id text primary key, topic text, message_key text, payload jsonb, created_at timestamptz, published_at timestamptz null, attempts integer, last_error text null)`.
  - Ingress ID is `ingress:<event_id>`, destination `telemetry-raw`, partition key `warehouse_id:device_id:metric`.
  - Rejection ID is `reject:<topic>:<partition>:<offset>`, destination `telemetry-dlq`; its message key is the source coordinate.
- `consumer_inbox(event_id uuid primary key, payload jsonb, processed_at timestamptz)`.
- `telemetry_events(event_id uuid primary key references consumer_inbox, warehouse_id text, device_id text, metric text, value double precision, occurred_at timestamptz, processed_at timestamptz)`.
- `alerts(event_id uuid references consumer_inbox, rule_version text, reason text, created_at timestamptz, primary key(event_id,rule_version))`.
- `rejected_messages(source_topic text, source_partition integer, source_offset bigint, raw_payload bytea, reason text, rejected_at timestamptz, primary key(source_topic,source_partition,source_offset))`.

## Outbox relay

Java's scheduled relay selects a small batch of pending rows using `FOR UPDATE SKIP LOCKED` within a DB transaction. Publish each row with a bounded Kafka acknowledgement wait, then mark its `published_at`. Preserve failed rows for retry and record attempts/error without credentials.

A crash after Kafka acknowledgement but before DB commit can publish a duplicate. This is permitted and must be tested. Locks are intentionally held during bounded publication in this small reference; a lease/CDC relay is an extension. The relay's scheduling does not guarantee event-time or original-request ordering.

## Python worker

- Disable automatic offset commits. Process records sequentially per consumer instance, committing an explicit next offset only after the DB transaction for that record succeeds.
- Validate and normalize the payload. In one DB transaction, insert its inbox ID with `ON CONFLICT DO NOTHING RETURNING event_id`. If new, insert the telemetry row and, if `value > 100`, one `threshold-v1` alert. If existing, confirm stored normalized JSONB payload equality; an ID/payload mismatch is invalid input, not an additional business effect.
- Invalid JSON/schema/ID conflict is quarantined by source topic/partition/offset and a `telemetry-dlq` outbox row in one DB transaction. Its DLQ envelope contains source coordinate, error and base64 raw payload. Advance source offset only after durable quarantine. Broker delivery of the DLQ is asynchronous through the Java relay.
- Database or transient infrastructure failures are retryable and must not be classified as poison input. Do not advance source progress on them.
- A testing-only `CRASH_STAGE=after_db_before_offset` and `CRASH_ON_EVENT_ID=<uuid>` can terminate after successful DB effects and before source offset commit. Restart with injection disabled to observe replay and one DB effect. Keep this opt-in and documented.

## Guarantees and boundaries

Under PostgreSQL durability, intact constraints, stable IDs distinguishing logical events, retained inbox markers for the entire permitted replay horizon, correct source progress, and eventual successful retries before Kafka retention expiry, valid events have at most one committed telemetry row and one alert per rule version. Accepted IDs remain auditable in the ingress ledger. This does not mean the consumer executes once or that every conceivable failure is tolerated.

The simple topology is single-broker outage/recovery practice. A separate three-node KRaft configuration exercises process failover; all local nodes share the host. Cross-region disaster recovery, arbitrary side effects, OAuth, CDC, migrations, Spark and cloud need their separately labeled labs.

## Ownership and checks

- Root: SQL schema, Compose, integration scripts, formal specification, curriculum tooling and final validation.
- Java implementation agent: `java-producer/` only.
- Python implementation agent: `python-consumer/` only.
- Curriculum agents: their assigned files under `prep/` only.
- No generated project code closes a learner competency. All learner evidence begins unassessed.
