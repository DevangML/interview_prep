/**
 * Inferences and community reports — deliberately separate from
 * `mettlBlueprints.ts`, which contains only what the vendor publishes.
 *
 * Keeping the two apart is the point: a reader must be able to tell at a glance
 * which numbers are sourced and which are reasoned.
 */

/**
 * Inferred weighting for a 36-question paper, derived from the order and
 * granularity of the vendor competency lists. Labelled inference: Mettl
 * publishes competencies, never per-competency question counts.
 */
export const INFERRED_WEIGHTING: { competency: string; share: number; questionsIn36: number }[] = [
  { competency: 'React Core', share: 0.25, questionsIn36: 9 },
  { competency: 'Redux', share: 0.19, questionsIn36: 7 },
  { competency: 'ECMAScript', share: 0.17, questionsIn36: 6 },
  { competency: 'React Hooks', share: 0.14, questionsIn36: 5 },
  { competency: 'JS Logic', share: 0.08, questionsIn36: 3 },
  { competency: 'React 19', share: 0.08, questionsIn36: 3 },
  { competency: 'Async & Event Loop', share: 0.05, questionsIn36: 2 },
  { competency: 'React Tools', share: 0.04, questionsIn36: 1 },
];

/** Accenture wraps the technical section; corroborated by community reports, not vendor-published. */
export const ACCENTURE_PROCESS = {
  stages: [
    'Cognitive ability: aptitude + logical + verbal, roughly 30 questions in 30 minutes, including diagrammatic/abstract reasoning',
    'Technical MCQ section: React/JavaScript fundamentals, around 30 questions for React roles',
    'Coding round where the role calls for one',
    'Technical interview, then HR/behavioural',
  ],
  implications: [
    'The React section is not the first thing you sit; fatigue is part of the instrument.',
    'Mettl supports custom and bulk-uploaded items, so the exact paper may blend competencies across blueprints.',
  ],
  confidence: 'community-reported, not vendor-published',
};
