# BREAKABLE EXPERIMENTS — LangGraph / LangChain

**Every output in this file was produced by actually running the code**, not predicted.
Verified environment: `langgraph 1.2.9`, `langgraph-checkpoint 4.1.1`, `langchain-core 1.5.1`, Python 3.14.

**None of these require an API key.** No LLM is called. That is deliberate — you can run all 10 in a coffee break.

## Setup (2 minutes, once)

```bash
python3 -m venv lgvenv
source lgvenv/bin/activate        # fish: source lgvenv/bin/activate.fish
pip install langgraph
```

Runnable copies of every script are in `./experiments/` next to this file.

---

## How to use this file

For each experiment: **Run it → look at the output → say the one-liner out loud.** The one-liner is the thing
that comes out of your mouth in the interview. The code is just what makes it stick.

Ranked by interview probability. Do 1, 2, 3, 6 even if you do nothing else.

---

# EXP 1 — Parallel state write with no reducer 🔴 CONFIRMED INTERVIEW QUESTION

**This is the single highest-value experiment in this file.** It is a known question-bank item.

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    result: str          # NO reducer

def branch_a(s): return {"result": "A"}
def branch_b(s): return {"result": "B"}

g = StateGraph(State)
g.add_node("a", branch_a); g.add_node("b", branch_b)
g.add_edge(START, "a"); g.add_edge(START, "b")   # both run in the SAME super-step
g.add_edge("a", END);   g.add_edge("b", END)
graph = g.compile()
print(graph.invoke({"result": ""}))
```

### What you will observe (exact, verified)

```
langgraph.errors.InvalidUpdateError: At key 'result': Can receive only one value per step.
Use an Annotated key to handle multiple values.
For troubleshooting, visit:
https://docs.langchain.com/oss/python/langgraph/errors/INVALID_CONCURRENT_GRAPH_UPDATE
```

### The one-liner

> "Without a reducer a state key is a `LastValue` channel, which accepts exactly one write per super-step —
> so two parallel branches writing it raise `InvalidUpdateError`. It's a hard failure, not a race:
> LangGraph refuses to silently pick a winner."

### Why this answer beats everyone else's

Most candidates say "the second one overwrites the first" or "it's a race condition." **Both are wrong.**
It raises. Naming the error class (`InvalidUpdateError`), the channel type (`LastValue`), and the unit
(one write **per super-step**, not per graph) is what separates a real user from a tutorial-watcher.

### The fix — run this immediately after

```python
import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    result: Annotated[list, operator.add]   # reducer added

def a(s): return {"result": ["A"]}
def b(s): return {"result": ["B"]}

g = StateGraph(State)
g.add_node("a", a); g.add_node("b", b)
g.add_edge(START,"a"); g.add_edge(START,"b"); g.add_edge("a",END); g.add_edge("b",END)
print(g.compile().invoke({"result": []}))
```

**Verified output:** `{'result': ['A', 'B']}`

### The follow-up probe you WILL get

**"Is `['A','B']` guaranteed, or could it be `['B','A']`?"**

> "Order within a super-step isn't something I'd rely on. If ordering matters I don't lean on the reducer —
> I write tagged entries like `{'branch': 'a', 'value': ...}` and sort downstream, or I make the reducer
> itself order-independent, like a dict merge or a set union. A reducer must be safe to apply in any order."

That answer is a seniority signal. It says you've been burned by this in production.

---

# EXP 2 — The SILENT version of the same bug 🔴 more dangerous than EXP 1

EXP 1 fails loudly. This one destroys your data and says nothing.

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class S(TypedDict):
    findings: list        # NO reducer -- but nodes run SEQUENTIALLY, so no error

def search_web(s):  return {"findings": ["web result"]}
def search_docs(s): return {"findings": ["docs result"]}   # silently clobbers

g = StateGraph(S)
g.add_node("web", search_web); g.add_node("docs", search_docs)
g.add_edge(START,"web"); g.add_edge("web","docs"); g.add_edge("docs",END)
print(g.compile().invoke({"findings": []}))
```

