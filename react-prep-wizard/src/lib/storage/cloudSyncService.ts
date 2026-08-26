/**
 * Cloud Sync Service
 * Bi-directional synchronization between browser localStorage and Neon DB / PostgreSQL backend.
 * Guarantees that Mastery Track, Learn modules, Playground, Rapid Fire, Library nav, and Settings
 * persist across all browsers, incognito sessions, and devices.
 */

import { request } from '../apiError';

export interface FullCloudState {
  mastery: {
    solved_units: Record<string, boolean>;
    code_snapshots: Record<string, string>;
    schedule: Record<string, any>;
    active_unit_id?: string;
  };
  learn: {
    completed_topics: Record<string, boolean>;
    diagrams: Record<string, string>;
  };
  library: {
    mastery_nav?: any;
    learn_nav?: any;
  };
  playground: {
    jsx?: string;
    css?: string;
    tab?: 'jsx' | 'css';
  };
  preferences: {
    vim_mode?: boolean;
    editor_mode?: string;
    [key: string]: any;
  };
  rapid_fire: {
    history?: any[];
    high_score?: number;
    total_attempted?: number;
  };
  projects: {
    progress?: Record<string, any>;
    audits?: Record<string, any>;
  };
}

export class CloudSyncService {
  /**
   * Scans localStorage to gather all local client state
   */
  public static collectLocalState(): Partial<FullCloudState> {
    if (typeof window === 'undefined' || !window.localStorage) return {};

    const localState: Partial<FullCloudState> = {
      mastery: {
        solved_units: {},
        code_snapshots: {},
        schedule: {},
      },
      learn: {
        completed_topics: {},
        diagrams: {},
      },
      library: {},
      playground: {},
      preferences: {},
      rapid_fire: {
        history: [],
        high_score: 0,
      },
      projects: {
        progress: {},
      },
    };

    try {
      // 1. Mastery solved
      const solvedRaw = localStorage.getItem('mastery:solved');
      if (solvedRaw) {
        localState.mastery!.solved_units = JSON.parse(solvedRaw);
      }

      // 2. Active unit
      const activeUnit = localStorage.getItem('mastery:activeUnit');
      if (activeUnit) {
        localState.mastery!.active_unit_id = activeUnit;
      }

      // 3. Spaced Repetition Schedule
      const schedRaw = localStorage.getItem('css100:sched');
      if (schedRaw) {
        localState.mastery!.schedule = JSON.parse(schedRaw);
      }

      // 4. Unit code snapshots from localStorage keys `mastery:code:<unit_id>`
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('mastery:code:')) {
          const unitId = key.replace('mastery:code:', '');
          const code = localStorage.getItem(key);
          if (code) {
            localState.mastery!.code_snapshots[unitId] = code;
          }
        }
        if (key && key.startsWith('learn:diagram:')) {
          const topicId = key.replace('learn:diagram:', '');
          const diag = localStorage.getItem(key);
          if (diag) {
            localState.learn!.diagrams[topicId] = diag;
          }
        }
      }

      // 5. Learn completed
      const learnDoneRaw = localStorage.getItem('learn:completed');
      if (learnDoneRaw) {
        localState.learn!.completed_topics = JSON.parse(learnDoneRaw);
      }

      // 6. Library nav
      const mNav = localStorage.getItem('mastery:nav');
      if (mNav) localState.library!.mastery_nav = JSON.parse(mNav);
      const lNav = localStorage.getItem('learn:nav');
      if (lNav) localState.library!.learn_nav = JSON.parse(lNav);

      // 7. Playground
      const pJsx = localStorage.getItem('playground:jsx');
      if (pJsx) localState.playground!.jsx = pJsx;
      const pCss = localStorage.getItem('playground:css');
      if (pCss) localState.playground!.css = pCss;
      const pTab = localStorage.getItem('playground:tab');
      if (pTab === 'jsx' || pTab === 'css') localState.playground!.tab = pTab;

      // 8. Preferences
      const vim = localStorage.getItem('workbench:vim');
      if (vim !== null) localState.preferences!.vim_mode = vim === 'true';
      const mode = localStorage.getItem('css100:mode');
      if (mode) localState.preferences!.editor_mode = mode;

