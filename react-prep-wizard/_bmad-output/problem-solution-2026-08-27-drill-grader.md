# Problem Solving Session — CSS Drill Grader & Content Integrity

**Facilitator:** BMad CIS Problem Solving · **User:** Devang · **Date:** 2026-08-27
**Category:** Technical — assessment-harness correctness

---

## 1. Problem Definition

### Initial problem (as reported)
Three symptoms, reported as separate complaints:
1. Drill GRID-07 says "Item 2 spans two columns and leaves a hole" — the diagram shows no hole.
2. Drill #46 (FLEX-11) fails on correct code, with only `outline-*` mismatches.
3. The AI judge produces a self-contradictory justification for that failure.

### Refined problem statement (Problem Statement Refinement)
> **The workbench asserts things about the learner's code and about CSS that are not true.**
> Two independent falsehood sources: a *drill whose premise its own CSS cannot produce*,
> and a *grader that manufactures a difference the learner did not write*. The judge is
> not a third source — it is downstream of the second.

**Gap:** current = learner is told they are wrong when they are right, and is shown a
picture that contradicts the task text. Desired = a failure means a real defect, and a
diagram depicts the state the task names.

**Why worth solving:** this is interview-prep. A false negative teaches the learner to
distrust correct knowledge — the exact opposite of the product's purpose. It is worse
than no feedback.

### Success criteria
- SC1 — `margin-left: auto` on #46 passes, in a **focused** browser window.
- SC2 — GRID-07's CSS actually produces a hole, and the diagram shows before → after.
- SC3 — No drill can fail on a property the learner never authored.
- SC4 — The judge cannot be handed an unexplainable failure and rationalise it.

---

## 2. Problem Boundaries (Is / Is Not Analysis)

| Dimension | IS | IS NOT |
|---|---|---|
| **Where** | Drills containing a focusable element (`a[href]`, `button`, `input`) | Drills built from `div`s — the large majority |
| **When** | Only when the **browser window has focus** | Not in an automated/unfocused window — where it silently passes |
| **What** | `outline-color / style / width / offset` — all four together | Never geometry; never a layout property |
| **Who** | Every learner, deterministically | Not intermittent — not flakiness |

**Pattern revealed by the boundaries:** the failing property family is exactly the family
the *user agent* controls on focus, and the trigger condition is *window focus*. That pair
points away from the learner's CSS entirely and at focus state in the harness.

**This boundary analysis is also the explanation for the previous session's error.** I
tested #46 in an automation window that never had focus, saw it pass 6/6, and concluded
the drill was fine. The Is/Is-Not cell "when does it NOT happen" was the missing evidence.

---

## 3. Root Cause Analysis

### Five Whys — Defect A (#46 false negative)

1. **Why does #46 fail?** Reference and attempt disagree on `outline-*` on the first anchor.
2. **Why do they disagree?** The attempt's anchor matches `:focus-visible`; the reference's does not.
3. **Why only the attempt's?** `grader.ts` calls `focusFirst(refDoc)` then `focusFirst(attDoc)`.
4. **Why does the second call break the first?** **Focus is a singleton in the browser.** One
   element in one document holds it. The second `focus()` evicts the first.
5. **Why does that surface as a failure?** `outline-*` sits in `ALWAYS_COMPARED`, so a
   UA-controlled focus ring is diffed on every drill whether or not the drill teaches focus.

> **Root cause A:** the harness tries to hold focus in two documents at once — impossible —
> and then compares the one property family that focus changes.

**Empirical proof (measured, not reasoned):** after both `focus()` calls,
`activeElement === anchor` is `false` for the reference and `true` for the attempt.
Asymmetric, deterministic, independent of window focus. When the window *is* focused,
`:focus-visible` follows that asymmetry and paints `outline: auto` on the attempt only.

### Five Whys — Defect B (GRID-07 invisible hole)

1. **Why is no hole visible?** The diagram draws row 1 as full.
2. **Why does it draw it full?** Because that is what the CSS produces.
3. **Why?** Grid is `repeat(3, 1fr)`; `:nth-child(2)` spans 2. Item 1 → col 1, item 2 → cols 2–3. Row 1 is exactly full.
4. **Why does the task claim a hole?** A hole needs the spanning item to *not fit* in the
   remaining track — which requires two items ahead of it, not one.
5. **Why did this survive?** Nothing validates a task's prose against its own CSS.

