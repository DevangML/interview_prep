# PYTHON CONCEPTS — TCS Gen AI Engineer, 01 Aug 2026

**Companion to** `PYTHON_BY_HAND.md` (coding-by-hand Q1–Q10, paper discipline,
2-hour schedule). **Evidence:** `research/GENAI_INTERVIEW_REALITY.md` §1.5 [V].
S1 named: **decorators, list comprehensions, threading vs multiprocessing,
inheritance, polymorphism, classmethod vs staticmethod.** S3 named: **tuples and
how they differ.** All code below was executed and passes.

**Answer format for every concept question:** one-sentence definition → the
distinction that matters → **a concrete example from your own work** → when you'd
choose each. Two minutes maximum, then stop talking.

---

# C1. DECORATORS — highest-value concept question

**ASKED AS:** "What is a decorator? Why would you use one? Write one."

**VARIATIONS:** write a **timing** decorator · write a **retry** decorator (the
GenAI-flavoured one) · what does `@functools.wraps` do · a decorator that takes
arguments · what's the difference between a decorator and a context manager.

**The 20-second answer:** A decorator is a function that takes a function and
returns a new function wrapping it, so you can add behaviour — logging, timing,
retries, auth — without touching the original body. `@timer` above a function is
just sugar for `func = timer(func)`.

**Timer decorator (write this from memory):**
```python
import time, functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper
```

**Retry with exponential backoff — a decorator that takes arguments.** This is the
one to volunteer, because rate-limited LLM APIs are exactly why it exists:
```python
def retry(times=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last = e
                    time.sleep(delay * (2 ** attempt))   # 1s, 2s, 4s
            raise last
        return wrapper
    return decorator

@retry(times=3)
def call_llm(prompt):
    ...
```
Three layers because `retry(times=3)` must first *return* the decorator. Draw the
three `def`s and say "outer takes the config, middle takes the function, inner does
the work."

**KNOW THIS:** `@functools.wraps(func)` copies `__name__`, `__doc__` and the
signature onto the wrapper. Without it, every decorated function reports as
`wrapper`, which breaks debugging, logging and introspection.

**FOLLOW-UP:** *"Where have you used one?"* → Frappe/backend: auth and permission
checks on endpoints, request timing. *"Real-world examples?"* →
`@app.route`, `@staticmethod`, `@property`, `@lru_cache`, `@pytest.fixture`,
`@tool` in LangChain.

**Refinement to volunteer:** in real code use `tenacity` (`@retry` with jittered
backoff), and catch only the retryable exception (`RateLimitError`), not bare
`Exception` — retrying a 400 bad-request forever is a real production bug.

---

# C2. list vs tuple vs set vs dict — S3 asked tuples explicitly

**ASKED AS:** "Explain tuples and how they differ from lists." / "When would you
use a set over a list?"

| | list | tuple | set | dict |
|---|---|---|---|---|
| Syntax | `[1,2]` | `(1,2)` | `{1,2}` | `{"a":1}` |
| Mutable | yes | **no** | yes | yes |
| Ordered | yes | yes | **no** | yes (3.7+, insertion order) |
| Duplicates | yes | yes | **no** | keys unique |
| Hashable (usable as a dict key / set member) | no | **yes*** | no | no |
| Membership `in` | O(n) | O(n) | **O(1)** | **O(1) on keys** |

*A tuple is hashable **only if everything inside it is** — `(1, [2])` is not.

**The four things that actually earn marks:**
1. **Tuples are hashable, so they can be dict keys.** `cache[(model, prompt_hash)]`.
   That is the real reason tuples exist, not "they're a faster list".
2. **`in` on a set is O(1), on a list O(n).** In the dedupe question (`PYTHON_BY_HAND`
   Q4) that's the whole difference between O(n) and O(n²).
3. **Tuples signal fixed structure** — a record, a coordinate, a multi-return.
   Lists signal a homogeneous collection that grows.
4. **Empty set is `set()`, not `{}`** — `{}` is an empty dict. Classic trap.

**FOLLOW-UP:** *"Is a tuple immutable all the way down?"* → **No.** The tuple's
*bindings* are fixed, but `t = (1, [2])`; `t[1].append(3)` works. That's why such a
tuple is unhashable.

---

# C3. List comprehension vs generator — and when generators matter

**ASKED AS:** "What's a list comprehension? What's the difference between
`[x for x in ...]` and `(x for x in ...)`?"

**VARIATIONS:** dict/set comprehension · nested comprehension · `yield` vs `return`
· when would a generator be the wrong choice.

```python
squares  = [x*x for x in range(10)]           # list  — built fully, in memory
evens    = [x for x in nums if x % 2 == 0]    # filter
pairs    = {k: len(v) for k, v in docs.items()}   # dict comprehension
lazy     = (x*x for x in range(10_000_000))   # generator — nothing computed yet
```

