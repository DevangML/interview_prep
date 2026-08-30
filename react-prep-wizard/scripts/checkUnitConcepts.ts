/**
 * Ratchets the drill -> concept join.
 *
 * Same principle as the project coverage gate: a claim that cannot fail is not
 * a claim. If a unit carries no concept, the grader can prove your code wrong
 * without the app being able to say what you do not know — which is the entire
 * point of the join.
 *
 * Run: npm run check:units
 */
import { CONCEPTS_BY_UNIT, UNITS_BY_CONCEPT } from '../src/data/conceptTags';
import { MASTERY_UNITS } from '../src/data/masteryStream';
import { ROADMAP_TRACKS } from '../src/data/learn/extended/trackRegistry';

const BASELINE = { untagged: 0, unknownConcept: 0 };

const known = new Set(ROADMAP_TRACKS.flatMap((t) => t.topics.map((x: any) => x.id)));
const errors: string[] = [];

const untagged = MASTERY_UNITS.filter((u) => (CONCEPTS_BY_UNIT.get(u.id) ?? []).length === 0);
let unknownConcept = 0;
for (const [unitId, concepts] of CONCEPTS_BY_UNIT)
  for (const c of concepts)
    if (!known.has(c)) { unknownConcept++; errors.push(`${unitId}: unknown concept "${c}"`); }

const conceptsWithEvidence = [...UNITS_BY_CONCEPT.keys()].filter((c) => known.has(c));

console.log(`units: ${MASTERY_UNITS.length}`);
console.log(`  tagged .................. ${MASTERY_UNITS.length - untagged.length}`);
console.log(`  untagged ................ ${untagged.length}`);
console.log(`concepts: ${known.size}`);
console.log(`  with drill evidence ..... ${conceptsWithEvidence.length}`);
console.log(`  theory only ............. ${known.size - conceptsWithEvidence.length}`);

if (untagged.length) {
  console.log('\nuntagged units:');
  untagged.slice(0, 15).forEach((u) => console.log(`  ${u.id} (${u.trackId})`));
  if (untagged.length > 15) console.log(`  … and ${untagged.length - 15} more`);
}
if (errors.length) console.error('\n' + errors.slice(0, 10).join('\n'));

const regressed =
  untagged.length > BASELINE.untagged || unknownConcept > BASELINE.unknownConcept;
if (regressed) {
  console.error(`\n✗ concept join regressed\n    untagged ${untagged.length} (baseline ${BASELINE.untagged})` +
    `\n    unknown  ${unknownConcept} (baseline ${BASELINE.unknownConcept})`);
  process.exit(1);
}
console.log('\nevery unit resolves to at least one real concept.');
