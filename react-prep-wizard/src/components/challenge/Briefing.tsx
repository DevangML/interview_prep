import React from 'react';
import { FileInput, Target, CheckCircle2 } from 'lucide-react';
import { highlight } from '../../lib/briefing';
import type { Briefing as BriefingData } from '../../lib/briefing';

interface Props {
  briefing: BriefingData;
}

function Marked({ text }: { text: string }) {
  return (
    <>
      {highlight(text).map((seg, i) =>
        seg.mark ? (
          <strong
            key={i}
            className="font-semibold text-amber-300 bg-amber-950/80 border border-amber-800/60 rounded px-1 box-decoration-clone"
          >
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

export default function Briefing({ briefing }: Props) {
  return (
    <div className="space-y-4 text-slate-300">
      {briefing.given.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
            <FileInput size={13} className="text-slate-400" /> What you are given
          </h3>
          <ul className="space-y-1">
            {briefing.given.map((g, i) => (
              <li key={i} className="text-xs text-slate-300 leading-relaxed flex gap-2">
                <span className="text-slate-600 select-none">—</span>
                <span><Marked text={g} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-1.5 font-mono">
          <Target size={13} /> What is expected
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 border border-slate-800 rounded-xl p-3.5 shadow-xs">
          <Marked text={briefing.expected} />
        </p>
      </section>

      {briefing.criteria.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 font-mono">
            <CheckCircle2 size={13} /> Done when
          </h3>
          <ul className="space-y-1">
            {briefing.criteria.map((c, i) => (
              <li key={i} className="text-xs text-slate-300 leading-relaxed flex gap-2">
                <span className="text-emerald-400 select-none font-bold">✓</span>
                <span><Marked text={c} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
