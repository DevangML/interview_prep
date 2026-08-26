import type { ProjectBlueprint } from './types';

export const hyperCanvasProject: ProjectBlueprint = {
  id: 'project-hypercanvas',
  title: 'HyperCanvas: Ultra-Low Latency Infinite Vector Canvas',
  tagline: 'Collaborative infinite canvas engine with 120 FPS WebGL rendering, CRDT multi-user cursors & OffscreenCanvas.',
  realWorldAnalog: 'Figma / Miro / Excalidraw Engine',
  difficulty: 'Principal',
  architecturePattern: 'Clean Hexagonal + CQRS + Entity-Component System (ECS)',
  summary:
    'Build a production-grade infinite whiteboard handling 50,000+ vector shapes with sub-16ms latency. Features WebGL/OffscreenCanvas rendering, spatial BVH indexing, binary WebSocket sync, and local-first CRDT conflict resolution.',
  tags: ['WebGL', 'OffscreenCanvas', 'CRDTs', 'WebSockets', 'Web Workers', 'Spatial Indexing'],
  xpBounty: 500,
  layers: [
    {
      layer: 'Presentation',
      components: ['React 19 Concurrent UI Shell', 'OffscreenCanvas WebGL Viewport', 'Multiplayer Cursor Overlay', 'Tool Palette'],
      invariants: ['Zero main-thread canvas drawing; all vector rasterization occurs in Web Worker via OffscreenCanvas.', 'React re-renders only tool chrome, never the canvas elements.']
    },
    {
      layer: 'Application',
      components: ['Canvas Command Handlers (CQRS)', 'Spatial Bounding Box Engine (R-Tree / BVH)', 'Multiplayer Sync Coordinator', 'Undo/Redo History Stack'],
      invariants: ['O(log N) viewport culling to render only shapes intersecting the camera frustum.', 'Action history uses command pattern with delta snapshots.']
    },
    {
      layer: 'Domain',
      components: ['VectorShape Entity', 'Transform Matrix Value Object', 'CRDT Vector Clock', 'Selection Boundary'],
      invariants: ['Shapes are pure immutable domain models with float coordinate precision.', 'Commutative CRDT merges guarantee identical state across distributed peers.']
    },
    {
      layer: 'Infrastructure',
      components: ['WebSocket Binary Transport (Protobuf)', 'Web Worker Thread Pool via Comlink', 'IndexedDB Vector Blob Cache', 'Web Audio Synthesizer'],
      invariants: ['Binary frame encoding (ArrayBuffers) over WebSockets to eliminate JSON serialization overhead.']
    }
  ],
  implementationSteps: [
    {
      step: 1,
      title: 'OffscreenCanvas & Worker Rendering Pipeline',
      description: 'Transfer canvas control to a dedicated Web Worker. Implement a 120 FPS requestAnimationFrame render loop with WebGL2 shader pipelines and camera view matrices (pan, zoom, tilt).',
      codePattern: `const offscreen = canvas.transferControlToOffscreen();\nworker.postMessage({ type: 'INIT_CANVAS', canvas: offscreen }, [offscreen]);`
    },
    {
      step: 2,
      title: 'Spatial Indexing & Frustum Culling',
      description: 'Implement an R-Tree / Bounding Volume Hierarchy (BVH). Query the spatial index during pan/zoom to cull offscreen objects and only dispatch draw calls for visible shapes.',
      codePattern: `const visibleShapes = spatialIndex.search(camera.getViewportBounds());`
    },
    {
      step: 3,
      title: 'Multi-User CRDTs & Binary WebSocket Engine',
      description: 'Integrate Yjs / Automerge state vectors. Encode shape mutations into compact ArrayBuffers and broadcast to peers over WebSockets with client-side interpolation for smooth remote cursors.'
    },
    {
      step: 4,
      title: 'React 19 Shell & Subgrid Inspector',
      description: 'Build the design token inspector using CSS Subgrid for multi-property alignment and useOptimistic for instant shape renaming and layer reordering.'
    }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'useOptimistic', subtopic: 'Real-Time Updates', howCovered: 'Instantly applies shape transforms and layer orders before peer confirmation.' },
    { category: 'Performance', topic: 'INP & Long Tasks', subtopic: 'Main Thread Offloading', howCovered: 'Offloads all heavy geometry math and canvas rendering to Web Workers via OffscreenCanvas.' },
    { category: 'Web Platform', topic: 'Web Workers', subtopic: 'Comlink RPC & Transferables', howCovered: 'Zero-copy ArrayBuffer transfer between UI thread and rendering workers.' },
    { category: 'CSS', topic: 'Modern CSS', subtopic: 'Subgrid & Container Queries', howCovered: 'Property inspector aligned via CSS Subgrid with @container query adaptive panels.' }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'WebSocket Binary Framing & Backpressure', mechanism: 'Protobuf binary encoding over raw TCP sockets.', realWorldImpact: 'Reduces network packet payload by 80% compared to JSON stringification.' },
    { domain: 'V8 Engine & Memory', title: 'V8 Heap Retainers & TypedArrays', mechanism: 'Using Float32Arrays for vertex buffers to bypass garbage collection churn.', realWorldImpact: 'Zero GC pause stutters during 120 FPS drag interactions.' },
    { domain: 'DOM & Browser Pipeline', title: 'Compositor Layer Promotion', mechanism: 'will-change: transform and hardware accelerated CSS canvas transforms.', realWorldImpact: 'Eliminates layout and paint reflow triggers during zooming.' }
  ],
  frameworkVsManual: {
    frameworkHandled: [
      'React Fiber scheduling for tool palettes and inspector panels.',
      'Synthetic event capture on UI overlays.',
      'Component lifecycle mounting and unmounting.'
    ],
    manualEngineeringRequired: [
      'WebGL2 shader programs, vertex buffer objects, and matrix math (Mat3x3).',
      'Spatial R-Tree indexing and dynamic viewport intersection algorithms.',
      'Binary WebSocket serialization, delta-state CRDT resolution, and peer cursor interpolation.'
    ]
  }
};
