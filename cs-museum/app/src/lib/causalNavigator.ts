import { PROGRAM_STAGES, getStageIdForConcept } from './stages';
import type { ConceptNode, ConceptEdge } from '../store/types';

export interface CausalTargetResult {
  conceptId: string;
  conceptLabel: string;
  stageId: string;
  stageNumber: number;
  stageTag: string;
  direction: 'downstream' | 'upstream' | 'peer';
  reason: string;
}

export function resolveCausalTargetForLevel(
  targetStageId: string,
  targetStageNumber: number,
  currentConceptId: string | null,
  activeLanguage: string | null,
  nodes: ConceptNode[],
  edges: ConceptEdge[]
): CausalTargetResult | null {
  const nodeMap = new Map<string, ConceptNode>();
  for (const n of nodes) nodeMap.set(n.id, n);

  const targetConcepts = nodes.filter(
    (n) => !n.isLayer && getStageIdForConcept(n) === targetStageId
  );
  if (targetConcepts.length === 0) return null;

  const targetConceptIds = new Set(targetConcepts.map((n) => n.id));
  const targetStage = PROGRAM_STAGES.find((s) => s.id === targetStageId);
  const stageTag = targetStage?.layerTag || 'P';

  const pickBestByLanguage = (candidates: ConceptNode[]): ConceptNode => {
    if (!activeLanguage) return candidates[0];
    const langLower = activeLanguage.toLowerCase();
    const verified = candidates.find((c) =>
      c.details?.byLanguage?.some(
        (cell) =>
          (cell.langId?.toLowerCase() === langLower || cell.lang?.toLowerCase() === langLower) &&
          (cell.coverage === 'verified' || cell.coverage === 'partial')
      )
    );
    if (verified) return verified;
    const hasCell = candidates.find((c) =>
      c.details?.byLanguage?.some(
        (cell) => cell.langId?.toLowerCase() === langLower || cell.lang?.toLowerCase() === langLower
      )
    );
    return hasCell || candidates[0];
  };

  if (!currentConceptId) {
    const pick = pickBestByLanguage(targetConcepts);
    return {
      conceptId: pick.id,
      conceptLabel: pick.label,
      stageId: targetStageId,
      stageNumber: targetStageNumber,
      stageTag,
      direction: 'peer',
      reason: activeLanguage ? `${activeLanguage} invariant` : 'Stage invariant',
    };
  }

  const currentConcept = nodeMap.get(currentConceptId);
  const currentStageId = currentConcept ? getStageIdForConcept(currentConcept) : null;
  const currentStage = PROGRAM_STAGES.find((s) => s.id === currentStageId);
  const currentStageNum = currentStage?.number || targetStageNumber;
  const direction: 'downstream' | 'upstream' | 'peer' =
    targetStageNumber < currentStageNum
      ? 'downstream'
      : targetStageNumber > currentStageNum
      ? 'upstream'
      : 'peer';

  const getDownstreamNeighbors = (conceptId: string): string[] => {
    const res: string[] = [];
    for (const e of edges) {
      if (e.source === conceptId) res.push(e.target);
    }
    const node = nodeMap.get(conceptId);
    if (node?.details?.empowered_by) {
      for (const ep of node.details.empowered_by) {
        if (ep.nodeId) res.push(ep.nodeId);
      }
    }
    if (node?.details?.inheritsFrom) {
      for (const inh of node.details.inheritsFrom) {
        if (inh.id) res.push(inh.id);
      }
    }
    return res;
  };

  const getUpstreamNeighbors = (conceptId: string): string[] => {
    const res: string[] = [];
    for (const e of edges) {
      if (e.target === conceptId) res.push(e.source);
    }
    const node = nodeMap.get(conceptId);
    if (node?.details?.specializesInto) {
      for (const sp of node.details.specializesInto) {
        if (sp.id) res.push(sp.id);
      }
    }
    return res;
  };

  const queue: string[] = [currentConceptId];
  const visited = new Set<string>([currentConceptId]);
  const matchedNodes: ConceptNode[] = [];

  while (queue.length > 0 && matchedNodes.length < 5) {
    const currId = queue.shift()!;
    const neighbors =
      direction === 'downstream'
        ? getDownstreamNeighbors(currId)
        : direction === 'upstream'
        ? getUpstreamNeighbors(currId)
        : [...getDownstreamNeighbors(currId), ...getUpstreamNeighbors(currId)];

    for (const nId of neighbors) {
      if (!visited.has(nId)) {
        visited.add(nId);
        if (targetConceptIds.has(nId)) {
          const match = nodeMap.get(nId);
          if (match) matchedNodes.push(match);
        } else {
          queue.push(nId);
        }
      }
    }
  }

  if (matchedNodes.length > 0) {
    const pick = pickBestByLanguage(matchedNodes);
    return {
      conceptId: pick.id,
      conceptLabel: pick.label,
      stageId: targetStageId,
      stageNumber: targetStageNumber,
      stageTag,
      direction,
      reason: direction === 'downstream' ? 'Depends on (causal chain)' : 'Empowers (causal chain)',
    };
  }

  const fallback = pickBestByLanguage(targetConcepts);
  return {
    conceptId: fallback.id,
    conceptLabel: fallback.label,
    stageId: targetStageId,
    stageNumber: targetStageNumber,
    stageTag,
    direction,
    reason: activeLanguage ? `${activeLanguage} in Layer ${targetStageNumber}` : 'Bedrock anchor',
  };
}
