# Project and lab exercise map

Every listed topic has a specified practice opportunity. These assignments are not completion evidence.

## labs/java

### J001: Values, references and numeric correctness (core)

Predict ten reference/numeric snippets, then implement bounded event-size arithmetic.

Mechanisms: primitives; boxing; overflow; pass by value

Techniques: boundary table; explicit overflow policy

Break case: Calling Java pass by reference

Prerequisites: none

### J002: String and text representation (core)

Normalize event identifiers and test non-ASCII text without splitting surrogate pairs.

Mechanisms: immutability; equals versus ==; Unicode; StringBuilder

Techniques: code-point fixtures; avoid repeated concatenation

Break case: Using string interning as a correctness mechanism

Prerequisites: J001

### J005: Equality and hashing contract (core)

Implement EventKey equality; verify symmetry, transitivity and equal-hash implication.

Mechanisms: equivalence relation; hash consistency; mutable keys; identity

Techniques: property checks; immutable key design

Break case: Overriding equals without hashCode

Prerequisites: J004

### J006: HashMap mechanics and complexity (core)

Compare uniform and constant hashes; inspect matching JDK source for resize/tree-bin behavior.

Mechanisms: buckets; collisions; capacity; load factor; resize; implementation-specific tree bins

Techniques: adversarial hash lab; amortized analysis

Break case: Claiming guaranteed O(1) or memorizing thresholds without version

Prerequisites: J005

### J007: Lists, sets and deques (core)

Implement FIFO replay staging and duplicate detection using fit-for-purpose collections.

Mechanisms: ArrayList; linked structures; HashSet; ArrayDeque; iterator removal

Techniques: operation-cost table; queue design

Break case: Ignoring cost of finding an insertion location

Prerequisites: J006

### J008: Ordering and sorted collections (depth)

Maintain top-k latency samples with a heap and deterministic tie breakers.

Mechanisms: Comparator; Comparable; TreeMap; priority queue; stable ordering

Techniques: total-order tests; top-k heap

Break case: Treating priority-queue iteration as sorted

Prerequisites: J005, J007

### J009: Generics and variance (core)

Write a generic copy function accepting producer and consumer collections.

Mechanisms: invariance; wildcards; PECS; type erasure; raw types

Techniques: typed copy utility; compile-failure examples

Break case: Adding arbitrary objects through extends wildcard

Prerequisites: J003

### J011: Resource ownership (core)

Read a file with deliberate body and close failures and inspect the preserved primary error.

Mechanisms: AutoCloseable; try-with-resources; suppressed exceptions; shutdown

Techniques: ownership map; fault-on-close lab

Break case: Using garbage collection for prompt resource release

Prerequisites: J010

### J012: Lambdas and functional interfaces (core)

Write a pure event filter and show why captured mutable state compromises concurrent use.

Mechanisms: capture; effectively final; method references; side effects

Techniques: pure transformation; explicit state capture

Break case: Equating effectively final with thread-safe

Prerequisites: J009

### J013: Streams and collectors (core)

Compute per-device counts with collectors and compare a loop; test empty input.

Mechanisms: lazy evaluation; terminal operations; map/flatMap; grouping; parallel reduction

Techniques: associative reduction; sequential baseline

Break case: Assuming parallelStream automatically accelerates I/O

Prerequisites: J012, J007

### J016: Algorithm reasoning and live coding (core)

Solve duplicate detection, interval merge and bounded sliding maximum from blank files.

Mechanisms: Big O; invariants; two pointers; sliding window; hash counting; binary search

Techniques: loop invariant; edge-case enumeration

Break case: Reciting complexity without counting operations

Prerequisites: J006, J007

### J017: Java Memory Model (core)

Explain a two-thread publication trace and repair it using a volatile publication edge.

Mechanisms: data race; happens-before; visibility; ordering; volatile

Techniques: execution trace; HB graph

Break case: Treating wall-clock order as synchronization

Prerequisites: J001

### J020: Locks and condition variables (core)

Implement a bounded buffer and defend spurious wakeups and shutdown races.

Mechanisms: monitor; ReentrantLock; wait/notify; condition loop; lock ordering

Techniques: guarded predicate; try-finally unlock

Break case: Using notify as a stored message

Prerequisites: J017, J019

### J021: Atomics and compound invariants (core)

Implement an accepted-event counter and explain why balance-plus-count needs coordination.

Mechanisms: CAS; AtomicLong; LongAdder; check-then-act; ABA introduction

Techniques: linearization point; contention benchmark

Break case: Assuming two atomic fields make one atomic transaction

Prerequisites: J017, J020

### J025: Deadlock and starvation diagnosis (core)

Reproduce reversed lock ordering, inspect blocked threads, then repair with global ordering.

Mechanisms: circular wait; lock order; pool starvation; thread dump

Techniques: wait-for graph; bounded reproduction

Break case: Adding more threads as a universal repair

Prerequisites: J020, J023

### J026: Virtual threads and version changes (extension)

Compare platform and virtual threads for waiting workloads while bounding DB connections.

Mechanisms: blocking concurrency; carrier threads; pinning version differences; resource limits

Techniques: version-pinned experiment; semaphore admission

Break case: Repeating obsolete pinning claims without JDK version

Prerequisites: J023, J025

### J027: JVM memory and reachability (core)

Trace why a static cache retains event payloads after requests finish.

Mechanisms: heap; stack frames; metaspace; roots; allocation; escape analysis caveat

Techniques: reachability diagram; retained-object lab

Break case: Equating loss of one reference with immediate deallocation

Prerequisites: J004, J019

### J028: Garbage collection tradeoffs (depth)

Compare memory/latency at two heap sizes using GC logs and a fixed workload.

Mechanisms: allocation rate; live set; pause versus throughput; heap sizing; collector choice

Techniques: GC log analysis; controlled workload

Break case: Tuning flags before finding the bottleneck

Prerequisites: J027

### J029: Profiling and production diagnosis (depth)

Capture a profile of a slow event transformation and attribute cost before optimizing.

Mechanisms: CPU samples; allocation samples; JFR; thread/heap dumps; latency percentiles

Techniques: hypothesis-driven profile; before/after comparison

Break case: Claiming benchmark result without artifact or environment

Prerequisites: J027, J028, J025

### J030: JIT and benchmark methodology (extension)

Design a microbenchmark and explain why a single nanoTime loop is insufficient.

Mechanisms: warmup; dead-code elimination; constant folding; JMH; variance

Techniques: forked benchmark; consume results

Break case: Publishing nanosecond results from one cold run

Prerequisites: J029, J016

### J038: Transaction propagation (depth)

Contrast an outer rollback with a separate inner transaction using explicit expected rows.

Mechanisms: REQUIRED; REQUIRES_NEW; NESTED; savepoints; rollback-only; pool exhaustion

Techniques: transaction trace; connection budget

Break case: Assuming NESTED and REQUIRES_NEW are identical

Prerequisites: J037

### J041: ORM versus explicit SQL (depth)

Compare a telemetry report implemented through an ORM and explicit SQL; inspect emitted queries.

Mechanisms: entity state; flush; lazy loading; N+1; optimistic locking; bulk effects

Techniques: query-count inspection; architecture comparison

Break case: Assuming repository methods imply efficient queries

Prerequisites: J040, J039

### J047: Version-sensitive Java compatibility (depth)

Document which chosen features fail on Java 8 and how to explain legacy internals correctly.

Mechanisms: Java 8 fundamentals; modern records; toolchain; bytecode target; framework constraints

Techniques: compatibility table; compile target check

Break case: Assuming newest runtime is the employer's runtime

Prerequisites: J046, J026

## java-producer

### J003: OOP and interface contracts (core)

Define a publisher interface and two implementations; swap them without controller edits.

Mechanisms: overload versus override; composition; interface; abstract class; substitutability

Techniques: contract-first API; strategy pattern

Break case: Confusing runtime dispatch with overload resolution

Prerequisites: J001

### J004: Immutable domain model (core)

Design an immutable event envelope with mutable nested input and prove caller mutation cannot change it.

Mechanisms: final; records; defensive copying; shallow versus deep immutability

Techniques: copy-on-construction; mutation challenge

Break case: Assuming final freezes the referred object

Prerequisites: J003

### J010: Exception design (core)

Classify malformed input, authentication failure and transient broker failure without catch-all success.

Mechanisms: checked versus unchecked; cause chaining; recoverable errors; retry classification

Techniques: error taxonomy; preserve causes

Break case: Catching Exception and returning success

Prerequisites: J003

### J014: Absence and nullable boundaries (core)

Model missing optional metadata without conflating missing, empty and invalid values.

Mechanisms: Optional; null; orElse versus orElseGet; API design

Techniques: explicit absent cases; boundary conversion

Break case: Using Optional.get as a null-check replacement

Prerequisites: J003

### J015: Decimal and temporal correctness (core)

Validate decimal telemetry and distinguish event time from ingestion time.

Mechanisms: BigDecimal; scale; rounding; Instant; timezone; duration

Techniques: decimal fixtures; UTC boundary tests

Break case: Using machine-local time as a stable event identifier

Prerequisites: J001

### J018: Safe publication (core)

Publish immutable configuration snapshots without exposing partially initialized state.

Mechanisms: constructor escape; final fields; static initialization; immutable snapshots

Techniques: publication audit; defensive ownership

Break case: Calling all final-field objects automatically thread-safe

Prerequisites: J004, J017

### J019: Thread lifecycle and cancellation (core)

Stop a worker cleanly during a blocking wait and verify no lost accepted work.

Mechanisms: start versus run; interrupt; join; daemon; cooperative stopping

Techniques: bounded join; interrupt propagation

Break case: Swallowing InterruptedException and looping forever

Prerequisites: J017, J010

### J022: Concurrent collections (core)

Update per-device counters concurrently without get-then-put lost updates.

Mechanisms: ConcurrentHashMap; compute; weakly consistent iteration; bounded queues

Techniques: atomic per-key update; ownership model

Break case: Assuming a thread-safe map makes stored lists thread-safe

Prerequisites: J006, J021

### J023: Executors and admission control (core)

Configure a bounded publisher worker pool and record behavior above service capacity.

Mechanisms: pool size; queue capacity; rejection; shutdown; CPU versus I/O

Techniques: bounded work queue; load shedding

Break case: Treating maxPoolSize as effective with every queue choice

Prerequisites: J019, J020

### J024: Futures and asynchronous composition (core)

