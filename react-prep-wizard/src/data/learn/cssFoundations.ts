import type { LearnTopic } from './types';

/** How CSS decides what applies: the cascade, selectors, and the box itself. */
export const cssFoundationTopics: LearnTopic[] = [
  {
    id: 'css-cascade',
    area: 'CSS',
    group: 'The cascade',
    title: 'Cascade, specificity, inheritance and `!important`',
    status: 'partial',
    minutes: 8,
    summary:
      'When two rules fight, four things decide the winner — in a fixed order. Most "CSS is unpredictable" complaints are this order not being known.',
    body: [
      'The cascade resolves conflicts in this order: **origin and importance** first, then **specificity**, then **source order**. Author styles beat user-agent defaults; `!important` flips the origin ordering, which is why an `!important` in a user stylesheet beats an `!important` in yours.',
      'Specificity is counted as three numbers — **(ids, classes, elements)**. Inline `style` sits above all of them, and `!important` above that. `#nav .item a` is (1,1,1); `.item.active` is (0,2,0) and therefore loses to any id. The universal selector `*` and combinators (`>`, `+`, `~`) add nothing. Crucially, specificity is compared **left to right, not summed** — (1,0,0) beats (0,99,0), because eleven classes never add up to an id.',
      '`:is()` and `:not()` take the specificity of their **most specific argument**; `:where()` always counts **zero**, which is what makes it the correct tool for library defaults you want consumers to override without a fight.',
      '**Inheritance** is separate from the cascade. Some properties inherit by default (`color`, `font-*`, `line-height`, `visibility`, `cursor`); most do not (`margin`, `padding`, `border`, `background`, `display`). The keywords `inherit`, `initial`, `unset` (inherit if inheritable, else initial), `revert` (back to the previous origin) and `all: unset` let you control it explicitly.',
      '`@layer` is the modern answer to specificity wars: layers are compared **before** specificity, so a rule in a later layer beats a more specific rule in an earlier one. Declaring `@layer reset, base, components, utilities` once gives you a predictable ordering that no amount of nesting can disturb.',
    ],
    keyPoints: [
      'Order: origin/importance → specificity → source order.',
      'Specificity is (ids, classes, elements), compared left to right — never summed.',
      '`:where()` has zero specificity; `:is()` takes its most specific argument.',
      '`@layer` outranks specificity entirely.',
    ],
    interview:
      '"Which rule wins?" with two selectors is a standard warm-up. Count out loud as a triple. The senior follow-up is "how do you avoid specificity wars" — answer `@layer`, `:where()` for defaults, and a flat class-based convention rather than deep nesting.',
    code: `#main .card p  →  (1,1,1)
.card.active   →  (0,2,0)   loses: ids beat any number of classes
:where(.card) p → (0,0,1)   the :where part contributes nothing
@layer base { a { color: red } }
@layer theme { a { color: blue } }   /* blue wins — later layer */`,
    resources: [
      { label: 'MDN — Cascade, specificity and inheritance', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade', kind: 'docs' },
      { label: 'MDN — Specificity', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity', kind: 'docs' },
      { label: 'MDN — @layer', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@layer', kind: 'docs' },
      { label: 'Specificity calculator', url: 'https://specificity.keegan.st/', kind: 'practice' },
    ],
  },
  {
    id: 'css-selectors',
    area: 'CSS',
    group: 'Selectors',
    title: 'Selectors, combinators, pseudo-classes, pseudo-elements, attributes',
    status: 'partial',
    minutes: 7,
    summary:
      'The full selector vocabulary, including the attribute and data-attribute forms that make state-driven styling possible without extra classes.',
    body: [
      '**Combinators** describe relationships: `A B` (descendant, any depth), `A > B` (direct child), `A + B` (immediately next sibling), `A ~ B` (any later sibling). There is no parent or previous-sibling combinator — `:has()` fills that role.',
      '**Attribute selectors** match on markup rather than classes: `[disabled]` (present), `[type="text"]` (exact), `[href^="https"]` (starts with), `[href$=".pdf"]` (ends with), `[class*="col-"]` (contains), `[lang|="en"]` (exactly or hyphen-prefixed), and `[data-state="open" i]` for case-insensitive matching.',
      '**Data attributes** are the idiomatic way to express component state in markup — `data-state="loading"`, `data-variant="primary"` — and style it with `[data-state="loading"] { … }`. It keeps state visible in the DOM (helpful in DevTools and in tests) and avoids the class-name juggling that `classnames` exists to manage. In JavaScript they are `el.dataset.state`.',
      '**Pseudo-classes** describe state: `:hover`, `:focus`, `:focus-visible`, `:focus-within`, `:active`, `:disabled`, `:checked`, `:required`, `:valid`/`:invalid`/`:user-invalid`, `:first-child`, `:last-child`, `:only-child`, `:nth-child(an+b)`, `:nth-of-type`, `:empty`, `:target`. `:nth-child(2n+1)` is odd rows; `:nth-last-child` counts from the end.',
      '**Pseudo-elements** create sub-elements: `::before`, `::after` (require `content`, even `content: ""`), `::first-line`, `::first-letter`, `::marker` (list bullets), `::selection`, `::placeholder`, `::backdrop`. One colon is the legacy form; two is correct.',
      '**`:has()`** is the parent selector CSS lacked for twenty years: `.card:has(img)` styles the card *because of* its contents, and `label:has(input:checked)` styles a label from its input\'s state. It is now supported everywhere and quietly removes a great deal of JavaScript.',
    ],
    keyPoints: [
      'Four combinators: descendant, child `>`, adjacent `+`, general sibling `~`.',
      '`::before`/`::after` render nothing without a `content` property.',
      '`data-*` + attribute selectors express component state without class juggling.',
      '`:has()` selects a parent by its children.',
    ],
    interview:
      'Expect "select every second row", "style a label when its checkbox is checked" (`:has()` or `:checked + label`), and "difference between `:focus` and `:focus-visible`" — the latter matches only when the browser judges a focus ring appropriate, i.e. keyboard rather than mouse.',
    code: `.row:nth-child(2n)          { background: #f8fafc; }
[data-state="loading"] .spin { animation: spin 1s linear infinite; }
.card:has(> img)             { padding-block-start: 0; }
label:has(input:checked)     { font-weight: 700; }
a[href$=".pdf"]::after       { content: " (PDF)"; }`,
    resources: [
      { label: 'MDN — CSS selectors', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors', kind: 'docs' },
      { label: 'MDN — :has()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has', kind: 'docs' },
      { label: 'MDN — Using data attributes', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes', kind: 'docs' },
      { label: 'CSS Diner', url: 'https://flukeout.github.io/', kind: 'practice', note: 'Thirty-two levels of selector drilling. Half an hour well spent.' },
    ],
  },
  {
    id: 'css-box-display',
    area: 'CSS',
    group: 'Box model',
    title: 'Box model, display types, formatting contexts and `flow-root`',
    status: 'covered',
    minutes: 8,
    summary:
      'What a box measures, what `display` really sets, and why a container sometimes refuses to contain its own children.',
    body: [
      '`box-sizing: content-box` (the default) means `width` sizes the **content only** — padding and border are added on top, so `width: 200px; padding: 1rem; border: 2px` occupies 236px. `border-box` makes `width` the **total**, and padding eats inward. The universal reset exists because border-box is what people mean nearly every time.',
      '`display` sets **two** things: the outer role (how the box behaves among siblings — `block`, `inline`, `inline-block`) and the inner layout (how its children are laid out — `flow`, `flow-root`, `flex`, `grid`). The modern two-value syntax makes it explicit: `display: inline flex` is what the legacy `inline-flex` meant.',
      'A **Block Formatting Context (BFC)** is an independent layout region. Inside one, floats are contained, and **margins do not collapse across its boundary**. `display: flow-root` creates one with no side effects — it is the modern, honest replacement for the clearfix hack and for `overflow: hidden` used purely to contain floats.',
      '**Margin collapsing** is the behaviour that surprises everyone: adjacent vertical margins between siblings collapse to the larger of the two (not the sum), a parent and its first/last child collapse together unless separated by padding, border or a new BFC, and an empty element\'s own top and bottom margins collapse into one. Horizontal margins never collapse, and margins never collapse inside flex or grid containers — which is one reason `gap` is easier to reason about.',
      '`display: contents` removes the box itself while keeping its children in the parent\'s layout — useful for a wrapper that must not break a grid, and a known accessibility hazard on elements with semantics, because some browsers historically dropped the role along with the box.',
    ],
    keyPoints: [
      'content-box adds padding and border to `width`; border-box includes them.',
      '`display` sets outer role *and* inner layout.',
      '`flow-root` creates a BFC cleanly — no clearfix, no `overflow: hidden` side effects.',
      'Margins collapse to the larger value, never inside flex or grid.',
    ],
    interview:
      '"Why is my element 236px when I set 200px" is the box-model classic. "My parent has no height even though it has children" is the float/BFC question — answer `flow-root`. Margin collapsing is asked as "what is the gap between these two paragraphs" and the answer is the larger margin, not the sum.',
    code: `/* contain floats and stop margin collapse, with no side effects */
.container { display: flow-root; }

/* the reset that makes 200px mean 200px */
*, *::before, *::after { box-sizing: border-box; }`,
    resources: [
      { label: 'MDN — Introduction to the CSS box model', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model', kind: 'docs' },
      { label: 'MDN — Block formatting context', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context', kind: 'docs' },
      { label: 'MDN — Mastering margin collapsing', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing', kind: 'docs' },
    ],
  },
];
