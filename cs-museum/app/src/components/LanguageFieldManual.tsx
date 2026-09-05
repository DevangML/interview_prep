import type { ConceptNode, LangImpl, LangDeepSpec } from '../store/types';
import { PriceTag } from './PriceTag';
import { MethodToolboxCard } from './MethodToolboxCard';
import { ForwardChainVisualizer } from './ForwardChainVisualizer';
import { MentalModelCard } from './MentalModelCard';
import { LanguageDocsBanner } from './LanguageDocsBanner';

interface LanguageFieldManualProps {
  concept: ConceptNode;
  currentLangImpl: LangImpl;
  deepSpec: LangDeepSpec | null;
}

export const LanguageFieldManual = ({
  concept,
  currentLangImpl,
  deepSpec,
}: LanguageFieldManualProps) => {
  const { details } = concept;
  const claim = details?.does || details?.definition;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="font-prose text-base sm:text-lg text-ink-1 leading-relaxed">
          {claim}
        </p>
        {details?.outcome && (
          <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
            {details.outcome}
          </p>
        )}
      </div>

      {deepSpec && deepSpec.syntaxPrimitives.length > 0 && (
        <div className="p-3.5 rounded-xl border border-surface-border bg-surface-card flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 font-bold shrink-0">
            {currentLangImpl.lang} Primitives:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {deepSpec.syntaxPrimitives.map((prim) => (
              <code
                key={prim}
                className="text-[11px] font-artifact px-2 py-0.5 rounded bg-surface-raised border border-surface-border text-axis"
              >
                {prim}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Mechanical Lowering Engine */}
      <div className="p-5 rounded-2xl border border-surface-border bg-surface-card space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-ink-3 font-bold">
          Mechanical Engine · How {currentLangImpl.lang} Executes It
        </h3>
        <p className="font-prose text-sm sm:text-base text-ink-1 leading-relaxed">
          {currentLangImpl.mechanism}
        </p>
        {deepSpec && (
          <div className="pt-3 border-t border-surface-border grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                Memory Layout
              </span>
              <p className="font-prose text-ink-2">{deepSpec.mechanicalLowering.memoryLayout}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Cache Line Behavior
              </span>
              <p className="font-prose text-ink-2">{deepSpec.mechanicalLowering.cacheImpact}</p>
            </div>
          </div>
        )}
      </div>

      <PriceTag price={currentLangImpl.price} />

      {deepSpec && (
        <MethodToolboxCard
          items={deepSpec.methodToolbox}
          language={currentLangImpl.lang}
        />
      )}

      {deepSpec && (
        <ForwardChainVisualizer
          steps={deepSpec.forwardChain}
          language={currentLangImpl.lang}
        />
      )}

      {deepSpec && (
        <MentalModelCard
          mentalModel={deepSpec.mentalModel}
          language={currentLangImpl.lang}
        />
      )}

      {/* Primary Documentation & Self-Directed Video Notice */}
      <LanguageDocsBanner
        language={currentLangImpl.lang}
        conceptLabel={concept.label}
      />

      <details className="group rounded-xl border border-surface-border bg-surface-card">
        <summary className="cursor-pointer px-4 py-3 text-xs font-chrome font-semibold text-ink-2 hover:text-ink-1">
          Design Rationale & When to Use It
        </summary>
        <div className="px-4 pb-4 grid sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-3 block mb-1 font-bold">
              Why Chosen
            </span>
            <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
              {currentLangImpl.why}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-coverage-verified block mb-1 font-bold">
              When to Use
            </span>
            <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
              {currentLangImpl.useWhen}
            </p>
          </div>
        </div>
      </details>
    </div>
  );
};
