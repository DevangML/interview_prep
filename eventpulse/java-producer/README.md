# Java ingestion and outbox reference

Java 17 / Spring Boot 3.5.6, pinned for this lab; this is not a claim about the employer's runtime. Follow [CONTRACT.md](../CONTRACT.md) for the shared schema and guarantee assumptions.

The API validates exact shape and JSON scalar types, normalizes stable UUIDs and UTC timestamps, and commits ingress plus outbox in one PostgreSQL transaction. 202 means durably queued. Duplicate equivalent JSONB payload returns 200; conflicting identity returns 409. The bearer gate protects /v1; it is a local lab gate, not OAuth or tenant authorization.

The relay uses row locks and FOR UPDATE SKIP LOCKED with a small configurable batch and bounded broker acknowledgment wait. It releases pending failures for retry. A broker acknowledgment followed by database rollback can publish again. A producer's idempotence setting does not remove this cross-system crash window. Row locks intentionally remain held while this reference waits; leases or CDC are separate extensions.

Required configuration is EVENTPULSE_API_TOKEN. Optional variables: DATABASE_URL (a JDBC URL), DATABASE_USER, DATABASE_PASSWORD, KAFKA_BOOTSTRAP_SERVERS, PORT, RELAY_ENABLED, RELAY_DELAY_MS, RELAY_BATCH_SIZE, RELAY_ACK_TIMEOUT_MS. Do not commit production secrets. Defaults target the documented local lab ports.

```sh
mvn -B -Dmaven.repo.local=../.cache/maven verify
```

Run only after the root project brings up and initializes PostgreSQL and Kafka. Root Compose builds this directory without host bind mounts. For local JVM execution set the environment variables above and run the built jar. Public health is /actuator/health; protected event status is GET /v1/events/{uuid}.

Tests deliberately separate pure validation, local bearer behavior, HTTP status mapping, and service decision paths. The subclass mock maker avoids JVM agent attachment; these tests do not mock final classes. Mockito tests do not prove transaction rollback or JSONB database semantics; the root integration suite must exercise actual PostgreSQL and the Spring transaction proxy. Reading or executing this reference does not establish learner authorship, independent reconstruction or mastery.
