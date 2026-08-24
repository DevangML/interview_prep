import { useEffect, useRef } from 'react';
import { Search, X, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { FacetDef, SavedView } from '../../hooks/useLibrary';

interface Props<T> {
  query: string;
  setQuery: (q: string) => void;
  matched: number;
  total: number;
  isFiltered: boolean;
  clear: () => void;
  facets: FacetDef<T>[];
  isSelected: (facetId: string, value: string) => boolean;
  toggleFacet: (facetId: string, value: string) => void;
  views: SavedView<T>[];
  view: string | null;
  toggleView: (id: string) => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
  /** Counts per facet option, so a chip can say how much it would show. */
  counts?: Record<string, number>;
  placeholder?: string;
}

/**
 * The *browse* surface. ⌘K remains the *act* surface — uxpatterns.dev treats
 * Search Field and Command Palette as different patterns chosen by intent, and
 * NN/g warns that repurposing a pattern for another function breaks the mental
 * model. So: palette to do and to jump by name, this to explore.
 */
export default function LibraryToolbar<T>({
  query, setQuery, matched, total, isFiltered, clear,
  facets, isSelected, toggleFacet, views, view, toggleView,
  onCollapseAll, onExpandAll, counts, placeholder = 'Search…',
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘/ focuses search from anywhere — the one shortcut every browse surface has.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 px-2.5 py-2 flex flex-col gap-1.5">
      <div className="relative">
        <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); setQuery(''); } }}
          placeholder={placeholder}
          aria-label="Search this list"
          className="w-full pl-7 pr-14 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md
                     outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-100"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.58rem] font-mono text-slate-400 pointer-events-none">
          ⌘/
        </kbd>
      </div>

      {views.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => toggleView(v.id)}
              title={v.hint}
              aria-pressed={view === v.id}
              className={`px-1.5 py-0.5 rounded text-[0.62rem] font-bold uppercase tracking-wide border transition-colors
                ${view === v.id
                  ? 'bg-sky-700 border-sky-700 text-white'
                  : 'bg-white border-slate-300 text-slate-600 hover:border-sky-600 hover:text-sky-700'}`}
            >
              {v.label}
              {counts?.[`view:${v.id}`] !== undefined && (
                <span className="ml-1 opacity-70 tabular-nums">{counts[`view:${v.id}`]}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {facets.map((facet) => (
        <div key={facet.id} className="flex flex-wrap items-center gap-1">
          <span className="text-[0.56rem] font-bold uppercase tracking-wider text-slate-400 w-8 shrink-0">
            {facet.label}
          </span>
          {facet.options.map((o) => {
            const on = isSelected(facet.id, o.value);
            const n = counts?.[`${facet.id}:${o.value}`];
            return (
              <button
                key={o.value}
                onClick={() => toggleFacet(facet.id, o.value)}
                aria-pressed={on}
                className={`px-1.5 py-0.5 rounded-full text-[0.62rem] font-semibold border transition-colors
                  ${on
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}`}
              >
                {o.label}
                {n !== undefined && <span className="ml-1 opacity-60 tabular-nums">{n}</span>}
              </button>
            );
          })}
        </div>
      ))}

      <div className="flex items-center gap-1.5 text-[0.62rem] text-slate-500">
        {/* Announced, because a filter that silently empties a list is the dead end. */}
        <span aria-live="polite" className="tabular-nums font-semibold">
          {matched === total ? `${total} items` : `${matched} of ${total}`}
        </span>
        {isFiltered && (
          <button
            onClick={clear}
            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 font-semibold"
          >
            <X size={10} /> clear
          </button>
        )}
        <span className="flex-1" />
        <button onClick={onExpandAll} title="Expand all groups" className="p-0.5 hover:text-slate-800">
          <ChevronsUpDown size={12} />
        </button>
        <button onClick={onCollapseAll} title="Collapse all groups" className="p-0.5 hover:text-slate-800">
          <ChevronsDownUp size={12} />
        </button>
      </div>
    </div>
  );
}
