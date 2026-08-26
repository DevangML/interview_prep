import type { LearnTopic } from './types';

/** Responding to the viewport, the container, the user, and interaction state. */
export const cssResponsiveTopics: LearnTopic[] = [
  {
    id: 'css-media-container',
    area: 'CSS',
    group: 'Responsive',
    title: 'Media queries, container queries and responsive strategy',
    status: 'covered',
    minutes: 8,
    summary:
      'Media queries ask about the viewport; container queries ask about the parent. The second is what finally makes a component genuinely reusable.',
    body: [
      'Media queries test the **viewport and device**: `@media (min-width: 48rem)`, and the modern range syntax `@media (width >= 48rem)`, which reads better and avoids the off-by-one of `max-width: 47.99rem`. Mobile-first means writing the small layout as the base and adding `min-width` queries — you end up with less CSS and a sensible fallback.',
      'Beyond width, media queries test capability and preference: `(prefers-color-scheme: dark)`, `(prefers-reduced-motion: reduce)` — which you should honour by disabling non-essential animation — `(prefers-contrast: more)`, `(hover: hover)` and `(pointer: coarse)`. That last pair is the correct way to detect touch: do not sniff user agents, ask whether hover exists.',
      '**Container queries** ask about the *element\'s own container*: mark an ancestor with `container-type: inline-size` (optionally `container-name`), then `@container (min-width: 30rem) { … }`. Now a card renders wide inside a wide slot and narrow inside a sidebar — **with no knowledge of the page layout**. That is the difference between a responsive page and a responsive component, and it is why container queries matter more for design systems than media queries ever did.',
      'Container query units follow: `cqw`, `cqh`, `cqi` (inline), `cqb` (block) — sized against the container rather than the viewport, so `font-size: 5cqi` scales type with the component.',
      'Choose deliberately: media queries for page-level structure (sidebar appears, navigation collapses), container queries for component-level adaptation. Many layouts now need neither, because `flex-wrap`, `auto-fit` and `clamp()` handle the middle ground without any breakpoint at all.',
    ],
    keyPoints: [
      'Media query = viewport. Container query = parent element.',
      '`container-type: inline-size` on the parent is required before `@container` does anything.',
      'Detect touch with `(pointer: coarse)`, never with user-agent sniffing.',
      'Honour `prefers-reduced-motion` — it is an accessibility requirement, not a nicety.',
    ],
    interview:
      '"How would you make this card responsive inside any container?" is the container-query question, and most candidates still answer with media queries. Naming `container-type` and the `cqi` unit is a clear signal of currency.',
    code: `.sidebar, .main { container-type: inline-size; }

.card { display: grid; gap: 1rem; }
@container (width >= 30rem) {
  .card { grid-template-columns: 12rem 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}`,
    resources: [
      { label: 'MDN — Using container queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries', kind: 'docs' },
      { label: 'MDN — Using media queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries', kind: 'docs' },
      { label: 'web.dev — Responsive design in 2026', url: 'https://web.dev/learn/design', kind: 'article' },
    ],
  },
  {
    id: 'css-states',
    area: 'CSS',
    group: 'Interaction',
    title: 'Focus states, `:focus-visible`, and styling interaction accessibly',
    status: 'covered',
    minutes: 6,
    summary:
      'The focus ring is the single most commonly destroyed accessibility feature in front-end code, and `:focus-visible` is the reason nobody needs to destroy it any more.',
    body: [
      '`:focus` matches whenever an element has focus — including after a mouse click, which is why designers historically asked for `outline: none` and developers complied, breaking keyboard navigation for everyone.',
      '`:focus-visible` matches only when the browser judges a focus indicator appropriate — keyboard navigation yes, mouse click on a button no, but click into a text input yes, because you need to see the caret context. It resolves the design objection completely: style `:focus-visible` and the ring appears exactly when it should.',
      '`:focus-within` matches an element when **anything inside it** has focus. It is how you highlight a whole form field group, or keep a dropdown open while a child input is focused, with no JavaScript.',
      'If you remove the default outline, you owe a replacement with sufficient contrast against **both** the component and the page. `outline` is the right property because — unlike `border` — **it does not take up layout space**, so nothing shifts when it appears. `outline-offset` pushes it away from the edge for legibility.',
      'For interaction states generally: `:hover` must never be the only affordance (touch devices have no hover), `:active` gives press feedback, `:disabled` should look unavailable *and* be genuinely non-interactive, and `aria-disabled` with a visual style is preferred when the control must stay focusable so screen-reader users can find it.',
    ],
    keyPoints: [
      '`:focus-visible` shows the ring for keyboards and hides it for mouse clicks.',
      '`:focus-within` styles a parent when a descendant is focused.',
      '`outline` does not affect layout; `border` does — that is why outline is used for focus.',
      'Hover can never be the only affordance.',
    ],
    interview:
      '"How do you handle focus styles without them looking bad on click?" — `:focus-visible`. This is a small question that reliably separates people who have thought about accessibility from people who have not.',
    code: `:focus-visible {
  outline: 2px solid Highlight;   /* system colour, respects forced-colors */
  outline-offset: 2px;
}
.field:focus-within { border-color: var(--accent); }`,
    resources: [
      { label: 'MDN — :focus-visible', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible', kind: 'docs' },
      { label: 'MDN — :focus-within', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within', kind: 'docs' },
      { label: 'WCAG — Focus visible (2.4.7)', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html', kind: 'spec' },
    ],
  },
  {
    id: 'css-tokens-modern',
    area: 'CSS',
    group: 'Modern CSS',
    title: 'Custom properties, design tokens, `color-mix`, nesting, `:has` layouts',
    status: 'covered',
    minutes: 7,
    summary:
      'The 2026 toolkit: variables that cascade, colours computed in CSS, nesting without a preprocessor, and the selectors that removed whole categories of JavaScript.',
    body: [
      '**Custom properties** (`--brand: #0ea5e9`) differ from preprocessor variables in one decisive way: they are live, they **inherit**, and they can be changed at runtime by a media query, a class, or JavaScript (`el.style.setProperty`). That is what makes theming possible without rebuilding a stylesheet. They are also case-sensitive, and `var(--x, fallback)` supplies a default.',
      'A **token layer** is the convention: primitives (`--blue-500`), then semantic tokens (`--color-accent: var(--blue-500)`), then component tokens (`--button-bg: var(--color-accent)`). Components consume only the last layer, so re-theming touches one place. Dark mode becomes a redefinition of the semantic layer inside `@media (prefers-color-scheme: dark)` — or `light-dark(lightValue, darkValue)` in a single declaration.',
      '`color-mix(in oklab, var(--accent) 20%, transparent)` computes colours in CSS: tints, shades and translucent variants without generating a palette by hand. `oklch()` gives perceptually uniform colours, so a lightness change looks like the same step across hues — which HSL does not.',
      '**Native nesting** is now supported without a preprocessor: `& .child`, `&:hover`, and nested media queries. Use it shallowly — nesting deeply reproduces the specificity problems Sass was criticised for.',
      'Two more worth naming because interviewers are starting to: `text-wrap: balance` for headlines that no longer orphan a word, `field-sizing: content` for inputs that grow with their value, and `content-visibility: auto` to skip rendering off-screen sections — a genuine performance win for long pages, applied in this very app.',
    ],
    keyPoints: [
      'Custom properties inherit and are live at runtime; Sass variables are neither.',
      'Three token layers: primitive → semantic → component.',
      '`color-mix()` and `oklch()` remove hand-built palettes.',
      'Nest shallowly — deep nesting recreates specificity wars.',
    ],
    interview:
      '"How would you implement dark mode?" — semantic token layer redefined under `prefers-color-scheme`, plus a class or `data-theme` override so the user can choose. Mentioning `light-dark()` shows you have read the 2026 additions.',
    code: `:root {
  --blue-500: oklch(0.68 0.15 240);
  --color-accent: var(--blue-500);          /* semantic */
  --button-bg: var(--color-accent);          /* component */
  --button-bg-hover: color-mix(in oklab, var(--button-bg) 85%, black);
}
[data-theme="dark"] { --color-accent: oklch(0.78 0.13 240); }
.button { background: var(--button-bg); &:hover { background: var(--button-bg-hover); } }`,
    resources: [
      { label: 'MDN — Using CSS custom properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties', kind: 'docs' },
      { label: 'MDN — color-mix()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix', kind: 'docs' },
      { label: 'MDN — CSS nesting', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting', kind: 'docs' },
      { label: 'web.dev — Modern CSS', url: 'https://web.dev/learn/css', kind: 'article' },
    ],
  },
];
