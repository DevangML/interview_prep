# Parked Tracks — Resume Ledger

> Written 2026-09-04 on Devang's instruction: *"save the current react, js path"* before the
> Dart + Flutter pivot. Nothing here is deleted. Everything here is **resumable from disk** —
> no state lives only in an agent's session memory. See
> [[agent_stale_context_drift]] for why that rule exists.

---

## ⚠️ READ THIS FIRST — park terms, confirmed 2026-09-04

**These tracks are paused until Monday 2026-09-08, not abandoned.** Devang's words on the
park: *"react study is only paused till monday for now, I am going to study irrespective of
job later."* React/JS study resumes Monday regardless of what happens with Accenture.

**Reason for the park:** an **LTIMindtree Flutter role** opened. Fri 4 → Sun 6 Sep is a
3-day Dart + Flutter sprint. See
`_bmad-output/planning-artifacts/research/technical-dart-flutter-3yoe-research-2026-09-04.md`.

**Still unresolved — do not let this rot.**
`_bmad-output/proving_ground/SAVE_GAME_STATE.json → active_campaign.dates` records:

| Event | Date on record | Confidence |
|---|---|---|
| Accenture Mettl OA | **2026-09-05** | `"5th or 6th — confirm with Sameer"` (captured 2026-08-31) |
| Technical round | **2026-09-10** | captured 2026-08-31 |

Devang said the Accenture track is paused; he did **not** confirm the OA was sat, moved or
cancelled. **The 2026-09-10 technical round is still on record and is 6 days out.** Confirm
with Sameer and write the answer here before Monday.

---

## TRACK A — React / Mettl OA campaign  (`METTL_OA_2026`)

**Status at park:** UNSTARTED past the first quest.

| Field | Value |
|---|---|
| Save state | `_bmad-output/react_crucible/SAVE_GAME_STATE.json` (schema v2, last_updated 2026-08-20) |
| Requisition | ATCI-R1-S2060748 · Pune · React.js 3+ yrs · **lateral, not fresher** |
| Platform | Mercer Mettl, proctored. 19–40 MCQ / 45–60 min + a confirmed coding question |
| Progression | **17 / 1840 XP · rank Initiate** |
| Quests | 18 total — 1 UNLOCKED, 17 LOCKED · 64 challenges defined |
| Current assignment | `WORKBENCH_LADDER` (started 2026-08-21) |
| Activity log | `_bmad-output/react_crucible/ACTIVITY_LOG.jsonl` (last write 2026-08-24) |
| Workbench DB | `_bmad-output/react_crucible/app.db` |
| Manifest | `_bmad-output/react_crucible/CRUCIBLE_MANIFEST.md` |

**Known defect carried into the park:** the workbench's regex spec-checks are counterfeit —
a green check does not mean a correct solution. Do not trust any stored "solved" count until
the objective grader is run. See [[workbench_exam_mode_and_grader]].

**Subject config:** `_bmad-output/teach_me/subjects/react.yaml` (unchanged, 14 KB).

---

## TRACK B — Live Ops Console  (`live_ops_console`) — the JS-heavy build

**Status at park:** authored, zero code written.

| Field | Value |
|---|---|
| Save state | `_bmad-output/proving_ground/SAVE_GAME_STATE.json` |
| Project root | `/Users/devang/Desktop/live_feed_console` (exists, empty of build) |
| Progression | **0 XP · rank Initiate · current quest F01 (Feed Ingestion Layer)** |
| Quests | 15 total — 2 available, 13 locked |
| Coverage | **0 / 360 product rows closed** (444 total = 360 product + 77 kata + 7 out) |
| Supersedes | the Proving Ground drill tool, rejected 2026-08-31 |

**Docs (all authored, all current):**

- `_bmad-output/proving_ground/FEATURE_MAP.md` + `feature_map.json`
- `_bmad-output/proving_ground/SYLLABUS.md` (87 KB, 444 rows)
- `_bmad-output/proving_ground/POLYFILLS.md` (21 polyfills / 7 families)
- `_bmad-output/proving_ground/ARCHITECTURE.md`, `COVERAGE_PROOF.md`, `PARALLEL_BUILD.md`
- `_bmad-output/proving_ground/REACT_DELTA.md`, `SYLLABUS_CHECKLIST.md`
- Change proposal: `_bmad-output/planning-artifacts/sprint-change-proposal-2026-08-31.md`

**Open question never answered** (`prompts_for_user → feed_choice`): which live feed —
transit positions, seismic events, market ticks, or air quality. F01 cannot start until
Devang picks one. All four satisfy the architecture identically.

**Binding rules that survive the park:** the coach never writes an implementation body;
every syllabus row needs file+symbol evidence at three altitudes before it closes.

**Subject config:** `_bmad-output/teach_me/subjects/vanilla.yaml` (unchanged, 13 KB).

---

## TRACK C — supporting assets (not campaigns, just don't lose them)

| Asset | Path |
|---|---|
| React Prep Wizard app | `react-prep-wizard/` (244 units, faceted navigator) |
| Drills workbench | under `projects/react/FleetPulse Nexus/docs/mettl_prep/_drills/` |
| FleetPulse Nexus | `projects/react/FleetPulse Nexus` — parked as **evidence mine**, not a build |
| Mettl syllabus research | `_bmad-output/research/technical-mettl-react-oa-research-2026-08-25.md` |

---

## Resume procedure

1. Reconcile the OA date collision above.
2. `_bmad-output/teach_me/config.yaml → default_subject` — set back to `react` (Track A)
   or `vanilla` (Track B). It is the single switch that re-points the coach.
3. Read that track's `SAVE_GAME_STATE.json` from **disk**. A recalled plan never outranks it.
4. For Track B, answer `feed_choice` first.

## Park procedure that was applied

- Nothing moved, nothing deleted, no save state edited.
- Working tree was clean at park (HEAD `3c990f2`); only `custom-mcps/` untracked.
- `default_subject` flip to the Dart/Flutter subject happens only once that subject file
  exists — an unresolvable `default_subject` would break `/teach-me` for every track.
