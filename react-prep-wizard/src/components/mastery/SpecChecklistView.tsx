import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  specs: string[];
}

export function SpecChecklistView({ specs }: Props) {
  return (
    <div className="p-3 space-y-2 overflow-y-auto text-xs custom-scrollbar">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
        Specification Contract ({specs.length} criteria)
      </div>
      {specs.map((spec, i) => (
        <div key={i} className="flex items-start gap-2.5 text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-xs">
          <CheckCircle2 size={15} className="text-sky-400 mt-0.5 shrink-0" />
          <span className="text-[11px] leading-relaxed">{spec}</span>
        </div>
      ))}
    </div>
  );
}
