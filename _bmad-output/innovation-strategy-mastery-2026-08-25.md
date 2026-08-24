# Innovation Strategy: React Prep Wizard — The Mastery Path

**Date:** 2026-08-25
**Strategist:** Devang
**Strategic Focus:** Prove nothing was lost in the consolidation to a single stream, repair what the port silently dropped, and give 202 units an information architecture that survives contact with a tired human at 6am.

**App:** `react-prep-wizard/` (repo root) — **not** `_drills/workbench/`.
**Method:** IS flow is primary. UX sections follow the `bmad-ux` EXPERIENCE.md spine (Information Architecture · Component Patterns · State Patterns · Interaction Primitives · Accessibility Floor · Key Flows).

---

## 0. PRESERVATION AUDIT — counted, not asserted

Eight pages were deleted and committed: `HomePage · CSS100Page · LadderPage · ChallengesPage · ArenaPage · MatchPage · RapidPage · TargetsPage`. **This was deliberate** — `main.tsx` redirects every legacy route to `/`, and the comment says so: *"The single unified stream is the home page now."*

So the question is not "were pages deleted" — they were, on purpose. The question is **"is the content those pages served still reachable?"**

### What survived

`masteryStream.ts` re-ports two of the six data modules at import time:

| Source | Items | Ported into the stream |
|---|---|---|
| `css100.ts` | 108 drills | **yes** → 108 `css_layouts` units |
| `ladder.ts` | 70 lessons | **yes** → 70 `css_layouts` units |
| `tracks/jsTraps.ts` | 4 | yes |
| `tracks/reactEcosystem.ts` | 3 | yes |
| hand-authored `coreUnits`/`reactUnits`/`practicalReactUnits` | 17 | yes |
| **Total live stream** | **202 units · 43 categories** | |

### What did NOT survive — and this is the real answer

**1. Four data modules are orphaned. Imported by nothing.**

| Module | Content | Status |
|---|---|---|
| `challenges.ts` | **6 React machine-coding builds** (Step Counter, Live Search Filter, …) with briefs, requirements, tags, progressive hints and full solutions | **unreachable** |
| `rapid.ts` | **21 rapid-fire questions** | **unreachable** |
| `battles.ts` | **7 battles** | **unreachable** |
| `targets.ts` | layout archetypes | **unreachable** |

**2. 178 of 202 units have a counterfeit solution.**

```
starterCode === solutionCode   →  178 units  (88% of the stream)
```

The CSS100 port sets both from `item.css` — **the unsolved file with the TODO comment still in it**. `item.sol`, which holds the actual answer, is on disk and referenced nowhere. Every "solution" for a CSS drill in this app is the problem restated.

**3. Field-level losses in the port:**

| Source field | Holds | Ported? |
|---|---|---|
| `item.sol` | the answer | **no** |
| `item.dia` | target diagram (and `DiagramView.tsx` still exists to render it) | **no** |
| `item.markup` | reference JSX | **no** |
| `item.verify` · `item.why` | how to check · why it matters | **no** |
| `item.use[1..]` | every requirement after the first | **no** — `specs` is one line, `Must use ${property}` |
| `lesson.base` | the harness CSS a ladder lesson needs to render correctly | **no** |
| `lesson.key` · `polish` · `before/after` · `bdiff/adiff` | takeaway, refinement, visual diff | **no** |

**4. Difficulty is fabricated.** `level` is assigned by array index — `idx < 30 ? 'Warm-up' : idx < 70 ? 'Core' : 'Advanced'`. It describes position in a list, not difficulty.

**5. Spec coverage collapsed:** 185 of 202 units carry exactly **one** spec line.

> **Verdict: the pages were retired on purpose, but the port that replaced them is lossy.** Nothing was deleted from disk. A great deal became unreachable or degraded — most seriously, 88% of the stream cannot show you a solution, because its "solution" is the problem.

---

## 1. Strategic Context

### Current Situation

One page, 202 units, 43 categories, three panes (Theory ↔ Code Crucible ↔ Spoken Defense), XP, confetti, seven track pills, a search box and collapsible categories. **The consolidation instinct was right.** The execution has three structural faults: a lossy port, an unbalanced curriculum, and an IA that stops scaling at about forty items.

