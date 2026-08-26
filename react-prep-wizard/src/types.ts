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

/* ── Socratic AI Evaluator types ── */

export type AdjudicationRuling = 'STUDENT_CORRECT' | 'STUDENT_ERRED' | 'AMBIGUOUS_SPEC' | 'ALTERNATIVE_VALID';

export interface ImpartialComparisonPillars {
  specRequirements: string;
  studentBehavior: string;
  testHarnessStatus: string;
  impartialReasoning: string;
}

export interface DisputeRecord {
  userArgument: string;
  aiRuling: string;
  verdict: AdjudicationRuling;
  timestamp: number;
}

export interface SocraticEvaluationVerdict {
  /** Strict boolean: true if the student's solution is logically/semantically valid despite failing Tier 1 */
  isSemanticPass: boolean;
  /** Formal impartial adjudication ruling */
  adjudicationVerdict?: AdjudicationRuling;
  /** Confidence score between 0.0 and 1.0 */
  confidence: number;
  /** Categorized defect type */
  defectCategory?: string;
  /** Diagnostic summary explaining what the code actually does vs intended goal */
  diagnosticSummary: string;
  /** 4-pillar impartial comparative breakdown */
  impartialComparison?: ImpartialComparisonPillars;
  /** Level 1: Gentle conceptual question without revealing code */
  socraticHintLevel1: string;
  /** Level 2: Specific variable / property to inspect */
  socraticHintLevel2: string;
  /** Level 3: Concrete structural fix guidance */
  socraticHintLevel3: string;
  /** Suggested angle or argument for challenging the verdict if user feels it is a false negative */
  disputePromptSuggestion?: string;
  /** Tracked history of user disputes and AI appellate rulings */
  disputeHistory?: DisputeRecord[];
  /**
   * Line-anchored defects. The model quotes the offending substring rather than
   * reporting a line number — quoting is copying, which models do reliably;
   * counting lines is arithmetic, which they do not.
   */
  findings?: {
    anchorCode: string;
    severity: 'bug' | 'smell' | 'missing';
    concept: string;
    hint: string;
    fix: string;
  }[];
}

