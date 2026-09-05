---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - cs-museum/PROJECT-CONTEXT.md
  - cs-museum/docs/ANSWER-CONTRACT.md
  - cs-museum/docs/TRANSFORMATION-BOUNDARY.md
  - cs-museum/README.md
  - cs-museum/corpus/authored/ (18 authored concepts)
project_name: "CS Museum → Concept Atlas (presentation layer redesign)"
user_name: "Devang"
date: "2026-09-05"
facilitator: "Aamir (UX)"
---

# UX Design Specification — CS Museum → Concept Atlas

**Author:** Devang
**Date:** 2026-09-05
**Facilitator:** Aamir (UX Designer)

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

An evidence-led learning reader that lets an experienced engineer acquire a new language by understanding its *forced choices* rather than its syntax. Entry is language-first (paradigm-grouped cards); depth is per-feature (a navigable graph with ancestry, descent, and cross-language siblings). It replaces a 3D "museum" metaphor that made the user a tourist with an edtech progression that makes them a student.

### Target Users

Primary: a ~3 YOE software engineer preparing for technical interviews across several languages (Dart/Flutter, React/JS, systems). Expert-level technical literacy; desktop-first; long focused sessions; keyboard-comfortable. Arrives with a deadline and a specific language, not with idle curiosity.

### Key Design Challenges

1. **Provenance paradox** — the ANSWER-CONTRACT requires six evidence fields per record (who said this, authority 1–10, confidence, reasoning chain, exhaustiveness, further research), while the user explicitly requires a simpler surface. Evidence must be expressed as felt confidence with the full envelope one deliberate click away.
2. **Honest emptiness** — 5,168 of 5,200 language cells are `unknown`. Cards imply substance; the design must make unverified state legible without shame or noise, never letting scaffolding read as content.
3. **Axis inversion** — the corpus is clustered by problem; the requested IA is language-first. Language cards are a derived view pivoted from `byLanguage`, not a stored entity.
4. **Legibility over atmosphere** — the current glassmorphic surface (translucent panels, `backdrop-blur-3xl` over near-black) reads as sci-fi HUD and taxes sustained reading. Solid, high-contrast ground is required for study.

### Design Opportunities

1. **Language-first entry matches arrival intent** — learners arrive with a language and a deadline, not a taxonomy.
2. **Prev/next converts browsing into a path** — the single strongest signal separating an edtech experience from an exhibition.
3. **Borrowing edges carry narrative** — cross-language lineage ("Swift inherited ARC's problem from Objective-C") is both true and memorable, turning a comparison table into a story that survives an interview.
4. **Honest confidence as a differentiator** — surfacing evidence quality is rare in learning tools and directly serves interview preparation, where knowing what you *don't* firmly know is a real advantage.

### Open Assumption (flagged, not yet confirmed)

"Sibling" is taken to mean **cross-language siblings** (same problem, different language — Rust ownership → Swift ARC → C++ RAII → Java GC), which is the higher-value lateral move for interview preparation. Taxonomic siblings (concepts sharing a parent) are supported as a secondary relation. To be confirmed with the user.


## Core User Experience

### Defining Experience

The product is **traversal, not reading**. The atomic unit is a *concept-in-a-language* (e.g. "Dart · Garbage Collection"), and the defining act is moving between related units without losing place:

- **Down** — into what this actually uses to work (`empowered_by`)
- **Up** — into what it is a kind of (`inheritsFrom`)
- **Sideways** — into how another language answered the same problem (`byLanguage`)

The sideways move is the product's reason to exist: it converts a list of features into a comparison, and a comparison into a durable mental model. A user who has taken that step three times can reason about a language they have never used.

### Platform Strategy

- **Web, desktop-first.** Mouse + keyboard; long focused sessions; `⌘K` command palette.
- **2D only.** WebGPU/three.js is removed from the reading experience. Rationale: it is the primary source of the complexity the user rejected; it rendered a black screen on load (camera bounds never reset between towers — bedrock spans y≈−80..145 while the programming tower spans y≈−31..61, and the camera stayed at y=140); it excludes low-power devices; and a 3D scene cannot express prev/next ordering. Feature graphs are 5–15 nodes and are better served by inline SVG with real, selectable text.
- **Optional future view.** A spatial "orbit the whole atlas" mode may return as a secondary lens. It must never be the front door.
- **Offline-capable.** Corpus ships as static JSON; once loaded, the reader works without network — deliberately useful on interview day.
- **Responsive to tablet.** Phone is a stretch goal, not a target.

### Effortless Interactions

1. **Knowing where you are.** A breadcrumb that never lies: `Paradigm › Language › Feature`.
2. **Knowing what's next.** Prev/next always present within a language's feature sequence.
3. **Stepping sideways.** Cross-language comparison is a primary control, always visible on a feature — never a tab, never a hidden panel.
4. **Getting back.** Browser back, breadcrumb, and `Esc` all do the obvious thing.
5. **Jumping anywhere.** `⌘K` reaches any language or concept in two keystrokes.
6. **Reading.** Solid backgrounds, real contrast, comfortable measure. Reading is the job; it should never be work.

