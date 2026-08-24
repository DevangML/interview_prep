import type { Challenge, Category } from '../../types';
import { useStore } from '../../store';

interface Props {
  items: Challenge[];
  categories: Category[];
}

export default function ChallengeList({ items, categories }: Props) {
  const { filter, setFilter, currentChallenge, pickChallenge, solvedMap } = useStore();

  const filtered = filter === 'all'
    ? categories
    : categories.filter((c) => c.k === filter);

  return (
    <div className="p-3 overflow-auto">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full mb-3 px-2 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-semibold"
      >
        <option value="all">All {categories.length} topics</option>
        {categories.map((c) => (
          <option key={c.k} value={c.k}>{c.n}</option>
        ))}
      </select>

      {filtered.map((cat) => {
        const catItems = items.filter((i) => i.cat === cat.k);
        const solved = catItems.filter((i) => solvedMap[i.id]).length;
        return (
          <div key={cat.k} className="mb-3">
            <p className="mb-1 text-[0.64rem] font-bold tracking-wider uppercase text-gray-500 flex">
              {cat.n}
              <span className="ml-auto text-emerald-600 tabular-nums">{solved}/{catItems.length}</span>
            </p>
            {catItems.map((item) => (
              <button
                key={item.id}
                onClick={() => pickChallenge(item)}
                aria-current={currentChallenge?.id === item.id}
                className={`flex gap-1.5 items-baseline w-full text-left border-0 px-2 py-1 rounded text-sm cursor-pointer transition-colors
                  ${currentChallenge?.id === item.id
                    ? 'bg-sky-700 text-white'
                    : 'hover:bg-blue-50'}
                  ${solvedMap[item.id] && currentChallenge?.id !== item.id ? 'text-emerald-600' : ''}`}
              >
                <span className="text-[0.62rem] font-bold font-mono text-slate-400 shrink-0">
                  {currentChallenge?.id === item.id ? '' : ''}{item.id}
                </span>
                <span className="text-[0.8rem] leading-tight">{item.title}</span>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
