# LANGGRAPH — DEEP DIVE

Sourced from official docs at `docs.langchain.com/oss/python/langgraph/*` (all URLs fetched and verified
2026-07-27). API behaviour verified by execution against **langgraph 1.2.9 / langchain-core 1.5.1**.

> **Doc URL warning for the interview:** LangChain moved its docs. `langchain-ai.github.io/langgraph` still
> resolves but the canonical home is now **`docs.langchain.com/oss/python/langgraph/`**. If you cite a URL,
> cite that one.

---

## 0. The 30-second definition (lead with this)

> "LangGraph is a low-level orchestration framework for stateful, multi-step LLM applications. You model your
> application as a graph: a shared state object, nodes that are just Python functions returning state updates,
> and edges — including conditional edges and cycles — that decide what runs next. The value isn't the graph
> notation; it's what comes with it: persistence via checkpointers, human-in-the-loop, streaming, time-travel
> debugging, and crash recovery. LangChain's own framing is that it's 'an orchestration framework with agent
> abstractions built on top,' not an agent abstraction itself."

That last clause is a direct paraphrase of Harrison Chase's framework post. It lands well.

---

## 1. Execution model — Pregel / super-steps

**This is the mental model everything else falls out of. Learn this and the trap questions answer themselves.**

LangGraph's runtime is modelled on **Google's Pregel** (bulk synchronous parallel message passing).

- Execution proceeds in **super-steps** — discrete ticks.
- Nodes with multiple outgoing edges make all destinations run **in parallel within one super-step**.
- Sequential nodes occupy **separate** super-steps.
- At the end of a super-step, nodes with no incoming messages vote to halt.
- The graph terminates when **all nodes are inactive and no messages are in transit**.
- **A checkpoint is written per super-step**, not per node.

Consequences you should be able to derive live:
- Reducer conflicts are scoped **per super-step** → EXP 1 vs EXP 2 in `BREAKABLE_EXPERIMENTS.md`.
- `recursion_limit` counts **super-steps**, not node invocations.
- Time-travel granularity is the super-step.

---

## 2. StateGraph, state schema

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    messages: Annotated[list, add_messages]
    counter: int

builder = StateGraph(State)
builder.add_node("my_node", my_node)
builder.add_edge(START, "my_node")
builder.add_edge("my_node", END)
graph = builder.compile()          # you MUST compile before use
```

**Schema options**, with the tradeoff the interviewer wants:

| Type | When | Cost |
|---|---|---|
| `TypedDict` | default, recommended | no runtime validation |
| `dataclass` | you want default values | no runtime validation |
| Pydantic `BaseModel` | you want recursive runtime validation | explicitly "less performant than a TypedDict or dataclass" |

**Multiple schemas** — input/output/internal separation, so nodes can pass private data that never
appears in the public contract:

```python
builder = StateGraph(OverallState, input_schema=InputState, output_schema=OutputState)
```

---

## 3. REDUCERS 🔴 CONFIRMED INTERVIEW TOPIC

### Definition
A reducer is **a binary function taking two positional args**: the current value (left) and the node's
update (right). It returns the merged value.

### The default
No reducer → the channel is `LastValue` → the update **overwrites**.

### The trap, stated precisely

> Two parallel branches writing the same key with **no** reducer raise
> **`InvalidUpdateError`** — verbatim: *"At key 'result': Can receive only one value per step.
> Use an Annotated key to handle multiple values."*
> Error code `INVALID_CONCURRENT_GRAPH_UPDATE`.

**It is not a race. It is not last-write-wins. It raises.** (Verified — EXP 1.)

But note the boundary: **sequential** nodes with no reducer overwrite **silently, with no error** (EXP 2).
Volunteering that distinction is the strongest single move available in this topic.

### Attaching one

```python
import operator
from typing import Annotated

class State(TypedDict):
    tags:  Annotated[list[str], operator.add]     # concatenate
    seen:  Annotated[set, lambda a, b: a | b]     # union - order-independent
    score: Annotated[int, max]                    # any binary fn works
