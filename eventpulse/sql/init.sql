-- EventPulse v1: learning schema. Durable dedup markers must outlive replay.
CREATE TABLE IF NOT EXISTS ingress_events (
    event_id uuid PRIMARY KEY,
    payload jsonb NOT NULL,
    accepted_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE TABLE IF NOT EXISTS outbox (
    outbox_id text PRIMARY KEY,
    topic text NOT NULL CHECK (topic IN ('telemetry-raw', 'telemetry-dlq')),
    message_key text NOT NULL,
    payload jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    published_at timestamptz,
    attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
    last_error text
);
CREATE INDEX IF NOT EXISTS outbox_pending ON outbox(created_at, outbox_id)
    WHERE published_at IS NULL;

CREATE TABLE IF NOT EXISTS consumer_inbox (
    event_id uuid PRIMARY KEY,
    payload jsonb NOT NULL,
    processed_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE TABLE IF NOT EXISTS telemetry_events (
    event_id uuid PRIMARY KEY REFERENCES consumer_inbox(event_id),
    warehouse_id text NOT NULL CHECK (length(warehouse_id) BETWEEN 1 AND 64),
    device_id text NOT NULL CHECK (length(device_id) BETWEEN 1 AND 64),
    metric text NOT NULL CHECK (length(metric) BETWEEN 1 AND 64),
    value double precision NOT NULL CHECK
        (value <> 'NaN'::double precision AND value <> 'Infinity'::double precision
            AND value <> '-Infinity'::double precision),
    occurred_at timestamptz NOT NULL,
    processed_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX IF NOT EXISTS telemetry_lookup ON telemetry_events
    (warehouse_id, metric, occurred_at DESC, event_id);

CREATE TABLE IF NOT EXISTS alerts (
    event_id uuid NOT NULL REFERENCES consumer_inbox(event_id),
    rule_version text NOT NULL,
    reason text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    PRIMARY KEY (event_id, rule_version)
);

CREATE TABLE IF NOT EXISTS rejected_messages (
    source_topic text NOT NULL,
    source_partition integer NOT NULL CHECK (source_partition >= 0),
    source_offset bigint NOT NULL CHECK (source_offset >= 0),
    raw_payload bytea NOT NULL,
    reason text NOT NULL,
    rejected_at timestamptz NOT NULL DEFAULT clock_timestamp(),
    PRIMARY KEY (source_topic, source_partition, source_offset)
);
