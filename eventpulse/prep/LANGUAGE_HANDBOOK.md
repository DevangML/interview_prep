# EventPulse language handbook

Status: reference preparation material; learner competency is **unassessed**. Java/Spring Boot and Python are the implementation choices for this learning project. Spring Boot, a particular JDK, particular Python version and PostgreSQL are not established employer mandates. Consult the job-source register and [implementation contract](../CONTRACT.md).

The companion [languages.json](languages.json) declares 48 Java/JVM/Spring and 40 Python competencies. Their tiers mean core fluency, deeper practical reasoning, and optional extension. They do not enumerate every possible computer-science question. Each entry includes a distinct exercise, prerequisites, interview probes and observable answer criteria. Topic estimates sum to 233 hours before adjustment for existing ability and overlapping work; this is planning input, not a mastery prediction. Your stated budget is four to six focused hours daily, with no imposed deadline.

Use the supplied implementation to inspect mechanisms, then scrap or hide it and recode independently from the behavior contract. Separate evidence for (a) reference implementation passing tests, (b) your ability to explain it, (c) independent reconstruction, and (d) transfer to a changed requirement. Reading or running generated code closes none of these learner gates.

## 1. Equality, hashing and actual complexity — J005/J006

An equality relation partitions possible keys into equivalence classes. A valid hash function is constant within each such class; it need not be distinct between classes. Therefore equal objects require equal hashes, but collisions between unequal objects are legitimate. [Object contract](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html)

For a thought experiment with n independently uniformly distributed keys and m buckets, a queried bucket contains approximately n/m keys on average. A chain lookup then has expected cost O(1+n/m), provided hashing and equality themselves have bounded cost. If all hashes collide, that model fails. HashMap API performance depends on hash dispersion, and iteration depends on capacity plus size. Internal tree-bin rules require checking the specified JDK source. [HashMap](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/HashMap.html)

A mutable device key inserted with hash h₀ and later changed to h₁ may be sought in a different bucket. Make key identity immutable.

For geometric array expansion, cumulative copied elements through capacity n are bounded by 1+2+4+…+n < 2n. This establishes an amortized linear total under that model; it does not make every insertion constant-time.

**Wrong answer:** “HashMap is always O(1); unequal keys have different hashes.”

**Follow-up:** How does a deliberately expensive equals change complexity? Why must production deduplication outlive an evicted cache?

**Gate:** From blank code, build a stable composite key, supply collision fixtures, and explain average, amortized and worst-case claims separately.

## 2. Java visibility versus atomicity — J017–J021

A volatile publication flag can supply a happens-before edge:

```java
// Shared fields: int payload = 0; volatile boolean ready = false;
// Writer:
payload = 42;
ready = true;
// Reader:
if (ready) {
    use(payload);
}
```

Assume the reader's true value is supplied by that publication. Program order places the payload write before the flag write; volatile synchronization connects to the flag read; reader program order connects to the payload read. Transitivity gives the required visibility. Sleep is not a synchronization edge. [JLS threads and locks](https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html)

A volatile counter increment remains a read, compute and write sequence. Two threads can read 0 and each write 1. A single atomic increment can repair that counter, while an invariant spanning two variables may need a lock or another coordinated design. [Atomic package](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/atomic/package-summary.html)

**Wrong answer:** “Volatile makes a block thread-safe.”

**Follow-up:** Where is the operation's linearization point? Could construction leak this before final fields are initialized?

**Gate:** Draw the happens-before graph, give a lost-update execution, and repair both a single counter and a two-variable invariant. A stress run without failure is supporting evidence, not a proof of all schedules.

## 3. Executors, queues and capacity — J023/J024/J025

Model arrival rate as λ events/second, sustainable completion rate as μ, maximum queued items B, and average retained bytes per queued item s. Queue payload memory is approximately Bs, before framework/object overhead. If λ>μ for duration t and admission remains open, backlog grows approximately (λ−μ)t. A bounded queue turns unconstrained memory growth into an explicit admission decision.