### Critical Success Moments

| Moment | What must happen | Failure mode being designed against |
|---|---|---|
| **First load** | Every paradigm and language visible and clickable, instantly | The museum's black screen — nothing to click, no orientation |
| **First language open** | Its features listed, with honest coverage state visible | A grid of cards implying content that isn't verified |
| **First feature open** | What it does · what it cost · who did it differently — all above the fold | A placard that restates the title in longer words |
| **The lateral click** | Two languages' answers to one problem, side by side | Comparison buried in a table the user never reaches |
| **Return visit** | Land back where you were; the path is still legible | Losing place, which converts a learner into a wanderer |

### Experience Principles

1. **Every screen answers three questions: where am I, what's here, where next.** This is the anti-museum rule. A screen that cannot answer all three is unfinished.
2. **Solid ground, not glass.** Legibility outranks atmosphere. Translucency, blur and low-contrast surfaces are removed wherever text must be read.
3. **Evidence is felt as confidence, not read as metadata.** One honest signal on the surface; the full six-field envelope one deliberate click away. Never hidden, never shouted.
4. **Never dress scaffolding as content.** Unverified records must *look* unverified. With 5,168 of 5,200 cells unknown, this is a correctness requirement, not a nicety.
5. **Lateral is first-class.** The cross-language step is a primary control with permanent screen real estate, because it is the interaction that teaches.
6. **Complexity must be earned by the learner's need, never by the renderer's ambition.**


## Desired Emotional Response

### Primary Emotional Goals

**Primary: grounded confidence.** The feeling of holding a *model* rather than a pile of facts — "I could reason about this language in a room, under questioning, without notes." *Grounded* is the operative word: confidence resting on visible evidence, not on the product's tone of voice.

**Secondary: momentum.** At every point the user knows there is a next thing and what it is. Momentum converts a browsing session into a study session.

**Tertiary: recognition** (the insight moment). The quiet click when two languages' answers resolve into one question. Produced by the *content*; the interface stages it and gets out of the way.

### Emotions to Avoid — named explicitly

| Avoid | Why it is a live risk here |
|---|---|
| **Admiration without competence** | The prior 3D museum was impressive and taught nothing. For a learning tool, "that looks amazing" without "I understand it" is a failure state, not partial success. |
| **Overwhelm** | An infinite floating scene with 121 simultaneous nodes and no entry point. Bounded screens are an emotional requirement, not merely a layout one. |
| **Suspicion** | The user has twice been handed artifacts that looked finished and were empty. Trust is currently the scarcest resource in this project. |
| **Gamified condescension** | Streaks, confetti and celebration would insult an expert user under real time pressure. |
| **Drift** | Wandering without progress — the museum's dominant end state. |

### Emotional Journey Mapping

| Stage | Desired feeling | Design consequence |
|---|---|---|
| **First load** | Oriented | Every paradigm and language visible, bounded, instantly clickable |
| **Choosing a language** | Purposeful | Card shows real scope and honest coverage before entry |
| **Scanning features** | Capable | Countable features; visible sequence; no infinite scroll |
| **Reading one feature** | Grounded | Does / outcome / price above the fold, on solid ground |
| **The lateral click** | Recognition | Two answers side by side, no navigation cost |
| **Hitting an unverified record** | Respected, not cheated | Honest unknown state, styled as pending work, never as content |
| **Returning next day** | Continuity | Place preserved; path legible |
| **In the interview** | Recall | Narrative lineage is what survives; design privileges it |

### Micro-Emotions

Ranked by criticality for this product and user:

1. **Trust vs. Skepticism** — *highest priority.* Damaged by prior filler artifacts; repaired only by visible evidence and honest gaps, never by polish.
2. **Confidence vs. Confusion** — the product's entire purpose.
3. **Momentum vs. Drift** — the museum/edtech dividing line.
4. **Accomplishment vs. Frustration** — closure at the end of a language, not an endless surface.
5. **Calm vs. Anxiety** — the user arrives anxious; the interface must not add to it.

### Design Implications

| Emotion | UX approach |
|---|---|
| Grounded confidence | Solid opaque surfaces, definite type hierarchy, no translucency behind text. Nothing floats. |
| Trust | Evidence signal on every concept; source links beside mechanisms; `unknown` rendered as honest pending state with a visible denominator ("11 of 26 languages verified"). |
| Momentum | Persistent prev/next; position indicator within a language ("4 of 9"); breadcrumb that never lies. |
| Recognition | Cross-language comparison as side-by-side answers to one stated question — the question always visible above the answers. |
| Calm | Bounded screens with a beginning and an end. No infinite canvas. Generous measure, restrained motion. |
| Anti-overwhelm | Progressive disclosure in exactly three levels — paradigm → language → feature. Never four. Never one. |

