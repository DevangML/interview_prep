import type { ProjectBlueprint } from '../types';

/** Foundations — client-side routing, nested layouts, and composition. */
export const routedAppProject: ProjectBlueprint = {
  id: 'basic-routed-app',
  title: 'A Real Multi-page SPA: Routes, Params and Guards',
  tagline: 'Four screens, nested layouts, a protected route, and a URL you can actually share.',
  realWorldAnalog: 'The shell of any dashboard product',
  tier: 'basic',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 5,
  architecturePattern: 'Nested route tree with layout routes and a guard wrapper',
  prerequisites: ['basic-fetch-list', 'basic-controlled-form'],
  summary:
    'Assemble the previous projects into one application behind a router: a list screen, a detail screen driven by a URL parameter, a form screen, and a protected area. The lesson is that the URL is state — if a filter or an open tab is not in the URL, a shared link does not reproduce the screen.',
  tags: ['React', 'Routing', 'Composition', 'SPA', 'Junior'],
  xpBounty: 180,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Nested layout routes with a shared shell and an Outlet.',
      'A dynamic :id route reading params, plus search params for filters.',
      'A guarded route that redirects and returns the user to their target after login.',
      'A 404 route and an error element.',
    ],
    outOfScopeBloat: [
      'A real auth backend — a boolean in state is enough.',
      'Server-side rendering or data loaders beyond one example.',
      'Animated route transitions.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Routing with useState',
      focus: 'A page variable and filters that vanish on reload',
      codeSnippet: `const [page, setPage] = useState('list');\nconst [filter, setFilter] = useState('all');\n\nreturn page === 'list' ? <List filter={filter} />\n     : page === 'detail' ? <Detail id={selectedId} />\n     : <NotFound />;`,
      failureModeOrInvariant:
        'The back button leaves the app entirely. A link to a detail screen cannot be shared — it always opens the list. Reloading resets the filter. Every new screen adds another branch to the ternary chain.',
      architecturalLesson:
        'Navigation state that lives in a component is invisible to the browser. The address bar is the oldest state container on the platform.',
    },
    {
      stageNumber: 2,
      stageName: 'The URL as the state',
      focus: 'Nested routes, params, search params, guarded redirect',
      codeSnippet: `<Route element={<AppShell />}>            {/* layout route */}\n  <Route path="items" element={<List />} />\n  <Route path="items/:id" element={<Detail />} />\n  <Route element={<RequireAuth />}>       {/* guard wraps children */}\n    <Route path="settings" element={<Settings />} />\n  </Route>\n  <Route path="*" element={<NotFound />} />\n</Route>\n\nconst { id } = useParams();\nconst [params, setParams] = useSearchParams();  // filter is shareable`,
      failureModeOrInvariant:
        'Back and forward work. A pasted URL reproduces the exact screen including filters. The guard redirects to login and returns to the original destination afterwards rather than dumping the user on the home page.',
      architecturalLesson:
        'A route tree is composition: layout routes provide the shell, guard routes provide the policy, and leaf routes provide the screen. The same idea as children and wrapper components, expressed as a data structure.',
    },
  ],
  layers: [
    {
      layer: 'Routing',
      components: ['route tree', 'AppShell layout', 'RequireAuth guard', 'NotFound'],
      invariants: ['Every navigable screen has a URL; no screen is reachable only by button.'],
    },
    {
      layer: 'Composition',
      components: ['Outlet', 'compound Tabs component', 'children-based Card'],
      invariants: ['Shell chrome is written once and shared by every route beneath it.'],
    },
  ],
  explicitTopics: [
    {
      category: 'Routing',
      topic: 'React Router',
      subtopic: 'Routes, params, nested layouts, navigation and guards',
      howCovered: 'A ternary-based pseudo-router is replaced by a nested route tree with params, search params and a guard.',
      conceptIds: ['router-core'],
    },
    {
      category: 'React Advanced',
      topic: 'Patterns',
      subtopic: 'Composition: children, render props, compound components',
      howCovered: 'The shell uses Outlet, and one screen is built as a compound Tabs component sharing implicit state.',
      conceptIds: ['react-composition'],
    },
    {
      category: 'HTML',
      topic: 'Structure',
      subtopic: 'Landmarks and document outline across pages',
      howCovered: 'The shell provides nav, main and header landmarks, and the document title updates per route.',
      conceptIds: ['html-semantics', 'a11y-core'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'The History API',
      mechanism: 'pushState and popstate let a single document change its URL without a network navigation.',
      realWorldImpact: 'Explains what a client-side router actually is, and why the server needs a catch-all rewrite.',
      conceptIds: ['router-core', 'web-how-page-loads'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['History integration and route matching', 'Outlet rendering'],
    manualEngineeringRequired: [
      'Deciding which state belongs in the URL and which does not.',
      'The redirect-and-return-to-target guard behaviour.',
    ],
  },
};
