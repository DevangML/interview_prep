import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  X,
  Compass,
  Code2,
  BookOpen,
  Terminal,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Brain,
  Cpu,
  Layers,
  Activity,
  Lightbulb,
  ShieldCheck,
  Target,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { useAgentChat, SLASH_SKILLS, type AgentContextType, type SlashSkill } from '../../hooks/useAgentChat';
import { FormattedMarkdown } from './FormattedMarkdown';
import { NeuralBotAvatar } from './NeuralBotAvatar';
import { CognitiveThinkingSequence } from './CognitiveThinkingSequence';
import { NeuralCommandMatrix } from './NeuralCommandMatrix';
import { ThinkingTrace } from '../chat/ThinkingTrace';
import type { ProjectBlueprint } from '../../data/projects/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contextType: AgentContextType;
  initialCommand?: string | null;
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
  liveOpsContext?: {
    questId?: string;
    questTitle?: string;
    challengeId?: string;
    challengeTitle?: string;
    targetFile?: string;
  };
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

const STARTER_QUICK_SPARKS = [
  {
    cmd: '/audit',
    title: 'Syllabus & Systems Audit',
    desc: 'Deep verification of architectural boundaries, invariants & coverage',
    icon: '📊',
    tag: 'Architecture',
    color: 'from-amber-500/15 to-orange-500/15 border-amber-500/30 hover:border-amber-400 text-amber-200'
  },
  {
    cmd: '/breakdown',
    title: 'Socratic Engine Breakdown',
    desc: 'V8 execution timing, GC pressure, render loop & microtask flow',
    icon: '🧠',
    tag: 'Theory',
    color: 'from-sky-500/15 to-indigo-500/15 border-sky-500/30 hover:border-sky-400 text-sky-200'
  },
  {
    cmd: '/duel',
    title: 'Real-Time Diagnostic Duel',
    desc: 'Interactive 3-question diagnostic challenge with instant scoring',
    icon: '⚡',
    tag: 'Diagnostic',
    color: 'from-yellow-500/15 to-amber-500/15 border-yellow-500/30 hover:border-yellow-400 text-yellow-200'
  },
  {
    cmd: '/mock-defense',
    title: 'Mock Staff Interview Defense',
    desc: 'Principal-level cross-examination on scale, race conditions & leaks',
    icon: '🎯',
    tag: 'Interview',
    color: 'from-rose-500/15 to-red-500/15 border-rose-500/30 hover:border-rose-400 text-rose-200'
  },
  {
    cmd: '/innovate',
    title: 'Disruptive Innovation Oracle',
    desc: 'Victor persona: reframe architectural asymmetry & build 10x moat',
    icon: '🔮',
    tag: 'Strategy',
    color: 'from-purple-500/15 to-pink-500/15 border-purple-500/30 hover:border-purple-400 text-purple-200'
  },
  {
    cmd: '/ux',
    title: 'UX & Interaction Architecture',
    desc: 'WCAG AAA accessibility, optimistic state machines & recovery',
    icon: '🎨',
    tag: 'UX/UI',
    color: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/30 hover:border-emerald-400 text-emerald-200'
  },
];