### What you will observe (exact, verified)

```
{'findings': ['docs result']}
```

**No error. `'web result'` is simply gone.**

### The one-liner

> "The `InvalidUpdateError` only fires when two writes land in the *same* super-step. Sequential nodes each get
> their own super-step, so a missing reducer there isn't an error — it's silent data loss. That's the bug that
> actually reaches production."

### Why this pairs with EXP 1

If the interviewer asks the parallel-reducer question and you answer EXP 1 *and then volunteer EXP 2*,
you've demonstrated you understand the underlying model rather than having memorized one error message.
That is the single best moment available to you in this topic.

---

# EXP 3 — What breaks without a checkpointer 🔴 CONFIRMED INTERVIEW AREA

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, AIMessage

class S(TypedDict):
    messages: Annotated[list, add_messages]

def echo(s):
    return {"messages": [AIMessage(f"I have seen {len(s['messages'])} msgs")]}

g = StateGraph(S); g.add_node("echo", echo)
g.add_edge(START,"echo"); g.add_edge("echo",END)
graph = g.compile()                      # NO checkpointer
cfg = {"configurable": {"thread_id": "t1"}}
print("turn1:", graph.invoke({"messages":[HumanMessage("hi")]}, cfg)["messages"][-1].content)
print("turn2:", graph.invoke({"messages":[HumanMessage("again")]}, cfg)["messages"][-1].content)
```

### What you will observe (exact, verified)

```
turn1: I have seen 1 msgs
turn2: I have seen 1 msgs        <-- turn 2 has NO memory of turn 1
```

Note the trap: **you passed a `thread_id` and it was silently ignored.** No warning. No error.

### Now add the checkpointer — change one line

```python
from langgraph.checkpoint.memory import InMemorySaver
graph = g.compile(checkpointer=InMemorySaver())
```

**Verified output:**

```
turn1: I have seen 1 msgs
turn2: I have seen 3 msgs           <-- human + ai + human, history preserved
other thread: I have seen 1 msgs    <-- thread_id "t2" is fully isolated
```

### The one-liner

> "Without a checkpointer the graph is stateless per invocation — `thread_id` is accepted and ignored.
> The checkpointer is what makes `thread_id` mean anything, and it's the prerequisite for memory,
> human-in-the-loop, time travel, and crash recovery. All four are the same feature underneath: persisted state."

### The follow-up probe

**"So the checkpointer is your memory system?"** — *This is the trap. Say no.*

> "It's my *short-term*, within-thread memory. It stores full graph state snapshots keyed by `thread_id`.
> It cannot tell me anything about this user in a *different* conversation — that's what the Store is for."

Go straight into EXP 4.

---

# EXP 4 — Checkpointer vs Store 🔴 CONFIRMED INTERVIEW QUESTION

This one is best learned as a table plus a sentence rather than by breaking something, because the
"break" is conceptual: **thread `t2` cannot see anything thread `t1` learned.** You already proved that in EXP 3
(`other thread: I have seen 1 msgs`).

```python
from langgraph.store.memory import InMemoryStore

store = InMemoryStore()
store.put(("user_123", "memories"), "pref_1", {"data": "prefers dark mode"})

