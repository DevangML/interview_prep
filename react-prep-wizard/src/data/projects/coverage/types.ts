/**
 * Project → concept coverage, stated edge by edge.
 *
 * The previous model let a project claim four topics and stay silent about the
 * other fifty-two. Silence is not a claim, so it could never be wrong. Here
 * every (project, concept) pair must be classified as one of:
 *
 *   - an EDGE     — the project uses the concept, with a reason and a location
 *   - an EXEMPTION — the project deliberately does not, with a stated reason
 *
 * `scripts/checkProjectCoverage.ts` fails on any pair that is neither, so a
 * concept can no longer be quietly skipped. Exemptions are permitted only in
 * the basic tier: a 0-3 YOE build has a legitimate reason to stop somewhere.
 * Intermediate and advanced projects must cover the full concept space.
 */

/**
 * How the project touches the concept.
 *
 * `explicit` versus `implicit` is decided by a rule, not by taste, and
 * `scripts/auditGraph.ts` enforces it: an edge is explicit when its `where`
 * names a Stage — the project's own narrative spine — or when the concept is
 * one the blueprint headlines in `explicitTopics`. Everything else is genuinely
 * exercised without being the headline, which is what implicit means.
 */
export type EdgeKind =
  /** Named in a stage or headlined by the blueprint. */
  | 'explicit'
  /** Genuinely exercised while doing the work, without being the headline. */
  | 'implicit'
  /** Present only as the thing you must NOT do — a trap the project walks into. */
  | 'counterexample';

export interface ConceptEdge {
  conceptId: string;
  kind: EdgeKind;
  /** Where in the project this happens — a stage name, layer, or artefact. */
  where: string;
  /** Why the project needs it. Renders on the graph edge; must be specific. */
  why: string;
}

export interface CoverageExemption {
  /** Must justify the omission by tier, not by convenience. */
  reason: string;
  conceptIds: string[];
}

export interface ProjectCoverage {
  projectId: string;
  edges: ConceptEdge[];
  exemptions: CoverageExemption[];
}

/** Terse edge constructor — keeps a 56-entry manifest to 56 readable lines. */
export const e = (conceptId: string, kind: EdgeKind, where: string, why: string): ConceptEdge =>
  ({ conceptId, kind, where, why });
