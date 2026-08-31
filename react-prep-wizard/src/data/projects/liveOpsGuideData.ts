/**
 * Live Ops Console — Master Pedagogical Data
 * 
 * Contains detailed pedagogical breakdowns for all quests and challenges (F01 to F04)
 * with the 6 Pillars:
 * 1. Why (Architectural failure mode if missing)
 * 2. Where It Fits (Topology & System flow)
 * 3. What (Strict Contract, Signatures, File targets in ~/Desktop/live_feed_console)
 * 4. How & Broken-First Trap (Anti-pattern code, error thrown, mechanistic fix)
 * 5. Edge Cases (Socratic interrogation checklist)
 * 6. A3 Defense (Spoken defense prompt & must-mention points)
 */

export interface LiveOpsChallengeData {
  id: string;
  questId: string;
  title: string;
  targetFile: string;
  teachesRowIds: string[];
  why: {
    summary: string;
    productionFailure: string;
    keyConcept: string;
  };
  whereItFits: {
    layer: string;
    flowDescription: string;
    diagramAscii: string;
  };
  whatContract: {
    signatures: string[];
    inputs: string[];
    outputs: string[];
    invariants: string[];
  };
  brokenFirstTrap: {
    title: string;
    badCodeSnippet: string;
    whatBreaks: string;
    errorSignature: string;
    mechanisticFix: string;
  };
  edgeCases: Array<{
    question: string;
    explanation: string;
    trapSeverity: 'critical' | 'subtle' | 'gotcha';
  }>;
  a3Defense: {
    prompt: string;
    timeBudgetSeconds: number;
    mustMention: string[];
    sampleScript: string;
  };
}

export interface LiveOpsQuestData {
  id: string;
  title: string;
  tagline: string;
  xp: number;
  why: string;
  nfrs: string[];
  builds: string[];
  challenges: LiveOpsChallengeData[];
}

