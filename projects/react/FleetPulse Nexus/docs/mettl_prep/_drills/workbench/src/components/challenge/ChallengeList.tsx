import type { Challenge, Category } from '../../types';
import { useStore } from '../../store';
import { statusOf, dueLabel } from '../../lib/schedule';
import { useNow } from '../../hooks/useNow';
import type { Status } from '../../lib/schedule';

interface Props {
  items: Challenge[];
  categories: Category[];
}

export default function ChallengeList({ items, categories }: Props) {
  const { filter, setFilter, currentChallenge, pickChallenge, schedule } = useStore();
  const now = useNow();

  const dueOnly = filter === 'due';
  const filtered = filter === 'all' || dueOnly
    ? categories
    : categories.filter((c) => c.k === filter);

  const dot: Record<Status, string> = {
    untouched: 'bg-slate-300',
    due: 'bg-amber-500',
    held: 'bg-emerald-500',
    leech: 'bg-red-500',
  };

  return (
    <div className="p-3 overflow-auto">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full mb-3 px-2 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-semibold"
      >
        <option value="all">All {categories.length} topics</option>
        <option value="due">⏳ Due for review</option>
        {categories.map((c) => (
          <option key={c.k} value={c.k}>{c.n}</option>
        ))}
      </select>

      {filtered.map((cat) => {
        let catItems = items.filter((i) => i.cat === cat.k);
        if (dueOnly) catItems = catItems.filter((i) => statusOf(schedule[i.id], now) !== 'held');
        if (catItems.length === 0) return null;
        const held = catItems.filter((i) => statusOf(schedule[i.id], now) === 'held').length;
        return (
          <div key={cat.k} className="mb-3">
            <p className="mb-1 text-[0.64rem] font-bold tracking-wider uppercase text-gray-500 flex">
              {cat.n}
              <span className="ml-auto text-emerald-600 tabular-nums">{held}/{catItems.length}</span>
            </p>
            {catItems.map((item) => {
              const st = statusOf(schedule[item.id], now);
              const active = currentChallenge?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => pickChallenge(item)}
                  aria-current={active}
                  title={dueLabel(schedule[item.id], now)}
                  className={`flex gap-1.5 items-baseline w-full text-left border-0 px-2 py-1 rounded text-sm cursor-pointer transition-colors
                    ${active ? 'bg-sky-700 text-white' : 'hover:bg-blue-50'}
                    ${st === 'held' && !active ? 'text-emerald-700' : ''}
                    ${st === 'leech' && !active ? 'text-red-700' : ''}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 self-center ${dot[st]}`} />
                  <span className="text-[0.62rem] font-bold font-mono text-slate-400 shrink-0">{item.id}</span>
                  <span className="text-[0.8rem] leading-tight">{item.title}</span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
