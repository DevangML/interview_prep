/**
 * Fails when a curriculum phase points at content that does not exist, or when
 * the phases stop covering the library. A study plan that references a deleted
 * unit is worse than no plan: it reads as authoritative and sends you nowhere.
 *
 * Run: npm run check:phases
 */
import { CURRICULUM_PHASES } from '../src/data/curriculum/phases';
import { MASTERY_UNITS, MASTERY_TRACKS } from '../src/data/masteryStream';
import { ALL_TOPICS } from '../src/data/learn/extended/trackRegistry';
import { PROJECT_BY_ID } from '../src/data/projects';

const unitIds = new Set(MASTERY_UNITS.map((u) => u.id));
const trackIds = new Set(MASTERY_TRACKS.map((t) => t.id as string));
const topicIds = new Set((ALL_TOPICS as any[]).map((t) => t.id));
const areas = new Set((ALL_TOPICS as any[]).map((t) => t.area));
const errors: string[] = [];

const seenOrder = new Set<number>();
for (const p of CURRICULUM_PHASES) {
  if (seenOrder.has(p.order)) errors.push(`${p.id}: duplicate order ${p.order}`);
  seenOrder.add(p.order);
  if (p.gates.length === 0) errors.push(`${p.id}: a phase without a gate cannot be failed, so it cannot be passed`);
  if (p.order > 0 && p.unlocks.length === 0) errors.push(`${p.id}: no role target — the phase does not say what it opens`);

  for (const id of p.draws.masteryTrackIds ?? []) if (!trackIds.has(id)) errors.push(`${p.id}: unknown mastery track "${id}"`);
  for (const id of p.draws.masteryUnitIds ?? []) if (!unitIds.has(id)) errors.push(`${p.id}: unknown mastery unit "${id}"`);
  for (const id of p.draws.learnTopicIds ?? []) if (!topicIds.has(id)) errors.push(`${p.id}: unknown learn topic "${id}"`);
  for (const a of p.draws.learnAreas ?? []) if (!areas.has(a)) errors.push(`${p.id}: learn area "${a}" has no topics yet`);
  for (const id of p.draws.projectIds ?? []) if (!PROJECT_BY_ID.has(id)) errors.push(`${p.id}: unknown project "${id}"`);

  for (const r of p.unlocks) {
    if (r.compLpa[0] > r.compLpa[1]) errors.push(`${p.id}: comp band inverted for "${r.band}"`);
    if (r.loop.length < 2) errors.push(`${p.id}: "${r.band}" loop needs the real rounds, not a summary`);
  }
}

// Every mastery track must belong to some phase, or the plan silently orphans it.
const drawnTracks = new Set(CURRICULUM_PHASES.flatMap((p) => p.draws.masteryTrackIds ?? []));
const orphanTracks = [...trackIds].filter((t) => !drawnTracks.has(t));

console.log(`phases: ${CURRICULUM_PHASES.length}`);
console.log(`total planned hours: ${CURRICULUM_PHASES.reduce((n, p) => n + p.estimatedHours, 0)}`);
console.log(`mastery tracks drawn: ${drawnTracks.size}/${trackIds.size}`);
if (orphanTracks.length) console.log(`  ! not in any phase: ${orphanTracks.join(', ')}`);
if (errors.length) {
  console.error('\nERRORS:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('\nall phase references resolve.');