### The composition problem — the one nobody has said out loud

| Track | Units | Share |
|---|---|---|
| **css_layouts** | **178** | **88%** |
| js_core | 6 | 3% |
| react_core | 6 | 3% |
| js_traps | 4 | 2% |
| react_practical | 4 | 2% |
| react_ecosystem | 3 | 1.5% |
| async_apis | **1** | 0.5% |

You are preparing for an **Accenture React lateral assessment**. Your "Unified Interview Mastery Engine" is **88% CSS**. Not because CSS matters most, but because CSS is what had 178 items sitting in a file ready to be ported. **The curriculum was shaped by what was easy to import, not by what the exam asks.**

### Strategic Challenge

> **The consolidation solved the wrong scarcity.** It merged eight *navigation surfaces* into one — but the scarcity was never surfaces. It was **retrieval, honesty, and balance**. One long list of 202 items, 88% of them CSS, 88% of them unable to show a solution, is not a unified engine. It is the same fragmentation stacked vertically.

---

## 2. MARKET ANALYSIS

*Frameworks: Competitive Positioning Map · Market Timing Assessment*

### Market Landscape

Unchanged from the parent strategy: one man, finite mornings, one dated assessment. What changed is **supply composition**. There are 202 units where ~40 would serve the exam better — and the 40 that matter most (React machine coding, JS traps, async) are the thinnest slices, while **6 finished React builds sit orphaned in `challenges.ts`**.

### Competitive Dynamics

The settled patterns for a 200-item library, and where this app sits:

| Capability | Settled pattern | Mastery Path today |
|---|---|---|
| Find by name | search field | ✅ title + hook + category |
| Narrow by kind | facet chips with counts | ⚠️ track pills only, **no counts** |
| Narrow by difficulty | facet | ❌ (and `level` is fabricated) |
| Narrow by progress | facet | ❌ |
| Reduce list height | collapsible groups | ✅ categories, but **43 of them** |
| Know how much is hidden | "N of M" + clear | ❌ |
| Escape an empty result | empty state with an exit | ⚠️ text only, no action |
| Two-level grouping | track → category | ❌ flat |

**NN/g's rule governs the whole pass:** *match user expectations; understand why a pattern works before applying it.* Every gap above is a settled pattern absent, not a novel one needed. **Innovate on the facets and on the honesty of the content. Copy the chrome.**

**uxpatterns.dev's distinction still binds:** Search Field vs Command Palette are chosen by intent. This app has a `CommandPalette.tsx` component **already sitting in `components/shared/` — imported by nothing.** Another orphan.

### Market Timing

- **`content-visibility: auto`** — a 202-row list needs no virtualiser.
- **Container queries + `cqi`** — the 18–20rem sidebar can restyle by its own width.
- **`:has()`** — style a group by what it contains (a track that has unfinished Crucible units) with no bookkeeping.
- **`text-wrap: balance`, `field-sizing: content`, `light-dark()`** — cheap polish that does not cost legibility.
- **React 2026:** the app runs `useDeferredValue` (good), but recomputes `MASTERY_UNITS.indexOf(u)` **per row per render**, and keys selection by **array index** into a global array — both break the moment the list is filtered or reordered.

### Critical Insights

> **Insight 1 — The port is the product's biggest lie.** 178 units promise a solution and show the problem. Once noticed, trust in the whole stream goes, including the 24 units that are honest.

> **Insight 2 — The content that fixes the curriculum imbalance is already written and orphaned.** 6 React builds + 21 rapid questions + 7 battles. Rebalancing needs **wiring, not authoring**.

> **Insight 3 — 43 flat categories is not grouping, it is a second list.** Grouping only pays when the group layer is *shorter than the item layer*. Seven tracks over 43 categories is the hierarchy the data already has and the UI throws away.

> **Insight 4 — Index-based selection is a latent bug, not a style issue.** `activeUnitIndex` points into `MASTERY_UNITS`; the sidebar recovers it with `indexOf` per row. Any sort, any reorder, any lazy-loaded track silently selects the wrong unit.

