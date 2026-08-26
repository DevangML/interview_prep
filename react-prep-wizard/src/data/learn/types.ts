/**
 * The Learn library.
 *
 * The drill stream tests you. This reads to you — and the two are deliberately
 * different jobs. A drill withholds method so recall has something to grip; a
 * lesson explains the mechanism so there is something to recall in the first
 * place. You cannot retrieve what was never encoded.
 *
 * Every topic carries `status`, comparing it against what the drill syllabus
 * actually covers. That column is the honest part: it says out loud where the
 * practice material is thin, so reading here is not mistaken for having drilled
 * there.
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

/** How well the *drill* syllabus covers this — not how important it is. */
export type CoverageStatus =
  /** Drilled in the Mastery stream or the rapid bank. */
  | 'covered'
  /** Touched, but thinly — a question or two, no practice. */
  | 'partial'
  /** Not in the syllabus at all. Reading here is the only exposure. */
  | 'missing';

export type ResourceKind = 'docs' | 'spec' | 'article' | 'video' | 'practice' | 'book';

export interface LearnResource {
  label: string;
  url: string;
  kind: ResourceKind;
  /** Why this one, rather than the hundred others. */
  note?: string;
}

export interface LearnTopic {
  id: string;
  area: LearnArea;
  /** Sub-section within the area, used for the second grouping level. */
  group: string;
  title: string;
  status: CoverageStatus;
  /** Honest reading time for the body, in minutes. */
  minutes: number;
  /** One paragraph: what this is and why it exists. */
  summary: string;
  /** The teaching itself. Each string is a paragraph. */
  body: string[];
  /** The sentences worth memorising. */
  keyPoints: string[];
  /** How the topic actually shows up in an interview or an OA. */
  interview: string;
  /** The specific ways people get this wrong. */
  pitfalls?: string[];
  /** Illustrative, minimal, and runnable in your head. */
  code?: string;
  resources: LearnResource[];
}
