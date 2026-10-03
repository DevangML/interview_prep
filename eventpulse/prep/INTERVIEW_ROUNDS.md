# EventPulse: whole-interview preparation and independent assessment

Prepared 3 October 2026, India time, for Cognizant requisition **00068039437**. This guide prepares assessment scenarios; it does not predict a private interview sequence or reproduce an employer question bank.

The [official posting](https://careers.cognizant.com/india-en/jobs/00068039437/returnship-pythonpluskafkaplusjava-sql/) requires Python, Kafka, Java and SQL for backend, streaming, API and integration work. Microservices, Spark and cloud are optional. Spring Boot and PostgreSQL are project choices. The [hiring guide](https://careers.cognizant.com/india-en/pathways-to-cognizant/how-we-hire/) supports recruiter and hiring-team evaluation, with possible assessment or client evaluation. It does not establish an exact number, order or content of rounds.

Use [extensions.json](/Users/devang/Desktop/interview_prep/eventpulse/prep/extensions.json) for 60 specific competencies: algorithms A001–A015, operations/security/testing O001–O021, optional Spark/cloud X001–X012 and interview/resume R001–R012. The Java/Python/Kafka/SQL competency registry is maintained separately by the main preparation plan. All extension entries begin **unassessed**.

## The evidence boundary

A reference build demonstrates the behavior of that reference under recorded tests. It cannot demonstrate your independent understanding. Keep these evidence classes separate:

| Evidence | What it supports |
|---|---|
| Topic named in a curriculum | Planned exposure |
| You explain a mechanism without notes | Explanation of the particular mechanism |
| Reference program passes a test | Observed reference behavior |
| You implement from a blank starting point | Independent construction of that task |
| You diagnose an injected failure | Diagnosis under that fault |
| You solve an assessor-authored variation you have never read | Transfer to that variation |
| You repeat after a delay without notes | Retention of the assessed task |

Do not call a prompt unseen after reading it, its answer, or a close reference solution. This guide's published prompts are practice prompts after the first attempt. A future assessor must create genuinely new variants privately before administering transfer assessments.

The preparation scope is finite. A complete ledger over the declared registry means every declared item has evidence; it does not establish all possible interview questions, every software technique or guaranteed selection.

## A measurable readiness model

For a competency d and assessed mode m, record score s(d,m) in {0,1,2,3,4}:

- **0:** no independent attempt or incorrect central mechanism.
- **1:** terminology recognition; cannot finish or justify.
- **2:** partial solution; substantive hints or unhandled failure cases.
- **3:** correct independent solution under the declared contract, with tests and explanation.
- **4:** level 3 plus a genuinely new change of assumptions, correct adaptation and a retained retest.

Modes are explanation, implementation, diagnosis and transfer where applicable. Use NA only with a reason, such as a communication competency with no coding implementation. An unassessed item has no score; never convert it silently to passed.

For a finite benchmark B, a conservative gate can be defined as:

\[
R(B)=\bigwedge_{d\in B_{\rm core}}\bigwedge_{m\in M(d)}
[\,s(d,m)\ge3\;\land\;\text{independent evidence exists}\,].
\]

This is a chosen preparation standard, not a calibrated employer selection threshold. It deliberately prevents a strong optional cloud diagram from compensating for inability to write SQL. A weighted average can summarize progress, but must not hide a failed mandatory gate.

Keep a record for each attempt:

~~~text
competency_id:
prompt_version:
date:
reference_previously_seen: yes/no
runtime_and_tool_versions:
time_limit / actual_time:
notes_or_hints_used:
source_or_recording:
tests / failing_cases:
score_and_reason:
new_transfer_prompt_author:
next_repair:
retest_date:
~~~

No hiring probability is inferred from these scores. No learning-rate model is assumed.

## Effort allocation with 4–6 focused hours per day

There is no imposed calendar deadline or fourteen-day compression. Move through observable gates at the pace the evidence supports.

| Available focused time | Core drills | Build/debug | Spoken defense and review | Evidence journal |
|---|---:|---:|---:|---:|
| 4 hours | 60 min | 120 min | 45 min | 15 min |
| 6 hours | 90 min | 180 min | 60 min | 30 min |

These are adjustable session budgets, not a mathematically optimal allocation. If the next known assessment is coding, increase timed coding. If coding is strong and commit/recovery reasoning is weak, increase fault diagnosis. Optional Spark/cloud begins after mandatory gaps stop blocking the core slice.

The estimated hours in the registry are planning placeholders per exercise. They overlap across exercises and do not predict your mastery date. Replace them with actual time after the diagnostic.

The reconstruction sequence is:

1. Record a baseline before viewing answers.
2. Study and inspect the reference; run and understand its tests.
3. Implement small variations while retaining an honest assistance log.
4. Scrap the reference implementation in a separate safe copy; rebuild from an empty working directory with only a requirements contract. Do not delete the only retained evidence.
5. Reconcile output and inject failures in your rebuild.
6. Receive privately authored, genuinely new questions and changes.
7. Retest after a delay without notes. Human mastery stays unassessed until this evidence exists.

## Blind initial diagnostic: 90 minutes

Attempt this section before opening the answer key below. No reference code, search, autocomplete-generated solution or prior answer key. Normal editor/compiler/database tooling is permitted; record exactly which tools you used. A 45-minute first pass may allocate half the time and leave unfinished work explicitly unfinished.

### 0–5 minutes: eligibility and facts

Write your actual employment dates, career-break dates if any, current availability and the role title. State which skills have production evidence and which currently have learning-project evidence. Do not create a career break to fit a template.

The [general India Returnship program](https://careers.cognizant.com/india-en/pathways-to-cognizant/returnship/) describes two or more years of prior professional experience and at least a twelve-month break, while allowing role-specific variation. Requisition-specific eligibility remains unresolved until its actual criteria are established.

### 5–20 minutes: Python coding

Input is a finite list of (tenant_id, event_id, value) tuples. tenant_id and event_id are nonempty strings; value is an integer.

Implement summarize(events) returning:

- the first value observed for each (tenant_id,event_id);
- the number of subsequent records whose value equals that key's first value;
- the set of keys with at least one subsequent differing value.

Never overwrite the first value. Distinct tenants may reuse event_id. Do not change the input.

Test this input and at least three boundary cases:

~~~text
("t1","e1",10)
("t1","e1",10)
("t1","e1",11)
("t2","e1",7)
("t2","e1",7)
("t1","e2",0)
~~~

State complexity and the logical distinction between identity and payload equality.

### 20–35 minutes: Java coding and semantics

Declare your JDK version. Implement the same first-value map and duplicate/conflict detection in Java using a composite stable key. It is acceptable to use an immutable record if supported by your chosen version, or a properly implemented immutable class.

Explain why equality and hashing must agree. Explain whether HashMap order is guaranteed and whether your compound check-and-write is safe when multiple threads share it.

Do not add Spring Boot before you can implement the pure function.

### 35–50 minutes: SQL

Assume PostgreSQL and this practice schema:

This is an assessment-only schema. The reference implementation uses the separately defined warehouse-based schema in CONTRACT.md; do not replace its initialization SQL with this exercise.

~~~sql
CREATE TABLE events (
  event_id text PRIMARY KEY,
  tenant_id text NOT NULL,
  device_id text NOT NULL,
  occurred_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL,
  value numeric,
  status text NOT NULL
);
CREATE TABLE effects (
  event_id text PRIMARY KEY REFERENCES events(event_id),
  applied_at timestamptz NOT NULL
);
~~~

Write:

1. The latest two events per (tenant_id,device_id), ordered by occurred_at descending and event_id descending for deterministic ties.
2. Accepted events with no corresponding effect.
3. Counts and average non-NULL value by tenant and UTC calendar day.
4. One candidate index for a tenant/device/time-range query and the write cost it adds.

Explain why joining to a nonunique child table can inflate a count.

### 50–65 minutes: Kafka crash reasoning

A worker reads partition 0 offsets 20,21,22. Effects for 20 and 22 commit. Processing 21 has not completed.

1. What is the highest safe next-offset checkpoint if processing 21 must not be skipped?
2. Trace database-first and offset-first crash windows.
3. Propose an idempotent database transaction with a stable event identity.
4. Explain what happens to in-flight work when partition ownership changes. Name the assumptions you need; do not rely on rebalance alone to undo an already committed database write.

### 65–75 minutes: capacity and architecture

Use these explicitly hypothetical inputs:

- Constant admitted arrival rate: 1,500 records/s.
- Sustainable completed processing rate: 1,200 records/s.
- Remaining buffer capacity: 90,000 records.
- Each raw record is 800 bytes.
- The consumer is unavailable for 10 minutes and the broker retains every admitted record.

Derive time to fill under sustained overload, raw admitted bytes/day, outage backlog and the condition for catch-up. State which numbers exclude replication, indexes, protocol overhead and compression.

### 75–85 minutes: experience and communication

Give a two-minute actual WMS/offline-sync explanation, then an IAM/Frappe explanation. State individual responsibility, a specific failure or tradeoff, and how you verified the outcome. Unknown metrics stay unknown.

Answer: “Why move toward this role?” and “What is still new for you?”

### 85–90 minutes: score and triage

Save attempts before reading the key. Score each segment using the common scale. Write the three highest-consequence gaps and the evidence needed to close them. Do not derive a selection probability.

## Mock scenarios covering the interview surface

The scenarios below may be split, combined, reordered or omitted in an actual process. All questions are original practice prompts. Run one scenario at a time; the durations are mock durations, not employer claims.

### Mock 1: recruiter screen, 20 minutes

| Time | Prompt |
|---|---|
| 0–3 | Give a 90-second factual career summary aligned with backend, data processing and integration. |
| 3–7 | Distinguish production Python/Node/SQL work from Java/Kafka study and prototype work. |
| 7–12 | Explain actual employment/break dates, availability and Pune/hybrid fit. |
| 12–16 | Why this role? What gap are you addressing, and what evidence do you now have? |
| 16–20 | Ask about requisition-specific eligibility, assessment format, role responsibilities and client-facing expectations. |

Rubric: factual chronology 0–4; role fit 0–4; honest scope 0–4; clear communication 0–4. A fluent invented chronology fails the honesty criterion. Do not present a local prototype as employer production experience.

### Mock 2: coding assessment, 60 minutes

| Time | Prompt |
|---|---|
| 0–5 | Clarify input size, ordering, duplicates, tie rules and memory bounds. |
| 5–25 | Given unsorted (device_id,error_count) observations, aggregate and return the top K devices, breaking ties by device_id ascending. |
| 25–35 | Build edge cases and derive time/space. Explain frequency-map memory separately from selected top-K memory. |
| 35–50 | Find the first retained timestamp not earlier than a cutoff in a sorted array. State and maintain an interval invariant. |
| 50–60 | Assessor changes one condition: infinite input, bounded memory, a hot key, or signed counts. Revise the contract and algorithm. |

Rubric: executable correctness 0–4; complexity and invariant 0–4; boundary tests 0–4; adaptation 0–4. Strong narration does not replace runnable code. The published variant is practice after reading; a transfer assessor must invent a different one.

Alternate drill pool: merge outage intervals, two-sum under sorted constraints, next-greater latency, graph reachability, migration cycle detection and a small DP recurrence. Complete arrays/hashing/search first; advanced puzzles must not displace weak mandatory language or SQL skills.

### Mock 3: Java/Python deep dive, 60 minutes

| Time | Prompt |
|---|---|
| 0–10 | Trace equality, hash collisions, mutable map keys, iteration order and expected versus worst-case lookup. |
| 10–20 | Trace a Java visibility/race example; distinguish volatile visibility from atomic compound updates. |
| 20–30 | Explain dependency injection and where a transaction proxy begins and ends; reason about self-invocation and exception paths. |
| 30–40 | Predict Python mutable-default and shallow-copy behavior, then independently verify tiny examples. |
| 40–50 | Compare a list, generator, thread pool, process pool and asynchronous I/O for the stated workload. |
| 50–60 | Change runtime or workload: GIL-enabled versus free-threaded build; CPU-bound versus I/O-bound transformation. Explain what must be remeasured. |

Rubric: semantic accuracy 0–4; independent code traces 0–4; concurrency reasoning 0–4; version and workload boundaries 0–4.

A full answer separates the Java Memory Model from collections internals and GC. Python generators change materialization and iteration; they do not inherently create parallelism. Claims about GIL behavior need the actual runtime/build. [Java threads and locks](https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html), [Python threading](https://docs.python.org/3/library/threading.html).

### Mock 4: SQL and data integration, 45 minutes

Use the diagnostic schema, then add devices(tenant_id,device_id,active) with a composite primary key and readings_history(event_id,revision,value) with multiple revisions per event.

| Time | Prompt |
|---|---|
| 0–15 | Write latest-two-per-device, accepted-without-effect and daily UTC aggregation queries. |
| 15–25 | Join active devices without multiplying event counts; select the latest revision under a declared deterministic rule. |
| 25–35 | Recommend an index for a concrete filter/order workload. Read an actual EXPLAIN ANALYZE output, including estimated/actual rows and loop counts. |
| 35–45 | Explain a concurrency anomaly, required isolation or locking, and the expected effect of adding three write-heavy indexes. |

Rubric: row correctness 0–4; NULL/tie/multiplicity reasoning 0–4; plan interpretation 0–4; concurrency and cost 0–4.

A query plan is empirical evidence for a specified dataset and environment. EXPLAIN ANALYZE executes the query, including writes if used on modifying statements; use a controlled lab. More indexes add maintenance and storage costs. [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

### Mock 5: Kafka and consistency, 60 minutes

| Time | Prompt |
|---|---|
| 0–10 | Explain key → partition choice, ordering boundary, broker replication and retention. |
| 10–20 | Explain consumers, group membership, assignment/rebalance and application state tied to a partition. |
| 20–35 | Trace asynchronous completion for offsets 20,21,22. Explain safe checkpoint progress and a crash/replay. |
| 35–45 | Prove a guarded inbox transaction yields at most one committed DB effect per stable event ID. State assumptions needed for eventual effect. |
| 45–55 | Trace an ingestion DB-plus-event dual write and justify outbox or a smaller publish-only contract. |
| 55–60 | Poison event, DLQ failure and manual replay: identify which durable decision permits checkpoint advancement. |

Rubric: partition/group mechanics 0–4; failure traces 0–4; effect-boundary proof 0–4; recovery/retention limits 0–4.

A DLQ is a processing policy and durable destination, not a magic loss-prevention switch. Define whether a rejected record is terminal and what makes that terminal decision durable. Kafka transactions within Kafka do not automatically atomically commit PostgreSQL. [Kafka delivery semantics](https://kafka.apache.org/41/design/design/#message-delivery-semantics).

### Mock 6: system design, 60 minutes

Practice requirement: ingest device events from intermittently connected clients, preserve a queryable history and maintain a per-device summary. All numerical inputs must be supplied by the assessor or explicitly labeled assumptions.

| Time | Prompt |
|---|---|
| 0–10 | Define event identity, acceptance boundary, ordering, freshness and permissible failure/recovery behavior. |
| 10–20 | Estimate arrivals, payload bytes, retention, replay horizon and a catch-up margin with units. |
| 20–35 | Draw Java/API → durable admission → Kafka → Python → PostgreSQL and identify every commit boundary. |
| 35–45 | Justify keys, schemas, indexes, concurrency limits, observability, tenant isolation and overload behavior. |
| 45–55 | Assessor introduces a hot device, a DB outage and conflicting event payloads under one ID. Revise the design. |
| 55–60 | State what you would implement first, how to test it, and what the local demo cannot prove. |

Rubric: requirement precision 0–4; quantitative consistency 0–4; failure reasoning 0–4; design revision 0–4. A more complicated diagram earns no automatic credit.

Useful derivations under declared constant-rate assumptions:

\[
Q(t)=Q_0+(\lambda-\mu)t,\qquad
t_{\rm full}=(B-Q_0)/(\lambda-\mu)\quad(\lambda>\mu).
\]

For a fixed outage duration \(\tau\), accumulated backlog is \(\lambda\tau\) when all admitted input is retained and no processing completes. After recovery, constant catch-up time is \(Q/(\mu-\lambda)\) only when \(\mu>\lambda\). If \(\mu\le\lambda\), that constant-rate system cannot catch up while arrivals continue.

Raw data per day is \(\lambda \times \text{bytes/record} \times 86,400\); physical storage adds replication, encoding, indexes, overhead, compression and retention assumptions. Little's law \(L=\lambda W\) applies to compatible long-run averages for a stable system; it is not permission to multiply arbitrary p99 latency by peak traffic.

### Mock 7: incident troubleshooting, 45 minutes

Scenario: API success responses continue; customer summaries stop updating. Do not reveal the cause until the candidate asks for discriminating evidence.

| Time | Prompt |
|---|---|
| 0–5 | Define impact, affected tenants/time window and acknowledgement semantics. |
| 5–15 | Request lag by partition, worker errors, heartbeat/poll evidence, DB waits/locks, connection usage and recent changes. |
| 15–25 | Rank hypotheses and choose a minimal safe observation or reversible containment step. |
| 25–35 | Recover while preserving replayability and avoiding checkpoint advancement past unfinished work. |
| 35–45 | Reconcile accepted IDs with effects, explain what remains uncertain, and give a factual client update. |

Assessor can choose one hidden cause: invalid advertised listener, exhausted DB pool, blocked DB lock, poison-event retry loop, excessive processing time or incompatible schema rollout. These published causes are a rehearsal set, not unseen retest material.

Rubric: evidence selection 0–4; controlled action 0–4; recovery correctness 0–4; communication 0–4. Restarting everything without preserving evidence and verifying effects scores poorly.

### Mock 8: project defense, 45 minutes

| Time | Prompt |
|---|---|
| 0–5 | Explain business problem, implemented scope and local limitations. |
| 5–15 | Demonstrate one accepted event, one duplicate, one conflict and one rejected payload. |
| 15–25 | Show the code and raw test evidence behind a crash/recovery claim; identify the exact effect protected. |
| 25–35 | Make an independently assigned change such as tenant-scoped identity or a different processing rule. |
| 35–45 | Explain measured performance, index/concurrency tradeoffs, missing evidence and next work. |

Rubric: evidence navigation 0–4; mechanism explanation 0–4; independent modification 0–4; honest scope 0–4.

Use a claim ledger:

~~~text
Claim:
Implementation locator:
Test / raw output locator:
Failure model:
Versions and environment:
Observed result:
Assumptions:
Untested boundary:
Who implemented this:
~~~

A reference implementation may provide a valid demonstration. Until reconstruction is assessed, say “I studied and tested the reference” rather than “I independently engineered every part.”

### Mock 9: managerial/client conversation, 30 minutes

| Time | Prompt |
|---|---|
| 0–8 | “The client says never lose any data. What contract can you actually agree to?” |
| 8–16 | “Deployment must happen tomorrow, but the replay test fails. What options do you present?” |
| 16–23 | “A teammate disagrees about Kafka versus a simpler queue. How do you resolve it?” |
| 23–30 | Give an actual STAR story about a defect, ambiguity or collaboration, then take probing questions. |

Rubric: precise acceptance criteria 0–4; delivery/risk reasoning 0–4; teamwork/ownership 0–4; concise explanation 0–4. Offer alternatives with consequences and a proposed validation gate. Do not fabricate the outcome of an unperformed test.

### Mock 10: HR/Returnship close, 20 minutes

| Time | Prompt |
|---|---|
| 0–5 | Actual career timeline and break, if applicable. |
| 5–10 | Role motivation grounded in actual experience and current learning. |
| 10–15 | Actual notice period, work-location preferences and availability. |
| 15–20 | Ask about responsibilities, returnship expectations, assessment format and success criteria. |

Rubric: factual consistency 0–4; concise motivation 0–4; logistical clarity 0–4; useful questions 0–4.

Do not memorize a fabricated break explanation. Share only the personal detail you choose while preserving the truth of dates and eligibility. No compensation number is supplied by this template.

## Honest experience narratives

The prior audit found candidate-authored WMS/Flutter/offline-sync, IAM/Frappe/Python, Node/API and SQL descriptions. They are useful starting points for a defense, but you must supply the actual mechanisms and personal contribution. Java/Kafka production experience was not explicitly evidenced in the inspected resumes.

Fill this template rather than reciting a fictional finished story:

~~~text
Situation:
  In [actual team/system/date], [actual user or operational problem].
Task:
  I was personally responsible for [specific scope].
Action:
  I [specific implementation/debugging decision].
  I chose it over [actual alternative] because [constraint].
  [Team/tool/reference] contributed [specific boundary].
Result:
  We observed [supported outcome].
  Evidence is [allowable test, ticket, log, review or qualitative observation].
  I do not have a verified numerical impact for [unknown metric].
Learning:
  Under [changed assumption], I would reconsider [choice].
~~~

Story 1: WMS/offline synchronization.

- What was authoritative: device state, server state or a versioned merge?
- How were duplicate captures, retries, conflicts and intermittent connectivity represented?
- What would a counterexample to your sync rule look like?
- How did you test interruption and recovery?
- Which backend pieces did you personally change?

Story 2: IAM/Frappe/Python.

- What was the identity and permission model?
- Where was authorization enforced?
- How did a role change become visible?
- What prevented cross-user or cross-tenant access?
- What code, SQL or tests demonstrate your contribution?

Story 3: a real defect or delivery tradeoff.

- What did you observe before choosing a fix?
- Which alternative cause did you rule out?
- What did the patch change?
- How did you verify behavior and communicate remaining risk?
- What would you change about the process?

A truthful bridge to the new role can follow this pattern:

> “My existing work includes [actual Python/API/SQL/integration responsibilities] and [actual WMS synchronization responsibilities]. Java and Kafka are newer areas for me. I have now [only completed independent work and measured tests], and can explain [specific mechanism] and its limits. I am applying that experience to backend and data integration work.”

Remove bracketed claims that are not supported. “High throughput” requires a stated measured workload if presented quantitatively. A local project does not retroactively turn employer work into Java/Kafka production work.

## Optional-depth assessments

Spark and cloud are optional in this advert. Use them to deepen a sound core, not to decorate a weak one.

**Spark mock, 30–45 minutes:** explain DataFrame execution; replay event-time windows with out-of-order input; state watermark and state-retention assumptions; trace checkpoint recovery and an external sink retry; inspect a skewed join/partition plan. Show actual runs if executed, otherwise label design-only. [Structured Streaming](https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html), [Spark tuning](https://spark.apache.org/docs/latest/sql-performance-tuning.html).

**Cloud mock, 30–45 minutes:** draw an AWS deployment, workload identities, private connection paths, MSK/RDS responsibilities, encryption, rollout, restore and cost teardown. An architecture document demonstrates design reasoning. Claim deployment/operation only after actual evidence. Live deployment is not required merely to prepare a design answer. [AWS shared responsibility](https://aws.amazon.com/compliance/shared-responsibility-model/), [IAM practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## Answer key: open only after saving the diagnostic

These answers make the diagnostic assessable. Reading them converts those prompts into practice material. They are never a substitute for a fresh independent transfer assessment.

### Python/Java diagnostic

First-value map:

~~~text
(t1,e1) → 10
(t2,e1) → 7
(t1,e2) → 0
~~~

Duplicate count is **2**. Conflict-key set is **{(t1,e1)}**.

A dictionary/map keyed by the composite identity is sufficient for a finite input. Test existence independently from truthiness of a stored value: zero is valid. Expected time is O(n) under suitable hashing and bounded key-comparison assumptions; memory is O(u) for distinct logical identities, plus conflict storage bounded by u. Do not claim universal constant worst-case hash operations.

The Java key must be stable and implement compatible equality/hash behavior; an immutable record is one valid choice for a supporting JDK. HashMap does not provide a business ordering. Its compound check-and-write is not made atomic by individual unsynchronized accesses. Concurrency requires an appropriate concurrent design or synchronization, with separately defined output-aggregation safety. [Java HashMap contract](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html).

An implementation that overwrites the first value after the conflict produces a different problem's answer and fails this contract.

### SQL diagnostic

~~~sql
WITH ranked AS (
  SELECT e.*,
         row_number() OVER (
           PARTITION BY tenant_id, device_id
           ORDER BY occurred_at DESC, event_id DESC
         ) AS rn
  FROM events AS e
)
SELECT event_id, tenant_id, device_id, occurred_at, value, status
FROM ranked
WHERE rn <= 2
ORDER BY tenant_id, device_id, occurred_at DESC, event_id DESC;
~~~

~~~sql
SELECT e.*
FROM events AS e
WHERE e.status = 'accepted'
  AND NOT EXISTS (
    SELECT 1 FROM effects AS f WHERE f.event_id = e.event_id
  );
~~~

~~~sql
SELECT tenant_id,
       (occurred_at AT TIME ZONE 'UTC')::date AS utc_day,
       count(*) AS event_count,
       avg(value) AS mean_nonnull_value
FROM events
GROUP BY tenant_id, (occurred_at AT TIME ZONE 'UTC')::date
ORDER BY tenant_id, utc_day;
~~~

A candidate time-range index is (tenant_id,device_id,occurred_at), with direction and event_id inclusion chosen for the actual filter/order workload. It adds write maintenance and storage and is not guaranteed to beat a sequential scan for every selectivity or dataset.

A one-to-many join emits multiple rows per event. Use the intended join grain, select a deterministic revision, or aggregate at the appropriate boundary before counting. DISTINCT can conceal a modeling error; it is not a universal fix. [PostgreSQL windows](https://www.postgresql.org/docs/current/functions-window.html).

### Kafka diagnostic

The highest safe checkpoint is next offset **21** after durable completion of offset 20. Offset 22 completing does not permit skipping unfinished 21. Once 21 finishes durably, contiguous progress may advance to next offset 23. A checkpoint denotes the next record to process, not the last record processed.

Database first: effect → crash before checkpoint → replay → potential duplicate.

Checkpoint first: checkpoint → crash before effect → skipped effect.

One repair, for a database-scoped effect, is a stable-ID inbox row with a UNIQUE constraint; insert the marker and all guarded effects in one DB transaction; perform no business effect when the marker already exists. Advance checkpoints only after durable terminal handling over the safe per-partition frontier.

Uniqueness and atomicity give at-most-one committed protected effect per ID. Eventual successful delivery and processing, source retention/replay availability and stable identity provide the additional assumptions for eventual exactly-one effect. Deduplication markers must remain through every permitted replay horizon. A repeated external payment/email is outside this database-only proof.

On ownership changes, the application must stop or fence work appropriately, finish or abandon/replay in-flight records safely and avoid stale owners advancing invalid checkpoint state. Rebalances do not reverse a database commit. Actual callback, protocol and timing details depend on the selected client/version. [Consumer configuration](https://kafka.apache.org/41/configuration/consumer-configs/).

### Capacity diagnostic

Overload surplus is 300 records/s. Remaining capacity 90,000 records fills in:

\[
90,000/300=300\text{ s}=5\text{ min}.
\]

Raw admitted bytes/day:

\[
1,500\times800\times86,400=103,680,000,000\text{ bytes/day}.
\]

That is **103.68 decimal GB/day** before additional physical-storage effects.

Ten-minute outage backlog:

\[
1,500\times600=900,000\text{ records}.
\]

At 1,200 completed records/s with ongoing arrivals at 1,500/s, catch-up is impossible in the constant-rate model. For a revised drain rate \(\mu>1,500\), catch-up from that backlog is \(900,000/(\mu-1,500)\) seconds, subject to retained data and unchanged rates.

The outage example and overload-buffer example are separate thought experiments; a system with only 90,000 free records could not retain 900,000 new records without changing admission/storage assumptions. Identifying this incompatibility is part of a strong answer.

### Experience and eligibility diagnostic

There is no fabricated “correct” personal story. Score truth, individual scope, mechanism, evidence and limits. “I do not have a verified metric” is accurate when no metric exists.

General Returnship conditions do not decide all requisition-specific exceptions. Record the mismatch or unknown explicitly; do not mark eligibility passed without its factual basis.

## Retest rules and closing questions

After each mock:

1. Save the original answer and output.
2. Identify the first false assumption or failed mechanism.
3. Repair it with a small exercise and direct source verification.
4. Reattempt a changed problem without referring to the repair.
5. Schedule a delayed retest; do not relabel the same prompt unseen.

Ask the actual panel concrete questions such as:

- Which responsibilities dominate this assignment: API work, streaming operations, data processing or SQL optimization?
- Which runtime versions, deployment environment and existing systems will the engineer work with?
- Is there a coding/SQL assessment or client conversation for this requisition?
- What are the requisition-specific Returnship criteria and initial success expectations?

These questions reduce uncertainty. They do not assume authority to contact anyone, and this preparation task sends no recruiter message.