```

`Annotated` is the *only* attachment point — it is how you tell LangGraph "merge this field, don't replace it."

### `add_messages` — the one you must know by name

```python
from langgraph.graph.message import add_messages
messages: Annotated[list[AnyMessage], add_messages]
```

Not a plain append. It:
- appends new messages,
- **deduplicates and updates by message `id`** — same id ⇒ replaces rather than duplicates,
- deserializes dicts into LangChain `Message` objects,
- supports deletion via `RemoveMessage`.

`MessagesState` is the prebuilt convenience class with exactly this one key.

### Reducer design rule (say this unprompted)
> "A reducer must be safe to apply in any order, because I don't control ordering within a super-step.
> Concatenation is fine if I don't care about order; if I do, I tag entries and sort downstream."

---

## 4. Nodes

A node is a Python function (sync or async) accepting up to three args:

```python
def my_node(state: State, config: RunnableConfig, runtime: Runtime[Context]):
    return {"counter": state["counter"] + 1}   # a PARTIAL update, not full state
```

- `state` — current graph state
- `config` — `RunnableConfig`, carries `thread_id`, tracing metadata
- `runtime` — `Runtime` object exposing `runtime.context`, `runtime.store`, execution metadata

**Return a partial dict.** Keys you omit are untouched.

**Idempotency requirement (official):** on resume after checkpointing, *"the affected node runs again from
the start of its function."* Docs explicitly tell you to use *"idempotency keys, upserts, or read-before-write
checks."* This is the root cause of the EXP 6 double-side-effect.

**Node caching:**
```python
builder.add_node("expensive", fn, cache_policy=CachePolicy(ttl=3))
```

---

## 5. Edges

```python
graph.add_edge("a", "b")                                       # normal
graph.add_conditional_edges("a", router_fn, {True:"b", False:"c"})   # dynamic
```

**Official warning, and a real trap (EXP 9):**
> *"Do not mix normal edges and dynamic routing from the same node, because both paths can execute."*

Conditional edges **add to** normal edges — they don't replace them. A leftover `add_edge` next to a router
silently runs the branch you thought you routed away from.

**`START` / `END`** are the special entry and terminal sentinels.

### Cycles
Cycles are the headline feature vs a DAG framework — they're what makes an agent loop expressible.
A cycle needs a **conditional edge routing to `END`** as its exit. Without one you hit
`GraphRecursionError` (EXP 5).

> ⚠️ Version precision: langchain-core's `DEFAULT_RECURSION_LIMIT` is **25**; LangGraph 1.x overrides it with
> its own default of **10007** (`langgraph/_internal/_config.py`, env `LANGGRAPH_DEFAULT_RECURSION_LIMIT`).
> Verified in source. Safe interview phrasing: "classically 25 from langchain-core, but LangGraph sets its own
> and raised it substantially in 1.x — I'd check for my version."

---

## 6. `Send` — runtime-sized fan-out (map-reduce)

```python
from langgraph.types import Send

def continue_to_jokes(state: OverallState):
    return [Send("generate_joke", {"subject": s}) for s in state["subjects"]]
```

- Returned from a **conditional edge**.
- Each `Send` carries its **own private state** to the node — *not* the shared graph state.
- All land in the same super-step ⇒ **the collecting key must have a reducer**.

Use when the number of parallel branches is unknown until runtime. (EXP 10.)

---

## 7. `Command` — update state *and* route in one return

```python
from langgraph.types import Command

def my_node(state: State) -> Command[Literal["other_node"]]:
    return Command(update={"foo": "bar"}, goto="other_node")
