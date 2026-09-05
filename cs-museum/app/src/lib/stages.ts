import type { ConceptNode } from '../store/types';
import { STAGE_ALIASES, CLUSTER_TO_STAGE } from './stageMappings';

export { STAGE_ALIASES, CLUSTER_TO_STAGE };

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
    id: 'layer_electronics',
    number: 1,
    title: 'Physical Bedrock & Electronics',
    subtitle: 'Semiconductor Physics & Power',
    description: 'Electricity, voltage, current, semiconductor physics, transistors, diodes, and VLSI fabrication.',
    color: '#06b6d4',
    layerTag: 'PHYS',
  },
  {
    id: 'layer_logic',
    number: 2,
    title: 'Digital Logic & Circuitry',
    subtitle: 'Boolean Gates & Sequential Logic',
    description: 'Boolean algebra, logic gates, combinational adders, ALU circuits, flip-flops, and finite-state machines.',
    color: '#0ea5e9',
    layerTag: 'LOGIC',
  },
  {
    id: 'layer_coa',
    number: 3,
    title: 'Computer Organization & Architecture (COA)',
    subtitle: 'Processor Pipeline & Memory Hierarchy',
    description: 'CPU organization, ISA machine instructions, registers, ALU pipelines, branch prediction, and cache hierarchies.',
    color: '#3b82f6',
    layerTag: 'COA',
  },
  {
    id: 'layer_math',
    number: 4,
    title: 'Mathematical Foundations',
    subtitle: 'Discrete Structures & Analysis',
    description: 'Mathematical logic, sets/relations, combinatorics, graph theory, probability, and linear algebra.',
    color: '#6366f1',
    layerTag: 'MATH',
  },
  {
    id: 'layer_toc',
    number: 5,
    title: 'Theory of Computation (TOC)',
    subtitle: 'Automata, Grammars & Complexity',
    description: 'DFA/NFA automata, formal grammars, Turing machines, computability, P vs NP, and cryptography.',
    color: '#8b5cf6',
    layerTag: 'TOC',
  },
  {
    id: 'layer_dsa',
    number: 6,
    title: 'Data Structures & Algorithms (DSA)',
    subtitle: 'Computational Core & Complexity',
    description: 'Arrays, hash tables, balanced trees, heaps, graphs, sorting, dynamic programming, and complexity.',
    color: '#10b981',
    layerTag: 'DSA',
  },
  {
    id: 'layer_compilers',
    number: 7,
    title: 'Compilers & Systems Translation',
    subtitle: 'Lexing, Parsing, IR & Linkage',
    description: 'Lexical analysis, parsing, AST, LLVM IR lowering, code generation, linkers, loaders, and virtual machines.',
    color: '#ec4899',
    layerTag: 'COMP',
  },
  {
    id: 'layer_os',
    number: 8,
    title: 'Operating Systems (OS)',
    subtitle: 'Kernel, Processes & Virtual Memory',
    description: 'Kernel space, processes, threads, CPU scheduling, synchronization, virtual memory paging, and I/O.',
    color: '#f43f5e',
    layerTag: 'OS',
  },
  {
    id: 'layer_cn',
    number: 9,
    title: 'Computer Networks (CN)',
    subtitle: 'Protocols, Sockets & Transport',
    description: 'OSI/TCP-IP layering, Ethernet/Wi-Fi, IP routing, TCP flow control, UDP, DNS/HTTP/TLS, and sockets.',
    color: '#0284c7',
    layerTag: 'CN',
  },
  {
    id: 'layer_dbms',
    number: 10,
    title: 'Data & Database Systems (DBMS)',
    subtitle: 'Storage Engines, ACID & SQL',
    description: 'Relational algebra, SQL, ACID transactions, B+ Trees, WAL, indexing, query optimization, and MVCC.',
    color: '#f59e0b',
    layerTag: 'DBMS',
  },
  {
    id: 'layer_oop',
    number: 11,
    title: 'Programming Languages & OOP',
    subtitle: 'Type Systems & Paradigms',
    description: 'OOP polymorphism, inheritance vs composition, functional immutability, memory models, and types.',
    color: '#84cc16',
    layerTag: 'OOP',
  },
  {
    id: 'layer_distributed',
    number: 12,
    title: 'System Design & Distributed Systems',
    subtitle: 'Scalability, Consensus & Queues',
    description: 'Distributed consensus (Raft/Paxos), CAP theorem, caching, message queues, sharding, and replication.',
    color: '#d97706',
    layerTag: 'DIST',
  },
  {
    id: 'layer_swe',
    number: 13,
    title: 'Software Engineering & Architecture',
    subtitle: 'Modularity, Testing & Observability',
    description: 'Requirements, system architecture, interfaces, APIs, automated testing/verification, and observability.',
    color: '#14b8a6',
    layerTag: 'SWE',
  },
  {
    id: 'layer_hci',
    number: 14,
    title: 'HCI & Human-Computer Ergonomics',
    subtitle: 'Developer Experience & Mental Models',
    description: 'UX/HCI, developer ergonomics, cognitive friction, mental model synthesis, and product requirements.',
    color: '#a855f7',
    layerTag: 'HCI',
  },
];

export function leafConcepts(nodes: ConceptNode[]): ConceptNode[] {
  return nodes.filter((n) => !n.isLayer);
}

export function getStageIdForConcept(concept: { layerId?: string }): string {
  const rawId = concept.layerId || 'programming';
  return CLUSTER_TO_STAGE[rawId] || 'layer_oop';
}

export function getStageById(stageId: string): ProgramStage | undefined {
  const resolvedId = STAGE_ALIASES[stageId] || stageId;
  return PROGRAM_STAGES.find((s) => s.id === resolvedId);
}

export function conceptsInStage(nodes: ConceptNode[], stageId: string): ConceptNode[] {
  const resolvedId = STAGE_ALIASES[stageId] || stageId;
  return leafConcepts(nodes).filter((c) => getStageIdForConcept(c) === resolvedId);
}
