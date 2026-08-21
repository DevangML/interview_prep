# The Dual-Track Battle Plan — One Pass, Three Altitudes
### Closes each topic for the **Mettl OA** and the **Technical Rounds** in a single pass
### Accenture · Custom Software Engineer (React.js) · ATCI-R1-S2060748 · Pune · 3+ yrs

> **Directive (Devang, 2026-08-20):** *"If a topic is opened it must finish to prepare that topic for OA
> and technical round together."*
> This document is the mechanism that makes that possible without doubling the work.

---

## PART I — THE REFRAME: ALTITUDE, NOT BREADTH

The instinct when told "prepare for two rounds" is to build two curricula. That instinct is wrong here, and
the reason is precise:

**The OA and the technical round test the same topics at different cognitive altitudes.**

| | Mettl OA | Technical Round |
|---|---|---|
| Demand | Recognise it · produce it to spec | Explain it · justify it · locate it in your work |
| Bloom level | Remember / Apply | Analyse / Evaluate |
| Failure mode | Too slow, missed edge case | Can't say *why*, can't say *when not*, no evidence |

Now the load-bearing asymmetry:

> **If you can defend a concept aloud — mechanism, trade-off, failure mode, where you shipped it — you can
> certainly pick it out of four options. The reverse is false.**
> **A3 subsumes A1. The interview layer is not extra work; it is the strongest available rehearsal for the OA.**

This is the whole strategy. The technical-round layer is not a tax on OA prep — it is how the OA material
becomes *durable* instead of crammed. Self-explanation and elaborative interrogation are among the most
reliable retention interventions known; "study for the interview" is simply the disciplined form of both.

### The one honest exception
A3 buys accuracy. It does **not** buy **speed**. The OA runs at 75–95 seconds per question, and explanation-
level mastery does not automatically compress to that. **Timed recognition stays a separate, cheap drill.**
Any plan that claims the interview layer covers everything is lying to you about the clock.

---

## PART II — THE THREE ALTITUDES

Every topic gets flown at three altitudes. **A topic is CLOSED only when all three pass.**

```
  A3  DEFEND     ▲   90 seconds, aloud, no notes.
      (interview)│   "Why does it exist? When would you NOT use it?
                 │    What breaks without it? Where did you ship it?"
                 │
  A2  BUILD      ▲   Blank file, on the clock.
      (both)     │   "Make it work. Now survive the edge cases."
                 │
  A1  RECOGNISE  ▲   80 seconds per question.
      (OA)       │   "Which is true? What does this print?"
```

- **A1 → A2 → A3 is the order you *learn* in.**
- **A3 → A1 is the order value *flows* in.** Each defense you rehearse hardens the recognition beneath it.
- **Never close a topic at A2.** A topic stopped at A2 passes the OA and dies in the interview.

---

## PART III — THE DEFENSE CARD (the one artifact that pays twice)

Every topic produces exactly one card. Five fields, five lines. Fourteen topics ≈ **one printable page.**

```
┌─ TOPIC ─────────────────────────────────────────────────────────┐
│ ① MECHANISM  One sentence, first principles. No jargon shield.  │
│ ② TRADE-OFF  When would you NOT use this? What does it cost?    │
│ ③ FAILURE    What breaks without it / what bug does it cause?   │
│ ④ SHIPPED    Where you actually used it. Name the file.         │
│ ⑤ NUMBER     One metric. Renders saved, ms, KB, rows.           │
└─────────────────────────────────────────────────────────────────┘
```

### Why field ③ is the clever one — it is bidirectional

Every OA trap is an interview question turned inside out. You author the artifact **once** and it pays in
**both** rounds:

| ③ FAILURE (one artifact) | Reads forward as an OA MCQ | Reads backward as an interview answer |
|---|---|---|
| `{items.length && <List/>}` prints `0` | *"What is rendered?"* | *"Tell me a subtle React bug you've hit."* |
| Mutating state skips the re-render | *"Why doesn't the UI update?"* | *"Why does React require immutability?"* |
| `useEffect([])` traps a stale `count` | *"What does it log after 3s?"* | *"What's the most common hooks mistake you see in review?"* |
| Index keys corrupt rows on delete | *"Which key is wrong here?"* | *"How do you decide what to use as a key?"* |
| Two `setState` calls yield +1, not +2 | *"What is `count` after `increment()`?"* | *"Explain React's batching."* |

