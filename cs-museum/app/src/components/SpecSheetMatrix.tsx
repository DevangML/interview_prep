import { useMuseumStore } from '../store/useMuseumStore';

export const SpecSheetMatrix = () => {
  const { getActiveConcept, selectLanguage, setViewMode } = useMuseumStore();
  const concept = getActiveConcept();

  if (!concept || !concept.details) return null;

  const { label, details } = concept;
  const langs = details.byLanguage || [];

  if (langs.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-ink-3">No language comparison matrix available for this concept.</p>
      </div>
    );
  }

  const rows = [
    { key: 'mechanism', title: 'Mechanism' },
    { key: 'why', title: 'Design Rationale (Why)' },
    { key: 'useWhen', title: 'When to Use' },
    { key: 'price', title: 'Trade-Off (Price Paid)' },
  ] as const;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 font-chrome">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-ink-1">
            Spec Sheet Matrix: {label}
          </h3>
          <p className="text-xs text-ink-3 mt-0.5">
            Comparing {langs.length} verified language solutions to this problem.
          </p>
        </div>
        <button
          onClick={() => setViewMode('read')}
          className="text-xs font-chrome text-axis hover:underline cursor-pointer"
        >
          &larr; Return to Field Manual
        </button>
      </div>

      {/* Responsive Matrix: scrollable with sticky row headers */}
      <div className="overflow-x-auto border border-surface-border rounded-xl bg-surface-card shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border bg-surface-raised/80">
              <th className="p-3 text-[11px] font-mono uppercase tracking-wider text-ink-3 w-40 sticky left-0 bg-surface-raised z-10 border-r border-surface-border">
                Property
              </th>
              {langs.map((l) => (
                <th key={l.lang} className="p-3 text-xs font-artifact font-bold text-ink-1 border-r border-surface-border last:border-r-0 min-w-[200px]">
                  <div className="flex items-center justify-between">
                    <span>{l.lang}</span>
                    <button
                      onClick={() => {
                        selectLanguage(l.lang);
                        setViewMode('read');
                      }}
                      className="text-[10px] font-normal text-axis hover:underline cursor-pointer"
                      title={`Study ${l.lang} in Field Manual`}
                    >
                      Read &rarr;
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border text-xs">
            {rows.map((row) => (
              <tr key={row.key} className="hover:bg-surface-raised/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-ink-3 text-[11px] uppercase tracking-wider sticky left-0 bg-surface-card z-10 border-r border-surface-border">
                  {row.title}
                </td>
                {langs.map((l) => {
                  const val = l[row.key];
                  const isPrice = row.key === 'price';
                  return (
                    <td
                      key={l.lang}
                      className={`p-3 align-top border-r border-surface-border last:border-r-0 font-prose leading-relaxed ${
                        isPrice ? 'text-price bg-price/5' : 'text-ink-2'
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