export const LIVE_OPS_QUESTS: LiveOpsQuestData[] = [
  {
    id: 'F01',
    title: 'Feed Ingestion Layer',
    tagline: 'Multi-origin concurrent polling, typed error hierarchy & custom middleware',
    xp: 400,
    why: 'Real-time operations consoles ingest multiple independent public feeds with varying latency, schemas, and reliability. Building a resilient ingestion layer prevents a single broken feed from freezing or blanking the dashboard.',
    nfrs: [
      'At least 3 independent feeds from different origins.',
      'Each feed declares TWO mirror URLs (enabling Promise.any failover).',
      'One hand-written Redux middleware (feed-latency logger). RTK default thunk alone does not satisfy this.',
      'A dead feed must NEVER blank the dashboard.'
    ],
    builds: [
      'src/feeds/errors.js',
      'src/feeds/Feed.js',
      'src/feeds/PollingFeed.js',
      'src/feeds/pipeline.js',
      'src/store/middleware/latencyLogger.js',
      'webpack.config.js'
    ],
    challenges: [
      {
        id: 'F01.1',
        questId: 'F01',
        title: 'Typed Error Family & Feed Class Hierarchy',
        targetFile: 'src/feeds/errors.js & src/feeds/Feed.js',
        teachesRowIds: ['J51', 'J52', 'J53', 'J54', 'J159', 'J30'],
        why: {
          summary: 'Why create custom Error subclasses and class hierarchies instead of throwing generic strings or plain Objects?',
          productionFailure: 'If all errors are plain strings or generic Error instances, the orchestrator cannot distinguish a 504 Gateway Timeout (which should trigger a mirror failover) from a JSON SyntaxError (which should trigger a payload quarantine). It would blindly retry corrupted payloads or fail to switch mirrors.',
          keyConcept: 'Inheritance with super(), prototype chain binding, and instanceof discriminator boundaries.'
        },
        whereItFits: {
          layer: 'Ingestion Layer -> Error Handling & Invariant Domain',
          flowDescription: 'Raw network response -> Feed catches network/parse failures -> wraps with FeedError subclasses -> Dispatcher checks (err instanceof NetworkError) to switch mirror or trigger backoff.',
          diagramAscii: `
[ Error ]
   ▲
[ FeedError ] (feedId, message, timestamp)
   ▲───────────────▲
[ NetworkError ]  [ ParseError ]
 (statusCode)     (rawBodySnippet)
          `
        },
        whatContract: {
          signatures: [
            'class FeedError extends Error { constructor(message, feedId) }',
            'class NetworkError extends FeedError { constructor(message, feedId, statusCode) }',
            'class ParseError extends FeedError { constructor(message, feedId) }',
            'class Feed { constructor(id, name, endpoints) }'
          ],
          inputs: ['message: string', 'feedId: string', 'statusCode?: number'],
          outputs: ['Error instances with this.name, this.feedId, this.stack, and prototype preserved.'],
          invariants: [
            'Every subclass constructor MUST call super(message, feedId) before referencing `this`.',
            'this.name MUST be set to the constructor name (e.g. "NetworkError") for clean stacktraces.',
            'instanceof NetworkError and instanceof FeedError must both evaluate to true for network errors.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Missing super() / Lost Prototype Trap',
          badCodeSnippet: `class NetworkError extends FeedError {
  constructor(message, feedId, statusCode) {
    // ❌ FORGOT super(message, feedId)
    this.statusCode = statusCode;
  }
}`,
          whatBreaks: 'JavaScript throws a ReferenceError immediately before any property is assigned to `this`. In derived classes, `this` does not exist until `super()` executes the parent constructor.',
          errorSignature: 'ReferenceError: Must call super constructor in derived class before accessing \'this\'',
          mechanisticFix: 'Call `super(message, feedId)` on the first line of the derived constructor.'
        },
        edgeCases: [
          {
            question: 'What happens if you omit super(message, feedId) in NetworkError?',
            explanation: 'The JavaScript engine raises a ReferenceError at runtime when constructing the instance because the subclass prototype chain is not initialized.',
            trapSeverity: 'critical'
          },
          {
            question: 'Why does super(message, feedId) need to set this.feedId in FeedError?',
            explanation: 'Error base class in standard JS only accepts (message). FeedError sets this.feedId, which then automatically populates for NetworkError and ParseError via inheritance.',
            trapSeverity: 'subtle'
          },
          {
            question: 'What if an error is caught across a vm or iframe boundary?',
            explanation: 'Cross-realm instances have different prototype objects, so `instanceof` can fail. Having `this.name = "NetworkError"` acts as a reliable structural discriminator.',
            trapSeverity: 'gotcha'
          }
        ],
        a3Defense: {
          prompt: 'Walk me through your error architecture in the ingestion layer.',
          timeBudgetSeconds: 90,
          mustMention: [
            'Hierarchical typed errors (FeedError -> NetworkError, ParseError)',
            'Callers branch on error class type via `instanceof`, not brittle regex on message strings',
            'Attachment of operational metadata (feedId, statusCode, timestamp)',
            'Preservation of V8 stack traces and prototype chain via proper super() chaining'
          ],
          sampleScript: 'In our ingestion layer, we deliberately avoid generic Errors. We established a typed error hierarchy rooted at FeedError which captures the feedId metadata. Subclasses like NetworkError capture HTTP status codes, while ParseError captures malformed payloads. This allows our polling orchestrator to catch errors and branch cleanly: a NetworkError triggers an immediate mirror retry, whereas a ParseError quarantines the payload and reports an ingestion alert without wasting network calls.'
        }
      },
      {
        id: 'F01.2',
        questId: 'F01',
        title: 'Pure Normalisation Pipeline (Unary Composition)',
        targetFile: 'src/feeds/pipeline.js',
        teachesRowIds: ['J37', 'J38', 'J39', 'J40'],
        why: {
          summary: 'Why build the normalization pipeline as composed unary functions rather than a monolithic parsing function?',
          productionFailure: 'When public feed schemas change or new feeds are added, a monolithic parser becomes an untestable spaghetti of if-else statements with high cyclomatic complexity and hidden side effects.',
          keyConcept: 'Pure functions, unary pipeline composition (`pipe` / `compose`), point-free style, and currying.'
        },
        whereItFits: {
          layer: 'Ingestion Layer -> Data Transformation Pipeline',
          flowDescription: 'Raw HTTP Response Body -> parseJson -> validateSchema -> normalizeTimestamps -> enrichMetadata -> Clean Store Action.',
          diagramAscii: `
[ Raw Response ]
       │
       ▼ (Unary)
  [ parseJSON ]
       │
       ▼ (Unary)
 [ validateFeed ]
       │
       ▼ (Unary)
[ normalizeData ]
       │
       ▼ (Unary)
 [ enrichEntity ]
       │
       ▼
 [ Redux Action ]
          `
        },
        whatContract: {
          signatures: [
            'const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);',
            'const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);',
            'const createNormalizer = (schema) => pipe(parseJson, validateWith(schema), normalizeFields, enrichWithTimestamp)'
          ],
          inputs: ['Raw input payload / object'],
          outputs: ['Normalized immutable domain model object'],
          invariants: [
            'Every function in the pipe MUST be unary (accept exactly 1 input, return 1 output).',
            'Pipeline functions MUST be pure (no mutation of input objects).',
            'Higher-order validators must be curried: `validateWith(schema)(data)`.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Multi-Argument Pipe Failure',
          badCodeSnippet: `// ❌ Multi-arg function in a pipe
const enrich = (data, feedId, timestamp) => ({ ...data, feedId, timestamp });
const pipeline = pipe(parse, validate, enrich);
pipeline(raw); // enrich receives undefined for feedId and timestamp!`,
          whatBreaks: 'In a unary pipeline, each function only receives the return value of the previous step. Multi-argument functions silently receive `undefined` for trailing parameters.',
          errorSignature: 'Silent logical bug or TypeError: Cannot destructure property of undefined',
          mechanisticFix: 'Curry the enriching function: `const enrich = (feedId) => (data) => ({ ...data, feedId, timestamp: Date.now() });` and invoke it in the pipeline definition: `pipe(parse, validate, enrich("feed-1"))`.'
        },
        edgeCases: [
          {
            question: 'What is the difference in execution order between pipe() and compose()?',
            explanation: '`pipe` executes Left-to-Right (first function to last function), whereas `compose` executes Right-to-Left (mathematical standard: f(g(x))).',
            trapSeverity: 'subtle'
          },
          {
            question: 'What happens to fn.length after currying?',
            explanation: 'A curried function wrapper usually reports `length: 1` or `length: 0` for outer layers, rather than the arity of the nested implementation.',
            trapSeverity: 'gotcha'
          }
        ],
        a3Defense: {
          prompt: 'How do you design data normalization pipelines for external APIs?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Unary function composition via `pipe` or `compose`',
            'Immutability: each stage returns a new data projection without mutating inputs',
            'Currying for configuration parameters (e.g. schemas, feed IDs)',
            'Isolated testability of individual transform steps'
          ],
          sampleScript: 'We structure our ingestion pipeline using functional unary composition. Raw payloads pass through a pipeline created with `pipe(parseJson, validateSchema(schema), normalizeTimestamps, enrichMetadata)`. Because every stage is a pure unary function, we can test validation logic or timestamp formatting in total isolation without mocking network requests or Redux state.'
        }
      },
      {
        id: 'F01.3',
        questId: 'F01',
        title: 'Multi-Feed Orchestration & Promise Combinators',
        targetFile: 'src/feeds/PollingFeed.js',
        teachesRowIds: ['J72', 'J73', 'J74', 'J75', 'J76', 'J77', 'J79', 'J80', 'J83', 'J84', 'J85'],
        why: {
          summary: 'Why do we need all four Promise combinators (all, allSettled, any, race) in a production dashboard?',
          productionFailure: 'Using Promise.all for polling means a single 500 error from one public feed crashes the entire dashboard and prevents other healthy feeds from rendering. Using Promise.allSettled for boot config causes the app to boot in a corrupt, half-initialized state.',
          keyConcept: 'Promise combinators failure semantics, AggregateError, timeout races, and cleanup of orphan promises.'
        },
        whereItFits: {
          layer: 'Ingestion Layer -> Async Orchestrator',
          flowDescription: 'Boot Phase -> Promise.all (Fail-fast). Multi-Feed Tick -> Promise.allSettled (Fault-tolerant). Mirror Failover -> Promise.any (First success). Request Timeout -> Promise.race (Enforce SLA).',
          diagramAscii: `
1. Boot Config (Fail-Fast)      -> Promise.all([Auth, Config, Meta])
2. Polling Loop (Fault-Tolerant)-> Promise.allSettled([FeedA, FeedB, FeedC])
3. Mirror Redundancy (Fastest)  -> Promise.any([PrimaryURL, MirrorURL])
4. Timeout Enforcement          -> Promise.race([FetchPromise, TimeoutPromise])
          `
        },
        whatContract: {
          signatures: [
            'fetchWithMirror(primaryUrl, mirrorUrl): Promise<Response>',
            'fetchWithTimeout(promise, ms, signal): Promise<Response>',
            'pollAllFeeds(feeds): Promise<SettledFeedResult[]>'
          ],
          inputs: ['feeds: Feed[]', 'timeoutMs: number', 'abortSignal: AbortSignal'],
          outputs: ['Array of settled results with status "fulfilled" or "rejected"'],
          invariants: [
            'Boot configuration MUST use Promise.all to fail fast if core schemas fail to load.',
            'Periodic polling MUST use Promise.allSettled so individual feed outages do not cascade.',
            'Mirror endpoints MUST use Promise.any to resolve on the first successful mirror response.',
            'Network timeouts MUST use Promise.race against a rejecting delay.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Promise.all Polling Cascade Failure',
          badCodeSnippet: `// ❌ If Feed 3 throws a 500, results for Feed 1 and Feed 2 are lost!
const tick = async () => {
  const [data1, data2, data3] = await Promise.all([
    fetchFeed1(),
    fetchFeed2(),
    fetchFeed3()
  ]);
  updateStore({ data1, data2, data3 });
};`,
          whatBreaks: 'If any single feed fails or rejects, the entire `Promise.all` immediately rejects, dropping successful data from other feeds and triggering a full UI error state.',
          errorSignature: 'UnhandledPromiseRejection or UI blanking on single feed degradation.',
          mechanisticFix: 'Use `Promise.allSettled([fetchFeed1(), fetchFeed2(), fetchFeed3()])` and iterate through the settled array, updating healthy feeds and logging warnings for rejected ones.'
        },
        edgeCases: [
          {
            question: 'When Promise.race fires a timeout, is the underlying HTTP request cancelled?',
            explanation: 'No! Promise.race only ignores the losing promise. The network socket remains open and downloading in the background unless explicitly aborted via AbortController.signal.',
            trapSeverity: 'critical'
          },
          {
            question: 'What error is thrown when all mirrors in Promise.any reject?',
            explanation: 'An `AggregateError` is thrown, containing an `errors` array holding every individual rejection reason.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'When do you use each of the four Promise combinators?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Promise.all: All must succeed, fail-fast (essential for boot/initial configuration)',
            'Promise.allSettled: Independent concurrent tasks where partial success is valuable (multi-feed polling)',
            'Promise.any: First successful resolution (mirror failover / fastest replica query)',
            'Promise.race: First settlement wins (timeout enforcement SLA)',
            'Critical caveat: Losers in race/any keep running unless paired with AbortController'
          ],
          sampleScript: 'We choose Promise combinators strictly based on failure semantics. For initial boot configuration, we use Promise.all because missing metadata makes the application unstartable. For the continuous polling loop, we use Promise.allSettled so a network glitch on one feed does not discard fresh metrics from the other feeds. For mirror failover, Promise.any returns the fastest healthy mirror, and Promise.race enforces our 3-second SLA. Crucially, we link an AbortController so losing requests are actually terminated at the network layer.'
        }
      },
      {
        id: 'F01.4',
        questId: 'F01',
        title: 'Async/Await, Error Propagation & Cancellation',
        targetFile: 'src/feeds/PollingFeed.js',
        teachesRowIds: ['J81', 'J82', 'J94', 'J95', 'J96', 'J97', 'J98', 'J101', 'J161'],
        why: {
          summary: 'Why does fetch not reject on HTTP 404/500, and how do we prevent memory leaks and unhandled rejections during component unmounts?',
          productionFailure: 'If developers assume `fetch()` rejects on HTTP 500, errors slip through as successful responses, passing HTML error pages into JSON parsers and throwing obscure SyntaxErrors. If polling loops lack AbortController signals, unmounted views continue polling indefinitely in the background.',
          keyConcept: '`response.ok` check, AbortController lifecycle, and try/catch async boundaries.'
        },
        whereItFits: {
          layer: 'Ingestion Layer -> Network Client Lifecycle',
          flowDescription: 'Component unmount / timeout -> abortController.abort() -> fetch aborts immediately -> catch catches AbortError -> cleanup loop gracefully.',
          diagramAscii: `
[ Polling Loop ] ──▶ [ AbortController ]
       │                      │
       ▼                      ▼
 [ fetch(url, { signal }) ] ─── (abort signal received) ──▶ [ AbortError ]
       │                                                         │
       ▼ (if response.ok === false)                              ▼
[ throw NetworkError(res.status) ]                     [ Graceful Loop Exit ]
          `
        },
        whatContract: {
          signatures: [
            'async fetchFeed(url, options = {}): Promise<NormalizedFeedData>',
            'class PollingLoop { start(intervalMs); stop(); }'
          ],
          inputs: ['url: string', 'options: { signal?: AbortSignal, timeoutMs?: number }'],
          outputs: ['Promise resolving to parsed data or throwing typed NetworkError/AbortError'],
          invariants: [
            'fetch MUST check `if (!response.ok) throw new NetworkError(...)`.',
            'Every in-flight poll request MUST accept an AbortSignal.',
            'When stop() is called, the active AbortController MUST abort and the loop timer cleared.'
          ]
        },
        brokenFirstTrap: {
          title: 'The fetch() 404/500 Non-Rejection Trap',
          badCodeSnippet: `// ❌ fetch DOES NOT reject on 404/500!
async function getFeed(url) {
  try {
    const res = await fetch(url);
    const data = await res.json(); // 💥 Throws SyntaxError: Unexpected token < in JSON at position 0
    return data;
  } catch (err) {
    console.error("Network failed", err);
  }
}`,
          whatBreaks: '`window.fetch` resolves successfully as long as an HTTP response was received, even if status is 404 or 500. Attempting to parse the response body as JSON crashes with a misleading SyntaxError.',
          errorSignature: 'SyntaxError: Unexpected token < in JSON at position 0 (trying to parse HTML 500 error page)',
          mechanisticFix: 'Inspect `response.ok` before parsing body: `if (!res.ok) throw new NetworkError("Feed HTTP Error", feedId, res.status);`'
        },
        edgeCases: [
          {
            question: 'What happens if you abort an AbortController that has already completed?',
            explanation: 'It is a safe no-op. The signal status transitions to `aborted: true`, but completed promises are unaffected.',
            trapSeverity: 'subtle'
          },
          {
            question: 'Can you reuse an AbortController instance across multiple successive fetch requests?',
            explanation: 'No! Once aborted, an AbortController remains permanently in the aborted state. Subsequent fetch calls using its signal will immediately reject with AbortError.',
            trapSeverity: 'critical'
          }
        ],
        a3Defense: {
          prompt: 'How do you guarantee clean async lifecycle and cancellation in data fetching layers?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Checking `response.ok` manually because fetch only rejects on network loss or CORS failures',
            'Using AbortController to cancel in-flight requests on teardown or timeout',
            'Distinguishing AbortError from real runtime errors in catch blocks',
            'Recreating AbortControllers per request cycle'
          ],
          sampleScript: 'In our fetch client, we strictly guard the response status by checking `response.ok` before attempting body deserialization, throwing a typed NetworkError with the status code if false. Furthermore, every request binds to an AbortSignal from an active AbortController. When a user switches views or a polling cycle times out, we trigger `abort()`. Our catch block differentiates `AbortError` (which is a planned cancellation) from genuine network failures, ensuring no unhandled rejection noise or memory leaks.'
        }
      },
      {
        id: 'F01.5',
        questId: 'F01',
        title: 'Cross-Origin Requests (CORS) & Browser Security',
        targetFile: 'src/feeds/Feed.js',
        teachesRowIds: ['J135', 'J136'],
        why: {
          summary: 'Why does CORS exist in browsers and what happens under the hood during a preflight check?',
          productionFailure: 'Adding custom headers (like Authorization or X-Feed-ID) to external public feeds triggers browser preflight `OPTIONS` requests. If the public server does not handle OPTIONS or allow the custom header, the browser blocks the entire response.',
          keyConcept: 'Same-Origin Policy (SOP), Preflight OPTIONS handshake, Simple Requests, and `Access-Control-Allow-Origin`.'
        },
        whereItFits: {
          layer: 'Ingestion Layer -> Browser Security Boundary',
          flowDescription: 'Browser detects non-simple request -> sends OPTIONS preflight -> waits for 204/200 with Allow-Headers -> sends actual GET/POST -> JS receives response.',
          diagramAscii: `
[ Browser JS ] ────▶ (Custom Header added: X-Feed-Key)
      │
      ├─ 1. OPTIONS /api/data ─────────▶ [ Server ]
      │  ◀─ 204 No Content (Allow: *) ───┘
      │
      └─ 2. Actual GET /api/data ──────▶ [ Server ]
         ◀─ 200 OK (Data payload) ───────┘
          `
        },
        whatContract: {
          signatures: [
            'fetch(url, { headers: { ... }, mode: "cors" })'
          ],
          inputs: ['url: string', 'options: RequestInit'],
          outputs: ['Promise<Response>'],
          invariants: [
            'Client JS CANNOT read headers or bodies of responses blocked by CORS.',
            'Simple requests (GET/POST with standard Content-Type and no custom headers) skip preflight.',
            'When credentials mode is "include", `Access-Control-Allow-Origin` MUST NOT be `*`.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Unintended Preflight Trap',
          badCodeSnippet: `// ❌ Adding custom headers triggers a preflight OPTIONS to external API
fetch('https://public-feed.org/events', {
  headers: {
    'X-Client-Timestamp': Date.now(), // 💥 Triggers OPTIONS preflight!
    'Content-Type': 'application/json'
  }
});`,
          whatBreaks: 'If `public-feed.org` does not explicitly respond to `OPTIONS` with `Access-Control-Allow-Headers: X-Client-Timestamp`, the browser abruptly cancels the main request with a CORS error.',
          errorSignature: 'CORS error: Request header field x-client-timestamp is not allowed by Access-Control-Allow-Headers in preflight response.',
          mechanisticFix: 'Keep public feed requests "Simple" (standard GET, standard headers) or use query parameters (e.g. `?ts=123`) instead of custom HTTP request headers.'
        },
        edgeCases: [
          {
            question: 'Can JavaScript read the body of a response that failed the CORS check?',
            explanation: 'No! The browser network layer receives the bytes, but the JS engine throws a TypeError and completely blocks JS code from reading the status, headers, or body.',
            trapSeverity: 'critical'
          },
          {
            question: 'What happens if a server returns Access-Control-Allow-Origin: * and the request sends credentials: "include"?',
            explanation: 'The browser rejects the response. When credentials (cookies/auth) are included, the server MUST return an explicit origin, never a wildcard `*`.',
            trapSeverity: 'gotcha'
          }
        ],
        a3Defense: {
          prompt: 'Explain CORS mechanisms and preflight triggers.',
          timeBudgetSeconds: 90,
          mustMention: [
            'CORS is an opt-in browser security mechanism relaxing Same-Origin Policy',
            'Simple requests vs Preflighted requests (non-GET/POST or custom headers triggers OPTIONS)',
            'Wildcard `*` incompatibility with credentialed requests (`credentials: include`)',
            'CORS is enforced by the browser client, not by the server'
          ],
          sampleScript: 'CORS is a browser-enforced security protocol that restricts cross-origin resource access. A simple GET request with standard headers is dispatched directly; however, introducing custom headers or non-standard content types causes the browser to dispatch an automated preflight OPTIONS request. If the server does not return appropriate `Access-Control-Allow-*` headers, the browser drops the response before our JavaScript can inspect it. For our public feeds, we ensure requests stay simple to eliminate preflight latency.'
        }
      },
      {
        id: 'F01.6',
        questId: 'F01',
        title: 'Hand-Crafted Redux Middleware Architecture',
        targetFile: 'src/store/middleware/latencyLogger.js',
        teachesRowIds: ['X21', 'X22', 'X23', 'X24', 'X25', 'X26', 'X27', 'X28', 'X29', 'X30'],
        why: {
          summary: 'Why write Redux middleware by hand with triple-curried functions `store => next => action`?',
          productionFailure: 'Using thunks for cross-cutting telemetry scatters logging and latency calculation across 50 action creators. A centralized custom middleware intercepts every action cleanly, timing execution and catching uncaught reducer exceptions.',
          keyConcept: 'Triple-curried higher-order functions, action pipeline interception, `next(action)` propagation, and thunk typeof mechanics.'
        },
        whereItFits: {
          layer: 'State Management Layer -> Action Dispatch Pipeline',
          flowDescription: 'dispatch(action) -> latencyLogger -> thunkMiddleware -> rootReducer -> updated state.',
          diagramAscii: `
dispatch(action)
      │
      ▼
[ LatencyLogger Middleware ] (records performance.now())
      │
      ▼ next(action)
[ Redux Thunk Middleware ] (checks typeof action === 'function')
      │
      ▼ next(action)
[ Root Reducer ] (updates state)
          `
        },
        whatContract: {
          signatures: [
            'const createLatencyLogger = (storeAPI) => (next) => (action) => { ... }'
          ],
          inputs: ['storeAPI: { getState, dispatch }', 'next: (action) => any', 'action: { type, payload, meta }'],
          outputs: ['Result of next(action)'],
          invariants: [
            'Middleware MUST be curried 3 levels deep: `store => next => action`.',
            'Middleware MUST return the result of `next(action)` unless explicitly short-circuiting.',
            'Omission of `next(action)` silently swallows the action and stops the reducer.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Swallowed Action Trap (Omitted next)',
          badCodeSnippet: `// ❌ Forgot to invoke next(action)
export const badLogger = store => next => action => {
  console.log("Action received:", action.type);
  // Missing: return next(action);
};`,
          whatBreaks: 'The action is received by the middleware but never forwarded to downstream middleware or reducers. The Redux state never updates, and the UI appears completely frozen.',
          errorSignature: 'Redux DevTools shows action dispatched, but State Diff is empty and UI does not re-render.',
          mechanisticFix: 'Always call and return `next(action)` to pass control down the pipeline: `const result = next(action); return result;`'
        },
        edgeCases: [
          {
            question: 'What is the implementation of redux-thunk in pure JavaScript?',
            explanation: 'It is literally one line: `const thunk = ({ dispatch, getState }) => next => action => typeof action === "function" ? action(dispatch, getState) : next(action);`',
            trapSeverity: 'subtle'
          },
          {
            question: 'What happens if you swap the order of logger middleware and thunk middleware?',
            explanation: 'If logger is before thunk, it logs the dispatched async function. If logger is after thunk, it only logs the resulting plain action objects.',
            trapSeverity: 'gotcha'
          }
        ],
        a3Defense: {
          prompt: 'How does Redux middleware work internally?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Triple curried signature `store => next => action`',
            '`next` points to the next middleware or the base store.dispatch',
            'Enables cross-cutting concerns (telemetry, crash reporting, async handling)',
            'How thunk inspects `typeof action === "function"` to intercept execution'
          ],
          sampleScript: 'Redux middleware uses functional currying across three levels: `storeAPI => next => action`. When an action is dispatched, each middleware receives the action and can inspect state, run side-effects, or measure latency before calling `next(action)` to pass control down the chain. Redux-thunk is simply a middleware that checks `if (typeof action === "function")` to pass dispatch and getState, otherwise calling next(). We leverage this architecture to measure feed latency transparently across all ingestion events.'
        }
      },
      {
        id: 'F01.7',
        questId: 'F01',
        title: 'Standalone Webpack 5 Architecture from Scratch',
        targetFile: 'webpack.config.js',
        teachesRowIds: ['R099', 'R100', 'R101', 'R102', 'R103', 'R104', 'R105', 'R106', 'R107', 'R108'],
        why: {
          summary: 'Why configure Webpack 5 from scratch without Create-React-App or black-box templates?',
          productionFailure: 'Engineers who only know Vite templates cannot debug production bundle chunk splits, sourcemap leakage in enterprise audits, asset subpath routing crashes, or loader resolution order failures.',
          keyConcept: 'Entry/Output graph, Loaders (Right-to-Left evaluation), Plugins lifecycle, and `publicPath` asset resolution.'
        },
        whereItFits: {
          layer: 'Tooling & Build Infrastructure Layer',
          flowDescription: 'Source Code (JS/JSX/CSS) -> Webpack Module Graph -> Loaders transform files -> Plugins optimize/emit -> Dist Bundles.',
          diagramAscii: `
[ index.jsx ] ──▶ [ Babel-Loader ] ──┐
[ styles.css ] ──▶ [ css-loader ] ───┼─▶ [ Webpack Compiler ] ──▶ [ dist/bundle.js ]
                  [ style-loader ] ──┘   (HtmlWebpackPlugin)       [ dist/index.html ]
          `
        },
        whatContract: {
          signatures: [
            'module.exports = { entry, output, module: { rules: [...] }, plugins: [...], devServer }'
          ],
          inputs: ['Source code in src/'],
          outputs: ['Optimized bundle in dist/ with injected HTML'],
          invariants: [
            'Webpack loaders in a `use` array evaluate RIGHT-TO-LEFT (bottom-to-top).',
            'For CSS: `use: ["style-loader", "css-loader"]` — css-loader interprets @import/url(), then style-loader injects into DOM.',
            'publicPath MUST be set correctly for SPA nested route asset loading.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Inverted Loader Array Trap',
          badCodeSnippet: `// ❌ WRONG ORDER: evaluates right-to-left!
module: {
  rules: [
    {
      test: /\\.css$/,
      use: ["css-loader", "style-loader"] // 💥 style-loader runs FIRST, receives raw CSS string instead of module export!
    }
  ]
}`,
          whatBreaks: 'Webpack executes loaders in reverse order (right to left). With `["css-loader", "style-loader"]`, style-loader runs first on the raw file and throws an error because it expects css-loader output.',
          errorSignature: 'ModuleBuildError: Unknown word / unexpected token in CSS parsing',
          mechanisticFix: 'Correct the order to `use: ["style-loader", "css-loader"]` (css-loader runs first, style-loader runs second).'
        },
        edgeCases: [
          {
            question: 'What is the precise difference between a Loader and a Plugin in Webpack?',
            explanation: 'A Loader transforms individual file contents before they enter the module graph (file-level preprocessor). A Plugin hooks into the Webpack compilation lifecycle taps (compiler/compilation hooks) to perform bundle-wide operations (minification, HTML generation, env injection).',
            trapSeverity: 'critical'
          },
          {
            question: 'What breaks if publicPath is omitted when deploying to a subpath or using nested React Router paths?',
            explanation: 'When loading a subpath like `/feed/order-123`, the browser requests `/feed/bundle.js` instead of `/bundle.js`, returning a 404 HTML response instead of the JS script.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'Walk me through a Webpack build configuration and the role of loaders vs plugins.',
          timeBudgetSeconds: 90,
          mustMention: [
            'Core configuration pillars: entry, output, module rules, plugins, devServer',
            'Right-to-Left loader execution order (e.g. style-loader <- css-loader)',
            'Loaders transform individual files; Plugins hook into the compiler lifecycle for bundle-level optimization',
            'Asset routing and publicPath configuration'
          ],
          sampleScript: 'Webpack operates as a module bundler by constructing a dependency graph starting from the entry point. Loaders transform individual files prior to bundling, executing strictly from right-to-left — for instance, `["style-loader", "css-loader"]` ensures css-loader first resolves imports, then style-loader injects the style tags. Plugins tap into compiler hooks to execute broader lifecycle tasks, such as HtmlWebpackPlugin injecting bundled scripts into HTML or TerserPlugin minifying chunks.'
        }
      }
    ]
  },
  {
    id: 'F02',
    title: 'Live Metric Tiles & 60fps Rendering',
    tagline: 'High-density grid layout, SVG sparklines & React 18 auto-batching optimization',
    xp: 300,
    why: 'An operations dashboard must render 40+ dynamic tiles updating at 4Hz without dropping frames or causing layout thrashing. This forces masterclass knowledge of CSS Grid/Flexbox constraints and React 18 render batching.',
    nfrs: [
      'At least 40 tiles updating at 4Hz or faster.',
      'Sustained 60fps under load, verified in the Performance panel.',
      'Tile re-render count must not scale with feed tick rate.'
    ],
    builds: [
      'src/features/tiles/TileGrid.jsx',
      'src/features/tiles/MetricTile.jsx',
      'src/features/tiles/Sparkline.jsx',
      'src/styles/layout.css'
    ],
    challenges: [
      {
        id: 'F02.1',
        questId: 'F02',
        title: 'High-Density Grid Layout & Flexbox Tile Internals',
        targetFile: 'src/styles/layout.css & src/features/tiles/TileGrid.jsx',
        teachesRowIds: ['C15', 'C16', 'C17', 'C18', 'C19', 'C26', 'C27', 'C28', 'C29', 'C30', 'C31'],
        why: {
          summary: 'Why use CSS Grid for the board container and Flexbox inside each tile?',
          productionFailure: 'Improper grid sizing causes tiles to blow out screen boundaries on small viewports, or causes text overflow to stretch tiles unevenly, destroying dashboard visual density.',
          keyConcept: '`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `min-width: 0` flex overflow fix, and `flex: 1 1 0`.'
        },
        whereItFits: {
          layer: 'Presentation Layer -> Responsive Layout Subsystem',
          flowDescription: 'Viewport Resize -> CSS Grid recalculates column tracks -> Tiles flex internal sparkline and metric values -> min-width: 0 prevents blowout.',
          diagramAscii: `
[ Dashboard Board (CSS Grid auto-fit) ]
┌─────────────────────────┬─────────────────────────┐
│ [ Tile 1 (Flex Column) ]│ [ Tile 2 (Flex Column) ]│
│  Metric: 142ms          │  Metric: 99.8%          │
│  [ Sparkline (SVG) ]    │  [ Sparkline (SVG) ]    │
└─────────────────────────┴─────────────────────────┘
          `
        },
        whatContract: {
          signatures: [
            '.tile-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }',
            '.tile-card { display: flex; flex-direction: column; min-width: 0; }'
          ],
          inputs: ['List of metric tile objects'],
          outputs: ['Responsive 60fps flex/grid layout'],
          invariants: [
            'Tiles MUST have `min-width: 0` to allow child text-overflow ellipsis to function.',
            'Grid MUST use `auto-fit` (not auto-fill) so fewer tiles stretch to fill the row.',
            'Tile contents MUST use logical flexbox spacing without hardcoded pixel heights.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Flex Child Overflow Blowout Trap',
          badCodeSnippet: `/* ❌ Flex children default to min-width: auto */
.tile-card {
  display: flex;
}
.metric-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 💥 Won't truncate! Expands parent tile infinitely! */
}`,
          whatBreaks: 'In CSS Flexbox, flex items have a default `min-width: auto`. If child content is long, the flex item refuses to shrink below its content width, breaking grid columns.',
          errorSignature: 'Horizontal scrollbars appear unexpectedly; ellipsis fails to trigger.',
          mechanisticFix: 'Set `min-width: 0` on the flex child container to allow it to shrink below intrinsic content size.'
        },
        edgeCases: [
          {
            question: 'What is the exact difference between auto-fit and auto-fill in CSS Grid?',
            explanation: '`auto-fill` creates empty column tracks even if there are no items to fill them. `auto-fit` collapses empty tracks to 0px, causing the existing items to stretch across the full row width.',
            trapSeverity: 'subtle'
          },
          {
            question: 'What is the difference between flex: 1, flex: 1 1 0, and flex: auto?',
            explanation: '`flex: 1` is shorthand for `flex: 1 1 0%` (basis is 0, shares all free space). `flex: auto` is shorthand for `flex: 1 1 auto` (basis is content size, shares space after subtracting content size).',
            trapSeverity: 'critical'
          }
        ],
        a3Defense: {
          prompt: 'Explain your layout strategy combining CSS Grid and Flexbox for high-density dashboards.',
          timeBudgetSeconds: 90,
          mustMention: [
            '2D layout with CSS Grid for the board container (`repeat(auto-fit, minmax(...))` for auto-wrapping)',
            '1D layout with Flexbox inside individual tiles for vertical alignment',
            'Applying `min-width: 0` to prevent flex items from breaking grid boundaries',
            'Choosing `auto-fit` to ensure single or few items stretch seamlessly'
          ],
          sampleScript: 'We use CSS Grid for the two-dimensional dashboard container with `repeat(auto-fit, minmax(260px, 1fr))` to provide fluid responsive wrapping without media query thrashing. Inside each individual metric tile, we use Flexbox for one-dimensional stacking. Crucially, we enforce `min-width: 0` on all flex items to override the default `min-width: auto`, allowing dynamic labels and sparklines to truncate cleanly without causing grid layout blowout.'
        }
      },
      {
        id: 'F02.2',
        questId: 'F02',
        title: 'Themeable Inline SVG Sparklines & Responsive Observers',
        targetFile: 'src/features/tiles/Sparkline.jsx',
        teachesRowIds: ['H09', 'H38', 'J133'],
        why: {
          summary: 'Why render inline SVGs themed with `currentColor` and measured with `ResizeObserver` instead of bulky charting libraries?',
          productionFailure: 'Third-party chart libraries (e.g. Chart.js, Recharts) add hundreds of KB of bundle overhead, create canvas DOM detached instances, and re-draw from scratch on every tick, causing severe CPU spikes at 4Hz.',
          keyConcept: 'Inline SVG coordinate paths, `currentColor` CSS inheritance, and non-looping `ResizeObserver`.'
        },
        whereItFits: {
          layer: 'Presentation Layer -> Data Visualization',
          flowDescription: 'Metric array -> Sparkline component calculates SVG path `<path d="M... L..." />` -> strokes with `currentColor` -> adapts automatically to dark/light CSS themes.',
          diagramAscii: `
[ Metric History: [10, 24, 18, 42, 35] ]
                 │
                 ▼ (computePath(data, width, height))
[ <svg viewBox="0 0 100 30"> ]
  └─ <path d="M 0 25 L 25 10 L 50 15 L 75 0 L 100 8" stroke="currentColor" fill="none" />
          `
        },
        whatContract: {
          signatures: [
            '<Sparkline data={number[]} width={number} height={number} />',
            'generateSvgPath(points: number[], width: number, height: number): string'
          ],
          inputs: ['data: number[] (recent sliding window)', 'strokeWidth?: number'],
          outputs: ['Lightweight inline SVG path element'],
          invariants: [
            'SVG stroke MUST use `stroke="currentColor"` to inherit text color from parent theme classes.',
            'Path generation MUST normalize values between min and max within viewBox coordinate bounds.',
            'ResizeObserver callback MUST NOT synchronously alter monitored element dimensions (avoids loop error).'
          ]
        },
        brokenFirstTrap: {
          title: 'The ResizeObserver Loop Limit Exceeded Trap',
          badCodeSnippet: `// ❌ Modifying element size inside ResizeObserver callback
const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    // 💥 Modifying element style directly inside observer triggers infinite loop!
    entry.target.style.height = (entry.contentRect.width * 0.3) + 'px';
  }
});`,
          whatBreaks: 'Resizing an element within its own ResizeObserver callback triggers a secondary resize event in the same animation frame, exceeding the browser loop limit.',
          errorSignature: 'ResizeObserver loop completed with undelivered notifications.',
          mechanisticFix: 'Use SVG `viewBox="0 0 100 30"` with CSS `preserveAspectRatio="none"` and `width: 100%`, allowing the browser vector engine to scale SVG paths automatically without manual style mutations in JS.'
        },
        edgeCases: [
          {
            question: 'Why is currentColor superior to passing color hex props to the SVG?',
            explanation: '`currentColor` dynamically evaluates to the computed CSS `color` property of the containing element, allowing instantaneous theme toggling (dark/light/high-contrast) via CSS classes without React re-renders.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'How do you build lightweight, performant data visualizations in React?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Direct inline SVG path generation over heavy canvas/chart libraries',
            '`viewBox` responsive scaling with CSS',
            'Theme agility using `currentColor`',
            'Zero external runtime dependencies for rendering micro-visualizations'
          ],
          sampleScript: 'Instead of pulling in heavy charting libraries that bloat bundles and allocate canvas contexts for dozens of tiles, we render direct inline SVG sparklines. We compute normalized polyline coordinates `<path d="M... L..." />` mathematically and stroke with `currentColor`. This allows all 40+ sparklines to scale fluidly via viewBox and inherit CSS theme colors instantly without incurring chart library re-initialization costs.'
        }
      },
      {
        id: 'F02.3',
        questId: 'F02',
        title: '60fps Performance Profiling & React 18 Auto-Batching',
        targetFile: 'src/features/tiles/MetricTile.jsx',
        teachesRowIds: ['J41', 'R007', 'R011', 'R012', 'R051', 'R052', 'R053', 'R074', 'R075', 'R076', 'R077', 'R078', 'R081', 'R082'],
        why: {
          summary: 'Why do inline arrow functions and unstable object references destroy `React.memo` performance in high-frequency dashboards?',
          productionFailure: 'Wrapping a component in `React.memo` is useless if callers pass `style={{ color: "red" }}` or `onClick={() => select(id)}`. React sees a new object/function reference on every tick, invalidating the memo cache and causing all 40 tiles to re-render on every millisecond feed update.',
          keyConcept: 'React.memo shallow comparison, referential equality (`useCallback`/`useMemo`), React 18 Automatic Batching, and `flushSync`.'
        },
        whereItFits: {
          layer: 'Performance Layer -> Reconciliation Optimization',
          flowDescription: 'Store updates -> Parent re-renders -> React.memo shallow-compares prevProps vs nextProps -> Skips rendering if unchanged -> Only modified tile renders.',
          diagramAscii: `
[ Store Dispatches Tick for Metric 3 ]
                  │
                  ▼
         [ Parent TileGrid ]
     ┌────────────┼────────────┐
     ▼            ▼            ▼
[ Tile 1 ]   [ Tile 2 ]   [ Tile 3 (Changed) ]
(Memo PASS)  (Memo PASS)   (Memo FAIL -> Re-renders)
(Skipped)    (Skipped)     (60fps preserved)
          `
        },
        whatContract: {
          signatures: [
            'export const MetricTile = React.memo(MetricTileBase, (prev, next) => prev.metric.val === next.metric.val && prev.status === next.status)'
          ],
          inputs: ['metric: MetricObject', 'onSelect: (id) => void'],
          outputs: ['Memoized Tile JSX'],
          invariants: [
            'All callback props passed to memoized tiles MUST be stabilized with useCallback or hoisted.',
            'Tile components MUST NOT generate inline style objects or anonymous handlers in JSX.',
            'React 18 automatic batching groups multiple state dispatches into a single render pass.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Inline Object Memo Invalidation Trap',
          badCodeSnippet: `// ❌ Passing fresh inline object on every render invalidates memo!
function TileGrid({ metrics }) {
  return metrics.map(m => (
    <MetricTile 
      key={m.id} 
      metric={m} 
      config={{ showSparkline: true }} // 💥 Fresh object reference every render!
      onClick={() => handleSelect(m.id)} // 💥 Fresh function reference every render!
    />
  ));
}`,
          whatBreaks: '`React.memo` performs shallow equality (`Object.is`) on props. Because `{ showSparkline: true } !== { showSparkline: true }`, memo ALWAYS returns false, forcing every tile to re-render on every tick.',
          errorSignature: 'React DevTools Profiler shows "Why did this render? Props changed: config, onClick" across 100% of tiles on every tick.',
          mechanisticFix: 'Hoist static configs outside component scope, and pass stable IDs to stable handler references or custom memo comparators.'
        },
        edgeCases: [
          {
            question: 'How did state batching change between React 17 and React 18?',
            explanation: 'React 17 only batched state updates inside React synthetic event handlers. Updates in setTimeout, Promise callbacks, or native listeners triggered separate renders. React 18 automatically batches everywhere by default.',
            trapSeverity: 'critical'
          },
          {
            question: 'How is React.memo comparator logic inverted compared to shouldComponentUpdate?',
            explanation: '`shouldComponentUpdate` returns `true` to TRIGGER a render. `React.memo` custom comparator returns `true` to SKIP the render (i.e. props are equal).',
            trapSeverity: 'gotcha'
          }
        ],
        a3Defense: {
          prompt: 'How do you guarantee and measure 60fps in a high-frequency real-time React application?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Identify causes of re-renders (state, props, context, parent)',
            'Enforce referential stability (hoisting static objects, useCallback, custom memo comparators)',
            'React 18 automatic batching eliminating micro-render thrashing',
            'Verification in Chrome DevTools Performance panel (LoAF, Long Tasks, 16.6ms frame budget)'
          ],
          sampleScript: 'To sustain 60fps under high-frequency updates, we eliminate unnecessary reconciliations. We wrap our metric tiles in `React.memo` with custom equality comparators checking primitive metric timestamps. We strictly eliminate inline object and function allocations in JSX to preserve referential equality. Under React 18, concurrent state dispatches are automatically batched into a single commit. We verify this empirically in the Chrome Performance tab, ensuring frame times stay comfortably below the 16.6ms frame budget.'
        }
      }
    ]
  },
  {
    id: 'F03',
    title: 'Alert Stream & Virtualized List',
    tagline: 'Infinite event ingestion, fixed-memory ring buffer & custom DOM virtualization',
    xp: 350,
    why: 'When thousands of alerts stream in during an operations incident, storing them naively in a JS array crashes the browser tab with an Out-of-Memory (OOM) heap error. Rendering thousands of DOM nodes causes severe layout thrashing. We must build a constant-memory ring buffer and hand-roll a virtualized list from scratch.',
    nfrs: [
      'Constant memory footprint over 100,000 ingested alerts (Ring Buffer capped at 1,000).',
      'Hand-rolled DOM virtualization (renders only visible rows + overscan buffer).',
      'Smooth 60fps scrolling performance without external libraries.'
    ],
    builds: [
      'src/features/alerts/RingBuffer.js',
      'src/features/alerts/VirtualAlertList.jsx',
      'src/features/alerts/alertWorker.js'
    ],
    challenges: [
      {
        id: 'F03.1',
        questId: 'F03',
        title: 'Constant-Memory Ring Buffer / Deque',
        targetFile: 'src/features/alerts/RingBuffer.js',
        teachesRowIds: ['J09', 'J10', 'J11', 'J12', 'J13'],
        why: {
          summary: 'Why use a fixed-capacity Ring Buffer instead of Array.prototype.unshift() for live streaming alerts?',
          productionFailure: 'Calling `array.unshift(newAlert)` is an O(N) operation that shifts every existing element in memory. Storing unbounded arrays causes memory leaks and GC freezes.',
          keyConcept: 'Circular Buffer / Ring Buffer data structure, pointer modulo arithmetic `(head + 1) % capacity`, and O(1) push operations.'
        },
        whereItFits: {
          layer: 'Data Structure & Storage Layer -> In-Memory Cache',
          flowDescription: 'Live Alert -> RingBuffer.push() -> Overwrites oldest entry when full -> Returns fixed-window slice for UI rendering.',
          diagramAscii: `
[ Ring Buffer (Capacity: 4) ]
   Index 0: Alert #4 (Head) ──▶ Overwrote Alert #0
   Index 1: Alert #1
   Index 2: Alert #2
   Index 3: Alert #3 (Tail)
Memory remains strictly constant: O(1) Time, O(Capacity) Space.
          `
        },
        whatContract: {
          signatures: [
            'class RingBuffer { constructor(capacity); push(item); toArray(); clear(); get length(); }'
          ],
          inputs: ['capacity: number', 'item: any'],
          outputs: ['RingBuffer instance with O(1) insertion'],
          invariants: [
            'Buffer memory allocation MUST NEVER exceed `capacity` elements.',
            '`push()` MUST be an O(1) operation using index modulo pointer arithmetic.',
            '`toArray()` MUST return items in chronological order (oldest to newest).'
          ]
        },
        brokenFirstTrap: {
          title: 'The Array.unshift() O(N) Thrashing Trap',
          badCodeSnippet: `// ❌ O(N) array shifting on every high-speed alert!
class BadAlertStore {
  constructor() { this.alerts = []; }
  addAlert(alert) {
    this.alerts.unshift(alert); // O(N) memory shift every tick!
    if (this.alerts.length > 1000) this.alerts.pop();
  }
}`,
          whatBreaks: 'On every incoming alert, `unshift` must re-index all 1,000 items in memory. At 50 alerts/sec, this triggers massive V8 garbage collection stalls and CPU choking.',
          errorSignature: 'V8 Major GC pauses visible in Performance timeline; main thread frame drops.',
          mechanisticFix: 'Implement a RingBuffer using a pre-allocated fixed-size Array with `head` and `tail` pointers incremented modulo `capacity`.'
        },
        edgeCases: [
          {
            question: 'How do you return chronological array output from a wrapped ring buffer?',
            explanation: 'If the buffer has wrapped around, elements from `head` to `capacity - 1` are the oldest, followed by elements from `0` to `head - 1`. Concatenating these two slices produces strict chronological ordering in O(N).',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'How do you handle unbounded streaming events client-side without memory leaks?',
          timeBudgetSeconds: 90,
          mustMention: [
            'Rejection of unbounded array growth and O(N) unshift operations',
            'Constant memory footprint via pre-allocated RingBuffer with modulo index pointers',
            'Deterministic memory bounds preventing browser tab OOM crashes',
            'O(1) amortized ingestion performance'
          ],
          sampleScript: 'To handle unbounded operational alert streams without memory growth, we store alerts in a fixed-capacity Ring Buffer. Rather than calling `unshift()`, which re-indexes elements with O(N) cost, our RingBuffer writes to a pre-allocated array using modulo pointer arithmetic `(head + 1) % capacity` in O(1) time. When capacity is reached, new events overwrite the oldest slots, guaranteeing our memory footprint never exceeds our allocated budget regardless of whether 1,000 or 10,000,000 alerts arrive.'
        }
      },
      {
        id: 'F03.2',
        questId: 'F03',
        title: 'Hand-Rolled DOM Virtualization from Scratch',
        targetFile: 'src/features/alerts/VirtualAlertList.jsx',
        teachesRowIds: ['J45', 'J46', 'J47', 'J48', 'J49'],
        why: {
          summary: 'Why build custom DOM virtualization instead of rendering 2,000 table rows directly?',
          productionFailure: 'Rendering 2,000 DOM rows creates 20,000+ DOM nodes. When the user scrolls, the browser pipeline recalculates style and layout for all 20,000 nodes, causing frame rates to collapse from 60fps to 4fps.',
          keyConcept: 'Virtual window slicing: `startIndex = Math.floor(scrollTop / itemHeight)`, `endIndex`, overscan buffer, absolute transform positioning, and total height phantom spacer.'
        },
        whereItFits: {
          layer: 'Presentation & DOM Layer -> Virtual Windowing',
          flowDescription: 'Scroll Event -> Calculate scrollTop -> Compute visible slice [startIndex, endIndex + overscan] -> Render 15 DOM nodes -> Position with `transform: translateY(topOffset)` -> Phantom container maintains full scrollbar height.',
          diagramAscii: `
[ Scroll Container (height: 400px) ]
┌───────────────────────────────────────┐
│ ▒▒▒ Phantom Spacer (Total Height) ▒▒▒ │
│                                       │
│   ┌───────────────────────────────┐   │
│   │ Visible Item 14 (translateY)  │   │ ──▶ Only 10-15 DOM nodes
│   │ Visible Item 15 (translateY)  │   │     exist in memory at any time!
│   │ Visible Item 16 (translateY)  │   │
│   └───────────────────────────────┘   │
│                                       │
└───────────────────────────────────────┘
          `
        },
        whatContract: {
          signatures: [
            '<VirtualAlertList items={Alert[]} itemHeight={40} containerHeight={400} overscan={3} />'
          ],
          inputs: ['items: Alert[]', 'itemHeight: number', 'containerHeight: number', 'overscan: number'],
          outputs: ['Virtualized scroll container rendering only visible rows'],
          invariants: [
            'Total phantom height MUST equal `items.length * itemHeight`.',
            '`startIndex` MUST be `Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)`.',
            '`endIndex` MUST be `Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan)`.',
            'Visible items MUST be translated using `transform: translateY(startIndex * itemHeight)px`.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Missing Phantom Spacer / Scroll Collapse Trap',
          badCodeSnippet: `// ❌ Slicing items without a phantom height spacer
function BadVirtualList({ items, itemHeight }) {
  const visible = items.slice(0, 10);
  return (
    <div style={{ overflow: 'auto', height: '400px' }}>
      {visible.map(i => <div key={i.id}>{i.title}</div>)}
    </div>
  );
}`,
          whatBreaks: 'Without a phantom height spacer, the container content height is only `10 * 40px = 400px`. The browser sees no scrollable overflow, the scrollbar disappears, and the user cannot scroll to see subsequent items.',
          errorSignature: 'Scrollbar is missing or resets to top immediately when scrolling.',
          mechanisticFix: 'Create an outer scroll container with an inner phantom `div` styled with `height: items.length * itemHeight + "px"`, and render the visible slice inside an absolutely positioned sub-container with `transform: translateY(startIndex * itemHeight + "px")`.'
        },
        edgeCases: [
          {
            question: 'Why is transform: translateY() superior to top: Npx for positioning virtual items?',
            explanation: '`transform` is handled directly by the GPU compositor thread without triggering layout or paint cycles. Changing `top` forces the browser main thread to execute layout recalculation on every scroll tick.',
            trapSeverity: 'critical'
          },
          {
            question: 'What is the purpose of the overscan buffer?',
            explanation: 'Overscan renders a small number of items (e.g. 3-5) immediately above and below the visible viewport window, preventing visual white blanking during fast momentum scrolling.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'Explain the mathematics and DOM mechanics of your custom virtual list implementation.',
          timeBudgetSeconds: 90,
          mustMention: [
            'Calculate `startIndex` and `endIndex` based on `scrollTop`, `containerHeight`, and `itemHeight`',
            'Phantom spacer `div` establishing full native scrollbar range',
            'Overscan buffer eliminating white flashes during rapid scrolling',
            'GPU-accelerated positioning via `transform: translateY` instead of layout-triggering `top`'
          ],
          sampleScript: 'Our virtual list limits DOM allocations to only the visible viewport window plus an overscan buffer. By measuring the scroll container’s `scrollTop`, we compute the active index window: `startIndex = Math.floor(scrollTop / itemHeight) - overscan`. An inner phantom container holds the full computed height `items.length * itemHeight` to preserve native scroll physics, while the visible slice is positioned using GPU-composited `transform: translateY(offset)`. This keeps active DOM nodes under 20 regardless of whether the list contains 100 or 100,000 alerts.'
        }
      }
    ]
  },
  {
    id: 'F04',
    title: 'Entity Detail Drawer & LRU Cache',
    tagline: 'O(1) Doubly-Linked List cache & accessible WAI-ARIA focus trap modal drawer',
    xp: 250,
    why: 'When users click alerts or metrics to inspect detailed historical payloads, fetching from the network repeatedly wastes bandwidth and causes UI lag. We must build an O(1) Least Recently Used (LRU) Cache combining a Hash Map and a Doubly-Linked List, paired with a fully accessible WAI-ARIA keyboard focus trap modal drawer.',
    nfrs: [
      'LRU Cache with true O(1) get and O(1) put operations.',
      'Accessible Modal Drawer: Tab cycle wrap, Escape key dismissal, and inert background.',
      'Optimistic mutations with guaranteed rollback on server rejection.'
    ],
    builds: [
      'src/lib/cache/LruCache.js',
      'src/components/drawer/EntityDetailDrawer.jsx'
    ],
    challenges: [
      {
        id: 'F04.1',
        questId: 'F04',
        title: 'Doubly-Linked List + Map LRU Cache',
        targetFile: 'src/lib/cache/LruCache.js',
        teachesRowIds: ['J14', 'J15', 'J16', 'J17', 'J18'],
        why: {
          summary: 'Why does an LRU cache require both a Map and a Doubly-Linked List for O(1) operations?',
          productionFailure: 'Using an Array for LRU cache eviction requires `array.splice()` or `indexOf()`, which is an O(N) linear scan on every read and write. Under heavy caching of entity details, this stalls the UI.',
          keyConcept: 'HashMap for O(1) lookup + Doubly-Linked List (prev/next pointers) for O(1) node detachment and head promotion.'
        },
        whereItFits: {
          layer: 'Caching & Application State Layer',
          flowDescription: 'User opens Entity Detail -> check LruCache.get(id) -> Hit: Promote node to Head, return data -> Miss: Fetch from network, LruCache.put(id, data), evict Tail if capacity exceeded.',
          diagramAscii: `
[ Map: { "id-1": NodeA, "id-2": NodeB } ]
                 │
                 ▼
[ Head ] ◀─▶ [ NodeA (Most Recent) ] ◀─▶ [ NodeB (Oldest) ] ◀─▶ [ Tail ]
                 │
  (When full, evict NodeB at Tail in O(1) by updating pointers)
          `
        },
        whatContract: {
          signatures: [
            'class LruCache { constructor(capacity); get(key); put(key, value); delete(key); get size(); }',
            'class Node { constructor(key, value); prev; next; }'
          ],
          inputs: ['capacity: number', 'key: string', 'value: any'],
          outputs: ['Cached value or undefined on miss'],
          invariants: [
            '`get(key)` MUST be O(1) and promote accessed node to the Head.',
            '`put(key, value)` MUST be O(1) and evict the Tail node when `size > capacity`.',
            'Map keys must hold references to doubly-linked list Node objects.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Array.splice() Pseudo-LRU Trap',
          badCodeSnippet: `// ❌ O(N) array searching for LRU
class ArrayLRU {
  constructor(capacity) { this.capacity = capacity; this.items = []; }
  get(key) {
    const idx = this.items.findIndex(i => i.key === key); // O(N) scan!
    if (idx === -1) return null;
    const [item] = this.items.splice(idx, 1); // O(N) array copy!
    this.items.unshift(item); // O(N) shift!
    return item.value;
  }
}`,
          whatBreaks: 'Every `get` and `put` performs multiple O(N) linear array traversals and array memory reallocations, defeating the entire purpose of a constant-time cache.',
          errorSignature: 'Profiler shows significant time spent in `findIndex` and `splice` during high-frequency lookups.',
          mechanisticFix: 'Combine a JavaScript `Map` with a `DoublyLinkedList` with dummy head/tail sentinel nodes.'
        },
        edgeCases: [
          {
            question: 'Why are sentinel (dummy) head and tail nodes useful in Doubly-Linked Lists?',
            explanation: 'Sentinel nodes eliminate edge-case checks for `null` pointers when inserting at the very head or removing from the very tail, making pointer rewiring bug-free.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'Explain the data structures and complexity of an LRU Cache.',
          timeBudgetSeconds: 90,
          mustMention: [
            'Dual structure: HashMap for O(1) key-to-node lookup + Doubly-Linked List for O(1) reordering',
            'Why singly-linked lists fail (cannot delete node in O(1) without predecessor pointer)',
            'Sentinel head and tail nodes preventing null pointer branch bugs',
            'Eviction of least recently accessed node from the tail when capacity is exceeded'
          ],
          sampleScript: 'An optimal LRU Cache requires two data structures: a Hash Map for O(1) key lookup and a Doubly-Linked List to maintain access recency in O(1) time. A singly-linked list is insufficient because deleting a node requires finding its predecessor in O(N). By maintaining `prev` and `next` pointers along with sentinel head and tail nodes, accessing a key allows us to detach the node and splice it directly behind the head in O(1). When capacity is exceeded, the node before the tail sentinel is purged in O(1) from both the list and the map.'
        }
      },
      {
        id: 'F04.2',
        questId: 'F04',
        title: 'Accessible Modal Drawer & Keyboard Focus Trap',
        targetFile: 'src/components/drawer/EntityDetailDrawer.jsx',
        teachesRowIds: ['A01', 'A02', 'A03', 'A04', 'A05'],
        why: {
          summary: 'Why is a keyboard focus trap and WAI-ARIA modal implementation mandatory for production drawers?',
          productionFailure: 'When screen reader or keyboard-only users open a drawer, focus remains stuck on the background page. Tabbing wanders into invisible background buttons, creating severe accessibility compliance violations (WCAG 2.1 AA).',
          keyConcept: '`role="dialog"`, `aria-modal="true"`, Keyboard Tab cycle trap (`keydown`), Escape key dismissal, and background `inert` attribute.'
        },
        whereItFits: {
          layer: 'Presentation & Accessibility (A11y) Subsystem',
          flowDescription: 'User clicks entity -> Drawer opens -> Focus moves to first focusable element inside drawer -> Tab key cycles strictly within drawer -> Escape closes drawer -> Focus returns to trigger button.',
          diagramAscii: `
[ Trigger Button ] ──▶ (Click) ──▶ [ Drawer Opens (role="dialog", aria-modal="true") ]
       ▲                                 │
       │ (Focus trapped inside)          ▼
       │                          [ First Input ]
       │                                 │ (Tab)
       │                                 ▼
       │                          [ Close Button ]
       │                                 │ (Tab wraps back to First Input!)
       └─────── (Escape key pressed / Closed) ───┘
          `
        },
        whatContract: {
          signatures: [
            '<EntityDetailDrawer entityId={string} isOpen={boolean} onClose={() => void} />'
          ],
          inputs: ['entityId: string', 'isOpen: boolean', 'onClose: () => void'],
          outputs: ['Accessible React Drawer Modal Portal'],
          invariants: [
            'When opened, focus MUST immediately transfer to the drawer container or first focusable element.',
            'Pressing `Tab` on the last focusable element MUST cycle back to the first focusable element.',
            'Pressing `Shift+Tab` on the first element MUST wrap to the last element.',
            'Pressing `Escape` MUST trigger `onClose()`.',
            'When closed, focus MUST return to the element that triggered the drawer.'
          ]
        },
        brokenFirstTrap: {
          title: 'The Focus Leak / Trapped Keyboard Trap',
          badCodeSnippet: `// ❌ Simple div with no focus management
function BadDrawer({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="drawer-overlay">
      <div className="drawer-content">{children}</div>
    </div>
  );
}`,
          whatBreaks: 'Keyboard users pressing Tab cycle right past the open drawer into background links and form inputs that are hidden behind the overlay.',
          errorSignature: 'Accessibility audit flags WCAG 2.1 2.4.3 Focus Order Violation; keyboard navigation gets lost.',
          mechanisticFix: 'Use a `useEffect` to query focusable elements (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`), intercept `keydown` events for `Tab` and `Shift+Tab` to enforce boundary wrapping, and restore previous `document.activeElement` on unmount.'
        },
        edgeCases: [
          {
            question: 'What modern HTML attribute makes background content completely inaccessible to assistive technology?',
            explanation: 'The `inert` boolean attribute (`element.inert = true`) tells the browser to ignore all user input and remove the subtree from the accessibility tree entirely.',
            trapSeverity: 'subtle'
          }
        ],
        a3Defense: {
          prompt: 'How do you build a fully accessible modal drawer complying with WAI-ARIA and WCAG guidelines?',
          timeBudgetSeconds: 90,
          mustMention: [
            'ARIA semantics: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`',
            'Focus management lifecycle: Capturing `activeElement`, focusing initial node, returning focus on close',
            'Keyboard trap handling: Intercepting `Tab`/`Shift+Tab` boundary wrapping and `Escape` key dismissal',
            'Disabling background interaction via `inert` attribute or body scroll lock'
          ],
          sampleScript: 'An accessible modal drawer requires strict adherence to WAI-ARIA dialog patterns. We apply `role="dialog"`, `aria-modal="true"`, and link titles with `aria-labelledby`. On mount, we store a reference to `document.activeElement` and transfer focus into the drawer. A keydown listener intercepts `Tab` and `Shift+Tab` to cycle focus strictly between the first and last focusable elements, while `Escape` triggers dismissal. Upon closing, focus is cleanly restored to the original trigger element, ensuring seamless screen-reader continuity.'
        }
      }
    ]
  }
];
