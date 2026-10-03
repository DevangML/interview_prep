# Formal design and preparation model

Scope: a local reference pipeline plus focused laboratories, serving the advertised Python/Kafka/Java/SQL responsibilities and separately marked extensions. This is a finite, versioned learning contract. Neither a large inventory nor a proof about a small model establishes universal interview success.

## 1. What completeness means here

Let C be the published competency set, M the project/lab modules, and A[i,j] a declared relation: exercise j creates an opportunity to demonstrate competency i. Structural coverage requires:

`for every i in C, there exists j in M with A[i,j] = 1`.

This is a traceability property. It is not a mastery property. If module selection were optimized, a weighted set-cover formulation could minimize `sum(cost[j] * selected[j])` subject to coverage constraints. That result would optimize the supplied costs and relations, not prove those estimates true. This project does not fabricate an optimum from unknown learning rates.

The syllabus has three tiers: core role fluency, depth for follow-up questions, and extensions such as Spark/cloud or stronger formal analysis. All tiers remain available; sequencing core first does not silently omit the rest.

For each competency, record five independent evidence facets:

1. Explain the mechanism and its assumptions accurately.
2. Implement a relevant task without copying the reference.
3. Diagnose a concrete failing case.
4. Transfer to a changed problem the learner has not rehearsed.
5. Recall and reconstruct after a delay without notes.

Use a rubric from 0 to 3: no evidence, substantial assistance, independent basic solution with gaps, independent correct reasoning including relevant boundaries. A conservative readiness policy can use the minimum facet score per topic and the minimum across core topics. This bottleneck score deliberately prevents fluent SQL from averaging away an unhandled offset-loss bug. Its threshold is a coaching policy, not a statistically calibrated hiring probability.

Reference-code test success updates artifact evidence only. It does not update any learner facet. Every learner row begins unassessed.

## 2. State machine and invariants

For a logical event e, define accepted ingress I[e], pending/published outbox O[e], a Kafka log containing zero or more deliveries of e, inbox B[e], business effect count E[e], alert count A[e,rule], and consumer next-offset c[p].

Transitions:

- **Accept:** normalize/validate, then atomically insert ingress and its outbox row. Duplicate ID plus equal normalized payload is a retry; different payload is a conflict.
- **Publish:** append to Kafka, then record publication in the database. A crash between these independent operations can duplicate publication.
- **Process:** atomically insert inbox marker and guarded business rows, or recognize an equal-payload replay. Invalid records receive atomic durable quarantine and a DLQ outbox entry.
- **Checkpoint:** advance only after the corresponding record's DB outcome is durable.
- **Crash/restart:** volatile processing position disappears; recovery begins at committed progress. Durable state remains within the declared storage model.

Safety requirements:

`Accepted(e) => Ingress(e) and Outbox(e)` at the admission commit.

`0 <= E[e] <= 1`, and `0 <= A[e,threshold-v1] <= 1`.

`CheckpointBeyond(record) => DurableEffect(record) or DurableQuarantine(record)`.

`SameIdDifferentPayload => ConflictOrQuarantine`, not another business mutation.

The DB transaction and unique constraints establish at-most-one guarded effect, assuming constraints remain intact, IDs distinguish logical events, and deduplication markers remain for the entire allowed replay horizon. Eventual processing additionally needs fair successful retries, durable source data before retention expiry, available dependencies, and no permanently blocking input. Safety and liveness are different claims.

The temporal liveness target is `Accepted(e) => eventually Processed(e)` under those assumptions. No implementation can guarantee eventual success during permanent dependency failure. HTTP timeout after a successful admission remains ambiguous to the client; retry with the same ID resolves the ambiguity without a second logical event.

The database admission commit is the API's acceptance boundary. Kafka append order within a partition is not original request order, event-time order, or global order; parallel/retrying relay schedules can change it. Strict business sequence needs an explicit sequence and ordering design.

## 3. Proof obligations and tests

