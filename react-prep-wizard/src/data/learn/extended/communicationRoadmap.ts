import type { LearnTopic } from '../types';

/**
 * Transports and API styles.
 *
 * The system-design round rarely asks "what is a WebSocket". It asks you to
 * pick one for a stated workload and say what breaks. Each topic therefore ends
 * in a selection rule rather than a definition.
 */
export const communicationRoadmapTopics: LearnTopic[] = [
  {
    id: 'rd-comm-protocols',
    area: 'Web Platform',
    group: 'Transport',
    title: 'HTTP/1.1 → HTTP/2 → HTTP/3, and what each fixed',
    status: 'covered',
    minutes: 8,
    summary:
      'Three generations, each removing one bottleneck. Knowing which problem each solved tells you when an optimisation from 2015 is now actively harmful.',
    body: [
      '### HTTP/1.1 — the connection limit',
      'One request per connection at a time, ~6 connections per origin. Everything queued behind that. The era\'s workarounds — **sprite sheets, domain sharding, file concatenation** — existed purely to dodge it.',
      '',
      '### HTTP/2 — multiplexing',
      'Many streams over one TCP connection, plus binary framing and HPACK header compression. The 1.1 workarounds became **counterproductive**: sharding forces extra connections and defeats multiplexing; one giant bundle defeats caching granularity.',
      '',
      'Residual flaw: **TCP head-of-line blocking**. One lost packet stalls every stream, because TCP guarantees ordered delivery beneath them.',
      '',
      '### HTTP/3 — QUIC over UDP',
      'Rebuilds streams on UDP so loss on one stream does not stall the others. TLS 1.3 is integrated, giving a ~1-RTT (often 0-RTT) handshake. Biggest wins on lossy mobile networks, and connection migration survives a Wi-Fi-to-cellular switch.',
      '',
      '### The interview move',
      'Say which optimisation is now an anti-pattern and why. "We removed domain sharding after moving to HTTP/2 because it was forcing extra connections" is a concrete, senior-sounding sentence.',
    ],
    keyPoints: [
      'HTTP/2 multiplexes streams over one connection; sharding and concatenation became harmful.',
      'HTTP/2 still suffers TCP head-of-line blocking; HTTP/3 fixes it via QUIC on UDP.',
      'HTTP/3 folds in TLS 1.3 and survives network changes through connection migration.',
    ],
    interview:
      'Asked to optimise a slow page, ask which HTTP version is in play first — the correct advice inverts between 1.1 and 2.',
    resources: [
      { label: 'MDN — Evolution of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Your app moved to HTTP/2 but still shards assets across 4 subdomains. Effect?',
        options: ['Faster, more parallelism', 'Slower — extra connections defeat multiplexing', 'No change', 'Better caching'],
        correct: 1,
        explanation:
          'Sharding existed to beat the HTTP/1.1 six-connection limit. Under HTTP/2 one connection multiplexes everything, so sharding just adds DNS lookups, TLS handshakes and connection overhead.',
      },
    ],
  },

  {
    id: 'rd-comm-rest',
    area: 'Data & APIs',
    group: 'API styles',
    title: 'REST — resources, idempotency and the parts people skip',
    status: 'covered',
    minutes: 8,
    summary:
      'REST is a set of constraints, not a URL naming convention. The parts that matter at 3 YOE are method semantics, idempotency and status-code honesty.',
    body: [
      '### Method semantics you will be asked to defend',
      '| Method | Safe | Idempotent | Meaning |',
      '| --- | --- | --- | --- |',
      '| GET | yes | yes | never mutates — caches and prefetchers will replay it |',
      '| POST | no | **no** | create / arbitrary action |',
      '| PUT | no | yes | full replace at a known id |',
      '| PATCH | no | no* | partial update |',
      '| DELETE | no | yes | second call still leaves it absent |',
      '',
      '**Idempotent** means repeating the call leaves the same state — not that it returns the same response. It is what makes retries safe, which is why it matters far beyond trivia.',
      '',
      '### Idempotency keys',
      'POST is not idempotent, but payments must not double-charge on a retry. The client generates a UUID and sends `Idempotency-Key`; the server stores the outcome against it and replays the original response. Stripe popularised this and interviewers like it.',
      '',
      '### Status codes that carry information',
      '`201` with a `Location` header · `202` accepted but not finished · `400` malformed vs `422` well-formed but semantically wrong · `401` unauthenticated vs `403` authenticated-but-forbidden · `409` conflict · `429` with `Retry-After`.',
      '',
      '### The failure mode to name',
      '**Over- and under-fetching.** A screen needs three fields and pulls a fifty-field object; or it needs data from three resources and makes three sequential round trips. This is the exact gap GraphQL and BFFs were built to close.',
    ],
    keyPoints: [
      'Idempotent = repeating leaves the same state; it is what licenses automatic retries.',
      'Idempotency keys make POST safely retryable.',
      '401 is who-are-you; 403 is I-know-and-no.',
      'Never mutate on GET — prefetchers and caches will fire it.',
    ],
    interview:
      'Be ready for "how do you stop a double charge on a flaky network". The answer is an idempotency key plus server-side dedupe, not a disabled button.',
    pitfalls: [
      'Returning 200 with an error body. Clients and monitoring both believe the 200.',
      'Treating PATCH as idempotent by default — it depends on the patch semantics.',
    ],
    resources: [
      { label: 'MDN — HTTP request methods', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods', kind: 'docs' },
    ],
  },

  {
    id: 'rd-comm-graphql',
    area: 'Data & APIs',
    group: 'API styles',
    title: 'GraphQL — one round trip, and the costs you inherit',
    status: 'covered',
    minutes: 8,
    summary:
      'A typed schema and client-specified queries remove over-fetching and waterfalls. In exchange you give up HTTP caching, gain an N+1 problem and must bound query cost yourself.',
    body: [
      '### What it buys',
      '- **Exact shape** — the client names the fields; no over-fetch.',
      '- **One round trip** for a screen that REST would need four calls to fill.',
      '- **A typed schema** as a live contract, with real tooling.',
      '',
      '### What it costs — say these, they are the follow-ups',
      '1. **HTTP caching is gone.** Everything is a POST to `/graphql`, so CDNs and browser caches cannot help. You replace it with a normalized client cache (Apollo, urql, Relay) and persisted queries.',
      '2. **N+1 on the server.** `posts { author { name } }` becomes one query for posts and one per author. **DataLoader** batches within a tick — this is the standard answer.',
      '3. **Unbounded cost.** A deeply nested query can be a denial of service. You need depth limiting, complexity scoring and persisted-query allowlists.',
      '4. **Errors are 200.** Partial failure arrives as `errors` alongside `data`, so naive HTTP monitoring reports perfect health during an incident.',
      '',
      '### Choosing it',
      'GraphQL earns its keep with many heterogeneous clients and deeply nested, varying data. For a single frontend with stable screens, REST plus a BFF is usually less machinery for the same result.',
    ],
    keyPoints: [
      'Client-specified fields kill over-fetching and request waterfalls.',
      'You lose HTTP-layer caching and rebuild it in the client and via persisted queries.',
      'DataLoader batching is the standard N+1 answer.',
      'A 200 can contain errors — monitor the errors array, not just the status.',
    ],
    interview:
      'Never pitch GraphQL as strictly better. Name the caching loss and the complexity-limiting requirement unprompted; that is what distinguishes use from reading.',
    pitfalls: [
      'Exposing the schema publicly with introspection on and no depth limit.',
      'Assuming the client cache normalizes correctly without stable ids.',
    ],
    resources: [
      { label: 'GraphQL — Learn', url: 'https://graphql.org/learn/', kind: 'docs' },
      { label: 'DataLoader', url: 'https://github.com/graphql/dataloader', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Biggest operational loss when moving REST → GraphQL?',
        options: ['Type safety', 'HTTP/CDN caching', 'Authentication', 'Compression'],
        correct: 1,
        explanation:
          'Uniform POSTs to a single endpoint make responses opaque to HTTP caches and CDNs. You rebuild caching in the client and via persisted queries.',
      },
    ],
  },

  {
    id: 'rd-comm-grpc',
    area: 'Data & APIs',
    group: 'API styles',
    title: 'gRPC and gRPC-Web — binary contracts, and the browser caveat',
    status: 'covered',
    minutes: 6,
    summary:
      'Protobuf over HTTP/2 with generated clients and streaming. Browsers cannot speak native gRPC, so the frontend answer is always gRPC-Web plus a proxy — and knowing that is the point of the question.',
    body: [
      '### The model',
      'You define the service in a `.proto` file; codegen produces typed clients and servers in every language. The wire format is **Protobuf** — binary, compact, and schema-driven rather than self-describing like JSON.',
      '',
      'Four call types: unary, server-streaming, client-streaming, bidirectional.',
      '',
      '### The browser caveat — the actual interview answer',
      'Native gRPC needs control over HTTP/2 frames and trailers, which browsers do not expose. So the browser uses **gRPC-Web**, and a proxy (Envoy, or a framework like Connect) translates to real gRPC behind it. Practically that means **no client-streaming or bidirectional streaming** from a browser; server-streaming works.',
      '',
      '### When it fits frontend work',
      'Mostly service-to-service and BFF-to-backend. A React app talks to a BFF over REST or GraphQL, and the BFF speaks gRPC internally. Direct browser gRPC-Web appears in strongly typed internal tooling.',
      '',
      '### The honest trade',
      'You gain a strict cross-language contract, small payloads and fast codecs. You lose human-readable traffic — devtools shows bytes, so you need reflection tooling to debug.',
    ],
    keyPoints: [
      'Protobuf is schema-driven binary; the schema is mandatory to decode.',
      'Browsers cannot do native gRPC — gRPC-Web plus a proxy is required.',
      'No bidirectional or client streaming from the browser.',
      'Debuggability is the real cost: traffic is not human-readable.',
    ],
    interview:
      'If asked "would you use gRPC in your React app", the strong answer names the proxy requirement and the streaming limitation, then puts gRPC behind a BFF.',
    resources: [
      { label: 'gRPC-Web', url: 'https://github.com/grpc/grpc-web', kind: 'docs' },
    ],
  },

  {
    id: 'rd-comm-polling',
    area: 'Data & APIs',
    group: 'Realtime',
    title: 'Short polling vs long polling — the two cheapest ways to look live',
    status: 'covered',
    minutes: 7,
    summary:
      'Short polling asks on a timer. Long polling asks once and the server holds the request until it has something. Both are plain HTTP, which is exactly why they still win in hostile network environments.',
    body: [
      '### Short polling',
      '`setInterval` → request → response, usually empty. Trivial to build, works everywhere, caches and load-balances normally.',
      '',
      'Costs: latency is up to one full interval; most requests return nothing; N clients × interval is a fixed load floor regardless of activity.',
      '',
      '**Do it right:** never `setInterval` a network call — a slow response overlaps the next. Chain from the *completion*, add jitter so clients do not synchronise into a thundering herd, and back off when the tab is hidden (`document.visibilityState`).',
      '',
      '### Long polling',
      'The client requests; the server **holds the connection open** until data appears or a timeout (~30s) fires; the client immediately reconnects. Near-real-time delivery over ordinary HTTP.',
      '',
      'Costs: a held connection per client consumes a server slot — fine for event-driven servers, expensive for thread-per-request ones. Proxies and load balancers may kill idle connections, so timeouts must sit under theirs.',
      '',
      '### Choosing',
      'Short polling: low update rate, staleness is acceptable, simplicity wins — order status, dashboards on a 30s refresh.',
      'Long polling: near-real-time needed, but WebSockets are blocked by corporate proxies or the infrastructure cannot hold sockets.',
    ],
    code: `// Self-chaining poll: no overlap, jittered, pauses when hidden.
async function poll(signal: AbortSignal) {
  while (!signal.aborted) {
    if (document.visibilityState === 'visible') {
      try { render(await (await fetch('/api/status', { signal })).json()); }
      catch { /* keep the loop alive; back off below */ }
    }
    await new Promise((r) => setTimeout(r, 5000 + Math.random() * 1000));
  }
}`,
    keyPoints: [
      'Never setInterval a fetch — chain the next call from the previous completion.',
      'Add jitter or every client polls on the same second after a deploy.',
      'Long polling holds a server connection per client; size for that.',
      'Long-poll timeout must be shorter than the proxy idle timeout.',
    ],
    interview:
      '"Why not just WebSockets?" — because polling survives proxies, needs no sticky sessions, reuses your auth and caching, and for a low update rate it costs less to run and far less to operate.',
    resources: [
      { label: 'MDN — Page Visibility API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'Why is setInterval(fetchStatus, 1000) a bug rather than a style choice?',
        options: ['setInterval is deprecated', 'Requests overlap and pile up when responses are slower than the interval', 'It cannot be cleared', 'It blocks the main thread'],
        correct: 1,
        explanation:
          'setInterval fires on a fixed schedule regardless of whether the previous request finished. Under latency the requests overlap, responses arrive out of order, and load grows. Chain from completion instead.',
      },
    ],
  },

  {
    id: 'rd-comm-websocket-sse',
    area: 'Data & APIs',
    group: 'Realtime',
    title: 'WebSockets vs Server-Sent Events — pick by direction, not by fashion',
    status: 'covered',
    minutes: 9,
    summary:
      'WebSockets give a full-duplex binary-capable channel and cost you HTTP semantics. SSE gives one-way server→client text with automatic reconnection for almost no operational effort. Most "realtime" features only need SSE.',
    body: [
      '### WebSocket',
      'Starts as HTTP, then `Upgrade: websocket` switches protocol. After that it is a persistent bidirectional frame-based channel over one TCP connection.',
      '',
      'What you now own yourself: **reconnection with backoff**, heartbeat/ping to detect dead connections, message ordering and replay after a gap, authentication (the handshake cannot carry custom headers from the browser — use a ticket in the query string or an auth message), and sticky sessions or a pub/sub backplane like Redis so any server can reach any client.',
      '',
      '### Server-Sent Events',
      '`EventSource` over ordinary HTTP. One direction, UTF-8 text, and the browser handles reconnection **for you**, resuming with `Last-Event-ID` so the server can replay what was missed.',
      '',
      'Limits: server→client only (the client sends via normal HTTP requests, which is fine), text only, and a per-origin connection cap that is painful on HTTP/1.1 but effectively gone over HTTP/2.',
      '',
      '### The selection rule',
      '| Need | Use |',
      '| --- | --- |',
      '| Notifications, live prices, progress, log tail, LLM token streaming | **SSE** |',
      '| Chat, collaborative editing, multiplayer, anything client→server at high rate | **WebSocket** |',
      '| Blocked by proxies, or low update rate | **Long polling** |',
      '| Peer-to-peer media or lowest possible latency | **WebRTC** |',
      '',
      'Choosing SSE for a notification feed and saying "because I get reconnection and replay for free, and I do not need a socket to send upward" is a strong, senior answer.',
    ],
    code: `const es = new EventSource('/api/stream');
es.addEventListener('price', (e) => update(JSON.parse(e.data)));
// Reconnection and Last-Event-ID resume are handled by the browser.
es.onerror = () => { /* already retrying; only give up deliberately */ };`,
    keyPoints: [
      'SSE gives automatic reconnection and Last-Event-ID replay; WebSocket gives you neither.',
      'WebSocket auth cannot use custom headers from the browser — use a short-lived ticket.',
      'WebSockets need sticky sessions or a pub/sub backplane to scale horizontally.',
      'Streaming LLM tokens is the canonical modern SSE use case.',
    ],
    interview:
      'The differentiator is naming what WebSockets make *you* responsible for. Anyone can say "bidirectional"; few say "and now I own heartbeats, backoff and replay".',
    pitfalls: [
      'Reconnecting a WebSocket in a tight loop with no backoff after a server restart.',
      'Putting a long-lived token in the WebSocket URL, where it lands in access logs.',
    ],
    resources: [
      { label: 'MDN — Server-sent events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events', kind: 'docs' },
      { label: 'MDN — WebSockets API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', kind: 'docs' },
    ],
    conceptDuel: [
      {
        q: 'You need to stream LLM tokens to the browser. Cheapest correct transport?',
        options: ['WebSocket', 'SSE', 'Short polling', 'gRPC-Web'],
        correct: 1,
        explanation:
          'The flow is one-directional text from server to client. SSE gives that plus free reconnection and Last-Event-ID resume, with no socket infrastructure or sticky sessions.',
      },
    ],
  },

  {
    id: 'rd-comm-webhooks-webrtc',
    area: 'Data & APIs',
    group: 'Realtime',
    title: 'Webhooks and WebRTC — server-to-server callbacks, and peer-to-peer media',
    status: 'covered',
    minutes: 7,
    summary:
      'Webhooks invert the call: the provider posts to you when something happens. WebRTC opens a direct peer connection for media and data. Neither is a browser-to-your-server transport, and saying so is the point.',
    body: [
      '### Webhooks',
      'Instead of polling Stripe for payment status, Stripe POSTs to your endpoint. **Browsers cannot receive webhooks** — there is no public URL for a tab. The frontend relevance is the chain: webhook hits your server → server pushes to the browser over SSE/WebSocket → UI updates.',
      '',
      'What a receiver must handle:',
      '- **Signature verification** — an HMAC header over the raw body. Verify before parsing, and compare in constant time. An unverified webhook endpoint is an unauthenticated write API.',
      '- **At-least-once delivery** — retries mean duplicates. Handlers must be **idempotent**, keyed on the event id.',
      '- **Out-of-order arrival** — use the event timestamp, not arrival order.',
      '- **Fast 2xx** — acknowledge immediately and queue the work, or the provider times out and retries, amplifying load.',
      '',
      '### WebRTC',
      'Peer-to-peer audio, video and arbitrary data (`RTCDataChannel`) with very low latency, because the media does not transit your server.',
      '',
      'The parts people forget: you still need a **signalling channel** (usually WebSocket) to exchange SDP offers and ICE candidates — WebRTC does not specify it. **STUN** discovers your public address; **TURN** relays when NAT traversal fails, which is roughly 10–20% of connections and is the expensive part, because that traffic does go through your infrastructure.',
      '',
      'Use it for calls, screen sharing and live collaboration cursors. Do not use it as a general client-server transport.',
    ],
    keyPoints: [
      'Webhooks are server-to-server; the browser learns via a second push channel.',
      'Verify the HMAC signature over the raw body, before parsing.',
      'Webhook delivery is at-least-once — handlers must be idempotent.',
      'WebRTC still needs your own signalling server, plus TURN relay for NAT failures.',
    ],
    interview:
      'A clean architecture sentence: "Stripe webhook → our API verifies and enqueues → worker updates the order → SSE pushes the new status to the open tab." It shows you know where each transport belongs.',
    pitfalls: [
      'Parsing the JSON body before verifying the signature — the signature covers the raw bytes.',
      'Forgetting TURN and shipping a demo that only works on the office network.',
    ],
    resources: [
      { label: 'Stripe — Webhook signatures', url: 'https://docs.stripe.com/webhooks#verify-official-libraries', kind: 'docs' },
      { label: 'MDN — WebRTC API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API', kind: 'docs' },
    ],
  },
];
