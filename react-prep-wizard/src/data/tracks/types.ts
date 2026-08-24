export interface MasteryUnit {
  id: string;
  trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis' | 'js_traps' | 'react_ecosystem';
  trackName: string;
  title: string;
  level: 'Warm-up' | 'Core' | 'Advanced' | 'Crucible';
  category: string;
  xp: number;
  theory: {
    hook: string;
    deepDive: string;
    interviewPitch: string;
    mcq?: {
      q: string;
      options: string[];
      correct: number;
      why: string;
    };
  };
  practice: {
    type: 'css' | 'jsx' | 'js_snippet';
    task: string;
    starterCode: string;
    solutionCode: string;
    baseHtml?: string;
    specs: string[];
  };
}

export const MASTERY_TRACKS = [
  { id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },
  { id: 'js_traps', name: 'JS Execution & Traps', icon: '🪤' },
  { id: 'css_layouts', name: 'CSS 2D Layouts', icon: '🥋' },
  { id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },
  { id: 'react_practical', name: 'React Machine Coding', icon: '🏗️' },
  { id: 'react_ecosystem', name: 'Ecosystem & Tooling', icon: '📦' },
  { id: 'async_apis', name: 'Async & REST APIs', icon: '🌐' },
] as const;