**This is the engine of the whole plan.** You are not preparing two answer banks. You are preparing one
bank and reading it in two directions.

### Worked example

```
┌─ REFERENTIAL STABILITY (useCallback) ───────────────────────────┐
│ ① A new function literal is a new heap reference every render,   │
│   so React.memo's shallow compare sees a changed prop.          │
│ ② Not free — it costs a cache slot + a deps array to maintain.  │
│   Below ~50 children, the memo bookkeeping outweighs the win.   │
│ ③ Without it, a memoized child re-renders on every parent tick  │
│   even though nothing it displays changed.                      │
│ ④ FleetPulse Nexus — the telemetry row callbacks in the 10k     │
│   virtualized grid; without it the whole viewport re-rendered.   │
│ ⑤ Dropped the grid from ~10,000 to ~40 committed nodes per tick.│
└─────────────────────────────────────────────────────────────────┘
```

---

## PART IV — THE FOUR DOUBLE-DUTY LAWS

1. **One trap, two directions.** Never write an interview answer that isn't already an OA trap, or vice versa.
2. **One build, two rounds.** The Tier S task you build for the OA *is* your machine-coding rehearsal. Don't
   build a separate "interview version" — build it once, then narrate it aloud while you build it again.
3. **One project, every ④ field.** All SHIPPED evidence comes from one codebase. A panel that hears five
   stories from one system believes you own it. Five stories from five systems sounds like a résumé.
4. **A polyfill belongs to its topic, not to a backlog.** If a polyfill teaches the concept a quest is about, it is a *challenge inside that quest* — never a label, never deferred. Only orphans go to the Arena.
5. **One page, one taper.** The Defense Cards collapse into the single revision sheet you read before *both*
   the OA and every interview. If a card doesn't fit the page, the topic isn't compressed enough yet.

---

## PART V — THE ALTITUDE MAP

Per quest: what A3 adds on top of the A1/A2 work already defined in `9_CODING_ROUND_PLAYBOOK.md`.

| Quest | A3 — DEFEND (the 90-second answers you must own) | Also unlocks |
|---|---|---|
| **Q1** Identity & Immutability | Why React requires immutability · structural sharing · cost of deep clone · what "pass-by-sharing" really means | — |
| **Q2** Execution Model | Explain closures to a junior · what a stale closure is and how you'd spot it in review · `this` binding rules | **Polyfills (tracked challenges C2.3–C2.5):** `memoize`, `myBind`, infinite currying |
| **Q3** Async & Event Loop | Microtask vs macrotask, with an ordering example · why `async/await` is not a new machine · how you cancel in-flight work | **Polyfills (tracked challenges C3.3–C3.5):** `Promise.myAll`, `.myRace`, `.myAllSettled`, `debounce`, `throttle` |
| **Q4** React Core | Reconciliation and the O(n) heuristic · why index keys break · render vs commit phase · why render must be pure | Machine-coding scale-up |
| **Q5** Hooks | Rules of Hooks *and the call-order reason* · `useMemo` vs `useCallback` cost/benefit · when a custom hook is the right extraction | **Polyfills (tracked challenges C5.4–C5.5):** `useDebounce`, `useFetch`, `usePrevious` |
| **Q6** Redux / RTK | Context vs Redux vs Zustand — pick one and defend it · what middleware actually is · **when NOT to add Redux** | — |
| **Q7** ES6 | Where destructuring hurts readability · named vs default exports and tree shaking | — |
| **Q8** Router | Why a deep-link refresh 404s without a server rewrite · protected-route patterns · route-level code splitting | — |
| **Q9** DOM & Events | Event delegation · why React pools/attaches at the root · when you reach for a real DOM ref | Vanilla machine coding |
| **Q10** Build Tooling | A bundle-size story: what you measured, what you split, what it saved · tree shaking preconditions | — |
| **Q11** React 19 | The `"use client"` boundary · when SSR is worth it · what hydration mismatch actually costs | — |
| **Q12** HTML/CSS | Your responsive strategy · when flexbox loses to grid · one a11y thing you fixed | — |

**Rule:** the A3 column is worked **in the same session** as that quest's A1/A2. Not batched to the end.
Batching defenses is how you end up with a plan you never execute.

