export interface Diagram {
  w?: number;
  h?: number;
  frame?: any[];
  box?: any[][];
  gap?: any[][];
  note?: any[][];
  arrow?: any[][];
  track?: any[][];
  alt?: Diagram;
  labels?: [string, string];
  [key: string]: any;
}

export interface Challenge {
  id: string;
  title: string;
  cat: string;
  task: string;
  goal: string;
  why: string;
  verify?: string;
  visual?: boolean;
  useApp?: boolean;
  use: [string, string][];
  hints: string[];
  dia?: Diagram;
  jsx: string;
  css: string;
  sol: string;
  markup?: string;
  [key: string]: any;
}

export interface Category {
  k: string;
  n: string;
  blurb?: string;
}

/* ── Campaign / Server types ── */

export interface RankTier {
  rank: string;
  at_xp: number;
}

export interface Progression {
  rank: string;
  xp: number;
  xp_total: number;
  challenges_cleared: number;
  challenges_total: number;
  ladder_lessons_done?: number;
  current_quest?: string;
  rank_ladder: RankTier[];
}

export interface QuestChallenge {
  id: string;
  name: string;
  playable: boolean;
  done: boolean;
  completed_at?: string;
}

export interface Quest {
  id: string;
  title: string;
  why?: string;
  xp: number;
  status: string;
  challenges?: QuestChallenge[];
}

export interface CampaignState {
  active_campaign: {
    progression: Progression;
    quests: Quest[];
    ladder_progress?: Record<string, { done: boolean; at: string }>;
  };
}

export interface ActivityEvent {
  ev: string;
  at?: string;
  id?: string;
  page?: string;
  quest?: string;
  title?: string;
  label?: string;
  hint?: number;
}

/* ── Rapid Fire types ── */

export interface RapidQuestion {
  q: string;
  opts: string[];
  ans: number;
  why: string;
  cat: string;
  time?: number;
}

export interface RapidSnippet {
  q: string;
  code: string;
  test: (result: unknown) => boolean;
  why: string;
  cat: string;
  time?: number;
}

/* ── Compilation ── */

export interface CompileResult {
  code?: string;
  error?: string;
}