# Any thread, any conversation, any day -- same user_id namespace
print(store.search(("user_123", "memories")))
print(store.search(("user_999", "memories")))   # different user -> nothing
```

Wire both in together — **they are not alternatives, you almost always want both**:

```python
graph = builder.compile(checkpointer=InMemorySaver(), store=store)
```

| | **Checkpointer** | **Store** |
|---|---|---|
| Scope | One thread | Across all threads |
| Keyed by | `thread_id` | namespace tuple, e.g. `("user_123","memories")` |
| Stores | Full graph state snapshot per super-step | Arbitrary JSON key-value you choose |
| Written by | LangGraph, automatically | You, explicitly, via `store.put()` |
| Memory type | Short-term (this conversation) | Long-term (this user, forever) |
| Enables | HITL, time travel, resume, crash recovery | Personalization, learned preferences |
| Prod backends | `PostgresSaver`, `SqliteSaver` | `PostgresStore`, `RedisStore`, `MongoDBStore` |

### The one-liner (memorize this exact example)

> "Checkpointer is within-thread, Store is cross-thread. Concretely: the checkpointer is why the bot remembers
> you said 'my name is Devang' three messages ago in *this* chat. The Store is why it still knows your name when
> you open a *brand new* chat tomorrow. The checkpointer writes itself automatically and stores whole state
> snapshots keyed by `thread_id`; the Store I write to deliberately, keyed by a namespace like
> `(user_id, "memories")`, and it supports semantic search over those memories if I configure an embedding index."

### The follow-up probe

**"Could you just use one very long thread instead of a Store?"**

> "You could, and it breaks two ways. The context window grows without bound, and the memory is trapped in that
> one conversation — nothing is queryable by user across sessions. The Store also gives me semantic search over
> memories, so I retrieve the three relevant facts instead of replaying the entire history."

---

# EXP 5 — A cycle with no termination condition

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START

class S(TypedDict):
    n: int
def tick(s): return {"n": s["n"] + 1}

g = StateGraph(S); g.add_node("tick", tick)
g.add_edge(START, "tick"); g.add_edge("tick", "tick")   # cycle, no exit
print(g.compile().invoke({"n": 0}))
```

### What you will observe (exact, verified)

```
langgraph.errors.GraphRecursionError: Recursion limit of 10007 reached without hitting a stop condition.
You can increase the limit by setting the `recursion_limit` config key.
For troubleshooting, visit:
https://docs.langchain.com/oss/python/langgraph/errors/GRAPH_RECURSION_LIMIT
```

### ⚠️ A precision detail almost nobody has

Everyone repeats "the default recursion limit is 25." **That is langchain-core's `DEFAULT_RECURSION_LIMIT`.**
LangGraph 1.x sets its *own* default, verified in source at
`langgraph/_internal/_config.py`:

```python
DEFAULT_RECURSION_LIMIT = int(getenv("LANGGRAPH_DEFAULT_RECURSION_LIMIT", "10007"))
```

### The one-liner

> "It doesn't hang — it raises `GraphRecursionError` at the recursion limit. That limit counts super-steps, so
> it's a safety net, not a design tool. The real fix is a conditional edge that routes to `END`, plus an explicit
> iteration counter in state that the router checks. I'd never rely on the recursion limit as my exit condition."

**Say the number carefully:** "the classic default was 25 from langchain-core; LangGraph 1.x raised its own
default — I'd check for the version I'm on." Precision *with* an admission of version-dependence reads as
experience. A confidently wrong number reads as a memorized fact.

### To see it fail fast, cap it yourself

```python
graph.invoke({"n": 0}, {"recursion_limit": 5})
```

---

# EXP 6 — The interrupt gotcha: your node re-runs from the top 🔴 high value

This one surprises people who have actually shipped HITL. Great to volunteer unprompted.

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt, Command
from langgraph.checkpoint.memory import InMemorySaver

CALLS = []
class S(TypedDict):
    x: str

def node(s):
    CALLS.append("side effect")
    print("  -> side effect fired. total times:", len(CALLS))
    ans = interrupt("approve?")          # pause here
    return {"x": ans}

g = StateGraph(S); g.add_node("node", node)
g.add_edge(START,"node"); g.add_edge("node",END)
graph = g.compile(checkpointer=InMemorySaver())
cfg = {"configurable": {"thread_id": "1"}}
print("run 1:"); graph.invoke({"x":""}, cfg)
print("resume:"); print(graph.invoke(Command(resume="yes"), cfg))
print("TOTAL side effects for ONE logical approval:", len(CALLS))
```

### What you will observe (exact, verified)

```
run 1:
  -> side effect fired. total times: 1