### Emotional Design Principles

1. **Competence over admiration.** If a choice makes the product more impressive but not more understood, it is cut. This principle exists because the prior version failed it.
2. **Honesty is a trust-building feature, not an apology.**
3. **The reward is the insight, never the interface.** No gamification, no celebration, no streaks.
4. **Calm is a feature.** The user arrives anxious; atmosphere and spectacle increase cognitive load.
5. **Never let the user drift.** Every screen offers an obvious next move, or it is unfinished.


## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Exercism** — closest existing analogue to the requested IA.
- Language tracks as cards; open a track → finite concept list → concept detail page.
- Card states scope *before* entry ("N concepts, M exercises"), preventing surprise oceans.
- Lesson: the card is a *promise about size*, not just a link.

**caniuse.com** — the model for honest coverage, and the highest-value borrow.
- Renders yes / partial / unknown / no as visually distinct, emotionally neutral states.
- Trained a generation to read partial support without anxiety.
- Directly solves this project's hardest problem: 5,168 unknown cells that must be legible without reading as failure or as content.

**MDN Web Docs** — the model for the reading surface.
- Solid ground, high contrast, no atmosphere; trusted rather than admired.
- Compatibility data sits *inside* the prose, not behind a tab — evidence at point of use.
- Lesson: for reference material, trust beats beauty, and the two are not in conflict.

**Obsidian local graph** — the right pattern, with a required correction.
- "Local graph around the current note" is precisely the requested per-feature graph view.
- **Anti-pattern in its global force-directed view:** layouts re-simulate on every open, so nodes never occupy the same position twice and no spatial memory can form.
- Correction adopted: deterministic layout — current node centre, ancestry above, descent below, siblings lateral. Same concept renders identically every time.

**Duolingo** — adopt the path, reject the gamification.
- The visible sequential path is the strongest "there is a next thing" signal in consumer edtech.
- Streaks, confetti, XP and celebration are rejected: condescending to an expert user under genuine time pressure (see Emotional Design Principle 3).

### Transferable UX Patterns

**Navigation**
- *Track-card grid* (Exercism) → paradigm-grouped language cards, each declaring scope and coverage.
- *Finite ordered list* (Exercism/Duolingo) → a language's features as a countable sequence with position ("4 of 9").
- *Local graph* (Obsidian, corrected) → per-feature relationship view with deterministic placement.
- *Command palette* (Linear, VS Code) → `⌘K` jump to any language or concept.

**Interaction**
- *Inline compatibility table* (MDN/caniuse) → cross-language comparison rendered in the flow of the concept, never behind a tab.
- *State legend* (caniuse) → one consistent visual language for verified / partial / unverified, used identically everywhere.
- *Breadcrumb with real hierarchy* (MDN) → `Paradigm › Language › Feature`, every segment clickable.

**Visual**
- *Opaque document surface* (MDN) → supports sustained reading and the "grounded" emotional goal.
- *Neutral status colour* (caniuse) → coverage state encoded in colour + shape + label, never colour alone.

### Anti-Patterns to Avoid

| Anti-pattern | Why it fails here |
|---|---|
| **3D/spatial navigation for reference content** | The prior museum. Impressive, unreadable, unnavigable, structurally incapable of expressing prev/next ordering. |
| **Force-directed graph layouts** | Re-simulate on every open; nodes never land twice; destroys the spatial memory that justifies a graph view at all. |
| **Glassmorphism behind text** | `backdrop-blur` + `bg-white/5` over dark ground taxes reading on every screen; direct cause of the "too transparent" complaint. |
| **Infinite canvas / endless scroll** | Removes closure; produces drift; prevents the sense of finishing a language. |
| **Gamification for experts** | Streaks and celebration read as condescension to a user preparing for real interviews. |
| **Rendering `unknown` as absent** | Actively dishonest given the coverage ratio, and violates the ANSWER-CONTRACT ("`unknown` means unverified, not absent"). |
| **Metadata walls** | Dumping all six evidence fields on the surface rebuilds the museum with better typography. |

### Design Inspiration Strategy

**Adopt**
- Exercism's track-card model — it *is* the requested IA, already validated.
- caniuse's coverage-state visual language — solves the honest-emptiness problem outright.
- MDN's opaque, high-contrast reading surface and evidence-at-point-of-use.

**Adapt**
- Obsidian's local graph, with force-directed layout replaced by deterministic placement.
- Duolingo's sequential path, stripped of all reward mechanics.

**Avoid**
- Every anti-pattern above, with the 3D scene and glassmorphism as explicit *removals* from the existing implementation rather than merely things not to add.


## Design System Foundation

### 1.1 Design System Choice

**Themeable/owned hybrid: Tailwind CSS 4 + an explicit design-token layer + a thin owned component set, with Radix primitives borrowed only where accessibility is genuinely hard.**

