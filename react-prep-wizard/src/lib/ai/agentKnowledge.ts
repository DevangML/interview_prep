/**
 * Universal Agent Domain Knowledge & Literature Grounding Index
 * Grounded in:
 * - Chain-of-Verification (CoVe - Dhuliawala et al., 2023)
 * - Reflexion (Shinn et al., 2023)
 * - ReAct (Yao et al., 2022)
 * - Socratic Cognitive Scaffolding
 */

import { PROJECT_BLUEPRINTS } from '../../data/projects';
import type { ProjectBlueprint } from '../../data/projects/types';

export interface LiteratureReference {
  id: string;
  title: string;
  category: 'RFC' | 'Spec' | 'Academic Paper' | 'Engine Whitepaper' | 'Architecture Guide';
  authorOrOrg: string;
  url: string;
  summary: string;
  keyInvariants: string[];
  applicableTopics: string[];
}

export const CURATED_LITERATURE_INDEX: LiteratureReference[] = [
  {
    id: 'react-19-actions-rfc',
    title: 'React 19 Actions & Async Transitions RFC',
    category: 'RFC',
    authorOrOrg: 'React Core Team',
    url: 'https://react.dev/reference/rsc/server-actions',
    summary: 'Defines useActionState, useOptimistic, and use() hook specifications for async data flow and transition batching without manual pending flags.',
    keyInvariants: [
      'useActionState binds form actions directly to state transitions with automated error rollbacks.',
      'useOptimistic provides deterministic client-side optimistic updates prior to async resolution.',
      'use() hook suspends on Promises and Context conditionally inside loops and branches.'
    ],
    applicableTopics: ['useActionState', 'useOptimistic', 'use', 'Transitions', 'Forms']
  },
  {
    id: 'cove-dhuliawala-2023',
    title: 'Chain-of-Verification Reduces Hallucination in Large Language Models',
    category: 'Academic Paper',
    authorOrOrg: 'Dhuliawala et al. (Meta AI, 2023)',
    url: 'https://arxiv.org/abs/2309.11495',
    summary: '4-step verification protocol (Draft -> Plan Verification Questions -> Answer Independently -> Synthesize Fact-Checked Response) to enforce strict factual grounding.',
    keyInvariants: [
      'Verification questions must execute without reference to initial ungrounded assumptions.',
      'Grounding in specifications eliminates hallucinated API signatures.'
    ],
    applicableTopics: ['AI Verification', 'Socratic Adjudication', 'Code Review']
  },
  {
    id: 'reflexion-shinn-2023',
    title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
    category: 'Academic Paper',
    authorOrOrg: 'Shinn et al. (NeurIPS 2023)',
    url: 'https://arxiv.org/abs/2303.11366',
    summary: 'Self-reflective verbal feedback loop where agents evaluate external error signals (compiler errors, test harness reports) to self-correct without weights updates.',
    keyInvariants: [
      'Reflections are stored in working memory to guide subsequent iterations.',
      'Compiler logs and AST error stacks provide objective ground truth for code repair.'
    ],
    applicableTopics: ['Sandbox Debugging', 'Code Copilot', 'Compiler Error Repair']
  },
  {
    id: 'v8-hidden-classes-inline-caching',
    title: 'V8 Engine Internals: Hidden Classes (Shapes) & Inline Caching (IC)',
    category: 'Engine Whitepaper',
    authorOrOrg: 'V8 Team / Google Chrome',
    url: 'https://v8.dev/blog/fast-properties',
    summary: 'In-depth analysis of V8 Shape transition trees, Property Cell types, Polymorphic/Megamorphic call sites, and memory optimization.',
    keyInvariants: [
      'Always initialize object properties in identical order in constructors to share Map/Shape.',
      'Megamorphic IC call sites (>4 distinct shapes) drop to slow dictionary lookups.',
      'Avoid delete operator which causes Shape deoptimization to Hash Table mode.'
    ],
    applicableTopics: ['V8 Internals', 'Hidden Classes', 'Memory Profiling', 'Inline Caching']
  },
  {
    id: 'whatwg-html-event-loop',
    title: 'WHATWG HTML Living Standard: Event Loops & Task Queues',
    category: 'Spec',
    authorOrOrg: 'WHATWG',
    url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loops',
    summary: 'Formal specification of Microtask queues (Promises, MutationObserver, queueMicrotask) vs Macrotask queues (setTimeout, I/O) and Rendering steps (requestAnimationFrame, Style, Layout, Paint).',
    keyInvariants: [
      'Microtask checkpoint drains completely after every JS execution context before any UI rendering step.',
      'requestAnimationFrame callbacks run immediately before CSS Style calculation and Layout dispatch.'
    ],
    applicableTopics: ['Event Loop', 'Microtasks', 'requestAnimationFrame', 'LoAF']
  },
  {
    id: 'webgpu-w3c-spec',
    title: 'W3C WebGPU & WGSL Shading Language Specification',
    category: 'Spec',
    authorOrOrg: 'W3C GPU for the Web Working Group',
    url: 'https://www.w3.org/TR/webgpu/',
    summary: 'Modern low-level API for high-performance 3D graphics and GPGPU general-purpose parallel compute shaders directly in the browser.',
    keyInvariants: [
      'GPUBuffer mapping for zero-copy CPU-GPU data transfers via writeBuffer / mapAsync.',
      'ComputePassEncoder dispatches massive parallel WGSL compute workgroups across thousands of GPU cores.'
    ],
    applicableTopics: ['WebGPU', 'High-Performance UI', 'Compute Shaders', 'Canvas']
  }
];

