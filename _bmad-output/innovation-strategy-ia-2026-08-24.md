# Innovation Strategy: React Workbench — Information Architecture

**Date:** 2026-08-24
**Strategist:** Devang
**Strategic Focus:** Make ~250 pieces of learning content findable, groupable and filterable without adding a single new drill — and prove that nothing was lost in the process.

**Companion:** [innovation-strategy-2026-08-24.md](innovation-strategy-2026-08-24.md) (the parent strategy: Exam Mode, objective grading, spaced repetition).
**Method note:** UX structure follows the `bmad-ux` EXPERIENCE.md spine (Information Architecture · Component Patterns · State Patterns · Interaction Primitives · Accessibility Floor · Key Flows). The IS flow is primary; the spine is the skeleton of its UX sections.

---

## 0. PRESERVATION AUDIT — "was anything lost?"

Counted, not asserted. The workbench is **untracked by git**, so no diff exists; the audit is by inventory against the pre-React source of truth (`_drills/css100.js`).

| Check | Result |
|---|---|
| Drill IDs in the legacy vanilla source | **108** |
| Drill IDs in the React data module | **108** |
| In legacy but missing from React | **none** |
| In React but not in legacy | **none** |
| Per-drill fields intact (`id·title·cat·task·goal·why·use·hints·dia·jsx·css·sol·markup`) | **108/108 on every field** |
| Data modules present | css100 · ladder (70 lessons) · challenges · rapid · targets · battles — all present, all non-empty |
| Pages present | 9/9 — Home, CSS100, Arena, Challenges, Ladder, Playground, Targets, Match, Rapid |
| Store capabilities | `filter · viewMode · hudActive · measureMode · suggestionsOn · timer · campaign · resetTimer · setCampaign` — **all retained** |

**One correction to the record.** The workbench displayed **109** drills. It was never 109. `src/data/css100.ts` contained an array elision (`}\n,\n,\n{`) between ANT-03 and XTRA-01, so `items.length` counted a hole that held nothing. The legacy source has 108. **The count went down because a phantom was removed, not because content was.**

**Two capabilities were replaced rather than removed, and both are reversible:**

1. `solvedMap: boolean` → `schedule` (SM2). The legacy `localStorage['css100:done']` key is **read for migration and never deleted**; the old data is still on disk.
2. "Mark Solved" → **override**, still one click, still in Practice mode, now logged as `review_override`.

**Exam Mode hides; it does not delete.** app.css tab, Before/After, HUD, hints, reference solution, spec checks — all present and unchanged in Practice. Verdict: **no content lost.**

---

## 1. Strategic Context

### Current Situation

The instrument now measures honestly. What it cannot do is **help you choose**. Content inventory:

| Surface | Items | Existing structure | Existing findability |
|---|---|---|---|
| CSS 100 | **108 drills** | 18 categories | one `<select>`; one flat scrolling column |
| Ladder | **70 lessons** | 9 stages | flat list |
| Challenges | React builds | `level` (Warm-up/Core/…), `time`, `tags` | flat list |
| Rapid Fire | quiz bank | `cat` | none |
| Targets / Arena / Match | archetypes, 14 quests, 33 challenges | quest gating | none |

Roughly **250 addressable items behind one dropdown and a lot of scrolling.**

### Strategic Challenge

The parent strategy said the instrument must answer *"what is the single highest-value rep right now?"* The scheduler answers that for **one** case — the drill it picks for you. Every other intent is unserved:

> *"the flexbox one about auto margins"* · *"everything I have failed twice"* · *"container queries, but only the ones I have never touched"* · *"whatever uses `minmax`"*

Each of those is a **facet query** against content that already carries the facets — `cat`, difficulty-by-ID, `use` properties, `tags`, `level`, schedule status. **The metadata exists. The retrieval does not.**

> **The challenge, stated once: the workbench has a library's worth of content and a filing cabinet's worth of navigation.**

---

## 2. MARKET ANALYSIS

