import type { LearnTopic, LearnArea } from './types';
import { platformTopics } from './platform';
import { markupTopics } from './markup';
import { cssFoundationTopics } from './cssFoundations';
import { cssFlexTopics } from './cssFlex';
import { cssGridTopics } from './cssGrid';
import { cssLayoutTopics } from './cssLayout';
import { cssResponsiveTopics } from './cssResponsive';
import { jsLanguageTopics } from './jsLanguage';
import { jsOperatorTopics } from './jsOperators';
import { jsAsyncTopics } from './jsAsync';
import { jsDataTopics } from './jsData';
import { reactCoreTopics } from './reactCore';
import { reactImmutabilityTopics } from './reactImmutability';
import { reactAdvancedTopics } from './reactAdvanced';
import { react19Topics } from './react19';
import { stateTopics } from './stateManagement';
import { routingToolingTopics } from './routingTooling';
import { engineeringTopics } from './engineering';

export type { LearnTopic, LearnArea, LearnResource, CoverageStatus } from './types';

/**
 * The reading curriculum, assembled from per-area modules.
 *
 * Split by area rather than gathered into one file, so each module stays inside
 * the 200-line limit and adding a topic touches exactly one file.
 */
export const LEARN_TOPICS: LearnTopic[] = [
  ...platformTopics,
  ...markupTopics,
  ...cssFoundationTopics,
  ...cssFlexTopics,
  ...cssGridTopics,
  ...cssLayoutTopics,
  ...cssResponsiveTopics,
  ...jsLanguageTopics,
  ...jsOperatorTopics,
  ...jsAsyncTopics,
  ...jsDataTopics,
  ...reactCoreTopics,
  ...reactImmutabilityTopics,
  ...reactAdvancedTopics,
  ...react19Topics,
  ...stateTopics,
  ...routingToolingTopics,
  ...engineeringTopics,
];

/** Reading order: prerequisites before the things that need them. */
export const AREA_ORDER: LearnArea[] = [
  'Web Platform', 'HTML', 'Accessibility', 'CSS', 'JavaScript', 'TypeScript',
  'React Core', 'React Advanced', 'React 19', 'Routing', 'State Management',
  'Data & APIs', 'Testing', 'Performance', 'Tooling', 'Architecture',
];

export const TOPIC_BY_ID: ReadonlyMap<string, LearnTopic> = new Map(
  LEARN_TOPICS.map((t) => [t.id, t]),
);

/** Honest totals, including how much of this the drill syllabus actually covers. */
export function learnCoverage() {
  const byStatus = { covered: 0, partial: 0, missing: 0 };
  for (const t of LEARN_TOPICS) byStatus[t.status]++;
  return {
    topics: LEARN_TOPICS.length,
    areas: new Set(LEARN_TOPICS.map((t) => t.area)).size,
    minutes: LEARN_TOPICS.reduce((n, t) => n + t.minutes, 0),
    resources: LEARN_TOPICS.reduce((n, t) => n + t.resources.length, 0),
    ...byStatus,
  };
}
