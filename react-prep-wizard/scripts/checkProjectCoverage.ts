/**
 * Fails when the project library's coverage claims stop being true.
 *
 * The rule this enforces: every (project, concept) pair must be classified,
 * either as an edge (used, with a reason) or as an exemption (deliberately not
 * used, with a reason). Silence is a failure. Exemptions are legal only in the
 * basic tier — an intermediate or advanced project must span the whole space.
 *
 * Run: npm run check:projects
 */
import { LEARN_TOPICS } from '../src/data/learn';
import { PROJECT_BLUEPRINTS, PROJECT_BY_ID } from '../src/data/projects';
import { COVERAGE_BY_PROJECT } from '../src/data/projects/coverage';

const topics = LEARN_TOPICS.map((t) => t.id);
const known = new Set(topics);
const errors: string[] = [];
const warn: string[] = [];

for (const p of PROJECT_BLUEPRINTS) {
  // Structural claims on the blueprint itself.
  for (const t of p.explicitTopics) {
    for (const id of t.conceptIds) if (!known.has(id)) errors.push(`${p.id}: unknown concept id "${id}"`);
    if (t.conceptIds.length === 0) errors.push(`${p.id}: explicitTopics entry with no conceptIds`);
  }
  for (const f of p.implicitFoundations) {
    for (const id of f.conceptIds ?? []) if (!known.has(id)) errors.push(`${p.id}: unknown concept id "${id}"`);
  }
  if (p.stages.length < 2) errors.push(`${p.id}: needs at least two stages to show an evolution`);
  for (const pre of p.prerequisites ?? []) {
    if (!PROJECT_BY_ID.has(pre)) errors.push(`${p.id}: prerequisite "${pre}" is not a project`);
  }

  // The coverage manifest must classify every concept, exactly once.
  const cov = COVERAGE_BY_PROJECT.get(p.id);
  if (!cov) { errors.push(`${p.id}: no coverage manifest`); continue; }

  // An anchor must resolve to something the blueprint actually specifies.
  // This is what turns the graph from a description into a promise: a builder
  // who completes the stages and deliverables has demonstrably touched every
  // concept the graph shows, because an unresolvable anchor fails the build.
  const stageRefs = new Set<string>();
  p.stages.forEach((st) => {
    stageRefs.add(`Stage ${st.stageNumber}`);
    p.stages.forEach((other) => {
      stageRefs.add(`Stages ${st.stageNumber}-${other.stageNumber}`);
      stageRefs.add(`Stage ${st.stageNumber} \u2192 ${other.stageNumber}`);
    });
  });
  const deliverableIds = new Set(p.deliverables.map((d) => d.id));
  const anchors = new Set([...stageRefs, ...deliverableIds]);

  for (const d of p.deliverables) {
    if (d.spec.trim().split(/\s+/).length < 8) {
      errors.push(`${p.id}/${d.id}: deliverable spec is too thin to build against`);
    }
  }

  const seen = new Map<string, string>();
  const claim = (id: string, as: string) => {
    if (!known.has(id)) { errors.push(`${p.id}: unknown concept id "${id}" in ${as}`); return; }
    const prior = seen.get(id);
    if (prior) errors.push(`${p.id}: "${id}" classified twice (${prior} and ${as})`);
    else seen.set(id, as);
  };
  const anchored = new Set<string>();
  for (const edge of cov.edges) {
    claim(edge.conceptId, 'edge');
    const base = edge.where.split(' \u2014 ')[0].trim();
    if (!anchors.has(base)) {
      errors.push(`${p.id}/${edge.conceptId}: anchor "${edge.where}" is not a stage or a deliverable`);
    } else if (deliverableIds.has(base)) {
      anchored.add(base);
    }
    if (edge.why.trim().length < 25) errors.push(`${p.id}/${edge.conceptId}: edge reason too thin to be a reason`);
    if (!edge.where.trim()) errors.push(`${p.id}/${edge.conceptId}: edge has no location`);
  }
  for (const ex of cov.exemptions) {
    if (p.tier !== 'basic') {
      errors.push(`${p.id}: tier "${p.tier}" may not exempt concepts (${ex.conceptIds.length} attempted)`);
    }
    if (ex.reason.trim().length < 25) errors.push(`${p.id}: exemption reason too thin`);
    for (const id of ex.conceptIds) claim(id, 'exemption');
  }

  for (const id of deliverableIds) {
    if (!anchored.has(id)) warn.push(`${p.id}: deliverable "${id}" is referenced by no coverage edge`);
  }

  const unclassified = topics.filter((t) => !seen.has(t));
  for (const id of unclassified) errors.push(`${p.id}: "${id}" is neither used nor exempted`);

  // An explicitTopics claim that the manifest does not corroborate is a drift signal.
  const edgeIds = new Set(cov.edges.map((x) => x.conceptId));
  for (const t of p.explicitTopics) {
    for (const id of t.conceptIds) {
      if (!edgeIds.has(id)) warn.push(`${p.id}: explicitTopics claims "${id}" but the manifest does not`);
    }
  }
}

// Report.
const edges = [...COVERAGE_BY_PROJECT.values()].flatMap((c) => c.edges);
const exempt = [...COVERAGE_BY_PROJECT.values()].flatMap((c) => c.exemptions.flatMap((x) => x.conceptIds));
const pairs = PROJECT_BLUEPRINTS.length * topics.length;
const kind = (k: string) => edges.filter((x) => x.kind === k).length;
console.log(
  `projects ${PROJECT_BLUEPRINTS.length} × concepts ${topics.length} = ${pairs} pairs\n` +
  `  edges       ${edges.length}  (explicit ${kind('explicit')} · implicit ${kind('implicit')} · counterexample ${kind('counterexample')})\n` +
  `  exemptions  ${exempt.length}\n` +
  `  classified  ${edges.length + exempt.length} / ${pairs}`,
);
for (const w of warn) console.warn(`  ! ${w}`);

if (errors.length) {
  const shown = errors.slice(0, 25);
  console.error(`\n${errors.length} coverage error(s):`);
  for (const e of shown) console.error(`  ✗ ${e}`);
  if (errors.length > shown.length) console.error(`  … and ${errors.length - shown.length} more`);
  process.exit(1);
}
console.log('coverage: every pair classified.');