resume:
  -> side effect fired. total times: 2
{'x': 'yes'}
TOTAL side effects for ONE logical approval: 2
```

**The side effect fired twice for one approval.** If that line had been "charge the customer's card," you
just double-billed them.

### The one-liner

> "`interrupt()` doesn't resume at the line it paused on — on resume, LangGraph re-executes the whole node from
> the top. So anything before the `interrupt()` call runs twice. The rule is: put side effects *after* the
> interrupt, or make them idempotent with an idempotency key. This is the bug that double-charges customers."

### The follow-up probe

**"Why is it implemented that way?"**

> "Because the unit of replay is the node, not the line. The checkpointer persists state at super-step
> boundaries, and a Python function's mid-execution stack isn't serializable. Re-running the node from a
> known checkpoint is the only recoverable option — which is also why LangGraph docs tell you to write
> idempotent nodes generally, not just around interrupts."

---

# EXP 7 — `interrupt()` with no checkpointer

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt, Command

class S(TypedDict):
    x: str
def ask(s): return {"x": interrupt("approve?")}

g = StateGraph(S); g.add_node("ask", ask)
g.add_edge(START,"ask"); g.add_edge("ask",END)
graph = g.compile()   # no checkpointer
graph.invoke({"x":""})
print(graph.invoke(Command(resume="yes"), {"configurable":{"thread_id":"1"}}))
```

### What you will observe (exact, verified)

The first `invoke` **does not raise** — it returns:

```
{'x': '', '__interrupt__': [Interrupt(value='approve?', id='66cb9755...')]}
```

The resume is what dies:

```
RuntimeError: Cannot use Command(resume=...) without checkpointer
```

### The one-liner

> "You can pause without a checkpointer — the interrupt surfaces in the `__interrupt__` key. What you can't do
> is *resume*, because there's no persisted state to resume into. It's a one-way door: a pause you can never
> come back from."

Nice subtlety: it fails at resume time, not at compile time. Being able to say *when* it fails is the signal.

---

# EXP 8 — Time travel: replay and fork

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver

class S(TypedDict):
    topic: str
    joke: str
def gen_topic(s): return {"topic": "cats"}
def write(s):     return {"joke": f"A joke about {s['topic']}"}

g = StateGraph(S)
g.add_node("gen_topic", gen_topic); g.add_node("write", write)
g.add_edge(START,"gen_topic"); g.add_edge("gen_topic","write"); g.add_edge("write",END)
graph = g.compile(checkpointer=InMemorySaver())
cfg = {"configurable": {"thread_id":"1"}}

print("original:", graph.invoke({}, cfg))
hist = list(graph.get_state_history(cfg))
for h in hist:
    print("  ckpt next=", h.next, "values=", h.values)

before = next(h for h in hist if h.next == ("write",))   # rewind to before `write`
fork = graph.update_state(before.config, {"topic":"chickens"})
print("forked:", graph.invoke(None, fork))
```

### What you will observe (exact, verified)

```
original: {'topic': 'cats', 'joke': 'A joke about cats'}
  ckpt next= ()             values= {'topic': 'cats', 'joke': 'A joke about cats'}
  ckpt next= ('write',)     values= {'topic': 'cats'}
  ckpt next= ('gen_topic',) values= {}
  ckpt next= ('__start__',) values= {}
