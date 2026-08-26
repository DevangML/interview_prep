import type { ProjectBlueprint } from '../types';

export const quantumTradeProject: ProjectBlueprint = {
  id: 'project-quantumtrade',
  title: 'QuantumTrade: High-Frequency Order Book & Telemetry Terminal',
  tagline: 'Institutional-grade real-time market depth terminal processing 250k events/sec with zero GC stutter.',
  realWorldAnalog: 'Bloomberg Terminal / Binance Pro / TradingView L2 Book',
  tier: 'advanced',
  difficulty: 'Principal',
  estimatedBuildTimeHours: 16,
  architecturePattern: 'Hexagonal + Lock-Free SPSC Circular Rings + WASM Book Kernel',
  summary:
    'Build a high-frequency financial terminal processing 250,000 depth updates per second with sub-16ms end-to-end glass latency. Minimal scope (single L2 book, depth heatmap, one-click order form) with maximum architectural depth: SharedArrayBuffer, Atomics SPSC ring, fixed-point Int64 math, and useSyncExternalStore.',
  tags: ['High Frequency', 'SharedArrayBuffer', 'WASM', 'WebGL', 'Binary WebSockets', 'SPSC Rings'],
  xpBounty: 500,
  coreScopeBoundaries: {
    inScopeMinimal: [
      '250,000 events/sec binary feed ingestion in dedicated Web Worker.',
      'Lock-Free SPSC circular ring on 10MB SharedArrayBuffer with Atomics.',
      '120Hz coalesced WebGL2 liquidity depth heatmap.',
      'Fixed-point scaled integer arithmetic (Price * 10^8).',
      'React 19 useSyncExternalStore tear-free subscription.'
    ],
    outOfScopeBloat: [
      'Multi-exchange brokerage OAuth logins.',
      '10-year historical candlestick backtesting engine.',
      'Complex tax and multi-currency accounting ledgers.',
      'Social chat rooms and trader leaderboards.'
    ]
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Minimal Working Prototype',
      focus: 'React State Order Book & JSON WebSocket',
      codeSnippet: `// Stage 1: Naïve JSON Feed & React State\nfunction NaiveOrderBook() {\n  const [bids, setBids] = useState<Record<number, number>>({});\n\n  useEffect(() => {\n    ws.onmessage = (event) => {\n      const data = JSON.parse(event.data); // JSON parse overhead\n      setBids(prev => ({ ...prev, [data.price]: data.qty })); // Object clone nursery churn\n    };\n  }, []);\n\n  return <table>{Object.entries(bids).map(([p, q]) => <tr key={p}><td>{p}</td><td>{q}</td></tr>)}</table>;\n}`,
      failureModeOrInvariant: 'Parsing 250,000 JSON messages/sec generates 50MB/s of ephemeral objects, triggering frequent 80ms V8 Stop-The-World GC pauses.',
      architecturalLesson: 'High-velocity market feeds cannot use JSON or React state directly. Ingestion must be zero-copy and decoupled from UI render ticks.'
    },
    {
      stageNumber: 2,
      stageName: 'The Production Breakdown',
      focus: 'IEEE-754 Float Precision Loss & Concurrent State Tearing',
      codeSnippet: `// Stage 2: Float Math & State Tearing Under Concurrency\nfunction calculateVWAP(orders: Order[]) {\n  // 0.1 + 0.2 === 0.30000000000000004 IEEE-754 rounding drift\n  return orders.reduce((acc, o) => acc + (o.price * o.qty), 0) / totalQty;\n}\n\n// Concurrent React render tear: numbers update mid-frame\nconst depth = useStore(s => s.depth);`,
      failureModeOrInvariant: 'IEEE-754 binary floating point introduces rounding inaccuracies in financial matching. High-frequency state updates cause visual UI tearing.',
      architecturalLesson: 'Financial engines must use 64-bit fixed-point integers and tear-free subscription contracts like useSyncExternalStore.'
    },
    {
      stageNumber: 3,
      stageName: 'The Canonical Concept Evolution',
      focus: 'Zero-Copy SBE + SharedArrayBuffer Atomics Ring + useSyncExternalStore',
      codeSnippet: `// Stage 3: SharedArrayBuffer Lock-Free SPSC Ring\n// Feed Worker (Producer)\nconst writeIdx = Number(Atomics.load(headPtr, 0) & BigInt(RING_CAPACITY - 1)) * 16;\nringView.setBigInt64(writeIdx, priceScaledInt64, true);\nringView.setBigInt64(writeIdx + 8, volumeScaledInt64, true);\nAtomics.add(headPtr, 0, 1n);\nAtomics.notify(headPtr, 0, 1);\n\n// React 19 UI: Tear-Free useSyncExternalStore\nexport function useDepth(symbol: string) {\n  return useSyncExternalStore(\n    notify => ringStore.subscribe(symbol, notify),\n    () => ringStore.getSnapshot(symbol)\n  );\n}`,
      failureModeOrInvariant: 'Zero heap allocations during steady-state ingestion. Ingestion and rendering execute concurrently across multi-core workers without locks.',
      architecturalLesson: 'SharedArrayBuffer with atomic memory barriers enables true zero-latency inter-thread streaming in the browser.'
    },
    {
      stageNumber: 4,
      stageName: 'Production Hardening & Design Elegance',
      focus: '64-Byte Cache-Line Padding, WebGL PBO Heatmap & CSS Containment',
      codeSnippet: `// Stage 4: 64-Byte Cache-Line False Sharing Padding\n// Align atomic pointers to distinct 64-byte hardware cache lines\nconst HEAD_PTR_OFFSET = 0;\nconst TAIL_PTR_OFFSET = 64; // Prevents CPU L1/L2 cache invalidation storms\n\n// CSS Strict Containment on Terminal Widget\n// .market-ladder { contain: strict; content-visibility: auto; }`,
      failureModeOrInvariant: 'Eliminates multi-core CPU cache line thrashing. CSS containment isolates 120 FPS high-density canvas updates from document reflows.',
      architecturalLesson: 'Hardware-aware data layout and CSS containment are required for true sub-16ms institutional terminal performance.'
    }
  ],
  deliverables: [
    { id: 'Order book', title: 'Order book', spec: 'A book in typed arrays with an index, property-tested against a reference implementation, using an exact price comparison rule.' },
    { id: 'Order ticket', title: 'Order ticket', spec: 'A real form with a confirmation step, modelling draft, validating, submitted, filled and rejected, with decimals never converted to floats and 0 quantity defaulted with ??.' },
    { id: 'Ladder', title: 'Ladder', spec: 'A grid with fixed-width tabular-numeral tracks, end-aligned numbers, a centred mid-price row, an absolutely positioned marker that does not trigger layout, and keyboard-first operation.' },
    { id: 'Feeds', title: 'Feeds', spec: 'Socket and worker subscriptions each closing over their own ring-buffer view, with reconnect backoff and handlers bound so a receiver is never lost.' },
    { id: 'Panels', title: 'Panels', spec: 'Registered panels composed into a user-arranged workspace, each isolated by its own boundary class.' },
    { id: 'Shell', title: 'Shell', spec: 'A routed terminal shell where workspace layout and instrument live in the URL, with reference data rendered on the server.' },
    { id: 'Workspace', title: 'Workspace', spec: 'Layout and order state in an RTK slice producing a replayable audit trail, persisted to IndexedDB with a migration.' },
    { id: 'Architecture', title: 'Architecture', spec: 'A written latency budget, backpressure policy and degradation ladder produced before any code.' },
    { id: 'Protocol', title: 'Protocol', spec: 'A typed wire format validated at the edge, with custom error classes whose instanceof checks are shown to fail across a worker boundary.' },
    { id: 'Workers', title: 'Workers', spec: 'Ingestion and render workers over SharedArrayBuffer with a lock-free queue, chunked as separate build targets under COOP/COEP.' },
    { id: 'Reference data', title: 'Reference data', spec: 'Instrument data cached with ETags, on a different freshness rule from the live socket.' },
    { id: 'Panel header', title: 'Panel header', spec: 'A flex row with a growing title and an auto-margin close control.' },
    { id: 'Panel', title: 'Panel', spec: 'A body that grows while header and status bar hold their basis, restyled by container query for docked, floated and popped-out.' },
    { id: 'Themes', title: 'Themes', spec: 'Up, down and neutral as tokens with color-mix intensities, layered so a per-user colour-blind scheme is possible.' },
    { id: 'Charts', title: 'Charts', spec: 'Charts reserving their box with aspect-ratio so a resize during a fast market cannot reflow the ticket.' },
  ],
  layers: [
    { layer: 'Presentation', components: ['React 19 Shell', 'OffscreenCanvas Price Ladder', 'WebGL Liquidity Heatmap', 'Risk Validator'], invariants: ['Tear-free subscriptions via useSyncExternalStore; zero DOM re-render during ticks.'] },
    { layer: 'Application', components: ['120Hz Coalescing Scheduler', 'SPSC Ring Coordinator', 'VWAP Fixed-Point Engine'], invariants: ['Aggregates 250k events/sec into 120Hz display tick slices.'] },
    { layer: 'Domain', components: ['L2 Order Book Entity', 'Int64 Fixed-Point Value Object', 'Trade Tape Ring'], invariants: ['Prices represented as scaled 64-bit integers (Price * 10^8).'] },
    { layer: 'Infrastructure', components: ['Binary Feed Worker', 'SharedArrayBuffer SPSC Queue', 'WebGL PBO Texture Uploader'], invariants: ['Zero-copy byte deserialization with DataView directly over network ArrayBuffers.'] }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'useSyncExternalStore', subtopic: 'Tear-Free Subscriptions', howCovered: 'Subscribes directly to memory-mapped binary state store with zero UI tearing.' , conceptIds: ['react-hooks-rest', 'state-alternatives'] },
    { category: 'Performance', topic: 'Zero-Allocation Invariants', subtopic: 'V8 Nursery Bypassing', howCovered: 'Static memory pre-allocation eliminates 100% of V8 young-generation GC pauses.' , conceptIds: ['react-perf', 'js-arrays-objects'] },
    { category: 'Web Platform', topic: 'SharedArrayBuffer & Atomics', subtopic: 'Lock-Free SPSC Queue', howCovered: 'Multi-threaded lock-free communication between ingestion worker and render worker.' , conceptIds: ['js-event-loop', 'js-promises'] },
    { category: 'Security & Invariants', topic: 'Cross-Origin Isolation', subtopic: 'COOP & COEP Headers', howCovered: 'Configures COOP same-origin headers to unlock SharedArrayBuffer.' , conceptIds: ['web-cors', 'web-security'] }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'TCP_NODELAY & Nagle Bypassing', mechanism: 'Raw binary WebSockets with disabled packet coalescing.', realWorldImpact: 'Eliminates 40ms of socket packet buffering latency.' },
    { domain: 'V8 Engine & Memory', title: 'Generational GC Hypothesis', mechanism: 'Zero dynamic object allocations in steady-state loop.', realWorldImpact: 'Prevents full-stop GC freezes during high-volume market bursts.' },
    { domain: 'DOM & Browser Pipeline', title: 'Layout Containment (contain: strict)', mechanism: 'Strict CSS layout containment on terminal widget.', realWorldImpact: 'Prevents parent document reflow triggers during 120 FPS rendering.' },
    { domain: 'Security & Invariants', title: '64-Byte Cache-Line Padding', mechanism: 'Aligns atomic pointers to distinct hardware cache lines.', realWorldImpact: 'Eliminates multi-core CPU cache invalidation storms.' }
  ],
  frameworkVsManual: {
    frameworkHandled: ['React concurrent scheduler for order inputs.', 'Accessibility focus rings for trading keybindings.'],
    manualEngineeringRequired: ['Lock-free SPSC ring buffer with Atomics synchronization.', 'Direct DataView binary parsing and fixed-point math.', 'WebGL2 PBO texture depth upload loop.']
  }
};