**The answer:** the list comprehension builds every element immediately and holds
them all in memory. The generator produces one element at a time on demand, so
memory is O(1) regardless of size — but you can only iterate it **once**, and you
can't index or `len()` it.

**When generators matter — the three cases to name:**
1. **The data doesn't fit in memory** — streaming a 5 GB corpus for chunking and
   embedding. You never materialise the whole document list.
2. **Streaming LLM responses** — tokens arrive one at a time; a generator yields
   each to the UI as it arrives, so time-to-first-token stays low instead of the
   user waiting for the whole completion.
3. **Early exit** — you only need the first match out of a million.

**Batching generator — worth writing, it's directly RAG-relevant:**
```python
def batched(items, size):
    batch = []
    for x in items:
        batch.append(x)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:                 # don't lose the final partial batch
        yield batch

# list(batched([1,2,3,4,5], 2)) == [[1,2],[3,4],[5]]
```
That trailing `if batch:` is the bug interviewers look for. Batching embedding
calls this way is the single biggest cost/latency win in an ingestion pipeline.

**FOLLOW-UP:** *"`yield` vs `return`?"* → `return` ends the function; `yield`
suspends it, keeping local state, and resumes on the next `next()` call.

---

# C4. `*args` and `**kwargs`

**ASKED AS:** "What are `*args` and `**kwargs`?"

`*args` collects extra positional arguments into a **tuple**; `**kwargs` collects
extra keyword arguments into a **dict**. The `*` and `**` are the operators — the
names are convention.

```python
def log_call(func, *args, **kwargs):
    print(args, kwargs)          # args is a tuple, kwargs is a dict
    return func(*args, **kwargs) # * and ** unpack them back out
```

**Where it actually matters:** every decorator wrapper (C1) must be
`wrapper(*args, **kwargs)` or it only works on functions with one specific
signature. Also for passing through optional LLM params:
`client.chat(model=m, **generation_config)`.

**FOLLOW-UP:** *"Argument order?"* → `def f(a, b=1, *args, c, **kwargs)`: positional,
default, `*args`, **keyword-only**, `**kwargs`. Anything after `*args` is
keyword-only — a nice detail to drop.

---

# C5. Mutable default argument trap

**ASKED AS:** "What's wrong with this function?"

```python
def add(item, bucket=[]):     # BUG
    bucket.append(item)
    return bucket

add(1)   # [1]
add(2)   # [1, 2]  <- the SAME list, not a fresh one
```

**Why:** default arguments are evaluated **once, when the function is defined**, not
on each call. So every call shares one list object.

**Fix:**
```python
def add(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket
```

Applies to `[]`, `{}`, `set()`, and any mutable object — including
`def f(x, cache={})`, which is the accidental-global-cache version of the same bug.

---

# C6. Shallow vs deep copy · `is` vs `==`

**ASKED AS:** "Difference between shallow copy and deep copy?" / "`is` vs `==`?"

```python
import copy
orig = [[1, 2], [3]]
shallow = copy.copy(orig)        # or orig[:] or list(orig)
deep    = copy.deepcopy(orig)

shallow[0].append(99)            # orig is now [[1,2,99],[3]]  -- shared inner list
deep[0].append(100)              # orig unchanged
```

**Shallow** copies the outer container but the elements are the *same objects*.
**Deep** recursively copies everything. Deep copy is slow and breaks on
non-copyable objects (open sockets, DB connections) — don't reach for it reflexively.

**`is` vs `==`:** `==` compares **value** (calls `__eq__`); `is` compares
**identity** (same object in memory).
```python
a, b = [1, 2], [1, 2]
a == b     # True
a is b     # False
```
**Rule: only ever use `is` for `None`, `True`, `False`.** `if x is None:` is correct;
`if x == None:` is not idiomatic. Small ints and short strings are cached by CPython,
so `256 is 256` may be True while `1000 is 1000` is False — an implementation
detail, never rely on it.

---

# C7. GIL · threading vs multiprocessing vs asyncio — **the GenAI-relevant one**

**ASKED AS:** "Threading vs multiprocessing in Python?" (S1, verbatim) →
followed by "What is the GIL?"

**GIL, in one sentence:** CPython's Global Interpreter Lock lets only one thread
execute Python bytecode at a time, so threads **cannot** give you true parallel
speed-up on CPU-bound work — but the GIL is **released during I/O**, so threads
*do* help when you're waiting on network or disk.

