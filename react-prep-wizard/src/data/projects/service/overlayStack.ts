import type { ProjectBlueprint } from '../types';

/** Foundations — positioning, stacking contexts, and focus you can see. */
export const overlayStackProject: ProjectBlueprint = {
  id: 'basic-overlay-stack',
  title: 'Sticky Header & Modal: Where Things Sit and Who Is On Top',
  tagline: 'A sticky bar, a dropdown and a dialog — and a z-index that finally behaves.',
  realWorldAnalog: 'The header of nearly every product you use',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Beginner',
  estimatedBuildTimeHours: 3,
  architecturePattern: 'Positioned layers over a scrolling document',
  prerequisites: ['basic-profile-card'],
  summary:
    'Build a sticky header containing a dropdown, plus a centred modal that traps focus. The interview question hiding inside is "why does z-index: 9999 not put my dropdown on top?" — and the answer is stacking contexts, not bigger numbers.',
  tags: ['CSS', 'Positioning', 'z-index', 'Accessibility', 'Beginner'],
  xpBounty: 120,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'The small amount of JavaScript a dialog genuinely needs: open, close, Escape, focus restore.',
      'A native <dialog> comparison, so what the platform already provides is visible.',
      'position: sticky header with a correct containing block.',
      'Absolutely positioned dropdown anchored to a relative parent.',
      'A modal centred without magic numbers, with a visible :focus-visible ring.',
      'One deliberate stacking-context trap, diagnosed and fixed.',
    ],
    outOfScopeBloat: [
      'A dialog library or focus-trap package.',
      'Animation and transitions.',
      'Mobile navigation drawer behaviour.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Bigger numbers',
      focus: 'z-index escalation and outline: none',
      codeSnippet: `.header { position: sticky; top: 0; z-index: 10; }\n.card { transform: translateY(0); }   /* looks harmless */\n.dropdown { position: absolute; z-index: 9999; }\n*:focus { outline: none; }            /* "it looked ugly" */`,
      failureModeOrInvariant:
        'The dropdown at z-index 9999 still renders behind the card, because transform on an ancestor created a new stacking context and 9999 only competes inside it. The sticky header stops sticking when a parent has overflow: hidden. Keyboard users cannot see where they are at all.',
      architecturalLesson:
        'z-index is compared only among siblings within the same stacking context. transform, filter, opacity below 1 and will-change all create one.',
    },
    {
      stageNumber: 2,
      stageName: 'Layers you can reason about',
      focus: 'Named stacking contexts, correct containing blocks, visible focus',
      codeSnippet: `/* One place that owns layer order */\n:root { --z-header: 100; --z-dropdown: 200; --z-modal: 300; }\n\n.menu { position: relative; }            /* the containing block */\n.dropdown { position: absolute; inset-block-start: 100%; z-index: var(--z-dropdown); }\n\n.modal { position: fixed; inset: 0; display: grid; place-items: center; }\n:focus-visible { outline: 2px solid CanvasText; outline-offset: 2px; }`,
      failureModeOrInvariant:
        'Layer order lives in four tokens rather than scattered across twenty files. The modal centres with place-items rather than a translate hack. Focus is visible for keyboard users and absent for mouse users, which is exactly what :focus-visible means.',
      architecturalLesson:
        'An absolutely positioned element is placed against its nearest positioned ancestor. Fix the containing block and the coordinates stop being guesswork.',
    },
  ],
  deliverables: [
  ],
  layers: [
    {
      layer: 'Layout',
      components: ['sticky header', 'relative menu', 'absolute dropdown', 'fixed modal'],
      invariants: ['Every absolute child has an explicitly positioned ancestor.'],
    },
    {
      layer: 'Interaction',
      components: [':focus-visible ring', 'Escape to close', 'aria-expanded on the trigger'],
      invariants: ['Focus is never removed, only restyled.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'CSS', topic: 'Custom properties, design tokens, `color-mix`, nesting, `:has` layouts', subtopic: 'Stage 2', howCovered: 'Layer order lives in four custom properties, so the whole z-index policy is four lines in one file', conceptIds: ['css-tokens-modern'] },
    { category: 'CSS', topic: 'Box model, display types, formatting contexts and `flow-root`', subtopic: 'Stage 1', howCovered: 'A parent with overflow: hidden silently kills position: sticky, which is a formatting-context consequence', conceptIds: ['css-box-display'] },
    { category: 'CSS', topic: 'Cascade, specificity, inheritance and `!important`', subtopic: 'Stage 2', howCovered: 'The open-state rules must beat the base dialog rules without !important, resolved by ordering not by force', conceptIds: ['css-cascade'] },
    { category: 'CSS', topic: 'Selectors, combinators, pseudo-classes, pseudo-elements, attributes', subtopic: 'Stage 2', howCovered: 'State is expressed as [aria-expanded="true"] attribute selectors, so styling follows the accessibility contract', conceptIds: ['css-selectors'] },
    { category: 'CSS', topic: 'Two-axis alignment: justify/align items, content, self, `place-*`', subtopic: 'Stage 2', howCovered: 'The modal centres with display: grid and place-items: center rather than a translate(-50%, -50%) hack', conceptIds: ['css-grid-align'] },
    { category: 'CSS', topic: 'Tracks, `fr`, `repeat`, `minmax`, `auto-fit` vs `auto-fill`', subtopic: 'Stage 2', howCovered: 'The dialog body is a two-track grid so the header and footer stay fixed while the content scrolls', conceptIds: ['css-grid-tracks'] },
    { category: 'CSS', topic: 'Units: px, rem, em, ch, %, viewport units, clamp and calc', subtopic: 'Stage 2', howCovered: 'The dialog is capped with min(90vw, 32rem), which keeps it usable on both a phone and a large monitor', conceptIds: ['css-units'] },
    { category: 'CSS', topic: 'Media queries, container queries and responsive strategy', subtopic: 'Stage 2', howCovered: 'The dialog becomes a full-height sheet below a breakpoint, which is a different component shape, not a resize', conceptIds: ['css-media-container'] },
    { category: 'CSS', topic: 'Flex axes, direction, reverse, wrap and `order`', subtopic: 'Stage 2', howCovered: 'The dialog footer is a flex row whose buttons reverse order on small screens without changing the DOM', conceptIds: ['css-flex-axes'] },
    { category: 'CSS', topic: 'align-self, auto margins and the alignment family', subtopic: 'Stage 2', howCovered: 'justify-content: space-between separates the destructive and confirming actions in the footer', conceptIds: ['css-flex-align'] },
    { category: 'HTML', topic: 'Semantic elements and document outline', subtopic: 'Stage 2', howCovered: 'The trigger is a real button and the dialog uses <dialog>, so Escape and the top layer come from the platform', conceptIds: ['html-semantics'] },
    { category: 'JavaScript', topic: 'DOM APIs, events, bubbling and delegation', subtopic: 'Stage 2', howCovered: 'Escape, outside-click and focus-in are three listeners whose phases and targets must be reasoned about, not guessed', conceptIds: ['js-dom-events'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 2', howCovered: 'The close handler closes over the element that had focus before opening, so it can restore it later', conceptIds: ['js-scope-closures'] },
    { category: 'JavaScript', topic: '`this`, call/apply/bind and arrow functions', subtopic: 'Stage 2', howCovered: 'The same handler is attached as a method and as an arrow to show the receiver difference inside a listener', conceptIds: ['js-this'] },
    { category: 'CSS', topic: '`flex` shorthand, `flex-basis` vs `width`, grow and shrink', subtopic: 'Stage 2', howCovered: 'Explicitly not used: the dialog is sized by its content and a max, to contrast with the pricing card that grows', conceptIds: ['css-flex-sizing'] },
    { category: 'CSS', topic: 'Modern CSS: Cascade Layers (@layer), @scope, Subgrid & :has()', subtopic: 'Stage 2', howCovered: 'Stacking contexts, :focus-visible and container-relative positioning are modern CSS doing real work', conceptIds: ['rd-fe-modern-css'] },
    {
      category: 'CSS',
      topic: 'Positioning',
      subtopic: 'static, relative, absolute, fixed, sticky, containing block, z-index',
      howCovered: 'All five position values appear in one page, and the stacking-context trap is diagnosed from devtools.',
      conceptIds: ['css-positioning'],
    },
    {
      category: 'CSS',
      topic: 'Interaction',
      subtopic: ':focus-visible and accessible interaction states',
      howCovered: 'outline: none is removed and replaced with a focus ring that appears only for keyboard navigation.',
      conceptIds: ['css-states'],
    },
    {
      category: 'CSS',
      topic: 'Sizing',
      subtopic: 'aspect-ratio and logical properties',
      howCovered: 'The modal uses aspect-ratio for its media slot and inset/inline-start logical properties throughout.',
      conceptIds: ['css-ratio-logical'],
    },
    {
      category: 'Accessibility',
      topic: 'Foundations',
      subtopic: 'Keyboard navigation and focus management',
      howCovered: 'The dialog moves focus in on open, restores it on close, and closes on Escape — written by hand.',
      conceptIds: ['a11y-core'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Paint order and compositing',
      mechanism: 'The browser paints in stacking order; transform promotes an element to its own layer.',
      realWorldImpact: 'Explains both the z-index failure and why transform animations are cheap.',
      conceptIds: ['css-positioning', 'web-how-page-loads'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'Focus trap and focus restoration without a library.',
      'A single source of truth for layer order.',
    ],
  },
};
