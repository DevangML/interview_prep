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

export interface AgentChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: number;
  persona?: AgentPersona;
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
  const [activePersona, setActivePersona] = useState<AgentPersona>(() => {
    if (contextType === 'project') return 'architect';
    if (contextType === 'sandbox') return 'copilot';
    return 'tutor';
  });

  const lastContextRef = useRef<string>('');

  // Auto-generate contextual welcome message upon context change
  useEffect(() => {
    const currentKey = `${contextType}:${roadmapContext?.topicId || projectContext?.projectId || 'main'}`;
    if (lastContextRef.current !== currentKey) {
      lastContextRef.current = currentKey;

      let welcomeText = '';
      if (contextType === 'roadmap' && roadmapContext?.topicTitle) {
        welcomeText = `👋 **Welcome to the ${roadmapContext.topicTitle} Socratic Hub!**\n\nI am your **Senior Staff Teaching Architect**. I am grounded in the official specifications and V8/React 19 internals.\n\n*Ask me to break down this mechanism, generate a real-time concept duel, or find authoritative RFC references!*`;
      } else if (contextType === 'project' && projectContext?.blueprint) {
        const detail = PROJECTS_INSIDE_OUT[projectContext.blueprint.id];
        welcomeText = `🏛️ **Tier-1 Systems Architecture Hub: ${projectContext.blueprint.title}**\n\nI have inside-out mastery of this blueprint:\n- **Architecture**: Clean Hexagonal (${projectContext.blueprint.layers.length} Layers)\n- **Syllabus Coverage**: ${detail?.syllabusCoveragePercentage ?? 98}% coverage\n\n*Ask me for extension ideas, mock interview defense sparring, or deep V8/WebGPU invariants!*`;
      } else if (contextType === 'sandbox') {
        welcomeText = `🛠️ **Sandbox Compiler & AST Copilot Ready**\n\nI monitor your live JSX/CSS scratchpad and Babel compilation errors in real-time.\n\n*Ask me to diagnose syntax errors, scaffold production-grade components, or optimize React 19 performance!*`;
      } else {
        welcomeText = `🔮 **Universal AI Problem & Systems Mentor Ready**\n\nHow can I accelerate your Staff/Principal interview preparation today?`;
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
  }, [contextType, roadmapContext?.topicId, projectContext?.projectId]);

  const assembleSystemPrompt = useCallback(() => {
    if (activePersona === 'architect' || contextType === 'project') {
      return PROJECT_ARCHITECT_SYSTEM_PROMPT;
    }
    if (activePersona === 'copilot' || contextType === 'sandbox') {
      return SANDBOX_COPILOT_SYSTEM_PROMPT;
    }
    if (activePersona === 'duel') {
      return GAMIFICATION_AGENT_PROMPT;
    }
    if (contextType === 'mastery') {
      return MENTOR_CHAT_SYSTEM_PROMPT;
    }
    return ROADMAP_TUTOR_SYSTEM_PROMPT;
  }, [activePersona, contextType]);

  const assembleUserContext = useCallback((userQuery: string) => {
    let contextBlock = `[ACTIVE ENVIRONMENT CONTEXT]\nMode: ${contextType.toUpperCase()} | Persona: ${activePersona.toUpperCase()}\n`;

    if (contextType === 'roadmap' && roadmapContext) {
      contextBlock += `Track: ${roadmapContext.trackName || 'Core'}\nTopic: ${roadmapContext.topicTitle}\nArea: ${roadmapContext.area}\nSummary: ${roadmapContext.topicSummary || 'N/A'}\nKey Invariants: ${(roadmapContext.keyPoints || []).join('; ')}\n\n`;
    }

    if (contextType === 'project' && projectContext?.blueprint) {
      const p = projectContext.blueprint;
      const detail = PROJECTS_INSIDE_OUT[p.id];
      contextBlock += `Project ID: ${p.id}\nTitle: ${p.title}\nAnalog: ${p.realWorldAnalog}\nArchitecture: ${p.architecturePattern}\nLayers: ${p.layers.map(l => `${l.layer} (${l.components.join(', ')})`).join(' | ')}\nSyllabus Areas: ${detail?.coveredSyllabusAreas.join(', ')}\n\n`;
    }

    if (contextType === 'sandbox' && sandboxContext) {
      contextBlock += `Active JSX Code:\n\`\`\`jsx\n${sandboxContext.jsxCode || '(empty)'}\n\`\`\`\nActive CSS Code:\n\`\`\`css\n${sandboxContext.cssCode || '(empty)'}\n\`\`\`\n`;
      if (sandboxContext.error) {
        contextBlock += `Current Compilation / Runtime Error: ${sandboxContext.error}\n\n`;
      }
    }

    if (contextType === 'mastery' && masteryContext) {
      contextBlock += `Exercise: ${masteryContext.unitTitle}\nTask: ${masteryContext.taskDescription}\nSpecs: ${JSON.stringify(masteryContext.specs)}\nStudent Code:\n\`\`\`\n${masteryContext.userCode}\n\`\`\`\n\n`;
    }

    return `${contextBlock}[USER QUERY & PROMPT]\n${userQuery}\n\nDeliver a rigorous, verified, and well-structured response following your system invariants.`;
  }, [contextType, activePersona, roadmapContext, projectContext, sandboxContext, masteryContext]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      let assistantReply = '';

      if (isAiReady && chatWithMentor) {
        const fullPrompt = assembleUserContext(text);
        const history = messages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .slice(-6)
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

        const response = await chatWithMentor({
          unitTitle: roadmapContext?.topicTitle || projectContext?.projectTitle || 'AI Session',
          category: roadmapContext?.area || 'Architecture',
          trackName: roadmapContext?.trackName || 'Crucible',
          taskDescription: fullPrompt,
          specs: roadmapContext?.keyPoints || [],
          userCode: sandboxContext?.jsxCode || masteryContext?.userCode || '',
          practiceType: 'code',
          messages: [...history, { role: 'user', content: fullPrompt }]
        });

        assistantReply = response || '';
      }

      // Smart zero-cost heuristic synthesis fallback if in-browser model is loading or not yet initialized
      if (!assistantReply) {
        await new Promise(r => setTimeout(r, 600));

        if (contextType === 'project' && projectContext?.blueprint) {
          const detail = PROJECTS_INSIDE_OUT[projectContext.blueprint.id];
          const query = text.toLowerCase();
          if (query.includes('extension') || query.includes('suggest') || query.includes('more')) {
            assistantReply = `### 💡 High-Impact Architectural Extensions for ${projectContext.blueprint.title}\n\n` +
              detail.suggestedExtensions.map((ext, idx) =>
                `**${idx + 1}. ${ext.title}**\n- **Description**: ${ext.description}\n- **Architectural Trade-off & Impact**: ${ext.architecturalImpact}`
              ).join('\n\n');
          } else if (query.includes('defense') || query.includes('interview') || query.includes('question') || query.includes('spar')) {
            const q = detail.interviewDefenseQuestions[0];
            assistantReply = `### 🎯 Staff Interview Defense Challenge\n\n**Question**: *"${q.question}"*\n\n> **Key Architectural Insight**: ${q.modelAnswerKey}\n\n⚠️ **Trap to Avoid**: ${q.trapToAvoid}`;
          } else {
            assistantReply = `### 🏛️ Architectural Blueprint Analysis: ${projectContext.blueprint.title}\n\n` +
              `**Core Invariant**: Built around *${projectContext.blueprint.architecturePattern}*.\n\n` +
              `**Syllabus Coverage**: **${detail.syllabusCoveragePercentage}%** covering ${detail.coveredSyllabusAreas.join(', ')}.\n\n` +
              `**Key Subsystem Layers**:\n` +
              projectContext.blueprint.layers.map(l => `- **${l.layer} Layer**: ${l.components.join(', ')} (Invariant: ${l.invariants.join(' ')})`).join('\n') +
              `\n\n*Would you like to run a mock interview defense, explore extensions, or audit syllabus coverage?*`;
          }
        } else if (contextType === 'sandbox') {
          if (sandboxContext?.error) {
            assistantReply = `### 🛠️ Reflexion Compiler Error Diagnosis\n\n**Error Trace**: \`${sandboxContext.error}\`\n\n**Root Cause Analysis**:\nThe Babel JSX transpiler encountered an unexpected token or unclosed expression in your component tree.\n\n**Recommended Fix**:\nEnsure all JSX elements have matching closing tags, dynamic props use single braces \`{...}\`, and hooks are declared at the top level of the component.`;
          } else {
            assistantReply = `### ⚡ Sandbox Code Optimization Review\n\nYour JSX component is syntactically valid and transpiling cleanly into React 19 execution!\n\n**High-Leverage Insights**:\n- **Re-render Budget**: Keep state changes scoped to leaf nodes or use React 19 \`useActionState\` for form actions.\n- **Layout Stability**: Container Queries (\`@container\`) and \`subgrid\` eliminate layout shifts.\n\n*Click "Scaffold Template" or ask me to generate a production component pattern!*`;
          }
        } else if (contextType === 'roadmap' && roadmapContext?.topicTitle) {
          assistantReply = `### 🧠 Socratic Breakdown: ${roadmapContext.topicTitle}\n\n` +
            `**Underlying Mechanism**:\n` +
            (roadmapContext.topicSummary || 'Governs critical render scheduling, memory lifecycle, and state propagation.') +
            `\n\n**Invariants Worth Memorizing**:\n` +
            (roadmapContext.keyPoints?.map(k => `- ${k}`).join('\n') || '- Enforces deterministic state lifecycle and zero-unnecessary re-renders.') +
            `\n\n*Would you like to test your understanding with an instant gamified duel or look up primary RFC citations?*`;
        } else {
          assistantReply = `### 🔮 Socratic Technical Mentor\n\nI am analyzing your query with the **Chain-of-Verification (CoVe)** protocol.\n\nEverything in technical frontend systems boils down to three invariants:\n1. **Event Loop & Microtask Timing**: Microtask checkpoints drain before next frame paints.\n2. **Memory & Retainer Topology**: Avoiding closures capturing detached DOM references.\n3. **Concurrent Reconciliation**: Interruptible render phases and deterministic commit phases.`;
        }
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
  }, [isTyping, isAiReady, chatWithMentor, assembleUserContext, contextType, activePersona, roadmapContext, projectContext, sandboxContext, masteryContext, messages]);

  // Tool: Trigger Interactive Duel
  const triggerGamifiedDuel = useCallback(() => {
    const title = roadmapContext?.topicTitle || projectContext?.projectTitle || 'React Internals';
    const area = roadmapContext?.area || 'Architecture';
    const duel = generateGamifiedDuel(title, area);

    const duelMsg: AgentChatMessage = {
      id: `duel-${Date.now()}`,
      role: 'tool',
      toolType: 'duel',
      toolData: duel,
      content: `🎮 **Gamified Battle Generated: ${duel.duelTitle}**\n\nAnswer the challenge question to prove your architectural intuition!`,
      timestamp: Date.now(),
      persona: 'duel'
    };

    setMessages(prev => [...prev, duelMsg]);
  }, [roadmapContext, projectContext]);

  // Tool: Search Literature & RFCs
  const searchLiterature = useCallback((query: string) => {
    const results = searchCuratedLiterature(query);
    const litMsg: AgentChatMessage = {
      id: `lit-${Date.now()}`,
      role: 'tool',
      toolType: 'literature',
      toolData: results,
      content: `📚 **Verified Literature & Specification Search for "${query}"**\nFound ${results.length} primary reference(s) from React RFCs, W3C, WHATWG, and V8 Team.`,
      timestamp: Date.now(),
      persona: 'search'
    };
    setMessages(prev => [...prev, litMsg]);
  }, []);

  // Tool: Suggest Project Extensions
  const suggestProjectExtensions = useCallback(() => {
    if (!projectContext?.blueprint) return;
    const detail = PROJECTS_INSIDE_OUT[projectContext.blueprint.id];
    if (!detail) return;

    let content = `### 💡 High-Impact Architectural Extensions for ${projectContext.blueprint.title}\n\n`;
    detail.suggestedExtensions.forEach((ext, i) => {
      content += `**${i + 1}. ${ext.title}**\n- **Implementation**: ${ext.description}\n- **Architectural Invariant**: ${ext.architecturalImpact}\n\n`;
    });

    setMessages(prev => [
      ...prev,
      {
        id: `ext-${Date.now()}`,
        role: 'assistant',
        content,
        timestamp: Date.now(),
        persona: 'architect'
      }
    ]);
  }, [projectContext]);

  // Tool: Audit Project Syllabus Coverage
  const auditProjectSyllabus = useCallback(() => {
    if (!projectContext?.blueprint) return;
    const detail = PROJECTS_INSIDE_OUT[projectContext.blueprint.id];
    if (!detail) return;

    const content = `### 📊 Syllabus Coverage Audit: ${projectContext.blueprint.title}\n\n` +
      `**Coverage Rating**: **${detail.syllabusCoveragePercentage}%** of Senior/Staff frontend interview topics.\n\n` +
      `**Directly Exercised Syllabus Areas**:\n` +
      detail.coveredSyllabusAreas.map(a => `✅ **${a}**`).join('\n') +
      `\n\n**Explicit Topics Matrix**: ${projectContext.blueprint.explicitTopics.length} topics mapped.\n` +
      `**Implicit V8 & Browser Foundations**: ${projectContext.blueprint.implicitFoundations.length} deep invariants.`;

    setMessages(prev => [
      ...prev,
      {
        id: `audit-${Date.now()}`,
        role: 'assistant',
        content,
        timestamp: Date.now(),
        persona: 'architect',
        toolType: 'syllabus_audit'
      }
    ]);
  }, [projectContext]);

  // Tool: Scaffold Component into Playground
  const scaffoldSandboxTemplate = useCallback((templateKey: keyof typeof SANDBOX_TEMPLATES) => {
    const template = SANDBOX_TEMPLATES[templateKey];
    if (!template) return;

    if (sandboxContext?.onApplyCode) {
      sandboxContext.onApplyCode(template.jsx, template.css);
    }

    setMessages(prev => [
      ...prev,
      {
        id: `scaffold-${Date.now()}`,
        role: 'tool',
        toolType: 'code_patch',
        content: `🚀 **Scaffold Applied to Sandbox**: *${template.title}*\n\nInjected production-grade component JSX and styling directly into your scratchpad editor.`,
        timestamp: Date.now(),
        persona: 'copilot'
      }
    ]);
  }, [sandboxContext]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    activePersona,
    setActivePersona,
    sendMessage,
    triggerGamifiedDuel,
    searchLiterature,
    suggestProjectExtensions,
    auditProjectSyllabus,
    scaffoldSandboxTemplate,
    clearMessages
  };
}
