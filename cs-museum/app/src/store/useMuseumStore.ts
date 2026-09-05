import { create } from 'zustand';
import { getInitialRouteState, syncRouteState } from '../lib/urlRouter';
import type { ConceptNode, ConceptEdge } from './types';

export * from './types';

interface MuseumState {
  isLoading: boolean;
  error: string | null;
  programmingNodes: ConceptNode[];
  programmingEdges: ConceptEdge[];
  bedrockNodesMap: Map<string, ConceptNode>;
  activeConceptId: string | null;
  activeLanguage: string | null;
  viewMode: 'read' | 'compare';
  activeLayerFilter: string | null;
  commandPaletteOpen: boolean;

  init: () => Promise<void>;
  selectConcept: (id: string | null, preferredLang?: string) => void;
  selectLanguage: (lang: string | null) => void;
  setViewMode: (mode: 'read' | 'compare') => void;
  setLayerFilter: (layer: string | null) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  getActiveConcept: () => ConceptNode | null;
}

const initialRoute = getInitialRouteState();

export const useMuseumStore = create<MuseumState>((set, get) => ({
  isLoading: true,
  error: null,
  programmingNodes: [],
  programmingEdges: [],
  bedrockNodesMap: new Map(),
  activeConceptId: initialRoute.conceptId,
  activeLanguage: initialRoute.language,
  viewMode: initialRoute.mode,
  activeLayerFilter: null,
  commandPaletteOpen: false,

  init: async () => {
    try {
      set({ isLoading: true, error: null });
      const [progRes, bedrockRes] = await Promise.all([
        fetch('/data/programming_tower.json'),
        fetch('/data/tower.json'),
      ]);

      const progData = await progRes.json();
      const bedrockData = await bedrockRes.json();

      const bedrockMap = new Map<string, ConceptNode>();
      for (const node of bedrockData.nodes || []) {
        bedrockMap.set(node.id, node);
      }

      const nodes: ConceptNode[] = progData.nodes || [];
      const edges: ConceptEdge[] = progData.edges || [];

      let currentConceptId = get().activeConceptId;
      const conceptExists = nodes.some((n) => !n.isLayer && n.id === currentConceptId);
      if (!conceptExists && nodes.length > 0) {
        if (currentConceptId) currentConceptId = null;
      }

      let currentLang = get().activeLanguage;
      if (currentConceptId) {
        const node = nodes.find((n) => n.id === currentConceptId);
        const langs = node?.details?.byLanguage?.map((l) => l.lang) || [];
        if (langs.length > 0 && (!currentLang || !langs.includes(currentLang))) {
          currentLang = langs[0];
        }
      }

      set({
        isLoading: false,
        programmingNodes: nodes,
        programmingEdges: edges,
        bedrockNodesMap: bedrockMap,
        activeConceptId: currentConceptId,
        activeLanguage: currentLang,
      });

      syncRouteState({
        conceptId: currentConceptId,
        language: currentLang,
        mode: get().viewMode,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err?.message || 'Failed to load concept data' });
    }
  },

  selectConcept: (id, preferredLang) => {
    const { programmingNodes } = get();
    if (!id) {
      set({ activeConceptId: null, activeLanguage: null });
      syncRouteState({ conceptId: null, language: null, mode: get().viewMode });
      return;
    }

    const node = programmingNodes.find((n) => n.id === id);
    if (!node) return;

    const availableLangs = node.details?.byLanguage?.map((l) => l.lang) || [];
    let nextLang = preferredLang || get().activeLanguage;

    if (!nextLang || !availableLangs.includes(nextLang)) {
      nextLang = availableLangs[0] || null;
    }

    set({ activeConceptId: id, activeLanguage: nextLang });
    syncRouteState({
      conceptId: id,
      language: nextLang,
      mode: get().viewMode,
    });
  },

  selectLanguage: (lang) => {
    set({ activeLanguage: lang });
    syncRouteState({
      conceptId: get().activeConceptId,
      language: lang,
      mode: get().viewMode,
    });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
    syncRouteState({
      conceptId: get().activeConceptId,
      language: get().activeLanguage,
      mode,
    });
  },

  setLayerFilter: (layer) => set({ activeLayerFilter: layer }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  getActiveConcept: () => {
    const { programmingNodes, activeConceptId } = get();
    return programmingNodes.find((n) => n.id === activeConceptId) || null;
  },
}));
