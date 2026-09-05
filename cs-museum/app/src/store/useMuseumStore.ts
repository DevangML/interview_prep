import { startTransition } from 'react';
import { create } from 'zustand';
import {
  getInitialRouteState,
  syncRouteState,
  listenToBrowserNavigation,
  type RouteState,
} from '../lib/urlRouter';
import { conceptsInStage } from '../lib/stages';
import { findCell } from '../lib/langCells';
import { fetchMuseumData } from '../lib/dataLoader';
import { resolveConceptSelection } from '../lib/storeHelpers';
import type { MuseumState } from './types';

export * from './types';

const initialRoute = getInitialRouteState();

function persist(get: () => MuseumState, extra: Partial<RouteState> = {}, push: boolean = false) {
  const s = get();
  syncRouteState({
    conceptId: s.activeConceptId,
    stageId: s.activeStageId,
    language: s.activeLanguage,
    mode: s.viewMode,
    door: s.door,
    langTrack: s.langTrack,
    ...extra,
  }, push);
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  isLoading: true,
  error: null,
  programmingNodes: [],
  programmingEdges: [],
  bedrockNodesMap: new Map(),
  languageCatalog: [],
  catalogSource: '',
  activeConceptId: initialRoute.conceptId,
  activeStageId: initialRoute.stageId,
  activeLanguage: initialRoute.language,
  door: initialRoute.door,
  langTrack: initialRoute.langTrack,
  viewMode: initialRoute.mode,
  commandPaletteOpen: false,

  init: async () => {
    try {
      set({ isLoading: true, error: null });
      const { nodes, edges, bedrockMap, catalog } = await fetchMuseumData();

      let currentConceptId = get().activeConceptId;
      if (!nodes.some((n) => !n.isLayer && n.id === currentConceptId)) {
        currentConceptId = null;
      }

      const sel = resolveConceptSelection(nodes, currentConceptId, get().activeLanguage, get().langTrack);
      const stageId = sel.stageId || get().activeStageId;

      set({
        isLoading: false,
        programmingNodes: nodes,
        programmingEdges: edges,
        bedrockNodesMap: bedrockMap,
        languageCatalog: catalog.languages || [],
        catalogSource: catalog.source || '',
        activeConceptId: currentConceptId,
        activeStageId: stageId,
        activeLanguage: sel.language,
      });

      persist(get, { conceptId: currentConceptId, stageId, language: sel.language }, false);

      listenToBrowserNavigation((route) => get().applyRouteState(route));
    } catch (e) {
      set({ isLoading: false, error: (e as Error).message });
    }
  },

  applyRouteState: (route: RouteState) => {
    startTransition(() => {
      const { programmingNodes, langTrack } = get();
      const sel = resolveConceptSelection(programmingNodes, route.conceptId, route.language, langTrack);
      const stageId = sel.stageId || route.stageId;

      set({
        activeConceptId: route.conceptId,
        activeStageId: stageId,
        activeLanguage: sel.language,
        door: route.door,
        langTrack: route.langTrack,
        viewMode: route.mode,
      });

      persist(get, {
        conceptId: route.conceptId,
        stageId,
        language: sel.language,
        door: route.door,
        langTrack: route.langTrack,
        mode: route.mode,
      }, false);
    });
  },

  goHome: () => {
    startTransition(() => {
      set({ activeConceptId: null, activeStageId: null, activeLanguage: null, langTrack: null, viewMode: 'read' });
      persist(get, { conceptId: null, stageId: null, language: null, langTrack: null, mode: 'read' }, true);
    });
  },

  setDoor: (door) => {
    startTransition(() => {
      set({ door, activeConceptId: null, activeStageId: null, langTrack: null, viewMode: 'read' });
      persist(get, { door, conceptId: null, stageId: null, langTrack: null, mode: 'read' }, true);
    });
  },

  selectLangTrack: (id) => {
    startTransition(() => {
      set({ langTrack: id, door: 'languages', activeConceptId: null, activeStageId: null, viewMode: 'read', activeLanguage: id });
      persist(get, { langTrack: id, door: 'languages', conceptId: null, stageId: null, language: id, mode: 'read' }, true);
    });
  },

  selectStage: (id) => {
    startTransition(() => {
      set({ activeStageId: id, door: 'stages', activeConceptId: null, langTrack: null, viewMode: 'read' });
      persist(get, { conceptId: null, stageId: id, door: 'stages', langTrack: null, mode: 'read' }, true);
    });
  },

  selectConcept: (id, preferredLang) => {
    startTransition(() => {
      if (!id) {
        set({ activeConceptId: null, viewMode: 'read' });
        persist(get, { conceptId: null, mode: 'read' }, true);
        return;
      }
      const { programmingNodes, langTrack, activeLanguage } = get();
      const sel = resolveConceptSelection(programmingNodes, id, preferredLang ?? activeLanguage, langTrack);
      set({ activeConceptId: id, activeLanguage: sel.language, activeStageId: sel.stageId });
      persist(get, { conceptId: id, stageId: sel.stageId, language: sel.language }, true);
    });
  },

  selectLanguage: (lang) => {
    startTransition(() => {
      if (!lang) {
        set({ activeLanguage: null });
        persist(get, { language: null }, false);
        return;
      }
      const concept = get().getActiveConcept();
      const cell = findCell(concept?.details?.byLanguage, lang);
      const next = cell?.langId || lang;
      set({ activeLanguage: next });
      persist(get, { language: next }, false);
    });
  },


  setViewMode: (mode) => {
    startTransition(() => {
      set({ viewMode: mode });
      persist(get, { mode }, true);
    });
  },

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  getActiveConcept: () => {
    const { programmingNodes, activeConceptId } = get();
    return programmingNodes.find((n) => n.id === activeConceptId) || null;
  },

  getStageTrack: () => {
    const { programmingNodes, activeStageId } = get();
    if (!activeStageId) return [];
    return conceptsInStage(programmingNodes, activeStageId);
  },
}));