---

## 3. BUSINESS MODEL ANALYSIS

### Value Proposition Assessment

**Job:** *"In one place, take me from not understanding a concept, to writing it, to defending it out loud — and pick the concept that most improves my odds."*

The three panes serve the first three. **Nothing serves the fourth.** Unit order is import order; the only guidance is Next.

### Business Model Weaknesses

1. **Counterfeit solutions (178/202)** — the trust-destroying defect.
2. **Curriculum shaped by import convenience** — 88% CSS for a React exam.
3. **Orphaned content** — four modules, plus an unused CommandPalette.
4. **Fabricated difficulty** — `level` is array position.
5. **One spec per unit (185/202)** — the "Spec Checklist" pane has almost nothing to check.
6. **No progress-aware retrieval** — cannot ask for unfinished, weak, or React-only.
7. **Index-keyed selection** — breaks under any future ordering.

---

## 4. DISRUPTION OPPORTUNITIES

*Frameworks: Jobs to be Done · Blue Ocean ERRC*

### ERRC

| | |
|---|---|
| **Eliminate** | Counterfeit solutions. Fabricated `level`. Index-based selection. The 43-item flat category wall. |
| **Reduce** | CSS's 88% dominance — by *addition* of orphaned React/JS content, never by deleting CSS. |
| **Raise** | Spec fidelity (full `use` array). Diagram fidelity (`dia` + the `DiagramView` that already exists). Counts on every filter. |
| **Create** | **Two-level grouping (track → category)** · **facets with counts** (track · level · type · progress) · **saved views** · **"N of M" + clear** · **an empty state with an exit** · **exam-weighted ordering** |

### Unmet Jobs

| When… | I want… | Today |
|---|---|---|
| I have 40 minutes before an OA | the units that most move my odds | ❌ import order |
| I finish a CSS drill | to see the actual answer | ❌ shows the problem |
| I want React practice | to filter to React and JS only | ⚠️ pills, no counts, no combination |
| I am 60% through | to see only what is unfinished | ❌ |
| I want machine coding | the six builds already written | ❌ orphaned |
| I open the sidebar | to scan ≤10 things, not 43 | ❌ |

### Strategic White Space

> **An engine that is honest about its own content.** Every prep tool presents its library as uniformly ready. This one can *know* which units carry a real solution, a real diagram, and real specs — and say so. **Content-integrity as a first-class, filterable property** is a thing no product ships, because no product may admit its content is uneven. You are the only customer. You may.

---

## 5. INNOVATION OPPORTUNITIES

**H1 — Repair (truth before chrome)**
1. **Real solutions** — CSS100 units apply `item.sol` to the TODO line; ladder units use `polish`/`after` where present.
2. **Real specs** — full `use` array, not one line.
3. **Real diagrams** — carry `dia`, render with the existing `DiagramView`.
4. **Real ladder previews** — carry `lesson.base`; without it the harness renders wrong.
5. **Honest difficulty** — from the drill's own ID prefix, not array index.
6. **Carry `why` · `verify` · `key` · `markup` · `hints`.**

**H2 — Rebalance by wiring, not writing**
7. **`challenges.ts` → `react_practical`** (+6 machine-coding builds with requirements and hints).
8. **`rapid.ts` → a Rapid Recall track** (+21 MCQ units — the format already exists in `theory.mcq`).
9. **`battles.ts` → Crucible units** (+7).

**H3 — Retrieval**
10. **Two-level grouping** track → category, tracks collapsible, counts at both levels.
11. **Faceted toolbar** — track · level · type · progress, each with counts.
12. **Saved views** — *Unfinished* · *React & JS only* · *Crucible* · *Has real solution*.
13. **"N of M" + clear + empty state with an exit.**
14. **ID-keyed selection** replacing index-keyed.

---

## 6. STRATEGIC OPTIONS

### Option A: Fix the IA only
Search, facets, grouping, collapsibles. **Pros:** fastest; directly answers the brief. **Cons:** builds better navigation **to counterfeit content** — polishing the index of a book whose answers are wrong.