### A3 is not one checkbox — it is 35 tracked defenses

The column above summarises; the save state holds each defense **individually**, with a `must_mention` list
that functions exactly like a build's `edge_cases`:

```
D5.1  "State the Rules of Hooks — and the reason."
      must_mention: top level only, no conditions/loops
                    React functions only
                    reason: hooks are matched by CALL ORDER, not by name
      tick only if: spoken aloud · under 90s · every item appeared UNPROMPTED
```

**Why:** a single boolean per quest can be ticked having rehearsed one answer out of three. Same failure
mode as a polyfill that was only a label — one level down. If a `must_mention` item is missing, the defense
is **not done**, and the coach names the specific item you missed rather than accepting the gist.

---

## PART VI — THE ARENA (interview-only surface, no OA counterpart)

Four things the OA will never test and the panel certainly will. These have no topic to attach to, so they
are their own quests — and they are correctly scheduled **in the gap between the OA and the tech rounds.**

### ARENA-1 · The Polyfill Forge — *orphans + speed rehearsal only*
> **Corrected 2026-08-20.** Polyfills were originally parked here wholesale. That broke the close condition:
> `Promise.all` is an *async* topic and belongs to Q3, `myBind` and currying belong to Q2's `this`/closure
> work. Deferring them to a post-OA quest meant opening a topic without finishing it.
> **Topic-attached polyfills are now tracked challenges inside their own quest** and are done WITH the topic.

This quest keeps only what has **no topic to attach to**, plus the rehearsal that matters most:
`myMap`/`myFilter`/`myReduce` · `flatten` (recursive + iterative, with depth) · `deepClone` (circular refs) ·
`groupBy`/`chunk` — and then **A1.5: three polyfills drawn at random from the FULL set, 10 minutes each,
blank file.** Random draw under time is how an interview actually presents them; practising them grouped by
topic is not the same skill.

**Unlock: Q5 CLEARED — not gated on the OA**, unlike ARENA-2/3/4.

> Evidence: polyfills are consistently named as the frontend-specific technical surface, and Accenture
> interviewers are reported probing **JS internals, output puzzles, `var`/`let`/`const`, hoisting**.

### ARENA-2 · Machine Coding at Scale
The OA build is 20–25 min. The interview build is **60–90 min** and is judged on component decomposition,
state minimality, prop/callback clarity, a11y and readability — not just "does it work."
Targets: nested comments (recursion) · autocomplete with a real API · sortable + paginated data table ·
file explorer from JSON · multi-step form with validation.

### ARENA-3 · Frontend System Design (domain-lite — **lateral-only**)
Per your own `COMPANY_ROUND_STRUCTURES` research, system design appears **only for lateral hires and stays
domain-lite** at this tier. So: no distributed-systems theatre. Four scenarios, all frontend:
component architecture for a large form · the data layer (Context vs store vs server-cache, staleness,
invalidation) · the silent 401 JWT-refresh mutex queue · performance remediation for a slow dashboard.

### ARENA-4 · Project Deep-Dive & the Managerial Round
Your research is unambiguous that at this tier the **project deep-dive is decisive** and there is usually a
**separate managerial round on Agile / JIRA / SDLC**. Build: a 90-second and a 3-minute FleetPulse narrative
told without looking at code · the five ④/⑤ stories · ownership, debugging-in-production, deadline and
cross-team answers in STAR form.

---

## PART VII — FLEETPULSE NEXUS COMES BACK — AS EVIDENCE, NOT AS BUILDING

It was parked for a correct reason: zero MCQ transfer. That reasoning **does not extend to the technical
rounds**, where it is the single most valuable asset you own — a real system at Level 4 covering telemetry
streams, custom hooks with `AbortController`, dual-engine state, routing, portals, and a 10k virtualized grid.

**The change is what you do with it. You MINE it, you do not EXTEND it.**

- Every Defense Card's **④ SHIPPED** and **⑤ NUMBER** is sourced from FleetPulse. Name the actual file.
- **No new features before the OA.** Reading your own code to extract stories is A3 work; writing new code is
  a different activity wearing the same clothes.
- After the OA, ARENA-4 turns the mining output into the narrative.

---

## PART VIII — THE HONEST COST MODEL

No hand-waving. Here is what dual-track actually costs.

