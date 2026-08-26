import type { LearnTopic } from './types';

/** React 19 — named explicitly on the Mettl competency list. */
export const react19Topics: LearnTopic[] = [
  {
    id: 'r19-actions',
    area: 'React 19',
    group: 'Actions',
    title: 'Actions, `useActionState`, `useFormStatus`, `useOptimistic`',
    status: 'partial',
    minutes: 8,
    summary:
      'React 19 replaces the hand-rolled "submitting / error / success" triad with a first-class notion of an action. Mettl names "Actions" and "New hook" directly, so this is examinable, not just fashionable.',
    body: [
      'An **action** is an async function passed to `<form action={fn}>` or to a form-aware hook. React tracks its pending state, its errors and its result for you. The old pattern — `useState` for data, another for `loading`, another for `error`, and an `onSubmit` that juggles all three — collapses into one hook.',
      '**`useActionState(fn, initialState)`** returns `[state, formAction, isPending]`. You hand `formAction` to the form, and `fn` receives `(previousState, formData)` and returns the next state. It was called `useFormState` in canary and moved from `react-dom` to `react` — a rename interviewers like to check.',
      '**`useFormStatus()`** is read from `react-dom` and must be called by a component **inside** the form. It returns `{ pending, data, method, action }`. The point is that a shared `<SubmitButton />` can disable itself during submission **without any props and without context** — the wiring people used to build by hand.',
      '**`useOptimistic(state, reducer)`** returns an optimistic value plus a setter. Call the setter inside an action and the UI shows the expected result immediately, then reconciles when the real result lands — reverting automatically if it fails. That is the "like button responds instantly" pattern with the rollback bookkeeping removed.',
      '`useTransition` also gained action support: `startTransition(async () => { … })` marks async work as non-urgent so typing stays responsive while it runs. Together these four hooks are what React means by "Actions" as a feature rather than a word.',
    ],
    keyPoints: [
      '`useActionState` returns `[state, formAction, isPending]` — three things, one hook.',
      '`useFormStatus` comes from `react-dom` and only works inside the `<form>`.',
      '`useOptimistic` shows the expected value and reverts on failure automatically.',
      '`useFormState` (canary) was renamed `useActionState` and moved to `react`.',
    ],
    interview:
      'Expect "what is new in React 19" and be ready to name all four plus `use()` and ref-as-prop. The strong answer explains *what problem each removes* — the loading flag, the prop drilling, the rollback state — rather than reciting names.',
    code: `function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    async (_prev, formData) => subscribe(formData.get('email')),
    { ok: false },
  );
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <SubmitButton />           {/* reads pending itself */}
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();   // no props needed
  return <button disabled={pending}>{pending ? 'Sending…' : 'Subscribe'}</button>;
}`,
    resources: [
      { label: 'React — useActionState', url: 'https://react.dev/reference/react/useActionState', kind: 'docs' },
      { label: 'React — useFormStatus', url: 'https://react.dev/reference/react-dom/hooks/useFormStatus', kind: 'docs' },
      { label: 'React — useOptimistic', url: 'https://react.dev/reference/react/useOptimistic', kind: 'docs' },
      { label: 'React 19 release post', url: 'https://react.dev/blog/2024/12/05/react-19', kind: 'article', note: 'The primary source for every React 19 interview answer.' },
    ],
  },
  {
    id: 'r19-use-rsc',
    area: 'React 19',
    group: 'Server & rendering',
    title: '`use()`, Server Components, `createRoot` vs `hydrateRoot`',
    status: 'partial',
    minutes: 8,
    summary:
      'The rendering half of React 19, all four items of which Mettl lists by name: Server Components, rendering APIs, and the new hook.',
    body: [
      '**`use()`** reads a resource during render — a promise (suspending until it resolves) or a context. It is the **only hook that may be called conditionally**, which is possible because it is not backed by a hook slot in the same way. Reading a promise with `use()` requires a `<Suspense>` boundary above it to render the fallback.',
      '**Server Components** execute on the server, ship **no JavaScript** to the client, and can `await` directly in the component body. They cannot use state, effects, or browser APIs — because none of that exists where they run. Interactivity lives in client components marked with the `"use client"` directive; `"use server"` marks server actions callable from the client.',
      'The mental model that answers most RSC questions: **server components render to a serialised description, not to HTML strings**, and that description is streamed and merged into the client tree. This is why they compose with client components rather than replacing them, and why RSC is not the same thing as SSR.',
      '**`createRoot` vs `hydrateRoot`**: `createRoot(container).render(<App/>)` renders into empty DOM — client-only apps. `hydrateRoot(container, <App/>)` attaches to **server-rendered HTML that already exists**, adopting the markup and wiring events to it. A mismatch between server and client output produces a hydration error, and the usual causes are `Date.now()`, `Math.random()`, `window` access during render, or locale-dependent formatting.',
      'Also in 19 and worth naming: **`ref` is an ordinary prop** for function components (`forwardRef` is legacy), callback refs may return a cleanup function, **document metadata** (`<title>`, `<meta>`, `<link>`) can be rendered anywhere and React hoists it into `<head>`, and the **React Compiler** auto-memoises so most manual `useMemo`/`useCallback` becomes unnecessary.',
    ],
    keyPoints: [
      '`use()` is the one hook you may call conditionally; promises need a Suspense boundary.',
      'Server Components ship zero JS and cannot hold state — `"use client"` marks the interactive boundary.',
      '`hydrateRoot` adopts existing server HTML; `createRoot` renders into empty DOM.',
      'React 19: `ref` as a prop, hoisted document metadata, and the auto-memoising compiler.',
    ],
    interview:
      '"Difference between `createRoot` and `hydrateRoot`" and "what can a Server Component not do" are both direct Mettl-syllabus items. For hydration errors, name the causes — non-deterministic values during render — rather than describing the symptom.',
    code: `// Server Component — no JS shipped, can await directly
async function Profile({ id }) {
  const user = await db.user.find(id);      // runs on the server
  return <ClientAvatar user={user} />;       // interactivity crosses the boundary
}

// Client Component
'use client';
function ClientAvatar({ user }) {
  const [open, setOpen] = useState(false);   // state only exists here
  return <img src={user.avatar} onClick={() => setOpen(o => !o)} />;
}`,
    resources: [
      { label: 'React — use', url: 'https://react.dev/reference/react/use', kind: 'docs' },
      { label: 'React — Server Components', url: 'https://react.dev/reference/rsc/server-components', kind: 'docs' },
      { label: 'React — hydrateRoot', url: 'https://react.dev/reference/react-dom/client/hydrateRoot', kind: 'docs' },
      { label: 'React — React Compiler', url: 'https://react.dev/learn/react-compiler', kind: 'docs' },
    ],
  },
];
