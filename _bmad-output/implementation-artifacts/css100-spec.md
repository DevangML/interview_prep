---
title: CSS 100 — acceptance spec
baseline_commit: d13543c
context: []
---

# Intent

A LeetCode-style set of **100** CSS questions to practise "very deeply, using every
property of it possible", for the Accenture / Mercer Mettl React OA and technical rounds.

# Hard constraints (stated by the user, verbatim intent)

C1. **React + CSS only. No reactivity.** No useState/useEffect/handlers in any question.
C2. **Boilerplate already present.** The component and the linked CSS files must already
    exist; the learner is "only asked to do something" — never to scaffold.
C3. **Nothing left to the learner's picking.** Every challenge must specify *what has to be
    used for what* — the problem, the tools expected, and the way to use them, explained
    in brief, with hints.
C4. **A diagram of the expected output** must be shown in the question, for visualisation.

# Required topic coverage (all 17 must be present and non-trivial)

A1.  Box models — ALL of it
A2.  Flexbox COMPLETE — basis, auto margins, flex shorthand, advanced + basics,
     explicitly "many challenges here"
A3.  Grid proper — ALL properties
A4.  repeat + minmax + auto-fit / auto-fill, responsive WITHOUT media queries
A5.  Container queries — a few examples
A6.  place-items
A7.  grid-template-areas
A8.  Positioning — ALL
A9.  inset
A10. Units — practise where each is useful in some or other way
A11. Media queries — basic AND advanced
A12. :focus-visible
A13. Tokens
A14. color-mix
A15. stack, cluster, between, sidebar (responsive), switcher — taught AND challenged
A16. Exceptions
A17. Anti-patterns to avoid

# Acceptance questions

Q1. Is each of A1–A17 actually covered, and is "ALL properties" honest for A1/A3/A8?
Q2. Does any question fail C1–C4?
Q3. Can any question be "solved" without the learner doing the thing it teaches
    (e.g. the linked stylesheet already supplies the answer, or the preview's own
    reset masks the failure state)?
Q4. Does the stated solution actually produce the drawn diagram?

### Review Findings

- [ ] [Review][Patch] lintJSX rejects valid React — `<input onChange={e => f(e)} />`, `data-style=`, `el.style =`, and `class=`/`style="` inside strings, comments and template literals [compile.js:64-74]
- [ ] [Review][Patch] toStyleObject truncates at the first `;` inside `url(...)` or a quoted value, so the suggested replacement is silently wrong [compile.js:91-100]
- [ ] [Review][Patch] migrate.js v4 deletes valid saved work containing `class=`/`style="` in a string, and the `===V` guard lets two tabs on different versions ping-pong, wiping buffers on every load [migrate.js:5-14]
- [ ] [Review][Patch] `css100:` buffers are outside the migration key filter and have no per-question version key, so a stale starter survives content changes [c100.js:92, migrate.js:8]
- [ ] [Review][Patch] esc() does not escape double quotes; TOK-03's goal contains `"danger"` and breaks its own data-tip attribute [c100.js:13,25]
- [ ] [Review][Patch] `box2` is dead data the renderer never reads — CQ-04, UNI-04 and ANT-03 ship a half-drawn diagram; DIA.pair() exists for exactly this and is never called [dia.js:21-59, css100.js]
- [ ] [Review][Patch] ladder's convertHtmlToJsx uses `(.*?)` with no `s` flag so multi-line style attributes pass through unconverted; it also rewrites prose text and turns `data-class` into `data-className` [ladder.html:121-141]
- [ ] [Review][Patch] Vacuous tests: 'valid SVG' and 'ships a diagram' pass on `dia:{box:[]}`; 'honours useApp' and 'includes convertHtmlToJsx' are greps; 'app.css never answers' under-detects on both sides [test/run.cjs]
- [ ] [Review][Patch] editor.js focused() only recognises CodeMirror panes, so a caret in a plain textarea (#app) is not protected from upgrade [editor.js:122-125]
- [ ] [Review][Patch] #jsx edits are never persisted and an intentionally emptied #css springs back to the starter [c100.js:92,127]
- [ ] [Review][Patch] preview.js updates __base only when the new baseCSS is absent, so switching to a SHORTER base (useApp toggle, app.css edit) does not repaint [preview.js:41-43]
- [ ] [Review][Patch] c100.js cluster: run() has no debounce, log()'s fetch rejects unhandled on file://, location.hash has no hashchange listener, markdone clears aria-current, #app is editable but discarded, app.css fetch failure is silent [c100.js:9,73,92,135,143]
- [ ] [Review][Patch] css100.js repeats identical P() and J() helper definitions 17 times — the exact strings the tests assert on [css100.js]
- [ ] [Review][Defer] COVERAGE: zero questions on Backgrounds and Text/font styling, both named Mettl CSS3 competencies; selectors/specificity/cascade has 1 item; React-CSS seam has 0 — deferred, requires new content not a patch
- [ ] [Review][Patch] TRK-05 is missing `useApp:false` — app.css's `.grid{…repeat(auto-fit,minmax(16rem,1fr))}` pre-solves the `.fit` half of the one item whose whole point is auto-fit vs auto-fill (Q3a) [css100.js TRK-05]
- [ ] [Review][Patch] GRID-13's diagram draws four `.tags` boxes and `use` demands `display:flex` "for the tags" — no `.tags` element exists in its JSX (Q4, C3) [css100.js GRID-13]
- [ ] [Review][Patch] ARE-03 goal/task say "both columns / 2x2 block"; sol and diagram give column 1 x rows 1-2 (Q4) [css100.js ARE-03]
- [ ] [Review][Patch] ARE-01 hint 2 teaches invalid CSS — `grid-area: hd / sb / mn / ft` is the 4-value line form filled with area names, contradicting its own sol (Q4) [css100.js ARE-01]
- [ ] [Review][Patch] GRID-11 `use` requires `z-index`; its hint says "no z-index needed" and sol omits it (C3) [css100.js GRID-11]
- [ ] [Review][Patch] INS-01 frame and highlighted box are the identical rect, so the overlay label overdraws the frame caption (Q4) [css100.js INS-01]
- [ ] [Review][Decision] Six items have zero visual delta — MQ-01, MQ-02, TOK-01, UNI-01, ANT-02, PRM-08. The TODO changes nothing observable, so "compare your preview to the diagram" is false for them (Q3) [css100.js]
- [ ] [Review][Decision] PRM-08 capstone is entirely pre-written; `use` lists class names not properties, and the TODO is "cosmetics, no layout" — pure taste (C3) [css100.js PRM-08]
- [ ] [Review][Defer] "ALL properties" is not honest for A1/A3/A8 — absent by grep: named grid lines, `grid-template`/`grid` shorthand, grid-level align/justify-content, `flex-flow`, `row-reverse`/`wrap-reverse`, `baseline`, `fit-content`/`max-content`, `position: static`, empty-block margin collapse, `orientation` media query
- [ ] [Review][Defer] Nine items cannot be exercised in the preview at all — MQ-03/04/05 need OS settings, FOC-01/02/03 need focus in a sandboxed iframe, UNI-05 has no mobile chrome, CQ thresholds exceed the pane width
