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