Compose publish results and expose failure without blocking the shared worker pool.

Mechanisms: thenApply/thenCompose; completion; exception handling; timeout; executor

Techniques: nonblocking composition; deadline budget

Break case: Dropping asynchronous exceptions

Prerequisites: J023, J010

### J031: Spring dependency injection (core)

Inject publisher and repository into ingestion service; replace publisher in a unit test.

Mechanisms: constructor injection; bean resolution; qualifiers; configuration; test doubles

Techniques: explicit dependencies; replace collaborator

Break case: Assuming annotation presence creates a managed object

Prerequisites: J003, J004

### J032: Bean lifecycle and scopes (core)

Show concurrent requests cannot overwrite a singleton's per-request fields.

Mechanisms: singleton; prototype; request scope; initialization; destruction; state

Techniques: scope ownership audit; lifecycle hook test

Break case: Storing current request in singleton mutable field

Prerequisites: J031, J018

### J033: Configuration and secrets (core)

Start with a missing required setting and demonstrate a clear failure.

Mechanisms: profiles; externalized properties; precedence; validation; secret handling

Techniques: typed config; startup fail-fast

Break case: Assuming profile name guarantees correct production settings

Prerequisites: J031, J010

### J034: HTTP ingestion and MVC (core)

Design POST /events with accepted, invalid, duplicate and unavailable cases.

Mechanisms: routing; request binding; status codes; idempotency key; payload bounds

Techniques: contract tests; request state diagram

Break case: Acknowledging before the declared durability boundary

Prerequisites: J031, J015

### J035: Input validation (core)

Reject unknown versions, impossible timestamps, excessive payloads and missing IDs.

Mechanisms: syntax versus semantic checks; Bean Validation; cross-field constraints; schema version

Techniques: boundary fixture matrix; fail-closed parsing

Break case: Trusting DTO type names as runtime validation

Prerequisites: J034, J004

### J036: API error handling (core)

Map validation, conflict and temporary storage failure to documented client-visible errors.

Mechanisms: controller advice; error codes; cause disclosure; correlation IDs; retry hints

Techniques: stable error contract; fault fixtures

Break case: Returning HTTP 200 with an error string

Prerequisites: J010, J034

### J037: Transactional proxies and rollback (core)

Insert event and outbox rows atomically; throw between them and verify neither remains.

Mechanisms: proxy interception; self-invocation; rollback rules; thread-bound context

Techniques: boundary integration test; fault after insert

Break case: Assuming annotation creates a distributed Kafka/SQL transaction

Prerequisites: J031, J010

### J039: Isolation and concurrency anomalies (core)

Run two concurrent updates to a device counter; repair without lost increments.

Mechanisms: lost update; write skew; row locks; optimistic version; retry

Techniques: two-session schedule; compare-and-set update

Break case: Treating transaction presence as serial execution

Prerequisites: J037, J021

### J040: JDBC and connection pools (core)

Persist a batch with parameters, rollback on failure and prove connections return to the pool.

Mechanisms: prepared statements; batching; autocommit; timeouts; resource lifetime; pool limits

Techniques: parameterized SQL; pool saturation test

Break case: Keeping connection open while waiting for Kafka indefinitely

Prerequisites: J037, J011

### J042: Kafka producer client integration (core)

Track enqueue and final broker acknowledgment separately; inject delivery failure.

Mechanisms: async send; delivery callback; serializer; buffer; batch; thread safety

Techniques: delivery-result audit; client ownership

Break case: Treating enqueue success as final delivery

Prerequisites: J024, J011, J034

### J043: Outbox publisher ownership (core)

Crash relay after publish before marking delivered; show stable identity permits downstream deduplication.

Mechanisms: database acceptance; relay retry; stable event ID; duplicate publish; claim locking

Techniques: crash-window table; durable outbox state machine

Break case: Promising exactly-once broker emission from an outbox

Prerequisites: J037, J040, J042

### J044: Service security boundaries (core)

Authenticate ingress, reject unauthorized tenants and avoid leaking credentials.

Mechanisms: authentication; authorization; filter chain; CSRF applicability; CORS; rate limits

Techniques: threat table; negative access tests

Break case: Equating CORS with authorization

Prerequisites: J034, J036

### J045: Testing layers and fault design (core)

Write tests whose oracle checks durable effects after injected failure, not just mocked calls.

Mechanisms: unit; MVC slice; integration; real database; test doubles; determinism

Techniques: contract assertions; recovery test

Break case: Calling mock-based tests end-to-end proof

Prerequisites: J035, J037, J042

### J046: Build and dependency management (core)

Build from a fresh checkout with declared JDK and reproducible dependency resolution.

Mechanisms: Maven lifecycle; scopes; transitive versions; compiler target; wrapper; test phases

Techniques: clean reproducible build; dependency tree

Break case: Relying on IDE-only classpath state

Prerequisites: J001

### J048: Public contracts and schema evolution (depth)

Evolve event metadata while old readers keep working; reject incompatible semantic changes.

Mechanisms: API compatibility; unknown fields; enum evolution; deprecation; consumer contract

Techniques: versioned fixtures; compatibility tests

Break case: Labeling parsing success as semantic compatibility

Prerequisites: J034, J035, J045

## labs/python

### P001: Names, objects and binding (core)

Predict alias/rebinding results and draw reachable objects at each step.

Mechanisms: identity; equality; rebinding; argument passing; aliasing

Techniques: object graph; predict before executing

Break case: Calling assignment an implicit deep copy

Prerequisites: none

### P003: Function signatures and defaults (core)

Repair a mutable-default accumulator and distinguish omitted versus explicit None.

Mechanisms: default evaluation; positional-only; keyword-only; variadic arguments; sentinels

Techniques: signature design; two-call trap

Break case: Using [] as an unintended shared default

Prerequisites: P001, P002

### P004: Scope and closures (core)

Generate device-specific handlers without all closures using the final device.

Mechanisms: LEGB; late binding; nonlocal; global; closure cells

Techniques: predict loop lambdas; factory closure

Break case: Assuming closure captures a snapshot automatically

Prerequisites: P003

### P006: Python protocols and descriptors (depth)

Implement a read-only event view and explain property versus stored attribute.

Mechanisms: dunder methods; attribute lookup; descriptor; property; context protocol

Techniques: minimal protocol implementation; lookup trace

Break case: Implementing magic methods without preserving protocol laws

Prerequisites: P005

### P007: Hashing and dictionary correctness (core)

Use a frozen event key and test duplicate detection under deliberate hash collisions.

Mechanisms: hash/equality; mutable key restriction; set; ordered dict behavior; collision

Techniques: hash-contract lab; immutable composite key

Break case: Assuming equal hashes imply equality

Prerequisites: P002, P005

### P008: Iteration protocol (core)

Implement bounded event iteration and test exhaustion and repeated iteration behavior.

Mechanisms: iterable versus iterator; iter/next; StopIteration; one-shot consumption

Techniques: custom iterator; exhaustion fixture

Break case: Calling next on any iterable without obtaining iterator

Prerequisites: P003

### P011: Decorators and transparent wrappers (core)

Write a timing decorator preserving result and exception; test composed wrappers.

Mechanisms: call-time versus definition-time; wraps; parameters; stacking; retry

Techniques: preserve metadata; bounded retry wrapper

Break case: Generic retry decorator around non-idempotent side effects

Prerequisites: P004, P013, P014

### P015: CPython memory management (depth)

Create a reference cycle and attribute retention without relying on deterministic finalizers.

Mechanisms: reference counting; cyclic GC; weak references; implementation scope

Techniques: cycle experiment; retaining graph

Break case: Presenting CPython internals as every Python implementation

Prerequisites: P002, P005

### P016: GIL and workload classification (core)

Measure pure-Python CPU work with one and multiple threads, recording build and library behavior.

Mechanisms: concurrency versus parallelism; GIL-enabled CPython; I/O release; native extensions; process costs

Techniques: CPU/I/O benchmark; runtime metadata

Break case: Claiming all Python execution is permanently single-threaded

Prerequisites: P015, P019

### P017: Optional free-threaded Python (extension)

Document free-threaded capability and test protected state with a compatible environment if available.

Mechanisms: build option; GIL runtime state; extension compatibility; shared-state races; container locks

Techniques: build-state check; version-pinned race lab

Break case: Inferring application thread safety from internal container locks

Prerequisites: P016, P022

### P020: Asyncio scheduling (core)

Run independent I/O coroutines and show why pure CPU work blocks unrelated tasks.

Mechanisms: coroutine; task; await; event loop; blocking call; bounded concurrency

Techniques: event-loop lag measurement; semaphore

Break case: Replacing process pool with async for CPU-bound loops

Prerequisites: P008, P014

### P021: Cancellation and deadlines (core)

Cancel a processing task around persistence and explain whether its effect already happened.

Mechanisms: CancelledError; TaskGroup; wait_for; cleanup; partial effects; timeout budget

Techniques: cancel-at-boundary tests; deadline propagation

Break case: Retrying timed-out non-idempotent operation as if no effect occurred

Prerequisites: P020, P010

### P023: Collections and cost models (core)

Implement bounded recent-event dedup cache and explain its retention limits.

Mechanisms: list; dict; set; deque; Counter; heap; copy cost

Techniques: operation table; top-k implementation

Break case: Calling deque operations or dictionary lookup universal constant-time guarantees

Prerequisites: P007, P008

### P027: File and stream I/O (core)

Stream a large NDJSON replay without read-all allocation; fail safely on a partial final line.

Mechanisms: buffering; binary/text; partial reads; atomic replacement; resource lifetime

Techniques: streamed fixtures; failure-before-close test

Break case: Assuming line completeness after a crash

Prerequisites: P009, P010

### P031: Performance measurement (core)

Measure processing throughput and p50/p95/p99 separately with workload and machine metadata.

Mechanisms: perf_counter; process time; latency distribution; warmup; sample size

Techniques: fixed-seed workload; timing boundary

Break case: Choosing only the best run and calling it typical

Prerequisites: P025, P026

### P032: CPU profiling and bottleneck attribution (depth)

Profile a slow batch, optimize one hotspot and measure total speedup.

Mechanisms: cProfile; cumulative versus self time; sampling; instrumentation overhead; Amdahl bound

Techniques: profile first; before/after workload

Break case: Optimizing syntax before measuring bottleneck

Prerequisites: P031, P019

### P036: Property and metamorphic testing (depth)

Generate repeated/reordered events and compare results to a slow reference processor.

