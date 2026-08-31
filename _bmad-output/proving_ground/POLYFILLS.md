# Polyfills — Intuition, Derivation, Depth

**21 polyfills. 7 families. Learn the family, and the members cost almost nothing.**

> **No implementations here — by design.** You get the *intuition*, the *derivation*, and the
> *spec skeleton in steps*. Writing the code is the exercise. If you can restate the skeleton in
> your own words, the code writes itself; if you memorise code you cannot restate, you have
> learned nothing that survives a follow-up question.

---

## Why polyfills are the highest-ROI rote in the syllabus

A polyfill question is never really about the method. It is a **proxy for four things at once**:

1. Do you know what the method *actually* does, including the parts nobody uses?
2. Can you reason about `this`, prototypes and the prototype chain under pressure?
3. Do you handle the degenerate input, or only the happy path?
4. Can you read a specification and turn it into code?

That is why interviewers love them: one question, four signals. And it is why "I memorised `map`"
falls apart the moment they ask *"what about sparse arrays?"*

**The move: learn seven skeletons, not twenty-one functions.**

---

## The five invariants every array polyfill shares

Before any family, internalise these. They are the same five lines in every single array method,
and they are exactly what separates a memorised answer from a specification-grade one.

| # | Invariant | Why it exists | The question it answers |
|---|---|---|---|
| **1** | `if (this == null) throw new TypeError` | The method can be `.call`-ed on `null` | "What if someone does `map.call(null, fn)`?" |
| **2** | `const O = Object(this)` | Boxes primitives — a string has indices and length | "Can this work on a string? On an array-like?" |
| **3** | `const len = O.length >>> 0` | Coerces to a **32-bit unsigned integer** — handles `undefined`, negatives, floats, huge values | "What if `length` is `-1`? `"3"`? `3.7`?" |
| **4** | `if (typeof cb !== 'function') throw new TypeError` | Callback validated **before** any iteration | "What if I pass a string as the callback?" |
| **5** | `if (k in O)` | **Skips holes** in sparse arrays | "What does `[,,].map(f)` do?" |

**Invariant 5 is the one that gets people.** `[1, , 3]` has a *hole* at index 1 — not `undefined`,
a genuine absence. `in` distinguishes them; `O[k] === undefined` does not.

> **Say this in the room:** *"`length >>> 0` isn't a trick — it's the spec's `ToUint32`. It makes
> `length: -1` become 0 and `length: 3.7` become 3, which is exactly what the real method does."*

---

# FAMILY 1 — The Iterators

`map` · `filter` · `forEach` · `find` · `findIndex` · `some` · `every`

### The intuition

**One loop. Seven different things to do with the result.** Every member walks the array calling
your callback with `(element, index, array)`. They differ only in *what they collect* and *when
they stop*.

Learn the walk once; the seven members are seven one-line differences.

### The shared skeleton

```
1. Guard: this is not null           (invariant 1)
2. O = Object(this)                  (invariant 2)
3. len = O.length >>> 0              (invariant 3)
4. Guard: callback is a function     (invariant 4)
5. Set up the accumulator            ← THE ONLY LINE THAT DIFFERS
6. for k = 0; k < len; k++
     if (k in O)                     (invariant 5)
       result = callback.call(thisArg, O[k], k, O)
       ...do the family-specific thing with result
7. Return the accumulator            ← THE ONLY OTHER LINE THAT DIFFERS
```

### The seven differences

| Method | Accumulator | Per element | Returns | Stops early |
|---|---|---|---|---|
| `map` | `new Array(len)` | `A[k] = result` | `A` | never |
| `filter` | `[]` | if truthy → `push(O[k])` | `A` | never |
| `forEach` | none | nothing | `undefined` | never |
| `find` | none | if truthy → return `O[k]` | element or `undefined` | **yes** |
| `findIndex` | none | if truthy → return `k` | index or `-1` | **yes** |
| `some` | none | if truthy → return `true` | boolean (default `false`) | **yes** |
| `every` | none | if **falsy** → return `false` | boolean (default `true`) | **yes** |

### Depth — the four things that separate you from the field

**① `map` preallocates, `filter` pushes.**
`new Array(len)` for `map` because the output length is known and holes must be *preserved at their
indices*. `filter` cannot preallocate — output length is unknown and the result is always dense.

**② `find` and `findIndex` visit holes; `filter` and `map` skip them.**
This is not an inconsistency, it is deliberate: `find` asks *"is there an element satisfying P?"*
and a hole reads as `undefined`, which might satisfy P. Drop invariant 5 for those two.

