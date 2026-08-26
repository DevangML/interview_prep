import type { LearnTopic } from './types';

/** Flexbox in full: axes, the shorthand nobody reads, and the alignment set. */
export const cssFlexTopics: LearnTopic[] = [
  {
    id: 'css-flex-axes',
    area: 'CSS',
    group: 'Flexbox',
    title: 'Flex axes, direction, reverse, wrap and `order`',
    status: 'covered',
    minutes: 7,
    summary:
      'Flexbox is one-dimensional and content-driven. Everything else follows from knowing which axis you are on — which is the thing `flex-direction` silently changes.',
    body: [
      'A flex container has a **main axis** and a **cross axis**. `flex-direction: row` (the default) puts the main axis horizontally, so `justify-content` distributes along the row and `align-items` works vertically. Set `column` and the two swap meaning entirely. Nearly every "justify-content isn\'t working" question is a main-axis confusion.',
      '`row-reverse` and `column-reverse` reverse the **main-start and main-end** edges. This has a consequence people miss: `justify-content: flex-start` now packs items to the *right* (in a left-to-right writing mode), and the visual order no longer matches DOM order — which means **keyboard and screen-reader order no longer match visual order**. That is an accessibility defect, not a style choice, and the same warning applies to `order`.',
      '`flex-wrap: wrap` allows a second line; `nowrap` (the default) forces everything onto one, shrinking items to fit. `flex-flow` is the shorthand for direction plus wrap. Once wrapping is on, `align-content` becomes meaningful — it distributes the **lines**, whereas `align-items` positions items *within* a line. On a single-line container `align-content` does nothing, which is a frequent source of confusion.',
      '`order` changes visual position without changing the DOM. It is a legitimate tool for responsive reordering, and it carries the same accessibility caveat as the reverse directions: tab order follows the DOM, so a visually reordered layout can become unnavigable. Use it deliberately and sparingly.',
      '`gap` (with `row-gap`/`column-gap`) spaces items without the margin arithmetic that used to require `:last-child` exceptions. It applies **between** items only, never outside them.',
    ],
    keyPoints: [
      '`justify-content` = main axis. `align-items` = cross axis. `flex-direction` decides which is which.',
      '`align-content` only does something when there is more than one line.',
      '`row-reverse` and `order` break the match between visual and keyboard order.',
      '`gap` applies between items, not around them.',
    ],
    interview:
      '"Centre a div" wants `display: flex; justify-content: center; align-items: center` — or `place-items: center` in grid. The better follow-up question is "now make it a column" and see whether you know the properties swapped axes.',
    code: `.bar {
  display: flex;
  flex-flow: row wrap;      /* direction + wrap */
  justify-content: space-between;  /* along the main axis */
  align-items: center;             /* across the cross axis */
  align-content: flex-start;       /* only matters once wrapped */
  gap: 1rem;
}`,
    resources: [
      { label: 'MDN — Basic concepts of flexbox', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox', kind: 'docs' },
      { label: 'CSS-Tricks — A complete guide to flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', kind: 'article', note: 'The diagram reference everyone keeps open.' },
      { label: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', kind: 'practice' },
    ],
  },
  {
    id: 'css-flex-sizing',
    area: 'CSS',
    group: 'Flexbox',
    title: '`flex` shorthand, `flex-basis` vs `width`, grow and shrink',
    status: 'covered',
    minutes: 7,
    summary:
      'The `flex` shorthand is three properties in a trench coat, and its defaults are not the ones you would guess. This is the highest-yield flexbox topic in interviews.',
    body: [
      '`flex: <grow> <shrink> <basis>`. The initial value is `flex: 0 1 auto` — do not grow, do shrink, size from content. The common shorthands expand to: `flex: 1` → `1 1 0%`, `flex: auto` → `1 1 auto`, `flex: none` → `0 0 auto`, `flex: initial` → `0 1 auto`.',
      'The distinction that decides layouts: **`flex: 1` sets basis to `0%`**, so all free space is divided equally and items end up the **same size regardless of content**. **`flex: auto`** starts from content size and then distributes the remainder, so a longer item stays wider. Choosing the wrong one is why "my columns are uneven" happens.',
      '`flex-basis` is the starting size along the **main axis** before grow and shrink apply, and it **beats `width`** when both are set (on a row). On a column, basis governs height instead. `flex-basis: auto` defers to `width`/`height`; `content` sizes from the content itself.',
      '`flex-shrink` is weighted by basis: an item twice as wide shrinks twice as fast at the same shrink factor. `flex-shrink: 0` is the fix for the classic bug where an icon or avatar gets squashed — and the other half of that bug is `min-width`.',
      '**A flex item will not shrink below its content\'s minimum size** because `min-width`/`min-height` default to `auto` on flex items. That is why a long unbroken string overflows its container: the fix is `min-width: 0` (or `overflow: hidden`) on the item, and it is one of the most useful facts in day-to-day CSS.',
    ],
    keyPoints: [
      'Default is `flex: 0 1 auto` — shrink but do not grow.',
      '`flex: 1` = equal sizes (basis 0). `flex: auto` = content-aware sizes.',
      '`flex-basis` overrides `width` on the main axis.',
      '`min-width: 0` is the cure for a flex item that refuses to shrink.',
    ],
    interview:
      '"Difference between `flex: 1` and `flex: auto`" is asked constantly and answered vaguely. Say: basis `0%` versus `auto`, therefore equal versus content-proportional. "Why does my text overflow the flex container" expects `min-width: auto` and the `min-width: 0` fix.',
    code: `/* equal columns whatever the content */
.col { flex: 1; }          /* 1 1 0%  */

/* content-sized, sharing only the leftover */
.col { flex: auto; }       /* 1 1 auto */

/* the two classic fixes */
.icon  { flex-shrink: 0; }   /* stop the avatar being squashed */
.label { min-width: 0; }     /* let long text truncate instead of overflow */`,
    resources: [
      { label: 'MDN — Controlling ratios of flex items', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis', kind: 'docs' },
      { label: 'MDN — flex', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex', kind: 'docs' },
      { label: 'CSS-Tricks — Flexbox and min-width: auto', url: 'https://css-tricks.com/flexbox-truncated-text/', kind: 'article' },
    ],
  },
  {
    id: 'css-flex-align',
    area: 'CSS',
    group: 'Flexbox',
    title: 'align-self, auto margins and the alignment family',
    status: 'covered',
    minutes: 6,
    summary:
      'Per-item alignment, and the auto-margin trick that solves the "push this one to the end" problem more cleanly than anything else.',
    body: [
      '`align-items` sets the cross-axis alignment for every item; `align-self` overrides it for one. Values: `stretch` (the default — which is why equal-height cards happen for free), `flex-start`, `flex-end`, `center`, `baseline` (aligns text baselines rather than boxes, which is what you want for labels of different font sizes).',
      '**`margin: auto` absorbs free space in the direction it is applied**, and in flexbox it does so along either axis. `margin-left: auto` on one item pushes it and everything after it to the end — the idiomatic way to put a logout button at the right of a nav bar without a spacer element. `margin: auto` on a single item centres it on both axes.',
      'Auto margins have a priority worth knowing: they consume free space **before** `justify-content` gets a chance, so an item with `margin-left: auto` wins over the container\'s distribution. That is a feature — it lets one item opt out of the container\'s scheme.',
      '`justify-content` values: `flex-start`, `flex-end`, `center`, `space-between` (no outer space), `space-around` (half-size outer space), `space-evenly` (equal everywhere). The difference between the last three is asked as a diagram question surprisingly often.',
      'Baseline alignment deserves a note: `align-items: baseline` lines up the first text baseline of each item, which is usually what a designer means by "aligned" for a row of labels with different sizes — and something `center` gets subtly wrong.',
    ],
    keyPoints: [
      '`align-items` is the container default; `align-self` overrides one item.',
      '`margin-left: auto` pushes an item to the end; `margin: auto` centres it both ways.',
      'Auto margins eat free space before `justify-content` distributes it.',
      '`stretch` is the default — that is why flex children are equal height.',
    ],
    interview:
      '"Put the last item on the right without a spacer" — `margin-left: auto`. "Difference between space-between, around and evenly" — describe the outer gaps. Both are quick wins that show fluency.',
    code: `nav { display: flex; gap: 1rem; }
nav .logout { margin-left: auto; }   /* pushed to the far end */

.card { display: flex; }
.card .badge { align-self: flex-start; }  /* opt out of stretch */`,
    resources: [
      { label: 'MDN — Aligning items in a flex container', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container', kind: 'docs' },
      { label: 'MDN — CSS box alignment', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment', kind: 'docs', note: 'The unified model shared by flex and grid — worth reading once properly.' },
    ],
  },
];
