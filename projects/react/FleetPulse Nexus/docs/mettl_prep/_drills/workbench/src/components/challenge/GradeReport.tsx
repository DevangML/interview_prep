import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import type { GradeResult } from '../../lib/grader';

interface Props {
  result: GradeResult | null;
  grading: boolean;
  /** When this drill comes back round. A pass is a lease, not a certificate. */
  nextDue?: string;
}

/**
 * A verdict has to say *why*, or it will not be trusted — and an untrusted
 * sensor is worse than none.
 */
export default function GradeReport({ result, grading, nextDue }: Props) {
  if (grading) {
    return (
      <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 text-slate-600 text-xs flex items-center gap-2 shrink-0">
        <Loader2 size={13} className="animate-spin" /> rendering reference and attempt…
      </div>
    );
  }
  if (!result) return null;

  const failures = result.checks.filter((c) => !c.ok);

  return (
    <div
      className={`border-t text-xs shrink-0 max-h-40 overflow-auto ${
        result.pass ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      }`}
    >
      <div
        className={`px-3 py-1.5 font-bold flex items-center gap-1.5 sticky top-0 ${
          result.pass ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {result.pass ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
        {result.pass ? 'PASS — computed layout matches the reference' : `FAIL — ${failures.length} mismatch${failures.length === 1 ? '' : 'es'}`}
        {nextDue && <span className="ml-auto font-normal opacity-80">{nextDue}</span>}
      </div>

      {result.error && (
        <p className="px-3 py-2 font-mono text-red-800">{result.error}</p>
      )}

      {failures.length > 0 && (
        <ul className="px-3 py-1.5 space-y-0.5 font-mono">
          {failures.slice(0, 12).map((c, i) => (
            <li key={i} className="text-red-900">
              <span className="text-red-700">{c.label}</span>
              {' — got '}
              <strong>{c.actual || '(empty)'}</strong>
              {', expected '}
              <strong>{c.expected || '(empty)'}</strong>
            </li>
          ))}
          {failures.length > 12 && (
            <li className="text-red-700 italic">…and {failures.length - 12} more</li>
          )}
        </ul>
      )}
    </div>
  );
}
