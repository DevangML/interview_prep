import { coverageOf } from '../lib/langCells';
import { useMuseumStore } from '../store/useMuseumStore';
import type { CatalogLanguage } from '../store/types';

export const DoorSwitch = () => {
  const { door, setDoor, languageCatalog } = useMuseumStore();
  return (
    <div className="inline-flex rounded-lg border border-surface-border p-0.5 bg-surface-raised text-xs font-chrome mb-6">
      <button
        type="button"
        onClick={() => setDoor('stages')}
        className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
          door === 'stages' ? 'bg-surface-card text-ink-1 shadow-xs' : 'text-ink-3'
        }`}
      >
        Stages
      </button>
      <button
        type="button"
        onClick={() => setDoor('languages')}
        className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
          door === 'languages' ? 'bg-surface-card text-ink-1 shadow-xs' : 'text-ink-3'
        }`}
      >
        Job languages ({languageCatalog.length})
      </button>
    </div>
  );
};

export const LanguageDoor = () => {
  const { languageCatalog, langTrack, selectLangTrack, catalogSource } = useMuseumStore();

  if (langTrack) {
    return <LanguageRoom langId={langTrack} />;
  }

  const families = new Map<string, CatalogLanguage[]>();
  for (const lang of languageCatalog) {
    const list = families.get(lang.family) || [];
    list.push(lang);
    families.set(lang.family, list);
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-10 font-chrome">
      <DoorSwitch />
      <div className="max-w-[68ch] mb-8">
        <p className="text-[11px] font-mono uppercase tracking-widest text-ink-3 font-semibold mb-2">
          Zoom 1 of 3 · Language catalog
        </p>
        <h2 className="text-2xl sm:text-3xl font-prose font-bold text-ink-1 mb-3">
          Every language still hired in 2026
        </h2>
        <p className="font-prose text-sm text-ink-2 leading-relaxed">
          {languageCatalog.length} languages. Stack Overflow 2025 professional-use list, HTML and CSS
          split, plus job-board languages SO folded or omitted. Open a language to see which of the
          18 authored concepts are verified, absent by design, or still unverified. Unverified is not
          content.
        </p>
        <p className="font-prose text-[11px] text-ink-3 mt-2 leading-relaxed">{catalogSource}</p>
      </div>
      <div className="space-y-8">
        {[...families.entries()].map(([family, langs]) => (
          <section key={family}>
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-3 mb-2">{family}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {langs.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => selectLangTrack(lang.id)}
                  className="text-left p-3 rounded-xl border border-surface-border bg-surface-card hover:border-axis/50 cursor-pointer"
                >
                  <div className="font-chrome font-semibold text-sm text-ink-1">{lang.label}</div>
                  <div className="text-[10px] font-mono text-ink-3 mt-1">
                    {lang.so2025_pct != null ? `${lang.so2025_pct}% SO ’25` : 'job-board'}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const LanguageRoom = ({ langId }: { langId: string }) => {
  const { languageCatalog, programmingNodes, selectLangTrack, selectConcept } = useMuseumStore();
  const meta = languageCatalog.find((l) => l.id === langId);
  const concepts = programmingNodes.filter((n) => !n.isLayer);

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8 font-chrome">
      <button
        type="button"
        onClick={() => selectLangTrack(null)}
        className="text-xs text-ink-3 hover:text-ink-1 cursor-pointer mb-6 font-medium"
      >
        ← All job languages
      </button>
      <h2 className="text-2xl font-prose font-bold text-ink-1 mb-1">{meta?.label || langId}</h2>
      <p className="text-xs font-mono text-ink-3 mb-4">
        {meta?.runtimeKind} · {meta?.docs || 'no canonical docs URL yet'}
      </p>
      {meta?.jobNote && (
        <p className="font-prose text-sm text-ink-2 mb-6">{meta.jobNote}</p>
      )}
      <ul className="border border-surface-border rounded-xl overflow-hidden bg-surface-card divide-y divide-surface-border">
        {concepts.map((c) => {
          const cell = (c.details?.byLanguage || []).find((x) => x.langId === langId);
          const cov = coverageOf(cell);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => selectConcept(c.id, langId)}
                className="w-full text-left px-4 py-3 hover:bg-surface-raised cursor-pointer flex items-center justify-between gap-3"
              >
                <span className="font-chrome text-sm font-semibold text-ink-1">{c.label}</span>
                <span
                  className={`text-[10px] font-mono uppercase ${
                    cov === 'verified'
                      ? 'text-coverage-verified'
                      : cov === 'absent_by_design'
                        ? 'text-coverage-absent'
                        : 'text-coverage-unverified'
                  }`}
                >
                  {cov.replaceAll('_', ' ')}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