      // 9. Rapid fire
      const rfHist = localStorage.getItem('rapidfire:history');
      if (rfHist) localState.rapid_fire!.history = JSON.parse(rfHist);
      const rfHigh = localStorage.getItem('rapidfire:high_score');
      if (rfHigh) localState.rapid_fire!.high_score = parseInt(rfHigh, 10);
    } catch (e) {
      console.warn('Error reading local state for cloud sync:', e);
    }

    return localState;
  }

  /**
   * Hydrates localStorage with cloud state (merging non-destructively)
   */
  public static applyCloudState(cloud: FullCloudState): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      // 1. Mastery solved: merge cloud with local
      const currentSolved = JSON.parse(localStorage.getItem('mastery:solved') || '{}');
      const mergedSolved = { ...currentSolved, ...(cloud.mastery?.solved_units || {}) };
      localStorage.setItem('mastery:solved', JSON.stringify(mergedSolved));

      // 2. Active unit
      if (cloud.mastery?.active_unit_id && !localStorage.getItem('mastery:activeUnit')) {
        localStorage.setItem('mastery:activeUnit', cloud.mastery.active_unit_id);
      }

      // 3. Spaced repetition schedule: merge
      const currentSched = JSON.parse(localStorage.getItem('css100:sched') || '{}');
      const mergedSched = { ...currentSched, ...(cloud.mastery?.schedule || {}) };
      localStorage.setItem('css100:sched', JSON.stringify(mergedSched));

      // 4. Code snapshots: hydrate units where local is empty
      if (cloud.mastery?.code_snapshots) {
        for (const [unitId, code] of Object.entries(cloud.mastery.code_snapshots)) {
          const existing = localStorage.getItem(`mastery:code:${unitId}`);
          if (!existing && code) {
            localStorage.setItem(`mastery:code:${unitId}`, code);
          }
        }
      }

      // 5. Learn completed
      const currentLearn = JSON.parse(localStorage.getItem('learn:completed') || '{}');
      const mergedLearn = { ...currentLearn, ...(cloud.learn?.completed_topics || {}) };
      localStorage.setItem('learn:completed', JSON.stringify(mergedLearn));

      // 6. Diagrams
      if (cloud.learn?.diagrams) {
        for (const [topicId, xml] of Object.entries(cloud.learn.diagrams)) {
          if (xml && !localStorage.getItem(`learn:diagram:${topicId}`)) {
            localStorage.setItem(`learn:diagram:${topicId}`, xml);
          }
        }
      }

      // 7. Library Nav
      if (cloud.library?.mastery_nav && !localStorage.getItem('mastery:nav')) {
        localStorage.setItem('mastery:nav', JSON.stringify(cloud.library.mastery_nav));
      }
      if (cloud.library?.learn_nav && !localStorage.getItem('learn:nav')) {
        localStorage.setItem('learn:nav', JSON.stringify(cloud.library.learn_nav));
      }

      // 8. Playground
      if (cloud.playground?.jsx && !localStorage.getItem('playground:jsx')) {
        localStorage.setItem('playground:jsx', cloud.playground.jsx);
      }
      if (cloud.playground?.css && !localStorage.getItem('playground:css')) {
        localStorage.setItem('playground:css', cloud.playground.css);
      }

      // 9. Preferences
      if (cloud.preferences?.vim_mode !== undefined && localStorage.getItem('workbench:vim') === null) {
        localStorage.setItem('workbench:vim', String(cloud.preferences.vim_mode));
      }

      // Notify listening components to reload their state
      window.dispatchEvent(new CustomEvent('cloud-state-hydrated', { detail: cloud }));
    } catch (e) {
      console.warn('Error applying cloud state to localStorage:', e);
    }
  }

  /**
   * Performs a full bi-directional sync with Neon DB
   */
  public static async syncFullState(): Promise<FullCloudState | null> {
    try {
      const local = this.collectLocalState();
      const res = await request<{ ok: boolean; state: FullCloudState }>('/api/sync/bulk-merge', {
        method: 'POST',
        body: JSON.stringify(local),
      });

      if (res && res.state) {
        this.applyCloudState(res.state);
        return res.state;
      }
      return null;
    } catch (e) {
      // If offline or unauthorized, gracefully continue
      return null;
    }
  }

  /**
   * Fetches latest state from Neon DB and hydrates local storage
   */
  public static async fetchAndHydrate(): Promise<FullCloudState | null> {
    try {
      const cloud = await request<FullCloudState>('/api/sync/full-state');
      if (cloud) {
        this.applyCloudState(cloud);
        return cloud;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // --- Granular Update Helpers ---

  public static async recordMasterySolve(unitId: string, done: boolean, code?: string, scheduleReview?: any) {
    try {
      await request('/api/mastery/solve', {
        method: 'POST',
        body: JSON.stringify({
          unit_id: unitId,
          done,
          code,
          schedule_review: scheduleReview,
        }),
      });
    } catch { /* offline fallback */ }
  }

  public static async saveMasteryCode(unitId: string, code: string) {
    try {
      await request('/api/mastery/code', {
        method: 'POST',
        body: JSON.stringify({ unit_id: unitId, code }),
      });
    } catch { /* offline fallback */ }
  }

  public static async saveMasteryActive(activeUnitId: string) {
    try {
      await request('/api/mastery/active', {
        method: 'POST',
        body: JSON.stringify({ active_unit_id: activeUnitId }),
      });
    } catch { /* offline fallback */ }
  }

  public static async toggleLearnTopic(topicId: string, done: boolean) {
    try {
      await request('/api/learn/toggle', {
        method: 'POST',
        body: JSON.stringify({ topic_id: topicId, done }),
      });
    } catch { /* offline fallback */ }
  }

  public static async saveLearnDiagram(topicId: string, diagramXml: string) {
    try {
      await request('/api/learn/diagram', {
        method: 'POST',
        body: JSON.stringify({ topic_id: topicId, diagram_xml: diagramXml }),
      });
    } catch { /* offline fallback */ }
  }

  public static async savePlayground(jsx?: string, css?: string, tab?: string) {
    try {
      await request('/api/playground/save', {
        method: 'POST',
        body: JSON.stringify({ jsx, css, tab }),
      });
    } catch { /* offline fallback */ }
  }

  public static async recordRapidFireRun(score: number, total: number, examMode: boolean, details?: any) {
    try {
      await request('/api/rapidfire/record', {
        method: 'POST',
        body: JSON.stringify({ score, total, exam_mode: examMode, details }),
      });
    } catch { /* offline fallback */ }
  }

  public static async savePreferences(prefs: Record<string, any>) {
    try {
      await request('/api/preferences/save', {
        method: 'POST',
        body: JSON.stringify({ preferences: prefs }),
      });
    } catch { /* offline fallback */ }
  }
}