### Option B: Fix the port only
Real solutions, specs, diagrams, orphans wired. **Pros:** attacks the trust defect and the curriculum imbalance. **Cons:** 200+ honest units in a flat 43-category list are still unfindable; and wiring the orphans makes the list *longer*.

### Option C: Repair, rebalance, then retrieve *(recommended)*
All three, in that order. **Pros:** each stage makes the next worth doing — honest content, then more of the right content, then the means to find it. **Cons:** largest single pass; must resist finishing the chrome before the truth.

---

## 7. RECOMMENDED STRATEGY

**Option C. In order, and the order is the strategy:**

1. **Repair the port.** A navigation system over counterfeit content is a faster route to the wrong answer.
2. **Wire the orphans.** Rebalancing is a wiring job; the React content is already written.
3. **Build retrieval.** Two-level grouping, faceted toolbar with counts, saved views, honest empty state — and ID-keyed selection underneath it.

**Binding constraints:**

- **Additive only.** Nothing is deleted. Every repair *adds* a field the port dropped; every orphan wired *adds* units. **After this pass the stream must be strictly larger than before.** That is the preservation guarantee, made testable.
- **Copy the chrome, innovate the facets** (NN/g). No novel navigation metaphors.
- **Search field ≠ command palette** (uxpatterns.dev). The orphaned `CommandPalette` may be wired for *acts*; browsing stays in the sidebar.
- **Depth, not illusion.** The dark stream may keep its gradients and inset glow — a 6am tool cannot afford optical tricks that cost legibility. This is where "mindfuck" stops.

**Anti-portfolio (binding):** infinite scroll · drag-to-reorder · animated masonry · a second palette · tag clouds · AI search · deleting CSS units to rebalance.

### Key Hypotheses

- **H8 — The solutions were never checked.** If 178 counterfeit solutions went unnoticed, the solution pane was never used — which changes what to build next.
- **H9 — Rebalancing changes what gets studied.** Validate: after wiring, React/JS units' share of *attempts* exceeds their share of the *library*.
- **H10 — Two-level grouping is scanned; 43 flat categories were not.**

---

## 8. EXECUTION ROADMAP

**Phase 1 — Repair.** Real `sol`-applied solutions · full specs from `use` · `dia` carried · `lesson.base` carried · honest difficulty · `why`/`verify`/`key`/`hints`/`markup` carried.
**Phase 2 — Rebalance.** `challenges.ts` → react_practical · `rapid.ts` → Rapid Recall · `battles.ts` → Crucible. Track shares reported before and after.
**Phase 3 — Retrieve.** Two-level grouping · faceted toolbar with counts · saved views · N-of-M · clear · empty state with exit · ID-keyed selection · `content-visibility` on group bodies.

**Gate G7:** unit count after the pass **must exceed** 202. If it does not, something was lost and the pass has failed its own premise.

---

## 9. METRICS AND RISKS

### Leading Indicators
Share of attempts in React/JS tracks · units reached via facet or search vs via Next · groups kept collapsed · uses of *Unfinished*.

### Lagging Indicators
Total units (must exceed 202) · units with a real solution (must approach 202) · mean specs per unit (from 1.1) · time-to-first-keystroke after a unit switch.

### Decision Gates
**G7** — stream strictly larger than 202. **G8** — zero units where `starterCode === solutionCode` unless the drill genuinely has nothing to type. **G9** — if no facet beyond "all" is used within a week, cut the facets and keep search.

### Key Risks and Mitigation

| Risk | Mitigation |
|---|---|
| **Repair changes content the user trusted** | Additive only; solution is *derived* from `sol` applied to the existing starter, never hand-rewritten |
| **Wiring orphans makes the list longer, worsening findability** | Retrieval ships in the same pass — never wire without the facets |
| **A filter hides content and reads as loss** | Every filter defaults off; N-of-M and Clear always visible; empty state offers the exit |
| **Index-keyed selection breaks on filtering** | Move to ID-keyed selection before grouping changes order |
| **Visual ambition costs legibility** | Depth cues only; no optical illusions in a tool used under a clock |

---

_Generated using BMAD Creative Intelligence Suite — Innovation Strategy Workflow_
