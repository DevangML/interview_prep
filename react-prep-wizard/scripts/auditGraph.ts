/**
 * Uses the graph to test the graph's own claims.
 *
 * A manifest can be complete and still be worthless: 56 edges whose reasons are
 * copies of each other prove nothing. This looks for the tells of a coverage
 * table written to satisfy a checker rather than to describe a build.
 *
 * Run: npm run audit:graph
 */
import { LEARN_TOPICS } from '../src/data/learn';
import { PROJECT_BLUEPRINTS } from '../src/data/projects';
import { buildClusters, buildGraphEdges } from '../src/data/projects/graph';

const { edges, exemptions } = buildGraphEdges();
const clusters = buildClusters();
const topicArea = new Map(LEARN_TOPICS.map((t) => [t.id, t.area]));
const findings: string[] = [];

// 1. Reasons that repeat are the signature of a filled-in table.
const byReason = new Map<string, string[]>();
for (const e of edges) {
  const key = e.why.trim().toLowerCase();
  (byReason.get(key) ?? byReason.set(key, []).get(key)!).push(`${e.projectId}/${e.conceptId}`);
}
for (const [why, where] of byReason) {
  if (where.length > 1) findings.push(`duplicated reason across ${where.length} edges: "${why.slice(0, 60)}…" (${where.slice(0, 3).join(', ')})`);
}

// 2. A reason that never names anything concrete is not a reason.
for (const e of edges) {
  if (!/[a-z]/.test(e.why)) findings.push(`${e.projectId}/${e.conceptId}: reason has no prose`);
  if (e.why.split(/\s+/).length < 8) findings.push(`${e.projectId}/${e.conceptId}: reason is ${e.why.split(/\s+/).length} words`);
}

// 3. The explicit/implicit rule must hold, or the distinction means nothing.
const headline = new Map(PROJECT_BLUEPRINTS.map((p) =>
  [p.id, new Set(p.explicitTopics.flatMap((t) => t.conceptIds))]));
for (const e of edges) {
  if (e.kind === 'counterexample') continue;
  const want = e.where.startsWith('Stage') || headline.get(e.projectId)?.has(e.conceptId) ? 'explicit' : 'implicit';
  if (e.kind !== want) findings.push(`${e.projectId}/${e.conceptId}: kind "${e.kind}" contradicts the rule (expected "${want}" for where="${e.where}")`);
}

// 4. A tier with no implicit edges at all is a filled-in table, not a description.
for (const tier of ['intermediate', 'advanced'] as const) {
  const ids = new Set(PROJECT_BLUEPRINTS.filter((p) => p.tier === tier).map((p) => p.id));
  const mine = edges.filter((e) => ids.has(e.projectId));
  if (mine.length && !mine.some((e) => e.kind === 'implicit')) {
    findings.push(`${tier}: every edge is explicit, which no real project is`);
  }
}

// 5. A non-basic project that leaves a whole cluster untouched has a hole.
for (const p of PROJECT_BLUEPRINTS) {
  const mine = new Set(edges.filter((e) => e.projectId === p.id).map((e) => e.conceptId));
  for (const c of clusters) {
    const hit = c.conceptIds.filter((id) => mine.has(id)).length;
    if (hit === 0 && p.tier !== 'basic') findings.push(`${p.id}: entire "${c.area}" cluster unused in a ${p.tier} project`);
  }
}

// 6. Report the shape, per tier and per cluster.
const tiers = ['basic', 'intermediate', 'advanced'] as const;
console.log('per-tier coverage');
for (const tier of tiers) {
  const ps = PROJECT_BLUEPRINTS.filter((p) => p.tier === tier);
  const used = ps.map((p) => edges.filter((e) => e.projectId === p.id).length);
  const min = Math.min(...used), max = Math.max(...used);
  const avg = (used.reduce((a, b) => a + b, 0) / ps.length).toFixed(1);
  console.log(`  ${tier.padEnd(13)} ${ps.length} projects · concepts used ${min}-${max} (avg ${avg}) of ${LEARN_TOPICS.length}`);
}

console.log('\nper-cluster demand (how many projects touch each area)');
for (const c of clusters) {
  const projects = new Set(edges.filter((e) => c.conceptIds.includes(e.conceptId)).map((e) => e.projectId));
  const ex = exemptions.filter((x) => c.conceptIds.includes(x.conceptId)).length;
  const bar = '█'.repeat(Math.round((projects.size / PROJECT_BLUEPRINTS.length) * 20));
  console.log(`  ${c.area.padEnd(17)} ${String(projects.size).padStart(2)}/21 ${bar.padEnd(20)} ${ex} exempt pairs`);
}

console.log('\nedge kind by tier');
for (const tier of tiers) {
  const ids = new Set(PROJECT_BLUEPRINTS.filter((p) => p.tier === tier).map((p) => p.id));
  const mine = edges.filter((e) => ids.has(e.projectId));
  const k = (n: string) => mine.filter((e) => e.kind === n).length;
  console.log(`  ${tier.padEnd(13)} explicit ${k('explicit')} · implicit ${k('implicit')} · counterexample ${k('counterexample')}`);
}

if (findings.length) {
  console.error(`\n${findings.length} quality finding(s):`);
  for (const f of findings.slice(0, 30)) console.error(`  ✗ ${f}`);
  if (findings.length > 30) console.error(`  … and ${findings.length - 30} more`);
  process.exit(1);
}
console.log('\naudit: no duplicated or empty reasons, no untouched cluster above the basic tier.');
