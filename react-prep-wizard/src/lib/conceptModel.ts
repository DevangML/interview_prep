/**
 * What you can and cannot do, at concept granularity.
 *
 * The app could already prove a piece of code wrong; it could not say what you
 * did not know, because the grader measured *units* and the curriculum
 * described *concepts*. This joins them, so "100 of 216 done" becomes "four
 * concepts are shaky and here is the evidence".
 *
 * Evidence is weighted honestly: a pass the grader issued counts for more than
 * one you marked by hand, because only one of them was checked.
 */
import { CONCEPTS_BY_UNIT, UNITS_BY_CONCEPT } from '../data/conceptTags';
import { statusOf, type Schedule } from './schedule';
import { ALL_TOPIC_BY_ID } from '../data/learn/extended/trackRegistry';

export type ConceptLevel = 'untouched' | 'shaky' | 'working' | 'solid';

export interface ConceptState {
  conceptId: string;
  title: string;
  area: string;
  level: ConceptLevel;
  /** Units that can produce evidence about this concept. */
  units: string[];
  attempted: number;
  /** Passing, and earned from the grader rather than self-marked. */
  earned: number;
  /** Passing, but marked by hand. Counted at half weight. */
  claimed: number;
  leeches: number;
  due: number;
  /** 0–1. Breadth of passing evidence, discounted for self-marking and lapses. */
  confidence: number;
}

const LEECH_PENALTY = 0.25;

export function conceptStates(schedule: Schedule, now = Date.now()): ConceptState[] {
  const out: ConceptState[] = [];

  for (const [conceptId, units] of UNITS_BY_CONCEPT) {
    const topic = ALL_TOPIC_BY_ID.get(conceptId);
    let attempted = 0, earned = 0, claimed = 0, leeches = 0, due = 0;

    for (const unitId of units) {
      const r = schedule[unitId];
      if (!r) continue;
      attempted++;
      const st = statusOf(r, now);
      if (st === 'leech') leeches++;
      if (st === 'due') due++;
      if (r.lastPass) (r.overridden ? claimed++ : earned++);
    }

    // Self-marked passes are evidence, but weaker evidence.
    const credit = earned + claimed * 0.5;
    const breadth = units.length ? credit / units.length : 0;
    const confidence = Math.max(0, Math.min(1, breadth - leeches * LEECH_PENALTY));

    let level: ConceptLevel;
    if (attempted === 0) level = 'untouched';
    else if (leeches > 0 || confidence < 0.34) level = 'shaky';
    else if (confidence < 0.7) level = 'working';
    else level = 'solid';

    out.push({
      conceptId,
      title: topic?.title ?? conceptId,
      area: topic?.area ?? 'Unmapped',
      level, units, attempted, earned, claimed, leeches, due,
      confidence,
    });
  }

  return out.sort((a, b) => a.confidence - b.confidence || a.title.localeCompare(b.title));
}

export interface ConceptSummary {
  states: ConceptState[];
  byLevel: Record<ConceptLevel, number>;
  /** Concepts the drill set can actually measure. */
  measurable: number;
  /** Concepts that exist only as reading — no drill can prove them. */
  theoryOnly: number;
  /** Weakest concepts that have been touched at all, worst first. */
  weakest: ConceptState[];
}

export function summarise(schedule: Schedule, totalConcepts: number, now = Date.now()): ConceptSummary {
  const states = conceptStates(schedule, now);
  const byLevel: Record<ConceptLevel, number> = { untouched: 0, shaky: 0, working: 0, solid: 0 };
  for (const s of states) byLevel[s.level]++;
  return {
    states,
    byLevel,
    measurable: states.length,
    theoryOnly: Math.max(0, totalConcepts - states.length),
    weakest: states.filter((s) => s.level === 'shaky' || s.level === 'working').slice(0, 6),
  };
}

/** Which concepts a unit would produce evidence about, for "why this next". */
export function conceptTitlesForUnit(unitId: string): string[] {
  return (CONCEPTS_BY_UNIT.get(unitId) ?? []).map((c) => ALL_TOPIC_BY_ID.get(c)?.title ?? c);
}