export default function UniversalAiAssistant({
  isOpen,
  onClose,
  contextType,
  initialCommand,
  roadmapContext,
  projectContext,
  sandboxContext,
  masteryContext,
  liveOpsContext,
  chatWithMentor,
  isAiReady
}: Props) {
  const {
    messages,
    isTyping,
    sendMessage,
    clearMessages
  } = useAgentChat({
    contextType,
    roadmapContext,
    projectContext,
    sandboxContext,
    masteryContext,
    liveOpsContext,
    chatWithMentor,
    isAiReady
  });

  const [inputVal, setInputVal] = useState('');
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedSkillIdx, setSelectedSkillIdx] = useState(0);
  const [selectedDuelAnswers, setSelectedDuelAnswers] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const executedInitialRef = useRef<string | null>(null);

  // Auto-scroll on new messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Execute initial command immediately when triggered
  useEffect(() => {
    if (isOpen && initialCommand && executedInitialRef.current !== initialCommand) {
      executedInitialRef.current = initialCommand;
      sendMessage(initialCommand);
    }
  }, [isOpen, initialCommand, sendMessage]);

  // Slash commands filtering
  const matchingSkills = SLASH_SKILLS.filter(s => {
    if (!inputVal.startsWith('/')) return true;
    const query = inputVal.slice(1).toLowerCase();
    return s.command.toLowerCase().includes(query) || s.label.toLowerCase().includes(query);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputVal(val);
    if (val.startsWith('/') && !val.includes(' ')) {
      setSlashMenuOpen(true);
      setSelectedSkillIdx(0);
    } else {
      setSlashMenuOpen(false);
    }
  };

  const executeSkill = (skill: SlashSkill | string) => {
    const cmd = typeof skill === 'string' ? skill : skill.command;
    setSlashMenuOpen(false);
    setCommandPaletteOpen(false);
    setInputVal('');
    sendMessage(cmd);
  };

  const handleSend = () => {
    if (!inputVal.trim() || isTyping) return;
    sendMessage(inputVal);
    setInputVal('');
    setSlashMenuOpen(false);
  };

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 240);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (slashMenuOpen && matchingSkills.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSkillIdx(prev => (prev + 1) % matchingSkills.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSkillIdx(prev => (prev - 1 + matchingSkills.length) % matchingSkills.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        executeSkill(matchingSkills[selectedSkillIdx]);
        return;
      }
      if (e.key === 'Escape') {
        setSlashMenuOpen(false);
        return;
      }
    }

    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!shouldRender) return null;

  const getContextBadge = () => {
    if (contextType === 'roadmap') {
      return {
        title: roadmapContext?.topicTitle || 'Roadmap Track',
        subtitle: roadmapContext?.trackName || 'Core Curriculum',
        emoji: '📚'
      };
    }
    if (contextType === 'project') {
      return {
        title: projectContext?.projectTitle || 'Tier-1 Architecture Blueprint',
        subtitle: projectContext?.blueprint?.realWorldAnalog || 'Staff System Design',
        emoji: '🏛️'
      };
    }
    if (contextType === 'sandbox') {
      return {
        title: 'Sandbox Lab & Compiler',
        subtitle: sandboxContext?.error ? 'Transpiler Error Active' : 'React 19 Execution',
        emoji: '🛠️'
      };
    }
    return {
      title: 'Interview Mastery Oracle',
      subtitle: 'Universal Socratic Substrate',
      emoji: '🔮'
    };
  };

  const badge = getContextBadge();

  return (
    <>
      {/* Background Scrim with Animated Blur */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-45 bg-slate-950/60 backdrop-blur-sm cursor-pointer ${
          isClosing ? 'animate-ai-backdrop-out' : 'animate-ai-backdrop-in'
        }`}
      />

      <div className={`fixed top-12 sm:top-14 bottom-2 sm:bottom-4 left-2 sm:left-auto right-2 sm:right-5 w-auto sm:w-[560px] lg:w-[620px] max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4.5rem)] z-50 bg-slate-950/98 backdrop-blur-3xl rounded-2xl sm:rounded-[28px] border border-sky-500/30 ring-1 ring-white/10 shadow-[0_0_60px_rgba(2,132,199,0.25),0_25px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col text-slate-100 font-sans overflow-hidden ${
        isClosing ? 'animate-ai-slide-out' : 'animate-ai-slide-in'
      }`}>
        {/* Animated Iridescent Shimmer Line */}
        <div className="h-1 w-full ai-shimmer-rainbow shrink-0" />

        {/* Spacious Floating Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <NeuralBotAvatar
            state={isTyping ? 'thinking' : 'idle'}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white truncate">
                {badge.title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-950/80 text-sky-300 border border-sky-800 font-bold shrink-0 shadow-xs">
                Neural Mind
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
              {badge.emoji} {badge.subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls - Uniform Sizing & Vertical Alignment */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCommandPaletteOpen(prev => !prev)}
            className={`h-8 px-3 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
              commandPaletteOpen
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80'
            }`}
            title="Toggle Neural Skills"
          >
            <Terminal size={13} className="text-sky-400" />
            <span>Skills</span>
            {commandPaletteOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          <button
            onClick={clearMessages}
            title="Reset Chat Session"
            className="h-8 w-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={handleClose}
            title="Close Assistant (Esc)"
            className="h-8 w-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Expandable Wrap-Safe Neural Command Matrix with Smooth Transition */}
      <div className={`overflow-hidden transition-all duration-300 ${
        commandPaletteOpen ? 'max-h-[500px] opacity-100 p-4 bg-slate-900/95 border-b border-slate-800/80 shrink-0' : 'max-h-0 opacity-0 p-0 border-none pointer-events-none'
      }`}>
        <NeuralCommandMatrix
          skills={SLASH_SKILLS}
          selectedIdx={selectedSkillIdx}
          onSelectSkill={executeSkill}
        />
      </div>

      {/* Message Stream or Initial Rich Hero Hub */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar min-w-0">
        {/* Initial Rich Hero Hub (shown when no user messages yet) */}
        {messages.length === 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 border border-slate-800 space-y-6 shadow-xl animate-in fade-in-50 duration-300">
            <div className="flex items-center gap-4">
              <NeuralBotAvatar state="idle" size="lg" />
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Socratic Systems Mind Active</span>
                  <span className="text-sm">🔮</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Staff-level dialectic reasoning & test assertion substrate grounded in <strong className="text-sky-300">{badge.title}</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-1">
                <span>⚡ Instant Dialectic Sparks:</span>
                <span className="text-slate-500">Tap to execute</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STARTER_QUICK_SPARKS.map((spark) => (
                  <button
                    key={spark.cmd}
                    onClick={() => executeSkill(spark.cmd)}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${spark.color} text-left transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer border flex flex-col justify-between gap-2 shadow-sm`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{spark.icon}</span>
                        <span className="font-mono text-xs text-sky-200">{spark.cmd}</span>
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-300 border border-white/10 shrink-0">
                        {spark.tag}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white leading-snug">
                      {spark.title}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {spark.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Conversation Stream */}
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div key={msg.id} className={`flex items-start gap-3.5 min-w-0 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in-50 duration-200`}>
              {!isUser && (
                <NeuralBotAvatar
                  state={msg.toolType === 'duel' ? 'duel' : 'idle'}
                  size="sm"
                  className="mt-1 shrink-0"
                />
              )}

              <div
                className={`max-w-[90%] p-4 sm:p-5 rounded-2xl text-xs sm:text-[13px] leading-relaxed min-w-0 break-words overflow-hidden shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                }`}
              >
                {msg.commandBadge && (
                  <div className="mb-3 pb-2 border-b border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-sky-300 font-bold">
                    <Terminal size={12} />
                    <span>Executed {msg.commandBadge}</span>
                  </div>
                )}

                {!isUser && (
                  <ThinkingTrace thinkingTrace={msg.thinkingTrace} webSources={msg.webSources} />
                )}

                <FormattedMarkdown text={msg.content} />

                {/* Tool: Interactive Gamified Duel Arena */}
                {msg.toolType === 'duel' && msg.toolData && (
                  <div className="mt-4 pt-3.5 border-t border-slate-800 space-y-3 min-w-0">
                    {msg.toolData.map((q: any, qIdx: number) => {
                      const selected = selectedDuelAnswers[`${msg.id}-${qIdx}`];
                      const isAnswered = selected !== undefined;

                      return (
                        <div key={qIdx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 min-w-0 break-words">
                          <p className="font-bold text-xs sm:text-sm text-white leading-snug">{qIdx + 1}. {q.prompt}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {q.options.map((opt: string, optIdx: number) => {
                              let optCls = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                              if (isAnswered) {
                                if (optIdx === q.correctAnswer) optCls = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold';
                                else if (optIdx === selected) optCls = 'bg-rose-950/80 text-rose-300 border-rose-500/50 line-through';
                                else optCls = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={isAnswered}
                                  onClick={() => setSelectedDuelAnswers(prev => ({ ...prev, [`${msg.id}-${qIdx}`]: optIdx }))}
                                  className={`px-3.5 py-2.5 rounded-xl text-left text-xs transition cursor-pointer border flex items-center justify-between gap-2 min-w-0 break-words ${optCls}`}
                                >
                                  <span className="flex-1 break-words">{opt}</span>
                                  {isAnswered && optIdx === q.correctAnswer && (
                                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {isAnswered && (
                            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono break-words">
                              <strong className="text-amber-300">Explanation: </strong>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Cognitive Thinking Stream when Reasoning */}
        {isTyping && (
          <div className="flex items-start gap-3.5 min-w-0">
            <NeuralBotAvatar state="thinking" size="sm" className="mt-1 shrink-0" />
            <CognitiveThinkingSequence
              contextName={badge.title}
              commandName={inputVal.startsWith('/') ? inputVal : undefined}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Slash Autocomplete Matrix */}
      {slashMenuOpen && (
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/95 animate-in slide-in-from-bottom-2 duration-150 shrink-0">
          <NeuralCommandMatrix
            skills={matchingSkills}
            selectedIdx={selectedSkillIdx}
            onSelectSkill={executeSkill}
            isFloating
          />
        </div>
      )}

      {/* Floating Pill Input Dock */}
      <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800/80 shrink-0 space-y-2.5">
        <div className="relative flex items-end gap-2 bg-slate-900/90 rounded-2xl border border-slate-800 focus-within:border-sky-500/60 focus-within:ring-1 focus-within:ring-sky-500/40 p-2.5 transition shadow-inner">
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Socratic Oracle or type '/' for skills..."
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-24 min-h-[38px] custom-scrollbar leading-relaxed"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!inputVal.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-30 text-white transition cursor-pointer shrink-0 shadow-md"
            title="Send Message (Enter)"
          >
            <Send size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
          <span>Type <code className="text-sky-400 font-bold">/</code> for skills</span>
          <span>↵ Send · ⇧↵ New line · ⌘J Toggle</span>
        </div>
      </div>
    </div>
    </>
  );
}