No full design system (MUI, Chakra, Ant) is installed.

### Rationale for Selection

1. **The stack already decided it.** React 19, Tailwind 4, Vite and TypeScript are in place and working. Introducing a component library now adds a runtime, fights Tailwind's utility model, and imposes a foreign visual opinion on a product whose core complaint is that it looks wrong.
2. **Hand-rolled Tailwind is what caused the problem.** `bg-white/5` and `backdrop-blur-3xl` are repeated as inline decisions across every panel. There is no single place to remove the glass. This is an architecture failure, not a styling failure, and a token layer is the fix.
3. **Semantic consistency is a learning requirement.** Coverage state and relation type must look identical everywhere they appear. Tokens make that enforceable; utilities scattered inline guarantee drift.
4. **Accessibility is borrowed only where it is hard.** A combobox/command palette needs focus trapping, roving tabindex and correct ARIA. Cards and breadcrumbs do not.
5. **Single maintainer.** Owned components mean no upgrade treadmill and no fighting a vendor's defaults.

### Implementation Approach

**Token layer** — three semantic families, defined once in CSS custom properties and consumed through Tailwind theme extension:

| Family | Tokens | Purpose |
|---|---|---|
| **Surface** | `page`, `card`, `raised`, `sunken`, `border`, `border-strong` | Opaque, high-contrast reading ground. "Kill the glass" becomes a one-file change. |
| **Coverage** | `verified`, `partial`, `unverified`, `absent-by-design` | The caniuse literacy. Encoded as colour **+ shape + label**, never colour alone. Used identically on cards, tables, graph nodes and badges. |
| **Relation** | `uses` (empowered_by), `is-a` (inheritsFrom), `specialises`, `sibling` (cross-language) | One colour and one line-style per relation, in the graph *and* in prose. Teaches the graph's grammar implicitly. |

**Owned component set** (built, not installed):
`LanguageCard` · `ParadigmGroup` · `FeatureListItem` · `ConceptHeader` · `EvidenceBadge` · `EvidenceEnvelope` · `RelationGraph` (inline SVG, deterministic layout) · `ComparisonRow` · `Breadcrumb` · `PrevNext` · `CoverageMeter`

**Borrowed primitives** (Radix, minimal surface): `Dialog` and `Command`/combobox behaviour for the `⌘K` palette; `Popover` if the evidence envelope becomes an overlay rather than a panel.