**③ `every([])` is `true`.**
Vacuous truth: "all zero elements satisfy P" is trivially true. Falls out naturally — the loop
never runs and you return the initial `true`. If you have to special-case it, your structure is wrong.

**④ `thisArg` is the forgotten second parameter.**
`callback.call(thisArg, …)` — not `callback(…)`. It exists so pre-arrow code could pass a receiver.
Almost nobody remembers it, which is exactly why it is asked.

### CASES

- `[1,,3].map(x => x * 2)` → `[2, <hole>, 6]` — hole preserved, callback never ran for it
- `[].every(x => false)` → `true`
- `Array.prototype.map.call("abc", c => c.toUpperCase())` → works (invariant 2 boxes the string)
- Callback mutates the array mid-iteration → `len` was captured **once**, so appended items are never visited
- `map.call({length: 2, 0:'a', 1:'b'}, f)` → works on array-likes, returns a real array

---

# FAMILY 2 — The Folder

`reduce`

### The intuition

**`reduce` is the general case; everything in Family 1 is a special case of it.** `map` is a reduce
that pushes transformed values. `filter` is a reduce that conditionally pushes. Saying this out loud
is a strong signal — it shows you see the shape, not just the API.

The one structural difference: reduce carries an **accumulator** across iterations, and its hardest
problem is *where that accumulator starts*.

### The skeleton

```
1–4. Same four guards
5.   Decide the starting accumulator:
       if an initial value was PROVIDED:
         acc = initialValue,  k = 0
       else:
         if len === 0 → throw TypeError("Reduce of empty array with no initial value")
         skip forward past holes to the first real index
         acc = O[thatIndex],  k = thatIndex + 1
6.   for ; k < len; k++
       if (k in O)
         acc = callback(acc, O[k], k, O)      ← note: NO thisArg
7.   return acc
```

### Depth

**① "Provided" means `arguments.length > 1`, not `initialValue !== undefined`.**
`reduce(fn, undefined)` explicitly *provided* `undefined` as the seed. Checking for `!== undefined`
gets this wrong and it is a favourite follow-up.

**② The empty-and-no-initial throw is the whole question.**
`[].reduce((a,b) => a+b)` throws `TypeError`. With a seed, it returns the seed. If you cannot
explain why the spec chose to throw rather than return `undefined`, you have not understood it:
there is no sensible value to return, and silently producing `undefined` would hide the bug.

**③ `reduce` takes no `thisArg`.**
Break in the pattern — the second parameter slot is taken by `initialValue`. Knowing where the
pattern *breaks* is the mark of having read the spec rather than pattern-matched it.

**④ Skipping to the first non-hole is a real step.**
`[, , 3].reduce((a,b) => a+b)` seeds with `3`, not with a hole.

### CASES

- `[].reduce((a,b)=>a+b)` → TypeError
- `[].reduce((a,b)=>a+b, 0)` → `0`
- `[5].reduce((a,b)=>a+b)` → `5` — callback **never runs**
- `[1,2].reduce((a,b)=>a+b, undefined)` → `NaN` — seed was provided
- `["1","2","3"].reduce(...)` vs `.map(parseInt)` → the classic radix trap

---

# FAMILY 3 — The Searchers

`includes` · `indexOf`

### The intuition

Two nearly-identical linear scans that differ on **one question: how do you compare?** That single
difference is the entire teaching value.

| | Comparison | Finds `NaN`? | Distinguishes `0` / `-0`? |
|---|---|---|---|
| `indexOf` | Strict equality `===` | **No** | No (`0 === -0`) |
| `includes` | SameValueZero | **Yes** | No (treats them equal) |

### Depth

**SameValueZero** = strict equality, except `NaN` equals `NaN`. It exists precisely because
`indexOf` could never find `NaN` — `NaN === NaN` is `false`, so the scan never matches.

That is why `includes` was added in ES2016 rather than `indexOf` being changed: changing `indexOf`
would have broken the web.

**Negative `fromIndex`** counts from the end: `len + fromIndex`, clamped at 0.

### CASES

- `[NaN].indexOf(NaN)` → `-1` · `[NaN].includes(NaN)` → `true`
- `[1,2,3].indexOf(3, -1)` → `2` · `indexOf(1, -100)` → `0` (clamped)
- `[,].includes(undefined)` → `true` — **holes read as `undefined` for `includes`**
- `[,].indexOf(undefined)` → `-1` — `indexOf` skips holes. **Same input, different answers.**

