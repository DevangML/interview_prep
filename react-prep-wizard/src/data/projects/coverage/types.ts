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
 * concept can no longer be quietly skipped.
 *
 * Exemptions are legal at EVERY tier. The previous rule — "intermediate and
 * advanced projects must cover the full concept space" — did not describe
 * reality, it manufactured it: a project that may not exempt anything and must
 * classify everything has exactly one legal shape, 56 edges. Eleven of the
 * twenty-one manifests duly landed on 56/56, 64% of all edges were `implicit`,
 * and a graph in which eleven nodes are complete tells a learner nothing.
 *
 * A project covers what it covers. Breadth is a property of the whole library,
 * not a quota each project has to fill.
 */

/**
 * How the project touches the concept.
 *
 * `explicit` versus `implicit` is decided by a rule, not by taste, and
 * `scripts/auditGraph.ts` enforces it: an edge is explicit when its `where`
 * names a Stage — the project's own narrative spine — or when the concept is
 * one the blueprint headlines in `explicitTopics`. Everything else is genuinely
 * exercised without being the headline, which is what implicit means.
 *
 * `implicit` is the load-bearing honesty risk: "a CRDT is really immutability"
 * can be said about anything, so it is capped. A project may not claim more
 * implicit edges than explicit ones — if the headline work does not carry the
 * claim, the claim is decoration and belongs in an exemption.
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
