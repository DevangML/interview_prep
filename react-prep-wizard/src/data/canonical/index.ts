import { platformConcepts } from './platformConcepts';
import { jsMettlTraps } from './jsMettlTraps';
import { jsReactConcepts } from './jsReactConcepts';
import { advancedConcepts } from './advancedConcepts';
import { behaviouralConcepts } from './behaviouralConcepts';
import type { CanonicalConcept, CurriculumPillar } from './types';

export * from './types';

/**
 * Master Canonical Curriculum Ledger:
 * The single source of truth registering every topic, subtopic, mechanism, and interview trap
 * taught across the entire platform (Base Learn Library, Mastery Stream, Extended Roadmaps, Mettl OA & Project Ideas).
 */
export const CANONICAL_CURRICULUM_LEDGER: CanonicalConcept[] = [
  ...platformConcepts,
  ...jsMettlTraps,
  ...jsReactConcepts,
  ...advancedConcepts,
  ...behaviouralConcepts,
];

export const CONCEPT_BY_ID = new Map<string, CanonicalConcept>(
  CANONICAL_CURRICULUM_LEDGER.map((c) => [c.id, c])
);

export function getConceptsForPillar(pillar: CurriculumPillar): CanonicalConcept[] {
  return CANONICAL_CURRICULUM_LEDGER.filter((c) => c.pillar === pillar);
}
