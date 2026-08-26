/**
 * Projects are the build track. Each carries checked `conceptIds`, so a reader
 * can go from a concept to a project that exercises it and back again.
 *
 * Split out of `buildContent.ts` to keep both files under the 200-line rule.
 */
import { PROJECT_BLUEPRINTS } from '../src/data/projects';
import { COVERAGE_BY_PROJECT } from '../src/data/projects/coverage';

type TagFn = (text: string) => string[];

export function buildProjects(tagsFor: TagFn) {
  return PROJECT_BLUEPRINTS.map((p) => {
    const cov = COVERAGE_BY_PROJECT.get(p.id);
    return {
    id: p.id,
    kind: 'project',
    tier: p.tier,
    difficulty: p.difficulty,
    title: p.title,
    tagline: p.tagline,
    realWorldAnalog: p.realWorldAnalog,
    architecturePattern: p.architecturePattern,
    essence: p.summary,
    estimatedBuildTimeHours: p.estimatedBuildTimeHours,
    xp: p.xpBounty,
    prerequisites: p.prerequisites ?? [],
    inScope: p.coreScopeBoundaries.inScopeMinimal,
    outOfScope: p.coreScopeBoundaries.outOfScopeBloat,
    stages: p.stages,
    layers: p.layers,
    teaches: p.explicitTopics,
    implicitFoundations: p.implicitFoundations,
    frameworkVsManual: p.frameworkVsManual,
    conceptIds: [...new Set(p.explicitTopics.flatMap((t) => t.conceptIds))],
    /** Every concept this project uses, with a reason — the graph's edge list. */
    uses: cov?.edges ?? [],
    /** Every concept it deliberately does not, with a reason. */
    doesNotUse: (cov?.exemptions ?? []).flatMap((x) =>
      x.conceptIds.map((conceptId) => ({ conceptId, reason: x.reason }))),
    tags: [...new Set([...p.tags.map((t) => t.toLowerCase()), ...tagsFor(`${p.title} ${p.summary}`)])],
    };
  });
}

/** Reverse index: concept -> the projects that build it. */
export function indexProjectsByConcept(projects: ReturnType<typeof buildProjects>) {
  return projects.reduce<Record<string, string[]>>((acc, p) => {
    for (const u of p.uses) (acc[u.conceptId] ??= []).push(p.id);
    return acc;
  }, {});
}
