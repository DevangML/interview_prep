import { getStageIdForConcept } from './stages';
import { preferredCell } from './langCells';
import type { ConceptNode } from '../store/types';

export function resolveConceptSelection(
  nodes: ConceptNode[],
  conceptId: string | null,
  langPreference: string | null,
  fallbackTrack: string | null
): { stageId: string | null; language: string | null } {
  if (!conceptId) return { stageId: null, language: null };
  const node = nodes.find((n) => n.id === conceptId);
  if (!node) return { stageId: null, language: null };

  const stageId = getStageIdForConcept(node);
  const prefer = langPreference || fallbackTrack;
  const cell = preferredCell(node.details?.byLanguage, prefer);
  const language = cell?.langId || cell?.lang || langPreference;

  return { stageId, language };
}
