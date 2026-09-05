import { create } from 'zustand';

export interface ConceptDetails {
  definition: string;
  motivation: string;
  origin: string;
  first_principles: string;
  empowers: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  isLayer: boolean;
  layerId?: string;
  position: [number, number, number];
  shape: string;
  color: string;
  details?: ConceptDetails | null;
}

export interface ConceptEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
  color?: string;
  details?: string[];
}

interface MuseumState {
  currentView: 'bedrock' | 'programming';
  cameraMode: 'scroll' | 'orbit';
  towerData: { nodes: ConceptNode[]; edges: ConceptEdge[] } | null;
  activeConceptId: string | null;
  activeEdgeId: string | null;
  
  fetchTower: (view?: 'bedrock' | 'programming') => Promise<void>;
  selectConcept: (conceptId: string | null) => void;
  selectEdge: (edgeId: string | null) => void;
  clearSelection: () => void;
  toggleView: () => void;
  toggleCameraMode: () => void;
}

let towerCacheBedrock: Promise<any> | null = null;
let towerCacheProgramming: Promise<any> | null = null;

export const useMuseumStore = create<MuseumState>((set, get) => ({
  currentView: 'bedrock',
  cameraMode: 'scroll',
  towerData: null,
  activeConceptId: null,
  activeEdgeId: null,

  fetchTower: async (view = 'bedrock') => {
    if (view === 'bedrock') {
      if (!towerCacheBedrock) towerCacheBedrock = fetch('/data/tower.json').then(res => res.json());
      const data = await towerCacheBedrock;
      set({ towerData: data, currentView: 'bedrock', activeConceptId: null, activeEdgeId: null });
    } else {
      if (!towerCacheProgramming) towerCacheProgramming = fetch('/data/programming_tower.json').then(res => res.json());
      const data = await towerCacheProgramming;
      set({ towerData: data, currentView: 'programming', activeConceptId: null, activeEdgeId: null });
    }
  },

  selectConcept: (conceptId) => set({ activeConceptId: conceptId, activeEdgeId: null }),
  selectEdge: (edgeId) => set({ activeEdgeId: edgeId, activeConceptId: null }),
  clearSelection: () => set({ activeConceptId: null, activeEdgeId: null }),
  
  toggleView: () => {
    const nextView = get().currentView === 'bedrock' ? 'programming' : 'bedrock';
    get().fetchTower(nextView);
  },

  toggleCameraMode: () => set(s => ({ cameraMode: s.cameraMode === 'scroll' ? 'orbit' : 'scroll' }))
}));