```

Fields: `update`, `goto`, `graph`, `resume`, `PARENT`.

- **You must add the return type annotation** listing possible destinations — that's how the graph builds edges.
- `graph=Command.PARENT` navigates to a node in the **parent** graph → this is the **handoff primitive**
  for multi-agent systems.
- `Command(resume=...)` is *only* for resuming an interrupt. For a normal new turn on an existing thread,
  pass a plain dict.

**When to use `Command` vs a conditional edge:** `Command` when the routing decision and the state update
come from the same computation (e.g. an LLM decided both). Conditional edge when routing is a pure function
of already-committed state. Saying this distinction is a strong signal.

---

## 8. PERSISTENCE — Checkpointer vs Store 🔴 CONFIRMED INTERVIEW QUESTION

### Checkpointer — short-term, within-thread

A **checkpoint** is *"a snapshot of the graph state saved at each super-step."*
A **thread** is *"the accumulated state of a sequence of runs,"* keyed by `thread_id`.

```python
from langgraph.checkpoint.memory import InMemorySaver
graph = builder.compile(checkpointer=InMemorySaver())
graph.invoke(inp, {"configurable": {"thread_id": "1"}})
```

Backends:

| Package | Class |
|---|---|
| `langgraph-checkpoint` (bundled) | `BaseCheckpointSaver`, `InMemorySaver` |
| `langgraph-checkpoint-sqlite` | `SqliteSaver` / `AsyncSqliteSaver` |
| `langgraph-checkpoint-postgres` | `PostgresSaver` / `AsyncPostgresSaver` |
| `langchain-azure-cosmosdb` | `CosmosDBSaver` |

Enables: **memory, human-in-the-loop, time travel, fault tolerance.** All four are the same underlying feature.
Without it, `thread_id` is silently ignored (EXP 3).

**Durability modes** — the `durability=` parameter, a great detail to drop:

| Mode | Behaviour | Tradeoff |
|---|---|---|
| `"exit"` | persist only when execution exits | fastest; no mid-run recovery |
| `"async"` | persist asynchronously during next step | good balance; small crash window |
| `"sync"` | persist before next step starts | maximum durability; slowest |

### Store — long-term, cross-thread

*"Cross-thread long-term memory, complementing per-thread checkpointer persistence."*

```python
from langgraph.store.memory import InMemoryStore
store = InMemoryStore()
graph = builder.compile(checkpointer=InMemorySaver(), store=store)   # BOTH, normally
```

API:
```python
store.put(namespace, key, value, index=None)
store.get(namespace, key)                       # O(1) exact lookup
store.search(namespace_prefix, query=None, filter=None, limit=10, offset=0)
store.delete(namespace, key)
store.list_namespaces(prefix=None, suffix=None, max_depth=None)
# async variants: aput / aget / asearch / adelete / alist_namespaces
```

- Namespaces are **tuples of strings**: `("user_123", "memories")`.
- `search` does **prefix matching** — `search(("alice",))` also returns `("alice","memories")`.
- Implementations: `BaseStore`, `InMemoryStore` (dev), `PostgresStore`, `RedisStore`, `MongoDBStore`.

**Semantic search over memories:**
```python
from langchain.embeddings import init_embeddings
store = InMemoryStore(index={
    "embed": init_embeddings("openai:text-embedding-3-small"),
    "dims": 1536,
    "fields": ["food_preference", "$"],
})
store.search(("user_123","memories"), query="What does the user like to eat?", limit=3)
```

Accessed inside a node via `runtime.store`:
```python
async def call_model(state: MessagesState, runtime: Runtime[Context]):
    ns = (runtime.context.user_id, "memories")
    memories = await runtime.store.asearch(ns, query=state["messages"][-1].content, limit=3)
```

### The comparison table (official)

| Aspect | Checkpointer | Store |
|---|---|---|
| Scope | Single thread | Cross-thread |
| Data | Full graph state | Arbitrary key-value |
| Persistence | Thread-scoped | Global / user-scoped |
| Use case | Conversation history | User preferences, knowledge |

**Spoken answer:** see the memorized one-liner in `BREAKABLE_EXPERIMENTS.md` EXP 4.

---

## 9. Time travel

```python
snap = graph.get_state(config)                    # latest StateSnapshot
hist = list(graph.get_state_history(config))      # all, NEWEST FIRST
```

`StateSnapshot` fields: **`values`, `next`, `config`, `metadata`, `created_at`, `parent_config`, `tasks`.**

- `next` = tuple of nodes about to execute → **this is how you choose a rewind point**, not by index.
- `config` carries the `checkpoint_id` needed to resume.

**Replay** — re-run from a checkpoint, input `None`:
```python
before = next(s for s in hist if s.next == ("write_joke",))
graph.invoke(None, before.config)
```

**Fork** — branch with a modified state:
```python
fork_cfg = graph.update_state(before.config, values={"topic":"chickens"}, as_node="generate_topic")
graph.invoke(None, fork_cfg)
```

Behaviours to know:
- Replay **re-executes** downstream nodes — LLM calls and API requests **fire again** (they aren't cached).
- `update_state` **creates a new checkpoint**, never mutates the old one; values pass **through reducers**.
- Forking creates a branch on the **same thread** — the thread head moves, but old checkpoints remain
  reachable by `checkpoint_id` (verified, EXP 8).
- Interrupts **re-trigger** during time travel.
- A subgraph without its own checkpointer is checkpointed as a **single step**.

---

## 10. Human-in-the-loop / interrupts

### Dynamic — `interrupt()`, the one you should use
```python
from langgraph.types import interrupt, Command

