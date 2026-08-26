import type { ProjectBlueprint } from '../types';

export const chronosGraphProject: ProjectBlueprint = {
  id: 'project-chronosgraph',
  title: 'ChronosGraph: Local-First Knowledge IDE with WebGPU & CRDTs',
  tagline: 'Offline-sync Markdown & knowledge graph IDE with WebGPU AST rendering, OPFS storage, and state-based CRDTs.',
  realWorldAnalog: 'Obsidian / Notion / Roam Research Core',
  tier: 'advanced',
  difficulty: 'Staff',
  estimatedBuildTimeHours: 12,
  architecturePattern: 'Local-First Clean Architecture + CRDT DAG + WebGPU Compute',
  summary:
    'Build a local-first personal knowledge management IDE operating with zero network latency. Minimal scope (Markdown editor, 100k-node graph, offline CRDT sync) with maximum architectural depth: OPFS SyncAccessHandle, WebGPU WGSL compute shaders, and TanStack Query offline persistence.',
  tags: ['Local-First', 'WebGPU', 'IndexedDB / OPFS', 'CRDTs', 'React 19', 'TanStack Query'],
  xpBounty: 450,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Local-first Markdown note editor with instant persistence.',
      '100,000-node force-directed graph running on WebGPU compute shaders.',
      'Offline-first CRDT state vector synchronization over WebSockets.',
      'CSS Subgrid hierarchical outliner property table.'
    ],
    outOfScopeBloat: [
      'Third-party plugin store & sandbox runtime.',
      'Live multiplayer voice chat channels.',
      'Complex enterprise multi-tenant team billing.',
      'PDF annotation and drawing toolbars.'
    ]
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Minimal Working Prototype',
      focus: 'Main-Thread LocalStorage & D3 SVG Graph',
      codeSnippet: `// Stage 1: Main-Thread Storage & D3 SVG Force Layout\nfunction NaiveGraph({ nodes, links }: { nodes: Node[]; links: Link[] }) {\n  const svgRef = useRef<SVGSVGElement>(null);\n\n  useEffect(() => {\n    // O(N^2) CPU physics simulation blocks main thread\n    const sim = d3.forceSimulation(nodes)\n      .force('charge', d3.forceManyBody())\n      .force('link', d3.forceLink(links))\n      .on('tick', () => {\n        // Manipulates 10,000 DOM SVG elements per frame\n        d3.select(svgRef.current).selectAll('circle').attr('cx', d => d.x).attr('cy', d => d.y);\n      });\n    return () => sim.stop();\n  }, [nodes, links]);\n\n  return <svg ref={svgRef} />;\n}`,
      failureModeOrInvariant: 'D3 CPU force simulation chokes at >2,000 nodes, dropping framerates to <1 FPS. Serializing vaults to localStorage freezes user typing.',
      architecturalLesson: 'O(N^2) graph layout physics cannot run on the CPU main thread. Storage and compute must be offloaded to dedicated workers and GPU kernels.'
    },
    {
      stageNumber: 2,
      stageName: 'The Production Breakdown',
      focus: 'Offline Sync Race Conditions & Stored XSS',
      codeSnippet: `// Stage 2: Naïve HTTP Sync & Raw HTML Injection\nasync function saveNote(note: Note) {\n  localStorage.setItem(note.id, JSON.stringify(note));\n  // Last-Write-Wins HTTP POST wipes out peer edits on reconnect\n  await fetch('/api/notes', { method: 'POST', body: JSON.stringify(note) });\n}\n\n// Stored XSS vulnerability in markdown renderer\nfunction MarkdownPreview({ raw }: { raw: string }) {\n  return <div dangerouslySetInnerHTML={{ __html: marked.parse(raw) }} />;\n}`,
      failureModeOrInvariant: 'Reconnecting after offline editing causes silent data overwrites. Raw markdown parsing allows malicious script injections in shared vaults.',
      architecturalLesson: 'Local-first architecture requires state-based CRDTs for deterministic convergence and AST-level sanitization for zero-trust security.'
    },
    {
      stageNumber: 3,
      stageName: 'The Canonical Concept Evolution',
      focus: 'WebGPU WGSL Compute + OPFS SyncAccessHandle + Yjs CRDT',
      codeSnippet: `// Stage 3: WebGPU Compute Shaders + Dedicated Worker OPFS\n// Dedicated Storage Worker\nconst root = await navigator.storage.getDirectory();\nconst file = await root.getFileHandle('vault.bin', { create: true });\nconst syncHandle = await file.createSyncAccessHandle();\nsyncHandle.write(crdtBinaryUpdate, { at: 0 });\nsyncHandle.flush();\n\n// WebGPU N-Body Force Compute Pass (WGSL)\n/* @compute @workgroup_size(64)\nfn simulate_forces(@builtin(global_invocation_id) id: vec3<u32>) {\n  nodes[id.x].position += nodes[id.x].velocity * params.dt;\n} */`,
      failureModeOrInvariant: '100,000 graph nodes run at steady 60 FPS on GPU. Synchronous OPFS file access handles eliminate IndexedDB IPC serialization latency.',
      architecturalLesson: 'WebGPU compute passes unlock desktop-grade data scale; OPFS provides native file system streaming in the browser.'
    },
    {
      stageNumber: 4,
      stageName: 'Production Hardening & Design Elegance',
      focus: 'CSS Subgrid Outliner, AST Sanitization & Storage Quota',
      codeSnippet: `// Stage 4: Subgrid Outliner & AST Sanitization\nexport function OutlinerBlock({ block }: { block: ASTBlock }) {\n  return (\n    <div className="outliner-row">\n      <span className="bullet">•</span>\n      <SanitizedContent content={block.sanitizedAST} />\n      <span className="meta">{block.timestamp}</span>\n    </div>\n  );\n}\n// CSS: .outliner-row { display: grid; grid-template-columns: subgrid; }`,
      failureModeOrInvariant: 'Knowledge outliner rows stay perfectly aligned across nested depths. Persistent storage quota prevents browser eviction.',
      architecturalLesson: 'Production local-first apps must defend persistence guarantees with navigator.storage.persist() and AST sanitizers.'
    }
  ],
  deliverables: [
    { id: 'CRDT', title: 'CRDT', spec: 'An operation log with a merge function, property-tested so any interleaving of the same operations converges, with a stated total order.' },
    { id: 'Sync', title: 'Sync', spec: 'A cancellable sync pipeline using conditional requests and ETags, each cycle closing over its own abort handle and vector clock.' },
    { id: 'Editor', title: 'Editor', spec: 'A contenteditable outliner handling beforeinput, composition and paste, with debounced persistence and chosen yield points.' },
    { id: 'Outliner', title: 'Outliner', spec: 'A virtualised tree view with correct roles, level and expanded state, indent guides aligned in ch units at every depth.' },
    { id: 'Blocks', title: 'Blocks', spec: 'A registered, recursively composed block type set, each block a flex row of handle, content and metadata, wrapped in a boundary.' },
    { id: 'Commands', title: 'Commands', spec: 'A command palette running Actions, where every mutation goes through one dispatcher so the operation log is complete.' },
    { id: 'Undo', title: 'Undo', spec: 'Undo as a reducer over the operation log, built with createSlice and debugged through devtools replay.' },
    { id: 'Shell', title: 'Shell', spec: 'A routed shell where document and graph selection are URLs, with sidebar, outliner and graph as resizable grid tracks.' },
    { id: 'Structure', title: 'Structure', spec: 'Renderer, CRDT and storage as separate modules with worker boundaries between them.' },
    { id: 'Storage', title: 'Storage', spec: 'OPFS, IndexedDB and localStorage each used where they belong, with the reasons written down and detached-handle errors handled.' },
    { id: 'Import', title: 'Import', spec: 'Imported Markdown sanitised with a URL-scheme allowlist before rendering.' },
    { id: 'Metadata', title: 'Metadata', spec: 'Document properties as a real inline form with native validation.' },
    { id: 'Block', title: 'Block', spec: 'Embeds reserving space with aspect-ratio and restyling by container width across outliner, preview and graph.' },
    { id: 'Themes', title: 'Themes', spec: 'User themes layered over base styles, with graph node colours derived from tokens via color-mix.' },
    { id: 'Workers', title: 'Workers', spec: 'Worker and WASM entry points as separate bundler targets, with the WGSL shader emitted unmangled.' },
  ],
  layers: [
    { layer: 'Presentation', components: ['React 19 Shell', 'WebGPU Graph Viewport', 'Subgrid Outliner', 'Vault Tree'], invariants: ['useOptimistic handles instant UI updates; use() suspends on local OPFS file reads.'] },
    { layer: 'Application', components: ['Graph CQRS Interactors', 'TanStack Offline Mutation Queue', 'CRDT Merge Coordinator'], invariants: ['All state writes go to local storage first before sync propagation.'] },
    { layer: 'Domain', components: ['Vault Entity', 'CRDT State Vector Clock', 'Markdown AST'], invariants: ['Commutative CRDT merges guarantee identical state across peers.'] },
    { layer: 'Infrastructure', components: ['OPFS Streaming Handle', 'WebGPU WGSL Shaders', 'WebSocket Gateway'], invariants: ['N-body physics runs exclusively on WebGPU compute passes.'] }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'RSC & use() Hook', subtopic: 'Resource Suspension', howCovered: 'Suspends block rendering while local OPFS file streams resolve directly in JSX.' , conceptIds: ['r19-use-rsc'] },
    { category: 'Data & APIs', topic: 'TanStack Query v5', subtopic: 'Offline Mutation Persist', howCovered: 'Enqueues offline mutations and merges differential CRDT diffs seamlessly.' , conceptIds: ['state-alternatives', 'web-storage'] },
    { category: 'CSS', topic: 'Modern CSS', subtopic: 'Subgrid & Container Queries', howCovered: 'Subgrid aligns nested outliner block tags, authors, and timestamps.' , conceptIds: ['css-grid-placement', 'css-grid-align'] },
    { category: 'Performance', topic: 'WebGPU Shaders', subtopic: 'GPU Compute Passes', howCovered: 'WGSL compute shaders offload O(N^2) force physics to the GPU.' , conceptIds: ['react-perf'] }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'HTTP Weak ETags (W/)', mechanism: 'Conditional requests to skip downloading unmodified vault sync bundles.', realWorldImpact: 'Reduces sync bandwidth by 95% across active sessions.' },
    { domain: 'DOM & Browser Pipeline', title: 'Background Sync API', mechanism: 'Service worker intercepts offline requests and triggers Background Sync on reconnect.', realWorldImpact: 'Guarantees zero data loss even if the browser tab is closed.' },
    { domain: 'V8 Engine & Memory', title: 'ArrayBuffer Shared Views', mechanism: 'Zero-copy views over binary CRDT vectors using TypedArrays.', realWorldImpact: 'Eliminates memory duplication during worker exchanges.' },
    { domain: 'Security & Invariants', title: 'Zero-Trust AST Sanitization', mechanism: 'AST visitor stripping dangerous javascript: protocols prior to render.', realWorldImpact: 'Prevents stored XSS attacks inside shared knowledge graphs.' }
  ],
  frameworkVsManual: {
    frameworkHandled: ['TanStack Query query deduplication and garbage collection.', 'React 19 Suspense fallback coordination.'],
    manualEngineeringRequired: ['WGSL Compute & Render shaders for WebGPU graph physics.', 'Custom Markdown AST token stream parser in Web Workers.', 'Binary CRDT state vector synchronization and OPFS file access.']
  }
};