With core=4 and an unbounded work queue, raising maximumPoolSize does not necessarily create the anticipated additional workers: ThreadPoolExecutor queues once core workers are occupied before it considers growth beyond core. Select queue and rejection behavior together. [ThreadPoolExecutor](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)

A task running in a single-worker pool and waiting for another task in that same pool can prevent progress. Increasing thread count changes a threshold without removing the dependency pattern.

**Wrong answer:** “More threads always improve throughput.”

**Follow-up:** What happens to accepted work on shutdown? Does caller timeout stop Kafka publication?

**Gate:** Predict overload behavior, demonstrate bounded admission, and distinguish saturation, lock deadlock and pool starvation using observable thread states.

## 4. Futures and side effects — J024

Suppose publish returns CompletableFuture<Ack>. thenApply can transform Ack into a response. If the callback itself returns another future, thenCompose expresses the flattened asynchronous dependency. Preserve exceptional completion. [CompletableFuture](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CompletableFuture.html)

For a request with total deadline D, time already spent e leaves at most D−e for later stages. Giving every stage its own full D can violate the original deadline. More seriously, a timed-out caller may not know whether an external operation has already committed.

**Worked trace:** Send event E; broker stores E; acknowledgment is delayed; request expires. Repeating E with a new identity can create a second logical effect. Retrying with a stable identity enables deduplication under the documented storage assumptions.

**Wrong answer:** “Timeout means nothing happened.”

**Follow-up:** Which operations are safe to retry? Who observes callback exceptions?

**Gate:** Write a composition that exposes delivery failure and explain every ambiguous-effect boundary. No successful future may be invented to cover an unobserved operation.

## 5. Dependency injection and singleton state — J031/J032

An ingestion service depending on Publisher and Repository should expose both dependencies through its constructor. A test can substitute either collaborator without changing service logic. This makes ownership and required dependencies reviewable. [Spring dependency injection](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)

Spring singleton scope means one bean instance per bean definition in the relevant container. It does not supply synchronization for mutable request state. [Bean scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)

```java
// Unsafe singleton design:
private String currentDevice;
void ingest(Event e) {
    currentDevice = e.deviceId();
    // Another request can change this field before it is used.
}
```

The object-level invariant is that request A uses A's device. Keeping the value in a local variable makes each invocation own its reference; mutable referred objects still need suitable ownership.

**Wrong answer:** “Singleton means Spring makes it thread-safe.”

**Follow-up:** Is an injected prototype automatically recreated for every singleton method call? Who closes a shared producer?

**Gate:** Remove hidden request state, inject a test collaborator, and explain bean lifetime independently from synchronization.

## 6. Transactions, interception and the outbox — J037/J038/J043

Spring's usual declarative transaction model intercepts calls through a proxy. A same-object self-call can bypass this boundary. Default rollback behavior also depends on the exception class and selected configuration; checked exceptions require deliberate policy. [Transactional annotations](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)

The required local invariant is:

```text
accept(E) ⇒ committed ingress(E) AND committed outbox(E)
```

Place both inserts in one PostgreSQL transaction. Test through the actual managed bean, not an object manually created outside the container. Fault between the inserts and inspect the database.

Publishing from the relay and marking a row published are two distinct system effects. Broker acceptance followed by a relay crash before SQL commit permits duplicate publication. Kafka producer acknowledgment identifies a Kafka boundary; it does not commit PostgreSQL. [KafkaProducer](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html)

REQUIRES_NEW can use a separate physical transaction and consume extra connections; NESTED commonly relies on savepoints in the same physical transaction. [Propagation](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/tx-propagation.html)

**Wrong answer:** “@Transactional gives exactly-once delivery across Kafka and SQL.”

**Follow-up:** Which failures roll back which rows? How long does the lab relay hold row locks? Why can that constrain throughput?

