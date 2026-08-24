import { create } from 'zustand';
import type { Challenge, CampaignState } from './types';

interface WorkbenchState {
  // CSS 100
  currentChallenge: Challenge | null;
  filter: string;
  solvedMap: Record<string, boolean>;
  jsxCode: string;
  cssCode: string;
  activeTab: 'jsx' | 'css' | 'app';
  viewMode: 'live' | 'compare';
  hudActive: boolean;
  measureMode: boolean;
  suggestionsOn: boolean;

  // Timer
  timerActive: boolean;
  timerLeft: number;

  // Campaign
  campaign: CampaignState | null;

  // Actions
  pickChallenge: (c: Challenge) => void;
  setFilter: (f: string) => void;
  toggleSolved: (id: string) => void;
  updateJsx: (code: string) => void;
  updateCss: (code: string) => void;
  setActiveTab: (tab: 'jsx' | 'css' | 'app') => void;
  setViewMode: (mode: 'live' | 'compare') => void;
  toggleHud: () => void;
  toggleMeasure: () => void;
  toggleSuggestions: () => void;
  toggleTimer: () => void;
  tickTimer: () => void;
  resetTimer: () => void;
  setCampaign: (c: CampaignState) => void;
}

function loadSolved(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem('css100:done') || '{}'); }
  catch { return {}; }
}

function saveSolved(map: Record<string, boolean>) {
  try { localStorage.setItem('css100:done', JSON.stringify(map)); } catch { /* full */ }
}

/** Hash a string to a short base-36 stamp (matches legacy bufKey) */
function stamp(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

function bufKey(c: Challenge) { return `css100:${c.id}:${stamp(c.css)}`; }
function jsxKey(c: Challenge) { return `css100:${c.id}:jsx:${stamp(c.jsx)}`; }

function loadBuf(key: string, fallback: string): string {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
  catch { return fallback; }
}

function storeBuf(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch { /* full */ }
}

export const useStore = create<WorkbenchState>((set, get) => ({
  currentChallenge: null,
  filter: 'all',
  solvedMap: loadSolved(),
  jsxCode: '',
  cssCode: '',
  activeTab: 'jsx',
  viewMode: 'live',
  hudActive: false,
  measureMode: false,
  suggestionsOn: true,
  timerActive: false,
  timerLeft: 75,
  campaign: null,

  pickChallenge: (c) => set({
    currentChallenge: c,
    jsxCode: loadBuf(jsxKey(c), c.jsx),
    cssCode: loadBuf(bufKey(c), c.css),
    activeTab: 'jsx',
  }),

  setFilter: (f) => set({ filter: f }),

  toggleSolved: (id) => {
    const map = { ...get().solvedMap, [id]: !get().solvedMap[id] };
    saveSolved(map);
    set({ solvedMap: map });
  },

  updateJsx: (code) => {
    const c = get().currentChallenge;
    if (c) storeBuf(jsxKey(c), code);
    set({ jsxCode: code });
  },

  updateCss: (code) => {
    const c = get().currentChallenge;
    if (c) storeBuf(bufKey(c), code);
    set({ cssCode: code });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleHud: () => set((s) => ({ hudActive: !s.hudActive })),
  toggleMeasure: () => set((s) => ({ measureMode: !s.measureMode })),
  toggleSuggestions: () => set((s) => ({ suggestionsOn: !s.suggestionsOn })),
  toggleTimer: () => set((s) => ({ timerActive: !s.timerActive, timerLeft: 75 })),
  tickTimer: () => set((s) => ({ timerLeft: Math.max(0, s.timerLeft - 1) })),
  resetTimer: () => set({ timerLeft: 75 }),
  setCampaign: (c) => set({ campaign: c }),
}));

export { bufKey, jsxKey, stamp };
