# ADAPTIVE LEARNING SYSTEM — "Self-Healing Prep Engine"
**Forged for {{USER_NAME}} · {{DATE}}**

> _Template. GENESIS tunes the {{PLACEHOLDERS}} to the user's config, writes it to `<output_folder>/ADAPTIVE_LEARNING_SYSTEM.md`, then deletes this template._
> Not a static plan — a **control loop**: sense what actually happened, compare to plan, diagnose drift, re-plan, roll over at cycle boundaries. Nothing gets it by surprise.

## 0 · The Loop
```
SENSE (daily log) → COMPARE (plan vs actual) → DIAGNOSE (RAG) → ADAPT (re-plan) → ROLLOVER at cycle boundary
```
Daily: SENSE + COMPARE (5 min). On any AMBER/RED: DIAGNOSE + ADAPT. At cycle end (or forced by an interview): ROLLOVER.

## 1 · Study budget (from config: {{HOURS_WEEKDAY}}h weekday / {{HOURS_WEEKEND}}h weekend, {{WORK_MODE}})
- **New-concept intake caps ~4h/day** (deliberate-practice quality ceiling). Extra time → **distributed practice + retrieval reps + mocks**, not more cramming.
- **~70% retrieval/practice, ~30% new intake.**
- **{{N}} distributed blocks/day** (morning intake · midday practice · evening retrieval+review) — distributed > massed.
- **SM2 spacing has a CALENDAR FLOOR** — more daily hours buy depth + earlier readiness + buffer, not a shorter calendar.
- **Interleaving**, morning-recall/evening-intake, protected sleep (7+h), **leech rule** (fail 3× → switch resource/angle).
- **6 study days + 1 light consolidation day/week** (review + mock only). Non-negotiable.

## 2 · Daily log (SENSE) — 6 fields, 5 min/night
`hours · covered · recall% (cold, yesterday) · confidence 1–10 · blockers · energy(fresh/ok/fried)`

## 3 · Drift detection (COMPARE → RAG per track)
- 🟢 GREEN: on/ahead AND recall ≥ 80%
- 🟡 AMBER: 1–2 behind OR recall 60–80% OR fatigue 2 days
- 🔴 RED: 3+ behind OR recall < 60% OR blocked OR burnout
- **Readiness gauge (0–100)** updates daily from track RAG + pass-bar.

## 4 · Adaptation (ADAPT)
| Signal | Response |
|---|---|
| 🟢 ahead | pull next block forward / add mock; bank wins to spaced-review-only |
| 🟡 behind (time) | compress lowest-ROI item; add review; protect sleep; **don't add hours** |
| 🟡 low recall | shift to retrieval; re-review before new intake |
| 🟡 fatigue | force the light day; cut one block |
| 🔴 blocked | leech rule (new angle); park it; keep other tracks moving |
| 🔴 far behind | fallback split OR early rollover |

## 5 · Rollover ("add another cycle, adjust smartly")
Snapshot MASTERED (recall ≥80% at +7d) / SHAKY / UNTOUCHED → bank mastered to maintenance → carry shaky+untouched → re-sequence (weakest × hardest-gated × soonest-interview) → reset horizon + buffer → **calibrate next cycle to MEASURED velocity** (problems/day, retention rate). The system learns its own pace.

## 6 · Nothing-by-surprise
Buffers (1 light day/week + end buffer) · recall as a **leading** indicator · live readiness gauge · pre-computed fallback splits (7/15/full) · **interview-trigger protocol** (any real date → matching split + greenlight mock immediately).

## 7 · Coach mode ({{ENCOURAGEMENT_MODE}})
When the log shows "fried" or recall craters, coaching shifts to **recovery before new material** — burnout is a system failure, not a virtue. Encouragement rendered per config: {{scriptural anchor | secular reframe | minimal}}.

## 8 · Default daily template (adjust from log)
- ☀️ intake block ({{~2h}}) · 🌤️ practice block ({{~2h}}) · 🌙 retrieval + spaced review + log ({{~1.5h}})
- Light day ×1/week: review + one mock, zero new material.