Mechanisms: invariant; generated cases; shrinking concept; permutation; duplicate insertion; boundary oracle

Techniques: metamorphic relations; reference model

Break case: Asserting implementation against itself

Prerequisites: P035, P023

### P037: Memory profiling and retention (depth)

Compare list versus generator replay and detect an intentionally retained buffer.

Mechanisms: tracemalloc; peak versus retained; snapshot; native memory caveat; buffer caps

Techniques: snapshot difference; bounded memory run

Break case: Equating all native memory with tracked Python allocations

Prerequisites: P015, P031, P022

### P040: Live algorithm and code defense (core)

Solve top-k devices, duplicate IDs and moving averages without looking at the reference.

Mechanisms: loop invariant; hash counting; sliding window; heap; generator; recursion limits

Techniques: blank-file coding; reference comparison

Break case: Recognizing a memorized answer without reconstructing it

Prerequisites: P023, P009

## python-consumer

### P002: Mutability and copying (core)

Protect validated event data from subsequent caller mutation.

Mechanisms: mutable containers; tuple contents; shallow copy; deep copy; shared references

Techniques: alias challenge; explicit ownership

Break case: Treating immutable outer container as deep immutability

Prerequisites: P001

### P005: Classes and method lookup (core)

Create a processor with independent per-instance state and injected persistence.

Mechanisms: instance versus class attributes; MRO; super; composition; dataclass

Techniques: state ownership test; interface adapter

Break case: Using class attributes for mutable per-device buffers

Prerequisites: P001, P002

### P009: Generators and streaming memory (core)

Read and validate NDJSON lazily and measure memory versus list materialization.

Mechanisms: yield; suspension; yield from; lazy work; cleanup; retained locals

Techniques: bounded generator pipeline; early-close test

Break case: Claiming laziness automatically makes memory O(1)

Prerequisites: P008, P010

### P010: Context managers and transactions (core)

Use a context-managed transaction and verify exceptions do not turn into successful offset commits.

Mechanisms: enter/exit; exception suppression; contextmanager; resource ownership

Techniques: rollback-on-exception fixture; explicit close

Break case: Swallowing exception in context manager

Prerequisites: P003

### P012: Type hints and runtime boundaries (core)

Type processor dependencies and demonstrate invalid JSON still requires validation.

Mechanisms: annotations; Optional; TypedDict; Protocol; generics; type checker

Techniques: static check; runtime validation separation

Break case: Trusting a type annotation to reject malformed payloads

Prerequisites: P005, P003

### P013: Validation and deterministic parsing (core)

Reject impossible timestamps, nonfinite numbers, bool numeric fields and unsupported versions.

Mechanisms: missing/null; numeric ranges; bool as int; unknown fields; schema versions

Techniques: fixture matrix; explicit parse result

Break case: Accepting any syntactically valid JSON as valid event

Prerequisites: P012, P003

### P014: Exception control flow (core)

Classify decode failures, database timeouts and programming errors without committing unprocessed offsets.

Mechanisms: raise; cause chaining; finally; exception hierarchy; retryable failures

Techniques: classification table; failure-preserving test

Break case: Broad catch with log-and-continue losing data

Prerequisites: P003

### P018: Thread ownership and synchronization (core)

Coordinate polling, worker results and shutdown without sharing unsafe state.

Mechanisms: Lock; RLock; Event; Condition; bounded queue; join; shutdown

Techniques: owner thread; guarded invariant

Break case: Using daemon threads as reliable cleanup

Prerequisites: P014, P001

### P019: Processes and CPU parallelism (core)

Move CPU-heavy transformation to a process pool without passing Kafka/DB clients.

Mechanisms: serialization; spawn/fork differences; pickling; IPC; pool; startup overhead

Techniques: pure worker function; bounded submissions

Break case: Forking live database connections or passing them as jobs

Prerequisites: P005, P014

### P022: Bounded pipeline coordination (core)

Complete offset 12 before 11; prove the committed boundary cannot skip 11.

Mechanisms: queue backpressure; result ordering; in-flight limits; ownership; contiguous completion

Techniques: per-partition watermark; bounded buffer

Break case: Committing out-of-order worker completion blindly

Prerequisites: P018, P019

### P024: Text, bytes and encodings (core)

Decode valid and malformed Kafka payloads; bound bytes before allocating huge nested structures.

Mechanisms: str/bytes; UTF-8; decode failure; normalization; byte-size limits

Techniques: multibyte fixtures; strict boundary decode

Break case: Treating arbitrary binary payload as UTF-8 without checks

Prerequisites: P003, P013

### P025: Numeric semantics (core)

Compute anomaly score with documented finite-value and rounding policies.

Mechanisms: int; float; Decimal; NaN; rounding; statistics

Techniques: numerical edge cases; explicit tolerance

Break case: Claiming Decimal fixes every numerical modeling error

Prerequisites: P013

### P026: Time and timezone semantics (core)

Compute event lateness using timestamp instants and operation duration using a monotonic clock.

Mechanisms: aware/naive datetime; UTC; event time; ingestion time; monotonic duration

Techniques: timezone fixtures; separate clocks

Break case: Using datetime.now subtraction as a universal monotonic timer

Prerequisites: P013

### P028: Serialization contract (core)

Round-trip the same event fixture with Java while preserving ID and numeric meaning.

Mechanisms: JSON types; decimal representation; schema version; canonicalization limits; size depth limits

Techniques: cross-language golden fixture; schema validation

Break case: Using repr or pickle as public wire schema

Prerequisites: P013, P025, P024

### P029: Python Kafka client lifecycle (core)

Process messages under explicit client ownership, preserve contiguous offsets and drain safely on revocation.

Mechanisms: poll callbacks; subscribe/assign; offset commit; pause/resume; client ownership; shutdown

Techniques: single-owner loop; rebalance-aware completion

Break case: Assuming all Python Kafka clients have identical thread safety

Prerequisites: P022, P014, P028

### P030: SQL client and transaction ownership (core)

Insert inbox marker and business effect in one transaction; replay duplicate and verify one effect.

Mechanisms: parameter binding; transaction scope; rollback; pool; connection versus cursor sharing

Techniques: durable-inbox transaction; connection-owner audit

Break case: Sharing one transaction across unrelated workers accidentally

Prerequisites: P010, P014, P018

### P033: Packaging and repeatable environments (core)

Install and run the consumer from a fresh environment using documented dependencies.

Mechanisms: virtual environment; pyproject; dependency constraints; entry point; wheel; interpreter version

Techniques: fresh install; declared runtime

Break case: Assuming one global pip install is a reproducible build

Prerequisites: P003

### P034: Structured logging and observability (core)

Trace one event through receive, validate, persist and commit with no credentials in logs.

Mechanisms: logger hierarchy; levels; correlation ID; exception info; redaction; cardinality

Techniques: structured event logs; failure trace

Break case: Logging success before commit completes

Prerequisites: P014, P029

### P035: Unit, integration and deterministic tests (core)

Test malformed payload, duplicate event and database rollback using stable fixtures.

Mechanisms: unittest; fixtures; mocks; real side effects; seed; clock injection; cleanup

Techniques: observable state oracle; fault injection

Break case: Counting coverage as proof of recovery correctness

Prerequisites: P013, P030

### P038: Unsafe input and subprocess boundaries (core)

Reject hostile data without eval/pickle and invoke tooling without shell interpolation.

Mechanisms: pickle risk; eval; command injection; SQL injection; secrets; least privilege

Techniques: argument-list subprocess; negative fixtures

Break case: Treating a command argument list as a complete security policy

Prerequisites: P024, P030, P014

### P039: CLI and operational behavior (core)

Expose replay/consumer modes with validated config, nonzero failure exits and documented shutdown.

Mechanisms: argparse; exit code; SIGTERM handling; dry run; configuration; health

Techniques: deterministic entry point; shutdown test

Break case: Returning success after partial unreported processing failure

Prerequisites: P033, P018, P034

## kafka

### K001: Partitioned log and offsets (core)

Produce keyed records and explain each topic/partition/offset tuple.

Mechanisms: topic/partition/replica; partition-local append order; offset identity and gaps

Techniques: offset trace; metadata inspection

Break case: Consumption is not deletion and offsets need not be dense.

Prerequisites: none

### K002: Keys, partitioning and hot keys (core)

Compare uniform and skewed warehouse/device key distributions.

Mechanisms: key hashing; null-key batching; partition expansion and remapping

Techniques: key histogram; skewed load test

Break case: More partitions do not resolve one indivisible hot key.

Prerequisites: K001

### K003: Replication, ISR and acknowledgements (core)

In a later three-broker profile record write acceptance after losing one then two replicas.

Mechanisms: leader/followers; current ISR versus RF; acks and minimum ISR

Techniques: failure matrix; describe snapshots

Break case: Acknowledgement settings do not prove unconditional durability.

Prerequisites: K001

### K004: KRaft metadata versus record replication (depth)

Contrast single-node restart with a three-controller quorum failure.

Mechanisms: controller quorum; metadata leadership; combined/separate roles

Techniques: quorum inspection; topology drawing

Break case: A single broker restart does not prove replicated failover.

Prerequisites: K003

### K005: Producer idempotence (core)

Compare client transport retry with application resubmission of the same event.

Mechanisms: producer sequence tracking; transport retry versus new send; compatible configuration

Techniques: duplicate injection; configuration audit

Break case: Producer idempotence is not external business exactly-once.

Prerequisites: K003

### K006: Kafka transactions and fencing (depth)

Implement a later Kafka-to-Kafka branch committing output and consumed offsets together.

Mechanisms: transactional IDs; atomic Kafka outputs/offsets; stale producer fencing

Techniques: abort/commit traces; incarnation restart

Break case: Kafka transactions do not include arbitrary JDBC or HTTP effects.

Prerequisites: K005, K010

### K007: Batching and bounded producer buffers (core)

Measure fixed-workload throughput and p95 latency at several batching configurations.

Mechanisms: batch/linger; compression; blocking versus delivery deadlines

Techniques: latency/throughput sweep; buffer exhaustion

Break case: An asynchronous send returning is not broker acknowledgement.

Prerequisites: K002

### K008: Consumer groups and assignment (core)

Run two groups over three partitions and record separate consumption.

Mechanisms: group versus instance; partition ownership; classic consumer concurrency ceiling

Techniques: assignment capture; scale-out experiment

Break case: Five classic consumers cannot independently own one partition at once.