**Gate:** Produce a crash table for every boundary and demonstrate rollback plus duplicate-safe recovery. State the guarantee's assumptions.

## 7. Python binding, defaults and closures — P001–P004

```python
a = [1]
b = a
b.append(2)       # a and b refer to the same changed list
b = [9]          # only b is rebound
```

Names identify objects; assignment need not copy them. A tuple may still refer to mutable objects. [Python data model](https://docs.python.org/3/reference/datamodel.html)

```python
def collect(item, seen=None):
    if seen is None:
        seen = []
    seen.append(item)
    return seen

handlers = [lambda i=i: i for i in range(3)]
```

Default expressions are evaluated when the function is defined. A default [] can consequently be shared across calls. A closure referring to a changing variable looks it up when called; the explicit lambda default above records each current value. [Function defaults and control flow](https://docs.python.org/3/tutorial/controlflow.html)

**Wrong answer:** “A closure always captures the value at creation.”

**Follow-up:** How would you distinguish absent metadata from explicit None? Why can the same list object be reachable through several containers?

**Gate:** Predict outputs before execution, draw aliases, and repair independently with a sentinel or explicit ownership when None is meaningful.

## 8. Generators and memory bounds — P008–P010

A generator defers execution and suspends local state between yields. It is a stateful iterator, not a reusable independent collection. [Data model](https://docs.python.org/3/reference/datamodel.html)

```python
def valid_events(lines):
    for line in lines:
        event = parse_and_validate(line)
        if event is not None:
            yield event
```

Under assumptions that one line and one parsed event are bounded by s bytes and there is no accumulating state, this transformation needs O(s) auxiliary memory with respect to event count N. list(valid_events(lines)) changes the result-retention requirement to O(Ns). A downstream unbounded queue similarly defeats the streaming bound.

Resource ownership matters during early termination. Context managers supply an explicit lifetime boundary; exception suppression must be intentional. [contextlib](https://docs.python.org/3/library/contextlib.html)

**Wrong answer:** “Generators always use constant memory.”

**Follow-up:** Can a suspended generator retain a large local list? Who closes a file if a consumer stops after one item?

**Gate:** Measure peak memory for increasing N, explain native-memory measurement limits, and demonstrate cleanup on early failure.

## 9. GIL, CPU work and parallel speedup — P016–P019

For GIL-enabled CPython, pure-Python CPU threads generally do not execute bytecode simultaneously. Threads can overlap I/O waits, while some native work releases the GIL. Optional free-threaded builds change the premise and require explicit build and extension compatibility checks. [Threading](https://docs.python.org/3/library/threading.html), [free-threaded Python](https://docs.python.org/3/howto/free-threading-python.html)

Amdahl's idealized bound for parallel fraction p and k workers is:

```text
speedup ≤ 1 / ((1−p) + p/k)
```

For p=.8 and k=4, the bound is 2.5 before IPC, serialization and scheduling overhead. If a task takes 1 ms while transfer/setup costs 2 ms, process parallelism may lose.

Use serializable pure worker inputs. Keep Kafka and SQL client ownership out of process payloads; creation and start-method behavior need explicit design. [multiprocessing](https://docs.python.org/3/library/multiprocessing.html)

EventPulse's core threshold rule is intentionally simple; it does not demonstrate CPU-bound anomaly analysis. Use a separately benchmarked extension for that competence.

**Wrong answer:** “Python is single-threaded, so async is CPU parallelism.”

**Follow-up:** What fraction is actually CPU work? What changes when the imported native extension releases the GIL?

**Gate:** Compare one/thread/process variants with fixed inputs, correctness checks, runtime metadata and reported overhead. Defend a counterexample to your preferred approach.

## 10. Asyncio, cancellation and ownership — P020/P021

asyncio progresses cooperatively. A task that executes a long CPU loop without awaiting blocks other work on that event loop. Cancellation is a request delivered at suitable points; cleanup should preserve it after releasing resources. TaskGroup supplies structured task lifetime, but external effects still require their own consistency rules. [Coroutines and tasks](https://docs.python.org/3/library/asyncio-task.html)

```python
async def handle(record):
    try:
        return await durable_write(record)
    finally:
        release_owned_resource()
```

The await boundary does not establish whether a remote database write committed before cancellation was observed. A locally canceled call can have a committed remote effect.

**Worked question:** Two tasks share one mutable pending-offset dictionary. What invariant can cancellation break between the business write and the dictionary update? An owner loop receiving explicit result messages reduces the shared-state surface; it does not replace the persistence transaction.

**Wrong answer:** “An async function is automatically nonblocking and atomic.”

**Follow-up:** Why not swallow CancelledError? How would you test cancellation after a durable write?

**Gate:** Demonstrate loop lag from a blocking task, bounded concurrency, and cleanup on failure. Identify the side-effect ambiguity.

## 11. Kafka offset progress as an invariant — P022/P029

Kafka commits identify the next source position. The core reference processes sequentially and advances after durable handling. An extension with parallel workers needs a stronger completion tracker. Consult the selected client's commit and rebalance APIs rather than transferring Java client rules to Python. [Confluent Python API](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/html/index.html)

Let the dispatched records for one partition be ordered r₁,…,rₙ. Define Dᵢ=true only after rᵢ is durably handled. A safe frontier advances through the longest prefix for which every Dᵢ is true. If r₁₁ is incomplete but r₁₂ completes, committing the next position after r₁₂ can skip r₁₁ after a crash.

Use the ordered dispatched sequence, not an assumption that every integer offset has a visible record: filtering and transactional visibility can produce gaps. Track partition ownership/generation so stale worker results after revocation cannot advance a new owner's progress.

**Wrong answer:** “Commit max(completed offsets)+1.”

**Follow-up:** Which progress may be committed during rebalance? What if durable quarantine succeeds but DLQ broker delivery has not yet happened?

**Gate:** Implement and test completion permutations, skipped source offsets, revocation and shutdown without advancing across unfinished work.

## 12. Database client ownership and durable idempotency — P030

Psycopg connections can support thread access, but operations on a shared connection are serialized and share transaction state. Connections must not be reused across forked processes. Thread safety is consequently distinct from independent concurrent transactions. [Psycopg concurrent operations](https://www.psycopg.org/psycopg3/docs/advanced/async.html)

The design invariant is that the durable inbox marker and corresponding business effects commit together:

```text
BEGIN
INSERT inbox(event_id, payload) ON CONFLICT DO NOTHING ...
if inserted:
    INSERT telemetry ...
    INSERT alert if rule is satisfied ...
else:
    verify payload matches previously accepted identity
COMMIT
advance source progress
```

A crash before commit produces no committed effect. A crash after commit but before source progress can replay, yet the unique marker prevents a second effect if markers remain available and identity remains stable. Different payload for the same ID is a conflict requiring durable handling, not silent success. Bound the claim to these tables and rule version; an arbitrary external email is not protected by this transaction.

**Wrong answer:** “A unique constraint anywhere in the system makes every side effect exactly once.”

**Follow-up:** What if markers expire before replay? Can you atomically record the inbox and send an external email with this transaction?

**Gate:** Crash at each transaction/offset boundary, inspect durable rows, and explain safety separately from eventual completion.

## Independent reconstruction and oral defense

For each core competency, preserve:

1. Your prediction and assumptions before running code.
2. An independent implementation from a blank file.
3. A test oracle based on external behavior or a separate reference model.
4. A counterexample to an overbroad claim.
5. A two-minute explanation, then an unfamiliar follow-up.
6. A later reconstruction after a gap, with changed input or requirement.

Do not substitute “all tests pass” for explaining the invariant. Do not substitute a fluent explanation for successful independent coding. Depth and extension tasks follow failed core diagnoses and the actual employer scope. The complete project is a reference artifact; your independently demonstrated command of its mechanisms is a separate achievement.

