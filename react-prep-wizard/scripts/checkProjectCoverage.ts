/**
 * Fails when the project library's coverage claims stop being true.
 *
 * Three things can go wrong and none of them are visible by reading:
 *   1. A project claims a concept id that does not exist (typo, or a renamed topic).
 *   2. A Learn topic exists that no project teaches — the gap this check was written for.
 *   3. A prerequisite points at a project id that is not in the library.
 *
 * Run: npm run check:projects
 */
import { LEARN_TOPICS } from '../src/data/learn';
import { PROJECT_BLUEPRINTS, PROJECT_BY_ID, coveredConceptIds } from '../src/data/projects';
import type { ProjectTier } from '../src/data/projects';

const known = new Set(LEARN_TOPICS.map((t) => t.id));
const errors: string[] = [];

// 1. Every claimed id must exist.
for (const p of PROJECT_BLUEPRINTS) {
  const claimed = [
    ...p.explicitTopics.flatMap((t) => t.conceptIds),
    ...p.implicitFoundations.flatMap((f) => f.conceptIds ?? []),
  ];
  for (const id of claimed) {
    if (!known.has(id)) errors.push(`${p.id}: unknown concept id "${id}"`);
  }
  if (p.explicitTopics.some((t) => t.conceptIds.length === 0)) {
    errors.push(`${p.id}: an explicitTopics entry claims coverage with no conceptIds`);
  }
  if (p.stages.length < 2) errors.push(`${p.id}: needs at least two stages to show an evolution`);
  for (const pre of p.prerequisites ?? []) {
    if (!PROJECT_BY_ID.has(pre)) errors.push(`${p.id}: prerequisite "${pre}" is not a project`);
  }
}

// 2. Every Learn topic must be taught by at least one project.
const covered = coveredConceptIds();
const orphans = LEARN_TOPICS.filter((t) => !covered.has(t.id));
for (const t of orphans) errors.push(`uncovered topic: ${t.id} (${t.area} — ${t.title})`);

// Report.
const byTier = (tier: ProjectTier) => PROJECT_BLUEPRINTS.filter((p) => p.tier === tier).length;
console.log(
  `projects: ${PROJECT_BLUEPRINTS.length} ` +
  `(basic ${byTier('basic')} · intermediate ${byTier('intermediate')} · advanced ${byTier('advanced')})\n` +
  `learn topics: ${LEARN_TOPICS.length} · covered: ${LEARN_TOPICS.length - orphans.length}`,
);

if (errors.length) {
  console.error(`\n${errors.length} coverage error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('coverage: complete — every Learn topic is claimed by at least one project.');
