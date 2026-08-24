import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';

/**
 * One search/facet/group/collapse engine for every list surface in the app.
 *
 * The facets are not invented here — `cat`, difficulty-by-ID, the tested `use`
 * properties, `tags`, `level` and schedule status already live on the data.
 * This exposes structure that was always there but only reachable by scrolling.
 *
 * Design constraint from the strategy: every filter defaults to inert, the
 * result count is always visible, and active facets are always rendered as
 * chips — persisted state must never be silent state.
 */

export interface FacetOption<T> {
  value: string;
  label: string;
  test: (item: T) => boolean;
}

export interface FacetDef<T> {
  id: string;
  label: string;
  options: FacetOption<T>[];
}

/** A one-click preset over the facets — "Due", "Leeches", "Never attempted". */
export interface SavedView<T> {
  id: string;
  label: string;
  hint?: string;
  test: (item: T) => boolean;
}

export interface LibraryConfig<T> {
  items: T[];
  /** Everything the free-text query should match against, lowercased by us. */
  text: (item: T) => string;
  group: (item: T) => { key: string; label: string };
  facets?: FacetDef<T>[];
  views?: SavedView<T>[];
  /** Namespaces the persisted facet + collapse state. */
  storageKey: string;
}

export interface LibraryGroup<T> {
  key: string;
  label: string;
  items: T[];
  /** How many of this group exist before filtering — context, not just result. */
  total: number;
  collapsed: boolean;
}

interface Persisted {
  selected?: Record<string, string[]>;
  view?: string | null;
  collapsed?: string[];
}

function load(key: string): Persisted {
  try { return JSON.parse(localStorage.getItem(key) || '{}') as Persisted; }
  catch { return {}; }
}

function save(key: string, value: Persisted) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* full */ }
}

/**
 * Every whitespace-separated token must appear as a substring — "grid gap"
 * finds drills about both. Deliberately NOT subsequence matching: over a
 * haystack this long (title + task + tested properties) subsequence returned a
 * third of the library for "minmax", which is the opposite of what typing a
 * property name means. The command palette keeps subsequence; its haystacks
 * are short action names where the looseness helps.
 */
function matches(haystack: string, needle: string) {
  for (const token of needle.split(/\s+/)) {
    if (token && !haystack.includes(token)) return false;
  }
  return true;
}

export function useLibrary<T>(config: LibraryConfig<T>) {
  const { items, text, group, facets = [], views = [], storageKey } = config;
  const initial = useMemo(() => load(storageKey), [storageKey]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, string[]>>(initial.selected ?? {});
  const [view, setView] = useState<string | null>(initial.view ?? null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(initial.collapsed ?? []));

  // Typing stays responsive on a 108-row list: the query the filter uses lags
  // the query the input shows, and React keeps the input immediate.
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    save(storageKey, { selected, view, collapsed: [...collapsed] });
  }, [storageKey, selected, view, collapsed]);

  const toggleFacet = useCallback((facetId: string, value: string) => {
    setSelected((prev) => {
      const current = prev[facetId] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const out = { ...prev, [facetId]: next };
      if (next.length === 0) delete out[facetId];
      return out;
    });
  }, []);

  const isSelected = useCallback(
    (facetId: string, value: string) => (selected[facetId] ?? []).includes(value),
    [selected],
  );

  const toggleView = useCallback((id: string) => {
    setView((prev) => (prev === id ? null : id));
  }, []);

  const toggleCollapsed = useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const setAllCollapsed = useCallback((keys: string[], value: boolean) => {
    setCollapsed(value ? new Set(keys) : new Set());
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setSelected({});
    setView(null);
  }, []);

  const activeView = views.find((v) => v.id === view) ?? null;

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (activeView && !activeView.test(item)) return false;
      for (const facet of facets) {
        const chosen = selected[facet.id];
        if (!chosen || chosen.length === 0) continue;
        // Within a facet: OR. Across facets: AND. The convention every
        // faceted list uses, so it needs no explanation.
        const ok = facet.options.some((o) => chosen.includes(o.value) && o.test(item));
        if (!ok) return false;
      }
      if (needle && !matches(text(item).toLowerCase(), needle)) return false;
      return true;
    });
  }, [items, facets, selected, activeView, deferredQuery, text]);

  const groups = useMemo<LibraryGroup<T>[]>(() => {
    const totals = new Map<string, number>();
    for (const item of items) {
      const g = group(item);
      totals.set(g.key, (totals.get(g.key) ?? 0) + 1);
    }
    const buckets = new Map<string, LibraryGroup<T>>();
    for (const item of filtered) {
      const g = group(item);
      let bucket = buckets.get(g.key);
      if (!bucket) {
        bucket = {
          key: g.key, label: g.label, items: [],
          total: totals.get(g.key) ?? 0, collapsed: collapsed.has(g.key),
        };
        buckets.set(g.key, bucket);
      }
      bucket.items.push(item);
    }
    return [...buckets.values()];
  }, [items, filtered, group, collapsed]);

  const allGroupKeys = useMemo(
    () => [...new Set(items.map((i) => group(i).key))],
    [items, group],
  );

  const activeFacetCount =
    Object.values(selected).reduce((n, v) => n + v.length, 0) + (view ? 1 : 0);

  return {
    query, setQuery,
    /** True while the deferred query is catching up — lets the UI say so. */
    stale: query !== deferredQuery,
    groups, allGroupKeys,
    matched: filtered.length,
    total: items.length,
    facets, views,
    view, toggleView,
    isSelected, toggleFacet,
    collapsed, toggleCollapsed, setAllCollapsed,
    activeFacetCount,
    isFiltered: activeFacetCount > 0 || query.trim().length > 0,
    clear,
  };
}