Prerequisites: K001

### K009: Poll budgets and heartbeats (core)

Delay processing beyond the configured poll budget and save reassignment/error evidence.

Mechanisms: max.poll.interval.ms; classic heartbeats; new-protocol broker controls

Techniques: delay injection; poll duration histogram

Break case: Do not copy Java/classic settings onto every Python/new-protocol client.

Prerequisites: K008

### K010: Position, committed offsets and reset (core)

Restart before and after checkpointing next offset 8.

Mechanisms: fetch position; recovery checkpoint; earliest/latest reset conditions

Techniques: restart traces; per-partition commit map

Break case: The last processed offset itself is not the next recovery offset.

Prerequisites: K008

### K011: Partial batches and completion frontiers (core)

Complete offsets 10 and 12 while 11 fails and assert checkpoint cannot pass 11.

Mechanisms: completed prefix; out-of-order completions; independent partitions

Techniques: frontier algorithm; failed-middle fixture

Break case: Maximum completed offset can skip unfinished work.

Prerequisites: K010

### K012: Rebalance and in-flight recovery (core)

Revoke ownership during a DB task and verify recovery and deduplication.

Mechanisms: revocation/assignment; stale tasks; commit and DB boundaries

Techniques: two-consumer trace; revocation fixture

Break case: Group commit fencing does not itself fence external DB effects.

Prerequisites: K009, K011

### K013: Eager, cooperative and consumer protocols (depth)

Check actual client support before comparing protocol behavior.

Mechanisms: client assignors; incremental revocation; new protocol migration

Techniques: capability matrix; rebalance log comparison

Break case: An assignment strategy is not the whole group protocol.

Prerequisites: K012

### K014: Static membership (depth)

Compare restart rebalance counts under dynamic and static membership.

Mechanisms: stable instance ID; restart disruption; delayed failover

Techniques: duplicate-ID fixture; graceful shutdown trace

Break case: Static membership does not eliminate every rebalance.

Prerequisites: K012

### K015: Consumer concurrency and confinement (core)

Parallelize partitions while serializing each required ordering domain.

Mechanisms: poll owner thread; bounded task pool; order-preserving workers

Techniques: single-owner loop; bounded queues

Break case: One global max offset is unsafe with parallel workers.

Prerequisites: K011, K012

### K016: Transient retries versus poison records (core)

Route invalid schema and temporary DB outage differently.

Mechanisms: error classification; bounded attempts/age; retry ordering

Techniques: retry table; backoff and jitter

Break case: Skipping every exception loses records and retrying invalid data forever stalls progress.

Prerequisites: K011

### K017: Durable DLQ and replay (core)

Crash before and after durable quarantine publication and source checkpoint.

Mechanisms: failure envelope; quarantine before checkpoint; preserved logical identity

Techniques: DLQ failure trace; replay manifest

Break case: A failed DLQ write cannot justify skipping source data.

Prerequisites: K016

### K018: Retention and replay horizons (core)

Check outage, replay, DLQ redrive and marker lifetimes against each other.

Mechanisms: time/size expiry; outage plus catch-up; offset out of range

Techniques: recovery budget; retention breach drill

Break case: Kafka retention is not a permanent archive.

Prerequisites: K010

### K019: Compaction and tombstones (depth)

Compare immutable event topic with compacted current-device-state topic.

Mechanisms: latest state per key; asynchronous cleaning; deletion horizon

Techniques: state reconstruction; tombstone fixture

Break case: Compaction cannot preserve guaranteed full event history.

Prerequisites: K002, K018

### K020: Schema contracts and compatibility (core)

Test added optional field and removed required field against old consumers.

Mechanisms: required/optional fields; writer/reader directions; envelope versions

Techniques: compatibility fixtures; old-reader tests

Break case: JSON syntax validity is not schema or semantic compatibility.

Prerequisites: K001

### K021: Lag, event age and durable progress (core)

Stall one hot partition and demonstrate misleading group averages.

Mechanisms: offset lag; oldest unfinished age; sink progress

Techniques: partition dashboards; metric correlation

Break case: Committed offsets alone do not prove correct effects.

Prerequisites: K011

### K022: Transactional visibility (depth)

Compare consumers while one producer transaction remains open.

Mechanisms: read_committed; last stable offset; open and aborted transactions

Techniques: open-transaction trace; isolation comparison

Break case: Consumer isolation does not atomically include PostgreSQL.

Prerequisites: K006, K010

### K023: Leadership and visibility frontiers (depth)

Predict retained records under clean and explicitly unsafe election assumptions.

Mechanisms: high watermark; replica eligibility; unclean election

Techniques: leader-loss diagram; survivor reconciliation

Break case: A leader-local append is not a replicated durability guarantee.

Prerequisites: K003

### K024: Pause/resume and backpressure (core)

Pause saturated partitions while maintaining required polling.

Mechanisms: finite in-flight memory; control-loop liveness; resume thresholds

Techniques: queue memory bound; slow-sink test

Break case: Unbounded application queues defeat broker buffering benefits.

Prerequisites: K009, K015

### K025: TLS, authentication and ACLs (depth)

Give relay, processor and observer narrowly scoped privileges.

Mechanisms: encryption; principal identity; topic/group permissions

Techniques: deny matrix; forbidden-action tests

Break case: Plaintext localhost success proves no production security claim.

Prerequisites: K008

### K026: Connect and CDC integration (depth)

Compare polling outbox with a CDC design and its operational obligations.

Mechanisms: connectors/tasks; snapshots and restart; retained WAL

Techniques: custom-versus-connector ADR; slot lag budget

Break case: Connector semantics vary and do not automatically remove duplicates.

Prerequisites: K020, S034

### K027: Streams joins and state stores (extension)

Design an optional Streams metadata-join branch separate from baseline Python processing.

Mechanisms: stream/table distinction; keyed state/changelog; window joins

Techniques: topology drawing; late-data fixtures

Break case: A plain consumer loop does not inherit Streams state or transaction guarantees.

Prerequisites: K020, D009

### K028: Broker integration and fault tests (depth)

Run duplicates, disconnects and rebalance scenarios and preserve config/runtime evidence.

Mechanisms: real offset behavior; crash points; deterministic manifests

Techniques: seeded injection; identity reconciliation

Break case: A passing demonstration is not proof over every schedule.

Prerequisites: K017, K021

### K029: Partition sizing and recovery (depth)

Size from measured per-partition service rates then test skew and recovery.

Mechanisms: worker ceiling; skew; catch-up capacity

Techniques: capacity worksheet; replay load test

Break case: Partition count is not a universal throughput setting.

Prerequisites: K002, K021, D011

### K030: Kafka-to-DB atomicity boundary (core)

Crash between DB effect commit and source checkpoint and inspect one effect under replay.

Mechanisms: independent commits; inbox guards; checkpoint after DB outcome

Techniques: two-commit trace; duplicate replay

Break case: Conflict UPDATE increments and premature marker deletion break deduplication.

Prerequisites: K010, S013, D002

### K031: Cross-cluster recovery (extension)

Define an optional second-cluster exercise and allowed loss before implementing it.

Mechanisms: async replication lag; checkpoint translation; RPO/RTO

Techniques: DR tabletop; failure scope matrix

Break case: Colocated replicas do not prove multi-region resilience.

Prerequisites: K018, D022

### K032: Client and version compatibility (depth)

Document actual Python/Java clients before enabling protocol or transaction features.

Mechanisms: client/broker pinning; Java/Python option names; protocol support

Techniques: capability table; effective config dump

Break case: Documented Kafka 4.x behavior may not fit the existing client.

Prerequisites: K009, K013

## sql

### S001: Relational modeling and normalization (core)

Model warehouse/device/event/anomaly facts and one duplicated-attribute anomaly.

Mechanisms: keys; functional dependencies; update anomalies

Techniques: dependency diagram; decomposition

Break case: An ID column alone does not establish normalization.

Prerequisites: none

### S002: Keys and constraints (core)

Try duplicate event IDs, missing devices and null mandatory fields.

Mechanisms: primary/foreign/unique keys; composite identity; nullability

Techniques: invalid fixture rows; integrity-first schema

Break case: API validation alone cannot arbitrate concurrent writers.

Prerequisites: S001

### S003: NULL and three-valued logic (core)

Compare WHERE, aggregates and anti-joins with null-containing rows.

Mechanisms: unknown predicates; NOT IN nulls; count variants

Techniques: truth table; NOT EXISTS fixture

Break case: NULL is not zero and = NULL is not IS NULL.

Prerequisites: S002

### S004: Join semantics and fanout (core)

Join event tags and device metadata and expose a multiplied SUM.

Mechanisms: inner/outer/cross; multiplicity; ON versus WHERE

Techniques: hand-computed tables; cardinality audit

Break case: DISTINCT can conceal a model bug.

Prerequisites: S001, S003

### S005: Grouping and conditional aggregation (core)

Report warehouses with zero events and separate anomaly counts.

Mechanisms: WHERE/HAVING; FILTER/CASE; empty sets

Techniques: aggregate invariants; zero-event fixture

Break case: Outer placeholders are not actual events.

Prerequisites: S004

### S006: Window ranking and top-N (core)

Return three latest events per device with ID tie-break.

Mechanisms: row_number/rank/dense_rank; partitions; complete tie order

Techniques: top-N query; tied-time fixture

Break case: Global LIMIT is not top-N per group.

Prerequisites: S005

### S007: Frames and rolling metrics (core)

Compare three-row averages with ten-minute occurrence-time windows.

Mechanisms: ROWS/RANGE; peers and default frame; lag/lead

Techniques: explicit frames; equal-time fixture

Break case: Default frame may not match the intended whole partition.

Prerequisites: S006

### S008: CTEs and subqueries (core)

Write equivalent CTE and subquery summaries and compare plans.

Mechanisms: EXISTS semijoin; correlation; materialization/inlining

Techniques: rewrite comparison; intermediate checks

Break case: CTEs do not inherently improve performance.

Prerequisites: S004

### S009: Recursive SQL and cycles (depth)

Traverse zones with a cycle and explicit detection or visited-path rule.

Mechanisms: anchor/recursive step; UNION/ALL; termination

Techniques: hierarchy traversal; cycle fixture

Break case: Unbounded cyclic recursion can fail to terminate.

Prerequisites: S008

### S010: Set and bag operations (core)

Find missing logical IDs and separately count duplicate effects.

Mechanisms: UNION/INTERSECT/EXCEPT; ALL multiplicity; reconciliation

