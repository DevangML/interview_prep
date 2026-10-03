# EventPulse systems handbook: models, failure traces and interview defenses

Reference date: 3 October 2026. Companion inventory: [systems.json](/Users/devang/Desktop/interview_prep/eventpulse/prep/systems.json). Runtime contract: [CONTRACT.md](/Users/devang/Desktop/interview_prep/eventpulse/CONTRACT.md).

This handbook develops twelve hard reasoning clusters. The inventory separately supplies 90 competencies, 180 questions, exercises, prerequisites and answer criteria. These are preparation targets, not Cognizant's private question bank. Reference code supplied by an assistant does not establish your independent ability. Every competency begins `unassessed`.

`core` establishes the required technology foundations and a defensible baseline. `depth` adds realistic failure/performance defenses. `extension` is optional advanced work; it must not displace failed core skills. The 144.5 estimated exercise hours in this inventory are rough planning inputs, exclude much implementation/repetition, and do not guarantee mastery or imply a compressed calendar.

The source references deliberately use PostgreSQL 15 and Kafka 4.1 documentation. They do not assert those are the latest releases or the version required by this employer. Actual broker, Java client, Python client and group protocol must be recorded with every experiment. A Java client feature is not automatically supported under the same name by a Python client.

## 1. Specify the object being protected

For logical event `e`, distinguish submission attempts, durable ingress acceptance, record publications, processing executions and committed effects. Let `A(e)` denote ingress acceptance and `N(e)` the number of committed telemetry insertions for that event ID. The desired safety property is:

\[
\forall e:\ N(e)\leq1.
\]

For valid accepted events, eventual completion is a different property:

\[
A(e)\land\operatorname{valid}(e)\land\operatorname{eventuallyRecovering}(e)
\Rightarrow\Diamond\bigl(N(e)=1\bigr).
\]

The diamond means eventually. Its assumptions include durable storage, intact constraints, finite outages, fair retries, retained source data and retained identity markers. No algorithm can promise completion while every required service remains unavailable forever. Safety must remain true while progress is unavailable.

Use a state table with `accepted`, `pending publication`, `published attempt`, `applied` and `quarantined source record`. Publication is not application; acceptance is not completion. Repeated publication may leave application count unchanged. Invalid arbitrary Kafka messages may have no valid event ID; quarantine is keyed by source coordinate, not invented logical identity.

For a finite controlled test, reconcile accepted IDs rather than totals. In an experiment where every accepted event has a valid logical identity, partition its outcomes into completed, pending and an explicitly mapped terminal rejection set. Require disjointness. Do not classify an already successful ID as rejected merely because a conflicting later message used that ID. A loss and a duplication can cancel in row totals while violating identity conservation.

