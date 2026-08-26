/**
 * Fails when the project library's coverage claims stop being true.
 *
 * The rule this enforces: every (project, concept) pair must be classified,
 * either as an edge (used, with a reason) or as an exemption (deliberately not
 * used, with a reason). Silence is a failure.
 *
 * Exemptions are legal at every tier, and implicit edges are capped at the
 * number of explicit ones. The old rule ("advanced projects must span the whole
 * space") left a project one legal shape — 56 edges — and eleven manifests duly
 * hit 56/56 with 64% of edges implicit. A quota is not evidence.
 *
 * Run: npm run check:projects
 */
import { ROADMAP_TRACKS } from '../src/data/learn/extended/trackRegistry';
import { PROJECT_BLUEPRINTS, PROJECT_BY_ID } from '../src/data/projects';
import { COVERAGE_BY_PROJECT } from '../src/data/projects/coverage';

/**
 * Committed high-water mark for the integrity signals below. Lower it whenever
 * the real number drops; never raise it.
 *
 * Two are now zero and stay that way: every project classifies all 71 topics,
 * and no edge claims a concept off a bare stage label without the blueprint
 * declaring it. The third — implicit outrunning explicit — is the remaining
 * debt, and it is only payable by giving those projects more stages and
 * deliverables, not by relabelling the edges.
 */
const BASELINE = { inflated: 352, untraced: 0, unclassified: 0 };

/**
 * The universe is the whole Learn tab — the 56-topic core crucible plus every
 * extended roadmap track — not just the canonical export. A project measured
 * against a subset of the curriculum reports a coverage number that flatters it.
 */
const topics = [...new Set(ROADMAP_TRACKS.flatMap((t) => t.topics.map((x) => x.id)))];
const known = new Set(topics);
const errors: string[] = [];
const warn: string[] = [];
/** Per-project counts for the two ratcheted integrity signals. */
const inflated = new Map<string, number>();
const untraced = new Map<string, number>();
const unclassifiedBy = new Map<string, number>();

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
    if (ex.reason.trim().length < 25) errors.push(`${p.id}: exemption reason too thin`);
    for (const id of ex.conceptIds) claim(id, 'exemption');
  }

  for (const id of deliverableIds) {
    if (!anchored.has(id)) warn.push(`${p.id}: deliverable "${id}" is referenced by no coverage edge`);
  }

  // Two integrity signals, both ratcheted rather than hard-failed (see DEBT).
  //  1. implicit inflation — a claim the stage list does not carry.
  //  2. untraceable edges — a concept the blueprint itself never declares.
  const nExplicit = cov.edges.filter((x) => x.kind === 'explicit').length;
  const nImplicit = cov.edges.filter((x) => x.kind === 'implicit').length;
  if (nImplicit > nExplicit) inflated.set(p.id, nImplicit - nExplicit);

  // A deliverable anchor is self-evidencing: the deliverable carries a spec that
  // says what must exist. A *stage* anchor is not — "Stage 2" is just a label, so
  // an edge can point at it and claim anything. That is how the profile card came
  // to claim an absolutely-positioned badge that appears nowhere in its spec.
  //
  // So: a stage-anchored edge must also be declared in the blueprint's own
  // pedagogy. A deliverable-anchored edge is already evidenced and is not counted.
  const declared = new Set<string>([
    ...p.explicitTopics.flatMap((t) => t.conceptIds ?? []),
    ...p.implicitFoundations.flatMap((f) => f.conceptIds ?? []),
  ]);
  const untraceable = cov.edges.filter(
    (x) => !deliverableIds.has(x.where.split(' \u2014 ')[0].trim()) && !declared.has(x.conceptId),
  ).length;
  if (untraceable) untraced.set(p.id, untraceable);

  // Silence used to be a hard failure. It still is not allowed, but it is now
  // ratcheted rather than fatal: widening the universe to the roadmap tracks
  // must not force twenty-one manifests to invent blanket exemptions overnight.
  const unclassified = topics.filter((t) => !seen.has(t));
  if (unclassified.length) unclassifiedBy.set(p.id, unclassified.length);

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

// ── Integrity ratchet ───────────────────────────────────────────────────────
// These two numbers describe how much of the graph is decoration. They are not
// hard-failed, because fixing them means rewriting the project specs, not the
// manifests. They may only ever go DOWN: the baseline is committed, and the
// build fails if a change makes either worse. Delete the baseline when it is 0.
const sum = (m: Map<string, number>) => [...m.values()].reduce((a, b) => a + b, 0);
const actual = { inflated: sum(inflated), untraced: sum(untraced), unclassified: sum(unclassifiedBy) };
console.log(
  `\nintegrity ratchet\n` +
  `  implicit over explicit  ${actual.inflated}  (in ${inflated.size} projects)\n` +
  `  stage-anchored but undeclared  ${actual.untraced}  (in ${untraced.size} projects)\n` +
  `  neither used nor exempted  ${actual.unclassified}  (in ${unclassifiedBy.size} projects)`,
);
for (const [id, n] of [...untraced.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)) {
  console.log(`    ${id}: ${n} untraceable`);
}
if (
  actual.inflated > BASELINE.inflated ||
  actual.untraced > BASELINE.untraced ||
  actual.unclassified > BASELINE.unclassified
) {
  console.error(
    `\n\u2717 coverage integrity regressed\n` +
    `    implicit-over-explicit ${actual.inflated} (baseline ${BASELINE.inflated})\n` +
    `    untraceable            ${actual.untraced} (baseline ${BASELINE.untraced})\n` +
    `    unclassified           ${actual.unclassified} (baseline ${BASELINE.unclassified})`,
  );
  process.exit(1);
}
if (
  actual.inflated < BASELINE.inflated ||
  actual.untraced < BASELINE.untraced ||
  actual.unclassified < BASELINE.unclassified
) {
  console.log(`  \u2713 improved on baseline — lower BASELINE in this file to lock it in`);
}

if (errors.length) {
  const shown = errors.slice(0, 25);
  console.error(`\n${errors.length} coverage error(s):`);
  for (const e of shown) console.error(`  ✗ ${e}`);
  if (errors.length > shown.length) console.error(`  … and ${errors.length - shown.length} more`);
  process.exit(1);
}
console.log(`coverage: ${PROJECT_BLUEPRINTS.length} projects \u00d7 ${topics.length} topics checked.`);
