import type { LearnTopic } from './types';

/** Grid: explicit tracks, implicit tracks, and two-axis alignment. */
export const cssGridTopics: LearnTopic[] = [
  {
    id: 'css-grid-tracks',
    area: 'CSS',
    group: 'Grid',
    title: 'Tracks, `fr`, `repeat`, `minmax`, `auto-fit` vs `auto-fill`',
    status: 'covered',
    minutes: 8,
    summary:
      'Grid is two-dimensional and parent-driven: the container defines the tracks and items are placed into them. Track sizing is where the power lives.',
    body: [
      '`grid-template-columns` and `grid-template-rows` define the **explicit** grid. Tracks can be fixed (`200px`), content-based (`auto`, `min-content`, `max-content`, `fit-content(300px)`) or fractional (`1fr`). `fr` distributes **leftover** space after fixed tracks and gaps are subtracted, which is why `1fr 1fr` is reliably equal and `50% 50%` breaks the moment a `gap` exists.',
      '`repeat(3, 1fr)` is shorthand for three equal tracks. `minmax(min, max)` bounds a track — `minmax(200px, 1fr)` never goes below 200px but grows to share space. **`minmax(0, 1fr)`** is the essential defensive form: a bare `1fr` means `minmax(auto, 1fr)`, and `auto` refuses to go below the content\'s minimum, which is exactly why a long word or a `<pre>` blows a grid column out of its container.',
      '**`auto-fit` versus `auto-fill`** is the most-asked grid question. Both repeat as many tracks as fit. `auto-fill` keeps the empty tracks, so remaining items do not stretch and the grid stays on its rhythm. `auto-fit` **collapses** the empty tracks to zero, so the existing items expand to fill the row. With one item: `auto-fill` leaves it at its minimum with empty columns beside it; `auto-fit` stretches it across the whole row.',
      'That combination is the famous responsive grid with no media query at all: `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`. The inner `min(100%, 18rem)` prevents overflow on screens narrower than the minimum, which the naive version gets wrong on small phones.',
      'Lines can be named — `[full-start] 1fr [content-start] minmax(0, 60ch) [content-end] 1fr [full-end]` — and items placed by name, which is how full-bleed article layouts are built.',
    ],
    keyPoints: [
      '`fr` divides space left over after fixed tracks and gaps.',
      '`1fr` means `minmax(auto, 1fr)`; use `minmax(0, 1fr)` to allow shrinking.',
      '`auto-fill` keeps empty tracks; `auto-fit` collapses them so items stretch.',
      '`repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` — responsive with zero media queries.',
    ],
    interview:
      'Guaranteed: "difference between auto-fit and auto-fill". Describe the one-item case — it is unambiguous and shows you have actually used both. "Why does my grid overflow" expects `minmax(0, 1fr)`.',
    code: `.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
}
.safe { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); } /* can shrink */`,
    resources: [
      { label: 'MDN — CSS grid layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout', kind: 'docs' },
      { label: 'CSS-Tricks — A complete guide to grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', kind: 'article' },
      { label: 'Grid Garden', url: 'https://cssgridgarden.com/', kind: 'practice' },
    ],
  },
  {
    id: 'css-grid-placement',
    area: 'CSS',
    group: 'Grid',
    title: 'Placement, spanning, `grid-template-areas` and implicit tracks',
    status: 'covered',
    minutes: 7,
    summary:
      'Where items land, how they span, and what happens to the ones you never placed.',
    body: [
      'Items are placed by **line number**, not by cell: `grid-column: 1 / 3` spans from line 1 to line 3, which is two columns. Negative numbers count from the end, so `grid-column: 1 / -1` means "full width" regardless of how many tracks exist — the single most useful placement idiom. `span N` is relative: `grid-column: span 2`.',
      '`grid-template-areas` lets you draw the layout as ASCII and assign items by name. It is the most readable form for page-level layout, a `.` marks an empty cell, and every row string must have the same number of columns or the whole declaration is invalid. `grid-area` on the child claims the name.',
      'Anything that does not fit the explicit grid creates the **implicit** grid. `grid-auto-rows` and `grid-auto-columns` size those generated tracks — `grid-auto-rows: minmax(120px, auto)` is the common "rows at least this tall" pattern. Without it, implicit rows are `auto`-sized.',
      '`grid-auto-flow` controls how auto-placement fills: `row` (default), `column`, and the `dense` modifier, which back-fills earlier holes with later items. `dense` reorders visually without changing DOM order — the same accessibility caveat as flexbox `order` applies.',
      'Grid items can overlap deliberately by placing two items in the same cell; stacking is then decided by `z-index` and source order. This is how card overlays and hero compositions are built without absolute positioning.',
    ],
    keyPoints: [
      'Placement is by line, not cell: `1 / 3` spans two columns.',
      '`grid-column: 1 / -1` is full width for any number of tracks.',
      '`grid-auto-rows` sizes rows the explicit grid never declared.',
      '`grid-auto-flow: dense` back-fills holes and breaks visual/DOM order.',
    ],
    interview:
      '"Build a holy-grail layout" is best answered with `grid-template-areas` — it is readable and demonstrably two-dimensional. Mentioning `1 / -1` for the full-width header scores.',
    code: `.page {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 200px;
  grid-template-areas:
    "head head head"
    "nav  main aside"
    "foot foot foot";
  grid-auto-rows: minmax(4rem, auto);
}
.head { grid-area: head; }`,
    resources: [
      { label: 'MDN — Grid template areas', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas', kind: 'docs' },
      { label: 'MDN — Auto-placement in grid layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout', kind: 'docs' },
    ],
  },
  {
    id: 'css-grid-align',
    area: 'CSS',
    group: 'Grid',
    title: 'Two-axis alignment: justify/align items, content, self, `place-*`',
    status: 'covered',
    minutes: 6,
    summary:
      'Grid gives you both axes at once, and six properties that people mix up because the names are nearly identical.',
    body: [
      'The naming rule that makes it all learnable: **`justify-*` acts on the inline (row) axis, `align-*` on the block (column) axis** — and in grid, unlike flexbox, this does not swap, because grid has real rows and columns.',
      '`*-items` sets the default for every item **inside its cell**. `*-content` distributes the **whole grid** within the container when the tracks are smaller than the container. `*-self` overrides for a single item. So `align-items: center` centres each item in its row; `align-content: center` centres the entire grid vertically in a taller container.',
      '`place-items` is the shorthand for `align-items` + `justify-items` (block first, then inline). `place-content` and `place-self` follow the same order. `place-items: center` is the shortest reliable centring in CSS — two words on the parent and nothing on the child.',
      'The default for both `*-items` axes in grid is `stretch`, which is why a grid child fills its cell unless it has an intrinsic size. Setting `justify-items: start` makes children shrink to content width.',
      'These properties come from the **CSS Box Alignment** module and are shared with flexbox — which is why learning them once pays twice. The only difference is which axis is "main" in flexbox, versus fixed row/column in grid.',
    ],
    keyPoints: [
      '`justify-*` = inline/row axis. `align-*` = block/column axis. In grid it never swaps.',
      '`*-items` positions inside cells; `*-content` positions the grid within the container.',
      '`place-items: center` is the two-word perfect centre.',
      'Grid items stretch by default.',
    ],
    interview:
      '"Centre something perfectly" — `display: grid; place-items: center`. The follow-up "what is the difference between align-items and align-content" is the real test: items within cells versus the whole grid within the container.',
    code: `.frame { display: grid; place-items: center; min-height: 100dvh; }

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center;   /* the grid itself, horizontally */
  align-content: center;     /* the grid itself, vertically   */
  justify-items: stretch;    /* each item inside its cell     */
}`,
    resources: [
      { label: 'MDN — Box alignment in grid layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment/Box_alignment_in_grid_layout', kind: 'docs' },
      { label: 'MDN — place-items', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/place-items', kind: 'docs' },
    ],
  },
];
