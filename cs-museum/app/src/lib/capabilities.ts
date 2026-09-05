import type { ConceptNode } from '../store/types';
import { CLUSTER_TO_STAGE, getStageById } from './stages';

export interface ConceptCapability {
  conceptId: string;
  stageId: string;
  clusterId: string;
  clusterLabel: string;
  capability: string;
  whatItDoes: string;
  icon: string;
}

export const CLUSTER_LABELS: Record<string, string> = {
  paradigms: 'Paradigms',
  'data-modelling': 'Data Modelling',
  'syntactic-ergonomics': 'HCI & Ergonomics',
  types: 'Type Systems',
  'abstraction-over-types': 'Type Abstraction',
  'compilation-linkage': 'Compilation',
  modules: 'Modules & Boundaries',
  metaprogramming: 'Metaprogramming',
  dispatch: 'Dispatch',
  'effects-sequencing': 'Effects & I/O',
  'error-signalling': 'Error Handling',
  'evaluation-order': 'Evaluation Order',
  memory: 'Memory Architecture',
  'memory-lifetime': 'Resource Lifetime',
  'mutability-aliasing': 'Aliasing & Mutation',
  'identity-equality': 'Identity & Equality',
  concurrency: 'Concurrency & Scale',
};

export const CLUSTER_CAPABILITY: Record<string, string> = {
  paradigms: 'Model computation through pure dataflows, actors, or objects',
  'data-modelling': 'Structure domain state to align with machine representations',
  'syntactic-ergonomics': 'Express human intent with minimal cognitive overhead',
  types: 'Prove absence of invalid states at compile time',
  'abstraction-over-types': 'Reuse verified algorithms across varied concrete representations',
  'compilation-linkage': 'Lower high-level AST into optimized, relocatable machine code',
  modules: 'Enforce explicit encapsulation boundaries between components',
  metaprogramming: 'Synthesize code at compile time with zero runtime penalty',
  dispatch: 'Select execution targets via static monomorphization or vtables',
  'effects-sequencing': 'Confine and coordinate stateful interactions with the outside world',
  'error-signalling': 'Elevate partial failures to explicit type-level contracts',
  'evaluation-order': 'Control the exact temporal scheduling of expressions',
  memory: 'Manage physical RAM allocations with predictable overhead',
  'memory-lifetime': 'Enforce deterministic reclamation without GC pauses',
  'mutability-aliasing': 'Prevent shared-mutable data races through formal access models',
  'identity-equality': 'Distinguish structural equivalences from pointer identities',
  concurrency: 'Coordinate multi-threaded execution across physical CPU cores',
};

export const CLUSTER_ICONS: Record<string, string> = {
  paradigms: 'λ',
  'data-modelling': '▣',
  'syntactic-ergonomics': 'Aa',
  types: 'τ',
  'abstraction-over-types': '∀',
  'compilation-linkage': '⚙',
  modules: '▢',
  metaprogramming: '◆',
  dispatch: '→',
  'effects-sequencing': '↯',
  'error-signalling': '!',
  'evaluation-order': '…',
  memory: 'μ',
  'memory-lifetime': 'μ',
  'mutability-aliasing': '&',
  'identity-equality': '=',
  concurrency: '||',
};

export function groupByCluster(concepts: ConceptNode[]): {
  clusterId: string;
  label: string;
  capability: string;
  items: ConceptNode[];
}[] {
  const map = new Map<string, ConceptNode[]>();
  for (const c of concepts) {
    const id = c.layerId || 'paradigms';
    const list = map.get(id);
    if (list) list.push(c);
    else map.set(id, [c]);
  }
  return [...map.entries()].map(([clusterId, items]) => ({
    clusterId,
    label: CLUSTER_LABELS[clusterId] || clusterId,
    capability: CLUSTER_CAPABILITY[clusterId] || CLUSTER_LABELS[clusterId] || clusterId,
    items,
  }));
}

export function getConceptCapability(concept: {
  id: string;
  label: string;
  layerId?: string;
  details?: { motivation?: string; definition?: string } | null;
}): ConceptCapability {
  const clusterId = concept.layerId || 'paradigms';
  const stageId = CLUSTER_TO_STAGE[clusterId] || 'layer_paradigms';
  const motivation = concept.details?.motivation || concept.details?.definition || '';

  return {
    conceptId: concept.id,
    stageId,
    clusterId,
    clusterLabel: CLUSTER_LABELS[clusterId] || clusterId,
    capability: CLUSTER_CAPABILITY[clusterId] || getStageById(stageId)?.title || concept.label,
    whatItDoes: motivation.length > 120 ? motivation.slice(0, 117) + '...' : motivation,
    icon: CLUSTER_ICONS[clusterId] || '·',
  };
}
