import {
  GraduationCap,
  Sparkles,
  Play,
  Zap,
  Lightbulb
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
    id: 'learn',
    label: 'The Library',
    to: '/learn',
    icon: GraduationCap,
    desc: 'Read the mechanism before drilling it',
  },
  {
    id: 'live-ops',
    label: '⚡ Live Ops Console',
    to: '/live-ops',
    icon: Zap,
    desc: 'Step-by-Step Machine Coding Crucible & Socratic Guide',
    isFlagship: true,
  },
  {
    id: 'projects',
    label: '💡 Project Ideas',
    to: '/projects',
    icon: Lightbulb,
    desc: 'Tier-1 Masterclass Projects & Architecture Blueprints',
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
