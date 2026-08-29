import type { LearnTopic, LearnArea } from '../types';

export type RoadmapTrackId =
  | 'core'
  | 'roadmap-react'
  | 'roadmap-perf'
  | 'roadmap-frontend'
  | 'roadmap-system-design';

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