export interface ProjectInsideOutDetail {
  blueprint: ProjectBlueprint;
  whyChosen: string;
  syllabusCoveragePercentage: number;
  coveredSyllabusAreas: string[];
  suggestedExtensions: Array<{
    title: string;
    description: string;
    architecturalImpact: string;
  }>;
  interviewDefenseQuestions: Array<{
    question: string;
    modelAnswerKey: string;
    trapToAvoid: string;
  }>;
}

export const PROJECTS_INSIDE_OUT: Record<string, ProjectInsideOutDetail> = {
  'project-chronosgraph': {
    blueprint: PROJECT_BLUEPRINTS.find(p => p.id === 'project-chronosgraph')!,
    whyChosen: 'Tests local-first offline architecture, OPFS binary streaming, CRDT multi-device conflict-free convergence, and WebGPU compute layout for 100k nodes.',
    syllabusCoveragePercentage: 98,
    coveredSyllabusAreas: ['React 19 Actions & use()', 'WebGPU Compute', 'IndexedDB / OPFS', 'CRDTs', 'CSS Subgrid', 'Worker Offloading'],
    suggestedExtensions: [
      {
        title: 'Zero-Knowledge End-to-End Encryption (E2EE) Layer',
        description: 'Integrate WebCrypto AES-GCM 256-bit envelope encryption so CRDT vectors remain encrypted on relay servers while allowing client-side merges.',
        architecturalImpact: 'Requires streaming decryption in dedicated Web Worker before feeding Y.Doc state updates.'
      },
      {
        title: 'Incremental Spatial Hashing for Graph Viewport Culling',
        description: 'Replace brute-force bounding checks with a 2D spatial BVH (Bounding Volume Hierarchy) in a SharedArrayBuffer for instant 60 FPS viewport rendering.',
        architecturalImpact: 'Minimizes CPU-GPU memory bus saturation during rapid zooming across 100k nodes.'
      }
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why choose OPFS SyncAccessHandle over standard IndexedDB for markdown and graph state storage?',
        modelAnswerKey: 'OPFS SyncAccessHandle in a dedicated Web Worker provides synchronous, low-overhead direct file-system byte streaming, bypassing SQLite transaction serialization overhead in IndexedDB for large binary CRDT blobs.',
        trapToAvoid: 'Claiming OPFS is available on the main thread—SyncAccessHandle is strictly restricted to Dedicated Web Workers to prevent blocking UI layout.'
      },
      {
        question: 'How do state-based CRDT vectors prevent merge conflicts without a central locking server?',
        modelAnswerKey: 'State-based CRDTs employ a mathematically proven semi-lattice where the merge operation is Commutative, Associative, and Idempotent. Vector clocks track causal history, resolving concurrent edits deterministically without centralized locks.',
        trapToAvoid: 'Confusing Operational Transformation (OT - requires centralized ordering server) with CRDTs (peer-to-peer deterministic convergence).'
      }
    ]
  },
  'project-hypercanvas': {
    blueprint: PROJECT_BLUEPRINTS.find(p => p.id === 'project-hypercanvas')!,
    whyChosen: 'Tests custom React reconcilers, 2D vector geometry math, spatial indexing (R-Tree / BVH), zero-garbage memory recycling, and WebGL/WebGPU render batching.',
    syllabusCoveragePercentage: 100,
    coveredSyllabusAreas: ['Fiber & Custom Reconcilers', 'OffscreenCanvas', 'Spatial R-Tree', 'Memory & GC Optimization', 'PointerEvents'],
    suggestedExtensions: [
      {
        title: 'Collaborative Multi-Cursor Delta Streaming via WebRTC DataChannels',
        description: 'Add ultra-low-latency peer-to-peer cursor interpolation and viewport panning broadcasting over WebRTC UDP DataChannels.',
        architecturalImpact: 'Decouples high-frequency cursor updates (60Hz) from transactional canvas document persistence.'
      },
      {
        title: 'Shader-Driven Procedural Pattern & Texture Generator in WGSL',
        description: 'Allow custom infinite procedural canvas grid lines and dot matrices generated directly in WebGPU fragment shaders without raster image memory overhead.',
        architecturalImpact: 'Zero texture memory allocation regardless of canvas scale or zoom factor.'
      }
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why build a custom React reconciler (react-reconciler) instead of rendering DOM nodes into canvas with standard React DOM?',
        modelAnswerKey: 'Standard ReactDOM produces HTML elements with heavy DOM node objects (~60 properties per element). A custom reconciler maps JSX components directly to lightweight canvas vector nodes in memory, bypassing the DOM entirely for 60 FPS performance with 50,000+ objects.',
        trapToAvoid: 'Assuming canvas can inspect DOM events automatically—all hit testing must be calculated via point-in-polygon math or spatial R-Tree indices.'
      }
    ]
  },
  'project-pulseui': {
    blueprint: PROJECT_BLUEPRINTS.find(p => p.id === 'project-pulseui')!,
    whyChosen: 'Tests headless design system architecture, WCAG 2.2 AAA accessibility, sub-millisecond keyboard navigation, floating UI collision math, and zero-runtime CSS tokens.',
    syllabusCoveragePercentage: 96,
    coveredSyllabusAreas: ['Component Architecture', 'WCAG AAA Accessibility', 'ARIA 1.2 Patterns', 'Focus Traps & Rings', 'CSS Tokens'],
    suggestedExtensions: [
      {
        title: 'Automated Headless A11y Axe-Core Assertion Worker',
        description: 'Embed a background worker running continuous axe-core invariant audits on DOM mutation trees during development mode.',
        architecturalImpact: 'Detects missing aria-live regions, contrast failures, and broken focus loops before production deployment.'
      }
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you engineer a bulletproof focus trap for accessible modals without trapping screen reader virtual cursors?',
        modelAnswerKey: 'Implement roving tabindex combined with keydown listener intercepting Tab and Shift+Tab on boundary sentinel nodes, while assigning role="dialog", aria-modal="true", and restoring focus to the original trigger element on unmount.',
        trapToAvoid: 'Using display: none on background elements while forgetting to lock body scroll or restore activeElement on close.'
      }
    ]
  },
  'project-quantumtrade': {
    blueprint: PROJECT_BLUEPRINTS.find(p => p.id === 'project-quantumtrade')!,
    whyChosen: 'Tests high-frequency financial streaming, 100,000 updates/sec L2 order books, WebAssembly binary decoding, ArrayBuffer ring buffers, and microtask scheduling.',
    syllabusCoveragePercentage: 99,
    coveredSyllabusAreas: ['WebSockets & Binary Streaming', 'WebAssembly / Rust', 'TypedArrays & Ring Buffers', 'RAF Batching', 'LoAF Profiling'],
    suggestedExtensions: [
      {
        title: 'SharedArrayBuffer Multithreaded Worker-to-Canvas Zero-Copy Pipeline',
        description: 'Stream incoming market ticks directly from WebSocket worker into a SharedArrayBuffer ring buffer, rendered by an OffscreenCanvas worker via Atomics.',
        architecturalImpact: 'Main thread CPU utilization drops to 0% during massive market volatility spikes.'
      }
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why are standard React state updates (useState) fatal during 100,000 tick/sec market data ingestion?',
        modelAnswerKey: 'Each useState dispatch triggers React reconciliation and Fiber tree diffing. At 100k events/sec, the JS event loop becomes saturated with microtask rendering, resulting in Long Animation Frames (LoAF > 500ms) and UI lockup. The solution is buffering in a TypedArray ring buffer and throttling visual updates to requestAnimationFrame.',
        trapToAvoid: 'Suggesting useEffect debouncing—debouncing drops critical intermediate order book state changes instead of aggregating them cleanly.'
      }
    ]
  }
};

