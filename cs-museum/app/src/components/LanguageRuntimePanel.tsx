import type { CatalogLanguage } from '../store/types';
import type { CanonicalVideo, LanguageDocs } from '../lib/canonicalMedia';
import { EmbeddedCinemaCard } from './EmbeddedCinemaCard';

interface LanguageRuntimePanelProps {
  meta: CatalogLanguage | undefined;
  video: CanonicalVideo | null;
  docs: LanguageDocs | null;
}

export const LanguageRuntimePanel = ({ meta, video, docs }: LanguageRuntimePanelProps) => {
  return (
    <section className="lg:w-[46%] xl:w-[44%] flex flex-col min-h-0 rounded-2xl border border-surface-border bg-surface-card shadow-xs overflow-hidden">
      <div className="h-10 shrink-0 px-4 border-b border-surface-border bg-surface-raised/50 flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-3">
          Runtime Architecture & Media
        </span>
        <span className="text-[10px] font-mono text-ink-3 truncate max-w-[200px]">{meta?.runtimeKind}</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {/* Telemetry Matrix Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl border border-surface-border bg-surface-raised/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 block">Family</span>
            <span className="font-chrome font-bold text-xs text-ink-1">{meta?.family || 'General'}</span>
          </div>
          <div className="p-3 rounded-xl border border-surface-border bg-surface-raised/40">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 block">Execution Engine</span>
            <span className="font-chrome font-bold text-xs text-ink-1 truncate block">{meta?.runtimeKind}</span>
          </div>
        </div>

        {meta?.jobNote && (
          <p className="font-prose text-xs text-ink-2 leading-relaxed bg-surface-raised/30 p-3 rounded-xl border border-surface-border">
            {meta.jobNote}
          </p>
        )}

        {/* Embedded Canonical Masterclass */}
        {video && (
          <EmbeddedCinemaCard
            video={video}
            levelLabel={`${meta?.label} Canonical Masterclass`}
            defaultExpanded={true}
          />
        )}

        {/* Official Authority & Specification Standards */}
        {docs && (
          <div className="rounded-xl border border-surface-border bg-surface-raised/40 p-3 space-y-2 text-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-ink-3 block">
              Canonical Standards ({docs.authority})
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <a href={docs.primaryUrl} target="_blank" rel="noreferrer" className="block text-axis hover:underline truncate">
                ↗ {docs.primarySpec}
              </a>
              {docs.handbook && docs.handbookUrl && (
                <a href={docs.handbookUrl} target="_blank" rel="noreferrer" className="block text-ink-2 hover:text-ink-1 hover:underline truncate">
                  ↗ {docs.handbook}
                </a>
              )}
              {docs.deepReference && docs.deepUrl && (
                <a href={docs.deepUrl} target="_blank" rel="noreferrer" className="block text-ink-3 hover:text-ink-2 hover:underline truncate">
                  ↗ {docs.deepReference}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