| Layer | Added time | Runs when |
|---|---|---|
| A1 + A2 (the existing OA plan) | ~17 h | **Now**, per `9_CODING_ROUND_PLAYBOOK.md` |
| **A3 layer on the 12 topic quests** | **+5 h** (~+30%) | **Now — inside the same session as its quest** |
| ARENA 1–4 | +10–12 h | **After the OA, before the tech rounds** |
| **Total** | **~32–34 h** | |

**Read the schedule carefully — this is the part that makes it feasible.** The A3 layer is what your
directive demands, and it is cheap because it rides on comprehension you are already building. The Arena is
genuinely new surface, but it is also genuinely *later*: the tech rounds are downstream of an OA you have not
sat yet. Front-loading Arena work is optimising a round you may not reach.

> **If the OA date is close, run A1+A2+A3 and defer the Arena entirely.**
> A3 is non-negotiable — it is what closes a topic. The Arena is schedulable.

---

## PART IX — ROUND-SHAPE INTEL (what you are actually walking into)

**Accenture React lateral:** OA → **two technical rounds** → HR. Reported content: JavaScript and React
concepts, fundamentals, problem-solving and *practical application scenarios*; JS internals and output-based
puzzles; `var`/`let`/`const` scoping and hoisting; performance optimisation, async data handling and routing.
React questions are described as **"not theoretical — practical, scenario-driven, requiring explanation of
real production solutions."** Rated 2.9/5 difficulty, ~53 days median for React roles.

**Cross-referenced against your own tier research** (`INTERVIEW_REALITY_2026`, `COMPANY_ROUND_STRUCTURES`, n=14):
- The **rapid-fire breadth viva** is the main filter at this tier — **HIGH confidence, verified.** → that is A3.
- The **project deep-dive is consistently decisive.** → that is ④/⑤ and ARENA-4.
- **DSA is a hygiene gate, not a differentiator**, and at Accenture specifically "DSA questions were very
  limited." → do not grind LeetCode. One easy/medium array-string-hashmap, solved cleanly out loud.
- **System design is lateral-only and domain-lite.** → ARENA-3 stays frontend, stays shallow.
- A **separate managerial round on Agile/JIRA/SDLC** is common at this tier. → ARENA-4.

**Translation: this is a conversation you must sound fluent in, not an exam you must out-compute.**
That is exactly what A3 trains and what a pure OA plan never touches.

---

## PART X — HOW THIS FAILS (name it so it doesn't)

| Failure | Signature | Prevention |
|---|---|---|
| **Batching the defenses** | "I'll do all the A3s at the end" | A3 runs in the same session as its quest. A quest with an open A3 is an open quest. |
| **Silent defense** | Reading the card and nodding | **A3 is spoken, aloud, timed, no notes.** Reading is not rehearsal. Record it if nobody's home. |
| **Fabricated ④** | A SHIPPED field you can't open the file for | If you can't name the file, the field is empty. Empty is honest; invented dies under one follow-up. |
| **Arena creep** | Polyfills feel productive and infinite | The Arena is locked until the OA is sat. Do not open it early. |
| **Rebuilding FleetPulse** | "Just one more feature for the story" | Mining ≠ building. No new features before the OA. |
| **Losing the clock** | Great answers, 3 minutes each | A3 is capped at **90 seconds**. Over 90s in an interview is a monologue, and panels stop listening. |

---

## THE CLOSE CONDITION (paste this above your desk)

> **A topic is not done when I can pass its MCQs.**
> **A topic is done when I can recognise it in 80 seconds, build it from blank on the clock, and defend it
> out loud in 90 seconds with a trade-off, a failure mode, and a file I actually wrote.**

**Sources:** `_bmad-output/research/market/INTERVIEW_REALITY_2026.md` · `_bmad-output/research/market/COMPANY_ROUND_STRUCTURES.md` · `_bmad-output/research/react-2026-mastery-and-interview-strategy.md` · [Accenture React Developer — Glassdoor](https://www.glassdoor.co.in/Interview/Accenture-React-Developer-Interview-Questions-EI_IE4138.0,9_KO10,25.htm) · [freeCodeCamp — Preparing for React technical interviews](https://www.freecodecamp.org/news/prepare-for-react-technical-interviews/) · [GreatFrontEnd — Machine Coding Round](https://www.greatfrontend.com/blog/machine-coding-round)
