export interface ProgramStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

export interface ConceptCapability {
  conceptId: string;
  stageId: string;
  capability: string;
  whatItDoes: string;
  icon: string;
}

export const PROGRAM_STAGES: ProgramStage[] = [
  {
    id: 'stage_modeling',
    number: 1,
    title: 'Architecture & Modeling',
    subtitle: 'Domain & Semantics',
    description: 'How a program structures its domain boundaries, state mutability, and computational paradigms.',
    color: '#8b5cf6',
  },
  {
    id: 'stage_types',
    number: 2,
    title: 'Type Proofs & Static Analysis',
    subtitle: 'Compile-Time Verification',
    description: 'How a compiler proves correctness, validates contracts, and prevents illegal states before execution.',
    color: '#06b6d4',
  },
  {
    id: 'stage_compilation',
    number: 3,
    title: 'Compilation & Linkage',
    subtitle: 'Lowering & Packaging',
    description: 'How the compiler lowers high-level AST into optimized binary artifacts, modules, and symbol tables.',
    color: '#ec4899',
  },
  {
    id: 'stage_execution',
    number: 4,
    title: 'Runtime Control & Dispatch',
    subtitle: 'Expression Evaluation',
    description: 'How control flows through functions, event loops, coroutines, and non-blocking asynchronous I/O.',
    color: '#3b82f6',
  },
  {
    id: 'stage_memory',
    number: 5,
    title: 'Memory & Resource Lifetime',
    subtitle: 'Storage Architecture',
    description: 'How heap buffers are allocated, tracked, and safely reclaimed without leaks, pauses, or corruption.',
    color: '#10b981',
  },
  {
    id: 'stage_concurrency',
    number: 6,
    title: 'Concurrency & Multicore Scale',
    subtitle: 'Parallel Coordination',
    description: 'How independent execution flows coordinate data access across physical CPU cores and networks.',
    color: '#f59e0b',
  },
];

const CLUSTER_TO_STAGE: Record<string, string> = {
  paradigms: 'stage_modeling',
  'data-modelling': 'stage_modeling',
  'syntactic-ergonomics': 'stage_modeling',
  types: 'stage_types',
  'abstraction-over-types': 'stage_types',
  'compilation-linkage': 'stage_compilation',
  modules: 'stage_compilation',
  metaprogramming: 'stage_compilation',
  dispatch: 'stage_execution',
  'effects-sequencing': 'stage_execution',
  'error-signalling': 'stage_execution',
  'evaluation-order': 'stage_execution',
  memory: 'stage_memory',
  'memory-lifetime': 'stage_memory',
  'mutability-aliasing': 'stage_memory',
  'identity-equality': 'stage_memory',
  concurrency: 'stage_concurrency',
};

const CLUSTER_ICONS: Record<string, string> = {
  paradigms: 'λ',
  'data-modelling': '📦',
  'syntactic-ergonomics': '✍️',
  types: '🛡️',
  'abstraction-over-types': '🧬',
  'compilation-linkage': '⚙️',
  modules: '📁',
  metaprogramming: '🪄',
  dispatch: '🔀',
  'effects-sequencing': '⚡',
  'error-signalling': '🚨',
  'evaluation-order': '⏱️',
  memory: '💾',
  'memory-lifetime': '🧹',
  'mutability-aliasing': '🔒',
  'identity-equality': '🟰',
  concurrency: '🧵',
};

export function getConceptCapability(concept: { id: string; label: string; layerId?: string; details?: any }): ConceptCapability {
  const layer = concept.layerId || 'paradigms';
  const stageId = CLUSTER_TO_STAGE[layer] || 'stage_modeling';
  const icon = CLUSTER_ICONS[layer] || '⚙️';
  const motivation = concept.details?.motivation || concept.details?.definition || '';

  return {
    conceptId: concept.id,
    stageId,
    capability: `Capability: ${concept.label}`,
    whatItDoes: motivation.length > 120 ? motivation.slice(0, 117) + '...' : motivation,
    icon,
  };
}
