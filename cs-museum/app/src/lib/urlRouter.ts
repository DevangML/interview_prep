export interface RouteState {
  conceptId: string | null;
  language: string | null;
  mode: 'read' | 'compare';
}

const STORAGE_KEY = 'concept_atlas_state_v1';

export function getInitialRouteState(): RouteState {
  if (typeof window === 'undefined') {
    return { conceptId: null, language: null, mode: 'read' };
  }

  const params = new URLSearchParams(window.location.search);
  const urlConcept = params.get('concept');
  const urlLang = params.get('lang');
  const urlMode = params.get('mode') === 'compare' ? 'compare' : 'read';

  if (urlConcept) {
    return {
      conceptId: urlConcept,
      language: urlLang || null,
      mode: urlMode,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        conceptId: parsed.conceptId || null,
        language: parsed.language || null,
        mode: parsed.mode === 'compare' ? 'compare' : 'read',
      };
    }
  } catch {
    // Ignore localStorage parse failures
  }

  return { conceptId: null, language: null, mode: 'read' };
}

export function syncRouteState(state: RouteState): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (state.conceptId) {
    url.searchParams.set('concept', state.conceptId);
  } else {
    url.searchParams.delete('concept');
  }

  if (state.language) {
    url.searchParams.set('lang', state.language);
  } else {
    url.searchParams.delete('lang');
  }

  if (state.mode === 'compare') {
    url.searchParams.set('mode', 'compare');
  } else {
    url.searchParams.delete('mode');
  }

  window.history.replaceState(null, '', url.toString());

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable
  }
}
