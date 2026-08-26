import type { RoadmapTrack, RoadmapTrackId } from './types';
import { LEARN_TOPICS, AREA_ORDER } from '../index';
import { reactRoadmapTopics } from './reactRoadmap';
import { performanceRoadmapTopics } from './performanceRoadmap';
import { frontendRoadmapTopics } from './frontendRoadmap';
import type { LearnTopic, LearnArea } from '../types';

export type { RoadmapTrack, RoadmapTrackId };

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: 'core',
    name: 'FAANG Interview Crucible',
    badge: 'Core Track',
    icon: '🎯',
    description: 'Our hand-crafted 56-topic interview crucible covering React 19, Fiber, and Web Platform mechanics.',
    topics: LEARN_TOPICS,
    areas: AREA_ORDER,
  },
  {
    id: 'roadmap-react',
    name: 'roadmap.sh/react (Definitive)',
    badge: 'React Extended',
    icon: '⚛️',
    sourceUrl: 'https://roadmap.sh/react',
    description: 'The official recommended React Roadmap covering JSX, Hooks hierarchy, State, Server Components & Testing.',
    topics: reactRoadmapTopics,
    areas: ['React Core', 'State Management', 'Data & APIs', 'React 19'],
  },
  {
    id: 'roadmap-perf',
    name: 'roadmap.sh/performance',
    badge: 'Performance Extended',
    icon: '⚡',
    sourceUrl: 'https://roadmap.sh/frontend-performance-best-practices',
    description: 'Frontend performance best practices, Web Vitals, payload budgets, Brotli, and LoAF profiling.',
    topics: performanceRoadmapTopics,
    areas: ['Performance'],
  },
  {
    id: 'roadmap-frontend',
    name: 'roadmap.sh/frontend (React)',
    badge: 'Frontend Extended',
    icon: '🌐',
    sourceUrl: 'https://roadmap.sh/frontend',
    description: 'Modern Frontend foundations filtered for React developers: Critical Rendering Path, WCAG A11y, and CSS Grid.',
    topics: frontendRoadmapTopics,
    areas: ['Web Platform', 'Accessibility', 'CSS'],
  },
];

export const TRACK_MAP = new Map<RoadmapTrackId, RoadmapTrack>(
  ROADMAP_TRACKS.map(t => [t.id, t])
);

export function getTopicsForTrack(trackId: RoadmapTrackId): { topics: LearnTopic[]; areas: LearnArea[] } {
  const track = TRACK_MAP.get(trackId) || ROADMAP_TRACKS[0];
  return { topics: track.topics, areas: track.areas };
}

/**
 * Every topic in the Learn tab, deduplicated — the core crucible plus each
 * extended roadmap track.
 *
 * This is the denominator for any coverage claim. Measuring a project against
 * `LEARN_TOPICS` alone reported "59/56", which is both wrong and flattering:
 * the roadmap tracks are part of the curriculum a learner is shown, so they are
 * part of what a project has to answer for.
 */
export const ALL_TOPICS: LearnTopic[] = (() => {
  const byId = new Map<string, LearnTopic>();
  for (const track of ROADMAP_TRACKS) {
    for (const topic of track.topics) if (!byId.has(topic.id)) byId.set(topic.id, topic);
  }
  return [...byId.values()];
})();

export const ALL_TOPIC_BY_ID = new Map(ALL_TOPICS.map((t) => [t.id, t]));
