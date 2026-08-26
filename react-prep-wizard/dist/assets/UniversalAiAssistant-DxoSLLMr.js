import{j as e}from"./vendor-editor-Buc7zKFR.js";import{r as u}from"./vendor-react-KgNWHp-S.js";import{P as ie,c as ne,G as se,M as oe,R as ce,X as le,L as $,C as q,S as _,B as de,F as ue,a as pe}from"./FormattedMarkdown-jzSVFpIQ.js";import{c as W,R as me,Z as J,S as j}from"./index-DJm91rUh.js";import{C as Q}from"./circle-check-BhSudPQK.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Z=W("book-open",ge);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],K=W("code-xml",he);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],X=W("compass",fe);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],be=W("external-link",ye),Se={id:"project-hypercanvas",title:"HyperCanvas: Ultra-Low Latency Infinite Vector Canvas",tagline:"Infinite vector canvas engine with 120 FPS WebGL rendering, CRDT multi-user cursors & OffscreenCanvas.",realWorldAnalog:"Figma / Miro / Excalidraw Core Engine",difficulty:"Principal",estimatedBuildTimeHours:2.5,architecturePattern:"Clean Hexagonal + CQRS + Entity-Component System (ECS)",summary:"Build a high-performance infinite whiteboard handling 50,000+ vector shapes with sub-16ms latency. Minimal feature breadth (no auth, no billing, no menu bloat) with maximum architectural depth: WebGL2 OffscreenCanvas, BVH spatial indexing, binary WebSocket sync, and local-first CRDTs.",tags:["WebGL","OffscreenCanvas","CRDTs","WebSockets","Web Workers","Spatial Indexing"],xpBounty:500,coreScopeBoundaries:{inScopeMinimal:["50,000 vector shapes on an infinite pan/zoom canvas.","OffscreenCanvas WebGL2 worker pipeline running at 120 FPS.","Spatial R-Tree/BVH frustum culling O(log N).","Binary WebSocket CRDT state vector multi-user cursor sync.","CSS Subgrid multi-property token inspector panel."],outOfScopeBloat:["Multi-tenant authentication & OAuth screens.","PDF/SVG complex file export wizards.","Cloud billing & team permission hierarchies.","Rich text font kerning & paragraph formatting."]},stages:[{stageNumber:1,stageName:"Minimal Working Prototype",focus:"Main-Thread React State Canvas",codeSnippet:`// Stage 1: Naïve 2D Canvas in React State
function NaiveCanvas() {
  const [shapes, setShapes] = useState<Shape[]>(() => generate50kShapes());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach(s => {
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x, s.y, s.w, s.h); // Main-thread synchronous loop
    });
  }, [shapes]);

  return <canvas ref={canvasRef} onMouseMove={e => setShapes(updateActive(e))} />;
}`,failureModeOrInvariant:"Main-thread loop over 50,000 shapes takes 180ms per frame. Frame rate drops to 5 FPS with catastrophic INP jank (>200ms).",architecturalLesson:"Direct React state mutation cannot scale to high-frequency vector manipulation. UI state must be decoupled from the rendering pipeline."},{stageNumber:2,stageName:"The Production Breakdown",focus:"V8 Minor GC Churn & Multiplayer Race Conditions",codeSnippet:`// Stage 2: JSON Broadcast & Object Churn
function broadcastMove(id: string, x: number, y: number) {
  // Allocates 1000s of ephemeral objects/sec -> V8 nursery GC freezes
  ws.send(JSON.stringify({ type: 'MOVE', id, x, y, timestamp: Date.now() }));
}

// Last-Write-Wins Race: Simultaneous edits overwrite each other
ws.onmessage = (e) => {
  const update = JSON.parse(e.data);
  setShapes(prev => prev.map(s => s.id === update.id ? { ...s, ...update } : s));
};`,failureModeOrInvariant:"JSON stringification creates 50MB/s of ephemeral heap objects triggering stop-the-world GC pauses. Uncoordinated updates cause shape overwrites.",architecturalLesson:"Multiplayer vector engines require binary serialization to eliminate GC churn and commutative CRDTs to prevent data loss."},{stageNumber:3,stageName:"The Canonical Concept Evolution",focus:"OffscreenCanvas WebGL2 Worker + BVH Spatial Index + Binary CRDT",codeSnippet:`// Stage 3: OffscreenCanvas + BVH Frustum Culling + Yjs Binary CRDT
// Main Thread Handoff
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ type: 'INIT', canvas: offscreen }, [offscreen]);

// Dedicated Render Worker
const bvh = new BVHTree(50000);
function renderLoop() {
  const visible = bvh.queryFrustum(camera.getAABB());
  packVerticesToStaticBuffer(visible, vertexBuffer);
  gl.uniformMatrix3fv(uMatrixLoc, false, camera.getViewMatrix());
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, visible.length);
  requestAnimationFrame(renderLoop);
}`,failureModeOrInvariant:"Rendering is offloaded 100% to Web Workers. BVH culls 49,900 offscreen shapes in O(log N) time, locking framerate at a steady 120 FPS.",architecturalLesson:"Leverage WebGL2 instancing, off-main-thread compute, and binary state vectors for institutional-scale graphics."},{stageNumber:4,stageName:"Production Hardening & Design Elegance",focus:"CSS Subgrid Inspector, Virtual A11y Tree & Float32 Pooling",codeSnippet:`// Stage 4: React 19 Optimistic Subgrid Inspector & A11y Mirror
export function CanvasInspector({ selectedShape }: { selectedShape: Shape }) {
  const [optimisticShape, setOptimisticShape] = useOptimistic(selectedShape);
  return (
    <div className="inspector-subgrid">
      <label>Position X</label>
      <input value={optimisticShape.x} onChange={e => setOptimisticShape({ ...optimisticShape, x: +e.target.value })} />
    </div>
  );
}
// CSS: .inspector-subgrid { display: grid; grid-template-columns: subgrid; }`,failureModeOrInvariant:"Zero layout shift across nested property inputs. Screen readers navigate hidden AOM mirror with full ARIA semantics.",architecturalLesson:"True masterclass engineering combines raw performance with polished UI design systems and WCAG accessibility."}],layers:[{layer:"Presentation",components:["React 19 Shell","OffscreenCanvas WebGL Viewport","Multiplayer Cursor LERP","Subgrid Token Panel"],invariants:["Zero main-thread vector drawing; UI renders only chrome and tools."]},{layer:"Application",components:["BVH Spatial Index","CRDT Sync Coordinator","CQRS Undo/Redo Engine","A11y Virtual Mirror"],invariants:["O(log N) frustum culling before dispatching draw calls."]},{layer:"Domain",components:["VectorShape Entity","Transform Mat3x3 Value Object","State Vector Clock"],invariants:["Commutative CRDT merges guarantee identical state across peers."]},{layer:"Infrastructure",components:["WebSocket Binary Protobuf","Comlink Worker Pool","Float32 Memory Pools"],invariants:["Zero heap allocations during steady-state 120 FPS loops."]}],explicitTopics:[{category:"React 19",topic:"useOptimistic",subtopic:"Real-Time Shape Transforms",howCovered:"Instantly applies shape transforms and layer orders before peer confirmation."},{category:"Performance",topic:"INP & Long Tasks",subtopic:"OffscreenCanvas Offloading",howCovered:"Offloads all vector math and draw calls to Web Workers via OffscreenCanvas."},{category:"Web Platform",topic:"Web Workers",subtopic:"Zero-Copy Transferables",howCovered:"Transfers ArrayBuffers without cloning between UI and render workers."},{category:"CSS",topic:"Modern CSS",subtopic:"Subgrid & Container Queries",howCovered:"Property inspector aligned via CSS Subgrid with @container adaptive cards."}],implicitFoundations:[{domain:"Internet & Protocols",title:"WebSocket Binary Framing",mechanism:"Protobuf binary encoding over raw TCP.",realWorldImpact:"Reduces network packet payload by 80% compared to JSON."},{domain:"V8 Engine & Memory",title:"V8 Heap Nursery Bypassing",mechanism:"Float32Array static memory pooling.",realWorldImpact:"Zero GC pauses during 120 FPS high-frequency dragging."},{domain:"DOM & Browser Pipeline",title:"Compositor Layer Promotion",mechanism:"will-change: transform on viewport container.",realWorldImpact:"Eliminates layout and paint reflows during zoom."},{domain:"Security & Invariants",title:"SVG Vector Sanitization",mechanism:"DOMPurify sanitization on imported SVG vectors.",realWorldImpact:"Prevents stored XSS payloads in shared whiteboard sessions."}],frameworkVsManual:{frameworkHandled:["React Fiber scheduling for tool chrome.","Synthetic event delegation on overlay controls."],manualEngineeringRequired:["WebGL2 shaders and Mat3x3 matrix math.","BVH spatial tree indexing in Web Workers.","Binary CRDT vector synchronization."]}},ve={id:"project-quantumtrade",title:"QuantumTrade: High-Frequency Order Book & Telemetry Terminal",tagline:"Institutional-grade real-time market depth terminal processing 250k events/sec with zero GC stutter.",realWorldAnalog:"Bloomberg Terminal / Binance Pro / TradingView L2 Book",difficulty:"Principal",estimatedBuildTimeHours:2.5,architecturePattern:"Hexagonal + Lock-Free SPSC Circular Rings + WASM Book Kernel",summary:"Build a high-frequency financial terminal processing 250,000 depth updates per second with sub-16ms end-to-end glass latency. Minimal scope (single L2 book, depth heatmap, one-click order form) with maximum architectural depth: SharedArrayBuffer, Atomics SPSC ring, fixed-point Int64 math, and useSyncExternalStore.",tags:["High Frequency","SharedArrayBuffer","WASM","WebGL","Binary WebSockets","SPSC Rings"],xpBounty:500,coreScopeBoundaries:{inScopeMinimal:["250,000 events/sec binary feed ingestion in dedicated Web Worker.","Lock-Free SPSC circular ring on 10MB SharedArrayBuffer with Atomics.","120Hz coalesced WebGL2 liquidity depth heatmap.","Fixed-point scaled integer arithmetic (Price * 10^8).","React 19 useSyncExternalStore tear-free subscription."],outOfScopeBloat:["Multi-exchange brokerage OAuth logins.","10-year historical candlestick backtesting engine.","Complex tax and multi-currency accounting ledgers.","Social chat rooms and trader leaderboards."]},stages:[{stageNumber:1,stageName:"Minimal Working Prototype",focus:"React State Order Book & JSON WebSocket",codeSnippet:`// Stage 1: Naïve JSON Feed & React State
function NaiveOrderBook() {
  const [bids, setBids] = useState<Record<number, number>>({});

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // JSON parse overhead
      setBids(prev => ({ ...prev, [data.price]: data.qty })); // Object clone nursery churn
    };
  }, []);

  return <table>{Object.entries(bids).map(([p, q]) => <tr key={p}><td>{p}</td><td>{q}</td></tr>)}</table>;
}`,failureModeOrInvariant:"Parsing 250,000 JSON messages/sec generates 50MB/s of ephemeral objects, triggering frequent 80ms V8 Stop-The-World GC pauses.",architecturalLesson:"High-velocity market feeds cannot use JSON or React state directly. Ingestion must be zero-copy and decoupled from UI render ticks."},{stageNumber:2,stageName:"The Production Breakdown",focus:"IEEE-754 Float Precision Loss & Concurrent State Tearing",codeSnippet:`// Stage 2: Float Math & State Tearing Under Concurrency
function calculateVWAP(orders: Order[]) {
  // 0.1 + 0.2 === 0.30000000000000004 IEEE-754 rounding drift
  return orders.reduce((acc, o) => acc + (o.price * o.qty), 0) / totalQty;
}

