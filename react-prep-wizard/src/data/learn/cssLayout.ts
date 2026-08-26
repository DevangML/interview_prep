import type { LearnTopic } from './types';

/** Positioning, units, ratio and writing mode — the sizing and placement layer. */
export const cssLayoutTopics: LearnTopic[] = [
  {
    id: 'css-positioning',
    area: 'CSS',
    group: 'Positioning',
    title: 'static, relative, absolute, fixed, sticky, containing block, z-index',
    status: 'covered',
    minutes: 8,
    summary:
      'Five position values, one containing-block rule that explains all of them, and a stacking model that explains why your z-index is being ignored.',
    body: [
      '`static` is the default and ignores `inset`. `relative` offsets the box **visually** while its original space is preserved — nothing else moves. `absolute` removes the box from flow entirely and positions it against its **containing block**. `fixed` positions against the viewport. `sticky` behaves as relative until a scroll threshold, then behaves as fixed **within its parent** — and silently does nothing if you forget to give it a threshold (`top: 0`) or if an ancestor has `overflow: hidden`.',
      'The **containing block** is the whole game for absolute positioning: it is the padding box of the nearest ancestor with a `position` other than `static`. If there is none, it is the initial containing block (roughly the viewport). This is why `position: relative` on a parent is the standard first move — it makes that parent the reference frame. A `transform`, `filter`, `perspective`, `will-change` or `contain` on an ancestor also creates a containing block **even for `fixed`** elements, which is the cause of the classic "my fixed modal is trapped inside a transformed card" bug.',
      '`inset` is the shorthand for `top`/`right`/`bottom`/`left`. Setting **both** opposite offsets stretches the element rather than moving it: `inset: 0` with `position: absolute` fills the containing block, which is the cleanest overlay in CSS. If both are set and a `width` is also set, `margin: auto` centres in the leftover space.',
      '**Stacking contexts** are why `z-index` "does not work". A new stacking context is created by a positioned element with a `z-index` other than `auto`, and also by `opacity < 1`, `transform`, `filter`, `mix-blend-mode`, `isolation: isolate`, `will-change`, and grid/flex items with a `z-index`. Inside a context, children are painted relative to each other only — a child with `z-index: 9999` can never escape a parent whose context sits below another. `isolation: isolate` is the deliberate way to create one.',
    ],
    keyPoints: [
      'Absolute positions against the nearest non-static ancestor\'s padding box.',
      'A `transform` on an ancestor becomes the containing block even for `fixed`.',
      '`inset: 0` + absolute = fill the parent.',
      '`z-index` is only compared within a stacking context — 9999 cannot escape.',
    ],
    interview:
      '"Difference between absolute and fixed" is the warm-up; "why is my z-index not working" is the real question, and the answer is stacking contexts. Naming `transform` as a context creator marks experience.',
    code: `.card { position: relative; }              /* becomes the reference frame */
.card .overlay { position: absolute; inset: 0; }   /* fills the card */

.header { position: sticky; top: 0; }     /* needs a threshold to do anything */
/* and no ancestor may have overflow: hidden, or sticky silently dies */`,
    resources: [
      { label: 'MDN — position', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position', kind: 'docs' },
      { label: 'MDN — Stacking context', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context', kind: 'docs', note: 'The list of what creates one is the part to memorise.' },
      { label: 'MDN — Containing block', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Containing_block', kind: 'docs' },
    ],
  },
  {
    id: 'css-units',
    area: 'CSS',
    group: 'Units',
    title: 'Units: px, rem, em, ch, %, viewport units, clamp and calc',
    status: 'covered',
    minutes: 7,
    summary:
      'Each unit answers "relative to what?" differently. Choosing wrongly is what makes a layout break at the user\'s font size instead of at a breakpoint.',
    body: [
      '`px` is absolute and predictable — correct for hairlines, borders and shadows. `rem` is relative to the **root** font size, so it scales when the user changes their browser text size; use it for type and spacing so the layout respects that preference. `em` is relative to the **element\'s own** font size, which compounds through nesting — useful deliberately (padding that scales with a button\'s text) and a hazard accidentally.',
      '`%` resolves against different things depending on the property: width against the containing block\'s width, height against its **height** (which is why `height: 100%` fails unless every ancestor has a height), and — the famous one — **padding and margin percentages resolve against the containing block\'s _width_, even vertically**. That last rule is what made the old aspect-ratio hack possible.',
      'Viewport units: `vw`, `vh`, `vmin`, `vmax`. On mobile, `100vh` is famously wrong because browser chrome hides and shows; the newer `dvh` (dynamic), `svh` (small) and `lvh` (large) fix it — `100dvh` is what "full screen height" should now say.',
      '`ch` is the width of the `0` glyph and is the honest unit for line length: `max-width: 65ch` gives a readable measure regardless of font size. `ex` and `cap` are similar font-relative units used less often.',
      '`clamp(min, preferred, max)` is fluid sizing in one line: `font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem)` scales with the viewport but never escapes its bounds — replacing several media queries. `calc()` mixes units (`calc(100% - 2rem)`), and `min()`/`max()` pick a value at computation time. Include a `rem` term inside a clamp so that text still responds to user zoom.',
    ],
    keyPoints: [
      'Percentage padding and margin resolve against **width**, even top and bottom.',
      '`rem` respects user font-size preference; `em` compounds through nesting.',
      'Use `dvh` rather than `vh` for mobile full-height.',
      '`clamp()` replaces breakpoint-driven font sizing — keep a `rem` term for zoom.',
    ],
    interview:
      '"Difference between rem and em" is entry-level; the follow-up "which would you use for a component\'s padding and why" is the real one. "Why is 100vh wrong on mobile" is a current favourite with `dvh` as the answer.',
    code: `:root { font-size: 100%; }             /* respect the user's setting */
h1   { font-size: clamp(1.5rem, 4vw + 1rem, 3rem); }
main { max-width: 65ch; }              /* readable measure */
.hero { min-height: 100dvh; }          /* not 100vh */`,
    resources: [
      { label: 'MDN — CSS values and units', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units', kind: 'docs' },
      { label: 'MDN — clamp()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp', kind: 'docs' },
      { label: 'web.dev — Large, small and dynamic viewport units', url: 'https://web.dev/blog/viewport-units', kind: 'article' },
    ],
  },
  {
    id: 'css-ratio-logical',
    area: 'CSS',
    group: 'Sizing',
    title: '`aspect-ratio`, the padding hack, writing modes and logical properties',
    status: 'partial',
    minutes: 6,
    summary:
      'How to hold a shape, how it used to be done, and how to write CSS that survives a language change without rewriting every margin.',
    body: [
      '`aspect-ratio: 16 / 9` fixes the ratio of a box: give it a width and the height derives, or a height and the width derives. It is the modern answer for video embeds, image placeholders and square avatars, and it prevents layout shift because the space is reserved before the media loads.',
      'The **padding hack** is what it replaced, and it is still asked about because it explains a rule: since **percentage padding resolves against the containing block\'s width**, `padding-top: 56.25%` produces a box 56.25% as tall as it is wide — a 16:9 ratio. The content then sits in an absolutely positioned child filling the box. Know it as history *and* as proof you understand percentage resolution.',
      '**Writing modes** change the direction text flows: `writing-mode: vertical-rl` is used for Japanese and Chinese vertical text and, more practically in interviews, for rotated table headers. It swaps which physical axis is "inline" and which is "block", which is exactly why the alignment properties are named `justify` (inline) and `align` (block) rather than horizontal and vertical.',
      '**Logical properties** name edges by flow rather than by physical direction: `margin-inline`, `padding-block`, `inset-inline-start`, `border-inline-end`, `inline-size`, `block-size`. In a left-to-right English page `margin-inline-start` is the left margin; in Arabic it is the right one — automatically. `margin-inline: auto` is the modern horizontal centring, and it keeps working when direction changes.',
      'The pairing to remember: `width`/`height` are physical, `inline-size`/`block-size` are logical. Under `writing-mode: vertical-rl`, `inline-size` controls the vertical extent, because inline is now the vertical axis.',
    ],
    keyPoints: [
      '`aspect-ratio: 16 / 9` reserves space and prevents layout shift.',
      'The padding hack works because percentage padding resolves against width.',
      'Writing mode is why the properties are `justify`/`align` rather than horizontal/vertical.',
      '`margin-inline: auto` centres and survives a direction change.',
    ],
    interview:
      '"Make a responsive 16:9 video box" — answer `aspect-ratio`, then offer the padding hack as the pre-2021 method and explain *why* it worked. That second half is the part that impresses.',
    code: `.video { aspect-ratio: 16 / 9; width: 100%; }

/* the historical version, and the reason it works */
.legacy { position: relative; padding-top: 56.25%; }   /* % of WIDTH */
.legacy > iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

.page { margin-inline: auto; max-inline-size: 65ch; }  /* direction-agnostic */`,
    resources: [
      { label: 'MDN — aspect-ratio', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio', kind: 'docs' },
      { label: 'MDN — CSS logical properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values', kind: 'docs' },
      { label: 'MDN — writing-mode', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode', kind: 'docs' },
    ],
  },
];
