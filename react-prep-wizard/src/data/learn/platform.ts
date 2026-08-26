import type { LearnTopic } from './types';

/** The web platform under every framework: rendering path, network, storage, security. */
export const platformTopics: LearnTopic[] = [
  {
    id: 'web-how-page-loads',
    area: 'Web Platform',
    group: 'How a page becomes pixels',
    title: 'URL to pixels — the critical rendering path',
    status: 'missing',
    minutes: 8,
    summary:
      'Everything a front-end engineer optimises happens somewhere on the path from typing a URL to seeing pixels. Knowing the stages by name is what lets you say *where* a slowdown lives instead of guessing.',
    body: [
      'The browser resolves the hostname through DNS, opens a TCP connection, negotiates TLS, then sends an HTTP request. Each of those is a round trip, which is why a cold connection to a distant origin costs far more than the bytes suggest. This is the reason CDNs exist: they move the origin closer, not make it faster.',
      'The HTML arrives as a stream and the parser begins building the DOM immediately — it does not wait for the whole document. When the parser meets a `<script>` without `defer` or `async`, it **stops**: script can call `document.write`, so the parser cannot safely continue. This single fact explains why scripts belong at the end of the body or carry `defer`.',
      'Stylesheets build the CSSOM. CSS is render-blocking by design — the browser will not paint content it might have to restyle a millisecond later, because flashing unstyled text is worse than waiting. DOM and CSSOM combine into the render tree, which contains only what is actually displayed (`display: none` subtrees are absent; `visibility: hidden` ones are present but invisible).',
      'Then three steps that you will hear named constantly in performance work: **layout** (also called reflow) computes geometry — where every box sits and how large it is; **paint** fills in pixels for each box; **composite** assembles the painted layers onto the screen. Changing a geometric property forces all three. Changing only `transform` or `opacity` can often skip straight to composite, which is precisely why animation advice says to prefer them.',
      'Two events end the story. `DOMContentLoaded` fires when the HTML is parsed and deferred scripts have run — the DOM is usable. `load` fires when every sub-resource, including images, has finished. React apps mount on the first; perception of "loaded" by a user usually happens somewhere between the two.',
    ],
    keyPoints: [
      'A synchronous `<script>` blocks HTML parsing; `defer` runs after parsing in order, `async` runs whenever it arrives, out of order.',
      'CSS blocks rendering, not parsing. JavaScript blocks parsing.',
      'layout → paint → composite. `transform`/`opacity` can skip to composite; `width`/`top`/`margin` cannot.',
      '`DOMContentLoaded` = DOM ready. `load` = every image and asset done.',
    ],
    interview:
      '"What happens when you type a URL and press enter?" is the most-asked open question in front-end interviews, and it is really a test of how many layers you can name without hand-waving. Say DNS → TCP → TLS → HTTP → parse → DOM+CSSOM → render tree → layout → paint → composite, then offer to go deeper on any stage.',
    pitfalls: [
      'Saying "the browser renders top to bottom" — it streams, and it repaints many times.',
      'Believing `async` preserves order. It does not; only `defer` does.',
    ],
    resources: [
      { label: 'MDN — Critical rendering path', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path', kind: 'docs', note: 'The canonical description, short enough to read in one sitting.' },
      { label: 'web.dev — How browsers work', url: 'https://web.dev/articles/howbrowserswork', kind: 'article', note: 'Long, but the diagrams are the ones everyone quotes.' },
      { label: 'MDN — Script loading: defer vs async', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer', kind: 'docs' },
    ],
  },
  {
    id: 'web-http',
    area: 'Web Platform',
    group: 'Network',
    title: 'HTTP, status codes, methods and idempotency',
    status: 'partial',
    minutes: 7,
    summary:
      'REST questions are really HTTP questions. Interviewers probe whether you know which methods are safe to retry, and what a status code obliges a client to do.',
    body: [
      'A method is **safe** if it does not change server state (`GET`, `HEAD`, `OPTIONS`). It is **idempotent** if doing it twice has the same effect as doing it once (`GET`, `PUT`, `DELETE`, `HEAD` — and notably **not** `POST`). This is not trivia: it decides whether your retry logic is allowed to retry. Retrying a failed `POST` may create two orders; retrying a failed `PUT` may not.',
      'Status codes group by first digit: 2xx success, 3xx redirect, 4xx you were wrong, 5xx we were wrong. The ones that come up: **201** created (with a `Location` header), **204** no content, **301** permanent vs **302**/**307** temporary, **304** not modified (the caching one), **400** malformed, **401** unauthenticated vs **403** authenticated-but-forbidden, **404** absent, **409** conflict, **422** semantically invalid, **429** rate limited (respect `Retry-After`), **500** generic server fault, **503** unavailable.',
      'The 401/403 distinction is asked constantly and answered wrongly. **401 means "I do not know who you are"** — sending credentials might fix it. **403 means "I know exactly who you are and the answer is still no"** — sending credentials again will not help.',
      'Headers worth knowing by name: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`/`If-None-Match`, `Last-Modified`/`If-Modified-Since`, `Set-Cookie`, and the CORS family (`Access-Control-Allow-Origin` and friends).',
    ],
    keyPoints: [
      'Idempotent methods are safe to retry automatically; `POST` is not.',
      '401 = unauthenticated. 403 = authenticated but not allowed.',
      '304 means "use your cache" and carries no body — that is the point.',
      '429 usually carries `Retry-After`; honouring it is what separates a good client from a rude one.',
    ],
    interview:
      'Expect "difference between PUT and PATCH" (full replace vs partial update), "is POST idempotent" (no), and "what does 304 mean". In a system-design round the follow-up is always retry strategy — exponential backoff with jitter, and never for non-idempotent methods without an idempotency key.',
    resources: [
      { label: 'MDN — HTTP response status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', kind: 'docs' },
      { label: 'MDN — HTTP request methods', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods', kind: 'docs' },
      { label: 'MDN — HTTP caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', kind: 'docs', note: 'Read the ETag section twice; it is the one people fumble.' },
    ],
  },
  {
    id: 'web-cors',
    area: 'Web Platform',
    group: 'Network',
    title: 'CORS, the same-origin policy, and preflight',
    status: 'missing',
    minutes: 7,
    summary:
      'Every front-end engineer hits a CORS error in week one and half of them never learn what it actually means. It is not a bug in your fetch call; it is the browser refusing to hand you a response you were not authorised to read.',
    body: [
      'An **origin** is the triple of scheme, host and port. `https://app.com` and `https://api.app.com` are different origins; so are `http://` and `https://` versions of the same host. The same-origin policy stops a page reading data from another origin, which is what prevents a malicious page from silently reading your webmail.',
      'CORS is the mechanism by which a server *opts out* of that restriction for specific callers. The browser sends an `Origin` header; the server answers with `Access-Control-Allow-Origin`. If they do not match, **the request usually still reached the server and ran** — the browser simply refuses to expose the response to your JavaScript. This is why "the API works in Postman" is never evidence of anything: Postman is not a browser and enforces no such policy.',
      'For anything beyond a simple request the browser sends a **preflight**: an `OPTIONS` request asking permission before the real one. A request is "simple" only if it uses `GET`/`HEAD`/`POST`, carries no custom headers, and uses a basic content type (`text/plain`, `application/x-www-form-urlencoded`, `multipart/form-data`). Sending `Content-Type: application/json` — which every API client does — triggers preflight. That is the single most common cause of a mysterious extra `OPTIONS` in the network tab.',
      'Credentials add another layer. To send cookies cross-origin you need `credentials: "include"` on the client **and** `Access-Control-Allow-Credentials: true` on the server — and in that mode the server may **not** answer with the wildcard `*`; it must name the exact origin.',
    ],
    keyPoints: [
      'CORS protects the *reader*, not the server. The request typically still executed.',
      '`Content-Type: application/json` makes a request non-simple and triggers an `OPTIONS` preflight.',
      'With credentials, `Access-Control-Allow-Origin: *` is illegal — the origin must be named.',
      '"It works in Postman" proves nothing about CORS.',
    ],
    interview:
      'Asked as "you got a CORS error, what do you do?". The strong answer names where the fix lives: on the **server**, in response headers — or in development, behind a dev-server proxy so the browser sees a same-origin request. Anything you can change in the front-end code alone is a workaround, not a fix.',
    pitfalls: [
      'Trying to fix CORS by changing fetch options. You cannot; the server decides.',
      'Confusing CORS with CSRF. CORS relaxes a restriction; CSRF exploits one.',
    ],
    resources: [
      { label: 'MDN — CORS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', kind: 'docs', note: 'The preflight flowchart is worth committing to memory.' },
      { label: 'MDN — Same-origin policy', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy', kind: 'docs' },
    ],
  },
  {
    id: 'web-storage',
    area: 'Web Platform',
    group: 'Storage',
    title: 'Cookies, localStorage, sessionStorage, IndexedDB',
    status: 'missing',
    minutes: 6,
    summary:
      'Four storage mechanisms with different lifetimes, sizes, and security properties. Choosing wrongly is how tokens end up readable by any script on the page.',
    body: [
      '**Cookies** are sent to the server on every matching request, which makes them the only option for something the server must see — a session id. They are small (~4KB), and their security comes from flags: `HttpOnly` makes them invisible to JavaScript (defeating XSS token theft), `Secure` restricts them to HTTPS, and `SameSite` (`Lax`, `Strict`, `None`) controls whether they ride along on cross-site requests — the main CSRF defence.',
      '**localStorage** is roughly 5–10MB, synchronous, string-only, and persists until explicitly cleared. Synchronous matters: a large read blocks the main thread. It is **readable by any JavaScript on the page**, so storing a bearer token there means any successful XSS is a full account takeover.',
      '**sessionStorage** has the same API and limits but is scoped to a single tab and cleared when that tab closes. Useful for wizard progress that should not leak between tabs.',
      '**IndexedDB** is the real database: asynchronous, transactional, indexed, structured-clone capable (so `Date`, `Blob`, `Map` survive), and large. Its raw API is unpleasant enough that most people reach for a wrapper such as `idb`. It is what you use for offline data or anything past a few megabytes.',
      'A newer entry worth naming: the **Cache API**, used with service workers to store whole HTTP responses. It is what makes offline-first PWAs possible.',
    ],
    keyPoints: [
      'Only cookies are automatically sent to the server.',
      '`HttpOnly` + `Secure` + `SameSite` are the three flags that matter.',
      'localStorage is synchronous and script-readable — never put a token you cannot afford to lose in it.',
      'IndexedDB survives structured clone: Dates and Blobs come back as Dates and Blobs.',
    ],
    interview:
      '"Where do you store a JWT?" is a trap with a correct answer: an `HttpOnly`, `Secure`, `SameSite` cookie, because localStorage exposes it to XSS. If the interviewer pushes back with "but then CSRF" — that is the right conversation, and `SameSite` plus a CSRF token is the answer.',
    resources: [
      { label: 'MDN — Web Storage API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API', kind: 'docs' },
      { label: 'MDN — Using HTTP cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies', kind: 'docs' },
      { label: 'MDN — IndexedDB API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API', kind: 'docs' },
    ],
  },
  {
    id: 'web-security',
    area: 'Web Platform',
    group: 'Security',
    title: 'XSS, CSRF, clickjacking and CSP',
    status: 'missing',
    minutes: 8,
    summary:
      'The four attacks a front-end engineer is expected to name, and the specific defence for each. Getting XSS and CSRF the wrong way round is a common and costly slip.',
    body: [
      '**XSS (cross-site scripting)** is attacker JavaScript running in your origin. Stored XSS lives in your database, reflected XSS bounces off a URL parameter, DOM XSS never touches the server at all — it comes from writing untrusted input into a dangerous sink like `innerHTML`. The defence is to **escape on output** and to avoid the sinks. React escapes text by default, which is why XSS in React almost always traces to `dangerouslySetInnerHTML`, an attacker-controlled `href="javascript:..."`, or unsanitised HTML from a CMS.',
      '**CSRF (cross-site request forgery)** is the opposite shape: the attacker cannot read anything, but makes *your* browser send an authenticated request — an image tag pointing at a "delete account" endpoint. It works precisely because cookies are attached automatically. Defences: `SameSite` cookies, a CSRF token the attacker cannot read, and never using `GET` for state changes.',
      '**Clickjacking** frames your page invisibly over a decoy so the victim clicks something they cannot see. Defence: `X-Frame-Options: DENY` or the modern `Content-Security-Policy: frame-ancestors`.',
      '**CSP (Content Security Policy)** is a response header telling the browser which sources of script, style, image and frame are permitted. A good CSP turns a would-be XSS into a blocked request. `unsafe-inline` defeats most of the benefit, which is why nonces or hashes are preferred.',
      'One more that catches React developers: `target="_blank"` without `rel="noopener"` lets the opened page reach back through `window.opener`. Modern browsers default to `noopener`, but interviewers still ask.',
    ],
    keyPoints: [
      'XSS = attacker runs script in your origin. CSRF = attacker uses your credentials without reading anything.',
      'React escapes by default; `dangerouslySetInnerHTML` is the deliberate hole.',
      '`SameSite=Lax` blocks most CSRF for free.',
      'CSP with `unsafe-inline` is mostly decorative.',
    ],
    interview:
      'Almost guaranteed in any interview above junior level: "how does React protect against XSS, and where does that protection stop?" The answer: it escapes interpolated values, and it stops at `dangerouslySetInnerHTML`, `javascript:` URLs, and anything injected outside React.',
    resources: [
      { label: 'OWASP — XSS prevention cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', kind: 'article', note: 'The reference everyone cites; skim the sink list.' },
      { label: 'OWASP — CSRF prevention cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html', kind: 'article' },
      { label: 'MDN — Content Security Policy', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP', kind: 'docs' },
    ],
  },
];
