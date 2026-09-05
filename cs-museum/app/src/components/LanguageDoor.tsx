import { useMuseumStore } from '../store/useMuseumStore';
import type { CatalogLanguage } from '../store/types';


export const DoorSwitch = () => {
  const { door, setDoor, languageCatalog } = useMuseumStore();
  return (
    <div className="inline-flex rounded-xl border border-surface-border p-1 bg-surface-card text-xs font-chrome shadow-xs">
      <button
        type="button"
        onClick={() => setDoor('stages')}
        className={`animate-spring-press px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
          door === 'stages'
            ? 'bg-amber-500 text-black shadow-sm'
            : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
        }`}
      >
        <span>🏛️</span>
        <span>CS Pillars (14)</span>
      </button>
      <button
        type="button"
        onClick={() => setDoor('languages')}
        className={`animate-spring-press px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
          door === 'languages'
            ? 'bg-amber-500 text-black shadow-sm'
            : 'text-ink-3 hover:text-ink-1 hover:bg-surface-raised'
        }`}
      >
        <span>🌐</span>
        <span>Job Languages ({languageCatalog.length})</span>
      </button>
    </div>
  );
};

export const LanguageCatalogGrid = () => {
  const { languageCatalog, selectLangTrack, catalogSource } = useMuseumStore();

  const families = new Map<string, CatalogLanguage[]>();
  for (const lang of languageCatalog) {
    const list = families.get(lang.family) || [];
    list.push(lang);
    families.set(lang.family, list);
  }

  return (
    <div className="space-y-6 font-chrome">
      {catalogSource && (
        <p className="font-prose text-xs text-ink-3 italic">{catalogSource}</p>
      )}
      <div className="space-y-8">
        {[...families.entries()].map(([family, langs]) => (
          <section key={family}>
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-3 mb-3 font-bold">
              {family}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {langs.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => selectLangTrack(lang.id)}
                  className="animate-spring-press text-left p-3.5 rounded-xl border border-surface-border bg-surface-card hover:border-axis/50 hover:bg-surface-raised transition-all cursor-pointer group"
                >
                  <div className="font-chrome font-semibold text-sm text-ink-1 group-hover:text-axis transition-colors">
                    {lang.label}
                  </div>
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

export { LanguageRoom } from './LanguageRoom';


