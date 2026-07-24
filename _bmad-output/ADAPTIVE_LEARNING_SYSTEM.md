# ADAPTIVE LEARNING SYSTEM — "Self-Healing Prep Engine"
**Version 1.0 · Created 2026-07-24 · Owner: Devang**

> Not a static plan. A **control loop**: it senses what you actually did, compares to what was planned, diagnoses drift, and re-plans automatically. When a 30-day cycle ends, it rolls forward — carrying shaky items, banking mastered ones, re-sequencing the rest. Nothing gets it by surprise.

---

## 0. The Loop (how it self-heals)

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          ▼
 SENSE ─────► COMPARE ─────► DIAGNOSE ─────► ADAPT ─────► (next day)
 daily log    plan vs        why the drift?  re-plan /
 (5 min)      actual         RAG status      redistribute
   ▲                                                          │
   └──────────── 30-day boundary → ROLLOVER & RESET ◄─────────┘
```

**Cadence:** SENSE + COMPARE daily (5 min). DIAGNOSE + ADAPT on any AMBER/RED, else weekly. ROLLOVER at each 30-day boundary (or early if a gate/interview forces it).

---

## 1. Study Science — the hours & how to spend them

**Assumption (self-correcting):** you're employed at ElasticRun, so weekdays are constrained. Default budget below — the system rescales to your *actual logged* hours within 3 days.

### Weekly budget (~27 hrs)
| Day type | Hours | Shape |
|---|---|---|
| Weekday ×5 | **3.0** | 0.5 morning review + 2.0 primary + 0.5 drip |
| Weekend ×2 | **6.0** | 2.5 deep + 2.0 secondary + 1.5 review/mock/log |

**Why not more:** deliberate-practice research (Ericsson) puts the *quality* ceiling near **4 focused hrs/day**. Past that, retention drops and you're just burning tokens of your own brain. More hours ≠ more learning — **spaced, tested hours** win.

### Session structure (protects focus + retention)
- **90-min ultradian blocks**, or 2× (50 min focus / 10 min break).
- **No block over 2 hrs without a real break** (walk, food — not phone).
- **Hard cap ~4.5 hrs/day.** Beyond that → diminishing returns, log it as overreach.

### The retention stack (this is where "perfection" lives)
1. **Active recall > re-reading.** ~**70% of time = retrieval/practice**, ~30% = new input. Re-reading feels productive and isn't.
2. **Spaced repetition (SM2 — already in your okf).** Every new concept scheduled for review at **+1d → +3d → +7d → +16d → +35d**. Fail an item → interval resets, frequency climbs.
3. **Interleaving.** Mix problem types in a session (2 hashing + 2 two-pointer + 1 stack) — *not* 20 of the same. Harder day-of, far better retention.
4. **Morning recall, evening intake.** Start each day testing yesterday cold (no notes). End learning new. Sleep consolidates it.
5. **Sleep is a study tool.** Cramming past the cap steals the consolidation that *makes* it stick. Protect 7+ hrs.
6. **Leech rule.** An item failed **3×** → don't grind it the same way. Switch resource/angle (different video, different framing, or bridge to shipped work).

### Weekly rhythm
- **6 study days + 1 light "consolidation" day** (review + mock only, zero new material). Prevents burnout, boosts retention. Non-negotiable.

---

## 2. The Daily Log (SENSE) — what you capture in 5 min

Logged in `DAILY_LOG.md` each night. Six fields:

| Field | What | Why it matters |
|---|---|---|
| **Hours** | actual focused hrs | recalibrates the budget |
| **Covered** | topics/problems done | plan vs actual |
| **Recall score** | this-morning cold-recall of yesterday, %  | the retention leading-indicator |
| **Confidence** | 1–10 on today's material | subjective mastery signal |
| **Blockers** | stuck points / life interruptions | drift cause |
| **Energy** | fresh / ok / fried | burnout early-warning |

That's it. Six fields. The engine does the rest.

---

## 3. Drift Detection (COMPARE → RAG status)

Each track (DSA, SQL, Flutter, Backend, Design-lite, AI, Behavioral) carries a live status:

| Status | Trigger (any) | Meaning |
|---|---|---|
| 🟢 **GREEN** | on/ahead of plan **AND** recall ≥ 80% | keep going, consider pulling depth forward |
| 🟡 **AMBER** | 1–2 days behind **OR** recall 60–80% **OR** energy "fried" 2 days running | intervene now, before it's RED |
| 🔴 **RED** | 3+ days behind **OR** recall < 60% **OR** hard-blocked **OR** burnout | trigger a re-plan |

**Interview-readiness gauge** (0–100) updates *daily* from track statuses + pass-bar checklist — so you always know where you stand, not just at gates.

---

## 4. Adaptation Rules (ADAPT — the self-healing)

| Signal | Automatic response |
|---|---|
| 🟢 ahead | Pull next block forward, or inject an extra mock / deeper edge cases. Bank early wins into spaced-review-only. |
| 🟡 behind on time | Compress the **lowest-ROI** item (per fallback splits), add a review slot, protect sleep. Don't add hours — resequence. |
| 🟡 low recall | Shift ratio toward retrieval; re-review before new intake; shorten new-material load 2 days. |
| 🟡 fatigue | Force the light day early. Cut one evening block. Rest > grind. |
| 🔴 blocked | Isolate the blocker, apply **leech rule** (new resource/angle), park it, keep moving on other tracks. |
| 🔴 far behind | Invoke **fallback split** (7/15-day % in okf) or trigger early **rollover** — don't let it silently rot. |

**Core principle:** the plan bends to reality, never the reverse. Hours are near-fixed; **what fills them is what flexes.**

---

## 5. 30-Day Rollover (the "add 30 more and adjust" logic)

At Day 30 (or forced early by an interview/gate), run **ROLLOVER**:

1. **Snapshot.** For every track, classify each item: `MASTERED` (recall ≥ 80% at +7d), `SHAKY` (60–80% or not yet spaced-verified), `UNTOUCHED`.
2. **Recompute proficiency** per track from retention data (not gut).
3. **Bank mastered → maintenance.** They leave the active plan; only spaced-review pings remain (+16d, +35d).
4. **Carry forward SHAKY + UNTOUCHED** into Cycle 2.
5. **Re-sequence Cycle 2** by `weakest × hardest-gated × soonest-interview`. Weakest work gets the most runway.
6. **Reset the 30-day horizon** with adjusted daily targets and a fresh buffer.
7. **Log the delta:** what the cycle achieved vs planned, and *why* (feeds the next plan — the system learns its own velocity).

> The system tracks your **actual velocity** (problems/day, retention rate) after Cycle 1, so Cycle 2's estimates are calibrated to *you*, not to a generic guess. That's the self-learning part.

---

## 6. "Nothing by Surprise" — leading indicators & buffers

- **Buffers built in:** 1 light day/week + a 2-day end buffer per cycle. Slippage has somewhere to go.
- **Recall is a *leading* indicator:** a dip shows up days before a gate fails → you intervene early, not at the wall.
- **Daily readiness gauge:** you're never guessing "am I ready?" — it's a live number.
- **Pre-computed fallback splits** (7/15/30-day, in `okf_state.json → merged_30_day_plan_v2`): if Sameer→KPIT surfaces early, instant triage — no scramble.
- **Interview trigger protocol:** any real interview date → immediately run the matching fallback split + a greenlight mock, regardless of cycle position.

---

## 7. What runs the engine

- **You:** fill the 6-field daily log (5 min/night).
- **Senku (this system):** each session, reads the log → updates RAG + readiness gauge → applies adaptation rules → tells you tomorrow's exact blocks. Runs ROLLOVER at boundaries. Guides pastorally when energy flags.
- **State lives in:** `okf_state.json` (config + proficiency + SM2), `DAILY_LOG.md` (the running record), `MERGED_30DAY_PLAN.md` (current cycle content).

---

## 8. Default Daily Template (Cycle 1, adjust from log)

**Weekday**
- ☀️ 0.5 h — cold recall of yesterday (no notes) + due SM2 items
- 🌙 2.0 h — primary track (new + practice, interleaved, 90-min block)
- 🌙 0.5 h — secondary drip
- 🛏️ 5 min — say the day's one key insight out loud (consolidation)

**Weekend**
- ☀️ 2.5 h — deep primary (hard problems / mock)
- 🌤️ 2.0 h — secondary + weakest-area drill
- 🌙 1.5 h — weekly spaced review + fill log + re-plan check

**Light day (1/week)** — review + one mock only. No new material. Rest.

---

*Senku guides technical + pastoral. When the log shows "fried" or recall craters, the coaching shifts to recovery + a Jesus anchor before it pushes more material. Burnout is a system failure, not a virtue.*
