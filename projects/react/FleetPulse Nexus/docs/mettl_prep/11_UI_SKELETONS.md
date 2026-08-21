# UI Skeletons — Layout Muscle Memory
### The non-functional half: markup + CSS, zero state. Serves the OA simulator AND machine-coding rounds.

> **Premise (correct, keep it):** if you are solving CSS *and* state simultaneously, cognitive load splits
> and you bleed clock. Layout must be reflex so working memory is free for logic.
> **Validated 2026-08-20** against a 6-archetype draft. Bones were good; this corrects four gaps.

---

## THE FOUR CORRECTIONS

**1 · Classes in one `<style>` block — never inline style objects.**
Inline styles *cannot express* `:hover`, `:focus-visible`, `::placeholder`, media queries or keyframes.
That is a capability ceiling, not a taste question. Graders assess "forms, buttons, labels, focus behavior
and keyboard support" and "keeping styling readable."

**2 · Accessibility is scored.** Mettl lists **HTML5 Semantics** as a sub-skill; interviewers check
keyboard behaviour and semantic markup (tabs must be `<button>`, not clickable `<div>`).

**3 · Four archetypes were missing** — Form, Table, Tabs, and the Loading/Empty/Error triad. Form is the
highest-frequency layout there is.

**4 · Responsive was thin.** One media query and correct units are not optional.

### The always-on preamble (type this first, every time — 20 seconds)
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font: 16px/1.5 system-ui, sans-serif; color: #111827; background: #f3f4f6; }
:where(button, a, input, select, textarea):focus-visible {
  outline: 2px solid #2563eb; outline-offset: 2px;
}
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px;
           overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
```
`box-sizing` first — without it, `width:100%` + `padding` overflows every input you write.
`:focus-visible` once, globally — that single rule covers the keyboard check across the whole build.

---

## THE 10 ARCHETYPES

### 1 · Centered Box — auth, dialog, empty state
```css
.center-viewport { min-height: 100dvh; display: grid; place-items: center; padding: 16px; }
.card { width: 100%; max-width: 420px; background: #fff; border: 1px solid #e5e7eb;
        border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgb(0 0 0 / .08); }
```
`100dvh` not `100vh` — `vh` is wrong under mobile browser chrome. `place-items: center` is the whole trick.

### 2 · Action Bar — search + filters + primary action
```html
<div class="bar">
  <div class="bar__grow">
    <label class="sr-only" for="q">Search</label>
    <input id="q" class="input" type="search" placeholder="Search…">
  </div>
  <div class="bar__actions"><button class="btn btn--primary">Add item</button></div>
