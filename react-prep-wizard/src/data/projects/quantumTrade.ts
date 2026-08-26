import type { ProjectBlueprint } from './types';

export const quantumTradeProject: ProjectBlueprint = {
  id: 'project-quantumtrade',
  title: 'QuantumTrade: High-Frequency Order Book & Telemetry Terminal',
  tagline: 'Institutional-grade real-time market depth terminal processing 250k events/sec with zero GC stutter.',
  realWorldAnalog: 'Bloomberg Terminal / Binance Pro / TradingView',
  difficulty: 'Principal',
  architecturePattern: 'Hexagonal + Lock-Free SPSC Circular Rings + WASM Book Engine',
  summary:
    'Build a financial terminal capable of processing 250,000 market depth delta packets per second with sub-16ms end-to-end glass latency. Features zero-copy SBE binary deserialization, SharedArrayBuffer lock-free queues, fixed-point math, and WebGL liquidity heatmaps.',
  tags: ['High Frequency', 'SharedArrayBuffer', 'WASM', 'WebGL', 'Binary WebSockets', 'SPSC Rings'],
  xpBounty: 500,
  layers: [
    {
      layer: 'Presentation',
      components: ['React 19 Order Entry & Risk Shell', 'Hardware-Accelerated Price Ladder Canvas', 'WebGL Dynamic Liquidity Heatmap', 'Time & Sales Feed'],
      invariants: ['Price ladder rendered via OffscreenCanvas; React renders trading forms and risk calculators.']
    },
    {
      layer: 'Application',
      components: ['Market Dispatcher', '120Hz Coalescing Frame Scheduler', 'Order Invariant Validator', 'VWAP / Depth Aggregator'],
      invariants: ['Frame coalescing aggregates 250k raw events/sec into 120Hz physical display tick snapshots.']
    },
    {
      layer: 'Domain',
      components: ['L2 / L3 Order Book Entity', 'Fixed-Point Decimal Value Object (Int64)', 'Trade Tape Circular Buffer', 'Liquidity Depth Slice'],
      invariants: ['Prices stored as 64-bit scaled integers (Price * 10^8) to eradicate IEEE-754 floating-point rounding errors.']
    },
    {
      layer: 'Infrastructure',
      components: ['Binary Feed Worker (WebSocket)', 'WASM Memory-Mapped Book Kernel', 'SharedArrayBuffer SPSC Queue', 'IndexedDB Tick Store'],
      invariants: ['Zero-copy byte deserialization with DataView directly over incoming ArrayBuffer payloads.']
    }
  ],
  implementationSteps: [
    {
      step: 1,
      title: 'Binary SBE / Protobuf Feed Parser in Worker',
      description: 'Ingest binary market feeds in a dedicated Web Worker. Read fields with DataView little-endian offsets with zero heap allocations.',
      codePattern: `const priceFixed = dataView.getBigInt64(offset, true);\nconst sizeFixed = dataView.getBigInt64(offset + 8, true);`
    },
    {
      step: 2,
      title: 'Lock-Free SPSC Circular Ring on SharedArrayBuffer',
      description: 'Allocate a 10MB SharedArrayBuffer ring buffer. Feed worker writes trades at head pointer and notifies render worker via Atomics.store and bitwise index wrapping.',
      codePattern: `const writeIndex = Atomics.load(headPtr) & (CAPACITY - 1);`
    },
    {
      step: 3,
      title: '120Hz Coalesced Rendering & WebGL Heatmap',
      description: 'Process 250k updates/sec in memory while streaming a 120Hz coalesced frame slice to a WebGL2 dynamic texture heatmap and 2D canvas price ladder.'
    },
    {
      step: 4,
      title: 'React 19 Shell & useSyncExternalStore Subscriptions',
      description: 'Build risk controls and order forms in React 19. Subscribe to market depth using useSyncExternalStore with selector memoization to eliminate unnecessary render passes.'
    }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'useSyncExternalStore', subtopic: 'Concurrent Subscriptions', howCovered: 'Subscribes directly to the external memory-mapped binary state store with zero UI tearing.' },
    { category: 'Performance', topic: 'Garbage Collection', subtopic: 'Zero Allocation Invariants', howCovered: 'Static memory pre-allocation avoids V8 young-generation nursery churn and eliminates GC freezes.' },
    { category: 'Web Platform', topic: 'Concurrency & Workers', subtopic: 'SharedArrayBuffer & Atomics', howCovered: 'Multi-threaded lock-free communication between ingestion worker and render worker.' },
    { category: 'State Management', topic: 'Global State', subtopic: 'Atomic Stores', howCovered: 'High-frequency telemetry isolated from low-frequency account configuration state.' }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'TCP_NODELAY & Nagle Algorithm Bypassing', mechanism: 'Raw binary WebSockets with disabled packet coalescing.', realWorldImpact: 'Eliminates 40ms of packet buffering latency in financial feeds.' },
    { domain: 'V8 Engine & Memory', title: 'Generational GC Hypothesis & Old Generation Heap', mechanism: 'Zero dynamic object allocations in steady-state loop.', realWorldImpact: 'Prevents full-stop Mark-Sweep GC freezes during high-volume market spikes.' },
    { domain: 'DOM & Browser Pipeline', title: 'Layout Containment (contain: strict)', mechanism: 'Strict CSS layout and size containment on canvas slots.', realWorldImpact: 'Prevents parent document reflow triggers during 120 FPS high-density rendering.' }
  ],
  frameworkVsManual: {
    frameworkHandled: [
      'React concurrent scheduler for order input validation and modal dialogues.',
      'Accessibility focus rings for trading keybindings.'
    ],
    manualEngineeringRequired: [
      'WASM Red-Black tree and Struct-of-Arrays (SoA) L2 Order Book.',
      'Lock-free Single-Producer Single-Consumer (SPSC) ring buffer with Atomics synchronization.',
      'Direct binary DataView parsing and fixed-point 64-bit integer arithmetic.'
    ]
  }
};
