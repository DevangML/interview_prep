/**
 * Where you are, and the one thing to do next.
 *
 * `pickNext` has existed in schedule.ts since the spaced-repetition work and was
 * called from nowhere — the app collected a learner model and then asked you to
 * scroll a list anyway. This wires it to the phase ladder so the answer is not
 * merely "a due drill" but "a due drill that moves the phase you are actually in".
 */
import { CURRICULUM_PHASES } from '../data/curriculum/phases';
import type { CurriculumPhase } from '../data/curriculum/types';
import { MASTERY_UNITS } from '../data/masteryStream';
import { UNITS_BY_CONCEPT } from '../data/conceptTags';
import { pickNext, statusOf, type Schedule } from './schedule';
import { conceptTitlesForUnit, type ConceptState } from './conceptModel';

export interface PhaseProgress {
  phase: CurriculumPhase;
  /** Units this phase draws on that the drill set can measure. */
  total: number;
  passed: number;
  due: number;
  leeches: number;
  /** 0–1 over measurable units only. Gates that need a human are not counted. */
  ratio: number;
  /**
   * False when no drill can measure this phase at all. P3 and P4 are cleared by
   * building and writing, not by drilling, and reporting them as 0% would be a
   * lie dressed as a metric.
   */
  measurable: boolean;
  state: 'cleared' | 'current' | 'locked';
}

const CLEARED_AT = 0.85;

/** Units a phase draws on, via its tracks, its explicit units and its concepts. */
export function unitsForPhase(phase: CurriculumPhase): string[] {
  const ids = new Set<string>(phase.draws.masteryUnitIds ?? []);
  const tracks = new Set(phase.draws.masteryTrackIds ?? []);
  for (const u of MASTERY_UNITS) if (tracks.has(u.trackId)) ids.add(u.id);
  for (const c of phase.draws.learnTopicIds ?? [])
    for (const u of UNITS_BY_CONCEPT.get(c) ?? []) ids.add(u);
  return [...ids];
}

export function phaseProgress(schedule: Schedule, now = Date.now()): PhaseProgress[] {
  const rows = CURRICULUM_PHASES.map((phase) => {
    const units = unitsForPhase(phase);
    let passed = 0, due = 0, leeches = 0;
    for (const id of units) {
      const r = schedule[id];
      if (!r) continue;
      const st = statusOf(r, now);
      if (st === 'leech') leeches++;
      else if (st === 'due') due++;
      if (r.lastPass) passed++;
    }
    const ratio = units.length ? passed / units.length : 0;
    return {
      phase, total: units.length, passed, due, leeches, ratio,
      measurable: units.length > 0,
      state: 'locked' as const,
    };
  });

  // The current phase is the first one not yet cleared. An unmeasurable phase is
  // never "cleared" by drilling, so it becomes current once the drillable ones
  // are done — which is the correct signal: stop grinding, go build.
  const currentIdx = rows.findIndex((r) => !r.measurable || r.ratio < CLEARED_AT);
  return rows.map((r, i) => ({
    ...r,
    state: currentIdx === -1
      ? 'cleared'
      : i < currentIdx ? 'cleared' : i === currentIdx ? 'current' : 'locked',
  }));
}

export interface NextMove {
  unitId: string | null;
  title: string;
  /** Why this one, in the learner's terms. */
  reason: string;
  /** Concepts this unit would produce evidence about. */
  proves: string[];
  kind: 'leech' | 'due' | 'new' | 'done';
}

/**
 * One answer, not a list. Scoped to the phase you are in, so finishing CSS
 * drills cannot masquerade as progress toward a phase that never asked for them.
 */
export function nextMove(
  schedule: Schedule,
  progress: PhaseProgress[],
  weakest: ConceptState[],
  now = Date.now(),
): NextMove {
  const current = progress.find((p) => p.state === 'current');
  const pool = current ? unitsForPhase(current.phase) : MASTERY_UNITS.map((u) => u.id);

  // A shaky concept inside this phase outranks anything else: it is the gap
  // that keeps reopening, and it is why the phase has not cleared.
  const shaky = weakest.find((w) => w.level === 'shaky' && w.units.some((u) => pool.includes(u)));
  const target = shaky
    ? pickNext(shaky.units.filter((u) => pool.includes(u)), schedule, now)
    : pickNext(pool, schedule, now);

  if (!target) {
    const projects = current?.phase.draws.projectIds ?? [];
    if (current && !current.measurable) {
      return {
        unitId: null, kind: 'done',
        title: `${current.phase.name} is not drilled — it is built`,
        reason: projects.length
          ? `No drill can measure this phase. Clear it by building: ${projects.slice(0, 2).join(', ')}.`
          : 'No drill can measure this phase; its gates are written and built work.',
        proves: [],
      };
    }
    return {
      unitId: null, kind: 'done', title: 'Nothing is due',
      reason: current
        ? `Everything in ${current.phase.name} is held. Come back when a review falls due, or start the next phase early.`
        : 'Every phase is cleared on the measurable units.',
      proves: [],
    };
  }

  const unit = MASTERY_UNITS.find((u) => u.id === target);
  const st = statusOf(schedule[target], now);
  const kind: NextMove['kind'] = st === 'leech' ? 'leech' : st === 'due' ? 'due' : 'new';
  const reason =
    kind === 'leech'
      ? `You have failed this three times. ${shaky ? `It is why ${shaky.title} is shaky.` : ''}`.trim()
      : kind === 'due'
        ? 'A review fell due — the interval says this is where forgetting starts.'
        : shaky
          ? `New evidence for ${shaky.title}, which is your weakest concept in this phase.`
          : 'Next unattempted unit in the phase you are in.';

  return {
    unitId: target,
    kind,
    title: unit?.title ?? target,
    reason,
    proves: conceptTitlesForUnit(target).slice(0, 3),
  };
}
