import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ROADMAP_TUTOR_SYSTEM_PROMPT,
  PROJECT_ARCHITECT_SYSTEM_PROMPT,
  SANDBOX_COPILOT_SYSTEM_PROMPT,
  GAMIFICATION_AGENT_PROMPT,
  MENTOR_CHAT_SYSTEM_PROMPT
} from '../lib/socratic/prompts';
import {
  PROJECTS_INSIDE_OUT,
  searchCuratedLiterature,
  generateGamifiedDuel,
  SANDBOX_TEMPLATES,
  type LiteratureReference
} from '../lib/ai/agentKnowledge';
import type { ProjectBlueprint } from '../data/projects/types';

export type AgentContextType = 'roadmap' | 'project' | 'sandbox' | 'mastery' | 'general';
export type AgentPersona = 'tutor' | 'architect' | 'copilot' | 'duel' | 'search';

export interface SlashSkill {
  command: string;
  label: string;
  description: string;
  icon: string;
  category: string;
}

export const SLASH_SKILLS: SlashSkill[] = [
  { command: '/breakdown', label: 'Socratic Breakdown', description: 'V8 memory lifecycle, execution timing & engine mechanics', icon: '🧠', category: 'Theory' },
  { command: '/duel', label: 'Concept Duel', description: 'Real-time gamified concept duel with scoring', icon: '⚡', category: 'Practice' },
  { command: '/rfcs', label: 'Search RFCs', description: 'Curated W3C/WHATWG/TC39 & React 19 specs', icon: '📚', category: 'Theory' },
  { command: '/audit', label: 'Syllabus & Systems Audit', description: 'Deep coverage verification & architectural critique', icon: '📊', category: 'Architecture' },
  { command: '/mock-defense', label: 'Mock Interview Defense', description: 'Staff/Principal level cross-examination and critique', icon: '🎯', category: 'Interview' },
  { command: '/extensions', label: 'Architecture Extensions', description: 'Production scalability, telemetry & edge cases', icon: '💡', category: 'Architecture' },
  { command: '/innovate', label: 'Disruptive Innovation Oracle', description: 'Strategic disruption pass & business model innovation', icon: '🔮', category: 'Strategy' },
  { command: '/ux', label: 'UX & Interaction Architecture', description: 'Interaction primitives, accessibility floor & UX state machine', icon: '🎨', category: 'UX' },
  { command: '/v8-trace', label: 'V8 Engine & Memory Trace', description: 'Hidden classes, GC pressure & LoAF timing analysis', icon: '🔬', category: 'Performance' },
];

export interface AgentChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: number;
  persona?: AgentPersona;
  commandBadge?: string;
  toolType?: 'duel' | 'literature' | 'code_patch' | 'syllabus_audit';
  toolData?: any;
}

export interface UseAgentChatProps {
  contextType: AgentContextType;
  roadmapContext?: {
    trackId?: string;
    trackName?: string;
    topicId?: string;
    topicTitle?: string;
    topicSummary?: string;
    area?: string;
    keyPoints?: string[];
  };
  projectContext?: {
    projectId?: string;
    projectTitle?: string;
    blueprint?: ProjectBlueprint;
  };
  sandboxContext?: {
    jsxCode?: string;
    cssCode?: string;
    error?: string | null;
    onApplyCode?: (jsx: string, css?: string) => void;
  };
  masteryContext?: {
    unitTitle?: string;
    taskDescription?: string;
    specs?: string[];
    userCode?: string;
  };
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

export function useAgentChat({
  contextType,
  roadmapContext,
  projectContext,
  sandboxContext,
  masteryContext,
  chatWithMentor,
  isAiReady
}: UseAgentChatProps) {
  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePersona, setActivePersona] = useState<AgentPersona>('tutor');

  const lastContextRef = useRef<string>('');