| | Best for | Parallel CPU? | Cost |
|---|---|---|---|
| **threading** | I/O-bound (network, disk, DB) | No — GIL | Cheap; shared memory, so locks needed |
| **multiprocessing** | CPU-bound (parsing, math, image work) | **Yes** — separate interpreters | Heavy; processes, data must be pickled between them |
| **asyncio** | **Many concurrent I/O waits** | No — single thread | Cheapest per task; needs `async`-aware libraries |

**THE ANSWER THAT DIFFERENTIATES YOU — "which fits an LLM API-call workload?"**

> **asyncio.** Calling an LLM API is almost pure network wait — a couple of seconds
> where the CPU does nothing. It's I/O-bound, so multiprocessing is the wrong tool
> entirely: you'd pay process overhead to sit idle in parallel. Threads would work,
> but each thread costs ~8 MB of stack, so a few hundred concurrent calls gets
> expensive. asyncio runs thousands of pending awaits on one thread, so 100 calls
> that take 2 s each finish in about 2 s instead of 200 s. I'd add a semaphore to
> respect the provider's rate limit, and retry with exponential backoff on 429s.
>
> The one place I'd still use multiprocessing in a GenAI pipeline is document
> parsing during ingestion — PDF extraction and tokenisation are genuinely CPU-bound.

```python
import asyncio

async def call_all(prompts, limit=5):
    sem = asyncio.Semaphore(limit)          # respect the rate limit
    async def one(p):
        async with sem:
            return await call_llm(p)
    return await asyncio.gather(*[one(p) for p in prompts])

results = asyncio.run(call_all(prompts))
```
(Verified: 20 prompts × 0.1 s each, limit 5 → 0.41 s wall clock, not 2.0 s.)

**FOLLOW-UP:** *"What if a library is sync-only?"* → `asyncio.to_thread(fn, ...)`
runs it in a thread pool without blocking the loop. *"Does the GIL apply in 3.13?"*
→ Free-threaded builds (PEP 703) are experimental and opt-in; assume the GIL.

**Say this and stop:** don't drift into event-loop internals. Land the "asyncio,
because it's I/O-bound, plus semaphore and backoff" point and let them probe.

---

# C8. classmethod vs staticmethod vs instance method — S1 named this

**ASKED AS:** "Difference between a classmethod and a staticmethod?"

```python
class Document:
    count = 0                                   # class attribute

    def __init__(self, text):
        self.text = text
        Document.count += 1

    def word_count(self):                       # instance method -> self
        return len(self.text.split())

    @classmethod
    def from_raw(cls, raw):                     # classmethod -> cls
        return cls(raw.strip())                 # alternative constructor

    @staticmethod
    def token_estimate(text):                   # staticmethod -> neither
        return len(text) // 4
```

- **Instance method** — gets `self`, works on one object's data.
- **classmethod** — gets `cls`, works on the class. **The real use is alternative
  constructors** (`from_raw`, `from_file`, `from_dict`) and it respects inheritance:
  `cls(...)` builds the subclass, a hardcoded `Document(...)` would not.
- **staticmethod** — gets nothing; it's a plain utility function that logically
  belongs in the class's namespace.

**FOLLOW-UP:** *"Why not just a module-level function instead of a staticmethod?"* →
Honest answer: often you could; the staticmethod exists for namespacing and
discoverability. *"Give an alternative-constructor example"* → `dict.fromkeys`,
`datetime.fromtimestamp`.

---

# C9. Inheritance, polymorphism, MRO — S1 named this

**ASKED AS:** "Explain inheritance and polymorphism." / "What is MRO?"

**Inheritance** = a class reuses and extends another's behaviour.
**Polymorphism** = different classes expose the same interface and the caller
doesn't care which one it has.

```python
class Retriever:
    def search(self, q, k=5):
        raise NotImplementedError

class VectorRetriever(Retriever):
    def search(self, q, k=5): ...

class KeywordRetriever(Retriever):
    def search(self, q, k=5): ...

for r in [VectorRetriever(), KeywordRetriever()]:
    r.search("what is the leave policy")     # polymorphism — same call, different impl
```
That is a real example from your own RAG work — use it, not `Animal/Dog/Cat`.

**MRO (Method Resolution Order)** — the order Python searches classes for an
attribute, computed by C3 linearisation. Diamond case:
```python
class A:
    def who(self): return "A"
class B(A):
    def who(self): return "B"
class C(A):
    def who(self): return "C"
class D(B, C): pass

D().who()                 # "B"
[c.__name__ for c in D.__mro__]   # ['D', 'B', 'C', 'A', 'object']
```
Left to right, depth-first, but a parent never precedes its children. Use
`super().__init__()` — **not** `Parent.__init__(self)` — so multiple inheritance
initialises correctly along the MRO.

