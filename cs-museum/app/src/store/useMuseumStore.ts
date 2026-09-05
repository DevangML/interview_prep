import { create } from 'zustand';
import { getInitialRouteState, syncRouteState, type RouteState } from '../lib/urlRouter';
import { conceptsInStage, getStageIdForConcept } from '../lib/stages';
import { findCell, preferredCell } from '../lib/langCells';
import { fetchMuseumData } from '../lib/dataLoader';
import type { ConceptNode, ConceptEdge, CatalogLanguage } from './types';

export * from './types';

interface MuseumState {
  isLoading: boolean;
  error: string | null;
  programmingNodes: ConceptNode[];
  programmingEdges: ConceptEdge[];
  bedrockNodesMap: Map<string, ConceptNode>;
  languageCatalog: CatalogLanguage[];
  catalogSource: string;
  activeConceptId: string | null;
  activeStageId: string | null;
  activeLanguage: string | null;
  door: 'stages' | 'languages';
  langTrack: string | null;
  viewMode: 'read' | 'compare';
  commandPaletteOpen: boolean;

  init: () => Promise<void>;
  goHome: () => void;
  setDoor: (door: 'stages' | 'languages') => void;
  selectLangTrack: (id: string | null) => void;
  selectStage: (id: string | null) => void;
  selectConcept: (id: string | null, preferredLang?: string) => void;
  selectLanguage: (lang: string | null) => void;
  setViewMode: (mode: 'read' | 'compare') => void;
  setCommandPaletteOpen: (open: boolean) => void;
  getActiveConcept: () => ConceptNode | null;
  getStageTrack: () => ConceptNode[];
}

const initialRoute = getInitialRouteState();

function persist(get: () => MuseumState, extra: Partial<RouteState> = {}) {
  const s = get();
  syncRouteState({
    conceptId: s.activeConceptId,
    stageId: s.activeStageId,
    language: s.activeLanguage,
    mode: s.viewMode,
    door: s.door,
    langTrack: s.langTrack,
    ...extra,
  });
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

      let currentStageId = get().activeStageId;
      let currentLang = get().activeLanguage;

      if (currentConceptId) {
        const node = nodes.find((n) => n.id === currentConceptId);
        if (node) currentStageId = getStageIdForConcept(node);
        const cell = preferredCell(node?.details?.byLanguage, currentLang);
        currentLang = cell?.langId || cell?.lang || currentLang;
      }

      set({
        isLoading: false,
        programmingNodes: nodes,
        programmingEdges: edges,
        bedrockNodesMap: bedrockMap,
        languageCatalog: catalog.languages || [],
        catalogSource: catalog.source || '',
        activeConceptId: currentConceptId,
        activeStageId: currentStageId,
        activeLanguage: currentLang,
      });

      persist(get, { conceptId: currentConceptId, stageId: currentStageId, language: currentLang });
    } catch (e) {
      set({ isLoading: false, error: (e as Error).message });
    }
  },

  goHome: () => {
    set({ activeConceptId: null, activeStageId: null, activeLanguage: null, langTrack: null, viewMode: 'read' });
    persist(get, { conceptId: null, stageId: null, language: null, langTrack: null, mode: 'read' });
  },

  setDoor: (door) => {
    set({ door, activeConceptId: null, activeStageId: null, langTrack: null, viewMode: 'read' });
    persist(get, { door, conceptId: null, stageId: null, langTrack: null, mode: 'read' });
  },

  selectLangTrack: (id) => {
    set({ langTrack: id, door: 'languages', activeConceptId: null, activeStageId: null, viewMode: 'read', activeLanguage: id });
    persist(get, { langTrack: id, door: 'languages', conceptId: null, stageId: null, language: id, mode: 'read' });
  },

  selectStage: (id) => {
    set({ activeStageId: id, door: 'stages', activeConceptId: null, langTrack: null, viewMode: 'read' });
    persist(get, { conceptId: null, stageId: id, door: 'stages', langTrack: null, mode: 'read' });
  },

  selectConcept: (id, preferredLang) => {
    const { programmingNodes, langTrack } = get();
    if (!id) {
      set({ activeConceptId: null, viewMode: 'read' });
      persist(get, { conceptId: null, mode: 'read' });
      return;
    }

    const node = programmingNodes.find((n) => n.id === id);
    if (!node) return;

    const prefer = preferredLang !== undefined ? preferredLang : (get().activeLanguage || langTrack);
    const cell = preferredCell(node.details?.byLanguage, prefer);
    const nextLang = cell?.langId || cell?.lang || null;
    const stageId = getStageIdForConcept(node);
    set({ activeConceptId: id, activeLanguage: nextLang, activeStageId: stageId });
    persist(get, { conceptId: id, stageId, language: nextLang });
  },

  selectLanguage: (lang) => {
    if (!lang) {
      set({ activeLanguage: null });
      persist(get, { language: null });
      return;
    }
    const concept = get().getActiveConcept();
    const cell = findCell(concept?.details?.byLanguage, lang);
    const next = cell?.langId || lang;
    set({ activeLanguage: next });
    persist(get, { language: next });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
    persist(get, { mode });
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
