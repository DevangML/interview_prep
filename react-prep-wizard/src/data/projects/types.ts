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

/** Study tier. `basic` is the 0-3 YOE entry point, `advanced` is the dare tier. */
export type ProjectTier = 'basic' | 'intermediate' | 'advanced';

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

export const TIER_ORDER: ProjectTier[] = ['basic', 'intermediate', 'advanced'];

export const TIER_META: Record<ProjectTier, { label: string; blurb: string; audience: string }> = {
  basic: {
    label: 'Foundations',
    blurb: 'Small builds that make one mechanism impossible to forget.',
    audience: '0-3 YOE · what an OA and a first technical round actually ask',
  },
  intermediate: {
    label: 'Working Engineer',
    blurb: 'Real applications where the failure modes are the lesson.',
    audience: '2-5 YOE · the round where they ask why, not what',
  },
  advanced: {
    label: 'The Dare',
    blurb: 'Architectures that only work if the invariants hold.',
    audience: 'Staff & Principal · nobody expects you to finish these',
  },
};
