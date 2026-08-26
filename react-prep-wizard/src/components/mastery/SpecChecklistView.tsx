import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  specs: string[];
}

export function SpecChecklistView({ specs }: Props) {
  return (
    <div className="p-3 space-y-2 overflow-y-auto text-xs">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
        Problem Specification Contract ({specs.length} criteria)
      </div>
      {specs.map((spec, i) => (
        <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
          <CheckCircle2 size={15} className="text-sky-500 mt-0.5 shrink-0" />
          <span className="text-[12px] font-medium leading-relaxed">{spec}</span>
        </div>
      ))}
    </div>
  );
}
