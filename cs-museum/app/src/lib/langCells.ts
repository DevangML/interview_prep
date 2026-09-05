import type { Coverage, LangImpl } from '../store/types';

export function cellKey(cell: LangImpl): string {
  return cell.langId ? `${cell.langId}::${cell.variant || ''}` : cell.lang;
}

export function findCell(cells: LangImpl[] | undefined, lang: string | null): LangImpl | undefined {
  if (!cells || !lang) return undefined;
  return (
    cells.find((c) => c.langId === lang) ||
    cells.find((c) => c.lang === lang) ||
    cells.find((c) => c.lang.toLowerCase() === lang.toLowerCase())
  );
}

export function isReadable(cell: LangImpl | undefined): boolean {
  const cov = cell?.coverage;
  return Boolean(cell && (cov === 'verified' || cov === 'partial' || (!cov && cell.mechanism)));
}

export function coverageOf(cell: LangImpl | undefined): Coverage {
  if (!cell) return 'unverified';
  if (cell.coverage) return cell.coverage;
  return cell.mechanism ? 'verified' : 'unverified';
}

export function verifiedCells(cells: LangImpl[] | undefined): LangImpl[] {
  return (cells || []).filter(isReadable);
}

export function preferredCell(cells: LangImpl[] | undefined, preferred?: string | null): LangImpl | undefined {
  const list = cells || [];
  if (preferred) {
    const hit = findCell(list, preferred);
    if (hit) return hit;
  }
  const readable = verifiedCells(list);
  const rank = ['javascript', 'typescript', 'dart', 'python', 'java'];
  for (const id of rank) {
    const hit = readable.find((c) => c.langId === id);
    if (hit) return hit;
  }
  return readable[0] || list[0];
}
