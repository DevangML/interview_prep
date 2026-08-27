import React from 'react';
import { ChevronRight } from 'lucide-react';

interface WizThinkingTraceProps {
  thinking: {
    intent: string;
    domain: string;
    reasoning: string;
    confidence: number;
  };
}

export function WizThinkingTrace({ thinking }: WizThinkingTraceProps) {
  return (
    <div className="ml-10 mt-3 bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-xs">
      <div className="font-semibold text-purple-300 mb-3">🧠 WIZ Reasoning Trace</div>

      <div className="space-y-2 text-slate-300">
        <div className="flex items-start gap-2">
          <ChevronRight size={12} className="text-purple-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-purple-400 font-medium">Intent:</span> {thinking.intent}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <ChevronRight size={12} className="text-purple-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-purple-400 font-medium">Domain:</span> {thinking.domain}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <ChevronRight size={12} className="text-purple-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-purple-400 font-medium">Reasoning:</span>
            <div className="text-slate-400 mt-1 ml-2 italic">{thinking.reasoning}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-purple-500/20 mt-3">
          <div className="flex-1">
            <span className="text-purple-400 font-medium">Confidence:</span>
            <div className="w-full bg-purple-900/30 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all"
                style={{ width: `${thinking.confidence * 100}%` }}
              />
            </div>
          </div>
          <span className="text-purple-300 font-semibold whitespace-nowrap">
            {(thinking.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
