import { useMemo, useState } from 'react';
import { Check, Circle } from 'lucide-react';
import type { Deliverable } from '../../data/projects/types';
import { COVERAGE_BY_PROJECT } from '../../data/projects/coverage';
import { LEARN_TOPICS } from '../../data/learn';

interface Props {
  projectId: string;
  deliverables: Deliverable[];
}

/**
 * The build list, and the reason the coverage graph is trustworthy.
 *
 * Every coverage edge anchors to one of these or to a stage — the build fails
 * otherwise — so ticking this list off is the same act as covering the
 * concepts shown on the graph. Each row therefore states what it proves.
 */
export default function DeliverableList({ projectId, deliverables }: Props) {
  const [done, setDone] = useState<Set<string>>(new Set());

  const proves = useMemo(() => {
    const titles = new Map(LEARN_TOPICS.map((t) => [t.id, t.title]));
    const map = new Map<string, string[]>();
    for (const edge of COVERAGE_BY_PROJECT.get(projectId)?.edges ?? []) {
      const base = edge.where.split(' — ')[0].trim();
      const title = titles.get(edge.conceptId);
      if (title) (map.get(base) ?? map.set(base, []).get(base)!).push(title);
    }
    return map;
  }, [projectId]);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  if (deliverables.length === 0) {
    return (
      <p className="text-[11px] text-slate-500">
        This project is carried entirely by its stages — every concept it covers is anchored to one of them.
      </p>
    );
  }

  return (
    <ul className="space-y-1.5">
      {deliverables.map((d) => {
        const isDone = done.has(d.id);
        const covers = proves.get(d.id) ?? [];
        return (
          <li key={d.id}>
            <button
              onClick={() => toggle(d.id)}
              aria-pressed={isDone}
              className={`w-full text-left p-2.5 rounded-lg border transition flex gap-2.5 ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              {isDone
                ? <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                : <Circle size={13} className="mt-0.5 shrink-0 text-slate-600" />}
              <span className="min-w-0 flex-1 space-y-1">
                <span className={`block text-[11px] font-bold ${isDone ? 'text-emerald-300' : 'text-slate-200'}`}>
                  {d.title}
                </span>
                <span className="block text-[11px] leading-relaxed text-slate-400">{d.spec}</span>
                {covers.length > 0 && (
                  <span className="block text-[10px] text-slate-500 pt-0.5">
                    <span className="font-mono uppercase tracking-wider text-slate-600">Proves </span>
                    {covers.slice(0, 3).join(' · ')}
                    {covers.length > 3 && ` · +${covers.length - 3} more`}
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
