/**
 * The project↔concept graph, derived rather than authored.
 *
 * Everything here is computed from data that already exists — the coverage
 * manifests, the Learn topics, the drills, the MCQs and the resources — so the
 * graph can never disagree with the library it describes. Nothing is hand
 * placed: clusters come from the concept taxonomy, and edge reasons come from
 * the manifests.
 */
import { LEARN_TOPICS, AREA_ORDER } from '../learn';
import { PROJECT_BLUEPRINTS } from './index';
import { COVERAGE_BY_PROJECT } from './coverage';
import type { ConceptEdge, EdgeKind } from './coverage';

export interface GraphConcept {
  id: string;
  title: string;
  area: string;
  group: string;
  minutes: number;
  drillCoverage: string;
  /** Practice and reading attached to this concept, for the detail panel. */
  counts: { drills: number; mcqs: number; resources: number };
}

export interface GraphCluster {
  area: string;
  groups: Array<{ group: string; conceptIds: string[] }>;
  conceptIds: string[];
}

export interface GraphEdge extends ConceptEdge {
  projectId: string;
}

export interface GraphExemption {
  projectId: string;
  conceptId: string;
  reason: string;
}

export interface ProjectGraph {
  clusters: GraphCluster[];
  concepts: GraphConcept[];
  edges: GraphEdge[];
  exemptions: GraphExemption[];
}

/** Concepts grouped into area → group, in the curriculum's own order. */
export function buildClusters(): GraphCluster[] {
  const areas = [...AREA_ORDER].filter((a) => LEARN_TOPICS.some((t) => t.area === a));
  return areas.map((area) => {
    const inArea = LEARN_TOPICS.filter((t) => t.area === area);
    const groups = [...new Set(inArea.map((t) => t.group))].map((group) => ({
      group,
      conceptIds: inArea.filter((t) => t.group === group).map((t) => t.id),
    }));
    return { area, groups, conceptIds: inArea.map((t) => t.id) };
  });
}

export function buildGraphEdges(): { edges: GraphEdge[]; exemptions: GraphExemption[] } {
  const edges: GraphEdge[] = [];
  const exemptions: GraphExemption[] = [];
  for (const p of PROJECT_BLUEPRINTS) {
    const cov = COVERAGE_BY_PROJECT.get(p.id);
    if (!cov) continue;
    for (const edge of cov.edges) edges.push({ ...edge, projectId: p.id });
    for (const ex of cov.exemptions) {
      for (const conceptId of ex.conceptIds) {
        exemptions.push({ projectId: p.id, conceptId, reason: ex.reason });
      }
    }
  }
  return { edges, exemptions };
}

/** How strongly a project engages a concept — drives edge weight in the view. */
export const EDGE_WEIGHT: Record<EdgeKind, number> = {
  explicit: 1,
  implicit: 0.55,
  counterexample: 0.35,
};

export const EDGE_LABEL: Record<EdgeKind, string> = {
  explicit: 'Built explicitly',
  implicit: 'Exercised while building',
  counterexample: 'Met as the thing not to do',
};
