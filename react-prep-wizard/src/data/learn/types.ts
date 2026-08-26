/**
 * The Learn library types & Knowledge Constellation schema.
 */

export type LearnArea =
  | 'Web Platform'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'React Core'
  | 'React Advanced'
  | 'React 19'
  | 'Routing'
  | 'State Management'
  | 'Data & APIs'
  | 'Testing'
  | 'Performance'
  | 'Accessibility'
  | 'Tooling'
  | 'Architecture';

export type CoverageStatus = 'covered' | 'partial' | 'missing';
export type ResourceKind = 'docs' | 'spec' | 'article' | 'video' | 'practice' | 'book';

export interface LearnResource {
  label: string;
  url: string;
  kind: ResourceKind;
  note?: string;
}

export interface ConceptDuelQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LearnTopic {
  id: string;
  area: LearnArea;
  group: string;
  title: string;
  status: CoverageStatus;
  minutes: number;
  summary: string;
  body: string[];
  keyPoints: string[];
  interview: string;
  pitfalls?: string[];
  code?: string;
  resources: LearnResource[];

  /** Gamified Connection & Skill Graph metadata */
  prerequisites?: string[];
  unlocks?: string[];
  relatedUnitId?: string;
  conceptDuel?: ConceptDuelQuestion[];
}