> **Root cause B:** the drill's premise is false for its own stylesheet. `grid-auto-flow:
> dense` is a **no-op** here, so the drill "passes" while teaching nothing. The diagram is
> honest; the task text is not.

### Defect C (judge confabulation) — Systems Thinking

The judge is not independently broken. Its prompt already says the harness is "unverified
telemetry" and offers a `TEST_HARNESS_FALSE_NEGATIVE` category. The dynamic:

```
grader emits impossible fact ──▶ judge must explain a failure with no cause in the code
        ▲                                    │
        │                                    ▼
        └──── learner loses trust ◀──── judge invents a cause ("a spacer element is required")
```

The invented reason **inverted the spec's negation** — the task says *without* a spacer;
the judge said a spacer *is required*. And all four "impartial pillars" returned the same
paragraph, so the cross-check that was supposed to catch this collapsed into one voice.

> **Root cause C:** an explain-the-failure framing with no licensed escape hatch at the
> point of pressure. Fixing A removes most of the pressure; the prompt needs hardening so
> the remaining pressure has somewhere honest to go.

### Contributing factors
- `ALWAYS_COMPARED` grew by accretion; no criterion for what belongs in it.
- No invariant that a compared property must be one the learner can author.
- Verification ran in an unfocused window — the one environment that hides Defect A.

---

## 4. Forces & Constraints

**Driving:** defects are cheap to fix and fully understood; deterministic reproduction exists.
**Restraining:** `focusFirst` was added deliberately (drills may teach focus styles) — a
careless fix silently drops that capability.

**Primary constraint:** focus cannot be symmetric across two live documents. Any fix must
either measure them **at different times** or **not depend on real focus**.

**Assumed vs real constraint:** "the frames must be compared side by side" is *assumed* —
nothing requires the two reads to be simultaneous. Breaking that assumption dissolves the problem.

---

## 5. Solution Options

| # | Option | Verdict |
|---|---|---|
| 1 | Delete `focusFirst` | Rejected — silently removes focus-style drills |
| 2 | Blur both documents | Rejected — same capability loss, less honest |
| 3 | **Focus each frame immediately before reading it** | **Selected** — restores symmetry, keeps capability |
| 4 | **Drop `outline-*` from `ALWAYS_COMPARED`; keep it opt-in** | **Selected** — defence in depth |
| 5 | Synthetic `.is-focused` class instead of real focus | Rejected — no longer tests the real selector |
| 6 | Give GRID-07 a stylesheet that truly holes | **Selected** |
| 7 | Two-panel before/after diagram | **Selected** — directly answers "I can't visualise it" |
| 8 | Judge: forbid asserting a requirement without quoting the spec | **Selected** |
| 9 | Judge: name the focus-ring-only signature as a harness tell | **Selected** |

---

## 6. Recommended Solution

**Sequential measurement (3) + opt-in outline (4) + a truthful GRID-07 (6,7) + judge negation guard (8,9).**

Rationale: (3) attacks root cause A at the mechanism rather than the symptom, and preserves
the reason `focusFirst` exists. (4) enforces the missing invariant — *never always-compare a
property the learner cannot author*. (6)+(7) make the drill's premise true and visible.
(8)+(9) harden the last line of defence without relying on it.

**Residual concern:** a drill that opts into `outline` *and* has multiple focusable elements
still measures only the first. Acceptable — no current drill does this.

---

## 7. Implementation

1. `grader.ts` — extract `snapshot()`; focus ref → read ref → focus att → read att; compare snapshots.
2. `grader.ts` — remove the four `outline-*` entries from `ALWAYS_COMPARED`.
3. `css100.ts` GRID-07 — move the span to `:nth-child(3)`; correct the task prose; two-panel diagram.
4. `prompts.ts` — negation-preservation rule + focus-ring-only harness tell + distinct-pillars rule.

## 8. Validation

- V1 — activeElement symmetry probe in a real browser.
- V2 — #46 with `margin-left: auto` passes.
- V3 — full 108-drill regression: no drill's own reference solution fails.
- V4 — GRID-07 with and without `dense` produce *different* layouts (proves the hole exists).

**Adjustment trigger:** if V3 shows a drill relying on `outline` in `ALWAYS_COMPARED`, restore it via that drill's own `use` list rather than globally.

## 9. Lessons

- **A green test in the wrong environment is not evidence.** The unfocused automation window
  hid the only condition under which the bug appears. "Passes for me" needed the Is/Is-Not
  question *when does it not happen* before it could be trusted.
- **Never always-compare a property the learner cannot author.** That single invariant would
  have prevented Defect A outright.
- **A confabulating judge is usually a symptom.** Look upstream for the impossible fact it
  was asked to explain before hardening the judge itself.
