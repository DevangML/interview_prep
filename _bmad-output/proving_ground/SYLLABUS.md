# The Master Syllabus — JS · React · Redux · HTML/CSS

**One document. 438 rows.** Supersedes the split `SYLLABUS.md` + `REACT_DELTA.md` topic list.

Every row terminates in one of: **`D`** = a drill/topic object in `src/data.js` ·
**`I:<file>`** = an implementation site · **`OUT`** = out of scope, blocker stated.
**Nothing may be merely "mentioned."** A row with no terminus is an open gap.

**CASES** = what the coach interrogates you with *after* your attempt — never before.
Each reads *what happens if…* The error you make teaches more than the warning would have.

**Altitudes:** a row closes only at **SPOT IT** (recognise, ~80s) + **BUILD IT** (blank file, cases
handled) + **SAY IT** (aloud, ≤90s). Closing at BUILD IT passes the OA and dies in the room.

**Scope column** (HTML/CSS only — everything else is CORE):
**CORE** = in the single phase · **defer** = keep the row, study only if time remains ·
**OUT** = prepared spoken answer.

---

## Coverage Ledger

| Area | Rows | CORE | defer | OUT |
|---|---|---|---|---|
| HTML (`H01`–`H47`) | 47 | **12** | 33 | 2 |
| CSS (`C01`–`C58`) | 58 | **16** | 41 | 1 |
| JS — Core (`J01`–`J71`) | 71 | 71 | – | 0 |
| JS — Async (`J72`–`J101`) | 30 | 30 | – | 0 |
| JS — DOM/Browser (`J102`–`J139`) | 38 | 37 | – | 1 |
| Polyfills (`P01`–`P21`) | 21 | 21 | – | 0 |
| Perf / Memory / Tooling (`J140`–`J156`) | 17 | 15 | – | 2 |
| **React (`R001`–`R122`)** | **122** | **122** | – | 0 |
| **Redux & Flux (`X01`–`X34`)** | **34** | **34** | – | 0 |
| **TOTAL** | **438** | **358** | **74** | **6** |

### Why HTML/CSS shrank and React/Redux appeared

Researched 2026-08-31 against the **Mettl React Redux Developer test** — the exact format of this OA
(36 MCQ / 50 min / 2–5 yrs). Its three published competencies are **ECMAScript · Redux · React**.
**HTML is not listed. CSS is not listed.** The other Mettl variant (19 MCQ + 1 code) mentions HTML
once as a sub-item of "JavaScript basics"; CSS appears in neither.

The technical round *does* name CSS — Flexbox, Grid, media queries, React styling — but
scenario-driven, not theoretical. So 105 HTML/CSS rows became **28 CORE**, and the reclaimed budget
went to **Redux**, which is a third of the exam and previously had zero drills.

**JS was left at full depth deliberately** — 156 rows plus 21 polyfills, untouched. ECMAScript is a
named competency, JS quirks are the densest MCQ ground, and it is the layer everything else rests on.

### Single phase

There is no phase 2. HTML/CSS was never large enough to need its own phase — the defer rows are a
tail to pick up after the OA if the technical round demands them, not a separate campaign.

> **Verified 2026-08-31:** 438 rows, zero duplicate IDs. Re-run after any edit:
>
> ```bash
> python3 -c "
> import re
> from collections import Counter
> t=open('_bmad-output/proving_ground/SYLLABUS.md').read()
> r=re.findall(r'^\| (H\d{2}|C\d{2}|J\d{2,3}|P\d{2}|R\d{3}|X\d{2}) \|',t,re.M)
> print('total',len(r),'| by area',dict(Counter(x[0] for x in r)))
> print('duplicates:',[k for k,v in Counter(r).items() if v>1] or 'NONE')"
> ```

---

# PART A — HTML (47)

## A1 · Document & Structure (11)