</div>
```
```css
.bar { display:flex; justify-content:space-between; align-items:center; gap:12px;
       flex-wrap:wrap; padding:12px 0; border-bottom:1px solid #e5e7eb; }
.bar__grow { flex: 1 1 200px; } .bar__actions { display:flex; gap:8px; }
.input { width:100%; padding:8px 12px; border:1px solid #d1d5db; border-radius:6px; }
.btn { padding:8px 16px; border-radius:6px; border:1px solid #d1d5db; background:#fff; cursor:pointer; }
.btn--primary { background:#2563eb; border-color:#2563eb; color:#fff; font-weight:500; }
.btn--primary:hover { background:#1d4ed8; }
.btn[disabled] { opacity:.5; cursor:not-allowed; }
```
**Every input gets a `<label>`.** Use `.sr-only` when the design has no visible label. A placeholder is not
a label — it vanishes on type and screen readers may skip it.

### 3 · Data List — todos, notifications, cart
```html
<ul class="stack">
  <li class="row">
    <div><p class="row__title">Primary title</p><span class="row__meta">Metadata</span></div>
    <div class="row__actions">
      <span class="badge">Active</span>
      <button class="btn-icon" aria-label="Delete primary title">&times;</button>
    </div>
  </li>
</ul>
```
```css
.stack { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
.row { display:flex; justify-content:space-between; align-items:center; gap:12px;
       padding:12px 16px; background:#fff; border:1px solid #e5e7eb; border-radius:6px; }
.row__title { margin:0; font-weight:600; } .row__meta { font-size:.85rem; color:#6b7280; }
.row__actions { display:flex; align-items:center; gap:8px; }
.badge { font-size:.75rem; padding:2px 8px; border-radius:999px; background:#e0f2fe; color:#0369a1; }
```
An icon-only button **needs `aria-label`**. `&times;` alone announces as "times".

### 4 · Responsive Card Grid
```css
.grid { display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
```
One line, no media queries. Know the discriminator cold: **`auto-fit` collapses empty tracks so items
stretch; `auto-fill` keeps them, leaving a gap.** That is an interview question.

### 5 · App Shell — header + sidebar + scrollable main
```css
.shell { display:grid; grid-template-rows:56px 1fr; grid-template-columns:220px 1fr;
         grid-template-areas:"hd hd" "sb main"; height:100dvh; }
.shell__hd { grid-area:hd; border-bottom:1px solid #e5e7eb; background:#fff;
             display:flex; align-items:center; padding:0 20px; }
.shell__sb { grid-area:sb; border-right:1px solid #e5e7eb; background:#f9fafb; padding:16px;
             overflow-y:auto; }
.shell__main { grid-area:main; padding:24px; overflow-y:auto; }
@media (max-width: 640px) {
  .shell { grid-template-columns:1fr; grid-template-areas:"hd" "main"; }
  .shell__sb { display:none; }
}
```
```html
<div class="shell">
  <header class="shell__hd"><strong>Brand</strong></header>
  <aside class="shell__sb"><nav><a href="/">Dashboard</a><a href="/settings">Settings</a></nav></aside>
  <main class="shell__main">…</main>
</div>
```
**Grid areas beat nested flex** — one declaration, and the mobile collapse is a two-line media query.
`<a>` **must** have `href` or it is not keyboard-focusable. Use real `<header>/<aside>/<main>/<nav>`.

### 6 · Modal — use the native element
```html
<dialog id="dlg" class="dlg" aria-labelledby="dlg-title">
  <form method="dialog" class="dlg__form">
    <header class="dlg__hd">
      <h3 id="dlg-title">Title</h3>
      <button class="btn-icon" value="cancel" aria-label="Close dialog">&times;</button>
    </header>
    <div class="dlg__body">Body</div>
    <footer class="dlg__ft">
      <button class="btn" value="cancel">Cancel</button>
      <button class="btn btn--primary" value="confirm">Confirm</button>
    </footer>
  </form>
</dialog>
```
```css
.dlg { width:min(90vw, 500px); padding:0; border:none; border-radius:8px; }
.dlg::backdrop { background: rgb(0 0 0 / .5); }
```
`dlg.showModal()` gives you **focus trap, Escape, backdrop and background inertness for free.**
`method="dialog"` closes and reports which button was pressed.

**If asked to hand-roll it** (a common follow-up), you owe six things, and say them out loud:
`role="dialog"` · `aria-modal="true"` · `aria-labelledby` · **move focus in** on open · **trap Tab/Shift+Tab** ·
**Escape closes** · **return focus to the trigger** · background `inert`/`aria-hidden`.
Also `position: fixed; inset: 0;` — **never `width:100vw`**, which overflows when a scrollbar exists.

### 7 · Form with inline validation ← *was missing*
```html
<form class="form" novalidate>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" class="input" type="email" aria-describedby="email-err" aria-invalid="true">
    <p id="email-err" class="field__err" role="alert">Enter a valid email.</p>
  </div>
  <button class="btn btn--primary" type="submit">Submit</button>
</form>
```
```css
.form { display:flex; flex-direction:column; gap:16px; max-width:420px; }
.field { display:flex; flex-direction:column; gap:6px; }
.field__err { margin:0; font-size:.85rem; color:#b91c1c; }
.input[aria-invalid="true"] { border-color:#b91c1c; }
```
`aria-describedby` links the error to the input · `aria-invalid` styles *and* announces it ·
`role="alert"` makes a screen reader speak it on appear. Three attributes, and the a11y box is ticked.

### 8 · Data Table ← *was missing*
```css
.table-wrap { overflow-x:auto; }                     /* the wrapper scrolls, never the page */
.table { width:100%; border-collapse:collapse; }
.table th, .table td { padding:10px 12px; text-align:left; border-bottom:1px solid #e5e7eb; }
.table thead th { position:sticky; top:0; background:#f9fafb; }
.table td.num { text-align:right; font-variant-numeric: tabular-nums; }
```
Real `<table><thead><tbody>` with `<th scope="col">`. Sortable headers are `<button>` inside `<th>`,
with `aria-sort="ascending|descending|none"`. Numbers right-aligned and tabular.

### 9 · Tabs ← *was missing*
```html
<div role="tablist" class="tabs">
  <button role="tab" aria-selected="true"  aria-controls="p1" id="t1" class="tab">One</button>
  <button role="tab" aria-selected="false" aria-controls="p2" id="t2" class="tab" tabindex="-1">Two</button>
</div>
<div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```
```css
.tabs { display:flex; gap:4px; border-bottom:1px solid #e5e7eb; }
.tab { border:none; background:none; padding:10px 16px; cursor:pointer; border-bottom:2px solid transparent; }
.tab[aria-selected="true"] { border-bottom-color:#2563eb; color:#2563eb; font-weight:600; }
```
**Tabs are `<button>`s, never `<div>`s** — this is the exact example graders cite. Roving `tabindex`:
the active tab is `0`, the rest `-1`, arrow keys move between them.

### 10 · The State Triad — loading / empty / error ← *was missing*
```html
<div class="state" role="status" aria-live="polite">Loading…</div>
<div class="state">No results for “<b>xyz</b>”. <button class="btn">Clear search</button></div>
<div class="state state--err" role="alert">Couldn't load. <button class="btn">Retry</button></div>
```
```css
.state { display:grid; place-items:center; gap:8px; padding:48px 16px;
         text-align:center; color:#6b7280; }
.state--err { color:#b91c1c; }
```
**Every hidden test case checks these three.** An empty state with no explicit message is a failed
assertion. `aria-live="polite"` for loading, `role="alert"` for errors.

---

## THE COMPOSITION LAW

Almost every interview screen is **App Shell → Action Bar → (Grid | List | Table) → State Triad**,
with Modal and Form layered on top. Drill the ten separately, then drill *composing* them: the seam
between archetypes is where time actually goes.

## DRILL TARGETS (blank file, no reference)

| # | Archetype | Target |
|---|---|---|
| 1 | Centered box | 2 min |
| 2 | Action bar | 3 min |
| 3 | Data list | 3 min |
| 4 | Card grid | 90 sec |
| 5 | App shell + mobile collapse | 5 min |
| 6 | Modal (`<dialog>`) | 3 min |
| 7 | Form + inline validation | 4 min |
| 8 | Table + sticky header | 4 min |
| 9 | Tabs + roving tabindex | 4 min |
| 10 | State triad | 2 min |
| — | **Composition: shell + bar + grid + states** | **12 min** |

**Acceptance for every one:** keyboard-only reachable · no horizontal page scroll at 375px ·
no console errors · every control has an accessible name.

**Sources:** [MDN — aria-modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal) · [GreatFrontEnd — Machine Coding Round](https://www.greatfrontend.com/blog/machine-coding-round) · [WCAG 2.2 modals & dialogs](https://www.thewcag.com/examples/modals-dialogs) · [Mettl front-end competencies](https://mettl.com/en/test/front-end-developer-assessment-for-experienced-professionals/)