*Frameworks: Competitive Positioning Map · Market Timing Assessment*

### Market Landscape

The market remains one man's hours. But this pass has a **measurable unit of waste**: time between *deciding to study* and *making the first keystroke*. Today that is scroll-and-squint through 108 titles in an 16rem column. Call it 30–90 seconds per switch, several switches a session. It is small, constant, and — worse than its cost — it is the **friction that decides whether the session starts at all.**

### Competitive Dynamics

Every serious content tool solved this a decade ago, and the patterns are settled:

| Tool | Pattern it settled |
|---|---|
| LeetCode | faceted list — difficulty × topic × status, persistent, counted |
| Anki | saved searches over a decaying deck |
| VS Code / Linear / Raycast | **command palette** for *acts*, **filter field** for *browsing* — two different jobs |
| Notion / Jira | collapsible groups with counts and sticky headers |
| macOS Finder / Gmail | facet chips that show what is active and offer one-click clearing |

**NN/g's rule applies directly:** *"Match user expectations — use familiar patterns based on user mental models, not design preference,"* and *"understand why a pattern works before applying it to new contexts."* This is explicitly **not** the place to innovate on form. **Innovate on the facets; copy the chrome.**

**uxpatterns.dev draws the line I need:** *Search Field vs Command Palette* are separate patterns chosen by **user intent**. The workbench already has the palette (⌘K, an *act* surface: grade, switch mode, jump). It is missing the **browse** surface. Using the palette for browsing would be the misapplication NN/g warns about — a pattern repurposed for a different function.

### Market Timing

Three enablers landed since this app's patterns were set:

- **`content-visibility: auto`** — skip rendering off-screen list sections at zero library cost. A 108-row list no longer needs a virtualiser.
- **Container queries + `cqi` units** — the sidebar can restyle itself by *its own* width, not the viewport's. The drill list works at 16rem and at 30rem without a media query.
- **`:has()`** — style a group by what it contains ("this category has a leech in it") with no JavaScript bookkeeping.

Plus the React 2026 baseline this app already half-adopts: **React Compiler** (on), **`useDeferredValue`** (used for compilation, not yet for search), and **selector-scoped store subscriptions** (not adopted — see the model weakness below).

### Critical Insights

> **Insight 1 — The facets already exist as data; only retrieval is missing.** `cat`, ID-prefix difficulty, `use` property names, `tags`, `level`, `time`, and now schedule status are all in the objects. Building search here is *exposing* structure, not creating it.

> **Insight 2 — Two intents, two surfaces, one existing mistake to avoid.** ⌘K is for *doing* and *jumping when you know the name*. A filter field is for *browsing when you do not*. Cramming browse into the palette would break the mental model NN/g says to protect.

> **Insight 3 — The store is a re-render hazard the moment search exists.** `CSS100Page` destructures the **entire** zustand store, so every keystroke of telemetry re-renders the page and its 108-row list. Search-as-you-type would make this visible. **Fix the subscription before adding the feature that exposes it.**

> **Insight 4 — Grouping without collapsing is not grouping.** 18 category headings in one column is 18 more things to scroll past. Groups only reduce load when they can be **closed and remembered**.

---

## 3. BUSINESS MODEL ANALYSIS

### Value Proposition Assessment

**Job:** *"Get me to the right rep in under five seconds, from any intent I might arrive with."*

Intents observed in the content's own shape, and whether they are servable today:

| Intent | Facet it needs | Today |
|---|---|---|
| "the one about auto margins" | free text over title + task | ❌ |
| "everything due" | schedule status | partial (Next due picks one; cannot *see* the set) |
| "my leeches" | lapses ≥ 3 | ❌ |
| "hard grid problems" | difficulty × category | ❌ (category only) |
| "anything using `minmax`" | `use` property text | ❌ |
| "untouched container queries" | status × category | ❌ |
| "React drills tagged useState" | `tags` | ❌ |

### Business Model Weaknesses

