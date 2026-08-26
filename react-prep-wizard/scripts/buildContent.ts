/**
 * Generates `content.json` — the portable knowledge index for this repository.
 *
 * It *reads* the live data modules rather than restating them, so the export can
 * never drift from the app. Re-run it after changing any curriculum data:
 *
 *   npx esbuild scripts/buildContent.ts --bundle --platform=node --format=cjs \
 *     --outfile=.tmp/build-content.cjs && node .tmp/build-content.cjs
 *
 * Article I note: the emitted JSON is generated data, not source, so it is
 * exempt from the 200-line rule for the same reason `css100.ts` is.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { LEARN_TOPICS, AREA_ORDER } from '../src/data/learn';
import { MASTERY_UNITS, MASTERY_TRACKS } from '../src/data/masteryStream';
import { RAPID_FIRE_DB } from '../src/data/rapidFireDb';
import { METTL_BLUEPRINTS } from '../src/data/exam/mettlBlueprints';
import { INFERRED_WEIGHTING, ACCENTURE_PROCESS } from '../src/data/exam/examWeighting';
import { TIER_META, coveredConceptIds } from '../src/data/projects';
import { buildProjects, indexProjectsByConcept } from './exportProjects';

const OUT = resolve(__dirname, '../../content.json');

/** Stable slug so a resource is one entity even when cited by many concepts. */
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Short, stable hash of the full URL.
 *
 * Truncating a slug to a fixed length collided badly: every MDN JavaScript
 * Reference URL shares its first 60 characters, so nine distinct pages merged
 * into one entry. The id stays readable, but uniqueness comes from the hash of
 * the whole URL rather than from a prefix.
 */
function hash6(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36).padStart(6, '0').slice(-6);
}

/** Tags are the semantic glue: they let a reader or a model pivot across areas. */
function tagsFor(text: string): string[] {
  const vocab: Record<string, RegExp> = {
    reference_identity: /reference|Object\.is|shallow|mutat|immutab/i,
    rendering: /render|reconcil|virtual dom|commit|paint/i,
    async: /promise|async|await|event loop|microtask|abort/i,
    layout: /flex|grid|box model|position|layout|align|justify/i,
    accessibility: /aria|screen reader|keyboard|focus|semantic/i,
    performance: /performance|memo|bundle|lazy|virtualis|virtualiz|cache/i,
    security: /xss|csrf|csp|same-origin|cors|sanitis/i,
    state: /state|store|redux|context|reducer|selector/i,
    types: /typescript|type |narrow|generic|union/i,
    forms: /form|input|validation|controlled|uncontrolled/i,
    hooks: /hook|useEffect|useState|useMemo|useCallback|useRef/i,
    react19: /react 19|server component|useActionState|useOptimistic|hydrateRoot|use\(\)/i,
    tooling: /webpack|vite|babel|bundl|tree shak|loader|plugin/i,
    testing: /test|jest|vitest|testing library|msw/i,
  };
  return Object.entries(vocab).filter(([, re]) => re.test(text)).map(([k]) => k);
}

const resourceIndex = new Map<string, { id: string; label: string; url: string; kind: string; note?: string; citedBy: string[] }>();

