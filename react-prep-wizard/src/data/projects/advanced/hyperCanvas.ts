import type { ProjectBlueprint } from '../types';

export const hyperCanvasProject: ProjectBlueprint = {
  id: 'project-hypercanvas',
  title: 'HyperCanvas: Ultra-Low Latency Infinite Vector Canvas',
  tagline: 'Infinite vector canvas engine with 120 FPS WebGL rendering, CRDT multi-user cursors & OffscreenCanvas.',
  realWorldAnalog: 'Figma / Miro / Excalidraw Core Engine',
  tier: 'advanced',
  difficulty: 'Principal',
  estimatedBuildTimeHours: 14,
  architecturePattern: 'Clean Hexagonal + CQRS + Entity-Component System (ECS)',
  summary:
    'Build a high-performance infinite whiteboard handling 50,000+ vector shapes with sub-16ms latency. Minimal feature breadth (no auth, no billing, no menu bloat) with maximum architectural depth: WebGL2 OffscreenCanvas, BVH spatial indexing, binary WebSocket sync, and local-first CRDTs.',
  tags: ['WebGL', 'OffscreenCanvas', 'CRDTs', 'WebSockets', 'Web Workers', 'Spatial Indexing'],
  xpBounty: 500,
  coreScopeBoundaries: {
    inScopeMinimal: [
      '50,000 vector shapes on an infinite pan/zoom canvas.',
      'OffscreenCanvas WebGL2 worker pipeline running at 120 FPS.',
      'Spatial R-Tree/BVH frustum culling O(log N).',
      'Binary WebSocket CRDT state vector multi-user cursor sync.',
      'CSS Subgrid multi-property token inspector panel.'
    ],
    outOfScopeBloat: [
      'Multi-tenant authentication & OAuth screens.',
      'PDF/SVG complex file export wizards.',
      'Cloud billing & team permission hierarchies.',
      'Rich text font kerning & paragraph formatting.'
    ]
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Minimal Working Prototype',
      focus: 'Main-Thread React State Canvas',
      codeSnippet: `// Stage 1: Naïve 2D Canvas in React State\nfunction NaiveCanvas() {\n  const [shapes, setShapes] = useState<Shape[]>(() => generate50kShapes());\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n\n  useEffect(() => {\n    const ctx = canvasRef.current?.getContext('2d');\n    if (!ctx) return;\n    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    shapes.forEach(s => {\n      ctx.fillStyle = s.color;\n      ctx.fillRect(s.x, s.y, s.w, s.h); // Main-thread synchronous loop\n    });\n  }, [shapes]);\n\n  return <canvas ref={canvasRef} onMouseMove={e => setShapes(updateActive(e))} />;\n}`,
      failureModeOrInvariant: 'Main-thread loop over 50,000 shapes takes 180ms per frame. Frame rate drops to 5 FPS with catastrophic INP jank (>200ms).',
      architecturalLesson: 'Direct React state mutation cannot scale to high-frequency vector manipulation. UI state must be decoupled from the rendering pipeline.'
    },
    {
      stageNumber: 2,
      stageName: 'The Production Breakdown',
      focus: 'V8 Minor GC Churn & Multiplayer Race Conditions',
      codeSnippet: `// Stage 2: JSON Broadcast & Object Churn\nfunction broadcastMove(id: string, x: number, y: number) {\n  // Allocates 1000s of ephemeral objects/sec -> V8 nursery GC freezes\n  ws.send(JSON.stringify({ type: 'MOVE', id, x, y, timestamp: Date.now() }));\n}\n\n// Last-Write-Wins Race: Simultaneous edits overwrite each other\nws.onmessage = (e) => {\n  const update = JSON.parse(e.data);\n  setShapes(prev => prev.map(s => s.id === update.id ? { ...s, ...update } : s));\n};`,
      failureModeOrInvariant: 'JSON stringification creates 50MB/s of ephemeral heap objects triggering stop-the-world GC pauses. Uncoordinated updates cause shape overwrites.',
      architecturalLesson: 'Multiplayer vector engines require binary serialization to eliminate GC churn and commutative CRDTs to prevent data loss.'
    },
    {
      stageNumber: 3,
      stageName: 'The Canonical Concept Evolution',
      focus: 'OffscreenCanvas WebGL2 Worker + BVH Spatial Index + Binary CRDT',
      codeSnippet: `// Stage 3: OffscreenCanvas + BVH Frustum Culling + Yjs Binary CRDT\n// Main Thread Handoff\nconst offscreen = canvas.transferControlToOffscreen();\nworker.postMessage({ type: 'INIT', canvas: offscreen }, [offscreen]);\n\n// Dedicated Render Worker\nconst bvh = new BVHTree(50000);\nfunction renderLoop() {\n  const visible = bvh.queryFrustum(camera.getAABB());\n  packVerticesToStaticBuffer(visible, vertexBuffer);\n  gl.uniformMatrix3fv(uMatrixLoc, false, camera.getViewMatrix());\n  gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, visible.length);\n  requestAnimationFrame(renderLoop);\n}`,
      failureModeOrInvariant: 'Rendering is offloaded 100% to Web Workers. BVH culls 49,900 offscreen shapes in O(log N) time, locking framerate at a steady 120 FPS.',
      architecturalLesson: 'Leverage WebGL2 instancing, off-main-thread compute, and binary state vectors for institutional-scale graphics.'
    },
    {
      stageNumber: 4,
      stageName: 'Production Hardening & Design Elegance',
      focus: 'CSS Subgrid Inspector, Virtual A11y Tree & Float32 Pooling',
      codeSnippet: `// Stage 4: React 19 Optimistic Subgrid Inspector & A11y Mirror\nexport function CanvasInspector({ selectedShape }: { selectedShape: Shape }) {\n  const [optimisticShape, setOptimisticShape] = useOptimistic(selectedShape);\n  return (\n    <div className="inspector-subgrid">\n      <label>Position X</label>\n      <input value={optimisticShape.x} onChange={e => setOptimisticShape({ ...optimisticShape, x: +e.target.value })} />\n    </div>\n  );\n}\n// CSS: .inspector-subgrid { display: grid; grid-template-columns: subgrid; }`,
      failureModeOrInvariant: 'Zero layout shift across nested property inputs. Screen readers navigate hidden AOM mirror with full ARIA semantics.',
      architecturalLesson: 'True masterclass engineering combines raw performance with polished UI design systems and WCAG accessibility.'
    }
  ],
  deliverables: [
    { id: 'Geometry', title: 'Geometry', spec: 'Hit testing and transforms over typed arrays with zero allocation inside the frame loop, and an epsilon rule for float comparison covering -0 and NaN.' },
    { id: 'Tools', title: 'Tools', spec: 'Each tool a closure over its own gesture state, dispatched from a table so tools can be swapped mid-drag.' },
    { id: 'Shapes', title: 'Shapes', spec: 'Shape classes sharing prototype methods, constructed monomorphically so the hot loop stays optimised.' },
    { id: 'Assets', title: 'Assets', spec: 'Image decode and font load awaited before a shape is measured, with a cross-origin image shown to taint the canvas.' },
    { id: 'Input', title: 'Input', spec: 'Pointer events with capture and getCoalescedEvents, batched through rAF.' },
    { id: 'Workers', title: 'Workers', spec: 'A module render worker receiving an OffscreenCanvas and transferred ArrayBuffers, created and terminated in an effect.' },
    { id: 'Inspector', title: 'Inspector', spec: 'A property panel of real labelled inputs, laid out on named grid lines with subgrid alignment, sized in rem, each field converting its string once.' },
    { id: 'Canvas', title: 'Canvas', spec: 'A canvas with its own containment context, wrapped in a class boundary that renders a fallback on GPU context loss.' },
    { id: 'Undo', title: 'Undo', spec: 'An immutable operation history behind a pure reducer, so undo is a pointer move.' },
    { id: 'Shell', title: 'Shell', spec: 'A routed shell where document id and viewport live in the URL, with toolbar, canvas and inspector as resizable grid tracks.' },
    { id: 'Architecture', title: 'Architecture', spec: 'A written latency budget and conflict policy produced before any rendering code.' },
    { id: 'Persistence', title: 'Persistence', spec: 'Autosave to IndexedDB with conditional-request saves rather than a full upload per stroke.' },
    { id: 'Import', title: 'Import', spec: 'Imported SVG parsed and rebuilt into shapes rather than injected as markup.' },
    { id: 'Toolbar', title: 'Toolbar', spec: 'A flex row that becomes a column when docked vertically, with tool groups separated by auto margins and non-colour active states.' },
    { id: 'Overlays', title: 'Overlays', spec: 'Selection handles absolutely positioned in a layer that tracks the canvas transform exactly.' },
    { id: 'Themes', title: 'Themes', spec: 'Inspector theming in cascade layers so it cannot leak into embedded user content.' },
  ],
  layers: [
    { layer: 'Presentation', components: ['React 19 Shell', 'OffscreenCanvas WebGL Viewport', 'Multiplayer Cursor LERP', 'Subgrid Token Panel'], invariants: ['Zero main-thread vector drawing; UI renders only chrome and tools.'] },
    { layer: 'Application', components: ['BVH Spatial Index', 'CRDT Sync Coordinator', 'CQRS Undo/Redo Engine', 'A11y Virtual Mirror'], invariants: ['O(log N) frustum culling before dispatching draw calls.'] },
    { layer: 'Domain', components: ['VectorShape Entity', 'Transform Mat3x3 Value Object', 'State Vector Clock'], invariants: ['Commutative CRDT merges guarantee identical state across peers.'] },
    { layer: 'Infrastructure', components: ['WebSocket Binary Protobuf', 'Comlink Worker Pool', 'Float32 Memory Pools'], invariants: ['Zero heap allocations during steady-state 120 FPS loops.'] }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'useOptimistic', subtopic: 'Real-Time Shape Transforms', howCovered: 'Instantly applies shape transforms and layer orders before peer confirmation.' , conceptIds: ['r19-actions', 'react-state'] },
    { category: 'Performance', topic: 'INP & Long Tasks', subtopic: 'OffscreenCanvas Offloading', howCovered: 'Offloads all vector math and draw calls to Web Workers via OffscreenCanvas.' , conceptIds: ['react-perf', 'web-how-page-loads'] },
    { category: 'Web Platform', topic: 'Web Workers', subtopic: 'Zero-Copy Transferables', howCovered: 'Transfers ArrayBuffers without cloning between UI and render workers.' , conceptIds: ['react-references-copying', 'js-event-loop'] },
    { category: 'CSS', topic: 'Modern CSS', subtopic: 'Subgrid & Container Queries', howCovered: 'Property inspector aligned via CSS Subgrid with @container adaptive cards.' , conceptIds: ['css-tokens-modern', 'css-media-container'] }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'WebSocket Binary Framing', mechanism: 'Protobuf binary encoding over raw TCP.', realWorldImpact: 'Reduces network packet payload by 80% compared to JSON.' },
    { domain: 'V8 Engine & Memory', title: 'V8 Heap Nursery Bypassing', mechanism: 'Float32Array static memory pooling.', realWorldImpact: 'Zero GC pauses during 120 FPS high-frequency dragging.' },
    { domain: 'DOM & Browser Pipeline', title: 'Compositor Layer Promotion', mechanism: 'will-change: transform on viewport container.', realWorldImpact: 'Eliminates layout and paint reflows during zoom.' },
    { domain: 'Security & Invariants', title: 'SVG Vector Sanitization', mechanism: 'DOMPurify sanitization on imported SVG vectors.', realWorldImpact: 'Prevents stored XSS payloads in shared whiteboard sessions.' }
  ],
  frameworkVsManual: {
    frameworkHandled: ['React Fiber scheduling for tool chrome.', 'Synthetic event delegation on overlay controls.'],
    manualEngineeringRequired: ['WebGL2 shaders and Mat3x3 matrix math.', 'BVH spatial tree indexing in Web Workers.', 'Binary CRDT vector synchronization.']
  }
};
