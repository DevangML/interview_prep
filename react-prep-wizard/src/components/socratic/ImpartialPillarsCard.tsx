import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { ImpartialComparisonPillars } from '../../types';

interface Props {
  pillars: ImpartialComparisonPillars;
}

export function ImpartialPillarsCard({ pillars }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition cursor-pointer"
      >
        <Layers size={12} />
        <span>{isOpen ? 'Hide' : 'View'} 3-Pillar Impartial Evidence (Spec vs. Code vs. Test)</span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {isOpen && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] pt-1">
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">📋 Contract Requirements</span>
            <p className="text-slate-600 leading-normal">{pillars.specRequirements}</p>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">⚡ Your Code Behavior</span>
            <p className="text-slate-600 leading-normal">{pillars.studentBehavior}</p>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">⚖️ Test Harness Audit</span>
            <p className="text-slate-600 leading-normal">{pillars.testHarnessStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
}
