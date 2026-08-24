import { create } from 'zustand';
import type { Challenge, CampaignState } from './types';
import type { GradeResult } from './lib/grader';
import { loadSchedule, saveSchedule, review as reviewOf } from './lib/schedule';
import type { Schedule } from './lib/schedule';

export type EditorMode = 'practice' | 'exam';

export interface Attempt {
  challengeId: string;
  mode: EditorMode;
  startedAt: number;
  firstKeyAt: number | null;
  keystrokes: number;
  hintsUsed: number;
  solutionRevealed: boolean;
  graded: number;
}

function newAttempt(challengeId: string, mode: EditorMode): Attempt {
  return {
    challengeId, mode, startedAt: Date.now(), firstKeyAt: null,
    keystrokes: 0, hintsUsed: 0, solutionRevealed: false, graded: 0,
  };
}

interface WorkbenchState {
  currentChallenge: Challenge | null;
  filter: string;
  schedule: Schedule;
  jsxCode: string;
  cssCode: string;
  activeTab: 'jsx' | 'css' | 'app';
  viewMode: 'live' | 'compare';
  hudActive: boolean;
  measureMode: boolean;
  suggestionsOn: boolean;
  vimMode: boolean;

  mode: EditorMode;
  attempt: Attempt | null;
  gradeResult: GradeResult | null;
  grading: boolean;
  paletteOpen: boolean;

  timerActive: boolean;
  timerLeft: number;
  campaign: CampaignState | null;

  setMode: (m: EditorMode) => void;
  noteKeystroke: () => void;
  noteHint: () => void;
  noteReveal: () => void;
  setGradeResult: (g: GradeResult | null) => void;
  setGrading: (b: boolean) => void;
  setPaletteOpen: (b: boolean) => void;
  pickChallenge: (c: Challenge) => void;
  setFilter: (f: string) => void;
  recordReview: (id: string, pass: boolean, overridden?: boolean) => void;
  updateJsx: (code: string) => void;
  updateCss: (code: string) => void;
  setActiveTab: (tab: 'jsx' | 'css' | 'app') => void;
  setViewMode: (mode: 'live' | 'compare') => void;
  toggleHud: () => void;
  toggleMeasure: () => void;
  toggleSuggestions: () => void;
  toggleVimMode: () => void;
  toggleTimer: () => void;
  tickTimer: () => void;
  resetTimer: () => void;
  setCampaign: (c: CampaignState) => void;
}

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
  schedule: loadSchedule(),
  jsxCode: '',
  cssCode: '',
  activeTab: 'jsx',
  viewMode: 'live',
  hudActive: false,
  measureMode: false,
  suggestionsOn: true,
  vimMode: typeof localStorage !== 'undefined' && localStorage.getItem('workbench:vim') === 'true',
  mode: (typeof localStorage !== 'undefined' && localStorage.getItem('css100:mode') as EditorMode) || 'practice',
  attempt: null,
  gradeResult: null,
  grading: false,
  paletteOpen: false,
  timerActive: false,
  timerLeft: 75,
  campaign: null,

  pickChallenge: (c) => set((s) => ({
    currentChallenge: c,
    jsxCode: loadBuf(jsxKey(c), c.jsx),
    cssCode: loadBuf(bufKey(c), c.css),
    activeTab: 'jsx',
    gradeResult: null,
    attempt: newAttempt(c.id, s.mode),
  })),

  setMode: (m) => {
    try { localStorage.setItem('css100:mode', m); } catch { /* full */ }
    set((s) => ({
      mode: m,
      hudActive: m === 'exam' ? false : s.hudActive,
      viewMode: m === 'exam' ? 'live' : s.viewMode,
      gradeResult: null,
      timerActive: m === 'exam',
      timerLeft: 75,
      attempt: s.currentChallenge ? newAttempt(s.currentChallenge.id, m) : null,
    }));
  },

  noteKeystroke: () => set((s) => (s.attempt
    ? { attempt: { ...s.attempt, keystrokes: s.attempt.keystrokes + 1, firstKeyAt: s.attempt.firstKeyAt ?? Date.now() } }
    : {})),
  noteHint: () => set((s) => (s.attempt ? { attempt: { ...s.attempt, hintsUsed: s.attempt.hintsUsed + 1 } } : {})),
  noteReveal: () => set((s) => (s.attempt ? { attempt: { ...s.attempt, solutionRevealed: true } } : {})),
  setGradeResult: (g) => set((s) => ({
    gradeResult: g,
    attempt: s.attempt && g ? { ...s.attempt, graded: s.attempt.graded + 1 } : s.attempt,
  })),
  setGrading: (b) => set({ grading: b }),
  setPaletteOpen: (b) => set({ paletteOpen: b }),
  setFilter: (f) => set({ filter: f }),

  recordReview: (id, pass, overridden = false) => {
    const next = { ...get().schedule, [id]: reviewOf(get().schedule[id], pass, overridden) };
    saveSchedule(next);
    set({ schedule: next });
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
  toggleVimMode: () => set((s) => {
    const next = !s.vimMode;
    try { localStorage.setItem('workbench:vim', String(next)); } catch { /* full */ }
    return { vimMode: next };
  }),
  toggleTimer: () => set((s) => ({ timerActive: !s.timerActive, timerLeft: 75 })),
  tickTimer: () => set((s) => ({ timerLeft: Math.max(0, s.timerLeft - 1) })),
  resetTimer: () => set({ timerLeft: 75 }),
  setCampaign: (c) => set({ campaign: c }),
}));

export { bufKey, jsxKey, stamp };
