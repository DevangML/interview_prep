import type { LearnTopic } from './types';

/** TypeScript, testing, performance and front-end system design. */
export const engineeringTopics: LearnTopic[] = [
  {
    id: 'ts-essentials',
    area: 'TypeScript',
    group: 'Types',
    title: 'Types, narrowing, generics and typing React props',
    status: 'missing',
    minutes: 8,
    summary:
      'TypeScript is assumed in almost every 2026 front-end role and appears in zero of your drills. The interview surface is small and very learnable.',
    body: [
      '**Interface versus type alias**: interfaces can be re-opened (declaration merging) and are idiomatic for object shapes; type aliases can express unions, intersections, tuples and mapped types. Use either consistently — the real answer to the interview question is "interfaces merge, type aliases can be unions".',
      '**Narrowing** is where TypeScript earns its keep. `typeof` for primitives, `Array.isArray`, `in` for property presence, `instanceof` for classes, and **discriminated unions** — a shared literal field such as `kind` that lets the compiler prove which variant you hold. A custom type guard is a function returning `x is Foo`. Exhaustiveness is checked by assigning the remaining case to `never` in the default branch: if a new variant appears, the compiler flags it.',
      '`unknown` over `any` for anything crossing a boundary — an API response, `JSON.parse`, a form value. `unknown` forces you to narrow before use; `any` disables checking and quietly spreads. `never` is the empty type used for exhaustiveness and impossible states.',
      '**Generics** parameterise over types: `function first<T>(xs: T[]): T | undefined`. Constrain them with `extends` (`<T extends { id: string }>`). In React, generic components let a `<Select<Option>>` keep the relationship between its `options` and its `onChange` value.',
      '**React typing specifics**: props as an interface; `ReactNode` for anything renderable (prefer it to `ReactElement`); `PropsWithChildren<P>` or an explicit `children: ReactNode`; events as `React.ChangeEvent<HTMLInputElement>` and `React.MouseEvent<HTMLButtonElement>`; `useState<Item[]>([])` when the initial value cannot be inferred; and `ComponentProps<"button">` to inherit every native prop instead of re-declaring them.',
    ],
    keyPoints: [
      'Interfaces merge; type aliases can be unions and mapped types.',
      'Discriminated unions plus a `never` default give exhaustiveness checking.',
      '`unknown` at every boundary; `any` is a silent opt-out.',
      '`ComponentProps<"button">` inherits native props rather than re-typing them.',
    ],
    interview:
      '"Difference between `unknown` and `any`" and "how would you type this component" are the standard pair. Being able to write a discriminated union with an exhaustive switch is the single most useful thing to be able to produce on demand.',
    code: `type Result =
  | { kind: 'ok'; data: string }
  | { kind: 'error'; message: string };

function render(r: Result) {
  switch (r.kind) {
    case 'ok':    return r.data;        // narrowed
    case 'error': return r.message;
    default: {
      const _exhaustive: never = r;      // new variant ⇒ compile error
      return _exhaustive;
    }
  }
}

interface ButtonProps extends React.ComponentProps<'button'> { variant?: 'primary' | 'ghost'; }`,
    resources: [
      { label: 'TypeScript Handbook — Narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', kind: 'docs' },
      { label: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', kind: 'article', note: 'The fastest route to typing props, events and hooks correctly.' },
      { label: 'TypeScript Handbook — Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', kind: 'docs' },
    ],
  },
  {
    id: 'testing-react',
    area: 'Testing',
    group: 'Practice',
    title: 'Testing Library, what to test, mocking and end-to-end',
    status: 'missing',
    minutes: 7,
    summary:
      'Testing is a scored dimension in senior interviews and absent from your drills. The philosophy matters more than the API.',
    body: [
      'The guiding principle: **test behaviour, not implementation.** Testing Library enforces it by giving you queries that mirror how users find things — `getByRole` first (it doubles as an accessibility check), then `getByLabelText` for form fields, `getByText` for content, and `getByTestId` only as a last resort. If a refactor that changes no behaviour breaks your tests, the tests were coupled to implementation.',
      'Query variants: `getBy*` throws when absent, `queryBy*` returns `null` (the correct one for asserting absence), and `findBy*` returns a promise (the correct one for something that appears asynchronously). Using `getBy` for an async element and wrapping it in `waitFor` is the common clumsy version.',
      'Prefer `userEvent` over `fireEvent`: it simulates the full interaction — focus, key events, input — rather than dispatching a single synthetic event, so it catches bugs `fireEvent` misses.',
      '**What to test**: pure functions and data transformations with unit tests; components at the behaviour level (does submitting show the error, does the disabled button stay disabled); and critical flows end-to-end with Playwright or Cypress. Do not test that a library works — test your use of it.',
      '**Mocking the network** at the boundary is the maintainable approach: MSW intercepts requests at the service-worker level, so your component code is untouched and the same handlers serve tests and local development. Mocking `fetch` directly couples every test to your implementation of fetching.',
    ],
    keyPoints: [
      'Query priority: role → label → text → test id.',
      '`queryBy` for absence, `findBy` for async, `getBy` for present-now.',
      '`userEvent` simulates real interaction; `fireEvent` dispatches one event.',
      'Mock the network at the boundary (MSW), not the fetch call.',
    ],
    interview:
      '"How do you decide what to test?" is the question, and "everything" is the wrong answer. Behaviour at boundaries, critical flows end-to-end, pure logic in units — and an explicit statement that implementation details are deliberately not tested.',
    code: `test('shows a validation error for a bad email', async () => {
  render(<Newsletter />);
  await userEvent.type(screen.getByLabelText(/email/i), 'nope');
  await userEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i);
});`,
    resources: [
      { label: 'Testing Library — Guiding principles', url: 'https://testing-library.com/docs/guiding-principles/', kind: 'docs' },
      { label: 'Testing Library — About queries', url: 'https://testing-library.com/docs/queries/about/', kind: 'docs', note: 'The priority order is the part interviewers probe.' },
      { label: 'MSW — Mock Service Worker', url: 'https://mswjs.io/', kind: 'docs' },
      { label: 'Kent C. Dodds — Testing implementation details', url: 'https://kentcdodds.com/blog/testing-implementation-details', kind: 'article' },
    ],
  },
  {
    id: 'frontend-system-design',
    area: 'Architecture',
    group: 'System design',
    title: 'Front-end system design: components, data, states, failure',
    status: 'missing',
    minutes: 8,
    summary:
      'The senior round. It is not back-end system design with React nouns — it is about component boundaries, data flow, rendering strategy and what happens when things break.',
    body: [
      'A repeatable structure beats improvisation. **1 — Clarify**: who uses it, on what devices, at what scale, what must work offline, what the accessibility bar is. **2 — Component boundaries**: draw the tree and say what owns which state. **3 — Data**: what is fetched, where, when, cached how, invalidated by what. **4 — States**: loading, empty, partial, error, success — enumerate all five for every surface. **5 — Failure**: slow network, failed request, stale cache, race conditions. **6 — Performance and accessibility**: budget, splitting, keyboard model.',
      '**Rendering strategy** is the architectural fork: CSR (fast to build, slow first paint, poor SEO), SSR (fast first paint, server cost, hydration complexity), SSG (fastest, only for content that changes rarely), ISR (SSG with revalidation), and RSC (server components streaming with zero client JS for non-interactive parts). Name the trade rather than a favourite.',
      '**The states nobody enumerates** are where marks are won. Empty is not loading. Partial error — three widgets loaded, one failed — needs a design, and it is why per-pane error boundaries beat one at the root. Optimistic updates need a rollback story. Concurrent edits need a conflict story.',
      '**Race conditions** deserve explicit mention: a search-as-you-type that fires three requests can render the first response last. The fixes are an `AbortController` per keystroke, a request sequence number, or a query library that handles it. Interviewers listen for whether you notice unprompted.',
      'Classic prompts: design an autocomplete (debounce, abort, cache, keyboard model, ARIA combobox), an infinite feed (`IntersectionObserver`, virtualization, scroll restoration), a file uploader (chunking, progress, retry, cancel), a dashboard (independent widget loading, partial failure, polling versus streaming).',
    ],
    keyPoints: [
      'Structure: clarify → boundaries → data → states → failure → performance/a11y.',
      'Five states per surface: loading, empty, partial, error, success.',
      'Search-as-you-type has a race condition — say so before being asked.',
      'Name the rendering trade-off; do not advocate one strategy universally.',
    ],
    interview:
      '"Design a typeahead search" is the most common front-end design prompt. Debounce input, abort in-flight requests, cache by query, handle empty and error states, define the ARIA combobox keyboard model, and mention the race condition explicitly. That sequence *is* the answer.',
    resources: [
      { label: 'GreatFrontEnd — System design guide', url: 'https://www.greatfrontend.com/system-design', kind: 'practice', note: 'A framework plus worked examples for exactly these prompts.' },
      { label: 'web.dev — Rendering on the web', url: 'https://web.dev/articles/rendering-on-the-web', kind: 'article', note: 'The canonical comparison of CSR, SSR, SSG and hydration.' },
      { label: 'W3C APG — Combobox pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/', kind: 'spec', note: 'The keyboard model you will be asked to describe for autocomplete.' },
    ],
  },
];