def approval_node(state: State):
    approved = interrupt("Do you approve this action?")   # pauses; payload surfaces to caller
    return {"approved": approved}

# resume: the value passed becomes interrupt()'s return value
graph.invoke(Command(resume=True), config)
```

**Requires a checkpointer to resume** — `RuntimeError: Cannot use Command(resume=...) without checkpointer`
(EXP 7). Interestingly it *pauses* fine without one; only resume fails.

**🔴 The gotcha to volunteer:** *"the runtime restarts the entire node from the beginning — it does not resume
from the exact line where `interrupt` was called."* Code before the interrupt runs twice (EXP 6).
→ Put side effects **after** the interrupt, or make them idempotent.

**Parallel interrupts** — map interrupt id → resume value:
```python
resume_map = {i.id: f"answer for {i.value}" for i in stream.interrupts}
graph.invoke(Command(resume=resume_map), config)
```
`Interrupt` has fields `value` and `id` (verified).

### Static — `interrupt_before` / `interrupt_after`
```python
graph = builder.compile(interrupt_before=["node_a"], interrupt_after=["node_b"],
                        checkpointer=checkpointer)
```
Docs position these as **debugging breakpoints, explicitly not recommended for production HITL**. Knowing
that distinction is a differentiator — most tutorials teach the static form.

### The four canonical HITL patterns
approve/reject · edit state · review tool calls · provide missing input.

---

## 11. Streaming

`stream()` / `astream()`, via `stream_mode`:

| Mode | Emits |
|---|---|
| `values` | full state after each step |
| `updates` | only the state delta per node |
| `messages` | 2-tuples of `(LLM token, metadata)` — **token-by-token** |
| `custom` | your own data via `get_stream_writer()` |
| `checkpoints` | checkpoint events (needs checkpointer) |
| `tasks` | task start/finish with results |
| `debug` | checkpoints + tasks combined |

Combine them: `stream_mode=["updates","custom"]`.
Subgraphs: `subgraphs=True`; the `ns` field identifies the namespace (`()` = root).

**The interview point:** `messages` is for streaming *LLM tokens to the end user*; `updates` is for streaming
*progress* ("searching…", "summarizing…"). They answer different product questions. Newer API surfaces use
`stream_events(..., version="v3")` with a unified `StreamPart` shape (`type`, `ns`, `data`).

---

## 12. Multi-agent patterns

**The primitive:** a handoff is `Command(goto="other_agent", update={...}, graph=Command.PARENT)`.
Each agent is typically a compiled graph used as a node in a parent graph.

| Pattern | Shape | Use when | Cost |
|---|---|---|---|
| **Single agent** | one loop, many tools | tools < ~10, one domain | cheapest |
| **Supervisor** | central LLM routes to specialists | clear task taxonomy; you want one throat to choke | +1 hop per delegation |
| **Supervisor-as-tools** (subagents) | specialists exposed as *tools* to a coordinator | multi-domain, want parallelism | ~4 calls simple / ~5 calls, ~9K tokens multi-domain |
| **Network** | any agent → any agent | genuinely non-hierarchical | hardest to debug, can loop |
| **Hierarchical** | supervisor of supervisors | many agents, needs grouping | most overhead |
| **Handoffs** | agents transfer control via state | sequential multi-hop, direct user interaction | strong on repeats (saves 40–50% calls via state), weak on sequential multi-domain (7+ calls, 14K+ tokens) |
| **Custom workflow** | you wire the graph | deterministic + agentic mixed | most control |

**The senior framing (say this):**
> "The architecture choice is really a **context-engineering** choice — it's deciding what each agent is allowed
> to see. Supervisor-as-tools keeps each specialist's context clean because results come back as tool
> observations. Handoffs let context accumulate, which is cheaper for repeat requests but degrades on long
> multi-domain chains. I'd start with a single agent and only split when a specific context or tool-count
> problem forces it."

---

## 13. When LangGraph is the WRONG choice 🎯 seniority signal

Volunteer this. It's the fastest way to look like someone who has shipped rather than studied.

**Don't reach for LangGraph when:**

1. **It's a single LLM call.** A prompt template plus an SDK call. Adding a graph adds a dependency and a
   mental model for zero benefit.
2. **It's a fixed linear pipeline with no branching, no retries, no human step.** That's a Python function.
   Harrison Chase's own test: *if building it yourself costs less than learning the abstraction, don't
   use the framework.*
3. **You need hard real-time / very low latency.** Checkpointing and the super-step loop add overhead.
   `durability="exit"` mitigates it but doesn't eliminate it.
4. **The team doesn't know it and the problem is simple.** The graph model is a real onboarding cost.
5. **Pure retrieval/RAG over documents with no control flow.** LlamaIndex's ingestion, indexing and
   retrieval abstractions are more direct. (Note: LangGraph often still wraps it once the *agent* appears.)
6. **You're already on a platform-native orchestrator** (Bedrock Agents, Vertex Agent Builder) and don't
   need portability.

**The honest caveat that makes it credible:**
> "The flip side — the moment I need *any one of* persistence across restarts, a human approval step,
> streaming partial progress, retries with recovery, or the ability to replay a bad run, I'd rather adopt
> LangGraph than hand-roll those five things. They're individually easy and collectively a project."

---

## 14. Functional API (know it exists — one line is enough)

`@entrypoint` and `@task` let you get checkpointing, HITL and streaming with ordinary Python control flow
(`if`, `for`, `while`) instead of declaring a graph.

> "If my control flow is naturally imperative I'd use the functional API and still get persistence and
> human-in-the-loop; I reach for `StateGraph` when I actually want the graph to be inspectable and visualizable."

Docs: `docs.langchain.com/oss/python/langgraph/functional-api`

---

## Unfairly good resources

Verified reachable 2026-07-27. Consumption times assume active reading, not skimming.

| Resource | URL | Time | Why |
|---|---|---|---|
| **Graph API (the core page)** | `https://docs.langchain.com/oss/python/langgraph/graph-api` | 45 min | Reducers, Send, Command, super-steps. The reducer trap is stated here explicitly. **Read this first.** |
| **Stores** | `https://docs.langchain.com/oss/python/langgraph/stores` | 20 min | Contains the official checkpointer-vs-store table. Read before the interview. |
| **Checkpointers** | `https://docs.langchain.com/oss/python/langgraph/checkpointers` | 20 min | Durability modes, `get_state_history`, backends. |
| **Interrupts** | `https://docs.langchain.com/oss/python/langgraph/interrupts` | 25 min | The node-reruns-from-start warning is here in the docs' own words. |
| **Time travel** | `https://docs.langchain.com/oss/python/langgraph/use-time-travel` | 15 min | Short. `StateSnapshot` fields + fork/replay. |
| **Streaming** | `https://docs.langchain.com/oss/python/langgraph/streaming` | 15 min | The seven modes table. |
| **Workflows & agents** | `https://docs.langchain.com/oss/python/langgraph/workflows-agents` | 30 min | Five patterns with runnable code. |
| **Anthropic — Building Effective Agents** | `https://www.anthropic.com/engineering/building-effective-agents` | 25 min | The essay the LangGraph patterns page is built on. Framework-neutral, universally cited. **Highest ratio of interview-usable vocabulary per minute in this table.** |
| **Harrison Chase — How to think about agent frameworks** | `https://www.langchain.com/blog/how-to-think-about-agent-frameworks` | 30 min | Source of "orchestration framework with agent abstractions on top" and the context-engineering argument. Where the *when-not-to-use-it* answer comes from. |
| **LangChain Academy — Intro to LangGraph** | `https://academy.langchain.com/courses/intro-to-langgraph` | 5–6 hrs | Free, official, video + notebooks. Too long for 4.5 days — cherry-pick the state/memory modules only. |
| **langchain-academy repo (notebooks)** | `https://github.com/langchain-ai/langchain-academy` | run selectively | The notebooks without the videos. Faster path than the course. |
| **API reference** | `https://reference.langchain.com/python/langgraph/` | lookup | For exact signatures. Not for reading through. |

**If you only have 2 hours for LangGraph:** Graph API page (45m) → Stores page (20m) → run all 10 experiments
(30m) → Anthropic essay skim (25m).
