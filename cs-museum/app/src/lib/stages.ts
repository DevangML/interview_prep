import type { ConceptNode } from '../store/types';

export interface ProgramStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  layerTag: string;
}

export const PROGRAM_STAGES: ProgramStage[] = [
  {
    id: 'layer_silicon',
    number: 1,
    title: 'Digital Logic & Silicon',
    subtitle: 'Physical Bedrock',
    description: 'Transistors, CMOS gates, voltage rails, and clock cycles powering raw computation.',
    color: '#06b6d4',
    layerTag: 'H/W',
  },
  {
    id: 'layer_isa',
    number: 2,
    title: 'Microarchitecture & ISA',
    subtitle: 'Processor Architecture',
    description: 'Registers, ALU pipelines, branch predictors, and L1/L2/L3 cache line hierarchies.',
    color: '#3b82f6',
    layerTag: 'ISA',
  },
  {
    id: 'layer_kernel',
    number: 3,
    title: 'OS Kernel & Memory Subsystem',
    subtitle: 'Virtual Memory & Syscalls',
    description: 'MMU translation, page tables, TLB caching, context switches, and heap allocators.',
    color: '#6366f1',
    layerTag: 'SYS',
  },
  {
    id: 'layer_compilation',
    number: 4,
    title: 'Compilers & Binary Linkage',
    subtitle: 'Lowering & Packaging',
    description: 'AST, LLVM IR, monomorphization, symbol tables, ELF/Mach-O artifacts, and ABI conventions.',
    color: '#ec4899',
    layerTag: 'LLVM',
  },
  {
    id: 'layer_runtime',
    number: 5,
    title: 'Runtimes & Execution Engines',
    subtitle: 'Control & Dispatch',
    description: 'Call stacks, event loops, green threads, JIT tiering, and dynamic method lookup tables.',
    color: '#f43f5e',
    layerTag: 'RUNTIME',
  },
  {
    id: 'layer_contracts',
    number: 6,
    title: 'Types & Memory Safety',
    subtitle: 'Compile-Time Proofs',
    description: 'Ownership, borrowing, affine types, static typeclasses, and verified lifetimes.',
    color: '#10b981',
    layerTag: 'TYPES',
  },
  {
    id: 'layer_paradigms',
    number: 7,
    title: 'Paradigms & Architecture',
    subtitle: 'System Models',
    description: 'Functional immutability, Actor concurrency, CSP channels, and domain data modeling.',
    color: '#f59e0b',
    layerTag: 'ARCH',
  },
  {
    id: 'layer_hci',
    number: 8,
    title: 'HCI & Developer Ergonomics',
    subtitle: 'Human Intent & Mental Models',
    description: 'Syntax expressiveness, cognitive friction, compiler error clarity, and mental model synthesis.',
    color: '#a855f7',
    layerTag: 'HCI',
  },
];

export const CLUSTER_TO_STAGE: Record<string, string> = {
  memory: 'layer_kernel',
  'memory-lifetime': 'layer_kernel',
  'compilation-linkage': 'layer_compilation',
  modules: 'layer_compilation',
  metaprogramming: 'layer_compilation',
  dispatch: 'layer_runtime',
  'effects-sequencing': 'layer_runtime',
  'error-signalling': 'layer_runtime',
  'evaluation-order': 'layer_runtime',
  types: 'layer_contracts',
  'abstraction-over-types': 'layer_contracts',
  'mutability-aliasing': 'layer_contracts',
  'identity-equality': 'layer_contracts',
  paradigms: 'layer_paradigms',
  'data-modelling': 'layer_paradigms',
  concurrency: 'layer_paradigms',
  'syntactic-ergonomics': 'layer_hci',
};

export function leafConcepts(nodes: ConceptNode[]): ConceptNode[] {
  return nodes.filter((n) => !n.isLayer);
}

export function getStageIdForConcept(concept: { layerId?: string }): string {
  return CLUSTER_TO_STAGE[concept.layerId || 'paradigms'] || 'layer_paradigms';
}

export function getStageById(stageId: string): ProgramStage | undefined {
  return PROGRAM_STAGES.find((s) => s.id === stageId);
}

export function conceptsInStage(nodes: ConceptNode[], stageId: string): ConceptNode[] {
  return leafConcepts(nodes).filter((c) => getStageIdForConcept(c) === stageId);
}
