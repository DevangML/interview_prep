import type { LearnTopic } from './types';

/** Composition, performance, and the escape hatches. */
export const reactAdvancedTopics: LearnTopic[] = [
  {
    id: 'react-composition',
    area: 'React Advanced',
    group: 'Patterns',
    title: 'Composition: children, render props, HOCs, compound components',
    status: 'missing',
    minutes: 7,
    summary:
      'Named on the Mettl competency list (Higher Order Components) and the substance of every "how would you design this component" question.',
    body: [
      '**Composition over configuration.** A component with fourteen boolean props is a design smell; the same flexibility usually falls out of accepting `children` or named slots. Passing elements as props is also the standard cure for prop drilling — hand the subtree down rather than the data it needs.',
      '**Higher Order Component**: a function that takes a component and returns a new one — `withRouter`, `connect`, `withTheme`. It composes behaviour without inheritance. The costs are a deeper tree, prop-name collisions, and the need to hoist statics and forward refs. Hooks replaced most HOCs, but the pattern is explicitly on the assessment syllabus, so be able to write one.',
      '**Render props**: pass a function as a child (or prop) and call it with internal state — `<Mouse>{pos => <Cat at={pos} />}</Mouse>`. Maximum flexibility, at the cost of nesting. Hooks solved the same problem more cleanly, which is the historical arc worth narrating.',
      '**Compound components**: several components sharing implicit state through context — `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>`. This is how mature UI libraries model widgets, because it gives consumers layout freedom while the parent keeps the state machine.',
      '**Controlled versus uncontrolled** applies to your own components too: accept `value` + `onChange` for controlled use, `defaultValue` for uncontrolled, and support both — that is what every serious library does.',
    ],
    keyPoints: [
      'HOC: `Component => Component`. Remember to forward refs and hoist statics.',
      'Render props and HOCs both solved logic reuse; hooks superseded both.',
      'Passing elements as children is the simplest cure for prop drilling.',
      'Support controlled and uncontrolled modes in reusable components.',
    ],
    interview:
      '"Design a reusable Modal/Tabs/Autocomplete" is the senior component-design question. Talk about the state machine, what the consumer controls, the accessibility contract, and whether it is controlled — that structure is the answer.',
    code: `// HOC — still named on the Mettl React competency list
function withLogging(Wrapped) {
  function WithLogging(props) {
    useEffect(() => { track(Wrapped.displayName); }, []);
    return <Wrapped {...props} />;
  }
  WithLogging.displayName = \`withLogging(\${Wrapped.displayName ?? Wrapped.name})\`;
  return WithLogging;
}`,
    resources: [
      { label: 'React — Passing props to a component', url: 'https://react.dev/learn/passing-props-to-a-component', kind: 'docs' },
      { label: 'React (legacy docs) — Higher-Order Components', url: 'https://legacy.reactjs.org/docs/higher-order-components.html', kind: 'docs', note: 'Legacy, but this is the page the HOC interview question comes from.' },
      { label: 'Kent C. Dodds — Advanced React patterns', url: 'https://kentcdodds.com/blog/compound-components-with-react-hooks', kind: 'article' },
    ],
  },
  {
    id: 'react-perf',
    area: 'React Advanced',
    group: 'Performance',
    title: 'memo, useMemo, useCallback, virtualization, profiling',
    status: 'partial',
    minutes: 8,
    summary:
      'Memoisation is the most cargo-culted topic in React. The senior answer is always "measure first" — and knowing exactly when each tool applies.',
    body: [
      '`React.memo` shallow-compares props and skips re-rendering when they are unchanged. It fails the moment a prop is a fresh object, array or function literal created during the parent\'s render — which is most of the time, and why "I added memo and nothing improved" is so common. `useMemo` caches a computed value; `useCallback(fn, deps)` is exactly `useMemo(() => fn, deps)` and caches the function identity.',
      'Memoisation is not free: it costs memory and a comparison on every render. Wrapping everything makes an app slower and much harder to read. The correct order is profile → find the actual cost → memoise that. **React 19\'s compiler automates most of this**, which makes the manual version increasingly a legacy skill — and still an interview topic.',
      'For long lists, memoisation is the wrong tool entirely: **virtualization** (`react-window`, TanStack Virtual) renders only the visible rows. Ten thousand rows become twenty DOM nodes. That is a structural fix, not a micro-optimisation. In CSS-only cases `content-visibility: auto` gets much of the benefit with no library.',
      '**Code splitting** with `React.lazy` + `Suspense` moves work out of the initial bundle; route-level splitting is the highest-leverage version. Combine with `manualChunks` so vendor code caches independently of your application code.',
      'Profiling: the React DevTools Profiler shows what re-rendered and why (enable "record why each component rendered"), and the browser Performance panel shows where main-thread time went. The Core Web Vitals to name are **LCP** (largest contentful paint), **INP** (interaction to next paint, which replaced FID in 2024) and **CLS** (cumulative layout shift).',
    ],
    keyPoints: [
      '`memo` is defeated by inline object, array and function props.',
      '`useCallback(fn, deps)` ≡ `useMemo(() => fn, deps)`.',
      'Long lists need virtualization, not memoisation.',
      'LCP, INP, CLS — INP replaced FID.',
    ],
    interview:
      '"How would you optimise a slow React app?" wants a *process*: profile, identify whether the cost is render, network or main-thread work, then apply the matching fix — memo, virtualization, code splitting, or moving work off the main thread. Jumping straight to `useMemo` is the wrong-shaped answer.',
    resources: [
      { label: 'React — memo', url: 'https://react.dev/reference/react/memo', kind: 'docs', note: 'The "when not to use it" section is the important half.' },
      { label: 'React — React Compiler', url: 'https://react.dev/learn/react-compiler', kind: 'docs' },
      { label: 'web.dev — Core Web Vitals', url: 'https://web.dev/articles/vitals', kind: 'article' },
      { label: 'TanStack Virtual', url: 'https://tanstack.com/virtual/latest', kind: 'docs' },
    ],
  },
  {
    id: 'react-errors-portals',
    area: 'React Advanced',
    group: 'Escape hatches',
    title: 'Error boundaries, portals, refs and imperative escape hatches',
    status: 'missing',
    minutes: 6,
    summary:
      'The parts of React that step outside the declarative model — and the reason each one exists.',
    body: [
      '**Error boundaries** catch errors thrown during rendering, in lifecycles, and in constructors of the tree below them, and render a fallback instead of unmounting the whole app. They must be **class components** — `getDerivedStateFromError` for the fallback state, `componentDidCatch` for logging. They do **not** catch errors in event handlers, in asynchronous code, or in the boundary itself; those need ordinary `try/catch`. Placement is a design decision: one per pane keeps a failure the size of the thing that failed.',
      '**Portals** render children into a different DOM node while keeping them in the React tree — so context still flows and events still bubble *through React*, to the React parent, not the DOM parent. That is precisely what modals, tooltips and toasts need to escape `overflow: hidden` and stacking contexts without losing their place in the component hierarchy.',
      '**Refs** reach the DOM for the things React does not model: focus, text selection, media playback, scroll position, and integrating imperative third-party libraries. `useImperativeHandle` lets a component expose a deliberately narrow imperative API to its parent — `{ focus, reset }` rather than the raw node. In React 19, `ref` is an ordinary prop and `forwardRef` is no longer needed.',
      '`flushSync` forces a synchronous re-render and commit, escaping batching. It exists for the rare case where you must measure the DOM immediately after an update. It hurts performance by definition, which is why it is a last resort rather than a tool.',
    ],
    keyPoints: [
      'Error boundaries must be classes and do not catch event-handler or async errors.',
      'Portals move the DOM node but keep the React tree — context and event bubbling follow React.',
      '`useImperativeHandle` narrows what a parent can do to a child.',
      'React 19: `ref` is a normal prop; `forwardRef` is legacy.',
    ],
    interview:
      '"How do you handle errors in React?" expects error boundaries **plus** the explicit list of what they miss. "How would you build a modal?" expects a portal, focus management, Escape handling and a return of focus on close.',
    code: `class PaneBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { log(error, info.componentStack); }
  render() {
    return this.state.error
      ? <Fallback error={this.state.error} onRetry={() => this.setState({ error: null })} />
      : this.props.children;
  }
}`,
    resources: [
      { label: 'React — createPortal', url: 'https://react.dev/reference/react-dom/createPortal', kind: 'docs' },
      { label: 'React — Manipulating the DOM with refs', url: 'https://react.dev/learn/manipulating-the-dom-with-refs', kind: 'docs' },
      { label: 'React — Component.componentDidCatch', url: 'https://react.dev/reference/react/Component#componentdidcatch', kind: 'docs' },
    ],
  },
];
