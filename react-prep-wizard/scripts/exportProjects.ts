/**
 * Projects are the build track. Each carries checked `conceptIds`, so a reader
 * can go from a concept to a project that exercises it and back again.
 *
 * Split out of `buildContent.ts` to keep both files under the 200-line rule.
 */
import { PROJECT_BLUEPRINTS } from '../src/data/projects';

type TagFn = (text: string) => string[];

export function buildProjects(tagsFor: TagFn) {
  return PROJECT_BLUEPRINTS.map((p) => ({
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
    tags: [...new Set([...p.tags.map((t) => t.toLowerCase()), ...tagsFor(`${p.title} ${p.summary}`)])],
  }));
}

/** Reverse index: concept -> the projects that build it. */
export function indexProjectsByConcept(projects: ReturnType<typeof buildProjects>) {
  return projects.reduce<Record<string, string[]>>((acc, p) => {
    for (const id of p.conceptIds) (acc[id] ??= []).push(p.id);
    return acc;
  }, {});
}
