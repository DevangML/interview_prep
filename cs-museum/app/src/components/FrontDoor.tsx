import { useMuseumStore } from '../store/useMuseumStore';

export const FrontDoor = () => {
  const {
    programmingNodes,
    activeLayerFilter,
    setLayerFilter,
    selectConcept,
  } = useMuseumStore();

  const concepts = programmingNodes.filter((n) => !n.isLayer);

  const layers = [
    { id: null, label: 'All Layers' },
    { id: 'paradigms', label: 'Paradigms' },
    { id: 'types', label: 'Type Systems' },
    { id: 'memory', label: 'Memory Models' },
    { id: 'concurrency', label: 'Concurrency' },
  ];

  const filtered = activeLayerFilter
    ? concepts.filter((c) => c.layerId === activeLayerFilter)
    : concepts;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 font-chrome">
      {/* Seminar Header */}
      <div className="max-w-[68ch] mb-8">
        <h2 className="text-2xl sm:text-3xl font-prose font-bold text-ink-1 mb-2">
          Cross-Language Concept Atlas
        </h2>
        <p className="font-prose text-base text-ink-2 leading-relaxed">
          Study programming languages by understanding the problem that birthed each construct,
          how language runtimes diverge in mechanism, and what price each design choice exacted.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-ink-3">
          <span className="px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border text-coverage-verified font-semibold">
            18 Verified Concepts
          </span>
          <span className="px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border text-relation-uses font-semibold">
            84 Implementation Links
          </span>
          <span className="px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border text-coverage-unverified font-semibold">
            5,168 Unverified Cells Scoped Out
          </span>
        </div>
      </div>

      {/* Layer / Paradigm Filter */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-surface-border pb-4">
        {layers.map((layer) => {
          const isSelected = activeLayerFilter === layer.id;
          return (
            <button
              key={layer.label}
              onClick={() => setLayerFilter(layer.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-chrome font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-axis text-white shadow-xs'
                  : 'bg-surface-card border border-surface-border text-ink-2 hover:border-surface-border-strong hover:text-ink-1'
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>

      {/* Concept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const langs = c.details?.byLanguage || [];
          const motivation = c.details?.motivation || c.details?.definition || '';
          return (
            <div
              key={c.id}
              onClick={() => selectConcept(c.id)}
              className="p-5 rounded-2xl border border-surface-border bg-surface-card hover:border-axis/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface-raised text-ink-3 font-semibold">
                    {c.layerId}
                  </span>
                  <span className="text-[11px] font-mono text-ink-3">
                    {langs.length} languages
                  </span>
                </div>
                <h3 className="font-chrome font-bold text-base text-ink-1 group-hover:text-axis transition-colors mb-2">
                  {c.label}
                </h3>
                <p className="font-prose text-xs text-ink-2 line-clamp-3 leading-relaxed">
                  "{motivation}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {langs.slice(0, 4).map((l, i) => (
                    <span
                      key={i}
                      className="inline-block px-1.5 py-0.5 rounded text-[9px] font-artifact bg-surface-raised border border-surface-border text-ink-2"
                      title={l.lang}
                    >
                      {l.lang.split(' ')[0]}
                    </span>
                  ))}
                  {langs.length > 4 && (
                    <span className="inline-block px-1 py-0.5 rounded text-[9px] font-mono bg-surface-raised border border-surface-border text-ink-3">
                      +{langs.length - 4}
                    </span>
                  )}
                </div>
                <span className="text-axis text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                  Study &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