1. **One-dimensional filtering.** A single `<select>` for `cat` — the crudest facet, and mutually exclusive with every other question.
2. **No text search anywhere in the app.** 250 items, zero search fields.
3. **No collapse, no memory.** Every visit re-presents everything at full height.
4. **Counts absent at the point of decision.** The list shows names, never "12 due here".
5. **Whole-store subscriptions.** Every telemetry keystroke re-renders the whole page (Insight 3).
6. **No empty state.** Filter to nothing and you get silence — the classic dead end NN/g's heuristics call out.

---

## 4. DISRUPTION OPPORTUNITIES

*Frameworks: Jobs to be Done · Blue Ocean ERRC*

### ERRC Grid

| | |
|---|---|
| **Eliminate** | The lone category `<select>`. The undifferentiated 108-row column. |
| **Reduce** | Vertical scrolling as the primary navigation act. Time-to-first-keystroke. |
| **Raise** | Counts everywhere. Status legibility (held / due / leech / untouched at a glance). Keyboard reach. |
| **Create** | **Faceted filter bar** · **free-text search across title, task and the tested properties** · **collapsible groups with memory** · **a saved-view row** ("Due", "Leeches", "Never attempted", "Failed last time") · **a result-count-and-clear affordance** · **empty states that offer the way out** |

### Unmet Jobs → Surfaces

| When… | I want… | Surface |
|---|---|---|
| I have a vague memory of a drill | to type three words and find it | search field, debounced, matching title + task + `use` |
| I want to work a weakness | to see every failing drill in one place | saved view: **Leeches** |
| I have 20 minutes | to see only what is due | saved view: **Due** |
| I am exploring | to open one category and close the rest | collapsible groups, state remembered |
| I want to know if I am progressing | counts per group, not a global number | per-group `held/total` with status dots |

### Strategic White Space

Not a new pattern — **the honest combination of settled ones**: facets that reflect *a decaying schedule* rather than a static done-flag. LeetCode filters by "Solved". Nothing filters by **"solved, but decayed since"**. That facet only exists because the parent strategy built the scheduler. **The IA is where the scheduler becomes visible.**

---

## 5. INNOVATION OPPORTUNITIES

### Initiatives (H1 — all shipped this pass)

1. **`useLibrary` hook** — one search/facet/group/collapse engine, content-agnostic, reused by every list surface. Debounced query via `useDeferredValue`; memoised predicates.
2. **`LibraryToolbar`** — search field (`⌘/` to focus, Esc to clear), saved-view chips, facet chips with counts, "N of M" result count, one-click **Clear**.
3. **`CollapsibleGroup`** — native `<details>`/`<summary>` semantics, sticky header, count badge, status dots, open/closed persisted per surface. `content-visibility: auto` on the body.
4. **Faceted CSS 100 list** — status × difficulty × category × free text over title/task/`use`.
5. **Faceted Challenges list** — level × tags × text.
6. **Faceted Ladder** — stage groups, done/undone, text.
7. **Empty state with an exit** — names the query and offers Clear.
8. **Selector-scoped store subscriptions** — the perf precondition.

### Business Model Innovation

From *"a list of everything"* to **"a queryable library with a memory."** The unit of value shifts from *content owned* to *content reachable in one intent*. Consistent with the parent strategy: adding drills has near-zero value; making the existing 108 addressable has compounding value.

---

## 6. STRATEGIC OPTIONS

### Option A: Search Only
One text field per surface. **Pros:** smallest change, solves the "vague memory" case. **Cons:** leaves every status/difficulty intent unserved; does nothing for scroll load.

### Option B: The Queryable Library *(recommended)*
Search + facets + saved views + collapsible groups with memory + counts + empty states, on one reusable engine across all list surfaces. **Pros:** serves every observed intent; one engine, three-plus surfaces; makes the scheduler *visible*; all patterns are settled ones (NN/g-compliant). **Cons:** touches every list component; requires the store-subscription fix first.

