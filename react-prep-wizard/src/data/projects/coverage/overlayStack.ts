import { e, type ProjectCoverage } from './types';

/**
 * Beginner, positioning and focus. The audit added the small amount of
 * JavaScript a dialog genuinely needs — open/close, Escape, focus restore —
 * so events, closures and `this` appear here rather than only in the todo.
 */
export const overlayStackCoverage: ProjectCoverage = {
  projectId: 'basic-overlay-stack',
  edges: [
    e('css-positioning', 'explicit', 'Stages 1-2', 'All five position values appear on one page, and the z-index: 9999 failure is diagnosed as a stacking context'),
    e('css-states', 'explicit', 'Stage 2', 'outline: none is removed and replaced with :focus-visible, so the ring shows for keyboards and not for mice'),
    e('css-ratio-logical', 'explicit', 'Stage 2', 'The modal media slot reserves space with aspect-ratio and positions with inset rather than four physical offsets'),
    e('a11y-core', 'explicit', 'Stage 2', 'The dialog moves focus in, traps it, restores it on close and responds to Escape — written by hand, no library'),
    e('css-tokens-modern', 'explicit', 'Stage 2', 'Layer order lives in four custom properties, so the whole z-index policy is four lines in one file'),
    e('css-box-display', 'explicit', 'Stage 1', 'A parent with overflow: hidden silently kills position: sticky, which is a formatting-context consequence'),
    e('css-cascade', 'explicit', 'Stage 2', 'The open-state rules must beat the base dialog rules without !important, resolved by ordering not by force'),
    e('css-selectors', 'explicit', 'Stage 2', 'State is expressed as [aria-expanded="true"] attribute selectors, so styling follows the accessibility contract'),
    e('css-grid-align', 'explicit', 'Stage 2', 'The modal centres with display: grid and place-items: center rather than a translate(-50%, -50%) hack'),
    e('css-grid-tracks', 'explicit', 'Stage 2', 'The dialog body is a two-track grid so the header and footer stay fixed while the content scrolls'),
    e('css-units', 'explicit', 'Stage 2', 'The dialog is capped with min(90vw, 32rem), which keeps it usable on both a phone and a large monitor'),
    e('css-media-container', 'explicit', 'Stage 2', 'The dialog becomes a full-height sheet below a breakpoint, which is a different component shape, not a resize'),
    e('css-flex-axes', 'explicit', 'Stage 2', 'The dialog footer is a flex row whose buttons reverse order on small screens without changing the DOM'),
    e('css-flex-align', 'explicit', 'Stage 2', 'justify-content: space-between separates the destructive and confirming actions in the footer'),
    e('html-semantics', 'explicit', 'Stage 2', 'The trigger is a real button and the dialog uses <dialog>, so Escape and the top layer come from the platform'),
    e('js-dom-events', 'explicit', 'Stage 2', 'Escape, outside-click and focus-in are three listeners whose phases and targets must be reasoned about, not guessed'),
    e('js-scope-closures', 'explicit', 'Stage 2', 'The close handler closes over the element that had focus before opening, so it can restore it later'),
    e('js-this', 'explicit', 'Stage 2', 'The same handler is attached as a method and as an arrow to show the receiver difference inside a listener'),
    e('web-how-page-loads', 'explicit', 'Stage 1', 'Paint order and layer promotion explain both the z-index failure and why transform animations are cheap'),
    e('css-flex-sizing', 'counterexample', 'Stage 2', 'Explicitly not used: the dialog is sized by its content and a max, to contrast with the pricing card that grows'),

    // ── Extended roadmap tracks ──
    e('rd-fe-modern-css', 'explicit', 'Stage 2', 'Stacking contexts, :focus-visible and container-relative positioning are modern CSS doing real work'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
        'rd-react-components',
        'rd-react-hooks',
        'rd-react-state-mgmt',
        'rd-react-data-fetching',
        'rd-react-routing-forms',
        'rd-react-testing',
        'rd-react-rsc-compiler',
        'rd-perf-high-priority',
        'rd-perf-rendering-media',
        'rd-perf-web-vitals',
        'rd-perf-network-cdn',
        'rd-fe-internet-browser',
        'rd-fe-html-web-components',
        'rd-fe-js-v8-packages',
      ],
    },
    {
      reason: 'Still pre-React in the 0-3 YOE path; this project exists to show what the platform already provides before a framework is introduced.',
      conceptIds: [
        'react-rendering-model', 'react-state', 'react-effects', 'react-hooks-rest',
        'react-class-lifecycle', 'react-immutability', 'react-composition', 'react-perf',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc',
      ],
    },
    {
      reason: 'The JavaScript here is deliberately three listeners; language depth, async and data handling belong to the two projects that follow and would drown the positioning lesson.',
      conceptIds: [
        'js-event-loop', 'js-promises', 'js-arrays-objects', 'js-modules', 'js-polyfills',
        'js-types-coercion', 'js-prototypes', 'js-equality-matrix', 'js-defaulting-operators',
        'react-references-copying',
      ],
    },
    {
      reason: 'No data, no server and no build step are required to demonstrate stacking contexts, and adding them would not make the lesson clearer for a 0-3 YOE learner.',
      conceptIds: [
        'redux-core', 'redux-react-toolkit', 'state-alternatives', 'router-core',
        'frontend-system-design', 'testing-react', 'ts-essentials', 'tooling-bundlers',
        'tooling-flux', 'html-forms', 'web-http', 'web-cors', 'web-storage', 'web-security',
        'css-grid-placement',
      ],
    },
  ],
};