Techniques: missing-ID query; duplicate fixture

Break case: Set equality alone does not prove one effect per ID.

Prerequisites: S003

### S011: Transactions and coupled effects (core)

Insert inbox and change a metric, then inject second-statement failure.

Mechanisms: atomic BEGIN/COMMIT; failed transaction state; rollback

Techniques: crash ledger; guarded transaction

Break case: Marker and effect must not commit separately.

Prerequisites: S002

### S012: MVCC and snapshot lifetimes (core)

Repeat SELECT around another commit at two isolation levels.

Mechanisms: statement/transaction views; versions; write blocking

Techniques: two-session schedules; snapshot timeline

Break case: MVCC does not mean no locks or anomalies.

Prerequisites: S011

### S013: Concurrent INSERT and UPSERT (core)

Gate business effects on successful unique inbox insertion.

Mechanisms: unique arbitration; DO NOTHING RETURNING; guarded effects

Techniques: concurrent duplicate fixture; insertion branch

Break case: Incrementing on conflict repeats a business effect.

Prerequisites: S002, S011

### S014: Lost updates and version checks (core)

Repair two stale clients overwriting a shared metric.

Mechanisms: stale overwrite; atomic arithmetic; compare-and-swap

Techniques: two-session trace; affected-row check

Break case: Transaction syntax alone does not fix unsafe stale writes.

Prerequisites: S012

### S015: Write skew and serializable retries (depth)

Make two processors independently withdraw from a shared on-call pool.

Mechanisms: cross-row invariant; snapshot isolation limits; SSI failures

Techniques: invariant schedule; full transaction retry

Break case: Repeatable Read is not Serializable.

Prerequisites: S012, S014

### S016: Locking and deadlocks (core)

Acquire A then B and B then A and record abort behavior.

Mechanisms: row lock modes; reverse order; waits and timeout

Techniques: wait graph; two-session deadlock

Break case: Infinite retry does not solve contention design.

Prerequisites: S012

### S017: SKIP LOCKED queues (depth)

Crash a relay before and after publication and reconcile claimed rows.

Mechanisms: claims; lease versus lock; skipped ordering

Techniques: parallel relay fixture; crashed claim

Break case: Holding locks through unbounded sends still is not cross-system atomicity.

Prerequisites: S016

### S018: Index choice and costs (core)

Compare selective device lookup with full warehouse reporting.

Mechanisms: operator support; selectivity; write/storage overhead

Techniques: before/after plans; workload ADR

Break case: O(log n) does not determine end-to-end query time.

Prerequisites: S004

### S019: Composite index order (core)

Compare device/time/ID and time/device indexes on latest-device queries.

Mechanisms: PostgreSQL 15 leading columns; equality/range; ordering coverage

Techniques: two index orders; plan comparison

Break case: No universal column-order rule substitutes for a query.

Prerequisites: S018

### S020: Partial indexes (depth)

Compare literal and prepared predicates on a partial pending-work index.

Mechanisms: predicate implication; small active subset; expression indexing

Techniques: pending-outbox index; parameter fixture

Break case: Touching indexed columns alone does not qualify the query.

Prerequisites: S018

### S021: Covering indexes and visibility (depth)

Observe heap fetches before and after write churn and vacuum.

Mechanisms: INCLUDE columns; visibility map; heap fetches

Techniques: update/vacuum comparison; index-only metrics

Break case: Covering fields do not guarantee zero heap access.

Prerequisites: S018, S028

### S022: EXPLAIN ANALYZE and buffers (core)

Explain estimation errors, dominant nodes and cache/disk behavior in one plan.

Mechanisms: estimated cost; rows/loops; execution side effects

Techniques: annotated plan; safe transaction wrapper

Break case: EXPLAIN ANALYZE can actually mutate data.

Prerequisites: S018

### S023: Join algorithms and spills (depth)

Vary relation sizes and inspect join strategy and spill behavior.

Mechanisms: nested/hash/merge joins; ordering; memory spill

Techniques: size sweep; temporary-file metrics

Break case: Algorithm names alone do not establish efficiency.

Prerequisites: S004, S022

### S024: Statistics and estimation (depth)

Compare estimates on correlated device/warehouse filters with suitable statistics.

Mechanisms: ANALYZE; skew/MCVs; correlated predicates

Techniques: skew fixtures; error ratio

Break case: Uniform distributions are an assumption to test.

Prerequisites: S022

### S025: Stable pagination (core)

Use timestamp/ID keyset cursor and compare a deep OFFSET plan.

Mechanisms: deep OFFSET cost; tuple keyset; concurrency semantics

Techniques: deep-page benchmark; tied-cursor fixture

Break case: Timestamp-only cursor can skip ties.

Prerequisites: S019

### S026: Partitioning and uniqueness (depth)

Keep global inbox identity separate while evaluating time partition retention.

Mechanisms: range pruning; partition lifecycle; cross-partition key restrictions

Techniques: pruning plan; dedup placement ADR

Break case: Time partitioning does not automatically preserve event_id-only global uniqueness.

Prerequisites: S019, S022

### S027: Expand/contract migrations (depth)

Add a required field through compatible staged changes.

Mechanisms: two app versions; staged backfill; validation and locks

Techniques: migration rehearsal; rollback boundary

Break case: Remove/rename only after all consumers migrate.

Prerequisites: S002, S016

### S028: Vacuum and long snapshots (core)

Measure dead tuples and maintenance with a long-lived snapshot.

Mechanisms: dead versions; autovacuum; wraparound and retention

Techniques: churn observation; long transaction

Break case: Disabling maintenance can accumulate bloat and other risks.

Prerequisites: S012

### S029: Connection pool budgets (core)

Run excess tasks and ensure finite pool waits and rollback/close.

Mechanisms: pool limits; acquisition deadlines; cleanup

Techniques: bounded pool test; wait metrics

Break case: Request concurrency is not automatically optimal pool size.

Prerequisites: S011, D011

### S030: Parameterized SQL and roles (core)

Bind query values and deny schema changes for application role.

Mechanisms: bound values; identifiers; app/migration privilege

Techniques: injection fixture; forbidden DDL

Break case: Concatenated inputs and superuser service accounts expand risk.

Prerequisites: S004

### S031: Time zones and buckets (depth)

Report local hourly telemetry across DST and define bucket semantics.

Mechanisms: instant versus local time; timestamptz; DST

Techniques: DST fixture; explicit report zone

Break case: Timezone-naive values do not define a global instant.

Prerequisites: S007

### S032: JSONB and typed columns (depth)

Keep identity/time/device typed while storing validated extensible payload.

Mechanisms: flexible documents; integrity projection; operator indexes

Techniques: schema ADR; filter plans

Break case: Schemaless storage does not eliminate contracts.

Prerequisites: S018, K020

### S033: COPY and batch writes (depth)

Compare validated row insert and COPY-to-staging throughput.

Mechanisms: bulk transfer; transaction size; validation staging

Techniques: bulk benchmark; batch failure

Break case: Raw load throughput is not durable business processing rate.

Prerequisites: S011, S022

### S034: WAL and logical decoding (extension)

Design CDC outbox and retained-WAL alert.

Mechanisms: recovery log; change stream; slot lag retention

Techniques: CDC sketch; stopped-reader budget

Break case: Abandoned slots may retain WAL indefinitely.

Prerequisites: S011, S028

## labs/distributed

### D001: State machines, safety and liveness (core)

Model accepted/published/applied/quarantined event states.

Mechanisms: states/transitions; invariants; recovery assumptions

Techniques: transition table; shortest trace

Break case: Eventual success does not prove safe intermediate states.

Prerequisites: none

### D002: Delivery versus one durable effect (core)

Prove repeated attempts yield one guarded committed DB effect under declared assumptions.

Mechanisms: execution count; independent commits; conditional proof

Techniques: commit counterexample; inbox invariant

Break case: Exactly-once needs an observable effect and failure model.

Prerequisites: D001, S011, S013

### D003: API idempotency and acceptance (core)

Lose a committed API response then retry the same logical request.

Mechanisms: stable key; conflicting payload; durable response boundary

Techniques: response-loss trace; concurrency fixture

Break case: New IDs on retries defeat application idempotency.

Prerequisites: D001, S013

### D004: Transactional outbox (core)

Crash after publish acknowledgement but before marking publication.

Mechanisms: atomic intent; publish/mark gap; claim ownership

Techniques: relay crash trace; stable IDs

Break case: Outbox relay is not a DB-plus-Kafka atomic transaction.

Prerequisites: D003, S017

### D005: Marker lifetime and identity integrity (core)

Replay an old ID after deleting its marker and demonstrate the broken invariant.

Mechanisms: full replay horizon; cleanup; same-ID mismatch

Techniques: age ledger; conflicting payload

Break case: Average retry time ignores manual resets and old outbox rows.

Prerequisites: D002, K018

### D006: Ordering and sequence gates (core)

Process out-of-order device sequences and specify aggregate/latest-state policy.

Mechanisms: per-device domain; occurrence versus append; missing sequences

Techniques: CAS version gate; 1/3/2 fixture

Break case: Wall clocks do not define universal business order.

Prerequisites: K002, S014

### D007: Deadlines, retry safety and storms (core)

Quantify retries across API, relay and consumer.

Mechanisms: ambiguous responses; bounded backoff; nested amplification

Techniques: deadline budget; retry load test

Break case: Independent infinite budgets multiply overload.

Prerequisites: D003

### D008: Consistency under partition (depth)

Explain why isolated replicas cannot both accept invariant-sensitive writes freely.

Mechanisms: linearizability; theorem availability; stale reads

Techniques: indistinguishable traces; partition tabletop

Break case: Choose-any-two slogan omits crucial assumptions.

Prerequisites: D001, K003

### D009: Event-time windows and lateness (depth)

Replay same event-time dataset at different arrival speeds.

Mechanisms: processing/occurrence time; watermarks; corrections

Techniques: arrival-order replay; lateness fixtures

Break case: A heuristic watermark is not a universal completeness proof.

Prerequisites: D006, S007

### D010: Causality and logical clocks (depth)

Construct clock-ordered events with no causal relation.

Mechanisms: happens-before; scalar-clock implication; concurrent ties

Techniques: message diagram; clock assignment

Break case: Clock order converse is false.

Prerequisites: D006

### D011: Little law and queue stability (core)

Measure one queue population and verify mean units and conservation.

