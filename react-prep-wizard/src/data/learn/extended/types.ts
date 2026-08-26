import type { LearnTopic, LearnArea } from '../types';

export type RoadmapTrackId = 'core' | 'roadmap-react' | 'roadmap-perf' | 'roadmap-frontend';

export interface RoadmapTrack {
  id: RoadmapTrackId;
  name: string;
  badge: string;
  icon: string;
  sourceUrl?: string;
  description: string;
  topics: LearnTopic[];
  areas: LearnArea[];
}
