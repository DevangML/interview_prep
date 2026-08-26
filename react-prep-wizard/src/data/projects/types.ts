/**
 * Project blueprint contract.
 *
 * Two rules shape this file:
 *  - A tier must be *expressible*. The difficulty union previously started at
 *    'Senior', so a 0-3 YOE project could not be typed at all.
 *  - A coverage claim must be *checkable*. `conceptIds` references real
 *    `LearnTopic` ids, so `scripts/checkProjectCoverage.ts` can fail the build
 *    when a topic is claimed that does not exist, or when a topic no project
 *    teaches is silently dropped. Prose alone is not coverage.
 */

/**
 * Who the project is evidence for.
 *
 * Difficulty alone was the wrong axis: it said how hard a build is, never who
 * would be persuaded by it. A service-company loop and a remote product loop
 * ask for different proof from the same candidate — one wants a machine-coding
 * round survived under time pressure, the other wants a repository someone can
 * read. A project is filed by the room it is meant to win.
 */
export type ProjectTrack = 'service' | 'product';

/** Two rungs inside each track: learn the mechanism, then prove it. */
export type ProjectTier = 'foundation' | 'flagship';

export type ProjectDifficulty =
  | 'Beginner'
  | 'Junior'
  | 'Intermediate'
  | 'Senior'
  | 'Staff'
  | 'Principal';

/**
 * Stages are a variable-length ladder, not a fixed four.
 * A beginner build has two honest stages; forcing it to invent a
 * "Canonical Concept Evolution" produced filler in the original four projects.
 */
export interface PedagogicalStage {
  stageNumber: number;
  stageName: string;
  focus: string;
  codeSnippet: string;
  failureModeOrInvariant: string;
  architecturalLesson: string;
}

export interface ExplicitTopicCoverage {
  category: string;
  topic: string;
  subtopic: string;
  howCovered: string;
  /** Ids from `src/data/learn` — the checkable half of the claim. */
  conceptIds: string[];
}

export interface ImplicitFoundation {
  domain:
    | 'Internet & Protocols'
    | 'V8 Engine & Memory'
    | 'DOM & Browser Pipeline'
    | 'Security & Invariants'
    | 'Language Semantics'
    | 'Tooling & Build';
  title: string;
  mechanism: string;
  realWorldImpact: string;
  /** Optional, but if a concept is claimed here it must exist. */
  conceptIds?: string[];
}

/**
 * A concrete thing the builder must produce.
 *
 * This is what makes the concept graph a promise rather than a description.
 * Every coverage edge anchors to a stage or to one of these, and the build
 * fails when an anchor resolves to nothing — so "implement the project as
 * specified" and "cover these concepts" are the same instruction.
 */
export interface Deliverable {
  /** Anchor id. Coverage edges reference this string in their `where`. */
  id: string;
  title: string;
  /** What must exist when this is done. Checkable by looking at the result. */
  spec: string;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  realWorldAnalog: string;
  track: ProjectTrack;
  tier: ProjectTier;
  difficulty: ProjectDifficulty;
  /** Hours of focused build time. Tier-calibrated, not decorative. */
  estimatedBuildTimeHours: number;
  architecturePattern: string;
  summary: string;
  tags: string[];
  xpBounty: number;
  /** Ids of projects worth finishing first. Empty for entry points. */
  prerequisites?: string[];
  coreScopeBoundaries: {
    inScopeMinimal: string[];
    outOfScopeBloat: string[];
  };
  stages: PedagogicalStage[];
  /** Named build artefacts. Every non-stage coverage anchor must be one of these. */
  deliverables: Deliverable[];
  layers: Array<{ layer: string; components: string[]; invariants: string[] }>;
  explicitTopics: ExplicitTopicCoverage[];
  implicitFoundations: ImplicitFoundation[];
  frameworkVsManual: {
    frameworkHandled: string[];
    manualEngineeringRequired: string[];
  };
}

export const TRACK_ORDER: ProjectTrack[] = ['service', 'product'];
export const TIER_ORDER: ProjectTier[] = ['foundation', 'flagship'];

export const TRACK_META: Record<ProjectTrack, { label: string; blurb: string; audience: string }> = {
  service: {
    label: 'Service & OA',
    blurb: 'Timed rounds, machine coding, and the questions a screening test asks.',
    audience: 'Accenture, Infosys, TCS, Capgemini · Mettl/HackerRank OA then a live build',
  },
  product: {
    label: 'Product & Remote',
    blurb: 'A repository a stranger reads and believes. Tests, types, deploy, trade-offs.',
    audience: 'Product companies and remote roles · portfolio and system-design rounds',
  },
};

export const TIER_META: Record<ProjectTier, { label: string; blurb: string }> = {
  foundation: {
    label: 'Foundation',
    blurb: 'Small builds that make one mechanism impossible to forget.',
  },
  flagship: {
    label: 'Flagship',
    blurb: 'The build you put on the CV and defend for forty minutes.',
  },
};

/** Every (track, tier) pair, in the order a learner should meet them. */
export const PROJECT_BUCKETS: Array<{ track: ProjectTrack; tier: ProjectTier }> =
  TRACK_ORDER.flatMap((track) => TIER_ORDER.map((tier) => ({ track, tier })));
