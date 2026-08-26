import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  matchesTokens,
  groupLibraryItems,
  type FacetDef,
  type FacetOption,
  type SavedView,
  type LibraryGroup,
  type LibrarySubgroup
} from '../lib/libraryFilter';

export type { FacetDef, FacetOption, SavedView, LibraryGroup, LibrarySubgroup };

export interface LibraryConfig<T> {
  items: T[];
  text: (item: T) => string;
  group: (item: T) => { key: string; label: string };
  subgroup?: (item: T) => { key: string; label: string };
  facets?: FacetDef<T>[];
  views?: SavedView<T>[];
  storageKey: string;
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

export function useLibrary<T>(config: LibraryConfig<T>) {
  const { items, text, group, subgroup, facets = [], views = [], storageKey } = config;
  const initial = useMemo(() => load(storageKey), [storageKey]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, string[]>>(initial.selected ?? {});
  const [activeView, setActiveView] = useState<string | null>(initial.view ?? null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(initial.collapsed ?? []));

  useEffect(() => {
    save(storageKey, {
      selected,
      view: activeView,
      collapsed: Array.from(collapsed),
    });
  }, [storageKey, selected, activeView, collapsed]);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const facetMap = useMemo(() => {
    const m = new Map<string, Map<string, (item: T) => boolean>>();
    for (const f of facets) {
      const om = new Map<string, (item: T) => boolean>();
      for (const o of f.options) om.set(o.value, o.test);
      m.set(f.id, om);
    }
    return m;
  }, [facets]);

  const viewMap = useMemo(() => new Map(views.map((v) => [v.id, v.test])), [views]);

  const filtered = useMemo(() => {
    const viewTest = activeView ? viewMap.get(activeView) : null;
    return items.filter((item) => {
      if (viewTest && !viewTest(item)) return false;
      for (const [fId, values] of Object.entries(selected)) {
        if (!values || values.length === 0) continue;
        const om = facetMap.get(fId);
        if (!om) continue;
        const matchesAny = values.some((val) => om.get(val)?.(item));
        if (!matchesAny) return false;
      }
      if (deferredQuery) {
        const itemText = text(item).toLowerCase();
        if (!matchesTokens(itemText, deferredQuery)) return false;
      }
      return true;
    });
  }, [items, selected, activeView, deferredQuery, facetMap, viewMap, text]);

  const totalMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const item of items) {
      const g = group(item);
      m.set(g.key, (m.get(g.key) ?? 0) + 1);
    }
    return m;
  }, [items, group]);

  const grouped = useMemo(
    () => groupLibraryItems(filtered, totalMap, group, subgroup, collapsed),
    [filtered, totalMap, group, subgroup, collapsed]
  );

  const toggleFacet = useCallback((facetId: string, value: string) => {
    setSelected((prev) => {
      const curr = prev[facetId] ?? [];
      const next = curr.includes(value) ? curr.filter((v) => v !== value) : [...curr, value];
      return { ...prev, [facetId]: next };
    });
  }, []);

  const selectView = useCallback((vId: string | null) => setActiveView(vId), []);

  /**
   * Collapsing is part of the library contract, not of any one surface — a
   * second implementation in a consumer would be the same rule in two places.
   */
  const toggleCollapsed = useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const setAllCollapsed = useCallback(
    (keys: string[], value: boolean) => setCollapsed(value ? new Set(keys) : new Set()),
    [],
  );

  /** Reset every filter at once — the escape hatch beside an empty result. */
  const clear = useCallback(() => {
    setQuery('');
    setSelected({});
    setActiveView(null);
  }, []);

  const isFiltered =
    query.trim().length > 0 ||
    activeView !== null ||
    Object.values(selected).some((v) => v.length > 0);

  return {
    query, setQuery, activeFacets: selected, toggleFacet, activeView, selectView,
    groups: grouped, flatItems: filtered, totalItems: items.length,
    toggleCollapsed, setAllCollapsed, clear, isFiltered,
  };
}
