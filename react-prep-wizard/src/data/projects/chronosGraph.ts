import type { ProjectBlueprint } from './types';

export const chronosGraphProject: ProjectBlueprint = {
  id: 'project-chronosgraph',
  title: 'ChronosGraph: Local-First Knowledge IDE with WebGPU & CRDTs',
  tagline: 'Offline-sync Markdown & knowledge graph IDE with WebGPU AST rendering, OPFS storage, and state-based CRDTs.',
  realWorldAnalog: 'Obsidian / Notion / Roam Research Engine',
  difficulty: 'Staff',
  architecturePattern: 'Local-First Clean Architecture + CRDT DAG + WebGPU Compute Pipeline',
  summary:
    'Build a local-first personal knowledge management IDE that operates offline with zero latency. Features IndexedDB/OPFS persistent storage, WGSL WebGPU compute shaders for 100,000-node force-directed graph layouts, and peer-to-peer CRDT document synchronization.',
  tags: ['Local-First', 'WebGPU', 'IndexedDB / OPFS', 'CRDTs', 'React 19', 'TanStack Query'],
  xpBounty: 450,
  layers: [
    {
      layer: 'Presentation',
      components: ['React 19 Markdown Outliner Shell', 'WebGPU Force-Directed Graph Viewport', 'Subgrid Property Table', 'Vault Inspector'],
      invariants: ['useOptimistic handles instant node updates; use() hook suspends on local OPFS file reads.']
    },
    {
      layer: 'Application',
      components: ['Graph Node & Edge CQRS Interactors', 'TanStack Query v5 Offline Mutation Pipeline', 'Markdown AST Worker Parser', 'CRDT Merge Coordinator'],
      invariants: ['All document and node state writes go to local IndexedDB first before sync propagation.']
    },
    {
      layer: 'Domain',
      components: ['Vault & GraphNode Entities', 'CRDT State Vector Value Object', 'DAG Cycle Invariant Verifier', 'Markdown Block AST'],
      invariants: ['Commutative CRDT merge algorithms guarantee deterministic multi-device convergence.']
    },
    {
      layer: 'Infrastructure',
      components: ['IndexedDB (Dexie) Persistent Storage', 'OPFS (Origin Private File System) Streaming', 'WebSocket Sync Gateway', 'WebGPU Compute Shaders (WGSL)'],
      invariants: ['Heavy Markdown tokenization and N-body force physics run exclusively in Web Workers on WebGPU.']
    }
  ],
  implementationSteps: [
    {
      step: 1,
      title: 'OPFS & IndexedDB Local Storage Kernel',
      description: 'Implement a zero-latency storage driver using IndexedDB for metadata and OPFS (Origin Private File System) SyncAccessHandle for streaming large attachments and AST caches.',
      codePattern: `const root = await navigator.storage.getDirectory();\nconst fileHandle = await root.getFileHandle('vault.ast', { create: true });`
    },
    {
      step: 2,
      title: 'WebGPU WGSL N-Body Force Layout Engine',
      description: 'Write WGSL compute shaders executing parallel Coulomb repulsion and Hooke spring attraction algorithms over 100,000 nodes directly on the GPU.',
      codePattern: `@compute @workgroup_size(64)\nfn simulate_forces(@builtin(global_invocation_id) id: vec3<u32>) { ... }`
    },
    {
      step: 3,
      title: 'State-Based CRDT & TanStack Query v5 Persist Client',
      description: 'Configure TanStack Query with offline-first persistence and synchronize binary state-based CRDT vectors over WebSockets with background sync.'
    },
    {
      step: 4,
      title: 'React 19 UI & CSS Subgrid Outliner Hierarchy',
      description: 'Build the hierarchical knowledge outliner using CSS Subgrid for multi-column properties and React 19 useActionState for schema migrations.'
    }
  ],
  explicitTopics: [
    { category: 'React 19', topic: 'RSC & use() Hook', subtopic: 'Resource Suspension', howCovered: 'Suspends block rendering while local OPFS file streams resolve directly in JSX.' },
    { category: 'Data & APIs', topic: 'TanStack Query v5', subtopic: 'Offline Mutation Persist', howCovered: 'Enqueues offline mutations and merges differential CRDT diffs seamlessly upon reconnect.' },
    { category: 'CSS', topic: 'Modern CSS', subtopic: 'Subgrid & Container Queries', howCovered: 'Subgrid aligns nested outliner block tags, authors, and timestamps without breaking grid flow.' },
    { category: 'Performance', topic: 'WebGPU Shaders', subtopic: 'GPU Compute Passes', howCovered: 'WGSL compute shaders offload O(N^2) force-directed graph physics to the GPU.' }
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'HTTP Caching & Weak ETags (W/)', mechanism: 'Conditional requests using ETags to skip downloading unmodified vault sync bundles.', realWorldImpact: 'Reduces sync bandwidth by 95% across active sessions.' },
    { domain: 'DOM & Browser Pipeline', title: 'Service Worker Lifecycle & Background Sync API', mechanism: 'Service worker intercepts offline requests and fires Background Sync on reconnect.', realWorldImpact: 'Guarantees zero data loss even if the browser tab is closed while offline.' },
    { domain: 'V8 Engine & Memory', title: 'ArrayBuffer Shared Views vs Heap Clones', mechanism: 'Zero-copy views over binary CRDT vectors using TypedArrays.', realWorldImpact: 'Eliminates memory duplication when exchanging documents with Web Workers.' }
  ],
  frameworkVsManual: {
    frameworkHandled: [
      'TanStack Query query deduplication and cache garbage collection.',
      'React 19 Concurrent rendering and Suspense fallback coordination.'
    ],
    manualEngineeringRequired: [
      'WGSL Compute & Render shaders for WebGPU force-directed graph physics.',
      'Custom Markdown AST token stream parser in Web Workers.',
      'Binary CRDT state vector synchronization and OPFS file access handle management.'
    ]
  }
};
