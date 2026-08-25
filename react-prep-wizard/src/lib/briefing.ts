import type { MasteryUnit } from '../data/masteryStream';

/**
 * Turns a unit's data into a human briefing.
 *
 * The units read like they were written by a machine explaining itself: the
 * task field diagnosed the bug ("`.card` is content-box, so it renders at
 * 236px"), named the fix ("change the one value that…"), the spec checklist
 * printed the answer property, and the hints were shown as prose before the
 * learner had attempted anything.
 *
 * An exam question does not do that. It states **what you are given** and
 * **what is expected**, and says nothing about method. Everything else is
 * guidance, and guidance belongs behind a hint you choose to spend.
 *
 * So this splits every unit three ways:
 *   GIVEN     — objective facts about the material in front of you
 *   EXPECTED  — the outcome, as prose, with the load-bearing words marked
 *   GUIDANCE  — diagnosis, method, property names: stripped out, sent to hints
 */

export interface Briefing {
  given: string[];
  expected: string;
  /** Acceptance criteria phrased as observable outcomes, never as methods. */
  criteria: string[];
  /** Everything removed from view, appended to the progressive hints. */
  guidance: string[];
}

/** Property names, values and imperative verbs give the method away. */
const METHOD_HINTS =
  /\b(use|add|set|change|apply|replace|switch|write|declare|reach for|remove)\b/i;

/** A sentence that diagnoses ("…so it renders at 236px") teaches nothing to find. */
const DIAGNOSIS = /\b(because|so it|so its|which is why|the reason|that is why)\b/i;

function sentences(text: string): string[] {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** What the stylesheet already declares, stated as inventory rather than diagnosis. */
function givenFromCss(css: string): string[] {
  const out: string[] = [];
  const rules = css.matchAll(/([^{}]+)\{([^}]*)\}/g);
  for (const [, selectorRaw, body] of rules) {
    const selector = selectorRaw.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (!selector || selector.startsWith('@')) continue;
    const props = [...body.matchAll(/(^|;)\s*([a-zA-Z-]+)\s*:/g)].map((m) => m[2]);
    if (props.length === 0) continue;
    out.push(`\`${selector}\` is already styled — ${props.length} ${props.length === 1 ? 'declaration' : 'declarations'} are in the file.`);
  }
  return out.slice(0, 4);
}

/** What is on the page, counted rather than described. */
function givenFromHtml(html: string): string[] {
  if (!html.trim()) return [];
  const tags = [...html.matchAll(/<([a-zA-Z][\w-]*)([^>]*)>/g)];
  const counts = new Map<string, number>();
  for (const [, tag, attrs] of tags) {
    const cls = /class="([^"]*)"/.exec(attrs)?.[1]?.trim().split(/\s+/)[0];
    const key = cls ? `${tag}.${cls}` : tag;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const parts = [...counts.entries()]
    .slice(0, 5)
    .map(([k, n]) => `${n} × \`${k}\``);
  return parts.length ? [`The markup is fixed and you do not edit it: ${parts.join(', ')}.`] : [];
}

export function briefingFor(unit: MasteryUnit): Briefing {
  const { practice } = unit;
  const guidance: string[] = [];

  // EXPECTED — the hook is the outcome statement. Any sentence in the task that
  // diagnoses or prescribes is guidance, not question; it is moved out.
  const hookSentences = sentences(unit.theory.hook);
  // Several unit types set hook and task from the same source string; saying the
  // same thing twice reads as a machine, not a person.
  const seen = new Set(hookSentences.map((x) => x.toLowerCase()));
  const kept: string[] = [];
  for (const s of sentences(practice.task)) {
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (DIAGNOSIS.test(s) || METHOD_HINTS.test(s)) guidance.push(s);
    else kept.push(s);
  }

  const expected = [...hookSentences, ...kept]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  // GIVEN — inventory, not analysis.
  const given: string[] = [
    ...givenFromHtml(practice.baseHtml || ''),
    ...(practice.type === 'css' ? givenFromCss(practice.starterCode) : []),
  ];
  if (practice.type !== 'css' && practice.starterCode.trim()) {
    const lines = practice.starterCode.trim().split('\n').length;
    given.push(`A starter file of ${lines} lines, open in the editor. The parts left to you are marked \`TODO\`.`);
  }
  if (unit.verify) given.push(unit.verify);

  // CRITERIA — a criterion that names the property is an answer key. Those go
  // to guidance; what remains is what a marker could observe.
  const criteria: string[] = [];
  for (const spec of practice.specs) {
    const namesProperty = /^[a-z-]+\s+—/.test(spec) || /^Must use /i.test(spec);
    if (namesProperty) guidance.push(`The property under test is ${spec.split('—')[0].replace(/^Must use /i, '').trim()}.`);
    else criteria.push(spec);
  }
  if (criteria.length === 0) criteria.push(unit.theory.hook);

  return { given, expected, criteria, guidance };
}

/**
 * The words a reader must not skim: measurements, selectors, code, and the
 * absolutes that decide whether an answer is right ("exactly", "never").
 * Highlighting is the whole reason the expected outcome can be a paragraph
 * instead of a bullet list — the eye still finds the constraint.
 */
const KEYWORD_PATTERNS = [
  /`[^`]+`/g,                                                   // code spans
  /\b\d+(?:\.\d+)?(?:px|rem|em|%|fr|vh|vw|ch|s|ms|deg|x)\b/gi,  // measurements
  /(?<![\w`.])\.[a-zA-Z][\w-]*/g,                               // .selectors
  /\b(exactly|never|always|must|only|identical|unchanged|without|at least|at most|no more than|neither|both|all three)\b/gi,
];

export interface Segment { text: string; mark: boolean }

/** Splits prose into plain and highlighted segments for rendering. */
export function highlight(text: string): Segment[] {
  const hits: { start: number; end: number }[] = [];
  for (const re of KEYWORD_PATTERNS) {
    for (const m of text.matchAll(re)) {
      if (m.index === undefined) continue;
      hits.push({ start: m.index, end: m.index + m[0].length });
    }
  }
  hits.sort((a, b) => a.start - b.start);

  const merged: typeof hits = [];
  for (const h of hits) {
    const last = merged[merged.length - 1];
    if (last && h.start <= last.end) last.end = Math.max(last.end, h.end);
    else merged.push({ ...h });
  }

  const out: Segment[] = [];
  let cursor = 0;
  for (const h of merged) {
    if (h.start > cursor) out.push({ text: text.slice(cursor, h.start), mark: false });
    out.push({ text: text.slice(h.start, h.end).replace(/`/g, ''), mark: true });
    cursor = h.end;
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor), mark: false });
  return out;
}
