import type { ProjectBlueprint } from '../types';

/** Foundations — class components and the prototype chain underneath them. */
export const classMuseumProject: ProjectBlueprint = {
  id: 'basic-class-museum',
  title: 'The Class Component Museum: Port It Twice',
  tagline: 'The same widget as a class and as a hook — because the assessment still asks about both.',
  realWorldAnalog: 'Any codebase older than 2019, which is most of them',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 3,
  architecturePattern: 'Parallel implementations: lifecycle methods vs hooks',
  prerequisites: ['basic-react-first'],
  summary:
    'Write one widget twice — once with componentDidMount / componentDidUpdate / componentWillUnmount, once with hooks — and map each method to its hook equivalent. Mettl publishes "Lifecycle" as a named React sub-skill, and enterprise React codebases still contain thousands of class components. This is also the cleanest place to meet the prototype chain, since a class is one.',
  tags: ['React', 'Lifecycle', 'Classes', 'Prototypes', 'Junior'],
  xpBounty: 130,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A withSubscription HOC, then the same behaviour as a custom hook.',
      'A real async load, which the class version must cancel in componentWillUnmount.',
      'A subscription widget implemented as a class and as a function component.',
      'A mapping table from each lifecycle method to its hook equivalent.',
      'One error boundary — still only expressible as a class.',
      'Inspecting the prototype chain of the class instance in devtools.',
    ],
    outOfScopeBloat: [
      'Migrating a real legacy codebase.',
      'Legacy UNSAFE_ lifecycle methods beyond naming them.',
      'A HOC library.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The class, with its classic bugs',
      focus: 'Lifecycle methods, bound handlers, setState merging',
      codeSnippet: `class Ticker extends React.Component {\n  state = { n: 0, meta: { on: true } };\n\n  componentDidMount() { this.id = setInterval(this.tick, 1000); }\n  componentDidUpdate(prev) {\n    if (prev.src !== this.props.src) this.resubscribe();  // easy to forget\n  }\n  componentWillUnmount() { clearInterval(this.id); }\n\n  tick() { this.setState({ n: this.state.n + 1 }); }   // unbound: 'this' is undefined\n}`,
      failureModeOrInvariant:
        'tick throws because a class method passed as a callback loses its receiver. setState merges at the top level only, so setting { meta: {...} } replaces the whole nested object. Setup and teardown live in three separate methods, so one is routinely forgotten.',
      architecturalLesson:
        'Class components split one concern across three lifecycle methods. That separation, not verbosity, is the reason hooks exist.',
    },
    {
      stageNumber: 2,
      stageName: 'The same widget, as one effect',
      focus: 'Mapping lifecycle to hooks and reading the prototype chain',
      codeSnippet: `useEffect(() => {\n  const id = setInterval(() => setN(n => n + 1), 1000);\n  return () => clearInterval(id);   // setup and teardown, adjacent\n}, [src]);                          // covers didMount AND didUpdate\n\n// A class IS a prototype chain:\nObject.getPrototypeOf(new Ticker({}))            // Ticker.prototype\nObject.getPrototypeOf(Ticker.prototype)          // React.Component.prototype\nTicker.prototype.hasOwnProperty('tick')          // true — methods live here`,
      failureModeOrInvariant:
        'One effect replaces three lifecycle methods, and the dependency array makes the didUpdate condition declarative. Instance state stays on the instance; methods live on the prototype and are shared across every instance.',
      architecturalLesson:
        '`class` is syntax over prototypes. Knowing where a method actually lives explains method sharing, `super`, and why an arrow class field is per-instance.',
    },
  ],
  deliverables: [
    { id: 'Boundary', title: 'Boundary', spec: 'An error boundary class implementing getDerivedStateFromError and componentDidCatch, with a recoverable fallback.' },
    { id: 'HOC', title: 'HOC', spec: 'A withSubscription higher-order component, then the same behaviour extracted as a custom hook, both exported.' },
    { id: 'Both versions', title: 'Both versions', spec: 'Class and function implementations sharing identical markup and props, swappable in one line.' },
    { id: 'PureComponent', title: 'PureComponent', spec: 'A PureComponent row shown to skip updates, then shown to re-render anyway when passed an inline arrow prop.' },
    { id: 'Data load', title: 'Data load', spec: 'An async load started in componentDidMount and cancelled in componentWillUnmount, reproducing the set-state-after-unmount warning first.' },
    { id: 'Structure', title: 'Structure', spec: 'The two implementations are separate modules exporting the same interface.' },
    { id: 'Data', title: 'Data', spec: 'The item list transformed with map and filter identically in both versions, so the comparison isolates lifecycle.' },
    { id: 'Props', title: 'Props', spec: 'defaultProps in the class and a parameter default in the function, with the null-versus-undefined difference demonstrated.' },
    { id: 'Markup', title: 'Markup', spec: 'Identical markup in both versions, verified by diffing the rendered HTML.' },
    { id: 'Subscription', title: 'Subscription', spec: 'A window event listener subscribed on mount and removed on teardown, with the leak shown before the fix.' },
  ],
  layers: [
    {
      layer: 'Legacy',
      components: ['class Ticker', 'ErrorBoundary', 'lifecycle mapping table'],
      invariants: ['Every lifecycle method used is paired with its hook equivalent in the table.'],
    },
    {
      layer: 'Modern',
      components: ['function Ticker', 'useEffect subscription', 'custom hook extraction'],
      invariants: ['Setup and its teardown are never more than a few lines apart.'],
    },
  ],
  explicitTopics: [
    {
      category: 'React Core',
      topic: 'Legacy',
      subtopic: 'Class components and the lifecycle vocabulary',
      howCovered: 'Every common lifecycle method is written, then mapped to its hook equivalent in a table you build.',
      conceptIds: ['react-class-lifecycle'],
    },
    {
      category: 'JavaScript',
      topic: 'Objects',
      subtopic: 'Prototypes, the prototype chain and classes',
      howCovered: 'The class instance is walked with getPrototypeOf to show where methods and state actually live.',
      conceptIds: ['js-prototypes'],
    },
    {
      category: 'React Advanced',
      topic: 'Escape hatches',
      subtopic: 'Error boundaries',
      howCovered: 'An error boundary is implemented — the one thing that still requires a class in React 19.',
      conceptIds: ['react-errors-portals'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Language Semantics',
      title: 'Method binding',
      mechanism: 'A prototype method has no bound receiver; a class field arrow captures the instance at construction.',
      realWorldImpact: 'Explains the constructor .bind(this) lines in every legacy React file.',
      conceptIds: ['js-this', 'js-prototypes'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Lifecycle invocation', 'Error boundary catching'],
    manualEngineeringRequired: [
      'The lifecycle-to-hook mapping, written from understanding rather than copied.',
      'Reading the prototype chain in devtools.',
    ],
  },
};
