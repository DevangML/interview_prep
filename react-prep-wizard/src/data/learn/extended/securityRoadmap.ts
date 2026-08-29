import type { LearnTopic } from '../types';

/**
 * Frontend security, at the depth a 3–4 YOE React interview actually probes.
 *
 * The bar here is not "can you recite OWASP". It is: given a concrete exploit,
 * can you name the mechanism that permits it and the specific control that
 * closes it — and can you say what that control costs. Every topic below is
 * written to that shape.
 */
export const securityRoadmapTopics: LearnTopic[] = [
  {
    id: 'rd-sec-overview',
    area: 'Security',
    group: 'Foundations',
    title: 'The frontend threat model — whose code runs in your origin',
    status: 'covered',
    minutes: 7,
    summary:
      'Browser security is built on the origin. Almost every frontend vulnerability is a story about code or requests crossing an origin boundary they should not have crossed.',
    body: [
      '### The one abstraction: the origin',
      'An origin is `scheme://host:port`. Two pages share an origin only if all three match. `https://app.com` and `https://api.app.com` are **different** origins; so are `http://` and `https://` versions of the same host.',
      '',
      '### The three questions every frontend exploit answers',
      '1. **Whose script is running in my origin?** — if attacker script runs here, it has everything: cookies via `document.cookie`, tokens in `localStorage`, the DOM, and the user\'s session. That is XSS, and it is the worst case.',
      '2. **Who can make the browser send my credentials?** — cookies attach automatically to requests. Another site can cause that send without reading the reply. That is CSRF.',
      '3. **Who can read the reply?** — the same-origin policy blocks reading cross-origin responses; CORS is the server opting to allow it.',
      '',
      '### Why "the backend handles security" is wrong at 3 YOE',
      'The server cannot tell a real user from attacker JavaScript running inside the real user\'s tab. Once XSS lands, every server-side control that trusts the session is bypassed. Frontend controls are not defence in depth here — for XSS they are the *only* depth.',
    ],
    keyPoints: [
      'Origin = scheme + host + port; all three must match.',
      'XSS is total compromise of the origin. Rank it above everything else.',
      'CSRF is about the browser *sending* credentials; CORS is about *reading* responses. They are unrelated.',
      'The same-origin policy blocks reads, not sends — which is exactly why CSRF exists.',
    ],
    interview:
      'Order the frontend risks by blast radius and justify it: XSS first, because attacker code inside your origin defeats every other control you have.',
    pitfalls: [
      'Believing CORS prevents CSRF. It does not; a form POST needs no CORS permission.',
      'Treating a subdomain as same-origin. It is not, though cookies may still be shared via the Domain attribute.',
    ],
    resources: [
      { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', kind: 'docs' },
      { label: 'MDN — Same-origin policy', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Your API sets a strict CORS allowlist. Are you protected from CSRF?',
        options: ['Yes, CORS blocks the request', 'No, CORS does not stop the request being sent', 'Only for GET requests', 'Only if credentials are omitted'],
        correct: 1,
        explanation:
          'CORS governs whether JavaScript may *read* a cross-origin response. A simple form POST is sent regardless, and the server still executes it. CSRF is stopped by SameSite cookies or a CSRF token, not CORS.',
      },
    ],
  },

  {
    id: 'rd-sec-xss',
    area: 'Security',
    group: 'Injection',
    title: 'XSS — stored, reflected and DOM-based, and why React is not immunity',
    status: 'covered',
    minutes: 9,
    summary:
      'Cross-site scripting is attacker JavaScript executing in your origin. React escapes text by default, which removes the common case and leaves a handful of sharp edges that interviews target precisely because they survive JSX.',
    body: [
      '### Three delivery routes',
      '- **Stored** — payload is persisted server-side (a comment, a profile name) and served to every viewer. Highest impact.',
      '- **Reflected** — payload rides in the URL and is echoed into the response for whoever clicks the link.',
      '- **DOM-based** — the server never sees it. Client code reads `location.hash` or `postMessage` data and writes it into the DOM. This is the one that survives a server-side audit.',
      '',
      '### What React gives you, precisely',
      'JSX escapes interpolated **text**. `<div>{userInput}</div>` is safe: `<script>` becomes visible characters, not a tag. That is where the protection ends.',
      '',
      '### The escapes React does not close',
      '- `dangerouslySetInnerHTML` — named to make you stop. Sanitize first.',
      '- **`href` / `src`** — `{userUrl}` where the value is `javascript:alert(1)` executes on click. JSX does not validate URL schemes.',
      '- **Spread props** — `{...userControlledObject}` can inject `dangerouslySetInnerHTML` itself.',
      '- **Direct DOM access** — `ref.current.innerHTML = value` bypasses React entirely.',
      '- **Third-party markdown / rich text** renderers with `html: true`.',
    ],
    code: `// UNSAFE — scheme is never checked
<a href={user.website}>Site</a>   // javascript:alert(document.cookie)

// SAFE — allowlist the scheme
function safeHref(raw: string): string | undefined {
  try {
    const u = new URL(raw, window.location.origin);
    return ['http:', 'https:', 'mailto:'].includes(u.protocol) ? u.href : undefined;
  } catch {
    return undefined;          // unparseable is not a link
  }
}`,
    keyPoints: [
      'JSX escapes text children only — not URLs, not spread props, not innerHTML.',
      'DOM-based XSS never reaches the server, so server-side scanning cannot find it.',
      'A successful XSS reads anything in localStorage, so "put the JWT in localStorage" is a decision about XSS blast radius.',
      'Sanitize on output for the specific sink, not once on input.',
    ],
    interview:
      '"React protects against XSS" is a half-answer. Say: JSX escapes text children, so the residual risk is dangerouslySetInnerHTML, javascript: URLs in href/src, prop spreading, and direct ref DOM writes.',
    pitfalls: [
      'Sanitizing on input. The same string is safe in text and dangerous in an href — context decides.',
      'Using a blocklist of `<script>`. Payloads use `onerror`, `onload`, `javascript:` and SVG.',
    ],
    resources: [
      { label: 'OWASP XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', kind: 'docs' },
      { label: 'React — dangerouslySetInnerHTML', url: 'https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Which of these is XSS-vulnerable in a React app?',
        options: ['<div>{comment}</div>', '<a href={profile.url}>link</a>', '<input value={name} />', '<img alt={caption} />'],
        correct: 1,
        explanation:
          'JSX escapes text children and attribute values as text, but it does not validate URL schemes. `javascript:alert(1)` in an href executes when clicked. Allowlist the protocol.',
      },
    ],
  },

  {
    id: 'rd-sec-sanitization',
    area: 'Security',
    group: 'Injection',
    title: 'Input validation vs output sanitization — and why they are not the same job',
    status: 'covered',
    minutes: 7,
    summary:
      'Validation decides whether data is acceptable. Sanitization makes data safe for one specific destination. Conflating them produces apps that are both annoying and insecure.',
    body: [
      '### Validation happens on input, and is about business rules',
      'Is this a well-formed email? Is the quantity positive? Reject early, message clearly. Validation is a **UX and integrity** control. It is not a security boundary, because the client can be bypassed entirely — always re-validate server-side.',
      '',
      '### Sanitization happens on output, and is about the sink',
      'The same string has different danger in different destinations:',
      '- into HTML → HTML-escape, or run an allowlist sanitizer',
      '- into an attribute → attribute-escape, and validate URL schemes',
      '- into SQL → parameterize (never string-concatenate)',
      '- into a shell → argument arrays, never interpolation',
      '',
      '### Use a real sanitizer, and configure it',
      'Hand-rolled regex sanitizers fail. Use DOMPurify, which parses with the browser and strips by allowlist.',
      '',
      '### The 2026 native option',
      'The **Sanitizer API** (`Element.setHTML()`) is landing in browsers, moving allowlist sanitization into the platform. Know it exists and that DOMPurify remains the portable answer today.',
    ],
    code: `import DOMPurify from 'dompurify';

// Allowlist, not blocklist. Everything not named is removed.
const clean = DOMPurify.sanitize(untrustedHtml, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'title'],
});

<div dangerouslySetInnerHTML={{ __html: clean }} />`,
    keyPoints: [
      'Validate on input for correctness; sanitize on output for safety.',
      'Sanitization is per-sink: HTML, attribute, URL, SQL and shell each need a different treatment.',
      'Allowlists survive; blocklists are eventually bypassed.',
      'Client-side validation is never a security control — the server must repeat it.',
    ],
    interview:
      'Asked "how do you stop injection", separate the two: validate at the boundary for business rules, sanitize at each sink for safety, and name the sink you are sanitizing for.',
    pitfalls: [
      'Sanitizing once, storing the result, then rendering it into a different sink later.',
      'Trusting a rich-text editor\'s output because it "produces clean HTML".',
    ],
    resources: [
      { label: 'DOMPurify', url: 'https://github.com/cure53/DOMPurify', kind: 'docs' },
      { label: 'OWASP Input Validation Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html', kind: 'docs' },
    ],
  },

  {
    id: 'rd-sec-csrf',
    area: 'Security',
    group: 'Session',
    title: 'CSRF — the attack that needs no access to your page',
    status: 'covered',
    minutes: 8,
    summary:
      'Cross-site request forgery abuses the browser\'s habit of attaching cookies to every request for a host, whoever caused the request. SameSite cookies changed the default posture, but did not delete the problem.',
    body: [
      '### The mechanism',
      'A user is logged into `bank.com`; the session cookie lives in the browser. They visit `evil.com`, which contains a form that auto-submits to `bank.com/transfer`. The browser attaches the cookie because the cookie belongs to the *destination*, not the page that triggered the request. The server sees an authenticated request.',
      '',
      'Note the attacker never reads the response — the same-origin policy still blocks that. They do not need to. The side effect already happened.',
      '',
      '### The controls, in order of strength',
      '1. **`SameSite=Lax`** — now the browser default. Cookies are withheld on cross-site POSTs, which removes the classic form attack. `Lax` still sends on top-level GET navigations, so **any state-changing GET remains exposed**.',
      '2. **`SameSite=Strict`** — also withholds on inbound navigation, which breaks "click the email link and stay logged in".',
      '3. **Anti-CSRF token** — server issues a random token, embeds it in the form or a header; the attacker cannot read it cross-origin. Still the correct answer when cookies must be `SameSite=None` (cross-site widgets, some SSO flows).',
      '4. **`Authorization: Bearer` headers** — not attached automatically, so classic CSRF does not apply. This trades CSRF risk for XSS risk, since the token must live somewhere script can reach.',
    ],
    keyPoints: [
      'CSRF exploits ambient credentials — cookies sent automatically by destination.',
      'SameSite=Lax is the modern default and kills the classic form POST attack.',
      'State-changing GET endpoints stay vulnerable even under Lax. Never mutate on GET.',
      'Token auth in a header is not CSRF-able, but relocates the risk to XSS.',
    ],
    interview:
      'Explain why CORS does not help: the request is sent and executed regardless; CORS only governs whether the attacker may read the reply, and they do not need to.',
    pitfalls: [
      'Assuming SameSite=Lax is total protection while still exposing GET mutations.',
      'Adding a CSRF token but not verifying it server-side on every state-changing route.',
    ],
    resources: [
      { label: 'OWASP CSRF Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html', kind: 'docs' },
      { label: 'MDN — SameSite cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Your app authenticates with an Authorization: Bearer header from memory. What is the residual risk profile?',
        options: ['CSRF high, XSS low', 'CSRF low, XSS high', 'Both high', 'Both eliminated'],
        correct: 1,
        explanation:
          'Bearer headers are not attached automatically, so CSRF largely goes away. But the token must be reachable by script, so any XSS steals it. You chose which risk to carry.',
      },
    ],
  },

  {
    id: 'rd-sec-cors',
    area: 'Security',
    group: 'Session',
    title: 'CORS — a relaxation of the same-origin policy, not a firewall',
    status: 'covered',
    minutes: 8,
    summary:
      'CORS is the server telling the browser it is acceptable for a named origin to read this response. It protects users from having their data read by other sites; it does not protect your server from anything.',
    body: [
      '### What it actually does',
      'By default the browser will send a cross-origin request but refuse to let JavaScript read the response. CORS headers on the *response* tell the browser to lift that refusal. The enforcement point is the **browser**, which is why curl and Postman never see CORS errors.',
      '',
      '### Simple vs preflighted',
      'A request is "simple" (no preflight) when it is GET/HEAD/POST, with only safelisted headers, and a content type of `text/plain`, `multipart/form-data` or `application/x-www-form-urlencoded`.',
      '',
      'Anything else — `application/json`, a custom header, PUT/DELETE — triggers an `OPTIONS` **preflight** first. The server must answer with `Access-Control-Allow-Methods` and `-Allow-Headers`. This is the single most common cause of "it works in Postman but not the browser".',
      '',
      '### Credentials change the rules',
      'With `credentials: "include"`, the server must send `Access-Control-Allow-Credentials: true` **and** an explicit origin — `Access-Control-Allow-Origin: *` is rejected. This is deliberate: wildcard plus credentials would let any site read authenticated responses.',
      '',
      '### Performance note',
      '`Access-Control-Max-Age` caches the preflight. Without it, a chatty API pays an extra round trip per request.',
    ],
    keyPoints: [
      'CORS is enforced by the browser and protects the user, not the server.',
      'JSON content type alone forces a preflight OPTIONS request.',
      'Wildcard origin is incompatible with credentialed requests, by design.',
      'A CORS error means the response was received and then withheld from your code.',
    ],
    interview:
      'Say who is being protected. CORS stops evil.com from reading a logged-in user\'s response from your API. Your server still needs its own authn/authz — CORS is not access control.',
    pitfalls: [
      'Reflecting the Origin header back unconditionally — that is a wildcard with extra steps.',
      'Reading a CORS-blocked response\'s status. Opaque failures give you nothing.',
    ],
    resources: [
      { label: 'MDN — CORS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Your fetch with Content-Type: application/json fails CORS, but the same call works in Postman. Why?',
        options: ['Postman ignores HTTPS', 'JSON content type triggers a preflight the server does not answer', 'Postman uses HTTP/2', 'The server is down'],
        correct: 1,
        explanation:
          'application/json is not a safelisted content type, so the browser sends an OPTIONS preflight first. Postman is not a browser and enforces no same-origin policy, so it never preflights.',
      },
    ],
  },

  {
    id: 'rd-sec-headers',
    area: 'Security',
    group: 'Policy',
    title: 'Security headers — CSP, HSTS, and the rest of the response-header budget',
    status: 'covered',
    minutes: 9,
    summary:
      'A short list of response headers converts whole vulnerability classes from exploitable to inert. Knowing which header stops which attack is a standard interview exchange.',
    body: [
      '### Content-Security-Policy — the big one',
      'CSP is an allowlist of where resources may load from and whether inline script may run. A strict CSP turns most XSS from execution into a console error.',
      '',
      'The modern form is **nonce or hash based**, not host based: host allowlists are routinely bypassed via JSONP endpoints on allowed CDNs.',
      '',
      '```',
      "Content-Security-Policy: default-src 'self'; script-src 'nonce-r4nd0m' 'strict-dynamic'; object-src 'none'; base-uri 'none'",
      '```',
      '',
      '`strict-dynamic` lets a trusted (nonced) script load further scripts, which is what makes bundlers workable under CSP.',
      '',
      '### The others, and what each one stops',
      '| Header | Stops |',
      '| --- | --- |',
      '| `Strict-Transport-Security` | Protocol downgrade / SSL stripping |',
      '| `X-Content-Type-Options: nosniff` | MIME sniffing a .txt into a script |',
      '| `Referrer-Policy` | Leaking full URLs (with tokens) to third parties |',
      '| `Permissions-Policy` | Camera/mic/geolocation access, including in iframes |',
      '| `Cross-Origin-Opener-Policy` | Cross-window scripting attacks; enables crossOriginIsolated |',
      '| `Cross-Origin-Resource-Policy` | Your assets being embedded by other sites |',
      '',
      '### Rollout without breakage',
      'Ship `Content-Security-Policy-Report-Only` first, collect violation reports, then enforce. Going straight to enforcement on a real app breaks it.',
    ],
    keyPoints: [
      'CSP is the only header that meaningfully mitigates XSS after it has been introduced.',
      'Prefer nonce + strict-dynamic over host allowlists.',
      'HSTS must be served over HTTPS to be honoured, and preloading is hard to undo.',
      'Report-Only mode exists so you can deploy CSP to a live app without an outage.',
    ],
    interview:
      'Be ready to map header → attack in one pass. The follow-up is usually "how would you roll CSP out on an app you did not write", and the answer is Report-Only plus violation reporting.',
    pitfalls: [
      "Adding 'unsafe-inline' to make CSP work, which removes the reason for having it.",
      'X-XSS-Protection — obsolete and removed from browsers. Naming it dates you.',
    ],
    resources: [
      { label: 'MDN — CSP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP', kind: 'docs' },
      { label: 'securityheaders.com', url: 'https://securityheaders.com/', kind: 'practice' },
    ],
    conceptDuel: [
      {
        q: "A strict CSP is deployed but includes 'unsafe-inline' in script-src. What have you achieved?",
        options: ['Full XSS protection', 'Almost nothing against XSS', 'Protection only for stored XSS', 'Clickjacking protection'],
        correct: 1,
        explanation:
          "'unsafe-inline' permits exactly the inline script injection that XSS relies on. The policy still restricts external origins, but the main benefit is gone. Use a nonce instead.",
      },
    ],
  },

  {
    id: 'rd-sec-iframe',
    area: 'Security',
    group: 'Policy',
    title: 'Clickjacking and iframe protection — frame-ancestors, sandbox, postMessage',
    status: 'covered',
    minutes: 7,
    summary:
      'Clickjacking overlays your real UI, invisibly, on the attacker\'s page and harvests genuine clicks. The fix is refusing to be framed; the related job is safely embedding untrusted content yourself.',
    body: [
      '### Being framed — the attack',
      'The attacker loads your page in a transparent iframe positioned under an innocuous button. The user clicks "Play video" and actually clicks "Delete account" in your app, with their real session.',
      '',
      '### Refusing to be framed',
      '`Content-Security-Policy: frame-ancestors \'none\'` is the current control. `X-Frame-Options: DENY` is the legacy header — still worth sending for old agents, but `frame-ancestors` supersedes it and wins where both exist.',
      '',
      '### Framing others — the sandbox',
      'When you embed untrusted content, `sandbox` removes capabilities and you add back only what is needed:',
      '',
      '```html',
      '<iframe sandbox="allow-scripts" src="https://untrusted.example"></iframe>',
      '```',
      '',
      '**The trap:** `sandbox="allow-scripts allow-same-origin"` on same-origin content re-grants enough for the frame to remove its own sandbox attribute. Never combine those two for content you do not control.',
      '',
      '### Talking across the boundary',
      '`postMessage` is the sanctioned channel, and both ends must be strict:',
      '- Sender: pass an explicit `targetOrigin`, never `"*"`.',
      '- Receiver: check `event.origin` against an allowlist **before** touching `event.data`.',
      '',
      'A missing `event.origin` check is a textbook DOM-XSS source.',
    ],
    code: `window.addEventListener('message', (e) => {
  if (e.origin !== 'https://trusted-partner.example') return;  // FIRST line, always
  const data = JSON.parse(e.data);
  render(data);
});`,
    keyPoints: [
      "CSP frame-ancestors is the modern anti-framing control; X-Frame-Options is legacy.",
      'allow-scripts + allow-same-origin together defeats the sandbox.',
      'Always validate event.origin before reading postMessage data.',
      'Never send postMessage with targetOrigin "*" if the payload is sensitive.',
    ],
    interview:
      'Two directions get asked: stopping others framing you (frame-ancestors) and safely framing others (sandbox + postMessage origin checks). Prepare both.',
    pitfalls: [
      'Frame-busting with JavaScript. It is bypassable and was replaced by headers.',
      'Trusting event.source instead of event.origin.',
    ],
    resources: [
      { label: 'MDN — frame-ancestors', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors', kind: 'docs' },
      { label: 'MDN — iframe sandbox', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox', kind: 'docs' },
    ],
  },
];