**Removed dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`. These account for the bulk of the current 1.77 MB bundle (490 kB gzipped) and the entire WebGPU/WebGL code path. Removal is a stated benefit of the redesign, not a side effect.

### Customization Strategy

- **Light and dark both first-class.** The current design is dark-only and low-contrast. Both themes are defined at token level; components never hardcode a colour.
- **Contrast floor:** body text ≥ 7:1 where practical, never below 4.5:1. No text over blur, gradient, or image.
- **Motion is functional only** — state transitions and graph focus changes. No ambient motion, no parallax, no pulse. `prefers-reduced-motion` fully respected.
- **Typography:** one text face optimised for long-form reading, one monospace for language names, code and identifiers. Monospace is semantic here — it marks "this is a language artefact" — not decorative.
- **Density:** comfortable by default, with a compact option for the comparison table where scanning many languages at once is the task.


## 2. Core User Experience

### 2.1 Defining Experience

**"Stand on a concept and step sideways into every other language's answer."**

The signature interaction is **The Pivot**. Every concept view is anchored by a *persistent question bar* stating the problem the concept answers. Stepping between languages holds the question visually fixed while the answer, mechanism and price rotate beneath it.

This single mechanic converts a feature list into a comparison, and a comparison into a mental model. It is the difference between an exhibition (five artifacts in five cases) and a lesson (one question, answered five ways, at five different prices).

**Hard constraint:** the question bar must not reflow, resize or shift position during a pivot. If the question moves, the interaction degrades into an ordinary tab switch and the pedagogy is lost. Fixed height, reserved space, no layout shift.

### 2.2 User Mental Model

The user already thinks in *problem → competing solutions → price paid* — established in the concept-atlas research, and the reason "which is better?" is the wrong question to design for. The right question is "what did each one buy, and what did it cost?"

| Current approach | Why it fails this user |
|---|---|
| Per-language official docs | Authoritative but siloed. No language's docs explain another's trade-off. |
| Stack Overflow / blogs | Specific answers, no transferable model; quality unverifiable. |
| Comparison blog posts | Usually opinionated advocacy, rarely sourced, almost never priced. |
| The atlas research document | Correct content, but static prose — no pivot, no traversal, poor recall. |

**Expectation brought to the task:** docs-like reliability with spreadsheet-like comparability.
**Likely point of confusion:** mistaking a *derived* language view for a stored entity — expecting a language to "have" its own concept page rather than a per-language answer to a shared question. The question bar mitigates this by keeping the shared question primary.

### 2.3 Success Criteria

| Criterion | Target |
|---|---|
| Sideways step cost | ≤ 1 click or 1 keypress; no page transition; no scroll reset |
| Perceived latency | < 100 ms; data already in memory, no fetch on pivot |
| Question stability | 0 px layout shift on pivot (treat as a CLS budget of 0) |
| Orientation | Number of available answers always visible ("6 languages answer this") |
| Honesty | Unverified answers appear in the chip row as unverified, never omitted |
| Recall | After three pivots the user can state the question unprompted |

### 2.4 Novel UX Patterns

**Established patterns adopted unchanged:** card grid, breadcrumb, prev/next, side-by-side comparison, command palette. No user education needed.

**The one novel pattern: the Pivot (a transpose interaction).** The corpus is stored concept-major; the user reads it language-major. The pivot exposes the transpose as a physical gesture — hold the question, rotate the language.

*Teaching it:* no tutorial. Self-teaching on first use, because the fixed question makes the axis visible. A single first-run hint ("← → to compare languages") is the entire onboarding.
*Familiar metaphor:* a card being turned over — same object, different face. Not a new tab.

### 2.5 Experience Mechanics

**1. Initiation**
- User is on a concept: `Rust › Ownership & Borrowing`.
- The **question bar** is pinned above the content, stating the problem verbatim from the corpus.
- Beneath it: the **answer chip row** — every language answering this question, each chip carrying its coverage state. Current language is active.

**2. Interaction**
- **Click a chip**, or press **← / →** to move along the row.
- The answer region cross-fades (120 ms); the question bar does not move.
- **`C` toggles Compare** — splits the answer region into two columns (current + previously viewed) under the same single question.
- **↑ / ↓** move through the language's own feature sequence (prev/next), changing the question.

**3. Feedback**
- The fixed question is itself the primary feedback — the user perceives rotation, not navigation.
- The chip row marks answers viewed this session, making comparison progress visible.
- Price is always rendered in the same position under the mechanism, so cost becomes scannable across pivots.
- Unverified answers render as an explicit "not yet verified" state linking to the research frontier — never a blank panel, never invented content.

**4. Completion**
- Completion is comparative, not exhaustive: "you have seen 4 of 6 answers to this question."
- The next move is offered explicitly — the next feature in the language's sequence.
- Closure exists at the language level ("9 of 9 features seen"). There is deliberately **no global completion metric**: with 5,168 unverified cells a global percentage would be dishonest and demoralising.


## Visual Design Foundation

### Brand Guidelines Assessment

No existing brand guidelines, palette or typeface constraints. Visual direction is derived from the product's emotional goals (grounded confidence, trust, calm) and its genre: a **study text about engineering trade-offs**, closer to a technical manual or spec sheet than to a dashboard.

### Color System

**Architecture — semantic roles defined before any hue is chosen.**

| Role | Tokens | Rule |
|---|---|---|
| **Surface** | `page`, `card`, `raised`, `sunken`, `border`, `border-strong` | Fully opaque. No alpha under text. No blur. |
| **Ink** | `ink`, `ink-2`, `ink-3` | Three levels only. More produces mush. |
| **Axis accent** | `axis` | **Reserved exclusively for the question bar.** Not used for buttons, links or headings. |
| **Coverage** | `verified`, `partial`, `unverified`, `absent-by-design` | Colour **+ shape + text label**, always. Never colour alone. |
| **Relation** | `uses`, `is-a`, `specialises`, `sibling` | One hue **and** one line-style per relation, identical in graph and prose. |
| **Price** | `price` | A dedicated cost colour. "What it cost" is the most repeated critical field; it earns its own token. |
| **State** | `focus`, `selected`, `visited` | Interaction feedback only. |

**Governing rules**
1. **Accent scarcity.** `axis` appears once per screen. Spending it elsewhere destroys the Pivot's visual anchor.
2. **No colour-only meaning.** Every coverage and relation state carries shape and label.
3. **Opacity is not a design tool for text.** Alpha may be used for borders and dividers, never for surfaces carrying prose.
4. **Both themes first-class.** Light is default (it is a reading product); dark is fully designed, not a filter.

### Typography System

**Three faces, each semantically assigned — the typeface tells you what kind of information you are reading.**

| Role | Face | Carries |
|---|---|---|
| **Prose** | Serif (reading-optimised, e.g. Literata / Source Serif 4) | Arguments, mechanisms, motivation, history. Signals "this is a text to study." |
| **Chrome** | Humanist sans | Navigation, labels, buttons, breadcrumbs, chips. Recedes. |
| **Artifact** | Mono (e.g. JetBrains Mono / IBM Plex Mono) | Language names, keywords, types, mechanism identifiers. Signals "this is a thing a language actually has." |

Deliberately **not** Inter or Space Grotesk as the primary face: both are the current default of AI-generated interfaces and carry no meaning here.

**Type scale** — 1.200 (minor third), base **17px**:

| Token | Size | Use |
|---|---|---|
| `display` | 35px | Language name on its card page |
| `h1` | 29px | Concept title |
| `h2` | 24px | Section headings |
| `h3` | 20px | Sub-sections |
| `body` | 17px | Prose (serif) |
| `small` | 14px | Chrome, captions |
| `micro` | 12px | Labels, badges, uppercase eyebrows (0.08em tracking) |

- **Measure:** 62–70 characters for prose, enforced with `max-width`.
- **Line height:** 1.65 prose · 1.3 headings · 1.5 chrome.
- **The question bar** sets at `h2` in prose serif, with fixed reserved height so a pivot causes zero layout shift.

### Spacing & Layout Foundation

- **Base unit 4px**, rhythm on 8px. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Density: comfortable.** A compact mode exists only for the comparison table.
- **Layout: 12-column, max content width 1240px**; prose column capped independently at ~68ch.
- **Layout principles**
  1. **Bounded screens.** Every view has a visible beginning and end. No infinite canvas.
  2. **Reserved space over reflow.** Question bar, chip row and price field occupy fixed slots so content changes never move the frame — a requirement of the Pivot, not a preference.
  3. **Spacing comes from layout, not per-element margins.** Flex/grid with `gap`.
  4. **Not everything is a card.** Border, fill and elevation are spent only on genuinely separate objects — the language card and the answer panel.

### Accessibility Considerations

- **Contrast:** body ≥ 7:1 (AAA) where practical, never below 4.5:1. Large text ≥ 4.5:1. Borders and focus rings ≥ 3:1.
- **No text over blur, gradient or image** — hard rule; direct correction to the current glassmorphic build.
- **Never colour alone:** coverage and relation states carry shape and label. Verified against deuteranopia and protanopia simulation.
- **Keyboard complete:** `⌘K` palette, `← →` pivot, `↑ ↓` sequence, `C` compare, `Esc` back. Visible focus ring always; never `outline: none`.
- **Screen readers:** the question bar is an `aria-live="polite"` region announcing the language change on pivot — the Pivot must work without sight.
- **Motion:** functional only. `prefers-reduced-motion: reduce` disables the cross-fade and swaps content instantly.
- **Zoom:** legible and functional at 200% without horizontal scrolling.


## Design Direction Decision

### Design Directions Explored

Four complete directions were built and published, holding content constant (same concept, same question, same six languages, real corpus prose throughout) so that only treatment varies. Source: `_bmad-output/planning-artifacts/ux-design-directions.html`. Published: https://claude.ai/code/artifact/ea95412d-a59a-4b53-b01d-57626f2e8e26

| # | Direction | Character | Strength | Weakness |
|---|---|---|---|---|
| 01 | **Field Manual** | Ink on paper; serif prose; ink-blue axis; thin rules | Sustained reading; grounded confidence | Poor at scanning many languages at once |
| 02 | **Spec Sheet** | Mono-forward datasheet; all six answers visible; caniuse DNA | Comparison; honest coverage is native to the table | A reference, not a lesson — the Pivot has nothing to do; no room for prose |
| 03 | **Studio Dark** | Solid deep surfaces, amber axis, no glass; contains the local relation graph | Graph legibility; proves dark ≠ glass | Light is the better default for a reading product |
| 04 | **Seminar** | Large display question; progress; paired answer/cost panels; one next action | Strongest "course not museum" signal | Costs room; evidence envelope and graph need a second tier |
| 05 | **Card grid** (front door) | Paradigm-grouped language cards with a coverage meter | Declares scope and honesty before entry | — (shown in Field Manual treatment) |

The Pivot is implemented live in directions 01, 03 and 04: the question bar holds position while mechanism, rationale and price rotate beneath it.

### Chosen Direction

**✅ CONFIRMED — 2026-09-05**

The visual direction is a **composite by zoom level**:
- **04 Seminar** → the shell: progress, question presentation, one clear next action
- **01 Field Manual** → the reading surface: mechanism, rationale, evidence, prose
- **02 Spec Sheet** → an opt-in "compare all" mode toggled from any concept (explicitly NOT the primary surface, avoiding the tourist failure mode).
- **03 Studio Dark** → the dark theme of the above.

**Concept Sibling Definition:** "Siblings" explicitly means **cross-language siblings** (e.g., Rust Ownership → Swift ARC → Java GC for the 'memory safety' problem), not taxonomic siblings.

### Design Rationale

Each direction earns its place at a different zoom level: Seminar gets the learner moving, Field Manual is where learning happens, Spec Sheet is where the learner checks themselves before an interview, and Studio Dark serves night study without reintroducing translucency.

### Implementation Approach

Pending direction confirmation. Once chosen, proceed to step 10 (user journeys), step 11 (component strategy), step 12 (UX patterns), step 13 (responsive/accessibility), step 14 (complete).


## Step 10: User Journeys

**✅ CONFIRMED — 2026-09-05**

The following five core journeys define the primary paths through the Concept Atlas. They are strictly designed against the 18 authored concepts and the verified corpus structures.

**Journey 1: The Transferable Learner (The Core Loop)**
* **Trigger:** The user wants to learn a new language and understand its mechanics.
* **Entry:** Selects the language from the paradigm-grouped front door.
* **Read:** Opens the **`Ownership & Borrowing (RAII)`** feature. The "Seminar" shell presents the core problem (*"How do I guarantee memory safety without GC pauses?"*). The "Field Manual" surface provides the mechanism, cost, and origin.
* **The Pivot:** The user clicks a cross-language sibling (e.g., **`Garbage Collection (GC)`** for Java or **`Reference Counting`** for Swift). The question bar remains perfectly still (0px layout shift) while the reading surface cross-fades to show the alternative solution and its differing costs.

**Journey 2: The Interview Prep (The Matrix)**
* **Trigger:** The user needs to understand the trade-space of a whole category for an architectural decision or interview.
* **Entry:** While reading about **`Threads & Mutexes`**, they need broader context on how languages handle this.
* **Action:** They toggle the opt-in "Spec Sheet" (compare) mode.
* **Read:** The UI expands into the matrix view, placing the `byLanguage` entries for Go, Java, and Rust side-by-side. The honest coverage gaps (`unknown`) and confidence scores are fully visible.

**Journey 3: The Bedrock Tracer (The Downward Trace)**
* **Trigger:** The user encounters an abstraction and wants to know how it actually runs on the metal.
* **Entry:** Reading about **`Threads & Mutexes`**.
* **Action & Trace:** They follow the `empowered_by` edges downward through the real, authored chain: **`Threads & Mutexes`** → *atomic compare-and-swap* → **`ISA / machine instructions`** → *futex* → **`os_synchronization`** → *MESI cache coherence* → **`caches / memory hierarchy`**. Every hop presents the sourced `how` and `forCase`, proving the abstraction without gaps.

**Journey 4: The Unverified Encounter (The Trust Builder)**
* **Trigger:** The user opens a language and hits a concept with no verified content (statistically the most common path, hitting one of the 5,168 `unknown` cells).
* **Action:** The UI explicitly acknowledges the gap. It renders the concept's base definition (what is known) but presents a clear, designed "Unverified" state for the language implementation. 
* **Read:** It never invents filler to close the gap. Instead, it exposes the research frontier (e.g., "We know this concept exists, but its exact cost/implementation in this language is pending verification"). This is the critical trust-repair moment.

**Journey 5: The Return (Continuity)**
* **Trigger:** The user returns the next day to continue a week-long study prep session.
* **Action:** The application loads exactly where they left off (e.g., viewing **`Hindley-Milner Inference`** in the Field Manual surface). 
* **Read:** State (language, active concept, and view mode) is seamlessly preserved in local state/URL, fulfilling the emotional journey map requirement for continuity and immediately putting them back into the flow.

## Step 11: Component Strategy

**✅ CONFIRMED — 2026-09-05**

The UI is broken down into a strict hierarchy supporting the composite visual direction (Seminar + Field Manual + Spec Sheet), using Tailwind 4 tokens and semantic typography.

### Organisms (Layout & Core Surfaces)
* **`AtlasShell` (Seminar):** The root layout container managing global navigation and the paradigm-grouped front door. Consumes `page` and `surface` tokens.
* **`QuestionBar` (The Pivot Anchor):** Locks to the top of the reading view with **0px layout shift**. The exclusive owner of the `axis` accent token. Renders the core problem in `h2` Serif.
* **`FieldManualReader`:** The primary reading surface for a verified concept. Contains the mechanism, origin, and cost. Combines `prose` (Serif) and `artifact` (Mono) typography.
* **`SpecSheetMatrix`:** The opt-in comparison view. A dense, mono-forward grid layout comparing languages across mechanism, price, and confidence.
* **`BedrockTrace`:** Visualizes the `empowered_by` chain using `relation` tokens (hue + line-style) and renders the `how` and `forCase` strings for each hop.
* **`UnverifiedState`:** The fallback component for `unknown` cells. Uses the `unverified` coverage token (shape + color) to explicitly state what is missing without looking broken or generating fake content.

### Molecules & Atoms
* **`EvidenceEnvelope`:** Attached to every claim, rendering Authority (1-10) and Confidence scores per `ANSWER-CONTRACT.md`.
* **`SiblingPivotLink`:** The navigation trigger for the Pivot. Uses `chrome` (Humanist Sans) to recede visually.
* **`PriceTag`:** A distinct block using the dedicated `price` color token to highlight "what it cost".
* **`SemanticText`:** A wrapper atom enforcing the typography system (`variant="prose|chrome|artifact"`).

### State Management
* **`URLStateRouter`:** Drives state (language, concept, view mode) purely via the URL (e.g., `?lang=rust&concept=ownership&mode=read`). Guarantees exact continuity for returning users (Journey 5).

## Step 12: UX Patterns

**✅ CONFIRMED — 2026-09-05**

**1. The "0px Shift" Pivot Transition**
When pivoting between languages, the `QuestionBar` remains strictly locked in the DOM. The `FieldManualReader` performs a rapid cross-fade (`opacity` only). No sliding, no horizontal/vertical layout jumping.

**2. Inline Progressive Disclosure (The Bedrock Trace)**
Clicking an `empowered_by` edge expands the dependency inline, indenting slightly beneath the current concept like a threaded conversation, rather than jumping to a new page and breaking context.

**3. The ⌘K Global Atlas Index**
A global command palette (via Radix UI) allows instant jumps to any verified cell (e.g., typing "GC" offers jumps to Java or Go), bypassing nested menus.

**4. The "Honest Gap" Empty State**
When hitting an `unknown` cell, the universal concept definition is rendered at the top, followed by a distinct `unverified` dashed-border zone explicitly stating the gap. It provides fallback links to verified solutions in other languages, turning a dead-end into a pivot.

**5. The Price Interruption**
The `PriceTag` component is positioned as a structural interruption (e.g., a distinct callout box). It breaks the reading flow of the prose using the dedicated `price` color token, enforcing that the trade-off is visually unskippable.

## Step 13: Responsive & Accessibility Strategy

**✅ CONFIRMED — 2026-09-05**

### Accessibility (a11y)
* **The Pivot Announcement:** `FieldManualReader` uses `aria-live="polite"`. Screen readers announce language swaps (e.g., "Showing Java implementation") rather than silently changing the DOM.
* **Focus Management:** ⌘K palette strictly traps focus. `SiblingPivotLink` retains focus after a pivot to allow rapid keyboard tab-scanning across languages.
* **Color Independence:** All relation edges and coverage states communicate via **Shape + Label + Color**, never color alone.
* **Motion Preferences:** `prefers-reduced-motion: reduce` disables the 150ms cross-fade in the Pivot, making it an instantaneous swap.
* **Contrast Constraints:** AAA contrast (7:1) for body text. No text over blurs, gradients, or imagery.

### Responsive Layout Behavior
* **The Reading Measure:** Prose container in the `FieldManualReader` is capped at a `max-width` of ~68 characters on desktop/tablet.
* **Mobile Anchoring:** The `QuestionBar` uses `position: sticky` with a solid background on mobile, keeping the problem statement locked in view during scroll.
* **Mobile Spec Sheet:** The 6-language matrix transforms into a horizontal `scroll-snap` container with the Y-axis labels (Mechanism, Cost) locked to the left.
* **Indentation Compression:** The `BedrockTrace` component compresses its indentation scale on mobile (e.g., 24px down to 8px) to prevent prose from crushing against the right edge.

## Step 14: Completion & Handoff

**✅ CONFIRMED — 2026-09-05**

This specification is now locked and serves as the strict source of truth for the Engineering phase. 

### The Handoff Package
The developer is strictly bound to:
1. **This Document:** For rules, journeys, and component strategy.
2. **The Data Contract:** `cs-museum/docs/ANSWER-CONTRACT.md` (for the Evidence Envelope).
3. **The Authored Nodes:** `app/public/data/programming_tower.json`. The developer is explicitly forbidden from mocking fake concept data or relying on unverified cells.

### Phase 1 Engineering Goals (The Foundation)
1. **The Purge:** Remove `@react-three/fiber`, `three`, and WebGPU artifacts. Delete `Lobby.tsx` and `ExhibitGraph.tsx`.
2. **The Token Layer:** Configure Tailwind 4 with the exact semantic design tokens (`surface`, `ink`, `axis`, `coverage`, `relation`, `price`).
3. **The Routing & Shell:** Implement `URLStateRouter` and `AtlasShell`.
4. **The Core Loop:** Build the `QuestionBar`, `FieldManualReader`, and `SiblingPivotLink`, strictly enforcing the **0px layout shift** and 150ms cross-fade.

### Phase 2 Engineering Goals (The Journeys)
1. **The Matrix:** Build `SpecSheetMatrix` (with responsive mobile `scroll-snap` fallback).
2. **The Trace:** Build `BedrockTrace` ensuring inline progressive disclosure.
3. **The Gap:** Build `UnverifiedState` using `unknown` coverage tokens to explicitly design the missing data.
4. **The Palette:** Integrate Radix UI for the ⌘K command palette.

### Final Quality Gates
Before shipping, the UI must pass:
1. `python3 test_relations.py` (data integrity must hold).
2. Keyboard navigation test across a Pivot action.
3. Zero-layout-shift verification on the `QuestionBar`.