function registerResource(r: { label: string; url: string; kind: string; note?: string }, conceptId: string) {
  const path = r.url.replace(/^https?:\/\//, '').replace(/[#?].*$/, '');
  const id = `${slug(path).slice(-42)}-${hash6(r.url)}`;
  const existing = resourceIndex.get(id);
  if (existing) { existing.citedBy.push(conceptId); return id; }
  resourceIndex.set(id, { id, label: r.label, url: r.url, kind: r.kind, note: r.note, citedBy: [conceptId] });
  return id;
}

/** A Learn topic becomes a full concept: explanation, invariants, traps, sources. */
const concepts = LEARN_TOPICS.map((t) => {
  const corpus = [t.title, t.summary, ...t.body, ...t.keyPoints, t.interview].join(' ');
  return {
    id: t.id,
    kind: 'concept',
    area: t.area,
    group: t.group,
    title: t.title,
    essence: t.summary,
    explanation: t.body,
    invariants: t.keyPoints,
    pitfalls: t.pitfalls ?? [],
    interviewAngle: t.interview,
    code: t.code ?? null,
    readingMinutes: t.minutes,
    drillCoverage: t.status,
    tags: tagsFor(corpus),
    resourceIds: t.resources.map((r) => registerResource(r, t.id)),
    prerequisites: t.prerequisites ?? [],
    unlocks: t.unlocks ?? [],
  };
});

/** A Mastery unit becomes a practice item, cross-referenced to the concept space. */
const drills = MASTERY_UNITS.map((u) => ({
  id: u.id,
  kind: 'drill',
  track: u.trackId,
  trackName: u.trackName,
  category: u.category,
  title: u.title,
  level: u.level,
  practiceType: u.practice.type,
  xp: u.xp,
  hook: u.theory.hook,
  deepDive: u.theory.deepDive,
  spokenDefence: u.theory.interviewPitch,
  acceptanceCriteria: u.practice.specs,
  hints: u.hints ?? [],
  why: u.why ?? null,
  takeaway: u.takeaway ?? null,
  tags: [...new Set([...(u.tags ?? []), ...tagsFor(`${u.title} ${u.theory.hook} ${u.practice.specs.join(' ')}`)])],
  hasVerifiableSolution: u.practice.solutionCode !== u.practice.starterCode,
  mcq: u.theory.mcq ?? null,
}));

const mcqs = RAPID_FIRE_DB.map((q, i) => ({
  id: q.id ?? `rapid-${i}`,
  kind: 'mcq',
  competency: q.category,
  skill: (q as { skill?: string }).skill ?? null,
  difficulty: (q as { difficulty?: string }).difficulty ?? null,
  question: q.question,
  code: q.codeSnippet ?? null,
  options: q.options,
  correctIndex: q.correct,
  explanation: q.explanation,
  tags: tagsFor(`${q.question} ${q.explanation}`),
}));

const projects = buildProjects(tagsFor);
const projectsByConcept = indexProjectsByConcept(projects);

const byArea = (xs: { area?: string }[]) =>
  xs.reduce<Record<string, number>>((a, x) => (x.area ? { ...a, [x.area]: (a[x.area] ?? 0) + 1 } : a), {});

const content = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  meta: {
    name: 'content.json',
    title: 'Front-end interview knowledge index',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'scripts/buildContent.ts',
    provenance: {
      concepts: 'src/data/learn/** — authored reading curriculum',
      drills: 'src/data/masteryStream.ts — the practice stream',
      projects: 'src/data/projects/** — the build track, coverage-checked by scripts/checkProjectCoverage.ts',
    mcqs: 'src/data/rapidFireDb.ts + rapidFireBank.ts — Mettl-shaped question bank',
      examBlueprints: 'src/data/exam/mettlBlueprints.ts — transcribed verbatim from vendor product pages',
      inferredWeighting: 'src/data/exam/examWeighting.ts — reasoned, not published; kept in a separate file so the distinction is visible',
    },
    howToUse: [
      'concepts[] is the knowledge: each carries an essence, a full explanation, invariants worth memorising, known traps, and how the topic is actually asked.',
      'drills[] and mcqs[] are practice, cross-referenced to concepts by shared tags and area names.',
      'resources[] is deduplicated: each source appears once with citedBy listing every concept that cites it.',
      'examBlueprints[] states what the assessment vendor publishes; inferredWeighting is explicitly an inference.',
      'projects[] is the build track in three tiers: basic (0-3 YOE), intermediate, advanced. Each conceptIds entry is verified to exist, and every concept is claimed by at least one project.',
      'buildsConcept on a concept lists the projects that construct it — the inverse of projects[].conceptIds.',
      'drillCoverage on a concept says whether the practice material actually covers it — covered | partial | missing.',
    ],
    vocabulary: {
      essence: 'One paragraph: what this is and why it exists.',
      invariants: 'Statements that remain true and are worth memorising verbatim.',
      interviewAngle: 'The form the question actually takes in an interview or OA.',
      drillCoverage: 'How well this repository PRACTISES the concept, not how important it is.',
      hasVerifiableSolution: 'False means the drill teaches by editing in place and cannot be auto-graded.',
      stages: 'A project built twice or more: the naive version, its named failure mode, then the version that holds.',
      teaches: 'A checkable coverage claim — conceptIds must resolve to a real concept or the build fails.',
      tier: 'basic = 0-3 YOE entry point; intermediate = working engineer; advanced = the dare.',
    },
  },
  counts: {
    concepts: concepts.length,
    drills: drills.length,
    mcqs: mcqs.length,
    resources: resourceIndex.size,
    areas: new Set(concepts.map((c) => c.area)).size,
    readingMinutes: concepts.reduce((n, c) => n + c.readingMinutes, 0),
    conceptsByArea: byArea(concepts),
    conceptsByCoverage: concepts.reduce<Record<string, number>>(
      (a, c) => ({ ...a, [c.drillCoverage]: (a[c.drillCoverage] ?? 0) + 1 }), {}),
    drillsWithVerifiableSolution: drills.filter((d) => d.hasVerifiableSolution).length,
    projects: projects.length,
    projectsByTier: projects.reduce<Record<string, number>>(
      (a, p) => ({ ...a, [p.tier]: (a[p.tier] ?? 0) + 1 }), {}),
    conceptsWithAProject: concepts.filter((c) => coveredConceptIds().has(c.id)).length,
  },
  taxonomy: {
    areaOrder: AREA_ORDER,
    tracks: MASTERY_TRACKS,
    tags: [...new Set(concepts.flatMap((c) => c.tags))].sort(),
  },
  examBlueprints: METTL_BLUEPRINTS,
  inferredWeighting: INFERRED_WEIGHTING,
  hiringProcess: { accenture: ACCENTURE_PROCESS },
  concepts: concepts.map((c) => ({ ...c, buildsConcept: projectsByConcept[c.id] ?? [] })),
  practice: { drills, mcqs },
  projects,
  projectTiers: TIER_META,
  resources: [...resourceIndex.values()].sort((a, b) => b.citedBy.length - a.citedBy.length),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(content, null, 2) + '\n', 'utf8');
console.log(
  `content.json → ${OUT}\n` +
  `  ${content.counts.concepts} concepts · ${content.counts.drills} drills · ` +
  `${content.counts.mcqs} MCQs · ${content.counts.projects} projects · ` +
  `${content.counts.resources} resources · ` +
  `${content.examBlueprints.length} exam blueprints`,
);
