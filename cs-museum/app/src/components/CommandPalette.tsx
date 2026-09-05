import { useEffect, useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { CLUSTER_LABELS } from '../lib/capabilities';

export const CommandPalette = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    programmingNodes,
    selectConcept,
    languageCatalog,
    selectLangTrack,
  } = useMuseumStore();

  const [query, setQuery] = useState('');

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const concepts = programmingNodes.filter((n) => !n.isLayer);
  const q = query.toLowerCase().trim();

  const results = concepts.filter((c) => {
    if (!q) return true;
    const labelMatch = c.label.toLowerCase().includes(q);
    const layerMatch = c.layerId?.toLowerCase().includes(q);
    const langMatch = c.details?.byLanguage?.some((l) =>
      (l.langId || l.lang).toLowerCase().includes(q) || l.lang.toLowerCase().includes(q),
    );
    const motivationMatch = c.details?.motivation?.toLowerCase().includes(q);
    return labelMatch || layerMatch || langMatch || motivationMatch;
  });

  const langHits = languageCatalog.filter((l) => {
    if (!q) return false;
    return (
      l.label.toLowerCase().includes(q) ||
      l.id.includes(q) ||
      l.aliases.some((a) => a.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-20"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-surface-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden font-chrome"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-surface-border flex items-center gap-3">
          <span className="text-ink-3 text-sm font-mono font-bold">⌘</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, languages (e.g. Rust, GC, Async)..."
            className="w-full bg-transparent text-ink-1 placeholder:text-ink-3 text-sm outline-none font-chrome"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="text-xs text-ink-3 hover:text-ink-1 cursor-pointer font-mono"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {langHits.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                selectLangTrack(l.id);
                setCommandPaletteOpen(false);
              }}
              className="w-full p-3 rounded-xl text-left hover:bg-surface-raised flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-bold text-ink-1">{l.label}</span>
              <span className="text-[10px] font-mono text-ink-3">language</span>
            </button>
          ))}
          {results.length === 0 && langHits.length === 0 ? (
            <div className="p-4 text-center text-xs text-ink-3 font-prose">
              No matching concepts found for "{query}".
            </div>
          ) : (
            results.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  selectConcept(c.id);
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-3 rounded-xl text-left hover:bg-surface-raised flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-ink-1 group-hover:text-axis">
                    {c.label}
                  </div>
                  <div className="text-[11px] font-prose text-ink-3 line-clamp-1">
                    {c.details?.motivation || c.details?.definition}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-ink-3 uppercase px-2 py-0.5 rounded bg-surface-raised border border-surface-border">
                  {CLUSTER_LABELS[c.layerId || 'paradigms'] || c.layerId}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
