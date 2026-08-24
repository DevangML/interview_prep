/**
 * Spaced repetition for the drill set.
 *
 * `ADAPTIVE_LEARNING_SYSTEM.md` has specified +1/+3/+7/+16/+35-day intervals,
 * a leech rule and 70% retrieval since day one; the workbench stored a
 * permanent boolean instead. Knowledge is not permanent, so neither is a pass.
 * A drill leaves the queue for a while and then comes back, cold.
 */

const DAY = 86_400_000;
/** The ladder from the learning spec, not a rediscovered one. */
export const INTERVALS = [1, 3, 7, 16, 35];
const LEECH_AT = 3;
const KEY = 'css100:sched';
const LEGACY_KEY = 'css100:done';

export interface Review {
  /** Consecutive passes. Resets to 0 on a fail. */
  reps: number;
  intervalDays: number;
  dueAt: number;
  lapses: number;
  lastAt: number;
  lastPass: boolean;
  /** Recorded by hand rather than earned by the grader. */
  overridden?: boolean;
}

export type Schedule = Record<string, Review>;

export type Status = 'untouched' | 'due' | 'held' | 'leech';

export function loadSchedule(): Schedule {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Schedule;
  } catch { /* corrupt */ }

  // Migrate the old boolean map. Those passes were issued by a regex that has
  // since been shown to be wrong, so every one of them comes back due now.
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '{}') as Record<string, boolean>;
    const migrated: Schedule = {};
    for (const [id, done] of Object.entries(legacy)) {
      if (!done) continue;
      migrated[id] = {
        reps: 0, intervalDays: 0, dueAt: Date.now(),
        lapses: 0, lastAt: Date.now(), lastPass: false, overridden: true,
      };
    }
    return migrated;
  } catch { return {}; }
}

export function saveSchedule(s: Schedule) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* full */ }
}

/** SM2, trimmed to what a 30-day run actually needs. */
export function review(prev: Review | undefined, pass: boolean, overridden = false): Review {
  const now = Date.now();
  if (!pass) {
    const lapses = (prev?.lapses ?? 0) + 1;
    return { reps: 0, intervalDays: 0, dueAt: now, lapses, lastAt: now, lastPass: false, overridden };
  }
  const reps = (prev?.reps ?? 0) + 1;
  const intervalDays = INTERVALS[Math.min(reps - 1, INTERVALS.length - 1)];
  return {
    reps,
    intervalDays,
    dueAt: now + intervalDays * DAY,
    lapses: prev?.lapses ?? 0,
    lastAt: now,
    lastPass: true,
    overridden,
  };
}

export function statusOf(r: Review | undefined, now = Date.now()): Status {
  if (!r) return 'untouched';
  if (r.lapses >= LEECH_AT && !r.lastPass) return 'leech';
  return r.dueAt <= now ? 'due' : 'held';
}

export function counts(ids: string[], s: Schedule, now = Date.now()) {
  const out = { untouched: 0, due: 0, held: 0, leech: 0 };
  for (const id of ids) out[statusOf(s[id], now)]++;
  return out;
}

/**
 * What to do next, in one answer: leeches first (they are the gap that keeps
 * reopening), then whatever has been due longest, then new material in order.
 */
export function pickNext(ids: string[], s: Schedule, now = Date.now()): string | null {
  const ranked = ids
    .map((id) => ({ id, r: s[id], st: statusOf(s[id], now) }))
    .filter((x) => x.st !== 'held');
  if (ranked.length === 0) return null;
  const weight = { leech: 0, due: 1, untouched: 2, held: 3 } as const;
  ranked.sort((a, b) =>
    weight[a.st] - weight[b.st] || (a.r?.dueAt ?? 0) - (b.r?.dueAt ?? 0));
  return ranked[0].id;
}

export function dueLabel(r: Review | undefined, now = Date.now()): string {
  if (!r) return 'never attempted';
  if (r.dueAt <= now) return 'due now';
  const days = Math.round((r.dueAt - now) / DAY);
  return days <= 1 ? 'due tomorrow' : `due in ${days} days`;
}