---

# FAMILY 4 — The Shape-Changers

`flat` · `flatMap` · `slice` · `at` · `Array.from`

### The intuition

These do not iterate-and-collect — they **restructure**. Each has one idea:

| Method | The one idea |
|---|---|
| `flat` | Recursion with a depth counter |
| `flatMap` | `map` then `flat(1)` — but in one pass |
| `slice` | Index normalisation (negatives, clamping) |
| `at` | Negative indexing, nothing else |
| `Array.from` | **Two input worlds** — iterables and array-likes |

### `flat` — depth as the recursion budget

```
flatten(arr, depth):
  for each element:
    if Array.isArray(el) AND depth > 0 → recurse with depth - 1, spread results
    else if the index is not a hole    → push el
  (default depth = 1; Infinity = fully flat)
```

**Depth:** `flat` **removes holes** at every level — `[1, , 2].flat()` → `[1, 2]`. Nobody expects
that. Mention it unprompted.

Recursion is elegant but stack-bound; an explicit stack is the deep-nesting answer, and knowing
both is the complete answer.

### `slice` — the index-normalisation drill

```
start < 0 → max(len + start, 0)   else min(start, len)
end undefined → len
end < 0   → max(len + end, 0)     else min(end, len)
copy [start, end) — SHALLOW
```

**Depth:** `slice` is *the* array-like → array idiom (`Array.prototype.slice.call(arguments)`).
It also creates a **shallow** copy — nested objects stay shared, which is the first half of the
deep-clone conversation.

### `Array.from` — the one with two personalities

```
if the input has Symbol.iterator → iterate it
else                             → treat as array-like, walk 0..length-1
if a mapFn was passed            → mapFn(value, index) on each
```

**Depth — three things:**
- The **second argument is a map function**. `Array.from({length: 5}, (_, i) => i)` → `[0,1,2,3,4]`.
  This is the standard "range" idiom and it is why `Array(5).map()` fails while this works: `Array(5)`
  is all holes and `map` skips holes, whereas `from` *materialises* every index first.
- It handles both `Set`/`Map`/strings (iterables) and `{length: n}` / `arguments` / NodeList (array-likes).
- The mapFn runs *during* construction, so no intermediate array is allocated.

### CASES

- `Array(3).map((_, i) => i)` → `[<3 holes>]` · `Array.from({length:3}, (_, i) => i)` → `[0,1,2]`
- `[1,[2,[3,[4]]]].flat(2)` → `[1,2,3,[4]]`
- `[1,2,3].slice(-2)` → `[2,3]` · `.slice(2, 1)` → `[]`
- `[1,2,3].at(-1)` → `3` · `.at(5)` → `undefined`
- `Array.from("abc")` → `['a','b','c']` — strings are iterable

---

# FAMILY 5 — The Binders (the deepest family)

`call` · `apply` · `bind`

### The intuition

All three answer one question: **"run this function, but with a `this` I choose."** They differ
only in *how arguments arrive* and *whether it runs now*.

| | Arguments | Runs now? |
|---|---|---|
| `call` | Comma-separated | Yes |
| `apply` | Array | Yes |
| `bind` | Comma-separated (partial) | **No — returns a new function** |

### `call` — the temporary-property trick

The insight that unlocks the whole family:

> **A function's `this` is whatever object it was called *as a method of*.** So to force `this`,
> temporarily *make the function a property of that object*, call it, then remove it.

```
1. If thisArg is null/undefined → globalThis (sloppy) ; else Object(thisArg) to box primitives
2. Create a UNIQUE key — const key = Symbol()
3. thisArg[key] = this          (this = the function being called)
4. result = thisArg[key](...args)   ← the method call IS the binding
5. delete thisArg[key]
6. return result
```

**Why `Symbol()` and not `"__fn__"`:** a string key could collide with a real property and you
would delete the user's data. Using a Symbol shows you thought about collisions — it is a small
detail that reads as care.

### `apply` — one line different

Identical, but arguments arrive as an array. Guard: `null`/`undefined` args must not throw — treat
as empty.

### `bind` — the one with the hard part

```
1. Guard: this must be callable
2. Capture: targetFn = this, boundArgs = args
3. Return a new function `bound` that:
     - if called with `new`  → this is a fresh object; use IT, ignore thisArg
     - if called normally    → apply targetFn with thisArg
     - always concatenates boundArgs with call-time args
4. Preserve the prototype chain so `instanceof` still works through the bound function
```

