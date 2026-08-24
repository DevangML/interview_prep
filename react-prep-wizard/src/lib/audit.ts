import { grade } from './grader';
import type { Challenge } from '../types';
import type { CompileResult } from '../types';

export interface AuditRow {
  id: string;
  title: string;
  /** true = the grader sees the difference the drill teaches. */
  discriminates: boolean;
  /** Drills marked `visual: false` are read-and-predict exercises — nothing to type. */
  gradeable: boolean;
  detail: string;
  error?: string;
}

export interface AuditReport {
  total: number;
  /** Drills where the unsolved baseline is distinguishable from the solution. */
  discriminating: number;
  /** Drills that ask for code at all. */
  gradeable: number;
  rows: AuditRow[];
  ranAt: number;
}

/**
 * Calibration run. For every drill, grade the *unsolved baseline* against the
 * reference solution. A correct grader must FAIL every one of them — the drill
 * is, by definition, not yet solved. Any drill that passes at baseline is one
 * whose concept the grader cannot see, and that blind-spot list is the whole
 * point of running this: a sensor you have not calibrated is a rumour.
 */
export async function auditReferenceSolutions(
  items: Challenge[],
  compile: (code: string) => Promise<CompileResult>,
  appCss: string,
  onProgress?: (done: number, total: number) => void,
): Promise<AuditReport> {
  const rows: AuditRow[] = [];

  for (let i = 0; i < items.length; i++) {
    const c = items[i];
    const referenceJsx = c.markup ? c.jsx.replace(/<>[\s\S]*?<\/>/, c.markup.trim()) : c.jsx;
    const compiled = await compile(referenceJsx);
    const solvedCss = (c.css || '').replace(/^.*TODO.*$/m, c.sol || '');
    const baseCSS = c.useApp === false ? '' : appCss;

    if (compiled.error) {
      rows.push({
        id: c.id, title: c.title, discriminates: false, gradeable: c.visual !== false, detail: '',
        error: `reference jsx failed to compile: ${compiled.error}`,
      });
    } else {
      const r = await grade({
        baseCSS,
        referenceCSS: solvedCss,
        referenceJs: compiled.code || '',
        attemptCSS: c.css || '',
        attemptJs: compiled.code || '',
        props: c.use.map(([p]) => p),
      });
      const failures = r.checks.filter((x) => !x.ok);
      rows.push({
        id: c.id,
        title: c.title,
        discriminates: !r.pass && !r.error,
        gradeable: c.visual !== false,
        detail: failures.length
          ? `${failures[0].label}: ${failures[0].actual} vs ${failures[0].expected}`
          : 'baseline is indistinguishable from the solution',
        error: r.error,
      });
    }
    onProgress?.(i + 1, items.length);
  }

  return {
    total: rows.length,
    discriminating: rows.filter((r) => r.discriminates && r.gradeable).length,
    gradeable: rows.filter((r) => r.gradeable).length,
    rows,
    ranAt: Date.now(),
  };
}
