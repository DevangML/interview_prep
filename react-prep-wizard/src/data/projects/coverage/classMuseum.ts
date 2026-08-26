import { e, type ProjectCoverage } from './types';

/**
 * Junior, legacy React. Widened by the audit: the museum now ports a real
 * subscription widget with data loading and a HOC, so the class-versus-hook
 * comparison spans lifecycle, prototypes, composition and errors.
 */
export const classMuseumCoverage: ProjectCoverage = {
  projectId: 'basic-class-museum',
  edges: [
    e('react-class-lifecycle', 'explicit', 'Stages 1-2', 'Every common lifecycle method is written and then mapped to its hook equivalent in a table you construct'),
    e('js-prototypes', 'explicit', 'Stage 2', 'The instance is walked with getPrototypeOf to show that methods live on the prototype and state on the instance'),
    e('react-errors-portals', 'explicit', 'Boundary', 'An error boundary is implemented, which is the one thing still requiring a class in React 19'),
    e('js-this', 'explicit', 'Stage 1', 'The unbound method throws, which is exactly why every legacy constructor is full of bind calls'),
    e('react-effects', 'explicit', 'Stage 2', 'One effect with a dependency array replaces didMount and didUpdate, and its cleanup replaces willUnmount'),
    e('react-state', 'explicit', 'Stage 1', 'setState merges at the top level only, so a nested object is replaced rather than merged — the opposite of the hook'),
    e('react-composition', 'implicit', 'HOC', 'A withSubscription HOC is written, then rewritten as a custom hook, so both composition eras are first-hand'),
    e('react-hooks-rest', 'explicit', 'Stage 2', 'The extracted custom hook is where the class instance variables become refs and state'),
    e('react-rendering-model', 'implicit', 'Both versions', 'Class and function components produce identical fibers, which is why the render model is unchanged by syntax'),
    e('react-immutability', 'explicit', 'Stage 1', 'this.state.items.push updates nothing visible, since the reference the reconciler compares has not changed'),
    e('react-references-copying', 'explicit', 'Stage 1', 'shouldComponentUpdate and PureComponent both compare shallowly, so a mutated nested object is invisible to them'),
    e('react-perf', 'implicit', 'PureComponent', 'PureComponent and memo are the same shallow comparison, defeated by the same inline arrow prop'),
    e('js-scope-closures', 'explicit', 'Stage 2', 'The hook version closes over props per render, which is the trade the class version makes with instance fields'),
    e('js-promises', 'implicit', 'Data load', 'The subscription seeds from an async load, which in the class version must be cancelled in willUnmount'),
    e('web-http', 'implicit', 'Data load', 'A failed load must land in the boundary rather than leaving the widget spinning forever'),
    e('js-event-loop', 'implicit', 'Data load', 'A response arriving after unmount is the classic setState-on-unmounted warning, reproduced deliberately'),
    e('js-modules', 'implicit', 'Structure', 'Class and hook versions are separate modules exporting the same interface, so they can be swapped in one line'),
    e('js-arrays-objects', 'implicit', 'Data', 'The item list is transformed with map and filter in both versions so the comparison is only about lifecycle'),
    e('js-defaulting-operators', 'implicit', 'Props', 'defaultProps in the class becomes a parameter default in the function, and the ?? semantics differ from ||'),
    e('js-types-coercion', 'implicit', 'Props', 'propTypes checked at runtime versus a compile-time type is the same distinction as erasure in TypeScript'),
    e('js-equality-matrix', 'implicit', 'PureComponent', 'The shallow comparison uses Object.is, so NaN and -0 decide whether an update is skipped'),
    e('ts-essentials', 'implicit', 'Both versions', 'Typing a class component with generics differs from typing a function, and both are written'),
    e('html-semantics', 'implicit', 'Markup', 'The widget markup is identical in both versions, which keeps the comparison honest'),
    e('a11y-core', 'implicit', 'Data load', 'Load and error transitions are announced, since a class rewrite must not lose the accessible behaviour'),
    e('css-states', 'implicit', 'Markup', 'Loading, loaded and failed each need a visible state shared by both implementations'),
    e('css-box-display', 'implicit', 'Markup', 'The widget must not depend on a parent formatting context, or the two versions cannot be swapped in place'),
    e('js-dom-events', 'implicit', 'Subscription', 'The subscription is a window event listener, which makes the teardown obligation concrete'),

    // ── Extended roadmap tracks ──
    e('rd-react-components', 'explicit', 'Stage 1', 'Class components are still components; the roadmap covers them because interviews still ask'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
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
        'rd-fe-modern-css',
        'rd-fe-js-v8-packages',
      ],
    },
    {
      reason: 'Routing, stores, tooling and React 19 features are all outside a project whose single purpose is comparing two component eras at 0-3 YOE.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'state-alternatives',
        'frontend-system-design', 'testing-react', 'tooling-bundlers', 'tooling-flux',
        'r19-actions', 'r19-use-rsc', 'html-forms', 'js-polyfills',
        'web-cors', 'web-storage', 'web-security', 'web-how-page-loads',
      ],
    },
    {
      reason: 'Layout is held constant across both implementations on purpose; varying it would make the class-versus-hook comparison unreadable.',
      conceptIds: [
        'css-flex-axes', 'css-flex-sizing', 'css-flex-align', 'css-grid-tracks',
        'css-grid-placement', 'css-grid-align', 'css-cascade', 'css-selectors',
        'css-positioning', 'css-units', 'css-ratio-logical', 'css-media-container',
        'css-tokens-modern',
      ],
    },
  ],
};