**The `new` case is the whole question.** `new (fn.bind(obj))()` must **ignore** `obj` — `new` wins
over bind. Detect it with `this instanceof bound`. A bind polyfill that ignores this is the answer
that separates a memorised polyfill from an understood one, and it is *specifically* what a good
interviewer probes.

Secondary depth: bind cannot be undone. `fn.bind(a).bind(b)` is still bound to `a` — the second
bind binds the *already-bound wrapper*, whose own `this` is ignored.

### CASES

- `fn.call(null)` → sloppy: `globalThis`; strict: `null` stays `null`
- `fn.call(5)` → `this` is a boxed `Number` object, not the primitive (in sloppy mode)
- `fn.apply(obj, null)` → must not throw
- `new (fn.bind(obj))()` → `this` is the new object, **not** `obj`
- `fn.bind(a).bind(b)` → still `a`
- `boundFn.length` → original length minus bound args
- Deleting a pre-existing property with a colliding string key → the bug `Symbol()` prevents

---

# FAMILY 6 — The Object Makers

`new` · `instanceof` · `Object.create`

### The intuition

These three *are* the prototype system. Together they answer: how is an object born, how is it
linked, and how do you ask what it is?

### `myNew(Constructor, ...args)` — the four steps

```
1. Create an empty object
2. Link it: obj.__proto__ = Constructor.prototype
3. Call Constructor with `this` = obj, passing args
4. If the constructor RETURNED AN OBJECT → return that
   Otherwise                            → return obj
```

**Step 4 is the whole question.** A constructor returning an object *overrides* the new instance;
returning a primitive is ignored. This is why the Singleton pattern works, and it is the detail
almost everyone omits.

Steps 1+2 collapse into `Object.create(Constructor.prototype)` — which shows you see that
`Object.create` is the *primitive operation* underneath `new`.

### `myInstanceof(obj, Constructor)`

```
1. Primitives → false immediately
2. proto = Object.getPrototypeOf(obj)
3. while proto !== null:
     if proto === Constructor.prototype → true
     proto = Object.getPrototypeOf(proto)
4. return false
```

**Depth:** it is a **chain walk**, not a type check — which is exactly why it fails across iframes
(different realm, different `Array.prototype`, so `arr instanceof Array` is `false`). That is the
reason `Array.isArray` exists. Deliver those two sentences together and you have answered three
questions at once.

Also: `Symbol.hasInstance` lets a class override `instanceof` entirely.

### `Object.create(proto, descriptors?)`

```
1. Make an empty object whose [[Prototype]] is proto
2. If descriptors passed → defineProperties
```

**Depth:** `Object.create(null)` makes a **truly bare** object — no `toString`, no
`hasOwnProperty`, no prototype at all. It is the correct choice for a pure dictionary, because no
user key can ever collide with an inherited method. It is also why you must call
`Object.prototype.hasOwnProperty.call(dict, key)` rather than `dict.hasOwnProperty(key)`.

### CASES

- Constructor returns `{}` → that object wins · returns `5` → ignored, instance wins
- `myNew` on an arrow function → TypeError (arrows have no `prototype`, cannot construct)
- `"a" instanceof String` → `false` (primitive)
- `Object.create(null).toString()` → TypeError
- `[] instanceof Array` across an iframe → `false`

---

# FAMILY 7 — The Promise Machine

`MyPromise` · `all` · `allSettled` · `race` · `any`

### The intuition — a promise is a state machine with a mailbox

Three states, one irreversible transition, and a list of people waiting to hear.

```
        ┌──────────┐  resolve(v)  ┌───────────┐
        │ PENDING  │─────────────►│ FULFILLED │
        │          │              └───────────┘
        │ mailbox: │  reject(e)   ┌───────────┐
        │ handlers │─────────────►│ REJECTED  │
        └──────────┘              └───────────┘
              ▲
              └─ .then() while pending → post into the mailbox
                 .then() after settled → schedule immediately (still async!)
```

**The mailbox is the mechanism.** If `.then` is called while pending, the handler is *stored*.
When the promise settles, the stored handlers are drained. If `.then` is called after settling,
the handler is scheduled straight away — but **still asynchronously**.

### The core skeleton

