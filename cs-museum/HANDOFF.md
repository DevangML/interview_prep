# HANDOFF — CS Museum / Concept Atlas
**Written:** 2026-09-05 · **By:** the previous session · **Read this completely before touching anything.**

---

## 1. Read these first, in this order

1. `cs-museum/PROJECT-CONTEXT.md` — the binding project contract
2. `cs-museum/docs/ANSWER-CONTRACT.md` — six evidence fields required on every answer
3. `cs-museum/docs/TRANSFORMATION-BOUNDARY.md` — the UI may not retype corpus prose
4. `cs-museum/corpus/authored/schema_note.md` — **relation semantics; binding**
5. `_bmad-output/planning-artifacts/ux-design-specification.md` — the UX spec, steps 1–9 of 14 complete
6. `_bmad-output/planning-artifacts/research/technical-cross-language-concept-atlas-research-2026-09-05.md` — the 1,355-line research doc the content derives from

---

## 2. ⚠️ THE DECEPTION — do not be fooled by file size

The repository contains large, well-structured, **almost entirely empty** generated data. It looks finished. It is not.

| Artefact | Looks like | Actually is |
|---|---|---|
| `app/public/data/tower.json` | 77 KB, 121 nodes | `motivation`, `origin`, `first_principles`, `empowers` each have **exactly 1 distinct value across all 107 concept nodes**. `definition` is `"The core construct of <label>."` Zero mentions of any language, price, cost or trade-off. Only 18 edges. |
| `corpus/concept_atlas/generated/*.json` | 200 records, 14 clusters | Its own `EVIDENCE-LEDGER.md` reports **5,168 of 5,200 language cells `unknown`**, 11 first-class, 21 partial; all 200 origins "low-confidence by default". |
| `corpus/concept_atlas/_quarantine_generated_filler/` | 216 JSON concept records | Quarantined template filler. **Do not reintroduce.** |
| `app/public/data/cluster_type_systems.json` | a cluster file | Literally `{"nodes": [], "edges": []}` |

**The ledger is honest about this — the code is not.** Never present generated scaffolding as content. Never let `unknown` render as absence.

### What IS real
`cs-museum/corpus/authored/` — hand-authored, sourced, and merged into `app/public/data/programming_tower.json` (`version: "6.0.0-authored"`):
- **18 concepts** fully authored (5 memory, 4 concurrency, 4 paradigms, 5 type-system)
- **84 `empowered_by` implementation dependencies**, each with `uses` / `how` / `forCase` / `confidence`
- **94 cross-language comparisons**, each with `mechanism` / `why` / `useWhen` / `price`
- **98 edges**, 64 of them cross-tower (programming → bedrock), giving the trace down to hardware

Files: `prog_enrichment.py` (memory + concurrency), `prog_enrichment2.py` (paradigms + types), `link_map.py` (curated `uses`→nodeId map, hand-checked, never fuzzy), `build_authored.py` (merge + edge generation), `test_relations.py` (enforcement).

---

## 3. 🔒 BINDING RULE — relation semantics (user-specified, non-negotiable)

The user gave this explicitly. `test_relations.py` enforces it and **must keep passing**.

| Field | Direction | Edge-bearing? | Rule |
|---|---|---|---|
| `empowered_by` | what this **USES** | **YES — primary edge source** | **Required on every concept.** Must name a real implementation dependency, HOW it is used, and FOR WHICH SPECIFIC CASE, with accuracy. |
| `inheritsFrom` / `specializesInto` | is-a-kind-of | YES, taxonomy only | Genuine generalization lineage. Not "uses". |
| `empowers` (stored as `empowers_note`) | what MIGHT be built on this | **NO — NEVER an edge** | Presumption. "GC empowers closures" is false as a dependency: Rust has closures with no GC. **Prose only.** |

Run after any data change:
```bash
cd cs-museum/corpus/authored && python3 build_authored.py && python3 test_relations.py
```

---

## 4. Known traps in the codebase