### Option C: Palette-Only Navigation
Push all browsing into ⌘K. **Pros:** nothing new to build. **Cons:** **misapplies the pattern** — palettes serve recall, not exploration; punishes exactly the moment when you do not know what you want.

---

## 7. RECOMMENDED STRATEGY

**Option B.** Sequenced so each step is safe:

1. **Selector-scoped subscriptions** (precondition — do not ship search onto a page that re-renders wholesale).
2. **`useLibrary` + `LibraryToolbar` + `CollapsibleGroup`** — the engine and its chrome, once.
3. **CSS 100 first** (the surface with 108 items and the richest facets), then Challenges, then Ladder.
4. **Empty states and counts everywhere** — non-negotiable; a filter that can return nothing must say so and offer the exit.

### Design constraints, binding

- **Copy the chrome, innovate the facets.** No novel interaction metaphors. NN/g: patterns must match existing mental models.
- **Two surfaces, two jobs.** ⌘K stays the *act* surface; the filter bar is the *browse* surface. Never merge them.
- **Default to everything.** Every filter starts inert; a fresh visit shows the full library. **Filtering must never be able to hide content permanently** — this is the preservation guarantee made structural.
- **State is remembered but visible.** Collapsed groups and active facets persist, and persisted state must be *obvious* on return, never a silent filter.
- **Accessibility floor:** native `<details>` semantics, `aria-live` result count, visible focus rings, full keyboard reach, no hover-only affordances.

### Anti-portfolio (out of scope, binding)

Drag-to-reorder · custom scrollbars · animated masonry · infinite scroll (NN/g: fails precise navigation) · a second command palette · tag clouds · AI-suggested search · "mindfuck" visual effects that cost legibility. **Depth cues yes; optical tricks no** — this is a tool used at 6am under time pressure.

### Key Hypotheses

- **H5 — Search beats scrolling.** Validate: after a week, drill switches initiated from search/facets exceed switches by scrolling.
- **H6 — Collapse is used.** Validate: if group state never changes from default, collapsing was decoration.
- **H7 — "Leeches" becomes the most-used saved view.** If true, the scheduler and IA are compounding as designed.

---

## 8. EXECUTION ROADMAP

**Phase 1 — the engine (this pass).** Selector-scoped subscriptions · `useLibrary` · `LibraryToolbar` · `CollapsibleGroup` · CSS 100 fully faceted · counts · empty states · `⌘/` search focus.
**Phase 2 — spread.** Challenges (level × tags) · Ladder (stage groups) · Rapid (category) — same engine, no new concepts.
**Phase 3 — earned only by usage data.** Saved custom queries; cross-surface search; `view-transition` group animation. **Only if H5/H6 hold.**

---

## 9. METRICS AND RISKS

### Leading Indicators
Time-to-first-keystroke after a drill switch · share of switches originating from search or a facet chip · number of groups kept collapsed · uses of the **Leeches** view.

### Lagging Indicators
Session start rate (does less friction mean more sessions?) · drills attempted per session · due-queue drain rate.

### Decision Gates
**G5** — if after one week no facet other than "all" is ever used, the facets were wrong; keep search, cut the rest.
**G6** — if any list render regresses perceptibly on typing, the subscription fix failed; fix before adding surfaces.

### Key Risks and Mitigation

| Risk | Mitigation |
|---|---|
| **Filters hide content and it reads as data loss** | Every filter defaults to off; result count and **Clear** always visible; empty state names the query and offers the exit |
| **Persisted state confuses on return** | Active facets always rendered as visible chips — never invisible state |
| **Re-render cost on every keystroke** | Selector-scoped subscriptions + `useDeferredValue` + `content-visibility: auto` |
| **Pattern novelty for its own sake** | Anti-portfolio above; settled chrome only |
| **Scope creep into a design system** | Three components. No more. |

---

_Generated using BMAD Creative Intelligence Suite — Innovation Strategy Workflow_