Mechanisms: mean occupancy/rate/time; finite stable regime; offered/admitted rate

Techniques: occupancy area derivation; matching boundaries

Break case: p99 is not mean sojourn and offered rate is not always admitted rate.

Prerequisites: K024

### D012: Catch-up and retention budgets (depth)

Derive backlog=60000 and catch-up=1200s for arrival100/s service150/s outage600s.

Mechanisms: outage backlog; excess service rate; replay age

Techniques: fluid derivation; overload recovery

Break case: backlog/mu ignores continuing arrivals.

Prerequisites: D011, K018

### D013: Amdahl limits and bottlenecks (depth)

Measure serial coordination before increasing process count.

Mechanisms: fixed work; serial fraction; overhead

Techniques: speedup derivation; worker sweep

Break case: n workers do not guarantee n throughput.

Prerequisites: D011

### D014: Bounded admission and backpressure (core)

Overdrive sink and prove finite resources with explicit outcomes.

Mechanisms: memory/disk budgets; rejection/defer; saturation

Techniques: queue bound; overload acceptance

Break case: Unbounded sustained admission defeats finite processing capacity.

Prerequisites: D007, D011

### D015: SLOs and latency distributions (core)

Define acceptance availability and accepted-to-effect freshness separately.

Mechanisms: valid/good population; effect freshness; error budget

Techniques: SLI query; finite-window budget

Break case: Excluding failures manufactures good metrics.

Prerequisites: K021, D001

### D016: Failure model and evidence scope (core)

Record expected invariant and untested boundaries for every fault.

Mechanisms: crash/restart; disk/network faults; correlated loss

Techniques: coverage matrix; seeded manifest

Break case: Restart tests do not prove disk/region-loss resilience.

Prerequisites: D001, K028

### D017: Leases and fencing (depth)

Pause relay beyond lease and prevent it from marking work reclaimed by another.

Mechanisms: paused old worker; monotonic claim token; resource enforcement

Techniques: stale lease trace; conditional mark

Break case: Expired workers may continue operating.

Prerequisites: D010, S014, K012

### D018: Identity conservation and reconciliation (depth)

Verify accepted IDs equal disjoint completed/quarantined/pending IDs.

Mechanisms: accepted set; disjoint outcomes; multiplicity

Techniques: set differences; grouped effect counts

Break case: 100 accepted and 100 rows can conceal both loss and duplicates.

Prerequisites: D002, S010

### D019: External effects and compensation (depth)

Design optional sender with explicit provider idempotency boundary.

Mechanisms: separate atomic domains; saga steps; irreversible actions

Techniques: provider trace; alert sender ADR

Break case: Local inbox does not protect arbitrary external effects.

Prerequisites: D004, D007

### D020: Consensus safety and progress (extension)

Explain log agreement under leader change and limits of timely progress.

Mechanisms: terms/elections; quorum intersections; timing assumptions

Techniques: election trace; paper model

Break case: Kafka data ISR is not automatically a generic Raft majority rule.

Prerequisites: D008, D010

### D021: Finite-state model checking (extension)

Enumerate one-event crash/retry model and turn failures into tests.

Mechanisms: abstraction; explored schedules; model/code gap

Techniques: bounded trace enumeration; minimal counterexample

Break case: Bounded checking is not universal implementation correctness.

Prerequisites: D001, D002, D004

### D022: Backups and disaster recovery (depth)

Restore business state and markers consistently within allowed replay policy.

Mechanisms: replication/backup; RPO/RTO; restore identity markers

Techniques: restore plan; replay worksheet

Break case: Restoring effects without markers can duplicate old effects.

Prerequisites: D005, S034

### D023: Reproducible benchmarking (depth)

Save workload, configs, resources and outcomes for repeated runs.

Mechanisms: workload/hardware; repetitions/warmup; accepted versus applied rate

Techniques: seeded profile; variance report

Break case: Laptop enqueue peaks are not durable production capacity.

Prerequisites: D011, D013, D015

### D024: Multi-region conflict policies (extension)

Distinguish mergeable counters from invariant-sensitive inventory updates.

Mechanisms: async replicas; concurrent writes; mergeable operations

Techniques: conflict table; coordination ADR

Break case: Every invariant cannot be repaired by arbitrary eventual merge.

Prerequisites: D006, D008, D019

## labs/algorithms

### A001: Specify and analyze a program (core)

Specify a device-event deduplicator, implement a quadratic reference, and derive its map-based alternative without assuming hash operations are always constant.

Mechanisms: input domain; preconditions and postconditions; loop invariants; worst-case and amortized costs; time versus auxiliary space

Techniques: derive a bound from operations; prove initialization, maintenance and termination; compare brute force and optimized code

Break case: Treating a fast sample run as a complexity proof

Prerequisites: none

### A002: Arrays and strings (core)

Compact invalid telemetry records in place while preserving order; port a parser between Python and Java and include Unicode and boundary-number cases.

Mechanisms: index bounds; in-place versus copying; Unicode code points versus bytes; stable compaction; integer overflow

Techniques: scan and accumulate; write-pointer compaction; explicit encoding boundary

Break case: Using character indexing as byte indexing or silently mutating caller data

Prerequisites: A001

### A003: Hash maps and sets for deduplication (core)

Detect repeated (tenant,event_id) pairs and conflicting payloads; report duplicates separately from conflicts using a brute-force oracle.

Mechanisms: identity versus equality; collision resolution; counting frequencies; mutable keys; memory boundedness

Techniques: frequency map; membership set; composite stable key

Break case: Equating event payload equality with event identity

Prerequisites: A001, A002

### A004: Two pointers and monotone movement (core)

Merge two sorted device histories with deterministic timestamp ties, then solve target pair sum and state which step requires sorted input.

Mechanisms: sorted input precondition; pair sums; merging sorted sequences; duplicate handling; proof of safe elimination

Techniques: left-right elimination; read-write scan; merge two sorted streams

Break case: Using two pointers without the monotonicity that justifies movement

Prerequisites: A001, A002

### A005: Sliding windows and prefix aggregates (core)

Compute rolling counts over sorted event timestamps and compare with exhaustive filtering; show a counterexample to a sum-based shrinking rule when negative values are allowed.

Mechanisms: fixed and variable windows; nonnegative-value preconditions; prefix sums; out-of-order event time; rolling state eviction

Techniques: incremental add and remove; prefix-difference queries; reference comparison

Break case: Applying a nonnegative sliding-window rule to arbitrary signed values

Prerequisites: A003, A004

### A006: Binary search and boundary search (core)

Find the first retained offset not below a requested offset and the final timestamp not above a cutoff; cross-check all small arrays with a linear oracle.

Mechanisms: sorted arrays; first true predicate; lower and upper bounds; off-by-one cases; midpoint overflow

Techniques: half-open search interval; monotone predicate search; trace every iteration

Break case: Searching a predicate that is not monotone

Prerequisites: A001, A004

### A007: Stacks and monotone stacks (depth)

Validate nested bracket expressions in a configuration fragment; compute the next larger latency sample using a monotone stack and brute-force verification.

Mechanisms: LIFO; balanced delimiters; next greater value; monotonic invariant; each element pushed and popped once

Techniques: stack-based parser; monotone decreasing stack; amortized counting

Break case: Calling every nested loop quadratic or mishandling equal-value ties

Prerequisites: A001, A002

### A008: Queues, deques and bounded work queues (core)

Build a bounded work-queue simulation that rejects or waits when full; compare list front deletion with deque and explain the operation count.

Mechanisms: FIFO; deque operations; capacity limits; backpressure; queue versus stack traversal

Techniques: bounded producer-consumer queue; deque instead of front deletion; explicit overload outcome

Break case: Claiming buffering solves sustained overload

Prerequisites: A001, A002

### A009: Heaps and top-K stream summaries (core)

Return the K devices with highest accumulated error count, with device_id tie breaking; compare map-plus-heap with full sort and define behavior for K=0 and K>device count.

Mechanisms: min-heap invariant; bounded top-K; tie breaking; frequency aggregation; approximate versus exact

Techniques: size-K min-heap; stable tuple keys; full-sort reference

Break case: Ignoring the O(d) frequency map when reporting space

Prerequisites: A001, A003

### A010: Sorting and interval merging (core)

Merge overlapping outage intervals under a declared touching-boundary rule; make equal-timestamp event presentation deterministic without assuming incidental arrival order.

Mechanisms: stable sorting; comparison key; comparison lower bounds; merge intervals; external sorting concept

Techniques: decorate-sort-undecorate; sort then scan; secondary key for determinism

Break case: Relying on sort stability to invent a missing business ordering

Prerequisites: A001, A004

### A011: Breadth-first graph traversal (depth)

Model service dependencies as a graph and find the minimum number of hops from ingestion to an affected sink; reconstruct the path and handle unreachable nodes.

Mechanisms: adjacency list; visited set; shortest unweighted paths; disconnected graphs; queue frontier

Techniques: BFS; parent reconstruction; enumerate reachable services

Break case: Applying unweighted BFS to unequal latency weights

Prerequisites: A003, A008

### A012: DFS, cycle detection and topological order (depth)

Validate a migration dependency graph, produce a legal order if acyclic, and return a concrete cycle when it is not.

Mechanisms: recursion versus explicit stack; gray and black states; directed cycle; topological prerequisites; disconnected traversal

Techniques: three-color DFS; Kahn indegree algorithm; cycle witness

Break case: Confusing an already-completed node with a back edge

Prerequisites: A003, A008, A011

### A013: Basic dynamic programming (depth)

Choose a minimum-cost sequence of batch sizes that exactly covers n items; define impossible states and compare tabulation against enumeration for small n.

Mechanisms: state meaning; recurrence; base cases; optimal substructure; memoization and tabulation

Techniques: derive recurrence from last decision; small exhaustive oracle; space compression with dependency order

Break case: Memorizing a recurrence without specifying the problem it solves

Prerequisites: A001, A002

### A014: Linked structures and recursion boundaries (depth)

Reverse a singly linked chain and detect a cycle; demonstrate why a recursive event-tree walker can fail on extreme depth.

Mechanisms: node identity; pointer updates; cycle detection; iterative reversal; call-stack depth

Techniques: save next before mutation; slow-fast pointers; iterative translation

Break case: Losing the rest of the chain or ignoring stack depth

Prerequisites: A001, A002

### A015: Timed coding and language transfer (core)

Attempt unseen deduplication and top-K variants without notes in each language; record code, elapsed time, failed cases and a fresh retest after at least one sleep.

