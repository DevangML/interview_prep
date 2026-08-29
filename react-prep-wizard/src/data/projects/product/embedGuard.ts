import type { ProjectBlueprint } from '../types';

/**
 * The security project.
 *
 * Security cannot be taught by a build that renders trusted local data — there
 * is nothing to defend. This one is deliberately shaped so every control has an
 * attacker: a widget that renders strangers' HTML, embeds on sites you do not
 * own, holds a session, and fetches URLs those strangers supply.
 */
export const embedGuardBlueprint: ProjectBlueprint = {
  id: 'product-embed-guard',
  title: 'Embed Guard',
  tagline: 'An embeddable comment widget, attacked first and defended second.',
  realWorldAnalog: 'Disqus, Intercom, or any third-party widget that renders user HTML inside someone else\'s page.',
  track: 'product',
  tier: 'flagship',
  difficulty: 'Senior',
  estimatedBuildTimeHours: 18,
  architecturePattern: 'Sandboxed embed with a hardened BFF',
  summary:
    'A comment widget that other sites embed. Every stage begins with a working exploit you write yourself, then the control that closes it. You will land XSS through four different sinks, steal your own session, frame your own UI, and reach your own metadata endpoint — then write the CSP, the sanitizer, the sandbox and the SSRF guard that stop each one.',
  tags: ['security', 'XSS', 'CSP', 'CSRF', 'SSRF', 'iframe', 'auth'],
  xpBounty: 1200,
  prerequisites: ['basic-controlled-form'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A widget rendering untrusted comment HTML',
      'A written exploit for each control, committed alongside the fix',
      'CSP with nonce and strict-dynamic, plus the full header set',
      'Embed harness: sandboxed iframe with origin-checked postMessage',
      'Session handling with the token-storage tradeoff written down',
      'A link-preview BFF endpoint hardened against SSRF',
    ],
    outOfScopeBloat: [
      'A real user database — a fixture identity provider is enough',
      'Styling beyond legibility',
      'Moderation features, threading, notifications',
      'Penetration testing tools; every exploit here is hand-written and understood',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Land XSS four ways',
      focus: 'Prove that JSX escaping is not immunity.',
      codeSnippet: `<a href={comment.authorUrl}>author</a>          // javascript:alert(document.cookie)
<div dangerouslySetInnerHTML={{ __html: body }} />
<Comment {...untrustedProps} />                   // can inject dangerouslySetInnerHTML
ref.current.innerHTML = body;                     // bypasses React entirely`,
      failureModeOrInvariant:
        'All four execute. The text child — the one thing people cite as proof React is safe — is the only one that does not. Commit each payload as a failing test.',
      architecturalLesson:
        'JSX escapes text children. Everything else — URL schemes, spread props, innerHTML, direct DOM writes — is yours to defend. Knowing the exact boundary is the difference between a slogan and a threat model.',
    },
    {
      stageNumber: 2,
      stageName: 'Allow some HTML anyway',
      focus: 'Allowlist sanitization at the sink, and URL scheme validation.',
      codeSnippet: `const clean = DOMPurify.sanitize(body, {
  ALLOWED_TAGS: ['b','i','em','strong','a','p','ul','ol','li','code'],
  ALLOWED_ATTR: ['href','title'],
});`,
      failureModeOrInvariant:
        'Write a blocklist first and defeat it with onerror, SVG and mixed-case javascript:. Then allowlist and watch the same payloads become inert text. Sanitize per sink — the same string is safe as text and dangerous in an href.',
      architecturalLesson:
        'Validation is a business rule at the input; sanitization is a safety rule at each output. Conflating them produces apps that are both annoying and unsafe.',
    },
    {
      stageNumber: 3,
      stageName: 'Lock the origin',
      focus: 'CSP with nonce and strict-dynamic, plus the supporting headers and SRI.',
      codeSnippet: `Content-Security-Policy: default-src 'self'; script-src 'nonce-{r}' 'strict-dynamic';
  object-src 'none'; base-uri 'none'; frame-ancestors 'none'`,
      failureModeOrInvariant:
        "Ship with 'unsafe-inline' first and confirm the stage-1 payloads still fire. Remove it and they become console errors. Deploy the real policy in Report-Only, collect violations, then enforce.",
      architecturalLesson:
        'CSP is the only control that mitigates XSS you failed to prevent. A host allowlist is bypassable; a nonce with strict-dynamic is what actually holds while still letting a bundler work.',
    },
    {
      stageNumber: 4,
      stageName: 'Embed, and be embedded',
      focus: 'Sandbox attributes, postMessage origin checks, frame-ancestors, Permissions-Policy.',
      codeSnippet: `window.addEventListener('message', (e) => {
  if (e.origin !== EXPECTED_ORIGIN) return;   // FIRST line, always
  apply(JSON.parse(e.data));
});`,
      failureModeOrInvariant:
        'Build a clickjacking page that overlays your delete control, and land a real click. Then set frame-ancestors. Separately, prove that sandbox="allow-scripts allow-same-origin" lets the frame strip its own sandbox.',
      architecturalLesson:
        'Two directions, two controls: refuse framing with frame-ancestors, and constrain what you frame with sandbox plus a strict origin check. A missing event.origin check is a textbook DOM-XSS source.',
    },
    {
      stageNumber: 5,
      stageName: 'Hold a session you can defend',
      focus: 'Token placement, CSRF posture, CORS with credentials, object-level authorization.',
      codeSnippet: `// access token: memory only, 10 min
// refresh token: HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh — rotated, single use`,
      failureModeOrInvariant:
        'Put the token in localStorage and steal it with the stage-1 payload you already wrote. Then delete a comment you do not own by changing the id in the URL — the route is authenticated, the object is not authorized.',
      architecturalLesson:
        'Every storage choice trades XSS exposure against CSRF exposure; name the trade rather than reciting a default. And authorize the object, not the route — that is the flaw that keeps winning.',
    },
    {
      stageNumber: 6,
      stageName: 'Fetch a URL a stranger gave you',
      focus: 'Link previews, SSRF, and the dependency surface.',
      codeSnippet: `// Resolve DNS FIRST, reject private ranges, then connect.
// Redirects are re-validated per hop — attackers redirect public -> internal.`,
      failureModeOrInvariant:
        'Post a comment linking to 169.254.169.254 and watch your own preview service fetch cloud metadata. Then defeat a naive string allowlist with a public host that 302s to an internal one.',
      architecturalLesson:
        'SSRF weaponizes your server\'s network position, and the feature that opens it — link previews, avatar-by-URL — is always requested by the frontend. Validate after resolution, and re-validate every redirect hop.',
    },
  ],
  deliverables: [
    { id: 'Threat model', title: 'Threat model', spec: 'One page: the origin boundary, what runs inside it, and the ranked risks with blast radius stated.' },
    { id: 'Exploit suite', title: 'Exploit suite', spec: 'A committed test per control that FAILS before the fix and passes after — four XSS sinks, a clickjack, a token theft, a BOLA and an SSRF.' },
    { id: 'Sanitizer', title: 'Sanitizer configuration', spec: 'Allowlist tags and attributes, plus a URL-scheme validator applied at every href and src.' },
    { id: 'Header set', title: 'CSP and header set', spec: 'Nonce-based CSP with strict-dynamic, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP and CORP — each annotated with the attack it stops.' },
    { id: 'Embed harness', title: 'Embed harness', spec: 'A sandboxed iframe embed with a strict postMessage protocol, origin-checked on both ends, and a documented capability list.' },
    { id: 'Auth flow', title: 'Session flow', spec: 'Memory access token, rotated HttpOnly refresh cookie, credentialed CORS with an explicit origin, and the tradeoff written down.' },
    { id: 'Preview service', title: 'Hardened preview service', spec: 'Scheme and host allowlist, post-resolution private-range rejection, per-hop redirect validation, timeout and response size cap.' },
    { id: 'Supply chain report', title: 'Supply chain report', spec: 'SRI on every external asset, a lockfile, install scripts disabled in CI, and audit findings triaged by reachability rather than count.' },
    { id: 'Compliance note', title: 'Consent and retention note', spec: 'What is stored client-side, under what consent, and how a deletion request is actually satisfied.' },
  ],
  layers: [
    { layer: 'Render', components: ['CommentBody', 'sanitize', 'safeHref'], invariants: ['No untrusted string reaches a sink unsanitized', 'Every URL scheme is allowlisted'] },
    { layer: 'Embed', components: ['host.js', 'frame.tsx', 'protocol'], invariants: ['event.origin checked before event.data is read', 'targetOrigin is never "*"'] },
    { layer: 'Session', components: ['authClient', 'refreshRotation', 'guards'], invariants: ['Access token never touches persistent storage', 'Every mutation authorizes the object'] },
    { layer: 'BFF', components: ['previewFetch', 'ipGuard', 'redirectPolicy'], invariants: ['Validation happens after DNS resolution', 'Every redirect hop is re-validated'] },
  ],
  explicitTopics: [
    { category: 'Security', topic: 'Model', subtopic: 'Origin and blast radius', howCovered: 'The threat model ranks risks by what an attacker gains inside the origin.', conceptIds: ['rd-sec-overview'] },
    { category: 'Security', topic: 'Injection', subtopic: 'XSS across four sinks', howCovered: 'Each sink is exploited with a committed payload before it is closed.', conceptIds: ['rd-sec-xss'] },
    { category: 'Security', topic: 'Injection', subtopic: 'Sanitization', howCovered: 'Blocklist defeated, then allowlist adopted, applied per sink.', conceptIds: ['rd-sec-sanitization'] },
    { category: 'Security', topic: 'Policy', subtopic: 'CSP and headers', howCovered: 'Nonce-based CSP rolled out Report-Only first; every header annotated with its attack.', conceptIds: ['rd-sec-headers'] },
    { category: 'Security', topic: 'Policy', subtopic: 'Framing', howCovered: 'A working clickjack is built, then frame-ancestors and sandbox close it.', conceptIds: ['rd-sec-iframe'] },
    { category: 'Security', topic: 'Policy', subtopic: 'Permissions-Policy', howCovered: 'The embed is denied camera, microphone, geolocation and payment by default.', conceptIds: ['rd-sec-permissions-policy'] },
    { category: 'Security', topic: 'Session', subtopic: 'Authentication', howCovered: 'Token placement chosen after stealing it from localStorage with the project\'s own payload.', conceptIds: ['rd-sec-authentication'] },
    { category: 'Security', topic: 'Session', subtopic: 'Authorization', howCovered: 'A BOLA is exploited by changing an id, then closed by authorizing the object.', conceptIds: ['rd-sec-authorization'] },
    { category: 'Security', topic: 'Session', subtopic: 'CSRF', howCovered: 'A cross-site form POST succeeds, then SameSite and a token stop it.', conceptIds: ['rd-sec-csrf'] },
    { category: 'Security', topic: 'Session', subtopic: 'CORS with credentials', howCovered: 'Credentialed CORS is configured with an explicit origin, and the wildcard rejection is demonstrated.', conceptIds: ['rd-sec-cors'] },
    { category: 'Security', topic: 'Transport', subtopic: 'HTTPS and HSTS', howCovered: 'HSTS is set, mixed content is triggered and observed, and the padlock fallacy is stated.', conceptIds: ['rd-sec-https'] },
    { category: 'Security', topic: 'Server-adjacent', subtopic: 'SSRF', howCovered: 'The preview service reaches the metadata endpoint before the guard is written.', conceptIds: ['rd-sec-ssrf-ssji'] },
    { category: 'Security', topic: 'Supply chain', subtopic: 'SRI and dependencies', howCovered: 'SRI pinned on external assets; audit findings triaged by reachability.', conceptIds: ['rd-sec-sri-deps'] },
    { category: 'Security', topic: 'Client state', subtopic: 'Storage and compliance', howCovered: 'What may be stored is decided by disclosure harm and consent, and written down.', conceptIds: ['rd-sec-client-storage', 'web-storage'] },
    { category: 'Security', topic: 'Transport', subtopic: 'Headers as the delivery mechanism', howCovered: 'Every control in stages 3 and 4 is shipped as a response header, so the HTTP layer is the enforcement point.', conceptIds: ['web-http'] },
    { category: 'Security', topic: 'Session', subtopic: 'The form as attack surface', howCovered: 'The comment form is the CSRF target; its method, action and credential behaviour are what the exploit uses.', conceptIds: ['html-forms'] },
  ],
  implicitFoundations: [
    { domain: 'Security & Invariants', title: 'The same-origin policy', mechanism: 'Reads are blocked across origins while sends are not, which is why CSRF and CORS are unrelated problems.', realWorldImpact: 'Explains why a CORS allowlist gives no CSRF protection.', conceptIds: ['web-cors', 'web-security'] },
    { domain: 'DOM & Browser Pipeline', title: 'Sinks are contextual', mechanism: 'The parser treats the same bytes differently as text, attribute, URL or markup.', realWorldImpact: 'One sanitize call at input cannot be correct for every destination.', conceptIds: ['js-dom-events'] },
    { domain: 'Internet & Protocols', title: 'Where controls are enforced', mechanism: 'TLS, headers and the request lifecycle sit between the attacker and the origin, so the browser is the enforcement point for most of these controls.', realWorldImpact: 'Explains why curl never sees a CORS error and why a header-only fix can be complete.', conceptIds: ['rd-fe-internet-browser'] },
    { domain: 'Tooling & Build', title: 'Nonces need a build hook', mechanism: 'A per-response nonce must reach every inline script the bundler emits.', realWorldImpact: 'CSP adoption is usually blocked by the build, not by the policy.', conceptIds: ['tooling-bundlers'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['JSX escaping of text children', 'DOMPurify parsing and allowlisting', 'Browser enforcement of CSP, SameSite and sandbox'],
    manualEngineeringRequired: [
      'Every exploit, written first so the control has a witness',
      'URL scheme validation, which no framework does for you',
      'The postMessage protocol and its origin checks',
      'Post-resolution SSRF validation including redirect hops',
    ],
  },
};
