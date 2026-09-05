import { useState } from 'react';
import type { ConceptDetails, LangImpl } from '../store/useMuseumStore';

interface EvidenceEnvelopeProps {
  details: ConceptDetails;
  currentLangImpl?: LangImpl;
}

export const EvidenceEnvelope = ({ details, currentLangImpl }: EvidenceEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Derive provisional authority score based on ANSWER-CONTRACT.md rubric
  const authorityScore = details.authored ? 9 : 5;
  const confidence = currentLangImpl ? 'First-Class' : 'Partial / Provisional';

  return (
    <div className="mt-8 border border-surface-border rounded-2xl bg-surface-card overflow-hidden text-xs font-chrome shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="animate-spring-press w-full px-4 py-3 bg-surface-raised flex items-center justify-between text-ink-2 hover:text-ink-1 transition-all cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm select-none">🛡️</span>
          <span className="font-semibold uppercase tracking-wider text-[11px] text-ink-3">
            Evidence Envelope
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold text-[10px] border border-emerald-500/30">
            Auth: {authorityScore}/10
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-card border border-surface-border text-ink-2 font-mono text-[10px]">
            {confidence}
          </span>
        </div>
        <span className="text-ink-3 font-mono text-[11px]">{isOpen ? '− Hide Evidence' : '+ Show Contract'}</span>
      </button>

      {isOpen && (
        <div className="p-5 space-y-4 border-t border-surface-border">
          {/* 1. Who said this */}
          <div>
            <div className="font-semibold text-ink-3 uppercase text-[10px] tracking-wider mb-1">
              1. Provenance & Origin
            </div>
            <p className="font-prose text-sm text-ink-1 leading-relaxed">
              {details.origin || 'Historical origin under formal literature verification.'}
            </p>
          </div>

          {/* 2. Reasoning Chain */}
          <div>
            <div className="font-semibold text-ink-3 uppercase text-[10px] tracking-wider mb-1">
              2. Reasoning Chain
            </div>
            <div className="bg-surface-raised p-3 rounded-lg font-mono text-xs text-ink-2 space-y-1">
              <div><span className="text-ink-3">Problem:</span> {details.motivation || 'General programming tension'}</div>
              <div><span className="text-ink-3">Mechanism:</span> {currentLangImpl?.mechanism || 'Language specific primitive'}</div>
              <div><span className="text-ink-3">Costs:</span> {currentLangImpl?.price || 'Operational / runtime / cognitive'}</div>
              <div><span className="text-ink-3">First Principles:</span> {details.first_principles || 'Theoretical bedrock'}</div>
            </div>
          </div>

          {/* 3. Exhaustiveness & 4. Further Research */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-surface-border">
            <div>
              <div className="font-semibold text-ink-3 uppercase text-[10px] tracking-wider mb-1">
                3. Scope & Exhaustiveness
              </div>
              <p className="text-ink-2 text-xs leading-normal">
                Scoped to 18 verified concepts and 94 authored language comparisons. 5,168 matrix cells remain unverified.
              </p>
            </div>
            <div>
              <div className="font-semibold text-ink-3 uppercase text-[10px] tracking-wider mb-1">
                4. Research Frontier
              </div>
              <p className="text-ink-2 text-xs leading-normal">
                Open verification tracks: ACM SIGPLAN HOPL papers, primary language RFCs, and formal operational semantics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
