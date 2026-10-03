# Sprint 0 — Contract & Shell

**Claims 310 syllabus rows.** No framework, no build tool, no JavaScript until stage 0.6.
The product at the end of this sprint is a static, validated, accessible, themed console
shell plus the public `/status` page — and a toolchain you wrote rather than generated.

- Product root: `projects/live-console-dashboard/` (emptied 2026-09-20 — `docs/` and `scripts/` only)
- Ledger: `projects/live-console-dashboard/docs/coverage/`
- Estimate: ~3 weeks at ~27 h/week. That is an estimate, not a commitment.

## Row budget

| Stage | What gets built | Rows | Count |
|-------|-----------------|------|-------|
| **0.1 The empty room** | `.gitignore`, `.gitattributes`, hand-written `index.html`, first explainers, git discipline | P0 1,4,7,8,9,10 · §1.1 (12-22, 97-98, 104) · §1.7 (75-85) · P6 626,627,629,641 | 35 |
| **0.2 Semantics** | The full shell markup + `/status` page: landmarks, headings, text, links, media, tables, the subscribe form, SEO/OG/JSON-LD | §1.2 (23-32) · §1.3 (33-39) · §1.4 (40-52,103) · §1.5 (53-57) · §1.6 (58-74, 99-102) · §1.8 (86-90) · §1.9 (91-96) | 68 |
| **0.3 The cascade** | `styles/` from zero: reset, `@layer`, tokens, selectors, specificity, units, colour, box model, typography, custom properties | §2.1-2.8 (105-181, 274) · §2.14 (236-242) | 85 |
| **0.4 The shell layout** | Grid shell, flex toolbar, positioning & stacking, responsive, container queries, print, motion | §2.9-2.13 (182-235, 275-277) · §2.15 (243-257) | 72 |
| **0.5 Design pass** | `docs/design/console-spec.md`, the eight states, inline SVG, visual QA matrix, methodology | §2.16 (258-265, 278) · §2.17 (266-273) · Part 2B (279-285) | 24 |
| **0.6 The toolchain** | `package.json` by hand, Vite, TypeScript config, lint/format, CI skeleton | P0 2,5,6,11 · P6 651-664, 666, 669, 672, 675, 676, 677, 679, 686 | 26 |
| | | **Total** | **310** |

Row 3 (URL anatomy) is deferred to Sprint 1 — its artefact is `src/lib/url/parseConsoleUrl.ts`,
which needs TypeScript. Part 6's bundle rows (665, 667, 668, 670, 671, 673, 674) stay in Sprint 6:
analysing a bundle requires a bundle.

## The loop, per stage

```
PLAYLIST → receipt → BUILD → BREAK → DERIVE → DEFEND → CLOSE
```

1. **PLAYLIST** — the coach emits `playlists/stage-N.md`: the Scrimba course anchors, the concepts
   to find inside them, what to skip, and the rows each block closes. You assemble the playlist
   in Scrimba and watch off-chat.
2. **Receipt** — three lines before you write any code: what the lesson claimed · what you predict
   will break in your build · one open question. The build stays locked until this is filed.
3. **BUILD** — you write every file. The coach writes nothing.
4. **BREAK** — for each trap the stage names, write the broken version and run it *before* the fix.
5. **DERIVE** — the coach points at a line you wrote and makes you explain the mechanism.
6. **DEFEND** — spoken, ≤90 seconds, no notes.
7. **CLOSE** — a row closes only when its file exists, its trap was survived, and its defense was
   spoken. `build_matrix.py --paths` decides the first of those three; you cannot talk it up.

## Stage detail

### 0.1 The empty room — 35 rows
**Files you write:** `.gitignore` · `.gitattributes` · `index.html` · `docs/explainers/request-to-pixels.md` ·
`docs/explainers/standards-bodies.md` · `docs/explainers/progressive-enhancement.md` ·
`docs/explainers/document-head.md`

No build tool. Serve with `python3 -m http.server` and open it. `.gitignore` is the first file in
the first commit — before anything installs anything.

