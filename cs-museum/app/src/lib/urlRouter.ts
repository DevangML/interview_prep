export interface RouteState {
  conceptId: string | null;
  stageId: string | null;
  language: string | null;
  mode: 'read' | 'compare';
  door: 'stages' | 'languages';
  langTrack: string | null;
}

const STORAGE_KEY = 'concept_atlas_state_v3';

export function getInitialRouteState(): RouteState {
  if (typeof window === 'undefined') {
    return {
      conceptId: null,
      stageId: null,
      language: null,
      mode: 'read',
      door: 'stages',
      langTrack: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const urlConcept = params.get('concept');
  const urlStage = params.get('stage');
  const urlLang = params.get('lang');
  const urlMode = params.get('mode') === 'compare' ? 'compare' : 'read';
  const urlDoor = params.get('door') === 'languages' ? 'languages' : 'stages';
  const urlTrack = params.get('track');

  if (urlConcept || urlStage || urlTrack || params.get('door')) {
    return {
      conceptId: urlConcept,
      stageId: urlStage,
      language: urlLang || null,
      mode: urlMode,
      door: urlDoor,
      langTrack: urlTrack,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        conceptId: parsed.conceptId || null,
        stageId: parsed.stageId || null,
        language: parsed.language || null,
        mode: parsed.mode === 'compare' ? 'compare' : 'read',
        door: parsed.door === 'languages' ? 'languages' : 'stages',
        langTrack: parsed.langTrack || null,
      };
    }
  } catch {
    // Ignore localStorage parse failures
  }

  return {
    conceptId: null,
    stageId: null,
    language: null,
    mode: 'read',
    door: 'stages',
    langTrack: null,
  };
}

export function syncRouteState(state: RouteState): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (state.conceptId) url.searchParams.set('concept', state.conceptId);
  else url.searchParams.delete('concept');

  if (state.stageId && !state.conceptId) url.searchParams.set('stage', state.stageId);
  else url.searchParams.delete('stage');

  if (state.language) url.searchParams.set('lang', state.language);
  else url.searchParams.delete('lang');

  if (state.mode === 'compare') url.searchParams.set('mode', 'compare');
  else url.searchParams.delete('mode');

  if (!state.conceptId && state.door === 'languages') url.searchParams.set('door', 'languages');
  else url.searchParams.delete('door');

  if (!state.conceptId && state.langTrack) url.searchParams.set('track', state.langTrack);
  else url.searchParams.delete('track');

  window.history.replaceState(null, '', url.toString());

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable
  }
}
