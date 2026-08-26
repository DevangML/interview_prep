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