```
constructor(executor):
  state = 'pending' ; value = undefined
  onFulfilled = [] ; onRejected = []

  resolve(v):  if state !== 'pending' → RETURN (write-once)
               state = 'fulfilled' ; value = v ; drain onFulfilled
  reject(e):   same shape, other list

  try { executor(resolve, reject) } catch (e) { reject(e) }
      ↑ executor runs SYNCHRONOUSLY, right now

then(onF, onR):
  return a NEW promise whose resolution depends on:
    - the handler's return value (a plain value → fulfils the new promise)
    - a returned thenable       → ADOPT it (chain to its outcome)
    - a thrown error            → rejects the new promise
    - a missing handler         → pass the value/reason straight through
  every handler invocation is scheduled as a MICROTASK, never called inline
```

### The four non-negotiables

**① State is written once.** Every `resolve`/`reject` after the first is a silent no-op. This is
what makes promises safe where callbacks are not: a buggy API that calls back twice cannot corrupt
a promise.

**② Handlers are ALWAYS async.** Even on an already-settled promise, `.then` schedules a microtask.
The spec guarantees this so that code ordering never depends on timing — you never get "sometimes
sync, sometimes async." Use `queueMicrotask` to reproduce it.

**③ `then` returns a NEW promise.** This is what makes chaining work at all. If it returned the
same promise, every `.then` in a chain would see the original value.

**④ Thenable assimilation.** Returning *anything* with a `.then` method causes adoption — it is not
special-cased to real promises. This is why `await` works on non-native promise libraries, and it is
the mechanism behind the "why did my object get awaited?" surprise.

### The combinators — all four are one counter pattern

```
all:        results[i] = v ; if ++done === n → resolve(results) ; ANY reject → reject
allSettled: results[i] = {status, value|reason} ; NEVER rejects
race:       first settle of either kind wins
any:        first FULFIL wins ; if all reject → AggregateError(errors)
```

**Depth — four things:**

- **Result order ≠ settle order.** Write into `results[index]`, never `results.push()`. Push gives
  completion order and is the classic bug.
- **Empty array:** `all([])` and `allSettled([])` resolve immediately. `race([])` and `any([])`
  hang forever (`any` arguably should reject). Know this — it is asked.
- **Non-promise values are wrapped** via `Promise.resolve(x)`, so `all([1, 2])` works.
- **Losers keep running.** `race` does not cancel anything — the losing fetch still completes. This
  is why `AbortController` exists, and it is why "race is a timeout" is only half true.

### CASES

- `resolve(1); resolve(2)` → value stays `1`
- Executor throws → the promise rejects (already handled by the try/catch)
- `.then` on a settled promise → still async; a `console.log` after it prints **first**
- Returning `{then(res){res(42)}}` from a handler → adopted, next `.then` gets `42`
- `Promise.all([])` → resolves `[]` · `Promise.race([])` → pends forever
- `all` where the 3rd resolves first → results still in **input** order
- `any` where all reject → `AggregateError`, with `.errors` in input order

---

## The seven skeletons, compressed to one page

Print this. It is the whole file.

| Family | Members | The one idea | The trap that proves you know it |
|---|---|---|---|
| **1 · Iterators** | map filter forEach find findIndex some every | One walk, seven accumulators | Holes: skipped by map/filter, **visited** by find |
| **2 · Folder** | reduce | Accumulator seeding | Empty + no initial → **TypeError** |
| **3 · Searchers** | includes indexOf | Comparison algorithm | SameValueZero finds `NaN`; `===` cannot |
| **4 · Shape-changers** | flat flatMap slice at from | Restructure, don't collect | `Array.from` has a **map-fn 2nd arg**; `Array(n).map` doesn't work |
| **5 · Binders** | call apply bind | Temp property forces `this` | `new (fn.bind(o))()` → **`new` beats bind** |
| **6 · Object makers** | new instanceof Object.create | Prototype linking | Constructor returning an object **overrides** the instance |
| **7 · Promises** | Promise all allSettled race any | State machine + handler mailbox | Handlers always async; **result order ≠ settle order** |

---

## How to drill these

1. **Never read the code first.** Read the skeleton, close the file, write it from the steps.
2. **Write the broken version first** for the named trap — run it, watch it fail, then fix it.
   The failure is what makes it permanent.
3. **Parity-test against native** in the runner. Passing your own hand-picked inputs proves nothing;
   the machine must compare your output to the real method's across every case listed.
4. **Say it out loud in under 90 seconds** — mechanism, one trade-off, the trap. If you cannot,
   you have memorised code, not understood a specification.