forked: {'topic': 'chickens', 'joke': 'A joke about chickens'}
```

### Three things to notice

1. **History is newest-first.** The last entry is `__start__`.
2. **`next` tells you what was *about* to run** — that's how you pick your rewind point, not by index.
3. **`invoke(None, fork_config)`** — passing `None` as input means "don't add new input, just resume."

### The one-liner

> "`get_state_history` gives me every checkpoint as a `StateSnapshot` with `values`, `next`, and a `config`
> carrying its `checkpoint_id`. Passing that config back into `invoke` with `None` as input replays from there.
> If I call `update_state` first, I fork — same thread, new branch, original history intact. That's how I debug
> a bad agent run: rewind to the step before it went wrong, change one field, and replay just that."

### The subtle bit worth knowing

After forking, `graph.get_state(cfg)` returns the **forked** values. The fork is a new checkpoint on the
*same thread* — you moved the thread's head pointer. Original checkpoints still exist in history and are
still reachable by `checkpoint_id`; they're just no longer the head.

---

# EXP 9 — Mixing a normal edge with a conditional edge from the same node

A quiet money-burner. The docs warn about it; almost nobody has felt it.

```python
import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END

class S(TypedDict):
    log: Annotated[list, operator.add]
def a(s):         return {"log":["a"]}
def cheap(s):     return {"log":["CHEAP path ran"]}
def expensive(s): return {"log":["EXPENSIVE path ran ($$$)"]}
def route(s):     return "cheap"                    # router says: ONLY cheap

g = StateGraph(S)
g.add_node("a",a); g.add_node("cheap",cheap); g.add_node("expensive",expensive)
g.add_edge(START,"a")
g.add_edge("a","expensive")                          # leftover normal edge
g.add_conditional_edges("a", route, ["cheap","expensive"])
g.add_edge("cheap",END); g.add_edge("expensive",END)
print(g.compile().invoke({"log":[]}))
```

### What you will observe (exact, verified)

```
{'log': ['a', 'CHEAP path ran', 'EXPENSIVE path ran ($$$)']}
```

**The router chose `cheap`. `expensive` ran anyway.**

### The one-liner

> "A conditional edge doesn't *replace* normal edges out of a node — it adds to them. Both fire, in parallel,
> in the same super-step. So a leftover `add_edge` next to your router silently runs the branch you thought you
> routed away from. It's not an error, it's just double the LLM spend."

---

# EXP 10 — Fan-out with `Send` (map-reduce over a runtime-sized list)

Not a break — a capability most candidates can't demo. Worth 60 seconds.

```python
import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.types import Send

class Overall(TypedDict):
    subjects: list
    jokes: Annotated[list, operator.add]      # reducer is MANDATORY here
class JokeState(TypedDict):
    subject: str

def gen(s: JokeState): return {"jokes": [f"joke about {s['subject']}"]}
def fan_out(s: Overall): return [Send("gen", {"subject": x}) for x in s["subjects"]]

g = StateGraph(Overall); g.add_node("gen", gen)
g.add_conditional_edges(START, fan_out, ["gen"]); g.add_edge("gen", END)
print(g.compile().invoke({"subjects":["cats","dogs","cars"], "jokes":[]}))
```

### What you will observe (exact, verified)

```
{'subjects': ['cats','dogs','cars'], 'jokes': ['joke about cats','joke about dogs','joke about cars']}
```

### The one-liner

> "`Send` is how you fan out when you don't know the branch count until runtime — you return a list of `Send`
> objects from a conditional edge, and each one launches the node with its *own* private state, not the shared
> state. All N land in the same super-step, which is exactly why the collecting key needs a reducer.
> That's map-reduce in LangGraph."

### Tie it back

**EXP 10 is EXP 1 at scale.** Delete the `Annotated[list, operator.add]` here and you get `InvalidUpdateError`
with N writers instead of 2. If you can say that sentence, you've shown the reducer concept is load-bearing
in your head, not memorized.

---

# 90-second pre-interview drill

Run these four in order the morning of. Say the one-liner out loud after each.

```bash
python exp1_parallel_no_reducer.py     # InvalidUpdateError
python exp2_silent_clobber.py          # silent data loss
python exp3_no_checkpointer.py         # "I have seen 1 msgs" twice
python exp6_interrupt_rerun.py         # side effect fires twice
```

If you can narrate those four cold, you can hold the LangGraph portion of this interview.