| # | Topic | Subtopics | CASES — what if… | Term | Scope |
|---|---|---|---|---|---|
| H01 | `DOCTYPE` & standards mode | quirks vs standards, `lang`, `charset` | …you omit `DOCTYPE`? (quirks mode, box model changes) · …`charset` comes after 1KB of content? | I:index.html | defer |
| H02 | Semantic landmarks | `header nav main aside footer section article` | …you use two `<main>`? · …`<section>` has no heading? · …you nest `<article>` in `<article>`? | I:index.html | **CORE** |
| H03 | Heading hierarchy | one `h1`/view, no level skips | …you skip `h2`→`h4`? (SR outline breaks) · …you style with headings? | I:index.html | **CORE** |
| H04 | Lists | `ul` `ol` `dl`/`dt`/`dd`, nesting | …you put a `<div>` directly in `<ul>`? · …`<dt>` without `<dd>`? | I:index.html | defer |
| H05 | Tables | `thead tbody tfoot th scope caption` | …you omit `scope`? (SR can't associate) · …you use a table for layout? | I:index.html | defer |
| H06 | `<template>` | inert content, `.content`, cloning | …you query inside a template without `.content`? · …you clone without `true` (deep)? | I:ui.js | defer |
| H07 | `<dialog>` | `show()` vs `showModal()`, `::backdrop`, Escape | …you use `show()` for a modal? (no focus trap, no inert bg) · …no `autofocus` inside? | I:ui.js | defer |
| H08 | `<details>`/`<summary>` | `open`, `toggle` event | …you animate `height` on it? · …no `<summary>` child? | I:index.html | defer |
| H09 | `data-*` attributes | naming, `dataset` camelCase mapping | …attribute is `data-topic-id` — what's the JS key? · …value is a number? (always string) | I:ui.js | **CORE** |
| H10 | Character entities & escaping | `&lt; &gt; &amp; &quot;`, raw `<` in text | …drill code contains `<script>`? · …you use `innerHTML` for it? | D | defer |
| H11 | Comments & conditional content | `<!-- -->`, not for secrets | …you leave an API key in a comment? | I:index.html | defer |

## A2 · Head, Meta & Loading (8)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| H12 | `<meta viewport>` | `width=device-width, initial-scale=1` | …you omit it on mobile? (980px virtual viewport) · …`user-scalable=no`? (a11y violation) | I:index.html | **CORE** |
| H13 | Meta description & OG tags | `og:title/description/image`, `twitter:card` | …no `og:image`? (link preview blank) | I:index.html | defer |
| H14 | Favicon | `<link rel=icon>`, sizes | …relative path on a subpath deploy? | I:index.html | defer |
| H15 | `<script>` loading | default (blocking), `defer`, `async`, `type=module` | …`async` on a script with dependencies? (race) · …`defer` on inline? (ignored) · …module in `<head>` without defer? (modules defer by default) | I:index.html | **CORE** |
| H16 | `<link>` stylesheet loading | render-blocking, `preload`, `media` | …CSS at the bottom of `<body>`? (FOUC) | I:index.html | defer |
| H17 | ESM in the browser | `type="module"`, CORS requirement, strict mode | …you open `index.html` via `file://`? (CORS blocks modules) · …you forget `.js` in the specifier? | I:main.js | defer |
| H18 | `<noscript>` | graceful degradation | …the whole app is JS-driven? | I:index.html | defer |
| H19 | Critical rendering path | HTML→DOM, CSS→CSSOM, render tree, layout, paint | …a sync script sits between CSS and content? | I:README.md | defer |

## A3 · Forms & Inputs (14)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| H20 | `<form>` basics | `action`, `method`, `novalidate`, implicit submit | …a single text input + Enter? (implicit submit) · …no `type` on a button in a form? (defaults to `submit`) | I:index.html | **CORE** |
| H21 | `<label>` association | `for`/`id`, wrapping | …placeholder used as the label? (vanishes on type, fails a11y) · …duplicate `id`? | I:index.html | **CORE** |
| H22 | Input types | `text email tel number url date range color search password checkbox radio` | …`type=number` with a comma decimal? · …`valueAsNumber` on empty? (`NaN`) | I:index.html | **CORE** |
| H23 | Native validation attributes | `required pattern min max minlength maxlength step` | …`pattern` without anchors? (implicitly anchored) · …`maxlength` vs `max` on number? | I:index.html | **CORE** |
| H24 | Constraint Validation API | `checkValidity` `reportValidity` `setCustomValidity` `validity.*` | …you set a custom message and never clear it? (form permanently invalid) | I:main.js | defer |
| H25 | `:invalid` / `:valid` / `:user-invalid` | styling timing | …`:invalid` on an empty required field at load? (red before interaction — use `:user-invalid`) | I:style.css | defer |
| H26 | `fieldset` / `legend` | radio grouping, `disabled` cascade | …radios share a name across fieldsets? | I:index.html | defer |
| H27 | `<select>` / `optgroup` / `<datalist>` | value vs text, multiple | …`<datalist>` with no matching input `list`? | I:index.html | defer |
| H28 | Checkbox & radio state | `checked` property vs attribute, `name` grouping | …you read `.getAttribute('checked')` after a click? (stale — attribute ≠ property) | D | defer |
| H29 | `FormData` | construction, `.get/.getAll/.entries` | …two inputs share a name? (`.get` returns only the first) · …an unchecked checkbox? (absent entirely) | I:main.js | **CORE** |
| H30 | `Object.fromEntries(FormData)` | the idiom and its loss | …multi-value fields? (silently collapsed) | I:main.js | defer |
| H31 | `autocomplete` tokens | spec values, `off` | …`autocomplete="off"` on a password? (browsers ignore) | I:index.html | defer |
| H32 | Form events | `submit input change invalid reset` | …`change` on a text input? (fires on blur, not keystroke) · …`preventDefault` omitted on submit? (page reload) | I:main.js | defer |
| H33 | File input + `FileReader` | `accept`, `files`, `readAsDataURL` | …user cancels the picker? (`files` empty, no event) | OUT — no upload surface; know the API | OUT |

## A4 · Media & Images (6)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| H34 | `<img>` fundamentals | `alt`, `width`/`height`, intrinsic size | …no `alt`? (SR reads filename) · …`alt=""`? (decorative — correct for icons) · …no dimensions? (CLS) | I:index.html | defer |
| H35 | `srcset` / `sizes` | density vs width descriptors | …`srcset` without `sizes` using `w`? (browser assumes 100vw) | I:index.html | defer |
| H36 | `<picture>` | art direction, `<source type>` | …no fallback `<img>`? (nothing renders) | I:index.html | defer |
| H37 | `loading="lazy"` | native lazy-loading, above-fold caveat | …lazy on the LCP image? (delays LCP) | I:index.html | defer |
| H38 | SVG inline vs `<img>` | styling reach, `currentColor` | …you need CSS to recolour an `<img>` SVG? (can't) | I:index.html | defer |
| H39 | `<audio>` / `<video>` | controls, autoplay policy | …autoplay with sound? (blocked) | OUT — no media surface | OUT |

## A5 · Accessibility (8)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| H40 | ARIA roles & landmarks | when native beats ARIA (first rule of ARIA) | …`role="button"` on a `<div>`? (must add tabindex + key handlers) · …redundant `role="navigation"` on `<nav>`? | I:index.html | **CORE** |
| H41 | `aria-live` regions | `polite` vs `assertive`, `atomic` | …region added to DOM *with* content? (not announced — must exist first) | I:ui.js | defer |
| H42 | State attributes | `aria-expanded -controls -current -selected -hidden -describedby` | …`aria-hidden="true"` on a focusable element? (focusable but invisible to SR) | I:ui.js | defer |
| H43 | Focus management | `.focus()`, return focus on close, `inert` | …dialog closes and focus falls to `<body>`? (keyboard user is lost) | I:ui.js | **CORE** |
| H44 | Focus trap | Tab/Shift+Tab cycling in a modal | …focus escapes to the page behind? | I:ui.js | defer |
| H45 | Keyboard navigation | tab order, no positive `tabindex`, `tabindex="-1"` | …`tabindex="5"`? (breaks document order globally) | I:index.html | defer |
| H46 | Skip link | first focusable, visible on focus | …skip link permanently hidden? (useless) | I:style.css | defer |
| H47 | Colour contrast | WCAG AA 4.5:1 / 3:1 large | …accent fails on the dark ground? | I:style.css | defer |

---

# PART B — CSS (58)

## B1 · Cascade, Selectors, Specificity (14)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| C01 | Selector types | element, class, id, universal, attribute | …`*` in a hot selector? (perf) | I:style.css | **CORE** |
| C02 | Combinators | descendant, `>`, `+`, `~`, and the missing "parent" | …you need a parent selector? (only `:has`) | I:style.css | defer |
| C03 | Specificity arithmetic | (id, class, element); inline; `!important` | …`#a .b` vs `.b.c.d.e`? (id always wins — specificity isn't additive across columns) | D | **CORE** |
| C04 | `!important` | when legitimate, why usually a smell | …two `!important` collide? (normal specificity resolves) · …`!important` in a lower layer vs higher? (**inverts** — lower layer wins) | D | defer |
| C05 | Cascade order | origin → layer → specificity → source order | …two identical-specificity rules? (last wins) | I:style.css | **CORE** |
| C06 | `@layer` | declaration order defines priority | …an unlayered rule vs a layered one? (unlayered wins) | I:style.css | defer |
| C07 | Inheritance | inherited vs non-inherited properties | …you set `border` on `body` expecting inheritance? (doesn't inherit) | I:style.css | **CORE** |
| C08 | `inherit` `initial` `unset` `revert` `revert-layer` | the four resets | …`unset` on `color` vs on `border`? (inherits vs initial) | D | defer |
| C09 | Pseudo-classes — state | `:hover :focus :focus-visible :focus-within :active :disabled :checked` | …`:focus` ring removed with no `:focus-visible` replacement? (keyboard users blind) | I:style.css | **CORE** |
| C10 | Pseudo-classes — structural | `:nth-child(an+b) :first/:last-child :only-child :empty` | …`:nth-child(2)` vs `:nth-of-type(2)` with mixed siblings? | I:style.css | defer |
| C11 | Functional pseudo-classes | `:is()` `:where()` `:not()` `:has()` | …`:where()` vs `:is()` specificity? (`:where` = 0) · …`:not(.a, .b)` support? | I:style.css | defer |
| C12 | Pseudo-elements | `::before ::after ::placeholder ::selection ::marker ::first-line ::backdrop` | …`::before` with no `content`? (renders nothing) · …on a replaced element like `<img>`? (no effect) | I:style.css | defer |
| C13 | Attribute selectors | `[a] [a=v] [a^=] [a$=] [a*=] [a~=] [a i]` | …case sensitivity in attribute values? | I:style.css | defer |
| C14 | Custom properties | `--x`, `var(--x, fallback)`, scope, inheritance, invalid-at-computed-value | …`var()` on an undefined property with no fallback? (invalid at computed value → **inherits**, not initial) | D | defer |

## B2 · Box Model & Layout (17)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| C15 | Box model | content, padding, border, margin | …you add `padding` to a `width:100%` element? (overflows without border-box) | I:style.css | **CORE** |
| C16 | `box-sizing` | content-box vs border-box, the global reset | …`* { box-sizing: border-box }` without `::before/::after`? | I:style.css | **CORE** |
| C17 | Margin collapsing | adjacent siblings, parent/first-child, empty blocks | …parent has no padding/border and child has `margin-top`? (escapes the parent) · …what stops it? (BFC, padding, border, flex, grid) | D | **CORE** |
| C18 | Block formatting context | what creates one, float containment | …floated children with no clearfix? (parent collapses to 0) | I:style.css | defer |
| C19 | `display` | block, inline, inline-block, flow-root, contents, none | …`display: contents` on a flex item? (box disappears, children participate) · …`none` vs `visibility: hidden`? (layout vs paint) | D | **CORE** |
| C20 | Positioning — static/relative | offset without removing from flow | …`top` on a `static` element? (ignored) | I:style.css | defer |
| C21 | Positioning — absolute | containing block = nearest positioned ancestor | …no positioned ancestor? (positions to initial containing block) | I:style.css | **CORE** |
| C22 | Positioning — fixed | viewport-relative | …an ancestor has `transform`/`filter`/`will-change`? (**fixed becomes relative to it** — the classic bug) | D | defer |
| C23 | Positioning — sticky | threshold, scroll container, needs an offset | …no `top`/`bottom` set? (never sticks) · …parent has `overflow:hidden`? (dead) | D | defer |
| C24 | Stacking contexts | what creates one, `z-index` scoping | …child `z-index: 9999` inside a parent with `z-index: 1`? (can't escape the parent's context) · …`opacity < 1`? (creates a context) | D | **CORE** |
| C25 | `z-index` | integer/auto, only on positioned + flex/grid items | …`z-index` on a `static` element? (ignored) | I:style.css | defer |
| C26 | Flexbox — container | `flex-direction wrap justify-content align-items align-content gap` | …`align-items` with `wrap` on multiple lines? (`align-content` governs) | I:style.css | **CORE** |
| C27 | Flexbox — items | `flex-grow shrink basis`, `flex` shorthand, `align-self`, `order` | …`flex: 1` vs `flex: 1 1 0` vs `flex: auto`? (basis differs) · …`basis` + `width` together? (basis wins) | D | **CORE** |
| C28 | Flex sizing gotchas | `min-width:auto` floor, overflow | …a flex item won't shrink below content? (`min-width: 0` is the fix) | D | defer |
| C29 | Grid — tracks | `template-columns/rows`, `fr`, `repeat`, `minmax`, `auto-fit` vs `auto-fill` | …`auto-fit` vs `auto-fill` with few items? (fit collapses empties, fill keeps them) | D | **CORE** |
| C30 | Grid — placement | line numbers, `span`, named areas, implicit tracks, `auto-flow` | …an item placed outside declared tracks? (implicit track created) | I:style.css | defer |
| C31 | Container queries | `container-type`, `@container`, units `cqw` | …`container-type: inline-size` on the queried element itself? (must be the parent) | I:style.css | defer |

## B3 · Typography, Colour, Units (11)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| C32 | Font loading | `@font-face`, `font-display`, Google Fonts, fallback stacks | …`font-display: block` on a slow font? (FOIT — invisible text) · …no fallback stack? | I:style.css | defer |
| C33 | Font shorthand & metrics | `font-size line-height font-weight font-family` | …`font` shorthand resets `line-height`? | I:style.css | defer |
| C34 | `line-height` | unitless vs unit values | …`line-height: 1.5em` on a parent? (children inherit the **computed px**, not the ratio) | D | defer |
| C35 | `letter-spacing`, `word-spacing`, `text-transform` | uppercase tracking | …`text-transform: uppercase` and SR pronunciation? | I:style.css | defer |
| C36 | Absolute vs relative units | `px em rem % vw vh ch ex fr` | …`em` on nested elements? (compounds) · …`vh` on mobile with the URL bar? | D | **CORE** |
| C37 | Viewport units | `vw vh vmin vmax dvh svh lvh` | …`100vw` with a visible scrollbar? (horizontal overflow) | D | defer |
| C38 | `clamp()` / `min()` / `max()` | fluid type without breakpoints | …`clamp()` preferred value has no `vw`? (never scales) · …zoom accessibility with locked `vw`? | I:style.css | defer |
| C39 | Colour notations | hex, `rgb()`, `hsl()`, `oklch()`, alpha, `currentColor` | …8-digit hex support? · …`currentColor` in a border? | I:style.css | defer |
| C40 | Gradients | linear, radial, conic, colour stops, hard stops | …a gradient on `background-color`? (invalid — it's an image) | I:style.css | defer |
| C41 | Shadows & borders | `box-shadow` (inset, spread), `text-shadow`, `border-radius`, `outline` | …`outline` vs `border` for focus? (outline doesn't affect layout) | I:style.css | defer |
| C42 | Text overflow | `text-overflow: ellipsis`, `-webkit-line-clamp`, `word-break`, `text-wrap: balance` | …ellipsis without `overflow:hidden` + `white-space:nowrap`? (no effect) | D | defer |

## B4 · Responsive, Motion, Output (11)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| C43 | Media queries | `min-width` mobile-first, ranges, `and`/`or` | …mixing min- and max-width breakpoints? (overlap gaps) | I:style.css | **CORE** |
| C44 | `prefers-color-scheme` | three states: system / explicit light / explicit dark | …a colour defined **only** inside the dark media query? (**unreadable in the un-stamped state** — build this bug, see it, fix it) | D | defer |
| C45 | `prefers-reduced-motion` | gating all animation | …`transition` left ungated? | I:style.css | defer |
| C46 | Other feature queries | `pointer`, `hover`, `@supports` | …`:hover` styles on touch? (sticky hover state) | I:style.css | defer |
| C47 | Transitions | property, duration, timing, delay, `transitionend` | …transition on `display`? (not animatable) · …transition from `height: auto`? (doesn't work — needs `max-height` or `grid-rows`) | D | defer |
| C48 | Timing functions | `linear ease* cubic-bezier steps` | …`steps()` for a sprite? | I:style.css | defer |
| C49 | `@keyframes` | percentages, `animation-*` longhands, `fill-mode` | …no `fill-mode: forwards`? (snaps back at end) · …`animation` on load when you wanted it on interaction? | D | defer |
| C50 | Transforms | `translate rotate scale skew`, `transform-origin`, 3D, `perspective` | …`transform` on an inline element? (no effect) · …transform creates a stacking + containing block (see C22) | D | defer |
| C51 | Compositing & performance | only `transform`/`opacity` are cheap; `will-change` | …animating `width`/`top`? (layout thrash) · …`will-change` on everything? (memory blowup) | I:style.css | defer |
| C52 | Filters | `blur brightness grayscale drop-shadow`, `backdrop-filter` | …`filter` on a parent creates a containing block for `fixed`? | I:style.css | defer |
| C53 | `@media print` | page breaks, colour adjust, hiding chrome | …dark theme printed? (ink) | I:style.css | defer |

## B5 · CSS Misc (5)

| # | Topic | Subtopics | CASES | Term | Scope |
|---|---|---|---|---|---|
| C54 | Logical properties | `margin-inline`, `padding-block`, `inset` | …RTL with physical properties? | I:style.css | defer |
| C55 | `aspect-ratio` & `object-fit` | `cover contain fill`, `object-position` | …`object-fit` on a non-replaced element? (no effect) | I:style.css | defer |
| C56 | Overflow & scroll containers | `auto scroll hidden clip`, `overscroll-behavior`, scrollbar gutter | …`overflow:hidden` on an ancestor kills `position:sticky`? | I:style.css | defer |
| C57 | `font-variant-numeric: tabular-nums` | aligning digit columns | …proportional digits in a score table? (jitter) | I:style.css | defer |
| C58 | Preprocessors (Sass/Less) | variables, nesting, mixins, partials | …native nesting vs Sass nesting? | OUT — custom properties + `@layer` cover it natively; know the syntax for the viva | OUT |

---

# PART C — JAVASCRIPT CORE (71)

## C1 · Scope, Hoisting, Declarations (12)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J01 | `var` | function scope, redeclaration, global object property | …`var` in a block? (leaks to function scope) · …`var x` at top level? (becomes `window.x`) | D |
| J02 | `let` / `const` | block scope, no redeclaration, `const` ≠ immutable | …`const arr = []` then `arr.push()`? (allowed — binding is const, not value) · …`const` without initialiser? (SyntaxError) | D |
| J03 | Hoisting — variables | declaration hoisted, initialisation not | …`console.log(x); var x = 5`? (`undefined`) | D |
| J04 | Temporal Dead Zone | `let`/`const` hoisted but uninitialised | …`console.log(y); let y = 5`? (**ReferenceError**, not undefined) · …`typeof y` in the TDZ? (throws — the one case `typeof` isn't safe) | D |
| J05 | Hoisting — functions | declarations fully hoisted, expressions not | …call a function declaration before its line? (works) · …a `const fn = () =>` before its line? (TDZ error) | D |
| J06 | Function vs block scope | `if`/`for` blocks | …function declaration inside a block? (implementation-defined in sloppy mode) | D |
| J07 | The loop-variable classic | `var` vs `let` in `for` + `setTimeout` | …`var i` with 3 timers? (3,3,3) · …why does `let` fix it? (per-iteration binding) · …the IIFE fix? | D |
| J08 | IIFE & the module pattern | privacy before ESM | …no leading `;` after a previous line? (ASI hazard) | D |
| J09 | Closures — definition | function + lexical environment | …a closure holds a large object? (never GC'd — memory) | D |
| J10 | Closures — practical | counter, private state, factory, memo cache | …two calls to the factory share state? (no — separate closures) | I:store.js |
| J11 | Strict mode | modules always strict, `this` = undefined, no implicit globals | …assignment to an undeclared variable in strict? (ReferenceError) · …`this` in a standalone function in a module? | D |
| J12 | Scope chain & lexical environment | resolution order, shadowing | …an inner variable shadows an outer? (no way to reach the outer) | D |

## C2 · Types & Coercion (16)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J13 | Primitives vs objects | 7 primitives, reference semantics | …`const a = {}; const b = a; b.x=1`? · …passing an object to a function and reassigning inside? | D |
| J14 | `typeof` | all outputs, `typeof null`, undeclared safety | …`typeof null`? (`"object"` — historic bug) · …`typeof function(){}`? (`"function"`) · …`typeof undeclaredVar`? (safe, `"undefined"`) | D |
| J15 | `null` vs `undefined` | absence-by-design vs absence-by-default | …`null == undefined`? (true) · …`null === undefined`? (false) · …default parameter with `null`? (**not** applied — only `undefined` triggers defaults) | D |
| J16 | Truthy / falsy | the 8 falsy values | …`if (0)`? · …`if ("0")`? (truthy!) · …`if ([])`? (truthy) · …`if (new Boolean(false))`? (truthy) | D |
| J17 | `==` coercion algorithm | the abstract equality steps | …`[] == false`? (true) · …`"" == 0`? (true) · …`null == 0`? (**false** — null only equals undefined) | D |
| J18 | `===` strict equality | no coercion, `NaN`, `-0` | …`NaN === NaN`? (false) · …`0 === -0`? (true) · …`Object.is(0,-0)`? (false) | D |
| J19 | `NaN` | origin, detection | …`isNaN("abc")`? (true — coerces!) · …`Number.isNaN("abc")`? (false — correct) | D |
| J20 | `+` operator | numeric add vs string concat, left-to-right | …`1 + 2 + "3"`? (`"33"`) · …`"1" + 2 + 3`? (`"123"`) · …`[] + {}`? · …`{} + []` at statement start? (block, then unary → 0) | D |
| J21 | Other arithmetic operators | `- * / %` always numeric | …`"5" - 3`? (2) · …`"5" * "2"`? (10) · …`5 % -3` vs `-5 % 3`? (sign follows dividend) | D |
| J22 | `ToPrimitive` | `valueOf` vs `toString`, hint | …an object in a string context? · …`[1,2] + [3,4]`? (`"1,23,4"`) · …`Symbol.toPrimitive`? | D |
| J23 | Number precision | IEEE-754, `0.1+0.2`, `EPSILON`, safe integers | …`0.1+0.2 === 0.3`? (false) · …the fix? (integer cents, or EPSILON compare) · …`9007199254740993`? | D |
| J24 | Number conversion | `Number() parseInt() parseFloat() +x`, radix | …`parseInt("08")`? (8 in modern JS) · …`parseInt("12px")`? (12) · …`Number("12px")`? (NaN) · …`parseInt` in `map`? (index becomes radix!) | D |
| J25 | String conversion | `String() .toString() +""`, null/undefined | …`null.toString()`? (TypeError) · …`String(null)`? (`"null"`) | D |
| J26 | Boolean conversion | `Boolean() !!x` | …`!!"false"`? (true) | D |
| J27 | Operator precedence & associativity | full table, `??` cannot mix with `\|\|`/`&&` | …`a ?? b \|\| c` unparenthesised? (SyntaxError) · …`2 ** 3 ** 2`? (right-assoc → 512) | D |
| J28 | Short-circuit evaluation | `&&` `\|\|` return **operands**, not booleans | …`0 \|\| "default"`? · …`"" ?? "default"`? (`""` — not nullish) · …the `\|\|` vs `??` default bug? | D |

## C3 · Functions & `this` (14)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J29 | Declarations vs expressions vs arrows | hoisting, naming, `arguments` | …`arguments` in an arrow? (inherits from enclosing) | D |
| J30 | Parameters | default, rest, destructured, `arguments`, `fn.length` | …`fn.length` with defaults? (stops counting at the first default) · …rest not last? (SyntaxError) | D |
| J31 | `this` — global / standalone | sloppy vs strict, modules | …a standalone function in a module? (`undefined`) · …in a script in sloppy mode? (`globalThis`) | D |
| J32 | `this` — method call | receiver is the object before the dot | …`const f = obj.method; f()`? (lost binding) | D |
| J33 | `this` — constructor / `new` | the 4 steps of `new` | …you forget `new`? (sloppy: pollutes global; strict: TypeError) · …constructor returns an object? (overrides `this`) · …returns a primitive? (ignored) | D |
| J34 | `this` — arrow functions | lexical, cannot be rebound | …arrow as an object method? (`this` = enclosing, not the object) · …`arrow.call(obj)`? (ignored) · …arrow as a constructor? (TypeError) | D |
| J35 | `this` — explicit binding | `call` `apply` `bind` | …`bind` twice? (second has no effect) · …a bound function with `new`? (`new` wins) | D |
| J36 | `this` in callbacks | event handlers, `forEach` thisArg, `setTimeout` | …`function(){}` as an event handler? (`this` = element) · …arrow? (`this` = enclosing) · …`this` in `setTimeout` callback? | D |
| J37 | Higher-order functions | functions as args/returns | …returning a function that closes over a parameter? | I:runner.js |
| J38 | Currying | manual + generic `curry`, arity | …`curry` with a function using default params? (`length` shrinks) | D |
| J39 | Partial application | `bind` for partials vs currying | …the difference from currying, in one sentence? | D |
| J40 | Composition | `compose` (right→left) vs `pipe` (left→right) | …order reversed? · …a non-unary function in the chain? | D |
| J41 | Memoization | cache key strategy, LRU, side effects | …a memoized function with side effects? (skipped on cache hit — real bug) · …object args with `JSON.stringify` keys? (key order matters) | D |
| J42 | Pure functions & immutability | referential transparency, side effects | …a "pure" function reading `Date.now()`? | I:store.js |

## C4 · Objects & Prototypes (13)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J43 | Object literals | shorthand, computed keys, methods, `__proto__` key | …a numeric key? (coerced to string) · …duplicate keys? (last wins) | D |
| J44 | Property access | dot vs bracket, optional chaining | …a key with a space or a variable key? | D |
| J45 | Property descriptors | `writable enumerable configurable`, getters/setters | …assign to a non-writable in strict? (TypeError) · …`defineProperty` default enumerable? (false) | D |
| J46 | `Object.freeze` / `seal` / `preventExtensions` | shallow only | …`freeze` then mutate a nested object? (**succeeds** — shallow) · …a deep freeze? | D |
| J47 | Prototype chain | `[[Prototype]]`, lookup, `null` terminus | …a property found on the prototype then assigned on the instance? (shadows, doesn't mutate the prototype) | D |
| J48 | `__proto__` vs `prototype` | instance link vs constructor property | …`fn.prototype` vs `fn.__proto__`? · …an arrow function's `prototype`? (none) | D |
| J49 | Constructor functions | `new`, `prototype` methods, `constructor` | …methods defined in the constructor vs on the prototype? (memory per-instance) | D |
| J50 | `Object.create` | explicit prototype, `null` prototype | …`Object.create(null)`? (no `toString`, no `hasOwnProperty`) | D |
| J51 | ES6 `class` | desugaring, methods non-enumerable, class body strict | …call a class without `new`? (TypeError) · …hoisting? (TDZ, unlike function declarations) | D |
| J52 | `extends` / `super` | constructor chaining, `super` before `this` | …use `this` before `super()`? (ReferenceError) · …omit the constructor entirely? (implicit `super(...args)`) | D |
| J53 | `static` & `#private` | class-level members, hard privacy | …access `#x` from outside? (SyntaxError, not undefined) · …`static` inheritance? | D |
| J54 | `instanceof` & type checks | prototype-chain walk, `Object.prototype.toString`, `Array.isArray` | …`instanceof` across iframes? (fails — different realm) · …`typeof []`? (`"object"`) | D |
| J55 | `hasOwnProperty` vs `in` | own vs inherited, `Object.hasOwn` | …`"toString" in obj`? (true — inherited) · …calling `obj.hasOwnProperty` on a null-prototype object? (TypeError) | D |

## C5 · ES6+ Syntax (9)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J56 | Destructuring — array | order, skipping, defaults, swap, nested | …destructure from `undefined`? (TypeError) · …default applied on `null`? (no — only `undefined`) | D |
| J57 | Destructuring — object | rename, defaults, nested, rest, in parameters | …destructure a missing nested object? (TypeError) · …`const {a} = null`? | D |
| J58 | Spread | arrays, objects, function calls, strings, order of overwrite | …spread a `null` into an object? (fine, ignored) · …into an array? (TypeError — not iterable) · …spread depth? (shallow) | D |
| J59 | Rest | rest params, rest in destructuring | …rest in the middle? (SyntaxError) | D |
| J60 | Template literals | interpolation, multiline, nesting, tagged templates | …a backtick inside? · …a tag function's `strings.raw`? | D |
| J61 | Optional chaining | `?.` `?.[]` `?.()`, short-circuit | …`a?.b.c` when `a` is null? (short-circuits the **whole** chain) · …`obj?.method()` when method missing? | D |
| J62 | Nullish coalescing | `??`, `??=`, vs `\|\|` | …`0 ?? 5`? (0) · …`0 \|\| 5`? (5) · …which is correct for a quantity default? | D |
| J63 | `Object` statics | `keys values entries fromEntries assign groupBy` | …`Object.keys` order with integer-like keys? (integers first, ascending) · …`assign` with getters? (invoked) | D |
| J64 | ESM | named/default, `import()`, live bindings, circular imports, tree shaking | …a default export renamed on import? (allowed) · …circular imports? (partially-initialised bindings) · …why can't CJS tree-shake? | D |

## C6 · Arrays & Collections (7)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J65 | Array creation & holes | literal, `Array(n)`, `Array.from`, `.fill`, sparse arrays | …`Array(3).map(x=>1)`? (holes are skipped — stays empty) · …`Array.from({length:3})`? (works — no holes) | D |
| J66 | Iteration methods | `map filter reduce forEach find findIndex some every flat flatMap` | …`forEach` with a `break`? (impossible) · …`reduce` on an empty array with no initial? (TypeError) · …`every` on empty? (**true** — vacuous) | D |
| J67 | Mutating methods | `push pop shift unshift splice sort reverse fill copyWithin` | …`sort()` on numbers? (**string sort** — 10 before 9) · …is `sort` stable? (yes, since ES2019) · …`splice` return value? (removed items) | D |
| J68 | Non-mutating methods | `slice concat join at includes indexOf toSorted` | …`indexOf(NaN)`? (-1) · …`includes(NaN)`? (true) · …`at(-1)`? | D |
| J69 | `Map` & `Set` | any key type, insertion order, size, iteration, vs object/array | …an object as a Map key vs an object key? · …`NaN` as a Set value twice? (deduped — SameValueZero) | D |
| J70 | `WeakMap` / `WeakSet` | weak refs, no iteration, no size, GC | …a primitive as a WeakMap key? (TypeError) · …why can't you iterate? (non-determinism) | D |
| J71 | Iteration protocols | `for…of` vs `for…in` vs `forEach`, iterables | …`for…in` over an array? (string indices + inherited enumerables) · …`for…of` over a plain object? (TypeError — not iterable) | D |

---

# PART D — ASYNC (30)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J72 | Single-threaded model | call stack, blocking | …a 5-second `while` loop? (UI frozen — see Part 8 of ARCHITECTURE) | I:loop.js |
| J73 | Call stack | frames, stack overflow | …infinite recursion? (RangeError) · …tail calls? (not optimised in practice) | I:loop.js |
| J74 | Web APIs / host environment | timers, XHR/fetch, DOM events — not part of the JS engine | …is `setTimeout` in the ECMAScript spec? (no) | I:loop.js |
| J75 | Task (macrotask) queue | timers, I/O, UI events; **one per tick** | …two `setTimeout(0)` and a microtask between? | D |
| J76 | Microtask queue | promises, `queueMicrotask`, `MutationObserver`; **drained fully** | …a microtask that queues another microtask? (starvation — loop never proceeds) | D |
| J77 | Event loop ordering | sync → all microtasks → render → one macrotask | …`setTimeout(0)` vs `Promise.then`? (then first, always) | D |
| J78 | `setTimeout` / `setInterval` | clamping (4ms), drift, `clearTimeout`, `this` | …`setTimeout(fn, 0)` — actual minimum? (~4ms after nesting) · …`setInterval` with a slow callback? (overlap/drift) · …forgetting `clearInterval`? (leak) | D |
| J79 | `requestAnimationFrame` | before paint, ~60fps, `cancelAnimationFrame` | …rAF in a background tab? (throttled/paused) | I:loop.js |
| J80 | `queueMicrotask` | when over `Promise.resolve().then` | …an error thrown inside? | D |
| J81 | Callbacks & callback hell | inversion of control, pyramid | …a callback called twice by a buggy API? (promises guarantee once) | D |
| J82 | Error-first callbacks | Node convention | …you forget to check `err`? | D |
| J83 | Promise states | pending/fulfilled/rejected, settle-once immutability | …call `resolve` twice? (second ignored) · …`resolve` then `reject`? (ignored) | D |
| J84 | Promise constructor | executor runs **synchronously** | …a `console.log` in the executor vs in `.then`? (executor is sync!) · …the constructor anti-pattern (wrapping an existing promise)? | D |
| J85 | `.then` chaining | returns a **new** promise, return-value semantics | …return a value vs return a promise vs return nothing? · …`.then(fn())` instead of `.then(fn)`? (invoked immediately) | D |
| J86 | Thenable assimilation | any `{then}` object is adopted | …return an object with a `then` method? (awaited!) | D |
| J87 | `.catch` / `.finally` | catch is `.then(null, fn)`, finally passes through | …`.catch` returns a value? (converts rejection → fulfillment) · …`.finally` returns a value? (**ignored**, passthrough) | D |
| J88 | Error propagation | skipping to the nearest catch, rethrowing | …a `.then` after a `.catch`? (runs — chain recovered) · …a throw inside `.catch`? | D |
| J89 | `Promise.all` | fail-fast, result order = input order | …one rejects? (immediate reject, others still run) · …empty array? (resolves immediately) · …non-promise values? (wrapped) | D |
| J90 | `Promise.allSettled` | never rejects, `{status, value/reason}` | …when is it correct over `all`? | D |
| J91 | `Promise.race` | first to **settle** (fulfil or reject) | …the timeout pattern? · …the losing promise? (keeps running — not cancelled) | D |
| J92 | `Promise.any` | first to **fulfil**; `AggregateError` | …all reject? (AggregateError with `.errors`) | D |
| J93 | `Promise.resolve/reject` | wrapping, passthrough of existing promises | …`Promise.resolve(existingPromise)`? (same instance returned) | D |
| J94 | `async` functions | always return a promise, implicit wrapping | …return a value? (wrapped) · …throw? (rejected promise, not a sync throw) | D |
| J95 | `await` | pauses, unwraps thenables, only in async (or top-level module) | …`await` a non-promise? (still yields a microtask tick) · …`await` at module top level? (allowed in ESM) | D |
| J96 | Sequential vs parallel awaits | the cost model | …two independent awaits in sequence? (2× time) · …the `Promise.all` fix? · …starting both then awaiting? | D |
| J97 | `await` in a loop | when it's a bug, when it's correct | …`for…of` with await over 10 items? (10× time) · …when is sequential actually required? (dependent ops, rate limits) | D |
| J98 | `try/catch/finally` in async | what catch does and doesn't catch | …an un-awaited promise rejecting inside a try? (**not caught**) · …`finally` with a return? | D |
| J99 | Custom `Error` subclasses | `extends Error`, `name`, `cause`, `captureStackTrace` | …forget `super(message)`? · …`instanceof` after transpilation to ES5? (breaks) | D |
| J100 | Unhandled rejections | `unhandledrejection` event, late `.catch` | …a rejected promise with no handler? · …attaching `.catch` in a later tick? | I:main.js |
| J101 | `fetch` | Response, `.ok`, `.json()`, status codes, no auto-throw | …a 404? (**does not reject** — `.ok` is false) · …`.json()` on an empty body? (throws) · …reading the body twice? (already consumed) | D |

---

# PART E — DOM & BROWSER (38)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J102 | Selection APIs | `getElementById querySelector(All) getElementsBy*` | …`querySelectorAll` returns? (static NodeList) · …`getElementsByClassName`? (**live** HTMLCollection) | D |
| J103 | NodeList vs HTMLCollection vs Array | live/static, `forEach` availability | …`.map` on a NodeList? (TypeError) · …removing elements while looping a live collection? (skips) | D |
| J104 | Traversal | `parentNode children nextElementSibling closest matches contains` | …`childNodes` vs `children`? (text nodes included) | I:ui.js |
| J105 | Creation & insertion | `createElement append(Child) insertBefore before/after replaceWith` | …`appendChild` an existing node? (**moves** it) | I:ui.js |
| J106 | `DocumentFragment` | batching, one reflow | …appending 100 nodes individually vs via fragment? (measure it) | I:ui.js |
| J107 | `innerHTML` vs `textContent` vs `innerText` | parsing, XSS, layout-awareness/reflow | …`innerHTML` with user text containing `<img onerror>`? (**XSS**) · …`innerText` forces reflow? | D |
| J108 | Attributes vs properties | `getAttribute` vs `.value`/`.checked`, reflection | …type in an input then read `getAttribute("value")`? (**stale**) · …`.className` vs `getAttribute("class")`? | D |
| J109 | `classList` | `add remove toggle contains replace`, force flag | …`toggle(name, false)`? | I:ui.js |
| J110 | `dataset` | camelCase mapping, string-only | …`data-topic-id` → key? (`topicId`) · …storing a number? (string back) | I:ui.js |
| J111 | Styles | `.style` (inline only), `getComputedStyle`, CSS var get/set | …read a class-defined colour via `.style`? (empty) · …`getComputedStyle` in a loop? (forced sync layout) | D |
| J112 | Event registration | `addEventListener`, options `{once, passive, capture, signal}` | …an anonymous function then `removeEventListener`? (**can't remove**) · …`preventDefault` in a passive listener? (ignored + warning) | D |
| J113 | Event phases | capture → target → bubble | …a listener with `capture:true` on an ancestor? (fires before the target) · …which events don't bubble? (`focus`, `blur`, `load`) | D |
| J114 | Event delegation | one listener, `closest`, `matches`, dynamic children | …the click lands on a child `<span>`? (`target` is the span — need `closest`) | I:ui.js |
| J115 | `stopPropagation` vs `stopImmediatePropagation` vs `preventDefault` | three different jobs | …`preventDefault` on a non-cancelable event? · …`stopPropagation` and delegation? (breaks the parent handler) | D |
| J116 | Event object | `target vs currentTarget`, `relatedTarget`, `isTrusted`, `defaultPrevented` | …`this` vs `target` vs `currentTarget` in a delegated handler? | D |
| J117 | Custom events | `CustomEvent`, `detail`, `dispatchEvent`, `bubbles` | …`bubbles` defaults to? (false) | I:store.js |
| J118 | Keyboard events | `key vs code vs keyCode`, modifiers, repeat | …`keydown` vs `keypress` vs `keyup` for Enter? | I:ui.js |
| J119 | Focus events | `focus/blur` (no bubble) vs `focusin/focusout` | …delegating focus? (must use `focusin`) | I:ui.js |
| J120 | `localStorage` | sync, string-only, ~5MB, per-origin | …store an object directly? (`"[object Object]"`) · …private mode? (may throw) · …quota exceeded? (QuotaExceededError) | D |
| J121 | `sessionStorage` | per-tab lifetime | …duplicate the tab? (copied) · …a new tab to the same origin? (separate) | I:store.js |
| J122 | `storage` event | fires in **other** tabs only | …expect it in the writing tab? (never fires) · …`sessionStorage` writes? (don't cross tabs) | D |
| J123 | Cookies | `document.cookie`, `path domain max-age expires Secure SameSite HttpOnly` | …read an `HttpOnly` cookie from JS? (**invisible**) · …`SameSite=None` without `Secure`? (rejected) | D |
| J124 | Storage decision matrix | which of the three, when | …an auth token in `localStorage`? (XSS-readable — HttpOnly cookie is correct) | I:ARCHITECTURE.md |
| J125 | `JSON.stringify` | replacer, space, `toJSON`, what's dropped | …`undefined`/function in an object? (**key dropped**) · …in an array? (becomes `null`) · …circular? (TypeError) · …a `Date`? (ISO string, not a Date on parse) | D |
| J126 | `JSON.parse` | reviver, throws on invalid | …parse `undefined`? (throws) · …`localStorage.getItem` on a missing key then parse? (`null` → parse gives null) | D |
| J127 | `structuredClone` | deep clone, handles cycles/Map/Set/Date, rejects functions | …a function inside? (DataCloneError) · …vs the JSON round-trip? | D |
| J128 | Shallow vs deep copy | spread, `assign`, recursive clone, cycles | …spread a nested object then mutate the nested part? (**shared**) · …a recursive clone with a cycle? (stack overflow — needs a WeakMap seen-set) | D |
| J129 | Hash routing | `location.hash`, `hashchange` | …a direct load into a deep hash? (must route on boot, not only on change) | I:main.js |
| J130 | History API | `pushState replaceState popstate` | …`pushState` fires `popstate`? (**no**) · …a deep link without a server rewrite? (404 on static hosting) | I:main.js |
| J131 | `IntersectionObserver` | root, rootMargin, threshold, unobserve | …forget to `unobserve`? (leak) · …threshold `0` vs `1`? | I:ui.js |
| J132 | `MutationObserver` | childList/attributes/subtree, microtask timing | …observing your own mutations? (infinite loop) | I:loop.js |
| J133 | `ResizeObserver` | element-level, loop-limit error | …resizing inside the callback? ("loop completed with undelivered notifications") | I:ui.js |
| J134 | `new Function` vs `eval` | scope access, CSP, strict | …`eval` reading a local variable? (can) · …`new Function`? (**cannot** — global scope only) · …under a strict CSP? (both blocked) | D |
| J135 | Same-origin policy | origin = scheme + host + port | …`https://a.com` vs `https://a.com:8443`? (different origins) · …subdomain? (different) | D |
| J136 | CORS | `Origin`, `Access-Control-Allow-*`, simple vs preflighted, credentials | …a custom header on a GET? (triggers preflight) · …`Allow-Origin: *` with credentials? (rejected) · …can JS read the response of a blocked request? (no) | D |
| J137 | XSS & escaping | stored/reflected/DOM-based, sinks, CSP | …rendering drill code with `innerHTML`? (**the vulnerability you must not ship**) · …`textContent` instead? (safe) | I:ui.js |
| J138 | CSRF | `SameSite`, tokens, why it differs from XSS | …why doesn't `SameSite=Lax` stop everything? | OUT — needs a server; prepared spoken answer |
| J139 | `Intl` | `NumberFormat` (currency), `DateTimeFormat`, `RelativeTimeFormat`, locales | …`toFixed(2)` for currency vs `Intl`? (rounding + locale) | I:ui.js |

---

# PART F — POLYFILLS (21)

**Rule:** each is a **drill**, not a library file. You write it; the runner parity-tests it against
native across the listed cases. See `POLYFILLS.md` for the intuition + derivation of each.

| # | Polyfill | The case that proves you understand it | Term |
|---|---|---|---|
| P01 | `Array.prototype.map` | Sparse holes stay holes · `thisArg` honoured · length read once · callback gets `(el, i, arr)` | D |
| P02 | `Array.prototype.filter` | Holes skipped · result is dense · truthiness not `=== true` | D |
| P03 | `Array.prototype.reduce` | **Empty + no initial → TypeError** · initial `undefined` is still "provided"? (no — `arguments.length`) | D |
| P04 | `Array.prototype.forEach` | Always returns `undefined` · cannot break · mutation during iteration | D |
| P05 | `Array.prototype.find` / `findIndex` | **Visits holes** (unlike filter) · returns `undefined` / `-1` | D |
| P06 | `Array.prototype.some` / `every` | `every([])` → **true** (vacuous) · `some([])` → false · short-circuit | D |
| P07 | `Array.prototype.includes` | Finds `NaN` where `indexOf` can't · negative `fromIndex` · SameValueZero | D |
| P08 | `Array.prototype.indexOf` | Strict equality → `NaN` never found · negative fromIndex clamping | D |
| P09 | `Array.prototype.flat` / `flatMap` | `Infinity` depth · holes removed · recursion vs an explicit stack | D |
| P10 | `Array.prototype.slice` | Negative indices · shallow copy · the array-like idiom | D |
| P11 | `Array.from` | Array-likes · iterables · the **map-fn second argument** · `{length:n}` | D |
| P12 | `Array.prototype.at` | Negative index · out of range → `undefined` | D |
| P13 | `Function.prototype.call` | Unique-key temp property (use `Symbol`) · primitive `thisArg` boxing · `null` → global (sloppy) | D |
| P14 | `Function.prototype.apply` | `null`/`undefined` args must not throw · array-like args | D |
| P15 | `Function.prototype.bind` | Partial args · **behaves correctly under `new`** · preserves prototype chain · `length`/`name` | D |
| P16 | `new` operator (`myNew`) | Create → link prototype → apply → **object-return override rule** | D |
| P17 | `instanceof` (`myInstanceof`) | Walk `__proto__` to `null` · primitives → false · `Symbol.hasInstance` | D |
| P18 | `Object.create` | `null` prototype · the second (descriptors) argument | D |
| P19 | `Promise` (`MyPromise`) | State written once · handlers **always async** · thenable assimilation · chaining returns a new promise | D |
| P20 | `Promise.all` / `allSettled` | **Result order ≠ resolution order** · empty array resolves immediately · non-promise values wrapped | D |
| P21 | `Promise.race` / `any` | `any` rejects with `AggregateError` · race settles on the first **settle**, not first fulfil | D |

---

# PART G — PERFORMANCE, MEMORY & TOOLING (17)

| # | Topic | Subtopics | CASES | Term |
|---|---|---|---|---|
| J140 | Reflow vs repaint vs composite | which properties trigger which | …animating `top` vs `transform`? (measure both) | I:style.css |
| J141 | Layout thrashing | read-write-read forced sync layout | …`offsetHeight` inside a write loop? (forced reflow each iteration) · the read-then-write fix? | D |
| J142 | Debounce | trailing/leading, cancel, the closure timer | …a rapid burst then silence? · …leading edge fires when? · …why does an arrow vs function matter for `this`? | D |
| J143 | Throttle | interval limiting, trailing call | …vs debounce for scroll? · …the final call dropped? | D |
| J144 | rAF-based scheduling | batching per frame vs throttling by time | …rAF vs `throttle(16)`? | I:loop.js |
| J145 | Garbage collection | reachability, mark-and-sweep, generational | …two objects referencing each other, unreachable from root? (**collected** — cycles are fine) | D |
| J146 | Leak — detached DOM nodes | removed but still referenced | …keep a reference to a removed subtree? (whole tree retained) | I:ui.js |
| J147 | Leak — forgotten timers | `setInterval` on an unmounted view | …the view is destroyed but the interval polls on? | I:ui.js |
| J148 | Leak — listeners & closures | listeners retaining scope | …`AbortController.signal` to remove many at once? | I:ui.js |
| J149 | `WeakMap` as a registry | metadata that dies with the key | …why not a `Map` here? | I:ui.js |
| J150 | DevTools — Memory | heap snapshots, comparison, retainers | …heap doesn't return to baseline after unmount? (**the leak lab**) | I:README.md |
| J151 | DevTools — Performance | flame chart, long tasks, layout markers | …a task over 50ms? | I:README.md |
| J152 | Lighthouse / Core Web Vitals | LCP, CLS, INP | …no image dimensions? (CLS) | I:README.md |
| J153 | Bundle & load strategy | no build step, ESM, dynamic `import()` | …lazy-load a surface on route hit? | I:main.js |
| J154 | Testing without a framework | assert helpers, a tiny runner, parity tests | …a test that passes because both sides are broken identically? | I:runner.js |
| J155 | Web Workers | separate thread, `postMessage`, no DOM, `terminate()` | …the infinite-loop kill switch? (the only real fix) | OUT — prepared answer; see ARCHITECTURE Part 8 |
| J156 | Service Workers | HTTPS, lifecycle, cache strategies | …offline support? | OUT — stretch goal only |

---

# PART R — REACT (122)

**OA weight:** the Mettl React Redux Developer test names React as 1 of 3 competencies.
**Scope:** every row is CORE. `V` in the Type column = vanilla mastery gives you the mechanism free;
you are only learning React's name for it (see `PARALLEL_BUILD.md` Part 2).

## R1 · Paradigm & Rendering Model (12)

| # | Topic | Subtopics | CASES — what if… | Type | OA | Term |
|---|---|---|---|---|---|---|
| R001 | Declarative vs imperative UI | describe state, not steps | …you reach for `document.querySelector` inside a component? | R | M | D |
| R002 | Virtual DOM | in-memory tree, what it is NOT | …someone says "VDOM is faster than the DOM"? (false — it's faster than *naive* re-rendering) | R | **H** | D |
| R003 | Reconciliation | diffing two trees, O(n) | …why not O(n³)? (two heuristics make it linear) | R | **H** | D |
| R004 | Diffing heuristic 1 | different element type ⇒ discard whole subtree | …`<div>` becomes `<span>`? (children unmounted, state lost) | R | **H** | D |
| R005 | Diffing heuristic 2 | keys give stable identity across renders | …no key on a dynamic list? (React warns, falls back to index) | R | **H** | D |
| R006 | `key` — index vs stable id | reorder, insert-at-front, delete | …index keys and you prepend an item? (**every row's state shifts down**) | V+R | **H** | D |
| R007 | Render phase vs commit phase | render = pure & interruptible; commit = DOM writes | …a side effect in render? (may run twice, StrictMode proves it) | R | M | D |
| R008 | Fiber | interruptible units of work, linked list | …how does React pause mid-render? | R | L | D |
| R009 | One-way data flow | props down, events up | …a child needs to change a parent's state? (callback prop) | R | **H** | D |
| R010 | Composition over inheritance | children, slots, wrapper components | …you `extends` another component? (React has no idiom for it) | R | M | D |
| R011 | Batching | React 17 = events only; **React 18 = automatic everywhere** | …two `setState` in a `setTimeout` on 17 vs 18? (2 renders vs 1) | R | **H** | D |
| R012 | Element vs component vs instance | `<A/>` is an object, `A` is a function | …`typeof <A/>`? (`"object"` — a plain descriptor) | R | **H** | D |

## R2 · JSX (10)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R013 | JSX → `React.createElement` | classic vs automatic runtime | …no `React` import with the classic runtime? (ReferenceError) | R | **H** | D |
| R014 | Single root · Fragments | `<></>` vs `<React.Fragment>` | …two siblings returned bare? (SyntaxError) · …a Fragment needs a key? (must use the long form) | R | **H** | D |
| R015 | Reserved-word attributes | `className`, `htmlFor`, camelCase events | …you write `class` in JSX? (warning, still works) · …`onclick` lowercase? (**silently does nothing**) | R | **H** | D |
| R016 | Expressions only | no `if`/`for` inside braces | …`{if (x) …}`? (SyntaxError) · what IS allowed? | R | **H** | D |
| R017 | Conditional rendering | `&&`, ternary, early return, `null` | …return `null`? (renders nothing, still mounts) | R | **H** | D |
| R018 | The `{count && <X/>}` trap | falsy leakage into output | …`count` is `0`? (**renders the literal 0**) · …`""`? (renders nothing) · the fix? | **V+R** | **H** | D |
| R019 | Rendering lists | `.map` returning elements | …you use `forEach`? (returns undefined, nothing renders) | V+R | **H** | D |
| R020 | `dangerouslySetInnerHTML` | `{{__html}}` shape, XSS | …you pass a string directly? (React refuses — the shape is the warning) | R | M | D |
| R021 | `children` as a prop | `props.children`, function-as-child | …children is a single element vs array? (not always an array) | R | M | D |
| R022 | JSX whitespace & comments | `{/* */}`, newline collapsing | …a comment written `<!-- -->`? (renders as text) | R | L | D |

## R3 · Components & Props (10)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R023 | Function vs class components | which supports what | …you need an error boundary in a function component? (**impossible**) | R | **H** | D |
| R024 | Props are read-only | never mutate | …`props.x = 1` inside a component? (throws in strict mode) | V | **H** | D |
| R025 | `defaultProps` vs default params | deprecated for function components in React 19 | …`defaultProps` on a function component in 19? (warning) | R | M | D |
| R026 | `PropTypes` | dev-only runtime validation | …a PropTypes failure in production? (**stripped — no check at all**) | R | M | D |
| R027 | `React.Children` | `map`, `count`, `only`, `toArray` | …`props.children.map` when there is one child? (TypeError) | R | L | D |
| R028 | Keyed Fragments | `<React.Fragment key>` in a list | …you need a key on `<></>`? (shorthand can't take one) | R | M | D |
| R029 | Portals | `createPortal`, DOM elsewhere, **events still bubble through the React tree** | …a click inside a portal — does the React parent's handler fire? (**yes**) | R | M | D |
| R030 | Error boundaries | `getDerivedStateFromError` + `componentDidCatch`, **class-only** | …an error in an event handler? (**boundaries do NOT catch it**) · …in async code? (also not caught) | R | **H** | D |
| R031 | `React.memo` | shallow prop compare, custom comparator | …a prop is an inline object? (**memo defeated every render**) · comparator returns true = skip | R | **H** | D |
| R032 | Capitalisation rule | lowercase = DOM tag | …`<myComponent/>`? (React renders an unknown HTML tag) | R | **H** | D |

## R4 · Class Components & Lifecycle (16) — *explicitly in the Mettl syllabus*

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R033 | `constructor` + `super(props)` | why props must be forwarded | …you omit `props` from `super`? (**`this.props` is undefined in the constructor only**) | R | **H** | D |
| R034 | `this.state` initialisation | assign directly in constructor only | …`this.state = x` outside the constructor? (no re-render) | R | **H** | D |
| R035 | `setState` is async + batched | queued, not immediate | …read `this.state` right after `setState`? (**stale**) | R | **H** | D |
| R036 | Functional updater | `setState(prev => …)` | …two `setState(this.state.n + 1)` in a row? (**increments once**) · with updater? (twice) | V+R | **H** | D |
| R037 | `setState` callback | second argument, runs post-commit | …you need the new value? (callback, not the next line) | R | M | D |
| R038 | `render()` purity | no side effects, no setState | …`setState` inside render? (infinite loop) | R | **H** | D |
| R039 | `componentDidMount` | after first commit, DOM available | …fetch here vs in constructor? | R | **H** | D |
| R040 | `shouldComponentUpdate` | returns boolean, skips render | …returns `false`? (children don't re-render either) | R | **H** | D |
| R041 | `componentDidUpdate(prevProps, prevState)` | compare before acting | …unconditional `setState` here? (**infinite loop**) | R | **H** | D |
| R042 | `componentWillUnmount` | cleanup only, no setState | …`setState` here? (warning, memory leak) | R | **H** | D |
| R043 | `static getDerivedStateFromProps` | static, no `this`, runs on EVERY render | …you try `this.props` inside? (undefined — it's static) | R | **H** | D |
| R044 | `getSnapshotBeforeUpdate` | runs **after** render, **before** DOM mutation; return feeds `componentDidUpdate` | …you don't return anything? (third arg is undefined) | R | M | D |
| R045 | `getDerivedStateFromError` vs `componentDidCatch` | render fallback vs log side effect | …which one can call a logging service? (`componentDidCatch`) | R | M | D |
| R046 | Legacy `UNSAFE_` methods | `componentWillMount / WillReceiveProps / WillUpdate` | …why deprecated? (unsafe under async rendering) | R | M | D |
| R047 | `PureComponent` | implements shallow `shouldComponentUpdate` | …state holds a mutated array? (**shallow compare misses it**) | R | **H** | D |
| R048 | `this` binding in handlers | constructor bind vs class field arrow | …an unbound method passed to `onClick`? (`this` undefined) | **V** | **H** | D |

**Mount / Update / Unmount order is a guaranteed MCQ.** Memorise the sequence, not the prose.

## R5 · Hooks (25)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R049 | Rules of Hooks | top level only; components + custom hooks only | …a hook inside `if`? (order breaks) | R | **H** | D |
| R050 | *Why* the rules exist | hooks are matched by **call order**, not name | …conditional hook on render 2? (React reads the wrong slot) | R | **H** | D |
| R051 | `useState` | returns `[value, setter]` | …setter with the same value? (bails out, may still render once) | R | **H** | D |
| R052 | Lazy initialiser | `useState(() => expensive())` | …`useState(expensive())`? (**runs on every render**) | R | M | D |
| R053 | Functional update | `setX(prev => prev + 1)` | …two updates in one handler without it? (last wins) | V+R | **H** | D |
| R054 | `useEffect` | side effects after commit | …you fetch without a deps array? (infinite loop) | R | **H** | D |
| R055 | Deps array comparison | `Object.is`, shallow, per-item | …an object literal in deps? (**new reference every render**) | **V+R** | **H** | D |
| R056 | Cleanup function | runs before every re-run AND on unmount | …a subscription with no cleanup? (leak) · when exactly does it run? | V+R | **H** | D |
| R057 | Effect timing | asynchronous, **after paint** | …you measure DOM layout in `useEffect`? (may flicker) | R | **H** | D |
| R058 | `[]` vs no array vs `[deps]` | three distinct behaviours | …omit the array entirely? (every render) | R | **H** | D |
| R059 | `useLayoutEffect` | synchronous, **before paint** | …when is it required over `useEffect`? (measuring/mutating before paint) · SSR warning? | R | M | D |
| R060 | `useContext` | reads nearest Provider | …no Provider above? (falls back to `createContext` default) | R | **H** | D |
| R061 | `useReducer` | `(state, action) => state`, dispatch | …when over `useState`? (complex/related transitions) | R | **H** | D |
| R062 | `useCallback` | memoised function identity | …`useCallback` with no deps and a captured variable? (**stale closure**) | R | **H** | D |
| R063 | `useMemo` | memoised value | …used for a cheap computation? (net negative) | R | **H** | D |
| R064 | Referential identity | why the memo hooks exist at all | …a new array prop each render into a `memo` child? | **V** | **H** | D |
| R065 | `useRef` as a mutable box | `.current`, survives renders, **no re-render** | …update `ref.current` expecting a render? (nothing happens) | R | **H** | D |
| R066 | `useRef` for DOM | `ref={node}`, null before mount | …read `ref.current` during render? (**null on first render**) | R | **H** | D |
| R067 | `forwardRef` | pass a ref through a component | …a ref on a function component without it? (warning, ref is null) | R | M | D |
| R068 | `useImperativeHandle` | expose a custom ref API | …used without `forwardRef`? | R | L | D |
| R069 | Custom hooks | `use` prefix, composition, isolated state | …two components using the same hook — shared state? (**no, separate**) | R | **H** | D |
| R070 | The stale closure trap | effect/callback capturing an old value | …`setInterval` in a `[]` effect reading state? (**frozen at initial**) · two fixes? | **V+R** | **H** | D |
| R071 | `useId` | SSR-stable unique ids | …`Math.random()` for an id instead? (hydration mismatch) | R | L | D |
| R072 | `useTransition` / `useDeferredValue` | mark updates non-urgent | …a heavy filter blocking input? | R | L | D |
| R073 | `useSyncExternalStore` / `useDebugValue` | external store subscription; devtools label | …tearing in concurrent rendering? | R | L | D |

## R6 · Performance (9)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R074 | The four re-render causes | own state, new props, context change, parent re-render | …parent renders, child props identical — child re-renders? (**yes, unless memo**) | R | **H** | D |
| R075 | `React.memo` + comparator | second argument, returns "are equal" | …comparator returns `true`? (**skip** — inverted vs `shouldComponentUpdate`) | R | **H** | D |
| R076 | When memo hooks HURT | comparison + memory cost | …`useMemo` on `a + b`? | R | **H** | D |
| R077 | Inline props break memoisation | `{}`, `[]`, `() => {}` | …`style={{color}}` on a memo child? (defeated every render) | **V+R** | **H** | D |
| R078 | Key stability & list perf | stable ids vs index | …sorting a list with index keys? | R | **H** | D |
| R079 | `React.lazy` + `Suspense` | dynamic import, fallback | …`lazy` without a `Suspense` boundary? (throws) | R | M | D |
| R080 | Windowing / virtualisation | render only what's visible | …10k rows in the DOM? | R | L | D |
| R081 | Profiler | `<Profiler>` API, DevTools flame chart | …how do you prove a memo helped? | R | M | D |
| R082 | Context re-render cost | every consumer re-renders on value change | …a new object as the Provider `value` each render? (**all consumers re-render**) | R | M | D |

## R7 · Routing (6)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R083 | Client-side routing | no full reload, history manipulation | …a hard refresh on a deep route with static hosting? (404) | R | M | D |
| R084 | `BrowserRouter` vs `HashRouter` | server rewrite requirement | …GitHub Pages + BrowserRouter? (**broken deep links**) | V+R | M | D |
| R085 | `Routes` / `Route` / nesting | `element`, `Outlet`, index routes | …nested route renders nothing? (missing `Outlet`) | R | M | D |
| R086 | Router hooks | `useParams` `useNavigate` `useLocation` `useSearchParams` | …`useNavigate` outside a Router? (throws) | R | M | D |
| R087 | `<Link>` vs `<a>` | prevents default, no reload | …plain `<a href>` in an SPA? (full reload, state lost) | R | M | D |
| R088 | Protected routes | guard component, redirect, `replace` | …redirect without `replace`? (back button traps the user) | R | L | D |

## R8 · Forms (5)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R089 | Controlled components | `value` + `onChange`, React owns state | …`value` with no `onChange`? (**read-only input + warning**) | R | **H** | D |
| R090 | Uncontrolled components | `ref`, DOM owns state | …when is uncontrolled correct? (file inputs — always uncontrolled) | R | M | D |
| R091 | `defaultValue` vs `value` | initial vs controlled | …`value={undefined}` then a string? (controlled/uncontrolled switch warning) | R | M | D |
| R092 | Many inputs, one handler | `name` + computed key | …computed property syntax in `setState`? | R | M | D |
| R093 | Form libraries | Formik, React Hook Form (uncontrolled-first) | …why is RHF faster? (fewer re-renders) | R | L | D |

## R9 · Data Fetching (5)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R094 | `useEffect` fetch pattern | deps, loading/error state | …fetch in render instead? (fires every render) | R | **H** | D |
| R095 | Cleanup / abort on unmount | `AbortController` in the cleanup | …setState after unmount? (leak warning) | **V+R** | **H** | D |
| R096 | Race conditions | stale response overwrites fresh | …two fast searches, slow first response? (**stale wins**) · the ignore-flag fix? | **V+R** | M | D |
| R097 | Loading / error / empty states | the three every fetch needs | …only success handled? | R | M | D |
| R098 | React Query / SWR | cache, dedupe, revalidate | …why not just `useEffect`? | R | L | D |

## R10 · Build Tooling (10) — *Webpack is named in the Mettl syllabus*

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R099 | Webpack `entry` | single vs multiple entry points | …multiple entries and shared deps? | R | M | D |
| R100 | Webpack `output` | `path`, `filename`, `publicPath`, `[contenthash]` | …deploy to a subpath without `publicPath`? (assets 404) | R | M | D |
| R101 | Loaders | `babel-loader`, `css-loader`, `style-loader` | …**loader order is right-to-left / bottom-to-top** — swap css and style? (breaks) | R | **H** | D |
| R102 | Plugins | `HtmlWebpackPlugin`, `MiniCssExtractPlugin` | …loader vs plugin — what's the difference? | R | M | D |
| R103 | `mode` | development vs production defaults | …what does production turn on? (minify, tree-shake, NODE_ENV) | R | M | D |
| R104 | `devServer` + HMR | hot reload, proxy | …HMR vs live reload? (state preserved vs lost) | R | M | D |
| R105 | Code splitting | `SplitChunksPlugin`, dynamic `import()` | …vendor chunk not split? | R | M | D |
| R106 | Babel | `@babel/preset-react`, `preset-env`, polyfills | …classic vs automatic JSX runtime? | R | M | D |
| R107 | Vite contrast | native ESM in dev, Rollup in prod | …why is Vite's dev start instant? (no bundling) | R | L | D |
| R108 | Source maps | `devtool`, prod trade-offs | …ship source maps to production? | R | L | D |

## R11 · Testing (5)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R109 | Jest basics | `describe`/`it`/`expect`, mocks | …a test that passes because both sides are equally wrong? | R | L | D |
| R110 | RTL queries | `getBy` throws · `queryBy` null · `findBy` async | …assert absence — which query? (`queryBy`) | R | M | D |
| R111 | `user-event` vs `fireEvent` | real interaction sequence vs single event | …typing via `fireEvent.change`? (skips keydown/keyup) | R | L | D |
| R112 | Testing hooks | `renderHook`, `act` | …state update outside `act`? (warning) | R | L | D |
| R113 | Snapshot testing | brittle, rots | …a snapshot updated without reading the diff? | R | L | D |

## R12 · Patterns & Ecosystem (9)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| R114 | Higher-Order Components | function returning a component | …props not forwarded? · ref forwarding lost? | V+R | M | D |
| R115 | Render props | function-as-child | …vs a custom hook today? | R | M | D |
| R116 | Compound components | shared implicit state via context | …`<Tabs><Tab/></Tabs>` communication? | R | L | D |
| R117 | Controlled vs uncontrolled design | who owns state, in your own API | …supporting both? | R | M | D |
| R118 | Container / presentational | legacy split, superseded by hooks | …still relevant? | R | L | D |
| R119 | CSR vs SSR vs SSG · hydration | where HTML is produced | …a hydration mismatch? (React re-renders, warns) | R | M | D |
| R120 | Next.js awareness | file routing, RSC, `use client` | …why do Server Components exist? | R | L | D |
| R121 | React styling approaches | CSS Modules, styled-components, Tailwind, inline | …inline style objects and re-renders? · **the one CSS topic the tech round names** | R | M | D |
| R122 | React 18/19 delta | concurrent, automatic batching, Actions, `use()` | …what broke between 17 and 18? (batching) | R | M | D |

---

# PART X — REDUX & FLUX (34)

**OA weight:** Redux is 1 of the 3 named competencies on the Mettl React Redux Developer test.
**Every row is CORE.** This is the band with the highest marks-per-hour on the whole exam, because
it is small, closed, and vocabulary-driven.

## X1 · Flux & Rationale (7)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| X01 | Flux architecture | **Action → Dispatcher → Store → View** | …name all four in order? · which one does Redux delete? | R | **H** | D |
| X02 | The Dispatcher | single registry, `waitFor` | …Redux's dispatcher? (**there isn't one** — that's the difference) | R | **H** | D |
| X03 | Flux vs Redux | many stores vs one; dispatcher vs reducers | …name three differences? | R | M | D |
| X04 | Why Redux exists | prop drilling, shared state, predictability | …when do you NOT need it? | R | **H** | D |
| X05 | Principle 1 — single source of truth | one store tree | …two stores? | R | **H** | D |
| X06 | Principle 2 — state is read-only | change only via dispatched actions | …mutate `state.x` directly? (**no re-render, DevTools blind**) | R | **H** | D |
| X07 | Principle 3 — pure reducers | same input ⇒ same output, no side effects | …`Math.random()` or a fetch inside a reducer? | V+R | **H** | D |

## X2 · Store & Actions (9)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| X08 | Creating a store | `createStore` (legacy) vs `configureStore` (RTK) | …`createStore` deprecation warning? | R | **H** | D |
| X09 | `store.getState()` | full tree snapshot | …call it in a reducer? | R | **H** | D |
| X10 | `store.dispatch(action)` | the only mutation path | …dispatch inside a reducer? (throws) | R | **H** | D |
| X11 | `store.subscribe(listener)` | returns unsubscribe | …forget to unsubscribe? (leak) | V+R | M | D |
| X12 | Action object shape | `{ type, payload }`, `type` required | …an action with no `type`? (**throws**) | R | **H** | D |
| X13 | Action creators | functions returning actions | …why not dispatch literals everywhere? | R | **H** | D |
| X14 | Action type constants | string constants, collisions, `slice/action` naming | …two slices with the same type string? (**both reducers run**) | R | M | D |
| X15 | Payload conventions | FSA, `error`, `meta` | …multiple values? | R | L | D |
| X16 | `store.replaceReducer` | hot reloading, code splitting | …when? | R | L | D |

## X3 · Reducers (8)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| X17 | Reducer signature | `(state, action) => newState` | …return `undefined`? (**throws**) | R | **H** | D |
| X18 | Initial state | default parameter, `undefined` on first call | …no default? (state is undefined forever) | V+R | **H** | D |
| X19 | The `default` case | **must return existing state unchanged** | …omit `default`? (state wiped on every unrelated action) | R | **H** | D |
| X20 | Immutable update — objects | spread, nested levels | …`state.user.name = x`? (mutation, no render) | **V+R** | **H** | D |
| X21 | Immutable update — arrays | `concat`/spread/`filter`/`map`, never `push`/`splice`/`sort` | …`state.items.push()`? · …`.sort()` on state? (**mutates in place**) | **V+R** | **H** | D |
| X22 | `combineReducers` | slice keys map to state shape | …a slice reducer returning undefined? (throws with the key name) | R | **H** | D |
| X23 | Reducer composition | slices own their branch only | …one reducer reaching into another's slice? | R | M | D |
| X24 | Switch vs lookup map | style, exhaustiveness | …fallthrough with no `break`/`return`? | V | L | D |

## X4 · Middleware & Async (6)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| X25 | Middleware signature | **`store => next => action`** — three curried levels | …write it from memory? · …forget `next(action)`? (**action never reaches the reducer**) | **V+R** | **H** | D |
| X26 | `applyMiddleware` | order matters, left to right | …logger before vs after thunk? | R | M | D |
| X27 | `redux-thunk` | dispatch a **function** instead of an object | …dispatch a function without thunk? (**throws — actions must be plain objects**) | R | **H** | D |
| X28 | Thunk internals | `(dispatch, getState) => …` | …how does thunk know it's a function? (one `typeof` check) | R | M | D |
| X29 | Async action triad | pending / fulfilled / rejected | …only handle success? | R | M | D |
| X30 | `redux-saga` | generators, `yield` effects, declarative | …saga vs thunk in one sentence? | R | L | D |

## X5 · react-redux & Toolkit (4)

| # | Topic | Subtopics | CASES | Type | OA | Term |
|---|---|---|---|---|---|---|
| X31 | `Provider` · `useSelector` · `useDispatch` | store via context; selector subscribes | …a selector returning a **new object** each call? (**re-renders every dispatch**) · `shallowEqual`? | R | **H** | D |
| X32 | `connect` / `mapStateToProps` / `mapDispatchToProps` | legacy HOC, `ownProps` | …`mapDispatchToProps` omitted? (`dispatch` injected as a prop) | R | M | D |
| X33 | Selectors & `reselect` | `createSelector`, memoised derivation | …an expensive derivation inline in the component? | R | M | D |
| X34 | Redux Toolkit | `createSlice`, `configureStore`, `createAsyncThunk`, **Immer** | …you "mutate" in a createSlice reducer — legal? (**yes, Immer**) · outside RTK? (**no**) | R | M | D |

---

# PART H — EXPLICITLY OUT (12)

Each is a **prepared spoken answer**, not a gap. "I scoped it out and here's why" outperforms a half-build.

| Topic | Blocker | Your one-liner |
|---|---|---|
| Generators / iterators | Deliberately skipped | "Lazy sequences with `yield`; `Symbol.iterator` makes anything `for…of`-able. Cheap to add if you want it." |
| `Proxy` / `Reflect` | Deliberately skipped | "Interception traps — it's how Vue 3 reactivity works, versus React's explicit setState." |
| `Symbol` beyond existence | Deliberately skipped | "Unique non-colliding keys; well-knowns like `Symbol.iterator` hook into language protocols." |
| Web Workers | No CPU-bound work | "Separate thread, message-passing, no DOM. The only real fix for an unkillable loop." |
| Service Workers | Stretch only | "Programmable proxy for offline. No offline requirement here." |
| IndexedDB | Low yield, high cost | "Async, transactional, no 5MB cap. `localStorage` is enough for this state size." |
| WebSockets / SSE | Needs a server | "Cross-tab sync via `storage` events gives me the same event-driven model without one." |
| Canvas / WebGL | No fit | "CSS transforms cover the animation topics I need." |
| Geolocation | Permission-gated | "Same async-permission pattern as any prompt API." |
| Real auth / hashing | Unsafe client-side | "Cannot be done safely in the browser — recognising that is the point." |
| CSRF tokens | Needs a server | "Server-issued, server-verified, plus `SameSite`." |
| Sass / Less | Deliberately excluded | "Custom properties and `@layer` do it natively — that's the stronger answer." |

---

## How to use this file

1. **Never read it top-to-bottom.** It is a ledger, not a curriculum.
2. The coach walks you through it in build order (`ARCHITECTURE.md` Part 4), and the campaign
   state tracks which rows are closed.
3. **CASES are revealed only after your attempt.** Reading them first puts five items in working
   memory competing with the task and destroys the learning.
4. A row is closed only at **SPOT IT + BUILD IT + SAY IT**. Never at BUILD IT alone.