// Concurrent React render tear: numbers update mid-frame
const depth = useStore(s => s.depth);`,failureModeOrInvariant:"IEEE-754 binary floating point introduces rounding inaccuracies in financial matching. High-frequency state updates cause visual UI tearing.",architecturalLesson:"Financial engines must use 64-bit fixed-point integers and tear-free subscription contracts like useSyncExternalStore."},{stageNumber:3,stageName:"The Canonical Concept Evolution",focus:"Zero-Copy SBE + SharedArrayBuffer Atomics Ring + useSyncExternalStore",codeSnippet:`// Stage 3: SharedArrayBuffer Lock-Free SPSC Ring
// Feed Worker (Producer)
const writeIdx = Number(Atomics.load(headPtr, 0) & BigInt(RING_CAPACITY - 1)) * 16;
ringView.setBigInt64(writeIdx, priceScaledInt64, true);
ringView.setBigInt64(writeIdx + 8, volumeScaledInt64, true);
Atomics.add(headPtr, 0, 1n);
Atomics.notify(headPtr, 0, 1);

// React 19 UI: Tear-Free useSyncExternalStore
export function useDepth(symbol: string) {
  return useSyncExternalStore(
    notify => ringStore.subscribe(symbol, notify),
    () => ringStore.getSnapshot(symbol)
  );
}`,failureModeOrInvariant:"Zero heap allocations during steady-state ingestion. Ingestion and rendering execute concurrently across multi-core workers without locks.",architecturalLesson:"SharedArrayBuffer with atomic memory barriers enables true zero-latency inter-thread streaming in the browser."},{stageNumber:4,stageName:"Production Hardening & Design Elegance",focus:"64-Byte Cache-Line Padding, WebGL PBO Heatmap & CSS Containment",codeSnippet:`// Stage 4: 64-Byte Cache-Line False Sharing Padding
// Align atomic pointers to distinct 64-byte hardware cache lines
const HEAD_PTR_OFFSET = 0;
const TAIL_PTR_OFFSET = 64; // Prevents CPU L1/L2 cache invalidation storms

// CSS Strict Containment on Terminal Widget
// .market-ladder { contain: strict; content-visibility: auto; }`,failureModeOrInvariant:"Eliminates multi-core CPU cache line thrashing. CSS containment isolates 120 FPS high-density canvas updates from document reflows.",architecturalLesson:"Hardware-aware data layout and CSS containment are required for true sub-16ms institutional terminal performance."}],layers:[{layer:"Presentation",components:["React 19 Shell","OffscreenCanvas Price Ladder","WebGL Liquidity Heatmap","Risk Validator"],invariants:["Tear-free subscriptions via useSyncExternalStore; zero DOM re-render during ticks."]},{layer:"Application",components:["120Hz Coalescing Scheduler","SPSC Ring Coordinator","VWAP Fixed-Point Engine"],invariants:["Aggregates 250k events/sec into 120Hz display tick slices."]},{layer:"Domain",components:["L2 Order Book Entity","Int64 Fixed-Point Value Object","Trade Tape Ring"],invariants:["Prices represented as scaled 64-bit integers (Price * 10^8)."]},{layer:"Infrastructure",components:["Binary Feed Worker","SharedArrayBuffer SPSC Queue","WebGL PBO Texture Uploader"],invariants:["Zero-copy byte deserialization with DataView directly over network ArrayBuffers."]}],explicitTopics:[{category:"React 19",topic:"useSyncExternalStore",subtopic:"Tear-Free Subscriptions",howCovered:"Subscribes directly to memory-mapped binary state store with zero UI tearing."},{category:"Performance",topic:"Zero-Allocation Invariants",subtopic:"V8 Nursery Bypassing",howCovered:"Static memory pre-allocation eliminates 100% of V8 young-generation GC pauses."},{category:"Web Platform",topic:"SharedArrayBuffer & Atomics",subtopic:"Lock-Free SPSC Queue",howCovered:"Multi-threaded lock-free communication between ingestion worker and render worker."},{category:"Security & Invariants",topic:"Cross-Origin Isolation",subtopic:"COOP & COEP Headers",howCovered:"Configures COOP same-origin headers to unlock SharedArrayBuffer."}],implicitFoundations:[{domain:"Internet & Protocols",title:"TCP_NODELAY & Nagle Bypassing",mechanism:"Raw binary WebSockets with disabled packet coalescing.",realWorldImpact:"Eliminates 40ms of socket packet buffering latency."},{domain:"V8 Engine & Memory",title:"Generational GC Hypothesis",mechanism:"Zero dynamic object allocations in steady-state loop.",realWorldImpact:"Prevents full-stop GC freezes during high-volume market bursts."},{domain:"DOM & Browser Pipeline",title:"Layout Containment (contain: strict)",mechanism:"Strict CSS layout containment on terminal widget.",realWorldImpact:"Prevents parent document reflow triggers during 120 FPS rendering."},{domain:"Security & Invariants",title:"64-Byte Cache-Line Padding",mechanism:"Aligns atomic pointers to distinct hardware cache lines.",realWorldImpact:"Eliminates multi-core CPU cache invalidation storms."}],frameworkVsManual:{frameworkHandled:["React concurrent scheduler for order inputs.","Accessibility focus rings for trading keybindings."],manualEngineeringRequired:["Lock-free SPSC ring buffer with Atomics synchronization.","Direct DataView binary parsing and fixed-point math.","WebGL2 PBO texture depth upload loop."]}},we={id:"project-chronosgraph",title:"ChronosGraph: Local-First Knowledge IDE with WebGPU & CRDTs",tagline:"Offline-sync Markdown & knowledge graph IDE with WebGPU AST rendering, OPFS storage, and state-based CRDTs.",realWorldAnalog:"Obsidian / Notion / Roam Research Core",difficulty:"Staff",estimatedBuildTimeHours:2.5,architecturePattern:"Local-First Clean Architecture + CRDT DAG + WebGPU Compute",summary:"Build a local-first personal knowledge management IDE operating with zero network latency. Minimal scope (Markdown editor, 100k-node graph, offline CRDT sync) with maximum architectural depth: OPFS SyncAccessHandle, WebGPU WGSL compute shaders, and TanStack Query offline persistence.",tags:["Local-First","WebGPU","IndexedDB / OPFS","CRDTs","React 19","TanStack Query"],xpBounty:450,coreScopeBoundaries:{inScopeMinimal:["Local-first Markdown note editor with instant persistence.","100,000-node force-directed graph running on WebGPU compute shaders.","Offline-first CRDT state vector synchronization over WebSockets.","CSS Subgrid hierarchical outliner property table."],outOfScopeBloat:["Third-party plugin store & sandbox runtime.","Live multiplayer voice chat channels.","Complex enterprise multi-tenant team billing.","PDF annotation and drawing toolbars."]},stages:[{stageNumber:1,stageName:"Minimal Working Prototype",focus:"Main-Thread LocalStorage & D3 SVG Graph",codeSnippet:`// Stage 1: Main-Thread Storage & D3 SVG Force Layout
function NaiveGraph({ nodes, links }: { nodes: Node[]; links: Link[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // O(N^2) CPU physics simulation blocks main thread
    const sim = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(links))
      .on('tick', () => {
        // Manipulates 10,000 DOM SVG elements per frame
        d3.select(svgRef.current).selectAll('circle').attr('cx', d => d.x).attr('cy', d => d.y);
      });
    return () => sim.stop();
  }, [nodes, links]);

  return <svg ref={svgRef} />;
}`,failureModeOrInvariant:"D3 CPU force simulation chokes at >2,000 nodes, dropping framerates to <1 FPS. Serializing vaults to localStorage freezes user typing.",architecturalLesson:"O(N^2) graph layout physics cannot run on the CPU main thread. Storage and compute must be offloaded to dedicated workers and GPU kernels."},{stageNumber:2,stageName:"The Production Breakdown",focus:"Offline Sync Race Conditions & Stored XSS",codeSnippet:`// Stage 2: Naïve HTTP Sync & Raw HTML Injection
async function saveNote(note: Note) {
  localStorage.setItem(note.id, JSON.stringify(note));
  // Last-Write-Wins HTTP POST wipes out peer edits on reconnect
  await fetch('/api/notes', { method: 'POST', body: JSON.stringify(note) });
}