| Obligation | Mechanism | Experiment | Boundary |
|---|---|---|---|
| Atomic admission | Ingress plus outbox in one DB transaction | Reject conflicting ID; force a transaction failure | DB durability is an assumption |
| Replay-safe effects | Unique inbox and guarded mutations in one DB transaction | Duplicate publication; crash after DB before checkpoint | Marker retention and stable identity are required |
| Durable poison handling | Quarantine plus DLQ outbox atomically | Malformed JSON, schema mismatch, reused ID with changed payload | DLQ publication is eventual, not admission-time atomic with Kafka |
| Progress safety | Sequential processing and explicit next-offset checkpoint | Restart after commit failure; compare source coordinate and DB result | Parallel processing needs a contiguous completion frontier |
| Relay recovery | Pending outbox and bounded acknowledgements | Broker outage then recovery; duplicate publish window | No claim of original-request ordering |
| Process failover | Replicated lab with appropriate controller quorum | Kill a node and compare acknowledged IDs after recovery | All containers share one physical host |

`labs/formal/model_check.py` explores a deliberately small finite state machine and reports a naive duplication counterexample. The safe model's bounded result checks only that abstraction and bounds. The invariant argument is separate; actual implementation tests are separate again.

## 4. Capacity and latency from conservation

For accepted arrival rate lambda, completed processing rate mu, backlog Q0 and capacity B, constant overload gives `Q(t) = Q0 + (lambda - mu)t` until a capacity/admission condition changes. When lambda > mu, finite capacity is exhausted after `(B-Q0)/(lambda-mu)`. Buffers move the failure in time; they do not create processing capacity.

Little's law `L = lambda W` applies to consistent long-run averages of a stable system and the same boundary. It does not equate p99 latency with mean queue length. Under an illustrative M/M/1 model, `W = 1/(mu-lambda)` requires Poisson arrivals, exponential service, one server and stability. Measure whether those assumptions fit before applying it.

For parallelization, Amdahl's law `speedup(n) <= 1/(s+(1-s)/n)` assumes a fixed workload with serial fraction s, before additional parallel overhead. Pure-Python CPU work under a GIL, process serialization, DB locks, network acknowledgements and hot Kafka partitions can each form a bottleneck. A faster anomaly function may not improve the end-to-end pipeline if the relay or database dominates.

For a B-tree, logarithmic height follows from fanout greater than one; index benefit is workload dependent. Write maintenance, selectivity, clustering, cache and MVCC visibility still matter. Measure representative reads and ingestion before and after an index, including plan estimates and actual rows.

Report throughput only with workload, event size, duration, hardware, software versions, latency distribution, error counts and reconciliation of accepted IDs. A supplied target is a design goal, not a measured fact.

## 5. Reliability and security boundaries

Availability of a serial path cannot exceed that of its required dependencies; multiplying component availabilities additionally assumes independent failures. Common host, disk, network and operator failures violate that assumption. Replication across local containers teaches protocol behavior, not independent failure domains.

CAP concerns availability and consistency under a network partition within a defined model; it is not a universal label to attach to Kafka or PostgreSQL. Separate transaction isolation, replicated consistency, source ordering and application correctness. Recovery also needs RPO/RTO goals, retention and deduplication horizons, restore tests and compatibility with schema changes.

The baseline loopback lab uses a simple bearer gate. OAuth/OIDC, tenant authorization, TLS/SASL/ACLs, secret rotation, least-privilege DB roles and deployment policy belong to explicit security labs. Private local networking is not proof of production security.

## 6. Learning allocation without a deadline

The user has 4–6 focused hours per day and requested no compression or assumed finish date. Follow prerequisite order and exit gates rather than calendar days. Per-topic hour estimates are planning inputs; validated prior skill can shorten work, and failed transfer/recall can lengthen it.

Each session can contain independent retrieval, one bounded implementation problem, one failure/variation, a short spoken defense and an evidence update. Do not maintain focus by creating a new capstone every time a question is difficult. Use targeted labs to exercise mechanisms the production-shaped pipeline does not naturally force.

The reference phase proves reproducibility and provides debugging material. The rebuild phase begins with a fresh code directory, contracts and acceptance tests, and no access to reference implementations or worked solutions. Additional changed requirements are necessary before calling a rebuild exercise unseen.

Interview-round preparation uses plausible scenario coverage, not claims of exact rounds. Basic code, SQL and explanations remain gating skills even when studying advanced proofs. A concise correct answer with a concrete example and boundary is more useful in an interview than unsolicited formalism.