export const SANDBOX_TEMPLATES = {
  'counter-advanced': {
    title: 'React 19 Action & Optimistic Counter',
    jsx: `import React, { useState, useOptimistic, useTransition } from 'react';

export default function AdvancedCounter() {
  const [count, setCount] = useState(10);
  const [isPending, startTransition] = useTransition();
  const [optimisticCount, setOptimisticCount] = useOptimistic(
    count,
    (state, update: number) => state + update
  );

  const handleIncrement = async (amount: number) => {
    startTransition(async () => {
      setOptimisticCount(amount);
      // Simulate network roundtrip latency
      await new Promise(r => setTimeout(r, 600));
      setCount(c => c + amount);
    });
  };

  return (
    <div className="card">
      <h2>React 19 Optimistic State</h2>
      <div className="display">
        <span className="value">{optimisticCount}</span>
        {isPending && <span className="syncing">Syncing with server...</span>}
      </div>
      <div className="btn-group">
        <button onClick={() => handleIncrement(1)}>+1 Instant</button>
        <button onClick={() => handleIncrement(5)}>+5 Instant</button>
        <button onClick={() => handleIncrement(-1)}>-1 Instant</button>
      </div>
    </div>
  );
}`,
    css: `.card { max-width: 380px; margin: 24px auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #1e293b; font-family: system-ui; }
.display { display: flex; align-items: baseline; gap: 12px; margin: 16px 0; }
.value { font-size: 3rem; font-weight: 900; color: #38bdf8; }
.syncing { font-size: 0.75rem; color: #fbbf24; animation: pulse 1.5s infinite; }
.btn-group { display: flex; gap: 8px; }
button { flex: 1; padding: 8px 12px; background: #0284c7; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
button:hover { background: #0369a1; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`
  },
  'virtual-list': {
    title: 'Fixed-Height Virtualized List (Zero-Dependency)',
    jsx: `import React, { useState, useRef } from 'react';

const ITEM_HEIGHT = 44;
const VIEWPORT_HEIGHT = 320;
const TOTAL_ITEMS = 10000;
const ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  name: \`Virtual Item #\${i + 1}\`,
  metric: Math.round(Math.sin(i) * 100)
}));

export default function VirtualList() {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 3);
  const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + 6;
  const endIndex = Math.min(TOTAL_ITEMS, startIndex + visibleCount);

  const visibleItems = ITEMS.slice(startIndex, endIndex);
  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div className="virtual-wrap">
      <h3>10,000 Node Virtualizer (O(1) DOM Footprint)</h3>
      <div
        ref={containerRef}
        className="scroll-container"
        style={{ height: VIEWPORT_HEIGHT }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: TOTAL_ITEMS * ITEM_HEIGHT, position: 'relative' }}>
          <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
            {visibleItems.map(item => (
              <div key={item.id} className="item-row" style={{ height: ITEM_HEIGHT }}>
                <span className="name">{item.name}</span>
                <span className="metric">{item.metric} ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
    css: `.virtual-wrap { max-width: 440px; margin: 20px auto; padding: 20px; background: #090d16; border: 1px solid #1e293b; border-radius: 12px; color: #f1f5f9; font-family: system-ui; }
.scroll-container { overflow-y: auto; border: 1px solid #334155; border-radius: 8px; background: #020617; }
.item-row { display: flex; justify-content: space-between; align-items: center; padding: 0 16px; border-bottom: 1px solid #1e293b; box-sizing: border-box; }
.name { font-size: 13px; font-weight: 600; color: #e2e8f0; }
.metric { font-size: 11px; font-family: monospace; color: #38bdf8; }`
  }
};

/**
 * Searches the curated literature index by keywords
 */
export function searchCuratedLiterature(query: string): LiteratureReference[] {
  if (!query.trim()) return CURATED_LITERATURE_INDEX;
  const q = query.toLowerCase();
  return CURATED_LITERATURE_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.summary.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.applicableTopics.some(t => t.toLowerCase().includes(q)) ||
    item.keyInvariants.some(k => k.toLowerCase().includes(q))
  );
}

/**
 * Generates an interactive game duel for any topic
 */
export function generateGamifiedDuel(topicTitle: string, area: string) {
  return {
    duelTitle: `⚡ Rapid Clash: ${topicTitle}`,
    badge: 'Real-Time Dialectic',
    questions: [
      {
        question: `In a high-throughput React system, what is the primary invariant for "${topicTitle}"?`,
        options: [
          'It guarantees O(1) time complexity by caching all intermediate states in localStorage.',
          'It enforces deterministic state transformations while avoiding main-thread Long Animation Frames (LoAF).',
          'It disables the Fiber reconciler tree diffing algorithm completely.',
          'It replaces the browser microtask queue with a native synchronous thread.'
        ],
        correctIndex: 1,
        explanation: `Under the hood, "${topicTitle}" aligns with the React 19 concurrent runtime by batching state changes and preserving main-thread responsiveness.`
      },
      {
        question: `When debugging memory leaks related to "${topicTitle}", what should you inspect in Chrome DevTools?`,
        options: [
          'Retainer trees in Heap Snapshots for un-cleaned event listeners and detached DOM nodes.',
          'The CSS style rules panel for unused classes.',
          'The network tab status code for 200 OK headers.',
          'The cookie expiration date timestamps.'
        ],
        correctIndex: 0,
        explanation: 'Heap Snapshot retainers reveal root references preventing the V8 Garbage Collector from reclaiming memory.'
      }
    ]
  };
}