Mechanisms: clarify constraints; reference solution; optimized solution; test cases; Java and Python implementation

Techniques: 25-minute unseen exercise; think aloud with invariants; mutation-based retest

Break case: Passing a memorized example while failing a small requirement change

Prerequisites: A001, A002, A003, A006, A009

## labs/operations

### O001: HTTP and REST contracts (core)

Specify POST ingestion and GET event queries: distinguish durable acceptance from completion, client retry from duplicate effect, and a rejection from an ambiguous timeout.

Mechanisms: method semantics; status codes; idempotence; timeouts; pagination; request identity

Techniques: write an endpoint contract; retry trace; cursor pagination

Break case: Turning transport timeout into proof of no business effect

Prerequisites: none

### O002: Input validation and API schema (core)

Write a schema for event_id, tenant_id, device_id, occurred_at and value; generate malformed, missing, oversized and contradictory cases with expected error responses.

Mechanisms: required and nullable fields; timestamp and numeric domains; payload limits; error schema; OpenAPI contract

Techniques: boundary validation; negative test matrix; explicit versioned contract

Break case: Using a schema file as evidence that the implementation enforces it

Prerequisites: O001

### O003: Authentication and JWT validation (core)

Design and test rejection cases for expired, wrong-audience, wrong-issuer and incorrectly signed tokens; avoid implementing cryptographic primitives.

Mechanisms: signature verification; algorithm allowlist; issuer and audience; expiry and clock skew; key rotation

Techniques: negative-token tests; trusted key selection; separate authentication and authorization

Break case: Treating base64 decoding or a signed token as sufficient authorization

Prerequisites: O001

### O004: Authorization and API threat analysis (core)

Create a tenant-role-object permission matrix; attempt cross-tenant reads, writes, arbitrary SQL fragments and excessive payload submission against a local lab.

Mechanisms: tenant isolation; object-level authorization; role permissions; rate limits; injection; SSRF and outbound access

Techniques: deny-by-default access matrix; cross-tenant negative tests; threat model trust boundaries

Break case: Securing login while leaving object identifiers unrestricted

Prerequisites: O002, O003

### O005: Secrets, TLS and redaction (core)

Identify credentials for app, Kafka and DB; remove them from examples and logs, document rotation and expiration, and create a local TLS failure-case checklist.

Mechanisms: secret injection; rotation; certificate verification; encrypted transport; log redaction; least exposure

Techniques: secrets as mounted inputs; credential inventory; verify peer identity

Break case: Calling a local Compose secret a complete production secret-management system

Prerequisites: O003, O004

### O006: Reproducible containers and resource limits (core)

Specify an app image build and record dependency versions, UID, health check, memory budget and writable paths; test an OOM scenario in an isolated lab when available.

Mechanisms: image pinning; multi-stage builds; non-root runtime; health probes; CPU and memory limits; persistent storage

Techniques: build once run immutably; inspect runtime UID; resource-bound experiment

Break case: Claiming reliability from a container being in the running state

Prerequisites: none

### O007: Network, DNS and Kafka advertised listeners (core)

Explain every connection from host and container to app, Kafka and PostgreSQL; diagnose a broker that accepts bootstrap connections but advertises an unreachable address.

Mechanisms: service DNS; host versus container localhost; ports; listener address discovery; connection timeout; TLS endpoints

Techniques: draw connection paths; test DNS TCP protocol separately; listener topology table

Break case: Fixing every network error by publishing all ports

Prerequisites: O006

### O008: Linux processes, I/O and shutdown (core)

Write a shutdown timeline for consumer stop, in-flight completion and connection close; identify how to inspect CPU, memory, open sockets, disk and process exit status.

Mechanisms: process versus thread; exit codes; SIGTERM and SIGKILL; file descriptors; disk space; permissions

Techniques: read process state; graceful-shutdown trace; bounded diagnostic commands

Break case: Assuming finally blocks always run when a process is killed

Prerequisites: O006

### O009: Git, review and regression isolation (core)

Create a toy regression in a disposable branch, isolate it with bisect, review the minimal patch and explain a revert versus history rewrite.

Mechanisms: working tree and index; diff review; small commits; merge conflicts; revert; bisect

Techniques: reproduce then bisect; explain patch intent; safe rollback

Break case: Using a destructive reset as the default shared rollback

Prerequisites: none

### O010: CI and dependency integrity (core)

Design a CI workflow that compiles Java, tests Python and SQL contracts, and runs integration checks without giving untrusted code deployment credentials.

Mechanisms: unit and integration gates; pinned action revisions; least-privilege tokens; untrusted pull requests; artifact reproducibility; dependency scan limits

Techniques: job separation; explicit permissions; lockfile and version reporting

Break case: Equating dependency scanning with proof that the application is secure

Prerequisites: O009, O006

### O011: Unit tests and useful test doubles (core)

Test event validation and anomaly scoring with boundary fixtures; use a fake clock and test doubles only at actual I/O boundaries.

Mechanisms: pure functions; fixtures; parameterization; exception paths; mock boundaries; determinism

Techniques: test observable behavior; fake clock; table-driven cases

Break case: Testing that mocked methods were called while never checking business output

Prerequisites: O002

### O012: Property-based and metamorphic tests (depth)

Generate duplicate and reordered event lists; verify that logical deduplicated effects are invariant where order is irrelevant, and compare rolling calculations with a slow oracle.

Mechanisms: generators; shrinking; invariants; reference oracle; permutation and duplicate relations

Techniques: randomized oracle comparison; metamorphic relation; persist failure seed

Break case: Generating random inputs without a valid correctness oracle

Prerequisites: O011, A001

### O013: Integration tests and transactional boundaries (core)

Run a transaction-rollback and duplicate-event test against a real PostgreSQL instance and a real Kafka-compatible lab when installed; record infrastructure versions and setup commands.

Mechanisms: real database; real broker; isolation; commit visibility; cleanup; version pinning

Techniques: Testcontainers or isolated equivalents; assert durable state; reproducible seed

Break case: Presenting mock success as proof of broker or database behavior

Prerequisites: O006, O011

### O014: API and event compatibility testing (core)

Test old producer/new consumer and new producer/old consumer for an added optional field; then introduce a unit change that parses successfully but must fail a semantic compatibility check.

Mechanisms: consumer contracts; schema evolution; unknown fields; defaults; breaking changes; producer-consumer skew

Techniques: old-new compatibility matrix; explicit semantic tests; schema version fixtures

Break case: Treating JSON validation as proof that business meaning is unchanged

Prerequisites: O002, O011

### O015: Fault injection and recovery evidence (core)

Inject termination before and after database commit and offset progress; compare accepted logical IDs with durable effects and log missing, repeated and deferred records.

Mechanisms: crash points; dependency outage; timeout ambiguity; disk full; poison records; reconciliation

Techniques: enumerate failure windows; repeat fixed-seed runs; accepted-to-effect reconciliation

Break case: Counting raw messages instead of checking one intended durable effect per logical ID

Prerequisites: O013, O008

### O016: Load tests and measurement validity (depth)

Sweep a declared offered arrival rate and record achieved rate, error rate, queue lag, p50/p95/p99 and completion latency; retain raw samples and avoid extrapolating laptop results to production.

Mechanisms: arrival versus completion rate; open versus closed workload; warmup; percentiles; errors; coordinated omission

Techniques: rate-controlled workload; record achieved arrival rate; confidence by repeated runs

Break case: Advertising throughput while excluding failed or still-pending requests

Prerequisites: O013, O018

### O017: Profiling and evidence-led optimization (depth)

Profile Python transformation and Java request processing with version-appropriate tools; optimize the largest measured hotspot and rerun correctness plus the same workload.

Mechanisms: CPU hotspots; allocation; I/O waits; flame graph concept; Amdahl limits; before-after comparison

Techniques: profile representative workload; one-variable change; correctness regression

Break case: Optimizing code aesthetics while the bottleneck is elsewhere

Prerequisites: O011, O016

### O018: Observability across asynchronous boundaries (core)

Specify correlated API-to-worker diagnostics with request_id/event_id, bounded metric labels, processing latency and consumer lag; explain which IDs belong in logs rather than metric labels.

Mechanisms: structured logs; metrics; traces; correlation IDs; cardinality; consumer lag; sensitive data

Techniques: propagate trace context; bounded-label metrics; end-to-end reconciliation view

Break case: Using one high-level health light as the whole system's correctness evidence

Prerequisites: O001

### O019: SLIs, SLOs and actionable alerts (depth)

Draft an illustrative EventPulse freshness SLO with numerator, denominator, exclusions and window; test an alert condition against synthetic normal and failure traces.

Mechanisms: availability definition; latency distribution; freshness; error budget; burn rate concept; alert ownership

Techniques: user-visible success ratio; explicit measurement window; actionable runbook

Break case: Selecting impressive percentages without a user contract or measurements

Prerequisites: O018, O016

### O020: Migrations, backup and restore (core)

Design an additive schema change, populate old rows, validate mixed-version operation, and write a backup/restore experiment with measured restore duration and reconciliation queries.

Mechanisms: expand-contract migrations; lock impact; backup versus replica; restore verification; RPO and RTO; rollback compatibility

Techniques: forward-compatible rollout; restore into isolated target; compare data invariants

Break case: Claiming backup readiness without ever restoring and checking it

Prerequisites: O013, O014

### O021: Service boundaries and resilience tradeoffs (depth)

Compare a single worker service with separately deployed processing services; derive worst-case retry amplification for three layers and choose bounded retries only at a justified boundary.

Mechanisms: monolith versus services; timeouts; bounded retries; jitter; circuit breaking; idempotency; retry budgets

Techniques: draw dependency critical path; budget total timeout; counterexample retry amplification

Break case: Using microservices or retries as unconditional reliability upgrades

Prerequisites: O001, O015

## labs/spark

### X001: Spark DataFrame execution (extension)

Reproduce a SQL device aggregate in a small DataFrame job and compare output with the PostgreSQL or Python reference; record the installed Spark/runtime versions before claiming execution.

Mechanisms: schema; lazy evaluation; transformations and actions; driver versus executors; batch baseline

Techniques: small batch reference; explain logical and physical plans; avoid collect for large results

Break case: Calling a local DataFrame demo production distributed experience

Prerequisites: O011

### X002: Structured Streaming execution and state (extension)

Create a stream aggregate for device counts and compare its settled result with an identical batch input; explain which output mode is supported by the query.