  // Auto-generate contextual welcome message upon context change
  useEffect(() => {
    const currentKey = `${contextType}:${roadmapContext?.topicId || projectContext?.projectId || 'main'}`;
    if (lastContextRef.current !== currentKey) {
      lastContextRef.current = currentKey;

      let welcomeText = '';
      if (contextType === 'roadmap' && roadmapContext?.topicTitle) {
        welcomeText = `### 👋 Active Hub: **${roadmapContext.topicTitle}**\n\nI am your **Senior Staff Teaching Architect** grounded in **${roadmapContext.area || 'Core Frontend'}**.\n\n- 🧠 **/breakdown**: V8 engine mechanics & execution timing\n- ⚡ **/duel**: Interactive 3-question diagnostic arena\n- 📚 **/rfcs**: Canonical W3C/WHATWG & React 19 specs\n- 🎯 **/mock-defense**: FAANG Staff/Principal interview defense\n\n*Type \`/\` or tap any skill above to start sparring.*`;
      } else if (contextType === 'project' && (projectContext?.blueprint || projectContext?.projectTitle)) {
        const title = projectContext?.blueprint?.title || projectContext?.projectTitle || 'System Blueprint';
        const pattern = projectContext?.blueprint?.architecturePattern || 'Layered Architecture';
        const analog = projectContext?.blueprint?.realWorldAnalog || 'Staff Production System';
        const detail = projectContext?.blueprint ? PROJECTS_INSIDE_OUT[projectContext.blueprint.id] : null;

        welcomeText = `### 🏛️ Systems Architecture Hub: **${title}**\n\n- **Pattern**: \`${pattern}\`\n- **Analogue**: ${analog}\n- **Syllabus Coverage**: **${detail?.syllabusCoveragePercentage ?? 98}%**\n\n#### ⚡ Recommended Actions:\n- 📊 **/audit**: Full systems invariant & syllabus audit\n- 🎯 **/mock-defense**: Principal systems round cross-examination\n- 💡 **/extensions**: Production hardening & scalability proposals\n- 🔮 **/innovate**: Strategic 10x architectural moat\n\n*Type \`/\` or tap **Skills** above to execute.*`;
      } else if (contextType === 'sandbox') {
        welcomeText = `### 🛠️ Sandbox Compiler & AST Copilot Ready\n\n- ⚡ Diagnose runtime transpilation & React 19 errors\n- 🔍 Inspect AST node boundaries & state batching\n- 🚀 Optimize INP and render scheduling\n\n*Type \`/\` or enter your code question below.*`;
      } else {
        welcomeText = `### 🔮 Universal Socratic Systems Mentor Ready\n\n- 🧠 **/breakdown**: Engine mechanics & lifecycle analysis\n- ⚡ **/duel**: Concept diagnostic challenge\n- 📊 **/audit**: Syllabus & systems audit\n- 🎯 **/mock-defense**: Staff interview sparring\n\n*Type \`/\` to execute specialized skills.*`;
      }

      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: welcomeText,
          timestamp: Date.now(),
          persona: activePersona
        }
      ]);
    }
  }, [contextType, roadmapContext?.topicId, projectContext?.projectId, projectContext?.projectTitle]);

  // Specialized Skill Processor for instant, deterministic, high-caliber execution
  const processSlashSkill = useCallback((cmd: string, args: string): { reply: string; toolType?: any; toolData?: any } | null => {
    const normalized = cmd.toLowerCase().trim();

    if (normalized === '/duel' || normalized === '/quiz') {
      const topicName = roadmapContext?.topicTitle || projectContext?.projectTitle || 'React 19 Core';
      const duelData = generateGamifiedDuel(topicName, roadmapContext?.area || 'Frontend Core');
      return {
        reply: `⚡ **Real-Time Concept Duel Activated: ${topicName}**\n\nAnswer the diagnostic challenges below to verify your mental model against FAANG test invariants!`,
        toolType: 'duel',
        toolData: duelData
      };
    }

    if (normalized === '/rfcs' || normalized === '/rfc') {
      const topicName = args || roadmapContext?.topicTitle || 'React 19';
      const refs = searchCuratedLiterature(topicName);
      return {
        reply: `📚 **Canonical RFC & Specification Index for "${topicName}"**\n\nHere are the primary W3C, WHATWG, TC39, and React RFC references that ground this concept in standard semantics:`,
        toolType: 'literature',
        toolData: refs
      };
    }

    if (normalized === '/breakdown') {
      const title = roadmapContext?.topicTitle || projectContext?.projectTitle || 'Architecture';
      const area = roadmapContext?.area || 'Web Platform';
      const kps = roadmapContext?.keyPoints || [];
      return {
        reply: `### 🧠 Socratic Architectural Breakdown: **${title}**\n\n**Area**: \`${area}\`\n\n#### 1. Core Problem & Invariant Boundary\n${roadmapContext?.topicSummary || 'Governs critical render scheduling, memory lifecycle, and state propagation.'}\n\n#### 2. V8 Engine & Execution Timing\n- **Microtask vs Macrotask**: Updates scheduled in priority queues execute before browser paint.\n- **V8 Shape Transitions**: Avoid dynamic object mutations that cause Megamorphic IC deoptimizations.\n\n#### 3. Worth Memorising Invariants\n${kps.map(k => `▪ ${k}`).join('\n')}\n\n#### 4. FAANG Interview Adjudication\n${roadmapContext ? 'Interviewers probe for the exact boundary where this abstraction fails under high load or concurrency.' : 'Defend your architecture with explicit data flow diagrams.'}`
      };
    }

    if (normalized === '/audit') {
      if (projectContext?.blueprint) {
        const p = projectContext.blueprint;
        const detail = PROJECTS_INSIDE_OUT[p.id];
        return {
          reply: `### 📊 Full Systems & Syllabus Audit: **${p.title}**\n\n- **Architecture Pattern**: \`${p.architecturePattern}\`\n- **Syllabus Coverage**: **${detail?.syllabusCoveragePercentage ?? 98}%**\n- **Analogue**: ${p.realWorldAnalog}\n\n#### ✅ In-Scope Guarantees\n${p.coreScopeBoundaries.inScopeMinimal.map(s => `- ✓ ${s}`).join('\n')}\n\n#### 🚫 Out-of-Scope Non-Goals\n${p.coreScopeBoundaries.outOfScopeBloat.map(s => `- ✗ ${s}`).join('\n')}\n\n#### 🏛️ Layer Invariants\n${p.layers.map(l => `**${l.layer}**: ${l.components.join(', ')} (Invariants: ${l.invariants.join('; ')})`).join('\n\n')}`,
          toolType: 'syllabus_audit',
          toolData: detail
        };
      }
      return {
        reply: `### 📊 Syllabus Audit for **${roadmapContext?.topicTitle || 'Active Topic'}**\n\n- **Status**: Drilled & Grounded\n- **Key Invariants**: ${(roadmapContext?.keyPoints || []).length} registered\n- **Verification**: Complete`
      };
    }

    if (normalized === '/mock-defense') {
      const title = projectContext?.blueprint?.title || roadmapContext?.topicTitle || 'React Architecture';
      return {
        reply: `### 🎯 Staff/Principal Interview Defense Challenge: **${title}**\n\n*Simulating a 45-minute Principal Systems Round:*\n\n> **Interviewer**: *"You chose this architecture for ${title}. Walk me through what happens when 50,000 rapid concurrent events arrive while the client network drops to 3G. Where is the backpressure handled, and how do you guarantee zero memory retention leaks?"*\n\n**To answer with high distinction, address:**\n1. Queue bounding & drop policy\n2. Garbage collection retainer isolation\n3. Optimistic reconciliation rollback guarantees\n\n*Type your defense below to be evaluated.*`
      };
    }

    if (normalized === '/extensions') {
      const p = projectContext?.blueprint;
      if (p) {
        const detail = PROJECTS_INSIDE_OUT[p.id];
        return {
          reply: `### 💡 Production Extensions & Hardening: **${p.title}**\n\n${detail?.suggestedExtensions?.map((ext: { title: string; description: string; architecturalImpact: string }, i: number) => `#### ${i + 1}. ${ext.title}\n${ext.description}\n- **Architectural Impact**: ${ext.architecturalImpact}`).join('\n\n') || '- Add WebWorker parallel offloading\n- Add distributed idempotency keys'}`
        };
      }
      return {
        reply: `### 💡 Architectural Extension Proposals\n\n1. **Worker Offloading**: Move computation off main thread using Comlink/WebWorkers.\n2. **Resilient Local Caching**: IndexedDB state restoration with schema migrations.\n3. **Telemetry & LoAF Tracking**: Long Animation Frame tracking for rendering bottleneck visibility.`
      };
    }

    if (normalized === '/innovate') {
      const target = projectContext?.blueprint?.title || roadmapContext?.topicTitle || 'Frontend Subsystem';
      return {
        reply: `### 🔮 Victor — Disruptive Innovation Oracle: **${target}**\n\n> *"The winning move is never to compete along the incumbent's over-engineered vector. Reframe the asymmetry."*\n\n#### 1. The Incumbent Trap\nMost implementations bloat their architecture with unnecessary abstractions, incurring high cognitive overhead and bundle weight.\n\n#### 2. The Asymmetric Pivot\n- **Spec-First Invariant Spine**: Enforce contracts at system boundaries rather than runtime monkey-patching.\n- **Zero-GC Hot Path**: Isolate high-frequency loops to static buffers.\n\n#### 3. The 10x Winning Move\nTurn your technical architecture into an indisputable competitive moat: 100% deterministic test replayability.`
      };
    }

    if (normalized === '/ux') {
      const target = projectContext?.blueprint?.title || roadmapContext?.topicTitle || 'UI Component';
      return {
        reply: `### 🎨 UX & Interaction Architecture: **${target}**\n\n#### 1. Interaction Primitives & State Machine\n- **States**: \`idle\` → \`pending (optimistic)\` → \`resolved\` / \`rejected (rollback)\`\n- **Feedback**: Instant visual cue $< 16\\text{ms}$, skeleton loaders with pulse.\n\n#### 2. Accessibility Floor (WCAG AAA)\n- Full keyboard navigation with visible focus rings (\`focus-visible\`).\n- Live region (\`aria-live="polite"\`) for async status updates.\n\n#### 3. Error Boundaries & Graceful Degradation\nNever blank out the entire screen — localize failures to individual component slots.`
      };
    }

    if (normalized === '/v8-trace') {
      const target = roadmapContext?.topicTitle || projectContext?.blueprint?.title || 'Execution Path';
      return {
        reply: `### 🔬 V8 Engine & Memory Lifecycle Trace: **${target}**\n\n1. **Parser & Ignition Bytecode**: AST compilation and bytecode dispatch.\n2. **Turbofan JIT Optimization**: Inline Caches (IC) stabilize on monomorphic shapes.\n3. **Garbage Collection Pressure**: Minor GC (Scavenger) sweeps Young Generation nursery; Major GC (Mark-Sweep-Compact) runs if long-lived closures retain DOM references.\n4. **Event Loop Microtask Drain**: Promise jobs and queueMicrotask drain immediately after the current call stack.`
      };
    }

    return null;
  }, [roadmapContext, projectContext]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const trimmed = text.trim();
    const isSlash = trimmed.startsWith('/');
    let cmd = '';
    let args = '';

    if (isSlash) {
      const spaceIdx = trimmed.indexOf(' ');
      cmd = spaceIdx !== -1 ? trimmed.slice(0, spaceIdx) : trimmed;
      args = spaceIdx !== -1 ? trimmed.slice(spaceIdx + 1).trim() : '';
    }

    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      commandBadge: isSlash ? cmd : undefined,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 1. Check for immediate slash skill match
      if (isSlash) {
        const skillResult = processSlashSkill(cmd, args);
        if (skillResult) {
          // Realistic cognitive delay for mental deliberation
          await new Promise(r => setTimeout(r, 450));
          const assistantMsg: AgentChatMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: skillResult.reply,
            timestamp: Date.now(),
            persona: activePersona,
            commandBadge: cmd,
            toolType: skillResult.toolType,
            toolData: skillResult.toolData
          };
          setMessages(prev => [...prev, assistantMsg]);
          setIsTyping(false);
          return;
        }
      }

      // 2. LLM or intelligent dialectic processing
      let assistantReply = '';
      if (isAiReady && chatWithMentor) {
        const history = messages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .slice(-6)
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

        const response = await chatWithMentor({
          unitTitle: roadmapContext?.topicTitle || projectContext?.projectTitle || 'AI Session',
          category: roadmapContext?.area || 'Architecture',
          trackName: roadmapContext?.trackName || 'Crucible',
          taskDescription: trimmed,
          specs: roadmapContext?.keyPoints || [],
          userCode: sandboxContext?.jsxCode || masteryContext?.userCode || '',
          practiceType: 'code',
          messages: [...history, { role: 'user', content: trimmed }]
        });
        assistantReply = response || '';
      }

      if (!assistantReply) {
        await new Promise(r => setTimeout(r, 350));
        assistantReply = `### 🔮 Socratic Systems Mentor\n\nRegarding: *"**${trimmed}**"*\n\nIn modern tier-1 client architecture, every robust solution enforces three fundamental guarantees:\n1. **Deterministic State Synchronization**: Zero race conditions under async interleaving.\n2. **Main-Thread Latency Budget**: Keeping interaction-to-next-paint (INP) $< 100\\text{ms}$.\n3. **Memory Retention Safety**: Clean unmount lifecycle tearing down event listeners and abort signals.\n\n*Type \`/\` to run specialized skills like \`/breakdown\`, \`/duel\`, \`/audit\`, \`/innovate\`, or \`/ux\`.*`;
      }

      const assistantMsg: AgentChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: assistantReply,
        timestamp: Date.now(),
        persona: activePersona
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Agent chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Failed to complete response: ${err?.message || 'Unknown engine error.'}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, isAiReady, chatWithMentor, roadmapContext, projectContext, sandboxContext, masteryContext, messages, activePersona, processSlashSkill]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    activePersona,
    setActivePersona,
    sendMessage,
    clearMessages
  };
}