// Stored XSS vulnerability in markdown renderer
function MarkdownPreview({ raw }: { raw: string }) {
  return <div dangerouslySetInnerHTML={{ __html: marked.parse(raw) }} />;
}`,failureModeOrInvariant:"Reconnecting after offline editing causes silent data overwrites. Raw markdown parsing allows malicious script injections in shared vaults.",architecturalLesson:"Local-first architecture requires state-based CRDTs for deterministic convergence and AST-level sanitization for zero-trust security."},{stageNumber:3,stageName:"The Canonical Concept Evolution",focus:"WebGPU WGSL Compute + OPFS SyncAccessHandle + Yjs CRDT",codeSnippet:`// Stage 3: WebGPU Compute Shaders + Dedicated Worker OPFS
// Dedicated Storage Worker
const root = await navigator.storage.getDirectory();
const file = await root.getFileHandle('vault.bin', { create: true });
const syncHandle = await file.createSyncAccessHandle();
syncHandle.write(crdtBinaryUpdate, { at: 0 });
syncHandle.flush();

// WebGPU N-Body Force Compute Pass (WGSL)
/* @compute @workgroup_size(64)
fn simulate_forces(@builtin(global_invocation_id) id: vec3<u32>) {
  nodes[id.x].position += nodes[id.x].velocity * params.dt;
} */`,failureModeOrInvariant:"100,000 graph nodes run at steady 60 FPS on GPU. Synchronous OPFS file access handles eliminate IndexedDB IPC serialization latency.",architecturalLesson:"WebGPU compute passes unlock desktop-grade data scale; OPFS provides native file system streaming in the browser."},{stageNumber:4,stageName:"Production Hardening & Design Elegance",focus:"CSS Subgrid Outliner, AST Sanitization & Storage Quota",codeSnippet:`// Stage 4: Subgrid Outliner & AST Sanitization
export function OutlinerBlock({ block }: { block: ASTBlock }) {
  return (
    <div className="outliner-row">
      <span className="bullet">•</span>
      <SanitizedContent content={block.sanitizedAST} />
      <span className="meta">{block.timestamp}</span>
    </div>
  );
}
// CSS: .outliner-row { display: grid; grid-template-columns: subgrid; }`,failureModeOrInvariant:"Knowledge outliner rows stay perfectly aligned across nested depths. Persistent storage quota prevents browser eviction.",architecturalLesson:"Production local-first apps must defend persistence guarantees with navigator.storage.persist() and AST sanitizers."}],layers:[{layer:"Presentation",components:["React 19 Shell","WebGPU Graph Viewport","Subgrid Outliner","Vault Tree"],invariants:["useOptimistic handles instant UI updates; use() suspends on local OPFS file reads."]},{layer:"Application",components:["Graph CQRS Interactors","TanStack Offline Mutation Queue","CRDT Merge Coordinator"],invariants:["All state writes go to local storage first before sync propagation."]},{layer:"Domain",components:["Vault Entity","CRDT State Vector Clock","Markdown AST"],invariants:["Commutative CRDT merges guarantee identical state across peers."]},{layer:"Infrastructure",components:["OPFS Streaming Handle","WebGPU WGSL Shaders","WebSocket Gateway"],invariants:["N-body physics runs exclusively on WebGPU compute passes."]}],explicitTopics:[{category:"React 19",topic:"RSC & use() Hook",subtopic:"Resource Suspension",howCovered:"Suspends block rendering while local OPFS file streams resolve directly in JSX."},{category:"Data & APIs",topic:"TanStack Query v5",subtopic:"Offline Mutation Persist",howCovered:"Enqueues offline mutations and merges differential CRDT diffs seamlessly."},{category:"CSS",topic:"Modern CSS",subtopic:"Subgrid & Container Queries",howCovered:"Subgrid aligns nested outliner block tags, authors, and timestamps."},{category:"Performance",topic:"WebGPU Shaders",subtopic:"GPU Compute Passes",howCovered:"WGSL compute shaders offload O(N^2) force physics to the GPU."}],implicitFoundations:[{domain:"Internet & Protocols",title:"HTTP Weak ETags (W/)",mechanism:"Conditional requests to skip downloading unmodified vault sync bundles.",realWorldImpact:"Reduces sync bandwidth by 95% across active sessions."},{domain:"DOM & Browser Pipeline",title:"Background Sync API",mechanism:"Service worker intercepts offline requests and triggers Background Sync on reconnect.",realWorldImpact:"Guarantees zero data loss even if the browser tab is closed."},{domain:"V8 Engine & Memory",title:"ArrayBuffer Shared Views",mechanism:"Zero-copy views over binary CRDT vectors using TypedArrays.",realWorldImpact:"Eliminates memory duplication during worker exchanges."},{domain:"Security & Invariants",title:"Zero-Trust AST Sanitization",mechanism:"AST visitor stripping dangerous javascript: protocols prior to render.",realWorldImpact:"Prevents stored XSS attacks inside shared knowledge graphs."}],frameworkVsManual:{frameworkHandled:["TanStack Query query deduplication and garbage collection.","React 19 Suspense fallback coordination."],manualEngineeringRequired:["WGSL Compute & Render shaders for WebGPU graph physics.","Custom Markdown AST token stream parser in Web Workers.","Binary CRDT state vector synchronization and OPFS file access."]}},ke={id:"project-pulseui",title:"PulseUI: Server-Driven UI (SDUI) Orchestrator & Micro-Frontend Hub",tagline:"Enterprise SDUI and federated micro-app orchestrator streaming dynamic component trees with RSC & Subgrid.",realWorldAnalog:"Airbnb Dynamic Layout / Uber Modular Marketplace",difficulty:"Staff",estimatedBuildTimeHours:2.5,architecturePattern:"Server-Driven UI (SDUI) BFF + Module Federation 2.0 + Hexagonal Shell",summary:"Build an enterprise Server-Driven UI orchestrator streaming backend layout ASTs and remote federated micro-apps with zero client crashes. Minimal scope (4 layout primitives, dynamic remote loader, action bus) with maximum architectural depth: Zod AST validation, Module Federation 2.0 with SRI, and CSS Subgrid multi-card alignment.",tags:["SDUI","Micro-Frontends","Module Federation","RSC","CSS Subgrid","Enterprise"],xpBounty:450,coreScopeBoundaries:{inScopeMinimal:["Server-driven layout stream parsing 4 core primitives (Hero, Carousel, BentoGrid, ActionCard).","Module Federation 2.0 dynamic remote loader with SRI validation.","Declarative Command Bus for server actions (NAVIGATE, MODAL, MUTATE).","CSS Subgrid multi-card baseline alignment with @container queries."],outOfScopeBloat:["Visual drag-and-drop WYSIWYG page builders.","Multi-cloud CDN deployment managers.","End-user role RBAC administration portals.","Full analytics reporting chart suites."]},stages:[{stageNumber:1,stageName:"Minimal Working Prototype",focus:"Naïve Switch Statement & Dynamic Script Tag",codeSnippet:`// Stage 1: Naïve Switch & Unvetted Script Injection
function NaiveSDUIRenderer({ layout }: { layout: any }) {
  return (
    <div>
      {layout.components.map((c: any) => {
        switch (c.type) {
          case 'hero': return <Hero data={c.data} />;
          case 'card': return <Card data={c.data} />;
          default: return <div>Unknown: {c.type}</div>;
        }
      })}
    </div>
  );
}`,failureModeOrInvariant:"Backend introducing a new component type before client release crashes the parser. Unsandboxed script tags allow rogue micro-frontends to crash the entire host app.",architecturalLesson:"Server-Driven UI requires recursive schema validation with graceful unknown node fallbacks, and micro-frontends require isolated error boundaries."},{stageNumber:2,stageName:"The Production Breakdown",focus:"Layout Shift (CLS) & Detached DOM Memory Leaks",codeSnippet:`// Stage 2: Asynchronous Remote Injection & Memory Leaks
function loadRemote(url: string) {
  const script = document.createElement('script');
  script.src = url; // No SRI hash verification
  document.head.appendChild(script);
  // Detached DOM: Switching remotes fails to unmount old React roots
}`,failureModeOrInvariant:"Remote components loading asynchronously cause severe Cumulative Layout Shift (CLS). Unmounted micro-apps leak window listeners and detached DOM trees.",architecturalLesson:"Micro-frontends must enforce strict layout sizing reservations and explicit teardown lifecycles."},{stageNumber:3,stageName:"The Canonical Concept Evolution",focus:"Recursive Zod AST Schema + Module Federation 2.0 with SRI + RSC",codeSnippet:`// Stage 3: Zod AST Validation + Sandboxed Remote Loader
export const SDUINodeSchema: z.ZodType<SDUINode> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('hero'), id: z.string(), title: z.string() }),
    z.object({ type: z.literal('grid'), id: z.string(), children: z.array(SDUINodeSchema) }),
    z.object({ type: z.literal('unknown'), id: z.string(), rawType: z.string() })
  ])
);

