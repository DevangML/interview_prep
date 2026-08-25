import { FileInput, Target, CheckCircle2 } from 'lucide-react';
import { highlight } from '../../lib/briefing';
import type { Briefing as BriefingData } from '../../lib/briefing';

interface Props {
  briefing: BriefingData;
}

/** Prose with the load-bearing words marked, so a paragraph still scans. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {highlight(text).map((seg, i) =>
        seg.mark ? (
          <strong
            key={i}
            className="font-semibold text-slate-900 bg-amber-100/70 rounded px-0.5 box-decoration-clone"
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

/**
 * How a question should read: what you are handed, then what is expected.
 *
 * No diagnosis, no method, no property names. Everything that tells you *how*
 * has been moved into the hints, where you spend it deliberately instead of
 * absorbing it by accident.
 */
export default function Briefing({ briefing }: Props) {
  return (
    <div className="space-y-4">
      {briefing.given.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            <FileInput size={13} className="text-slate-400" /> What you are given
          </h3>
          <ul className="space-y-1">
            {briefing.given.map((g, i) => (
              <li key={i} className="text-[13px] text-slate-600 leading-relaxed flex gap-2">
                <span className="text-slate-300 select-none">—</span>
                <span><Marked text={g} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          <Target size={13} className="text-sky-500" /> What is expected
        </h3>
        <p
          className="text-[15px] text-slate-800 leading-relaxed bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          <Marked text={briefing.expected} />
        </p>
      </section>

      {briefing.criteria.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            <CheckCircle2 size={13} className="text-emerald-500" /> Done when
          </h3>
          <ul className="space-y-1">
            {briefing.criteria.map((c, i) => (
              <li key={i} className="text-[13px] text-slate-600 leading-relaxed flex gap-2">
                <span className="text-emerald-400 select-none">✓</span>
                <span><Marked text={c} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
