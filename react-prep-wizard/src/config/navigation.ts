import {
  Sparkles,
  Play,
  Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavSection {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
  desc: string;
  isFlagship?: boolean;
}

export const NAVIGATION_PILLARS: NavSection[] = [
  {
    id: 'mastery',
    label: 'The Mastery Path',
    to: '/',
    icon: Sparkles,
    desc: 'Unified Theory, Code Crucible & Spoken Defense',
    isFlagship: true,
  },
  {
    id: 'rapid',
    label: 'Rapid Fire OA',
    to: '/rapid',
    icon: Zap,
    desc: 'Mettl MCQ Simulator',
  },
  {
    id: 'lab',
    label: 'Sandbox Lab',
    to: '/playground',
    icon: Play,
    desc: 'Freeform Live Code Playground',
  },
];
