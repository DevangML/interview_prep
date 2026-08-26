import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import type { GradeResult } from '../../lib/grader';

interface Props {
  verdict: GradeResult | null;
  grading: boolean;
}

export function VerdictReportView({ verdict, grading }: Props) {
  if (grading) {
    return (
      <div className="p-4 text-center text-slate-500 italic text-xs flex items-center justify-center gap-2">
        <Loader2 size={14} className="animate-spin text-sky-500" />
        <span>Executing test suite & rendering attempt...</span>
      </div>
    );
  }

  if (!verdict) {
    return (
      <div className="p-4 text-center text-slate-500 text-xs">
        Click <strong className="text-amber-600">Grade & Verify</strong> to execute tests against your code.
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2.5 overflow-y-auto text-xs">
      <div className={`p-2.5 rounded-lg flex items-center gap-2 font-bold text-xs ${verdict.pass ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'}`}>
        {verdict.pass ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-red-600" />}
        <span>{verdict.pass ? 'TEST PASSED — All assertions matched reference' : 'TEST FAILED — Mismatches detected'}</span>
      </div>

      {verdict.error && (
        <p className="text-[11px] font-mono text-red-800 bg-white p-2.5 rounded-lg border border-red-200 leading-relaxed">
          {verdict.error}
        </p>
      )}

      {verdict.checks.filter((c) => !c.ok).slice(0, 12).map((c, i) => (
        <div key={i} className="bg-white p-2.5 rounded-lg border border-red-200 font-mono text-[11px] leading-relaxed shadow-2xs">
          <span className="text-red-700 font-semibold">{c.label}</span>
          <div className="text-slate-600 mt-1 flex flex-wrap gap-2 text-[10px]">
            <span>got: <strong className="text-red-800">{c.actual || '(empty)'}</strong></span>
            <span>expected: <strong className="text-emerald-800">{c.expected || '(empty)'}</strong></span>
          </div>
        </div>
      ))}
    </div>
  );
}