**Traps set (named, not explained):** the missing doctype · why a `<span>` refuses a width ·
the DOM you did not write.

**Gate:** the page validates at validator.w3.org with zero errors · the heading outline is correct
with one `<h1>` · `.gitignore` is in commit 1 · `--paths` reports `index.html` present.

### 0.2 Semantics — 68 rows
**Files:** the full `index.html` shell · `status.html` · the subscribe form · `public/manifest.webmanifest` ·
`public/robots.txt` · `docs/explainers/` for alt-text, `div`-vs-semantic, why-semantics, tables-are-not-layout,
MIME types, window.opener.

**Traps:** a `<button>` in a form that reloads the page · a `disabled` field that never reaches the
server · a label that is not associated with its input.

**Gate:** keyboard-only pass over every control · a VoiceOver landmark + heading traversal ·
`/status` readable and usable with JavaScript disabled · validator clean.

### 0.3 The cascade — 85 rows
**Files:** `styles/layers.css` · `styles/base/_reset.css` · `_tokens.css` · `_typography.css` ·
`_theme.css` · `_focus.css` · the first component stylesheets · `docs/explainers/the-cascade.md` ·
`reset-keywords.md` · `box-model.md` · `hiding-things.md`.

**Traps:** `em` compounding inside a nested badge · the `background` shorthand wiping
`background-color` · a specificity war you are tempted to end with `!important`.

**Gate:** the light/dark switch is a token swap with no flash on first paint · one real specificity
conflict resolved by `@layer` rather than `!important` · every colour pair passes 4.5:1 / 3:1.

### 0.4 The shell layout — 72 rows
**Files:** `AppShell` stylesheet with `grid-template-areas` · the toolbar · sticky table header ·
`styles/print.css` · `styles/base/_motion.css` · `docs/explainers/grid-vs-flex.md` ·
`stacking-contexts.md` · `auto-fit-vs-auto-fill.md` · `containing-block.md` · `visual-vs-dom-order.md`.

**Traps:** `position: sticky` failing silently · `z-index: 9999` that changes nothing ·
a flex child that will not truncate.

**Gate:** the shell holds from 320px to 200% zoom with no horizontal scroll · the metric grid is
responsive with no media query · reduced-motion is honoured · the incident report prints legibly.

### 0.5 Design pass — 24 rows
**Files:** `docs/design/console-spec.md` · `docs/design/figma-to-code.md` ·
`docs/evidence/visual-qa/` · `docs/adr/0003-styling-strategy.md` · `docs/design-tokens.md` ·
inline SVG icons.

**Traps:** a component that has a default and a hover state and nothing else · a layout that
survives short content and dies on long · the styling-approach argument you cannot make all four
sides of.

**Gate:** every component renders all eight states (default, hover, focus, active, disabled,
loading, error, empty) · the visual-QA matrix is filled in at three widths, 200% zoom, long
content, empty data and RTL.

### 0.6 The toolchain — 26 rows
**Files:** `package.json` (hand-written, not `npm init -y`) · `.nvmrc` · `vite.config.ts` ·
`tsconfig.json` · `.browserslistrc` · `postcss.config.js` · `.editorconfig` · `.prettierrc` ·
`eslint.config.js` · `.github/workflows/ci.yml` · `docs/setup.md` · `docs/explainers/semver.md` ·
`lockfiles.md` · `transpile-vs-polyfill.md` · `node-in-frontend.md` · `env-vars.md`.

**Traps:** a dependency in the wrong section · `^` where you meant `~` · `npm install` in CI.

**Gate:** a clean clone runs with `npm ci && npm run dev` · CI runs html-validate + Lighthouse on a
PR and fails on a budget breach · `--check` and `--paths` both run in that workflow.

## Sprint gate

All six stage gates green, **and**:

```bash
python3 scripts/coverage/build_matrix.py --check    # must exit 0
python3 scripts/coverage/build_matrix.py --paths    # Sprint 0's cited files must be present
```

On 2026-09-20 the matrix cited 578 artefacts and 1 existed. Sprint 0 is done when its share of
those is standing and the defenses for all 310 rows have been spoken.
