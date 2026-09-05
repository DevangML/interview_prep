import { getLanguageDocs } from '../lib/canonicalMedia';

interface LanguageDocsBannerProps {
  language: string;
  conceptLabel?: string;
}

export const LanguageDocsBanner = ({
  language,
  conceptLabel,
}: LanguageDocsBannerProps) => {
  const docs = getLanguageDocs(language);

  const ytSearchQuery = encodeURIComponent(
    `${language} ${conceptLabel || ''} deep dive`
  );

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 font-chrome">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Primary Documentation & Standards
          </span>
          <h4 className="font-bold text-sm sm:text-base text-ink-1">
            {docs ? `${docs.name} Official Reference Library` : `${language} Documentation`}
          </h4>
          {docs && (
            <p className="text-[11px] font-mono text-ink-3">
              Standard Authority: {docs.authority}
            </p>
          )}
        </div>

        <a
          href={`https://www.youtube.com/results?search_query=${ytSearchQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono px-3 py-1.5 rounded-lg border border-surface-border bg-surface-raised hover:border-axis/60 text-ink-2 hover:text-ink-1 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          title="Search community videos for this specific language dialect"
        >
          <span>🔍 Search {language} Videos</span>
          <span className="text-[10px] text-ink-3">&nearr;</span>
        </a>
      </div>

      {docs && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <a
            href={docs.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-surface-border bg-surface-raised/40 hover:border-axis/50 hover:bg-surface-raised transition-all block group"
          >
            <span className="text-[9px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
              Primary Spec
            </span>
            <span className="text-xs font-bold text-ink-1 group-hover:text-axis transition-colors line-clamp-1">
              {docs.primarySpec} &rarr;
            </span>
          </a>

          {docs.handbook && docs.handbookUrl && (
            <a
              href={docs.handbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-surface-border bg-surface-raised/40 hover:border-axis/50 hover:bg-surface-raised transition-all block group"
            >
              <span className="text-[9px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
                Official Guide
              </span>
              <span className="text-xs font-bold text-ink-1 group-hover:text-axis transition-colors line-clamp-1">
                {docs.handbook} &rarr;
              </span>
            </a>
          )}

          {docs.deepReference && docs.deepUrl && (
            <a
              href={docs.deepUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-surface-border bg-surface-raised/40 hover:border-axis/50 hover:bg-surface-raised transition-all block group"
            >
              <span className="text-[9px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
                Deep Internals
              </span>
              <span className="text-xs font-bold text-ink-1 group-hover:text-axis transition-colors line-clamp-1">
                {docs.deepReference} &rarr;
              </span>
            </a>
          )}
        </div>
      )}

      {/* Explicit User-Directed Media Policy Notice */}
      <div className="p-3 rounded-xl border border-surface-border/80 bg-surface-raised/20 flex items-start gap-2.5 text-xs text-ink-3 font-prose leading-relaxed">
        <span className="text-sm select-none shrink-0 mt-0.5">ℹ️</span>
        <p>
          <strong className="text-ink-2">Language-Specific Media Note:</strong> Compiler implementations and syntax evolve across toolchain releases. We deliberately provide authoritative primary specs above rather than static video lectures. For compiler lowering walkthroughs, explore community videos matching your exact target compiler version.
        </p>
      </div>
    </div>
  );
};
