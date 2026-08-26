import React, { useState } from 'react';
import { BrainCircuit, ChevronDown, ChevronUp, Globe, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import type { DeepThoughtTrace } from '../../lib/ai/deepThinkingEngine';
import type { NormativeSourceResult } from '../../lib/ai/webmcpBridge';

interface Props {
  thinkingTrace?: DeepThoughtTrace;
  webSources?: NormativeSourceResult[];
}

export function ThinkingTrace({ thinkingTrace, webSources }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!thinkingTrace && (!webSources || webSources.length === 0)) {
    return null;
  }

  return (
    <div className="mb-3 rounded-xl border border-indigo-500/25 bg-slate-950/70 overflow-hidden text-xs">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between gap-2 bg-indigo-950/30 hover:bg-indigo-950/50 transition cursor-pointer text-indigo-300 font-mono text-[11px]"
      >
        <div className="flex items-center gap-2 min-w-0">
          <BrainCircuit size={13} className="text-indigo-400 shrink-0 animate-pulse" />
          <span className="font-bold truncate">Deep Dialectic Reasoning Trace</span>
          {thinkingTrace && (
            <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-white/5">
              <Clock size={10} />
              <span>{thinkingTrace.budgetUsed.milliseconds}ms ({thinkingTrace.budgetPolicy.complexity})</span>
            </span>
          )}
          {webSources && webSources.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-500/20">
              <Globe size={10} />
              <span>Normative Docs ({webSources.length})</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-[10px] uppercase font-bold tracking-wider">{isOpen ? 'Hide' : 'Inspect'}</span>
          {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-3.5 space-y-3.5 border-t border-indigo-500/20 bg-slate-950/90 text-slate-300 leading-relaxed font-sans text-xs">
          {/* Phase 1: Premise */}
          {thinkingTrace?.deconstructedPremise && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-sky-300 mb-1">
                <span>Phase 1: Premise & Boundary Deconstruction</span>
              </div>
              <p className="text-slate-300 text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                {thinkingTrace.deconstructedPremise}
              </p>
            </div>
          )}

          {/* Phase 2: Competing Hypotheses & Counter-Examples */}
          {thinkingTrace?.competingHypotheses && thinkingTrace.competingHypotheses.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-300 mb-1">
                <span>Phase 2: Competing Hypotheses & Counter-Example Stress Testing</span>
              </div>
              <div className="space-y-2 mt-1.5">
                {thinkingTrace.competingHypotheses.map((h, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-[11px]">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span className="text-amber-400">⚡ H{i + 1}:</span>
                      <span>{h.hypothesis}</span>
                    </div>
                    <div className="text-emerald-400/90 pl-3 border-l border-emerald-500/40">
                      <strong>Basis:</strong> {h.supportingEvidence}
                    </div>
                    <div className="text-rose-400/90 pl-3 border-l border-rose-500/40">
                      <strong>Counter-Example Failure Mode:</strong> {h.counterExampleFailureMode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phase 3: Verified Invariants */}
          {thinkingTrace?.verifiedInvariants && thinkingTrace.verifiedInvariants.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-300 mb-1">
                <ShieldCheck size={12} />
                <span>Phase 3: Verified Normative Invariants</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-300">
                {thinkingTrace.verifiedInvariants.map((inv, i) => (
                  <li key={i}>{inv}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Phase 4: WebMCP Grounding Sources */}
          {webSources && webSources.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-sky-300 mb-1.5">
                <Globe size={12} />
                <span>Phase 4: WebMCP Real-Time Grounding Sources</span>
              </div>
              <div className="space-y-1.5">
                {webSources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-2 rounded-lg bg-sky-950/30 border border-sky-500/20 hover:border-sky-400/40 transition text-[11px] text-sky-200"
                  >
                    <div className="font-bold flex items-center justify-between gap-1 text-sky-300">
                      <span className="truncate">{src.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-900/60 text-sky-200">Auth: {src.domainAuthority}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{src.snippet}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
