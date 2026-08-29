import type { LearnTopic } from '../types';

/** Client storage, caching layers, and the observability loop. */
export const dataObservabilityTopics: LearnTopic[] = [
  {
    id: 'rd-store-comparison',
    area: 'Architecture',
    group: 'Client storage',
    title: 'localStorage vs sessionStorage vs cookies vs IndexedDB — pick by lifetime and size',
    status: 'covered',
    minutes: 8,
    summary:
      'Four stores with different lifetimes, capacities and whether the server ever sees them. The selection is mechanical once you know the axes, and it is a very common warm-up question.',
    body: [
      '| | Lifetime | Size | Sent to server | API |',
      '| --- | --- | --- | --- | --- |',
      '| **localStorage** | until cleared | ~5–10 MB | no | sync, string only |',
      '| **sessionStorage** | per tab, dies on close | ~5–10 MB | no | sync, string only |',
      '| **Cookies** | Expires/Max-Age | ~4 KB | **yes, every request** | sync, string |',
      '| **IndexedDB** | until cleared | hundreds of MB+ | no | async, structured |',
      '',
      '### The one that bites: synchronous storage',
      '`localStorage` blocks the main thread. Reading a large JSON blob on startup is a measurable INP and startup regression. It is also **per-origin, not per-tab** — two tabs share it and race.',
      '',
      '`sessionStorage` is per-tab, which makes it right for wizard progress that should not leak between tabs, and wrong for anything the user expects to survive a reload into a new tab.',
      '',
      '### Cookies are a performance decision',
      'Every cookie on an origin is attached to **every** request to it, including images and scripts. A 3 KB cookie on 60 asset requests is 180 KB uploaded on a slow uplink. This is why static assets belong on a cookieless domain.',
      '',
      '### IndexedDB',
      'The only one built for real volume: async (never blocks), stores structured clones (Blobs, Files, Dates, Maps), supports indexes and transactions. The raw API is unpleasant — use `idb` or Dexie. This is what backs offline apps and Cache-Storage-adjacent workflows.',
      '',
      '### Eviction — the part people miss',
      'All of it is **best-effort**. Under storage pressure the browser may evict your origin\'s data entirely. `navigator.storage.persist()` requests durability; `estimate()` reports quota. Never treat browser storage as a system of record.',
    ],
    code: `// Guard every read: quota errors, private mode, and corrupt values are all real.
function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;   // SecurityError, QuotaExceededError, or bad JSON
  }
}`,
    keyPoints: [
      'localStorage and sessionStorage are synchronous — large reads cost main-thread time.',
      'Cookies ride on every request to the origin; size them like a performance budget.',
      'IndexedDB is the only option for large or structured data, and it is async.',
      'Any browser storage can be evicted; it is a cache, never a source of truth.',
    ],
    interview:
      'The distinguishing detail is the cookie-per-request cost and the fact that localStorage blocks the main thread. Most answers stop at "5MB vs 4KB".',
    pitfalls: [
      'Assuming sessionStorage is shared across tabs. It is not, deliberately.',
      'Unguarded localStorage access — it throws outright in some privacy modes.',
    ],
    resources: [
      { label: 'MDN — Storage quotas and eviction', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria', kind: 'docs' },
      { label: 'idb', url: 'https://github.com/jakearchibald/idb', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Multi-step form state that must NOT leak into a second tab. Which store?',
        options: ['localStorage', 'sessionStorage', 'A cookie', 'IndexedDB'],
        correct: 1,
        explanation:
          'sessionStorage is scoped to the tab and cleared when it closes. localStorage and cookies are per-origin and shared across tabs, so a second tab would see and race the first.',
      },
    ],
  },

  {
    id: 'rd-cache-http',
    area: 'Performance',
    group: 'Caching',
    title: 'HTTP caching — immutable assets, revalidation, and stale-while-revalidate',
    status: 'covered',
    minutes: 8,
    summary:
      'The cheapest request is the one never sent. Two families of directive — freshness and validation — plus one modern directive that removes the latency cost of being careful.',
    body: [
      '### Freshness: do not ask at all',
      '`Cache-Control: max-age=31536000, immutable` — use it and no request is made. Only safe for **content-hashed filenames** (`app.9f3c1a.js`), where a change produces a new URL.',
      '',
      '### Validation: ask cheaply',
      'When it may have changed, the browser sends a conditional request with `If-None-Match` (from `ETag`) or `If-Modified-Since` (from `Last-Modified`). Unchanged → **304**, headers only, no body. You still pay a round trip.',
      '',
      '### stale-while-revalidate — the one to name',
      '```',
      'Cache-Control: max-age=60, stale-while-revalidate=3600',
      '```',
      'For an hour after expiry, serve the stale copy **instantly** and refresh in the background. The user waits for nothing; the next load is fresh. Exactly the trade a dashboard or feed wants, and the semantics SWR and React Query took their name and behaviour from.',
      '',
      '### The standard asset strategy',
      '- HTML → `no-cache` (always revalidate; it names the hashed assets)',
      '- Hashed JS/CSS/images → `max-age=31536000, immutable`',
      '- API responses → short `max-age` plus `stale-while-revalidate`, or `no-store` for anything private',
      '',
      '`no-cache` means "revalidate before use", **not** "do not cache". `no-store` is the one that means do not write it down — use it for authenticated responses so a shared cache never keeps them.',
      '',
      '### Vary',
      '`Vary: Accept-Encoding` is routine. `Vary: Cookie` effectively disables shared caching, because every distinct cookie is a distinct cache entry.',
    ],
    keyPoints: [
      'no-cache = revalidate every time; no-store = never write it down. They are not synonyms.',
      'immutable is only correct with content-hashed URLs.',
      'stale-while-revalidate trades a moment of staleness for zero perceived latency.',
      'Vary: Cookie usually destroys CDN cache hit rate.',
    ],
    interview:
      'Asked to cache a dashboard API, propose short max-age plus stale-while-revalidate and explain the perceived-latency win. It is a concrete, correct, slightly-beyond-basic answer.',
    resources: [
      { label: 'MDN — Cache-Control', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'What does Cache-Control: no-cache actually instruct?',
        options: ['Never store the response', 'Store it, but revalidate before each reuse', 'Cache for zero seconds', 'Cache only in the browser'],
        correct: 1,
        explanation:
          'no-cache permits storage but requires revalidation before reuse — usually a cheap 304. The directive that forbids storage is no-store.',
      },
    ],
  },

  {
    id: 'rd-cache-client',
    area: 'Architecture',
    group: 'Caching',
    title: 'In-memory and API caching — normalization, invalidation, optimistic writes',
    status: 'covered',
    minutes: 9,
    summary:
      'Above HTTP sits the cache your app owns: a keyed store of server state with its own staleness policy. React Query, SWR, RTK Query and Apollo are all this idea, and interviews probe invalidation and normalization.',
    body: [
      '### Server state is not app state',
      'The core insight behind the whole category: data owned by the server is **cached**, not stored. It can go stale without you touching it, so it needs staleness, refetch and invalidation semantics that `useState` cannot express. Keeping server data in Redux by hand is how apps grow a bespoke, buggy cache.',
      '',
      '### The lifecycle',
      '`fresh` (within staleTime, serve from cache, no request) → `stale` (serve immediately, refetch in background) → `inactive` (no component using it) → `garbage collected` after cacheTime.',
      '',
      '### Normalization',
      'Store entities once, keyed by id, and hold references elsewhere. Without it the same user embedded in three responses becomes three copies that drift after an update. Apollo and RTK Query normalize; React Query deliberately does not, and invalidates by key instead — a simpler model that trades some duplication for far less machinery.',
      '',
      '### Invalidation — the hard half',
      '- **Time-based** — staleTime. Simple, always slightly wrong.',
      '- **Event-based** — after a mutation, invalidate the affected keys. Precise, requires knowing the graph.',
      '- **Tag-based** — mutations declare which tags they invalidate (RTK Query). The best balance in practice.',
      '',
      '### Optimistic updates',
      'Write the expected result into the cache immediately, fire the mutation, and **roll back on failure**. The rollback is the part people skip, and it is what interviewers ask about. Snapshot the previous value, restore it in `onError`, and always refetch in `onSettled` so the cache reconverges with the server.',
      '',
      '### LRU, for caches you write yourself',
      'A bounded cache needs an eviction policy. LRU via `Map` is idiomatic: `Map` preserves insertion order, so delete-then-set moves a key to the most-recent position, and `map.keys().next().value` is the least recent.',
    ],
    code: `class LRU<K, V> {
  private m = new Map<K, V>();
  constructor(private max: number) {}
  get(k: K): V | undefined {
    if (!this.m.has(k)) return undefined;
    const v = this.m.get(k)!;
    this.m.delete(k); this.m.set(k, v);        // re-insert = most recently used
    return v;
  }
  set(k: K, v: V): void {
    if (this.m.has(k)) this.m.delete(k);
    this.m.set(k, v);
    if (this.m.size > this.max) this.m.delete(this.m.keys().next().value!);
  }
}`,
    keyPoints: [
      'Server state is a cache with staleness rules, not component state.',
      'Normalization prevents the same entity drifting across responses.',
      'Optimistic updates are only correct if the rollback path exists.',
      'Map preserves insertion order, which makes LRU eviction a three-line operation.',
    ],
    interview:
      '"How would you implement an LRU cache" is a common warm-up; "how do you invalidate after a mutation" is the real question. Answer with tags, and mention rollback.',
    pitfalls: [
      'Optimistic UI with no rollback — the screen silently disagrees with the server.',
      'Caching per-user data under a key that omits the user id.',
    ],
    resources: [
      { label: 'TanStack Query — Caching', url: 'https://tanstack.com/query/latest/docs/framework/react/guides/caching', kind: 'docs' },
      { label: 'RTK Query — Cache invalidation', url: 'https://redux-toolkit.js.org/rtk-query/usage/automated-refetching', kind: 'docs' },
    ],
  },

  {
    id: 'rd-obs-telemetry',
    area: 'Observability',
    group: 'Telemetry',
    title: 'Frontend telemetry — RUM, Web Vitals, errors and traces that survive the browser',
    status: 'covered',
    minutes: 8,
    summary:
      'You cannot reproduce your users\' devices, networks or extensions. Telemetry replaces guessing, and the frontend has specific delivery problems the backend does not.',
    body: [
      '### Three signals',
      '- **Metrics** — Core Web Vitals from real users: **LCP** (loading), **INP** (responsiveness, which replaced FID in 2024), **CLS** (visual stability).',
      '- **Errors** — exceptions, unhandled rejections, and resource load failures.',
      '- **Traces** — one request id followed from the click through the API to the database.',
      '',
      '### Lab vs field, and why both',
      'Lighthouse is a **lab** measurement: one machine, throttled, deterministic — good for catching regressions in CI. **RUM** is the field: real devices, real networks, a long tail you would never simulate. Optimise against p75 field data, not your laptop.',
      '',
      '### The delivery problem',
      'The most valuable moment to report is when the user is leaving, and that is exactly when `fetch` gets cancelled. Use `navigator.sendBeacon()`, which hands the payload to the browser to deliver after the page dies. Flush on `visibilitychange → hidden`, **not** on `unload` — `unload` does not fire reliably on mobile.',
      '',
      '### Source maps',
      'Minified stack traces are unreadable. Upload source maps to the error tracker at build time and do **not** serve them publicly.',
      '',
      '### Sampling and privacy',
      'Full-fidelity telemetry from every session is expensive and is a compliance liability. Sample traces (1–10%), keep errors at 100%, and scrub PII before it leaves the browser — URLs and form values leak more than people expect.',
      '',
      'OpenTelemetry is the vendor-neutral standard; propagating `traceparent` from the browser is what makes frontend and backend traces join up.',
    ],
    code: `import { onLCP, onINP, onCLS } from 'web-vitals';

const queue: unknown[] = [];
const record = (m: unknown) => queue.push(m);
[onLCP, onINP, onCLS].forEach((f) => f(record));

// Send when the page is hidden — the last reliable moment on mobile.
addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && queue.length) {
    navigator.sendBeacon('/rum', JSON.stringify(queue.splice(0)));
  }
});`,
    keyPoints: [
      'INP replaced FID as the responsiveness vital.',
      'sendBeacon survives page teardown; fetch on unload does not.',
      'Flush on visibilitychange→hidden; unload is unreliable on mobile.',
      'Optimise p75 field data, not a lab score on a fast laptop.',
    ],
    interview:
      'Asked how you would know the app is slow for users, separate lab from field and name sendBeacon plus the visibilitychange flush. That detail signals you have actually shipped RUM.',
    pitfalls: [
      'Publishing source maps to production.',
      'Averaging performance metrics. Use percentiles; the mean hides the tail that hurts.',
    ],
    resources: [
      { label: 'web.dev — Core Web Vitals', url: 'https://web.dev/articles/vitals', kind: 'docs' },
      { label: 'MDN — sendBeacon', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Why is navigator.sendBeacon preferred for analytics on page exit?',
        options: ['It is faster', 'It is delivered by the browser after the page is torn down', 'It compresses automatically', 'It bypasses CORS'],
        correct: 1,
        explanation:
          'The browser takes ownership of the request and delivers it even after the document is gone. A fetch issued during unload is routinely cancelled.',
      },
    ],
  },

  {
    id: 'rd-obs-alerting',
    area: 'Observability',
    group: 'Operations',
    title: 'Alerting and the fix loop — SLOs, error budgets, and not waking people for noise',
    status: 'covered',
    minutes: 7,
    summary:
      'Telemetry you never act on is a cost centre. Alerting turns signal into response, and the discipline is alerting on user-visible symptoms rather than on every anomaly.',
    body: [
      '### SLI → SLO → error budget',
      '- **SLI** — the measured thing: "% of sessions with LCP under 2.5s".',
      '- **SLO** — the target: "99% of sessions, over 28 days".',
      '- **Error budget** — the permitted 1%. Spend it on shipping; when it is exhausted, stop feature work and fix reliability. It converts an argument into arithmetic.',
      '',
      '### Alert on symptoms, not causes',
      'Page on "checkout error rate above 2% for 5 minutes" — a user-visible symptom. Do **not** page on "CPU is high", which may be entirely fine. Every alert must be actionable and have a runbook; anything else trains people to ignore the channel, and that is how real incidents get missed.',
      '',
      '### Burn-rate alerting',
      'Alerting on a raw threshold produces noise. Alert on how fast the error budget is being consumed: a fast burn (2% of the monthly budget in an hour) pages immediately; a slow burn opens a ticket. This is the standard modern pattern.',
      '',
      '### Frontend-specific gotchas',
      '- A **deploy** is the most common cause of a step change. Tag telemetry with release version so "since when" is one query.',
      '- **Browser extensions and bots** generate exceptions you cannot fix. Filter by user agent and by whether the stack frame is in your own bundle, or your error rate is permanently meaningless.',
      '- **Third-party scripts** fail in ways that look like your errors. Attribute by script origin.',
      '',
      '### The fix loop',
      'Detect → triage (is it new, is it growing, who does it affect) → mitigate (roll back first; diagnose after) → fix → **blameless postmortem** → add the regression test. Rolling back before understanding is correct, and saying so is a maturity signal.',
    ],
    keyPoints: [
      'Alert on user-visible symptoms with a runbook; never on raw resource metrics.',
      'Error budgets convert "ship vs stabilise" into a measurable decision.',
      'Burn-rate alerts distinguish an emergency from a slow leak.',
      'Tag telemetry with release version — most step changes are a deploy.',
    ],
    interview:
      '"Mitigate before you diagnose — roll back, restore users, then find the cause" is the sentence that reads as on-call experience.',
    pitfalls: [
      'Alerting on every error type until the channel is ignored.',
      'Counting extension-generated exceptions in your own error rate.',
    ],
    resources: [
      { label: 'Google SRE Workbook — Alerting on SLOs', url: 'https://sre.google/workbook/alerting-on-slos/', kind: 'book' },
    ],
  },
];
