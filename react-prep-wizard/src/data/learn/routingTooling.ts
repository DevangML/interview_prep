import type { LearnTopic } from './types';

/** React Router, Flux and Webpack — all three named under "React Tools" by Mettl. */
export const routingToolingTopics: LearnTopic[] = [
  {
    id: 'router-core',
    area: 'Routing',
    group: 'React Router',
    title: 'Routes, params, nested layouts, navigation and guards',
    status: 'partial',
    minutes: 7,
    summary:
      'Routing is the app\'s URL contract. React Router is named on the Mettl "React Tools" list, and route design is where front-end system-design questions usually start.',
    body: [
      'Routes map a URL pattern to an element. **Nested routes** with an `<Outlet />` express shared layout: a parent route renders the chrome and the child renders into the outlet, so navigating between siblings does not remount the shell. That is the structural advantage over a flat route table.',
      'Reading the URL: **`useParams()`** for path segments (`/user/:id`), **`useSearchParams()`** for the query string, **`useLocation()`** for the whole location object including `state`, and **`useNavigate()`** to navigate programmatically. `<Link>` and `<NavLink>` render real anchors — which matters, because middle-click, right-click and "open in new tab" only work on real `href`s. `<NavLink>` additionally exposes an `isActive` flag for styling.',
      '**Search params are state**, and putting filters and pagination there is a design decision worth defending: the view becomes shareable, bookmarkable and correct under the back button, with no synchronisation code.',
      '**Guards** are ordinary components, not a framework feature: a wrapper that checks auth and either renders `<Outlet />` or `<Navigate to="/login" replace state={{ from: location }} />`. The `replace` matters so the login page does not enter history; the `state` lets you return the user where they were going.',
      'Data APIs (`loader`, `action`, `defer`) move fetching into the route definition so navigation and data start **together** rather than data starting after the component mounts — removing the render-then-fetch waterfall. `useNavigation()` exposes the pending state for a global progress indicator.',
    ],
    keyPoints: [
      'Nested routes + `<Outlet />` keep the shell mounted across sibling navigation.',
      '`useParams` = path, `useSearchParams` = query, `useNavigate` = go.',
      'Filters and pagination belong in search params, not component state.',
      'Route guards are components; use `replace` so login does not pollute history.',
    ],
    interview:
      '"How would you protect a route?" and "where do you put filter state?" are the two that recur. The second is the better answer opportunity: search params, with the shareability and back-button reasoning.',
    code: `<Route element={<RequireAuth />}>
  <Route path="/app" element={<Shell />}>
    <Route index element={<Dashboard />} />
    <Route path="users/:id" element={<User />} />
  </Route>
</Route>

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return user
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />;
}`,
    resources: [
      { label: 'React Router — Routing concepts', url: 'https://reactrouter.com/start/library/routing', kind: 'docs' },
      { label: 'React Router — Navigating', url: 'https://reactrouter.com/start/library/navigating', kind: 'docs' },
      { label: 'MDN — URLSearchParams', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams', kind: 'docs' },
    ],
  },
  {
    id: 'tooling-bundlers',
    area: 'Tooling',
    group: 'Build',
    title: 'Webpack, Vite, Babel, tree shaking and code splitting',
    status: 'partial',
    minutes: 8,
    summary:
      'Webpack is named on the Mettl React Tools list, and almost no 2026 prep material covers it because everyone has moved to Vite. That gap is exactly why it is worth reading.',
    body: [
      '**Webpack vocabulary, which is what gets asked.** *Entry* is where the graph starts; *output* is where the bundle lands. **Loaders transform individual files** as they enter the graph — `babel-loader` for JSX, `css-loader` for stylesheets. **Plugins act on the whole compilation** — generating HTML, defining constants, splitting chunks. Confusing loaders with plugins is the classic wrong answer: file-level transform versus build-level operation.',
      '`SplitChunksPlugin` extracts shared modules so vendor code caches separately from application code; `mode: "production"` enables minification and tree shaking; `devtool` selects the source-map strategy.',
      '**Vite** takes a different approach: in development it serves native ES modules with no bundling at all, so startup is near-instant regardless of project size, and it pre-bundles dependencies with esbuild. For production it builds with Rollup. That development/production split is the whole design, and "why is Vite faster than Webpack in dev" is answered by "it does not bundle in dev".',
      '**Babel** transpiles modern syntax to a target set of browsers and applies plugin transforms — JSX to `React.createElement` (or the automatic runtime in React 17+), and the React Compiler in React 19. `@babel/preset-env` with a browserslist target decides how much is transpiled; targeting modern browsers ships less code.',
      '**Tree shaking** eliminates unused exports, and it depends on **static ES module analysis** — which is why `import`/`export` enables it and CommonJS mostly does not. It is defeated by side effects, which is what the `sideEffects: false` field in `package.json` declares. **Code splitting** via `import()` is the complementary technique: tree shaking removes what you never use, splitting defers what you do not need *yet*.',
    ],
    keyPoints: [
      'Loaders transform files; plugins act on the whole compilation.',
      'Vite does not bundle in development — that is why it is fast.',
      'Tree shaking needs static ESM analysis; `sideEffects: false` unlocks more of it.',
      'Tree shaking removes unused code; `import()` defers code you need later.',
    ],
    interview:
      '"Difference between a loader and a plugin" is the Webpack question. "How would you reduce bundle size?" wants a chain: measure → tree shaking → route-level `import()` → vendor chunk splitting → lighter dependencies → and only then micro-optimisation.',
    resources: [
      { label: 'Webpack — Concepts', url: 'https://webpack.js.org/concepts/', kind: 'docs', note: 'Entry, output, loaders, plugins, mode — the exact vocabulary Mettl uses.' },
      { label: 'Vite — Why Vite', url: 'https://vite.dev/guide/why', kind: 'docs' },
      { label: 'Webpack — Tree shaking', url: 'https://webpack.js.org/guides/tree-shaking/', kind: 'docs' },
    ],
  },
  {
    id: 'tooling-flux',
    area: 'Tooling',
    group: 'Architecture history',
    title: 'Flux — and why Mettl still asks about it',
    status: 'missing',
    minutes: 5,
    summary:
      'Flux is on the vendor competency list and in essentially no modern prep material, because nobody uses it. That asymmetry makes it a cheap, reliable mark.',
    body: [
      'Flux is the unidirectional data-flow architecture Facebook described in 2014, as an answer to the bidirectional binding of MVC frameworks. Its four parts: **Actions** (payloads describing what happened), a singleton **Dispatcher** (which broadcasts every action to every store), **Stores** (which hold state and logic for a domain), and **Views** (which subscribe and re-render).',
      'The problem it solved: in two-way binding, a change could propagate in a loop and it became impossible to say what caused what. Unidirectional flow makes the causal chain a straight line — action → dispatcher → store → view — and that idea survived even though the implementation did not.',
      '**Flux versus Redux**, which is the actual question. Flux has **many stores** coordinated by a **central dispatcher**; Redux has **one store**, **no dispatcher object**, and pure **reducers** rather than stores containing logic. Redux also made state immutable and reducers pure, enabling time-travel debugging. Both are unidirectional — so "Flux is unidirectional and Redux is not" is a wrong answer that sounds plausible.',
      'The Context + `useReducer` pattern is closer to Flux than to Redux in spirit: several independent state containers rather than one tree. Saying that shows you understand the distinction rather than the trivia.',
    ],
    keyPoints: [
      'Flux: Actions → Dispatcher → Stores → Views.',
      'Flux has many stores and a dispatcher; Redux has one store, no dispatcher, pure reducers.',
      'Both are unidirectional — that is not the difference.',
      'Redux added immutability and purity, which is what enables time-travel debugging.',
    ],
    interview:
      'Almost always asked as "difference between Flux and Redux". Give the store-count and dispatcher distinction first, then purity and immutability. Most candidates cannot answer at all, which makes this disproportionately valuable for a five-minute read.',
    resources: [
      { label: 'Flux — In-depth overview', url: 'https://facebookarchive.github.io/flux/docs/in-depth-overview/', kind: 'docs', note: 'The original architecture description. Archived, and still the source of the exam question.' },
      { label: 'Redux — Prior art', url: 'https://redux.js.org/understanding/history-and-design/prior-art', kind: 'docs', note: 'Redux explaining, in its own words, how it differs from Flux.' },
    ],
  },
];