// Sandboxed Error Boundary Wrapper
export function SDUISlot({ node }: { node: SDUINode }) {
  return (
    <ErrorBoundary fallback={<SDUIFallbackCard node={node} />}>
      <Suspense fallback={<SDUISkeleton type={node.type} />}>
        <DynamicFederatedComponent node={node} />
      </Suspense>
    </ErrorBoundary>
  );
}`,failureModeOrInvariant:"Zero client crashes on unknown server types. Federated remotes are verified with cryptographic SRI hashes and isolated by ErrorBoundaries.",architecturalLesson:"Type-safe AST contracts and dependency sandboxing enable bulletproof enterprise server-driven architectures."},{stageNumber:4,stageName:"Production Hardening & Design Elegance",focus:"CSS Subgrid Baseline Alignment, Container Queries & Telemetry",codeSnippet:`// Stage 4: CSS Subgrid Multi-Card Alignment
// .sdui-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
// .sdui-card { display: grid; grid-template-rows: subgrid; grid-row: span 3; container-type: inline-size; }
// @container (max-width: 320px) { .sdui-card-cta { flex-direction: column; } }

// Impression Telemetry via navigator.sendBeacon
function flushImpressions(queue: string[]) {
  navigator.sendBeacon('/api/telemetry', JSON.stringify({ impressions: queue }));
}`,failureModeOrInvariant:"Card headers, bodies, and CTAs align perfectly across dynamic server columns. Telemetry flushes reliably on page unload.",architecturalLesson:"Subgrid and container queries guarantee visual elegance for dynamically generated layouts."}],layers:[{layer:"Presentation",components:["Federated Shell","Dynamic SDUI Layout Parser","Subgrid Component Grid","Remote Error Boundary"],invariants:["Remote crashes are isolated by ErrorBoundary wrappers without breaking parent layout."]},{layer:"Application",components:["SDUI Component Registry","Declarative Action Dispatcher","Telemetry Impression Tracker"],invariants:["All server-driven actions pass through a centralized command bus."]},{layer:"Domain",components:["SDUINode Discriminated Union","SDUIAction Value Object","Layout Validator"],invariants:["Zod runtime validation guarantees client contract safety before rendering."]},{layer:"Infrastructure",components:["Module Federation 2.0 Loader","Edge RSC Streamer","CDN Edge Cache"],invariants:["Shared singletons (React, QueryClient) deduplicated across remote micro-apps."]}],explicitTopics:[{category:"React 19",topic:"RSC Streaming",subtopic:"Server-Driven Layouts",howCovered:"Streams layout payloads from backend BFF directly into Suspense boundaries."},{category:"Architecture",topic:"Micro-Frontends",subtopic:"Module Federation 2.0",howCovered:"Dynamically resolves independent remote micro-apps at runtime with shared dependencies."},{category:"CSS",topic:"Modern CSS",subtopic:"Subgrid & Container Queries",howCovered:"Subgrid aligns server-composed cards; container queries adapt components to arbitrary slot widths."},{category:"Security & Invariants",topic:"Zero-Trust AST Validation",subtopic:"Zod Runtime Sanitization",howCovered:"Validates server payloads to prevent injection of unregistered UI components."}],implicitFoundations:[{domain:"Security & Invariants",title:"CORS & Federated Scripts",mechanism:'Access-Control-Allow-Origin: * and crossorigin="anonymous" script tags.',realWorldImpact:"Prevents security tainting while loading third-party remotes."},{domain:"Internet & Protocols",title:"Edge CDN Caching",mechanism:"Cache-Control: s-maxage=60, stale-while-revalidate=86400 on SDUI endpoints.",realWorldImpact:"Delivers sub-50ms TTFB for dynamic layouts cached at the edge."},{domain:"DOM & Browser Pipeline",title:"MutationObserver Auditing",mechanism:"MutationObserver monitors DOM mutations injected by remote scripts.",realWorldImpact:"Prevents rogue remote scripts from polluting global styles."},{domain:"V8 Engine & Memory",title:"Detached DOM Leaks",mechanism:"Explicitly unmounts remote React roots and tears down window event listeners on MFE switch.",realWorldImpact:"Eliminates memory growth when switching between federated micro-apps."}],frameworkVsManual:{frameworkHandled:["Module Federation plugin for dependency sharing.","React Suspense and ErrorBoundary layout isolation."],manualEngineeringRequired:["Zero-trust dynamic component registry with Zod AST sanitization.","Declarative JSON action dispatcher.","Cross-MFE custom event bus with structured schema enforcement."]}},M=[Se,ve,we,ke];new Map(M.map(i=>[i.id,i]));const Y=[{id:"react-19-actions-rfc",title:"React 19 Actions & Async Transitions RFC",category:"RFC",authorOrOrg:"React Core Team",url:"https://react.dev/reference/rsc/server-actions",summary:"Defines useActionState, useOptimistic, and use() hook specifications for async data flow and transition batching without manual pending flags.",keyInvariants:["useActionState binds form actions directly to state transitions with automated error rollbacks.","useOptimistic provides deterministic client-side optimistic updates prior to async resolution.","use() hook suspends on Promises and Context conditionally inside loops and branches."],applicableTopics:["useActionState","useOptimistic","use","Transitions","Forms"]},{id:"cove-dhuliawala-2023",title:"Chain-of-Verification Reduces Hallucination in Large Language Models",category:"Academic Paper",authorOrOrg:"Dhuliawala et al. (Meta AI, 2023)",url:"https://arxiv.org/abs/2309.11495",summary:"4-step verification protocol (Draft -> Plan Verification Questions -> Answer Independently -> Synthesize Fact-Checked Response) to enforce strict factual grounding.",keyInvariants:["Verification questions must execute without reference to initial ungrounded assumptions.","Grounding in specifications eliminates hallucinated API signatures."],applicableTopics:["AI Verification","Socratic Adjudication","Code Review"]},{id:"reflexion-shinn-2023",title:"Reflexion: Language Agents with Verbal Reinforcement Learning",category:"Academic Paper",authorOrOrg:"Shinn et al. (NeurIPS 2023)",url:"https://arxiv.org/abs/2303.11366",summary:"Self-reflective verbal feedback loop where agents evaluate external error signals (compiler errors, test harness reports) to self-correct without weights updates.",keyInvariants:["Reflections are stored in working memory to guide subsequent iterations.","Compiler logs and AST error stacks provide objective ground truth for code repair."],applicableTopics:["Sandbox Debugging","Code Copilot","Compiler Error Repair"]},{id:"v8-hidden-classes-inline-caching",title:"V8 Engine Internals: Hidden Classes (Shapes) & Inline Caching (IC)",category:"Engine Whitepaper",authorOrOrg:"V8 Team / Google Chrome",url:"https://v8.dev/blog/fast-properties",summary:"In-depth analysis of V8 Shape transition trees, Property Cell types, Polymorphic/Megamorphic call sites, and memory optimization.",keyInvariants:["Always initialize object properties in identical order in constructors to share Map/Shape.","Megamorphic IC call sites (>4 distinct shapes) drop to slow dictionary lookups.","Avoid delete operator which causes Shape deoptimization to Hash Table mode."],applicableTopics:["V8 Internals","Hidden Classes","Memory Profiling","Inline Caching"]},{id:"whatwg-html-event-loop",title:"WHATWG HTML Living Standard: Event Loops & Task Queues",category:"Spec",authorOrOrg:"WHATWG",url:"https://html.spec.whatwg.org/multipage/webappapis.html#event-loops",summary:"Formal specification of Microtask queues (Promises, MutationObserver, queueMicrotask) vs Macrotask queues (setTimeout, I/O) and Rendering steps (requestAnimationFrame, Style, Layout, Paint).",keyInvariants:["Microtask checkpoint drains completely after every JS execution context before any UI rendering step.","requestAnimationFrame callbacks run immediately before CSS Style calculation and Layout dispatch."],applicableTopics:["Event Loop","Microtasks","requestAnimationFrame","LoAF"]},{id:"webgpu-w3c-spec",title:"W3C WebGPU & WGSL Shading Language Specification",category:"Spec",authorOrOrg:"W3C GPU for the Web Working Group",url:"https://www.w3.org/TR/webgpu/",summary:"Modern low-level API for high-performance 3D graphics and GPGPU general-purpose parallel compute shaders directly in the browser.",keyInvariants:["GPUBuffer mapping for zero-copy CPU-GPU data transfers via writeBuffer / mapAsync.","ComputePassEncoder dispatches massive parallel WGSL compute workgroups across thousands of GPU cores."],applicableTopics:["WebGPU","High-Performance UI","Compute Shaders","Canvas"]}],R={"project-chronosgraph":{blueprint:M.find(i=>i.id==="project-chronosgraph"),whyChosen:"Tests local-first offline architecture, OPFS binary streaming, CRDT multi-device conflict-free convergence, and WebGPU compute layout for 100k nodes.",syllabusCoveragePercentage:98,coveredSyllabusAreas:["React 19 Actions & use()","WebGPU Compute","IndexedDB / OPFS","CRDTs","CSS Subgrid","Worker Offloading"],suggestedExtensions:[{title:"Zero-Knowledge End-to-End Encryption (E2EE) Layer",description:"Integrate WebCrypto AES-GCM 256-bit envelope encryption so CRDT vectors remain encrypted on relay servers while allowing client-side merges.",architecturalImpact:"Requires streaming decryption in dedicated Web Worker before feeding Y.Doc state updates."},{title:"Incremental Spatial Hashing for Graph Viewport Culling",description:"Replace brute-force bounding checks with a 2D spatial BVH (Bounding Volume Hierarchy) in a SharedArrayBuffer for instant 60 FPS viewport rendering.",architecturalImpact:"Minimizes CPU-GPU memory bus saturation during rapid zooming across 100k nodes."}],interviewDefenseQuestions:[{question:"Why choose OPFS SyncAccessHandle over standard IndexedDB for markdown and graph state storage?",modelAnswerKey:"OPFS SyncAccessHandle in a dedicated Web Worker provides synchronous, low-overhead direct file-system byte streaming, bypassing SQLite transaction serialization overhead in IndexedDB for large binary CRDT blobs.",trapToAvoid:"Claiming OPFS is available on the main thread—SyncAccessHandle is strictly restricted to Dedicated Web Workers to prevent blocking UI layout."},{question:"How do state-based CRDT vectors prevent merge conflicts without a central locking server?",modelAnswerKey:"State-based CRDTs employ a mathematically proven semi-lattice where the merge operation is Commutative, Associative, and Idempotent. Vector clocks track causal history, resolving concurrent edits deterministically without centralized locks.",trapToAvoid:"Confusing Operational Transformation (OT - requires centralized ordering server) with CRDTs (peer-to-peer deterministic convergence)."}]},"project-hypercanvas":{blueprint:M.find(i=>i.id==="project-hypercanvas"),whyChosen:"Tests custom React reconcilers, 2D vector geometry math, spatial indexing (R-Tree / BVH), zero-garbage memory recycling, and WebGL/WebGPU render batching.",syllabusCoveragePercentage:100,coveredSyllabusAreas:["Fiber & Custom Reconcilers","OffscreenCanvas","Spatial R-Tree","Memory & GC Optimization","PointerEvents"],suggestedExtensions:[{title:"Collaborative Multi-Cursor Delta Streaming via WebRTC DataChannels",description:"Add ultra-low-latency peer-to-peer cursor interpolation and viewport panning broadcasting over WebRTC UDP DataChannels.",architecturalImpact:"Decouples high-frequency cursor updates (60Hz) from transactional canvas document persistence."},{title:"Shader-Driven Procedural Pattern & Texture Generator in WGSL",description:"Allow custom infinite procedural canvas grid lines and dot matrices generated directly in WebGPU fragment shaders without raster image memory overhead.",architecturalImpact:"Zero texture memory allocation regardless of canvas scale or zoom factor."}],interviewDefenseQuestions:[{question:"Why build a custom React reconciler (react-reconciler) instead of rendering DOM nodes into canvas with standard React DOM?",modelAnswerKey:"Standard ReactDOM produces HTML elements with heavy DOM node objects (~60 properties per element). A custom reconciler maps JSX components directly to lightweight canvas vector nodes in memory, bypassing the DOM entirely for 60 FPS performance with 50,000+ objects.",trapToAvoid:"Assuming canvas can inspect DOM events automatically—all hit testing must be calculated via point-in-polygon math or spatial R-Tree indices."}]},"project-pulseui":{blueprint:M.find(i=>i.id==="project-pulseui"),whyChosen:"Tests headless design system architecture, WCAG 2.2 AAA accessibility, sub-millisecond keyboard navigation, floating UI collision math, and zero-runtime CSS tokens.",syllabusCoveragePercentage:96,coveredSyllabusAreas:["Component Architecture","WCAG AAA Accessibility","ARIA 1.2 Patterns","Focus Traps & Rings","CSS Tokens"],suggestedExtensions:[{title:"Automated Headless A11y Axe-Core Assertion Worker",description:"Embed a background worker running continuous axe-core invariant audits on DOM mutation trees during development mode.",architecturalImpact:"Detects missing aria-live regions, contrast failures, and broken focus loops before production deployment."}],interviewDefenseQuestions:[{question:"How do you engineer a bulletproof focus trap for accessible modals without trapping screen reader virtual cursors?",modelAnswerKey:'Implement roving tabindex combined with keydown listener intercepting Tab and Shift+Tab on boundary sentinel nodes, while assigning role="dialog", aria-modal="true", and restoring focus to the original trigger element on unmount.',trapToAvoid:"Using display: none on background elements while forgetting to lock body scroll or restore activeElement on close."}]},"project-quantumtrade":{blueprint:M.find(i=>i.id==="project-quantumtrade"),whyChosen:"Tests high-frequency financial streaming, 100,000 updates/sec L2 order books, WebAssembly binary decoding, ArrayBuffer ring buffers, and microtask scheduling.",syllabusCoveragePercentage:99,coveredSyllabusAreas:["WebSockets & Binary Streaming","WebAssembly / Rust","TypedArrays & Ring Buffers","RAF Batching","LoAF Profiling"],suggestedExtensions:[{title:"SharedArrayBuffer Multithreaded Worker-to-Canvas Zero-Copy Pipeline",description:"Stream incoming market ticks directly from WebSocket worker into a SharedArrayBuffer ring buffer, rendered by an OffscreenCanvas worker via Atomics.",architecturalImpact:"Main thread CPU utilization drops to 0% during massive market volatility spikes."}],interviewDefenseQuestions:[{question:"Why are standard React state updates (useState) fatal during 100,000 tick/sec market data ingestion?",modelAnswerKey:"Each useState dispatch triggers React reconciliation and Fiber tree diffing. At 100k events/sec, the JS event loop becomes saturated with microtask rendering, resulting in Long Animation Frames (LoAF > 500ms) and UI lockup. The solution is buffering in a TypedArray ring buffer and throttling visual updates to requestAnimationFrame.",trapToAvoid:"Suggesting useEffect debouncing—debouncing drops critical intermediate order book state changes instead of aggregating them cleanly."}]}},Te={"counter-advanced":{title:"React 19 Action & Optimistic Counter",jsx:`import React, { useState, useOptimistic, useTransition } from 'react';

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
}`,css:`.card { max-width: 380px; margin: 24px auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #1e293b; font-family: system-ui; }
.display { display: flex; align-items: baseline; gap: 12px; margin: 16px 0; }
.value { font-size: 3rem; font-weight: 900; color: #38bdf8; }
.syncing { font-size: 0.75rem; color: #fbbf24; animation: pulse 1.5s infinite; }
.btn-group { display: flex; gap: 8px; }
button { flex: 1; padding: 8px 12px; background: #0284c7; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
button:hover { background: #0369a1; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`},"virtual-list":{title:"Fixed-Height Virtualized List (Zero-Dependency)",jsx:`import React, { useState, useRef } from 'react';

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
}`,css:`.virtual-wrap { max-width: 440px; margin: 20px auto; padding: 20px; background: #090d16; border: 1px solid #1e293b; border-radius: 12px; color: #f1f5f9; font-family: system-ui; }
.scroll-container { overflow-y: auto; border: 1px solid #334155; border-radius: 8px; background: #020617; }
.item-row { display: flex; justify-content: space-between; align-items: center; padding: 0 16px; border-bottom: 1px solid #1e293b; box-sizing: border-box; }
.name { font-size: 13px; font-weight: 600; color: #e2e8f0; }
.metric { font-size: 11px; font-family: monospace; color: #38bdf8; }`}};function Ie(i){if(!i.trim())return Y;const t=i.toLowerCase();return Y.filter(r=>r.title.toLowerCase().includes(t)||r.summary.toLowerCase().includes(t)||r.category.toLowerCase().includes(t)||r.applicableTopics.some(n=>n.toLowerCase().includes(t))||r.keyInvariants.some(n=>n.toLowerCase().includes(t)))}function Ae(i,t){return{duelTitle:`⚡ Rapid Clash: ${i}`,badge:"Real-Time Dialectic",questions:[{question:`In a high-throughput React system, what is the primary invariant for "${i}"?`,options:["It guarantees O(1) time complexity by caching all intermediate states in localStorage.","It enforces deterministic state transformations while avoiding main-thread Long Animation Frames (LoAF).","It disables the Fiber reconciler tree diffing algorithm completely.","It replaces the browser microtask queue with a native synchronous thread."],correctIndex:1,explanation:`Under the hood, "${i}" aligns with the React 19 concurrent runtime by batching state changes and preserving main-thread responsiveness.`},{question:`When debugging memory leaks related to "${i}", what should you inspect in Chrome DevTools?`,options:["Retainer trees in Heap Snapshots for un-cleaned event listeners and detached DOM nodes.","The CSS style rules panel for unused classes.","The network tab status code for 200 OK headers.","The cookie expiration date timestamps."],correctIndex:0,explanation:"Heap Snapshot retainers reveal root references preventing the V8 Garbage Collector from reclaiming memory."}]}}function Pe({contextType:i,roadmapContext:t,projectContext:r,sandboxContext:n,masteryContext:d,chatWithMentor:b,isAiReady:C}){const[A,h]=u.useState([]),[k,v]=u.useState(!1),[f,L]=u.useState(()=>i==="project"?"architect":i==="sandbox"?"copilot":"tutor"),w=u.useRef("");u.useEffect(()=>{const l=`${i}:${(t==null?void 0:t.topicId)||(r==null?void 0:r.projectId)||"main"}`;if(w.current!==l){w.current=l;let s="";if(i==="roadmap"&&(t!=null&&t.topicTitle))s=`👋 **Welcome to the ${t.topicTitle} Socratic Hub!**

I am your **Senior Staff Teaching Architect**. I am grounded in the official specifications and V8/React 19 internals.

*Ask me to break down this mechanism, generate a real-time concept duel, or find authoritative RFC references!*`;else if(i==="project"&&(r!=null&&r.blueprint)){const o=R[r.blueprint.id];s=`🏛️ **Tier-1 Systems Architecture Hub: ${r.blueprint.title}**

I have inside-out mastery of this blueprint:
- **Architecture**: Clean Hexagonal (${r.blueprint.layers.length} Layers)
- **Syllabus Coverage**: ${(o==null?void 0:o.syllabusCoveragePercentage)??98}% coverage

*Ask me for extension ideas, mock interview defense sparring, or deep V8/WebGPU invariants!*`}else i==="sandbox"?s=`🛠️ **Sandbox Compiler & AST Copilot Ready**

I monitor your live JSX/CSS scratchpad and Babel compilation errors in real-time.

*Ask me to diagnose syntax errors, scaffold production-grade components, or optimize React 19 performance!*`:s=`🔮 **Universal AI Problem & Systems Mentor Ready**

How can I accelerate your Staff/Principal interview preparation today?`;h([{id:`welcome-${Date.now()}`,role:"assistant",content:s,timestamp:Date.now(),persona:f}])}},[i,t==null?void 0:t.topicId,r==null?void 0:r.projectId]),u.useCallback(()=>f==="architect"||i==="project"?ie:f==="copilot"||i==="sandbox"?ne:f==="duel"?se:i==="mastery"?oe:ce,[f,i]);const O=u.useCallback(l=>{let s=`[ACTIVE ENVIRONMENT CONTEXT]
Mode: ${i.toUpperCase()} | Persona: ${f.toUpperCase()}
`;if(i==="roadmap"&&t&&(s+=`Track: ${t.trackName||"Core"}
Topic: ${t.topicTitle}
Area: ${t.area}
Summary: ${t.topicSummary||"N/A"}
Key Invariants: ${(t.keyPoints||[]).join("; ")}

`),i==="project"&&(r!=null&&r.blueprint)){const o=r.blueprint,c=R[o.id];s+=`Project ID: ${o.id}
Title: ${o.title}
Analog: ${o.realWorldAnalog}
Architecture: ${o.architecturePattern}
Layers: ${o.layers.map(S=>`${S.layer} (${S.components.join(", ")})`).join(" | ")}
Syllabus Areas: ${c==null?void 0:c.coveredSyllabusAreas.join(", ")}

`}return i==="sandbox"&&n&&(s+=`Active JSX Code:
\`\`\`jsx
${n.jsxCode||"(empty)"}
\`\`\`
Active CSS Code:
\`\`\`css
${n.cssCode||"(empty)"}
\`\`\`
`,n.error&&(s+=`Current Compilation / Runtime Error: ${n.error}

`)),i==="mastery"&&d&&(s+=`Exercise: ${d.unitTitle}
Task: ${d.taskDescription}
Specs: ${JSON.stringify(d.specs)}
Student Code:
\`\`\`
${d.userCode}
\`\`\`

`),`${s}[USER QUERY & PROMPT]
${l}

Deliver a rigorous, verified, and well-structured response following your system invariants.`},[i,f,t,r,n,d]),B=u.useCallback(async l=>{var o;if(!l.trim()||k)return;const s={id:`user-${Date.now()}`,role:"user",content:l.trim(),timestamp:Date.now()};h(c=>[...c,s]),v(!0);try{let c="";if(C&&b){const p=O(l),m=A.filter(a=>a.role==="user"||a.role==="assistant").slice(-6).map(a=>({role:a.role,content:a.content}));c=await b({unitTitle:(t==null?void 0:t.topicTitle)||(r==null?void 0:r.projectTitle)||"AI Session",category:(t==null?void 0:t.area)||"Architecture",trackName:(t==null?void 0:t.trackName)||"Crucible",taskDescription:p,specs:(t==null?void 0:t.keyPoints)||[],userCode:(n==null?void 0:n.jsxCode)||(d==null?void 0:d.userCode)||"",practiceType:"code",messages:[...m,{role:"user",content:p}]})||""}if(!c)if(await new Promise(p=>setTimeout(p,600)),i==="project"&&(r!=null&&r.blueprint)){const p=R[r.blueprint.id],m=l.toLowerCase();if(m.includes("extension")||m.includes("suggest")||m.includes("more"))c=`### 💡 High-Impact Architectural Extensions for ${r.blueprint.title}

`+p.suggestedExtensions.map((g,a)=>`**${a+1}. ${g.title}**
- **Description**: ${g.description}
- **Architectural Trade-off & Impact**: ${g.architecturalImpact}`).join(`

`);else if(m.includes("defense")||m.includes("interview")||m.includes("question")||m.includes("spar")){const g=p.interviewDefenseQuestions[0];c=`### 🎯 Staff Interview Defense Challenge

**Question**: *"${g.question}"*

> **Key Architectural Insight**: ${g.modelAnswerKey}

⚠️ **Trap to Avoid**: ${g.trapToAvoid}`}else c=`### 🏛️ Architectural Blueprint Analysis: ${r.blueprint.title}

**Core Invariant**: Built around *${r.blueprint.architecturePattern}*.

**Syllabus Coverage**: **${p.syllabusCoveragePercentage}%** covering ${p.coveredSyllabusAreas.join(", ")}.

**Key Subsystem Layers**:
`+r.blueprint.layers.map(g=>`- **${g.layer} Layer**: ${g.components.join(", ")} (Invariant: ${g.invariants.join(" ")})`).join(`
`)+`

*Would you like to run a mock interview defense, explore extensions, or audit syllabus coverage?*`}else i==="sandbox"?n!=null&&n.error?c=`### 🛠️ Reflexion Compiler Error Diagnosis

**Error Trace**: \`${n.error}\`

**Root Cause Analysis**:
The Babel JSX transpiler encountered an unexpected token or unclosed expression in your component tree.

**Recommended Fix**:
Ensure all JSX elements have matching closing tags, dynamic props use single braces \`{...}\`, and hooks are declared at the top level of the component.`:c=`### ⚡ Sandbox Code Optimization Review

Your JSX component is syntactically valid and transpiling cleanly into React 19 execution!

**High-Leverage Insights**:
- **Re-render Budget**: Keep state changes scoped to leaf nodes or use React 19 \`useActionState\` for form actions.
- **Layout Stability**: Container Queries (\`@container\`) and \`subgrid\` eliminate layout shifts.

*Click "Scaffold Template" or ask me to generate a production component pattern!*`:i==="roadmap"&&(t!=null&&t.topicTitle)?c=`### 🧠 Socratic Breakdown: ${t.topicTitle}

**Underlying Mechanism**:
`+(t.topicSummary||"Governs critical render scheduling, memory lifecycle, and state propagation.")+`

**Invariants Worth Memorizing**:
`+(((o=t.keyPoints)==null?void 0:o.map(p=>`- ${p}`).join(`
`))||"- Enforces deterministic state lifecycle and zero-unnecessary re-renders.")+`

*Would you like to test your understanding with an instant gamified duel or look up primary RFC citations?*`:c=`### 🔮 Socratic Technical Mentor

I am analyzing your query with the **Chain-of-Verification (CoVe)** protocol.

Everything in technical frontend systems boils down to three invariants:
1. **Event Loop & Microtask Timing**: Microtask checkpoints drain before next frame paints.
2. **Memory & Retainer Topology**: Avoiding closures capturing detached DOM references.
3. **Concurrent Reconciliation**: Interruptible render phases and deterministic commit phases.`;const S={id:`assistant-${Date.now()}`,role:"assistant",content:c,timestamp:Date.now(),persona:f};h(p=>[...p,S])}catch(c){console.error("Agent chat error:",c),h(S=>[...S,{id:`error-${Date.now()}`,role:"assistant",content:`⚠️ Failed to complete response: ${(c==null?void 0:c.message)||"Unknown engine error."}`,timestamp:Date.now()}])}finally{v(!1)}},[k,C,b,O,i,f,t,r,n,d,A]),F=u.useCallback(()=>{const l=(t==null?void 0:t.topicTitle)||(r==null?void 0:r.projectTitle)||"React Internals";t!=null&&t.area;const s=Ae(l),o={id:`duel-${Date.now()}`,role:"tool",toolType:"duel",toolData:s,content:`🎮 **Gamified Battle Generated: ${s.duelTitle}**

Answer the challenge question to prove your architectural intuition!`,timestamp:Date.now(),persona:"duel"};h(c=>[...c,o])},[t,r]),G=u.useCallback(l=>{const s=Ie(l),o={id:`lit-${Date.now()}`,role:"tool",toolType:"literature",toolData:s,content:`📚 **Verified Literature & Specification Search for "${l}"**
Found ${s.length} primary reference(s) from React RFCs, W3C, WHATWG, and V8 Team.`,timestamp:Date.now(),persona:"search"};h(c=>[...c,o])},[]),D=u.useCallback(()=>{if(!(r!=null&&r.blueprint))return;const l=R[r.blueprint.id];if(!l)return;let s=`### 💡 High-Impact Architectural Extensions for ${r.blueprint.title}

`;l.suggestedExtensions.forEach((o,c)=>{s+=`**${c+1}. ${o.title}**
- **Implementation**: ${o.description}
- **Architectural Invariant**: ${o.architecturalImpact}

`}),h(o=>[...o,{id:`ext-${Date.now()}`,role:"assistant",content:s,timestamp:Date.now(),persona:"architect"}])},[r]),U=u.useCallback(()=>{if(!(r!=null&&r.blueprint))return;const l=R[r.blueprint.id];if(!l)return;const s=`### 📊 Syllabus Coverage Audit: ${r.blueprint.title}

**Coverage Rating**: **${l.syllabusCoveragePercentage}%** of Senior/Staff frontend interview topics.

**Directly Exercised Syllabus Areas**:
`+l.coveredSyllabusAreas.map(o=>`✅ **${o}**`).join(`
`)+`

**Explicit Topics Matrix**: ${r.blueprint.explicitTopics.length} topics mapped.
**Implicit V8 & Browser Foundations**: ${r.blueprint.implicitFoundations.length} deep invariants.`;h(o=>[...o,{id:`audit-${Date.now()}`,role:"assistant",content:s,timestamp:Date.now(),persona:"architect",toolType:"syllabus_audit"}])},[r]),T=u.useCallback(l=>{const s=Te[l];s&&(n!=null&&n.onApplyCode&&n.onApplyCode(s.jsx,s.css),h(o=>[...o,{id:`scaffold-${Date.now()}`,role:"tool",toolType:"code_patch",content:`🚀 **Scaffold Applied to Sandbox**: *${s.title}*

Injected production-grade component JSX and styling directly into your scratchpad editor.`,timestamp:Date.now(),persona:"copilot"}]))},[n]),N=u.useCallback(()=>{h([])},[]);return{messages:A,isTyping:k,activePersona:f,setActivePersona:L,sendMessage:B,triggerGamifiedDuel:F,searchLiterature:G,suggestProjectExtensions:D,auditProjectSyllabus:U,scaffoldSandboxTemplate:T,clearMessages:N}}function Ne({isOpen:i,onClose:t,contextType:r,roadmapContext:n,projectContext:d,sandboxContext:b,masteryContext:C,chatWithMentor:A,isAiReady:h}){const{messages:k,isTyping:v,activePersona:f,setActivePersona:L,sendMessage:w,triggerGamifiedDuel:O,searchLiterature:B,suggestProjectExtensions:F,auditProjectSyllabus:G,scaffoldSandboxTemplate:D,clearMessages:U}=Pe({contextType:r,roadmapContext:n,projectContext:d,sandboxContext:b,masteryContext:C,chatWithMentor:A,isAiReady:h}),[T,N]=u.useState(""),[l,s]=u.useState({}),o=u.useRef(null);if(u.useEffect(()=>{var a;(a=o.current)==null||a.scrollIntoView({behavior:"smooth"})},[k,v]),!i)return null;const c=()=>{!T.trim()||v||(w(T),N(""))},S=a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),c())},m=(()=>{var a;return r==="roadmap"?{icon:Z,title:(n==null?void 0:n.topicTitle)||"Roadmap Track",subtitle:(n==null?void 0:n.trackName)||"Core Curriculum",color:"from-sky-500 to-indigo-500"}:r==="project"?{icon:X,title:(d==null?void 0:d.projectTitle)||"Tier-1 System Architecture",subtitle:((a=d==null?void 0:d.blueprint)==null?void 0:a.realWorldAnalog)||"Staff Blueprint",color:"from-amber-500 to-orange-500"}:r==="sandbox"?{icon:K,title:"Sandbox Lab & Compiler",subtitle:b!=null&&b.error?"Transpiler Error Active":"React 19 Execution",color:"from-emerald-500 to-teal-500"}:{icon:j,title:"Interview Mastery Oracle",subtitle:"Universal Socratic Substrate",color:"from-purple-500 to-indigo-500"}})(),g=m.icon;return e.jsxs("div",{className:"fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[540px] z-50 bg-slate-900/98 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 transition-all animate-in slide-in-from-right duration-200",children:[e.jsxs("div",{className:"p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("div",{className:`w-8 h-8 rounded-xl bg-gradient-to-tr ${m.color} flex items-center justify-center shrink-0 shadow-md`,children:e.jsx(g,{size:16,className:"text-white"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"font-black text-xs tracking-tight text-white truncate",children:m.title}),e.jsx("span",{className:`w-2 h-2 rounded-full ${h?"bg-emerald-400 animate-pulse":"bg-amber-400"} shrink-0`})]}),e.jsx("p",{className:"text-[10px] text-slate-400 font-mono truncate",children:m.subtitle})]})]}),e.jsxs("div",{className:"flex items-center gap-1 shrink-0",children:[e.jsx("button",{onClick:U,title:"Reset Chat Session",className:"p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer",children:e.jsx(me,{size:14})}),e.jsx("button",{onClick:t,title:"Close Assistant",className:"p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer",children:e.jsx(le,{size:16})})]})]}),e.jsx("div",{className:"p-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0",children:[{id:"tutor",label:"🎓 Socratic Tutor",icon:Z},{id:"architect",label:"🏛️ Systems Architect",icon:$},{id:"copilot",label:"🛠️ Code Copilot",icon:q},{id:"duel",label:"🎮 Gamified Duel",icon:J},{id:"search",label:"📚 Literature / RFCs",icon:_}].map(a=>{const I=f===a.id;return e.jsx("button",{onClick:()=>L(a.id),className:`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 border ${I?"bg-sky-600 text-white border-sky-400 shadow-xs":"bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800"}`,children:e.jsx("span",{children:a.label})},a.id)})}),e.jsxs("div",{className:"p-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]",children:[r==="roadmap"&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:O,className:"px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(J,{size:11})," ",e.jsx("span",{children:"⚡ Instant Duel"})]}),e.jsxs("button",{onClick:()=>B((n==null?void 0:n.topicTitle)||"React 19"),className:"px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(_,{size:11})," ",e.jsx("span",{children:"📚 Curated RFCs"})]}),e.jsx("button",{onClick:()=>w(`What is the most common memory leak or V8 deoptimization trap in ${n==null?void 0:n.topicTitle}?`),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition shrink-0",children:e.jsx("span",{children:"⚠️ V8 Trap"})})]}),r==="project"&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:F,className:"px-2.5 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(j,{size:11})," ",e.jsx("span",{children:"💡 Extensions"})]}),e.jsxs("button",{onClick:G,className:"px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(Q,{size:11})," ",e.jsx("span",{children:"📊 Syllabus Audit"})]}),e.jsxs("button",{onClick:()=>{var a;return w(`Run a Staff-level interview defense challenge against my architecture for ${(a=d==null?void 0:d.blueprint)==null?void 0:a.title}. Catch any hand-waving!`)},className:"px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(X,{size:11})," ",e.jsx("span",{children:"🎯 Mock Defense"})]})]}),r==="sandbox"&&e.jsxs(e.Fragment,{children:[(b==null?void 0:b.error)&&e.jsxs("button",{onClick:()=>w(`Debug and fix this compiler error: ${b.error}`),className:"px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(q,{size:11})," ",e.jsx("span",{children:"🛠️ Fix Compiler Error"})]}),e.jsxs("button",{onClick:()=>D("counter-advanced"),className:"px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx(K,{size:11})," ",e.jsx("span",{children:"🚀 Insert React 19 State"})]}),e.jsxs("button",{onClick:()=>D("virtual-list"),className:"px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold transition flex items-center gap-1 shrink-0",children:[e.jsx($,{size:11})," ",e.jsx("span",{children:"📦 Virtual List Scaffold"})]})]})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar",children:[k.map(a=>{var z;const I=a.role==="user",ee=a.role==="tool";return e.jsxs("div",{className:`flex items-start gap-2.5 ${I?"justify-end":"justify-start"}`,children:[!I&&e.jsx("div",{className:"w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400",children:e.jsx(de,{size:13})}),e.jsx("div",{className:`max-w-[92%] p-3.5 rounded-2xl text-xs ${I?"bg-sky-600 text-white rounded-tr-xs shadow-md":ee?"bg-slate-950 border border-indigo-500/30 rounded-tl-xs shadow-md w-full":"bg-slate-800/95 border border-slate-700/80 rounded-tl-xs shadow-md"}`,children:I?e.jsx("p",{className:"whitespace-pre-wrap leading-relaxed",children:a.content}):e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{text:a.content}),a.toolType==="duel"&&a.toolData&&e.jsxs("div",{className:"mt-3 p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsx("span",{className:"text-amber-300 font-bold font-mono text-[11px]",children:a.toolData.duelTitle}),e.jsx("span",{className:"px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40",children:a.toolData.badge})]}),(z=a.toolData.questions)==null?void 0:z.map((y,E)=>{const H=l[`${a.id}-${E}`],x=H!==void 0,V=H===y.correctIndex;return e.jsxs("div",{className:"space-y-2 pt-2 border-t border-slate-800",children:[e.jsxs("p",{className:"font-medium text-slate-200",children:[E+1,". ",y.question]}),e.jsx("div",{className:"space-y-1.5",children:y.options.map((re,P)=>{const te=H===P;return e.jsxs("button",{disabled:x,onClick:()=>s(ae=>({...ae,[`${a.id}-${E}`]:P})),className:`w-full text-left p-2 rounded-lg text-[11px] transition cursor-pointer border flex items-center justify-between gap-2 ${x?P===y.correctIndex?"bg-emerald-950/80 text-emerald-200 border-emerald-500/60":te?"bg-rose-950/80 text-rose-200 border-rose-500/60":"bg-slate-950 text-slate-400 border-slate-800 opacity-60":"bg-slate-950 text-slate-300 border-slate-800 hover:border-sky-500/50 hover:bg-slate-800"}`,children:[e.jsx("span",{children:re}),x&&P===y.correctIndex&&e.jsx(Q,{size:12,className:"text-emerald-400 shrink-0"})]},P)})}),x&&e.jsxs("div",{className:`p-2 rounded-lg text-[11px] ${V?"bg-emerald-950/60 text-emerald-300 border border-emerald-800/60":"bg-rose-950/60 text-rose-300 border border-rose-800/60"}`,children:[e.jsx("p",{className:"font-bold",children:V?"🎯 Correct!":"❌ Invariant Violation"}),e.jsx("p",{className:"text-slate-300 mt-1",children:y.explanation})]})]},E)})]}),a.toolType==="literature"&&Array.isArray(a.toolData)&&e.jsx("div",{className:"mt-3 space-y-2",children:a.toolData.map(y=>e.jsxs("div",{className:"p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1.5",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsx("span",{className:"font-bold text-sky-300 text-xs",children:y.title}),e.jsx("span",{className:"px-1.5 py-0.5 rounded text-[9px] font-mono bg-sky-950 text-sky-400 border border-sky-800",children:y.category})]}),e.jsx("p",{className:"text-slate-300 text-[11px] leading-relaxed",children:y.summary}),e.jsxs("div",{className:"pt-1 flex items-center justify-between gap-2 text-[10px]",children:[e.jsx("span",{className:"text-slate-500",children:y.authorOrOrg}),e.jsxs("a",{href:y.url,target:"_blank",rel:"noreferrer",className:"text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold",children:[e.jsx("span",{children:"Read Spec"}),e.jsx(be,{size:10})]})]})]},y.id))})]})})]},a.id)}),v&&e.jsxs("div",{className:"flex items-center gap-2.5 text-slate-400 text-xs pl-1",children:[e.jsx("div",{className:"w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400",children:e.jsx(j,{size:13,className:"animate-spin"})}),e.jsxs("div",{className:"flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/60 px-3 py-2 rounded-xl text-[11px] text-indigo-300",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"}),e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"}),e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"}),e.jsx("span",{className:"ml-1 text-slate-400 font-mono",children:"Running Chain-of-Verification (CoVe)..."})]})]}),e.jsx("div",{ref:o})]}),e.jsxs("div",{className:"p-3 bg-slate-950 border-t border-slate-800 shrink-0 flex items-end gap-2",children:[e.jsx("textarea",{value:T,onChange:a=>N(a.target.value),onKeyDown:S,placeholder:`Ask the ${f} anything... (Enter to send, Shift+Enter for newline)`,rows:2,className:"flex-1 bg-slate-900 border border-slate-700/70 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 resize-none max-h-28 transition placeholder:text-slate-500 custom-scrollbar"}),e.jsx("button",{onClick:c,disabled:!T.trim()||v,className:"p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition cursor-pointer shadow-md shrink-0 mb-0.5",children:e.jsx(pe,{size:15})})]})]})}export{Z as B,X as C,be as E,M as P,Ne as U};
