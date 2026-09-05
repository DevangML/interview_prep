import { PROGRAM_STAGES, getStageIdForConcept } from './stages';
import { getStageCausality } from './csDependencies';
import type { ConceptNode, ConceptEdge } from '../store/types';

export interface ConceptCausalNode {
  conceptId: string;
  conceptLabel: string;
  stageId: string;
  stageNumber: number;
  stageTag: string;
  relation: string;
}

export interface LanguageLevelMapping {
  stageId: string;
  stageNumber: number;
  stageTitle: string;
  stageTag: string;
  stageColor: string;
  primaryConceptId: string | null;
  primaryConceptLabel: string | null;
  coverage: string | null;
  conceptCount: number;
}

export function getConceptCausalEdges(
  currentConceptId: string,
  nodes: ConceptNode[],
  edges: ConceptEdge[]
): { downstream: ConceptCausalNode[]; upstream: ConceptCausalNode[] } {
  const nodeMap = new Map<string, ConceptNode>();
  for (const n of nodes) nodeMap.set(n.id, n);

  const downstream: ConceptCausalNode[] = [];
  const upstream: ConceptCausalNode[] = [];

  // 1. Inspect graph edges
  for (const e of edges) {
    if (e.source === currentConceptId) {
      // Current depends on target (downstream)
      const targetNode = nodeMap.get(e.target);
      if (targetNode) {
        const stageId = getStageIdForConcept(targetNode);
        const stage = PROGRAM_STAGES.find((s) => s.id === stageId);
        downstream.push({
          conceptId: targetNode.id,
          conceptLabel: targetNode.label,
          stageId,
          stageNumber: stage?.number || 1,
          stageTag: stage?.layerTag || 'BEDROCK',
          relation: e.label || 'Builds upon',
        });
      }
    } else if (e.target === currentConceptId) {
      // Source depends on current (upstream empowers)
      const sourceNode = nodeMap.get(e.source);
      if (sourceNode) {
        const stageId = getStageIdForConcept(sourceNode);
        const stage = PROGRAM_STAGES.find((s) => s.id === stageId);
        upstream.push({
          conceptId: sourceNode.id,
          conceptLabel: sourceNode.label,
          stageId,
          stageNumber: stage?.number || 8,
          stageTag: stage?.layerTag || 'SUPERSTRUCTURE',
          relation: e.label || 'Empowers',
        });
      }
    }
  }

  // 2. Fallback to stage causality if concept has no direct concept edges
  const current = nodeMap.get(currentConceptId);
  if (current) {
    const currentStageId = getStageIdForConcept(current);
    const stageCausality = getStageCausality(currentStageId);

    if (downstream.length === 0 && stageCausality.buildsUpon.length > 0) {
      for (const link of stageCausality.buildsUpon) {
        const stage = PROGRAM_STAGES.find((s) => s.id === link.targetId);
        const targetConcepts = nodes.filter((n) => getStageIdForConcept(n) === link.targetId);
        const pick = targetConcepts[0];
        if (pick && stage) {
          downstream.push({
            conceptId: pick.id,
            conceptLabel: pick.label,
            stageId: stage.id,
            stageNumber: stage.number,
            stageTag: stage.layerTag,
            relation: link.relationship,
          });
        }
      }
    }

    if (upstream.length === 0 && stageCausality.empowers.length > 0) {
      for (const link of stageCausality.empowers) {
        const stage = PROGRAM_STAGES.find((s) => s.id === link.targetId);
        const targetConcepts = nodes.filter((n) => getStageIdForConcept(n) === link.targetId);
        const pick = targetConcepts[0];
        if (pick && stage) {
          upstream.push({
            conceptId: pick.id,
            conceptLabel: pick.label,
            stageId: stage.id,
            stageNumber: stage.number,
            stageTag: stage.layerTag,
            relation: link.relationship,
          });
        }
      }
    }
  }

  return { downstream, upstream };
}

export function getLanguageLevelMappings(
  langId: string,
  nodes: ConceptNode[]
): LanguageLevelMapping[] {
  const result: LanguageLevelMapping[] = [];

  for (const st of PROGRAM_STAGES) {
    const stageConcepts = nodes.filter((n) => !n.isLayer && getStageIdForConcept(n) === st.id);
    let primaryConcept: ConceptNode | null = null;
    let primaryCoverage: string | null = null;
    let verifiedCount = 0;

    for (const c of stageConcepts) {
      const cell = (c.details?.byLanguage || []).find(
        (x) => x.langId === langId || x.lang?.toLowerCase() === langId.toLowerCase()
      );
      if (cell) {
        if (!primaryConcept) {
          primaryConcept = c;
          primaryCoverage = cell.coverage || 'verified';
        }
        if (cell.coverage === 'verified' || cell.coverage === 'partial') {
          primaryConcept = c;
          primaryCoverage = cell.coverage;
          verifiedCount++;
        }
      }
    }

    result.push({
      stageId: st.id,
      stageNumber: st.number,
      stageTitle: st.title,
      stageTag: st.layerTag,
      stageColor: st.color,
      primaryConceptId: primaryConcept?.id || stageConcepts[0]?.id || null,
      primaryConceptLabel: primaryConcept?.label || stageConcepts[0]?.label || null,
      coverage: primaryCoverage,
      conceptCount: verifiedCount || stageConcepts.length,
    });
  }

  return result;
}
