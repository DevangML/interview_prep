export type CurriculumPillar =
  | 'Web Platform & Internet'
  | 'HTML & Accessibility'
  | 'Modern CSS & Layout'
  | 'JavaScript & V8 Runtime'
  | 'JavaScript Mettl OA Traps'
  | 'TypeScript Invariants'
  | 'React Core & Fiber'
  | 'Hooks Hierarchy'
  | 'React 19 & RSC'
  | 'State & Server Cache'
  | 'Routing, Forms & Tooling'
  | 'Performance & Web Vitals'
  | 'Testing & QA'
  | 'Behavioural & Leadership Engineering';

export interface CanonicalConcept {
  id: string;
  pillar: CurriculumPillar;
  title: string;
  subtopics: string[];
  mechanismSummary: string;
  interviewSignificance: string;
}