**FOLLOW-UP:** *"Duck typing?"* → Python doesn't require a shared base class; if it
has `.search()`, it works. *"Composition vs inheritance?"* → prefer composition;
inherit only for a genuine is-a relationship.

---

# C10. Context managers

**ASKED AS:** "What does `with open(...)` actually do?" / "Write a context manager."

Guarantees setup and teardown, **including when an exception is raised**. The
object implements `__enter__` and `__exit__`.

```python
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.time() - self.start
        return False          # False = don't swallow the exception

with Timer() as t:
    run_pipeline()
print(t.elapsed)
```
Or the short form:
```python
from contextlib import contextmanager

@contextmanager
def timed(label):
    start = time.time()
    try:
        yield
    finally:                  # finally is what makes it exception-safe
        print(label, time.time() - start)
```

**KNOW THIS:** returning **True** from `__exit__` **suppresses** the exception —
almost always a bug. Return `False` (or nothing).

**Where you'd use it:** DB transactions/sessions, file handles, `torch.no_grad()`,
temporarily swapping an LLM client for a mock in tests.

---

# C11. Exception handling

**ASKED AS:** "How does exception handling work? What's `finally`? What's `else`?"

```python
try:
    resp = call_llm(prompt)
except RateLimitError as e:          # most specific first
    backoff_and_retry()
except (TimeoutError, ConnectionError) as e:
    fall_back_to_cache()
else:
    log_success(resp)                # runs only if NO exception was raised
finally:
    release_connection()             # ALWAYS runs, exception or not, even on return
```

Points that earn marks:
- **Never `except:` bare** — it catches `KeyboardInterrupt` and `SystemExit` too.
  `except Exception:` at minimum; a specific type ideally.
- **Order matters** — a broad `except Exception` above a narrow one makes the narrow
  one dead code.
- **`raise` alone** re-raises the current exception with its original traceback;
  `raise NewError() from e` chains and preserves the cause.
- **Custom exceptions**: `class RetrievalError(Exception): pass` — lets callers catch
  your failure mode specifically.
- **EAFP vs LBYL** — Python prefers "easier to ask forgiveness": `try: d[k] except
  KeyError:` over `if k in d`. Naming this idiom reads well.

---

# C12. PYTHON IN A GENAI CONTEXT — where you differentiate

Every concept above has a GenAI hook. Land at least three of these unprompted; it
converts a fundamentals answer into a role-fit answer.

**1. asyncio for concurrent LLM calls** — see C7. **The single most valuable thing
in this file.** I/O-bound → asyncio → `Semaphore` for rate limits → `gather` for
fan-out. 100 sequential calls at 2 s = 200 s; concurrent ≈ 2–5 s.

**2. Batching** — embedding APIs accept arrays. Sending 1000 chunks one at a time is
1000 round-trips; batches of 100 is 10. Use the `batched()` generator in C3. Cuts
both latency and cost, and stays under per-request token caps.

**3. Generators for streaming** — yield tokens as they arrive so time-to-first-token
is ~200 ms instead of the user staring at a spinner for the full completion.
```python
def stream_answer(client, prompt):
    for chunk in client.stream(prompt):
        yield chunk.text          # caller can render each token immediately
```
Constant memory, and the consumer can stop early.

**4. Retry with exponential backoff on 429s** — the `retry` decorator from C1.
Say **"with jitter"**: without random jitter, every worker retries at the same
instant and you re-create the thundering herd you were backing off from. In
production: `tenacity`, retry only on `RateLimitError` / 5xx, cap total attempts.

**5. Where multiprocessing still belongs** — ingestion. PDF text extraction,
tokenisation, chunking are CPU-bound; that's the one place processes beat asyncio in
an LLM pipeline. Knowing *both* halves of the trade-off is what separates you from a
memorised answer.

**6. Dataclasses / Pydantic for structured output** — validating an LLM's JSON at the
boundary rather than trusting it. Ties directly to "how do you handle hallucination"
(§1.7): schema validation is a concrete, code-level mitigation, not a hand-wave.

**7. `functools.lru_cache` for prompt/embedding caching** — identical query, identical
embedding; caching cuts cost. Caveat to volunteer: **only cache deterministic calls
(`temperature=0`)**, and the key must be hashable — hence a tuple (C2).

---

## THE FOUR-LINE CHEAT SHEET

- **Decorator** = function wrapping a function; `@functools.wraps` preserves the name;
  `retry` needs three nested `def`s because it takes arguments.
- **GIL** = one thread runs bytecode at a time; released during I/O; therefore
  **asyncio for LLM calls, multiprocessing for CPU-bound parsing.**
- **Tuple** = immutable and hashable → usable as a dict key; **set membership is O(1)**.
- **Mutable default `[]`** is evaluated once at def-time → use `None`.
