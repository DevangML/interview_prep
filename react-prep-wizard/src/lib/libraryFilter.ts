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

export interface SavedView<T> {
  id: string;
  label: string;
  hint?: string;
  test: (item: T) => boolean;
}

export interface LibrarySubgroup<T> {
  key: string;
  label: string;
  items: T[];
}

export interface LibraryGroup<T> {
  key: string;
  label: string;
  items: T[];
  total: number;
  collapsed: boolean;
  subgroups: LibrarySubgroup<T>[];
}

export function matchesTokens(haystack: string, needle: string): boolean {
  for (const token of needle.split(/\s+/)) {
    if (token && !haystack.includes(token)) return false;
  }
  return true;
}

export function groupLibraryItems<T>(
  items: T[],
  totalMap: Map<string, number>,
  groupFn: (item: T) => { key: string; label: string },
  subgroupFn?: (item: T) => { key: string; label: string },
  collapsedKeys?: Set<string>
): LibraryGroup<T>[] {
  const groups = new Map<string, { label: string; items: T[]; subMap: Map<string, { label: string; items: T[] }> }>();

  for (const item of items) {
    const g = groupFn(item);
    let entry = groups.get(g.key);
    if (!entry) {
      entry = { label: g.label, items: [], subMap: new Map() };
      groups.set(g.key, entry);
    }
    entry.items.push(item);

    if (subgroupFn) {
      const s = subgroupFn(item);
      let sub = entry.subMap.get(s.key);
      if (!sub) {
        sub = { label: s.label, items: [] };
        entry.subMap.set(s.key, sub);
      }
      sub.items.push(item);
    }
  }

  const out: LibraryGroup<T>[] = [];
  for (const [key, g] of groups) {
    out.push({
      key,
      label: g.label,
      items: g.items,
      total: totalMap.get(key) ?? g.items.length,
      collapsed: Boolean(collapsedKeys?.has(key)),
      subgroups: Array.from(g.subMap.entries()).map(([k, s]) => ({ key: k, label: s.label, items: s.items })),
    });
  }
  return out;
}