**Defense:** “My invariant concerns committed database effects per logical event ID. The source can deliver repeatedly. Progress additionally depends on recovery and replay retention.” Follow-ups: distinguish safety from liveness, name the acceptance boundary, explain malformed messages without IDs. Pass only if you can produce a failing trace for an omitted assumption. [Raft paper: explicit safety and progress reasoning](https://raft.github.io/raft.pdf).

## 2. Durable API acceptance and the outbox

Consider two independent writes, ingress database `D` and Kafka `K`. Directly writing them cannot eliminate every crash gap:

| Order | Permitted trace | Observable problem |
|---|---|---|
| Database first | commit `D`; crash before `K` | Accepted work lacks publication unless a durable retry mechanism exists |
| Kafka first | publish `K`; fail `D` | Downstream work exists without the intended committed ingress state |

The reference changes the first write into one database transaction containing both ingress and durable outbox intent. It acknowledges acceptance only after that transaction commits. The relay publishes the outbox record, waits for a bounded broker outcome, then marks the row published.

| Relay crash point | Recovery behavior |
|---|---|
| Before durable ingress transaction | No success acknowledgement was warranted |
| After ingress/outbox commit, before relay | Pending intent remains |
| During publish with unknown outcome | Retry may duplicate publication |
| After broker acknowledgement, before publication mark commits | Retry can publish again |
| After publication mark commits | Relay need not publish that row again |

Therefore the construction protects durable intent; it does not prove one Kafka append. The consumer still needs a sink guard. `SKIP LOCKED` prevents live relays from taking the same locked row, but crashes and ambiguous publish results remain relevant. In this bounded lab the database transaction holds locks during bounded publication. A scalable lease or CDC relay is a separate design exercise.

A retry reuses the caller's logical event ID. Same ID and same normalized payload returns the prior accepted result. Same ID and different normalized payload is a conflict. A lost HTTP response does not distinguish failed execution from committed execution. Numeric, UUID and timestamp normalization must match in Java and Python; the contract defines that representation.

**Defense:** draw the acknowledgement boundary and publish/mark gap without prompting. Follow-ups: transaction lock duration, rejected infrastructure calls, stale leases, payload conflict. Passing requires explaining a permitted duplicate and why it does not duplicate the protected effect. [Debezium outbox reference](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html), [HTTP method and retry semantics](https://www.rfc-editor.org/rfc/rfc9110.html).

## 3. Derive one database effect from repeated execution

Assume stable IDs distinguishing intended events, one durable database, a unique inbox key, and a transaction atomically containing insertion and every protected effect. Markers remain available throughout **all permitted replay paths**: ordinary retries, outbox republication, DLQ redrive, manual offsets and restored backups. An archived marker counts only if the deduplication decision consults it correctly.

Pseudocode, with database parameters bound rather than interpolated:

```sql
BEGIN;
INSERT INTO consumer_inbox(event_id, payload, processed_at)
VALUES ($1, $2::jsonb, now())
ON CONFLICT (event_id) DO NOTHING
RETURNING event_id;
-- Application branches on whether insertion returned a row.
-- Winner: insert telemetry_events and qualifying alerts in this transaction.
-- Duplicate: compare existing normalized payload; mismatch is a conflict.
COMMIT;
-- Only now advance this source partition checkpoint.
```

The SQL is a transactional template, not a complete runnable script with supplied parameters. The application must branch correctly; executing effect statements unconditionally defeats the construction.

**At-most-one proof.** The unique key permits at most one committed inbox insertion for `e`. Every protected effect is guarded by that successful insertion. Transaction atomicity couples the marker and effect. Hence `N(e)≤1` even with concurrent duplicate deliveries. A rolled-back winning attempt leaves no committed marker or effect, permitting a later attempt.

**Conditional at-least-one proof.** A valid event eventually reaches a successful processing transaction before retained source/identity is unavailable, and no conflicting event already occupies its ID. That transaction commits the effect. Thus `N(e)≥1`. Combining both yields `N(e)=1` under these assumptions.

| Crash location | Marker/effect state | Replay |
|---|---|---|
| Before DB commit | Neither durable | A new attempt may win |
| After DB commit, before offset | Both durable | Existing marker suppresses repeat effect |
| After offset | Both durable | No normal replay needed |

Counterexamples: `ON CONFLICT DO UPDATE counter=counter+1` increments on duplicates; a marker committed alone suppresses a missing effect; marker cleanup while old source remains replayable permits another effect. Email or payment outside this transaction is not protected by this theorem. Changing rule versions is another effect identity problem: blindly skipping every existing event cannot retrospectively apply a new rule. Design a versioned effect key and explicit replay policy for that extension.

**Defense:** state every proof assumption, then remove one and construct its counterexample. Follow-ups: concurrent duplicates, conflicting payloads, retention, rule upgrades and external effects. [PostgreSQL INSERT/conflict behavior](https://www.postgresql.org/docs/15/sql-insert.html).

## 4. Checkpoint only a durable completed prefix

For one partition, suppose fetched records are at offsets `10,11,12`. DB outcomes are complete, failed, complete. Advancing the recovery checkpoint to `13` skips `11` after a restart. The safe next checkpoint is `11` until its durable terminal decision succeeds.

With concurrent workers, maintain the ordered list of **actually fetched required records** and their durable outcomes. Advance only across its completed prefix. Numeric offsets can have legitimate gaps from compaction or transactional filtering: do not wait for every integer as though it necessarily identifies a visible record. The prefix is over the delivery sequence with appropriate next-position metadata. Independent partitions have independent frontiers; never use one global maximum.

The reference sequential consumer avoids the parallel-frontier problem by processing a record fully before explicitly committing its next offset. A DB failure must retain the current message for retry or seek back safely; polling another record and eventually committing beyond the failed one would violate the rule. A successful DB commit followed by an offset-commit failure is replay-safe only because the inbox guard exists.

Ownership changes create another race: old worker starts DB work; partition transfers; new worker handles the same record. Broker ownership/commit checks protect the group's offsets, not arbitrary external writes. The guarded sink tolerates duplicates, while order-sensitive updates may also require sequence or ownership fencing.

**Defense:** on paper handle two partitions and out-of-order completions, including a real offset gap. Follow-ups: consumer position versus commit, revoke/lost callbacks, stale work, deliberate quarantine. Pass only if no unfinished required record can be skipped. [Offset metadata API](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/consumer/OffsetAndMetadata.html), [rebalance callback contract](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/consumer/ConsumerRebalanceListener.html).

## 5. Kafka durability, idempotence and protocol boundaries

Use a hypothetical three-replica partition with `acks=all` and minimum ISR two. Distinguish configured replicas from the replicas currently considered in sync. The exact write/election behavior must be checked against effective topic/broker configuration and version. A minimum ISR rule can trade rejected writes for stronger tolerated-failure assumptions; it cannot protect against every correlated disk or host failure.

KRaft's controller quorum manages metadata. Partition replication protects record copies. A controller majority and an adequate data replica set are different conditions. Three colocated processes can exercise process failure while all remain exposed to one host outage. A single broker/controller can practice restart recovery but cannot demonstrate replicated data failover. [KRaft operations](https://kafka.apache.org/41/operations/kraft/), [topic replication/retention settings](https://kafka.apache.org/41/configuration/topic-configs/).

Producer idempotence handles the producer protocol's retry sequences. A new application send after response loss can be another append. Kafka transactions can atomically couple Kafka output and consumed Kafka offsets; they do not automatically include the database. `read_committed` limits transactional visibility, with open transactions affecting the readable frontier. It still is not a PostgreSQL effect guarantee. [Producer API](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html).

Classic consumer assignment strategies and the newer consumer group protocol are distinct. Record the selected protocol and client support. Under the newer protocol, some heartbeat/session controls are broker-managed; Java configuration examples are not universal Python-client instructions. [Consumer rebalance protocol](https://kafka.apache.org/41/operations/consumer-rebalance-protocol/).

**Defense:** answer “what survives?” for one replica loss, ISR shrink, controller outage and full host failure separately. Follow-ups: transport retry versus application duplicate, aborted transaction visibility, protocol compatibility. Passing requires one explicit limit on each guarantee.

## 6. Retry, quarantine and ordering policy

Split failures into invalid input, transient infrastructure, and ambiguous outcomes. Invalid JSON/contract payload can be quarantined. A DB disconnect is not malformed input. Retrying invalid data forever blocks a partition; quarantining a DB outage hides recoverable work.

The reference records rejected source coordinates and a DLQ outbox intent **in one DB transaction**, then checkpoints the source. Delivery to the DLQ topic occurs asynchronously through the relay. This differs from two uncoordinated Kafka operations “publish DLQ, commit source.” It also means “durably quarantined” and “visible in DLQ topic” are different milestones.

For strict sequence-sensitive operations, moving a failed record to another topic permits later records to overtake it. Options include blocking the partition, per-key buffering with a bounded gap policy, or allowing correction with version gates. Each sacrifices something: availability, memory, simplicity or immediate finality. The baseline threshold rule records an independent fact and does not claim sophisticated event-time anomaly detection.

If retry layers permit up to `r1,r2,r3` attempts independently, a single logical operation can drive up to `r1*r2*r3` downstream attempts in the worst nested case. This is an upper-bound calculation under full nesting, not an observed amplification rate. Bound overall deadlines, attempts and queue sizes; add jitter to reduce synchronized retries. [Overload handling principles](https://sre.google/sre-book/handling-overload/).

**Defense:** classify five injected failures and trace the next source checkpoint. Follow-ups: DLQ relay outage, redrive identity, retry order and nested budgets. Pass only if infrastructure errors do not silently become terminal input rejection.

## 7. SQL semantics before optimization

These illustrative read queries use the shared reference schema. They require a populated database to produce results; reading them is not execution evidence.

Latest three events per device:

```sql
WITH ranked AS (
  SELECT event_id, warehouse_id, device_id, metric, occurred_at, value,
         row_number() OVER (
           PARTITION BY warehouse_id, device_id, metric
           ORDER BY occurred_at DESC, event_id DESC
         ) AS rn
  FROM telemetry_events
)
SELECT * FROM ranked WHERE rn <= 3;
```

Timestamps can tie, so ID defines a deterministic tie rule. That chosen order does not prove causal order. Ranking preserves individual rows, while grouping reduces them. [Window functions](https://www.postgresql.org/docs/15/functions-window.html).

Missing accepted IDs:

```sql
SELECT event_id FROM ingress_events
EXCEPT
SELECT event_id FROM telemetry_events;
```

Investigate each result as pending, failed or otherwise terminal; absence is not automatically permanent loss. `EXCEPT` is set-based, so check multiplicity independently when the effect has no unique key. [Set operations](https://www.postgresql.org/docs/15/queries-union.html).

Aggregate without event/alert fanout:

```sql
WITH event_counts AS (
  SELECT warehouse_id, count(*) AS n_events
  FROM telemetry_events GROUP BY warehouse_id
), alert_counts AS (
  SELECT e.warehouse_id, count(*) AS n_alerts
  FROM alerts a JOIN telemetry_events e USING (event_id)
  GROUP BY e.warehouse_id
)
SELECT e.warehouse_id, e.n_events, coalesce(a.n_alerts, 0) AS n_alerts
FROM event_counts e LEFT JOIN alert_counts a USING (warehouse_id);
```

This counts alerts, including multiple rule versions, as alerts. It does not mistake joined rows for event count. A separate warehouse dimension is needed to include warehouses with zero events at all. Right-side predicates placed in `WHERE` can remove unmatched left-join rows. [Table and join expressions](https://www.postgresql.org/docs/15/queries-table-expressions.html).

Prepare null-containing fixtures: comparison with null generally produces unknown; `WHERE` retains true predicates. `NOT IN` over a null-containing result is a classic trap. Choose `NOT EXISTS` when its semantics match the required anti-join. [Comparison and NULL operators](https://www.postgresql.org/docs/15/functions-comparison.html).

**Defense:** hand-compute output before running each query. Follow-ups: ties, empty sets, duplicate tags, nulls and recursive cycles. Pass requires explaining why the query returns the intended population, not merely producing plausible rows.

## 8. Isolation, write skew and deadlocks

Declare the invariant before selecting isolation. Example extension: “at least one active processor remains on call.” Start with A and B active. Two transactions read both as active, then one disables A and the other disables B. Their writes target different rows, but together violate the predicate. A stable snapshot alone does not imply serializable execution.

Solutions can include appropriately locking a shared guard row or using Serializable with whole-transaction retries. Locking existing rows without a stable strategy may not protect every predicate insertion case. Serializable can reject one conflicting schedule; the application still must handle rollback and retry. [PostgreSQL transaction isolation](https://www.postgresql.org/docs/15/transaction-iso.html).

Lost-update extension: two clients read counter 5 and each write 6. For an increment, `UPDATE ... SET counter=counter+1` avoids that stale-overwrite form. It does not prevent repeated increments for duplicate logical events; the inbox gate addresses that separate problem.

Deadlock schedule:

```text
T1 locks A                 T2 locks B
T1 requests B (waits)      T2 requests A (waits)
wait-for graph: T1 -> T2 -> T1
```

A consistent lock order removes this cycle form. Short lock duration and bounded retries remain useful. A slow lock wait without a cycle is a different diagnosis. [Explicit locking](https://www.postgresql.org/docs/15/explicit-locking.html), [MVCC introduction](https://www.postgresql.org/docs/15/mvcc-intro.html).

**Defense:** demonstrate one anomaly under a named PostgreSQL level using two sessions. Follow-ups: transaction retry unit, external side effects inside retry, lock graph. Passing requires a repeatable schedule and a repair tied to the invariant.

## 9. Index and planner reasoning from actual work

For a latest-event query bounded by warehouse/device/metric and sorted by descending occurrence time/ID, consider a B-tree such as:

```sql
CREATE INDEX telemetry_latest_example
ON telemetry_events
  (warehouse_id, device_id, metric, occurred_at DESC, event_id DESC);
```

This is a design example, not an instruction to add redundant indexes to the shared schema. Equality on the leading dimensions restricts a relevant ordered region. A broad full-table report may still favor sequential access. Index size and write maintenance also consume resources. [PostgreSQL 15 multicolumn indexes](https://www.postgresql.org/docs/15/indexes-multicolumn.html), [index types](https://www.postgresql.org/docs/15/indexes-types.html).

Use `EXPLAIN (ANALYZE, BUFFERS)` on a safe dataset. Estimated costs are planner units; actual elapsed times are observations. Compare estimated and actual cardinality, loops, heap fetches, temp IO, sort/hash spill and dominant nodes. `ANALYZE` actually executes SQL, including mutations. Warm-cache and one-run results need careful interpretation. [Using EXPLAIN](https://www.postgresql.org/docs/15/using-explain.html).

A covering index stores required values, but visibility may still require heap access. A partial pending-work index requires the query predicate to imply its predicate. A date partition does not automatically supply global event-ID uniqueness. Long-lived snapshots can obstruct cleanup of obsolete versions; ordinary vacuum and shrinking a table file are different operations. [Covering indexes](https://www.postgresql.org/docs/15/indexes-index-only-scans.html), [partial indexes](https://www.postgresql.org/docs/15/indexes-partial.html), [partitioning](https://www.postgresql.org/docs/15/ddl-partitioning.html), [vacuum](https://www.postgresql.org/docs/15/routine-vacuuming.html).

Keyset pagination uses a complete tuple order. It avoids scanning/discarding ever larger offsets, but does not automatically provide one snapshot across independent requests. Design the cursor, ordering, consistency promise and concurrent-update behavior together. [LIMIT/OFFSET](https://www.postgresql.org/docs/15/queries-limit.html).

**Defense:** predict one plan, observe it and explain differences. Follow-ups: skew, stale/correlated statistics, write cost, partition pruning and index-only heap fetches. Passing requires evidence from a recorded query/workload. [Planner statistics](https://www.postgresql.org/docs/15/planner-stats.html).

## 10. Derive capacity and recovery budgets

For a declared queue, each item contributes its residence time to the area under occupancy. Over a long stable observation horizon with negligible boundary terms:

\[
\int_0^T Q(t)\,dt\approx\sum_{i=1}^{n(T)} W_i;
\quad L=\lambda W.
\]

This uses matched population boundaries and finite stable mean quantities. It is not an identity between p99 latency and average queue length. If work is rejected, the relevant admitted throughput differs from offered rate. A backlog growing without bound does not have a finite stationary mean occupancy. [Little's original theorem](https://pubsonline.informs.org/doi/abs/10.1287/opre.9.3.383).

Constant-rate fluid approximation: outage `d` at arrival rate `lambda` creates backlog `B=lambda*d`. When service resumes at rate `mu>lambda` while arrivals continue:

\[
t_{catchup}=\frac{B}{\mu-\lambda};
\qquad H_{source}>d+t_{catchup}+margin.
\]

At 100/s, 150/s and 600s outage, backlog is 60,000 and catch-up is 1,200s. The oldest backlog can already be 1,800s old at full recovery. Real skew, retries, tail latencies and variable rates require measurement and margin. Source size-based retention can expire before its time budget. Marker retention must additionally encompass every allowed later replay path.

For fixed work with serial fraction `f` and ideal parallel fraction `1-f`, normalized time on `n` workers is `f+(1-f)/n`. Hence:

\[
S(n)=\frac1{f+(1-f)/n}\leq\frac1f\quad(f>0).
\]

This derivation assumes unchanged workload and ideal parallel work. IPC, DB contention, hot keys and scheduling can make results worse; altered cache behavior or changed workload can invalidate a simple comparison. Measure before attributing slow Python work to the GIL. [Amdahl's original paper](https://doi.org/10.1145/1465482.1465560).

**Defense:** compute backlog, catch-up and memory bounds aloud with units. Follow-ups: `mu<=lambda`, overload rejection, retries, process-pool overhead and skew. Pass requires recognizing when the model assumptions fail.

## 11. Causality, partitions and time windows

Happens-before follows local process order, send-before-receive and transitivity. Logical clock construction ensures `a -> b` implies `C(a)<C(b)`. Its converse fails: independent processes can assign ordered scalar values to concurrent events. A total order can extend causality without establishing which concurrent physical occurrence came first. [Lamport's original clocks paper](https://lamport.azurewebsites.net/pubs/time-clocks.pdf).

A partition argument uses indistinguishable observations. If an isolated replica cannot distinguish “another side committed a conflicting update” from “the other side made no update,” freely completing both sides' requests may violate a strong shared-value contract. Preserving that contract can require delaying/rejecting some requests. The theorem's availability notion is not a dashboard uptime percentage; specify operation and failure model. [Gilbert/Lynch CAP paper](https://www.cs.princeton.edu/courses/archive/spr22/cos418/papers/cap.pdf).

Event-time windows assign events by occurrence timestamp; processing-time windows use observation/processing time. A watermark is useful only relative to its lateness/source-progress assumptions. Under unbounded delay it cannot prove no earlier event will ever arrive. State whether late records are dropped, amended, retracted or retained for manual correction. Baseline threshold alerts are not evidence that this advanced window policy was implemented. [Streams time/state concepts](https://kafka.apache.org/41/streams/core-concepts/).

**Defense:** draw one concurrent event pair and one partitioned-write scenario. Follow-ups: clock skew, sequence gaps, correction of closed windows, named-timezone storage. Pass requires distinguishing timestamp order, broker order, causality and business order.

## 12. Evidence gates and novel interview follow-ups

For each experiment save: code revision, version/protocol/configuration, seed and input identities, fault location, expected invariant, observed outcome, workload/resources and limitations. A model proof covers its assumptions; a finite test covers its observed schedules; independent oral/coding assessment covers a different learner ability.

A bounded model-checking exercise can enumerate one-event outbox/inbox/retry/crash states and reject traces violating its invariant. Its state-space bound and abstractions must be explicit. A passing abstract model is not universal proof of application code, SQL driver behavior or every failure. Use counterexamples to guide actual tests. [Lamport, Specifying Systems](https://lamport.azurewebsites.net/tla/book-02-08-08.pdf).

Define an SLI population before its number: accepted-to-effect latency, acceptance failure, pending age and quarantine outcomes need different denominators. Percentiles and error rates reveal information averages conceal. An alert should distinguish broker lag from lost/incorrect business effects. [SLO implementation](https://sre.google/workbook/implementing-slos/), [Kafka monitoring](https://kafka.apache.org/41/operations/monitoring/).

Use this escalating drill on any topic:

1. Explain the mechanism in 90 seconds, stating scope.
2. Solve a small unseen case without notes.
3. Draw the smallest permitted failure trace.
4. Repair it and name the new cost or limit.
5. Show your own recorded experiment and distinguish observed evidence from the model.
6. Transfer the reasoning to changed assumptions: another sink, reordered delivery, expired markers, conflicting IDs or slower service.

Do not call a topic closed solely because a matching code file exists. For SQL, predict exact rows and inspect the plan. For Kafka, reason about source recovery and broker configuration. For system design, state invariants, alternatives, operations and measurement. For client discussion, explain the business consequence in plain language. These are competency formats usable in different interview rounds; their appearance and order at Cognizant remain unknown.

### Source and evidence boundary

All linked references were opened during preparation. The examples, proofs, question structure and failure models are authored for this learning project, with assumptions stated above. SQL templates and planned faults are not reported as executed tests here. Runtime validation and independent learner reconstruction require separate evidence in the project's test reports and competency tracker.