1. **`predev`/`prebuild` run `scripts/compile_ontology.py`**, which **regenerates `tower.json` with boilerplate**. It does *not* touch `programming_tower.json`, so authored content currently survives. **If you author bedrock-tower content, your merge must run AFTER that generator or it will be clobbered.**
2. **`ExhibitGraph.tsx` filtered edges by `type === 'structural' | 'dependency'`** — new edge types (`empowered_by`, `is_a`, `specialises`) were invisible until widened. Already fixed; keep in mind when adding types.
3. **Camera bug (fix written, NOT visually verified).** `CameraController` started at `targetY = 140`, clamped `[-80, 160]`. Bedrock spans y ≈ −80…145; **programming tower spans y ≈ −31…61**, so switching views left the camera ~80 units above every node → black screen. A fix deriving bounds from the loaded tower was written and typechecks, but **the browser tool failed before it could be confirmed rendering. Verify or discard it.**
4. **`Lobby.tsx` is dead and broken** — references `manifest`, `fetchManifest`, `enterExhibit`, none of which exist on the store. Not imported anywhere. Delete it or wire it.
5. **`App.tsx` throws `fetchTower()` during render** for Suspense. It works, but it is fragile.
6. **Do not spawn many parallel Opus subagents.** Seven at once exhausted the session rate limit and killed all of them mid-task. Work serially or with 1–2.

---

## 5. Where the UX workflow stands

`bmad-create-ux-design`, **steps 1–9 of 14 complete**. Spec at `_bmad-output/planning-artifacts/ux-design-specification.md` (464 lines, frontmatter `stepsCompleted: [1..9]`, `nextStep: 10`).

**Locked decisions:**
- IA: **paradigm-grouped language cards → language features → per-feature graph** with prev/next and cross-language siblings
- Signature interaction: **The Pivot** — a persistent question bar that does **not move** while languages rotate beneath it (0 px layout shift is a hard constraint)
- **Remove `three` / `@react-three/*` / WebGPU from the reading experience** (≈1.5 MB of a 1.77 MB bundle; the 3D scene cannot express prev/next)
- **Kill glassmorphism** — no `backdrop-blur`, no translucent surfaces under text. This was the "too transparent" complaint.
- Tailwind 4 + explicit **design-token layer** (surface / coverage / relation / price) + owned components; Radix only for the ⌘K palette
- Typography as semantics: **serif = prose, sans = chrome, mono = language artifact**
- **Accent scarcity** — the accent colour belongs to the question and nothing else
- No gamification. No global completion percentage (dishonest at 99.4% unverified).

**⚠️ OPEN DECISION — step 9, must be resolved first:** which visual direction.
Four were built and published: https://claude.ai/code/artifact/ea95412d-a59a-4b53-b01d-57626f2e8e26
Recommendation on record: **04 Seminar shell + 01 Field Manual reading surface + 02 Spec Sheet as opt-in compare mode + 03 as the dark theme.** Caution on record: 02 as *primary* is the highest-risk choice — most impressive, least likely to teach.

**Second open question:** "siblings" was assumed to mean **cross-language** (same problem, other language), not taxonomic. Flagged in the spec, never confirmed.

---

## 6. What the user actually wants (in their words)

> "To learn any new language I open it and I see concepts it has and then what each concept entails in the final outcome, what it specifically does, what generalizations it inherits from, how it differs from other implementations by langs and why for what specific use? And ability to trace it down to highest generalization the hardware layer and most fine specific property of it"

> "It is a museum not a edtech kind of view which it should be, it is too complex for something which can be simpler yet solve bigger problems"

> "Languages can be cards (grouped in paradigms). When opened that language shows it's features and each feature on click opens it's own tree view or graph view that has previous and next (or sibling nodes if borrowing from siblings)"

> "It is too transparent, translucent not user friendly or creative"

**Standing instruction:** the user has twice been handed artefacts that looked finished and were empty. **Trust is the scarcest resource in this project.** Verify before claiming. Say plainly what is not done.