Mechanisms: unbounded table model; micro-batches; output modes; stateful aggregates; trigger behavior

Techniques: bounded input replay; batch-stream reconciliation; state-size observation

Break case: Assuming streaming means one continuously executing per-record function

Prerequisites: X001, O018

### X003: Event time, watermarks and late data (extension)

Replay sorted, disordered and deliberately late telemetry for a fixed window; record emitted results and explain accepted and excluded cases under the chosen query and version.

Mechanisms: event versus processing time; window bounds; watermark delay; out-of-order records; late-data policy

Techniques: deliberately delayed events; watermark progression trace; policy counterexamples

Break case: Treating watermark delay as universal maximum real-world lateness

Prerequisites: X002, A005

### X004: Checkpointing and sink repeatability (extension)

Restart a streaming query from a retained checkpoint and evaluate a PostgreSQL foreachBatch sink with explicit transactional deduplication; record whether each logical effect is repeated or preserved.

Mechanisms: checkpoint storage; query identity; restart semantics; foreachBatch retries; sink deduplication; query-change compatibility

Techniques: crash and restart; stable batch or event identity; sink reconciliation

Break case: Importing Kafka-to-Kafka transaction guarantees into an arbitrary database sink

Prerequisites: X002, O015

### X005: Streaming joins and deduplication (extension)

Join device events with a batch device dimension, then design a time-bounded stream-stream pairing experiment; show how missing or late counterparts affect inner and outer results.

Mechanisms: stream-static joins; stream-stream joins; join time constraints; state eviction; duplicate identity

Techniques: finite oracle; bounded time join; delayed counterpart test

Break case: Adding a watermark without checking whether the actual join supports state cleanup

Prerequisites: X003, X004

### X006: Partitions, shuffles and skew (extension)

Compare uniformly distributed and hot-device data, inspect partition sizes and shuffle work, and justify a change using observed execution behavior.

Mechanisms: input partitions; shuffle partitions; repartition versus coalesce; broadcast joins; hot keys; executor memory

Techniques: inspect physical plan; skewed synthetic dataset; compare partition distributions

Break case: Increasing partition count as an automatic cure for skew

Prerequisites: X001, X005, O016

## labs/cloud

### X007: AWS deployment architecture and responsibility (extension)

Draw a proposed AWS deployment using application compute, MSK and RDS; label every managed and application-owned responsibility. Keep status design-only unless independently deployed and tested.

Mechanisms: compute; managed services; availability zones; shared responsibility; environment separation; design versus deployment evidence

Techniques: architecture decision record; dependency inventory; assumption ledger

Break case: Presenting a cloud diagram as hands-on deployment experience

Prerequisites: O006, O021

### X008: Cloud identity and least privilege (extension)

Design separate ingress, relay and consumer roles with minimum MSK/database/secret access; identify a policy change that should be denied and explain its blast radius.

Mechanisms: workload identities; temporary credentials; role policies; resource scoping; human versus application access; auditability

Techniques: permission matrix; deny tests; short-lived credentials design

Break case: Using one administrator credential for all services

Prerequisites: X007, O004, O005

### X009: Cloud networking and encryption (extension)

Create an allowed connection matrix from ingress to broker and worker to database, specifying network controls and TLS trust. Explain how to keep data services private while clients reach the API.

Mechanisms: private subnets; routing; security groups; egress; DNS; TLS; at-rest keys

Techniques: connection matrix; packet-path reasoning; key-access boundaries

Break case: Equating encryption or private addressing with tenant isolation

Prerequisites: X007, X008, O007

### X010: Managed Kafka and PostgreSQL operations (extension)

Write an MSK/RDS operations design with version compatibility, connection limits, partition strategy, monitoring and maintenance windows; identify what still requires application-level testing.

Mechanisms: service limits; broker and partition sizing; database connection budgets; maintenance; monitoring; client compatibility

Techniques: capacity assumptions; managed-service responsibility matrix; connection-pool budget

Break case: Assuming managed services remove capacity planning and failure handling

Prerequisites: X007, X009, O018

### X011: Cloud rollout, recovery and disaster design (extension)

Design a rollback-compatible worker release and database restore drill, including region or zone failure assumptions, ownership and proposed RPO/RTO. Label all unexecuted drills as designed.

Mechanisms: rolling deployment; backward compatibility; multi-zone failure; restore; RPO and RTO; rollback

Techniques: failure-domain table; version-skew rehearsal; restore runbook design

Break case: Promising multi-zone availability from single-host container restarts

Prerequisites: X010, O020, O014

### X012: Cloud cost and teardown controls (extension)

Create a dated cost worksheet with symbolic broker-hours, compute-hours, retained bytes and transfer; verify current prices only when choosing real resources and include teardown verification.

Mechanisms: fixed and variable costs; storage retention; data transfer; idle resources; budget alerts; teardown

Techniques: parameterized cost model; resource inventory; explicit teardown checklist

Break case: Treating a budget notification as a hard spending limit

Prerequisites: X007, X010

## prep/interview

### R001: Eligibility, role scope and recruiter screening (core)

Write actual employment and break dates, current availability, Pune/hybrid constraints and a 90-second role fit summary; mark unresolved requisition-specific eligibility explicitly.

Mechanisms: returnship condition; employment chronology; experience; role location and work model; assessment format unknowns

Techniques: factual chronology; requirement-evidence map; scoped questions

Break case: Skipping eligibility while spending weeks on architecture

Prerequisites: none

### R002: Baseline diagnostic and independent evidence (core)

Complete the blind diagnostic in INTERVIEW_ROUNDS.md before reading its answer key; preserve attempts. Later recode from an empty directory and test a fresh variant that has not been read in the reference.

Mechanisms: blind attempt; time limits; hints log; source-free explanation; delayed retest; reference independence

Techniques: record before answer key; new assessor-authored variants; evidence ladder

Break case: Calling copied or previously viewed tasks unseen

Prerequisites: R001

### R003: Coding assessment performance (core)

Run the 60-minute coding mock, retaining source, compiler/test output and a spoken explanation; follow with a novel change in input size, ordering or memory constraints.

Mechanisms: problem restatement; constraint questions; algorithm choice; runnable code; debugging; time management

Techniques: timed unseen tasks; invariant explanation; counterexample tests

Break case: Spending the full session narrating architecture without solving the coding task

Prerequisites: R002, A015

### R004: Java and Python language deep dive (core)

Use the language mock to explain equality/hash, mutable state, generators and concurrency; independently write tiny programs to settle uncertain outputs.

Mechanisms: language semantics; collections; exceptions; concurrency; runtime version; transfer from production Python

Techniques: trace code; derive output; explain runtime boundaries

Break case: Giving universal GIL or Java implementation claims without version context

Prerequisites: R002

### R005: SQL assessment and data reasoning (core)

Run the SQL mock on a fresh schema with duplicates, missing effects, NULL values and timestamp ties; justify queries and one workload-driven index.

Mechanisms: joins and multiplicity; NULL; grouping; windows; indexes; execution plans; transactions

Techniques: write query before index; tiny adversarial fixtures; explain actual plan

Break case: Relying on a plausible-looking query without checking rows

Prerequisites: R002

### R006: Kafka and consistency deep dive (core)

Draw commit and crash traces, handle out-of-order work within a partition, and justify one durable database effect per logical ID under a bounded replay assumption.

Mechanisms: partition ordering; consumer groups; rebalance; offset progress; replay; idempotence; exactly-once boundaries

Techniques: failure timeline; contiguous completion frontier; explicit assumptions

Break case: Using manual commit as a complete exactly-once proof

Prerequisites: R002, O015

### R007: System design with quantitative assumptions (core)

Design telemetry integration with declared rate, payload and freshness target; calculate storage and catch-up bounds, then respond to a hot key, outage and identity-conflict change.

Mechanisms: requirements; traffic and size; latency; durability; partition keys; database schema; failure domains; cost

Techniques: capacity conservation; bottleneck model; invariant and failure matrix

Break case: Quoting invented production rates or hiding overload behind Kafka

Prerequisites: R006, O021, O019

### R008: Incident and debugging assessment (core)

Run an incident mock where API acceptance is normal but effects stop; request concrete logs, lag, DB waits and errors before choosing a containment action.

Mechanisms: hypothesis ranking; minimal evidence; scope; containment; recovery; root cause; prevention

Techniques: observe before mutate; reconcile data; timeline and runbook

Break case: Resetting offsets or restarting everything before preserving evidence

Prerequisites: R006, O018, O015

### R009: Project defense and independent reconstruction (core)

Explain the reference project, then scrap it and implement a minimal slice independently. Retain a diff and new test evidence; state which parts you wrote, which tools assisted and which guarantees remain untested.

Mechanisms: ownership; reference versus candidate work; measured results; reproducibility; tradeoffs; limits

Techniques: five-minute demo; empty-directory rebuild; unseen modification; artifact ledger

Break case: Claiming authorship or operational experience that the evidence does not support

Prerequisites: R002, R007, R008

### R010: Resume and STAR story defense (core)

Fill three STAR records using WMS/offline sync, IAM and a real defect or tradeoff; leave impact numbers blank unless supported and link allowable evidence without exposing employer secrets.

Mechanisms: WMS sync and conflicts; IAM permissions; Frappe/Python; Node/API and SQL; individual versus team contribution; results

Techniques: fact-evidence separation; STAR with actual boundaries; mechanism-first explanation

Break case: Replacing real backend experience with a fabricated Java/Kafka production history

Prerequisites: R001

### R011: Managerial and client communication (core)

Run client mock changes: 'never lose data', 'must deploy tomorrow', and 'add every optional technology'; negotiate precise outcomes, risks, phased scope and validation without inventing authority.

Mechanisms: requirements ambiguity; delivery tradeoffs; disagreement; incident updates; estimates; ownership and escalation

Techniques: clarify acceptance criteria; options with consequences; brief factual status update

Break case: Promising absolute guarantees to avoid a difficult scope conversation

Prerequisites: R010, R008

### R012: HR, returnship and truthful closing (core)

Prepare factual responses for actual dates, work location, notice period and role motivation; practice a private-boundary-respecting career-break explanation only if there was a break.

Mechanisms: availability; location; compensation discussion; career-break explanation if applicable; learning plan; questions for panel

Techniques: concise factual answers; verify chronology; role-specific closing questions

Break case: Adopting a fictitious career break or compensation figure to match a template

Prerequisites: R001, R010

