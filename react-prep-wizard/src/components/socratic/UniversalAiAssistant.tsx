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
  Layers,
  Zap,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useAgentChat, SLASH_SKILLS, type AgentContextType, type SlashSkill } from '../../hooks/useAgentChat';
import { FormattedMarkdown } from './FormattedMarkdown';
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
  chatWithMentor?: (params: any) => Promise<string | null>;
  isAiReady?: boolean;
}

export default function UniversalAiAssistant({
  isOpen,
  onClose,
  contextType,
  initialCommand,
  roadmapContext,
  projectContext,
  sandboxContext,
  masteryContext,
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
    chatWithMentor,
    isAiReady
  });

  const [inputVal, setInputVal] = useState('');
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [selectedSkillIdx, setSelectedSkillIdx] = useState(0);
  const [selectedDuelAnswers, setSelectedDuelAnswers] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const executedInitialRef = useRef<string | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Execute initial command immediately when triggered from UI button
  useEffect(() => {
    if (isOpen && initialCommand && executedInitialRef.current !== initialCommand) {
      executedInitialRef.current = initialCommand;
      sendMessage(initialCommand);
    }
  }, [isOpen, initialCommand, sendMessage]);

  // Slash commands filtering
  const matchingSkills = SLASH_SKILLS.filter(s => {
    if (!inputVal.startsWith('/')) return false;
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

  const executeSkill = (skill: SlashSkill) => {
    setSlashMenuOpen(false);
    setInputVal('');
    sendMessage(skill.command);
  };

  const handleSend = () => {
    if (!inputVal.trim() || isTyping) return;
    sendMessage(inputVal);
    setInputVal('');
    setSlashMenuOpen(false);
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

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const getContextBadge = () => {
    if (contextType === 'roadmap') {
      return {
        icon: BookOpen,
        title: roadmapContext?.topicTitle || 'Roadmap Track',
        subtitle: roadmapContext?.trackName || 'Core Curriculum',
        color: 'from-sky-500 to-indigo-500'
      };
    }
    if (contextType === 'project') {
      return {
        icon: Compass,
        title: projectContext?.projectTitle || 'Tier-1 Architecture Blueprint',
        subtitle: projectContext?.blueprint?.realWorldAnalog || 'Staff System Design',
        color: 'from-amber-500 to-orange-500'
      };
    }
    if (contextType === 'sandbox') {
      return {
        icon: Code2,
        title: 'Sandbox Lab & Compiler',
        subtitle: sandboxContext?.error ? 'Transpiler Error Active' : 'React 19 Execution',
        color: 'from-emerald-500 to-teal-500'
      };
    }
    return {
      icon: Sparkles,
      title: 'Interview Mastery Oracle',
      subtitle: 'Universal Socratic Substrate',
      color: 'from-purple-500 to-indigo-500'
    };
  };

  const badge = getContextBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:w-[560px] z-50 bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 transition-all animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${badge.color} flex items-center justify-center shrink-0 shadow-md`}>
            <BadgeIcon size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-tight text-white truncate">{badge.title}</span>
              <span className={`w-2 h-2 rounded-full ${isAiReady ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'} shrink-0`} />
            </div>
            <p className="text-[10px] text-slate-400 font-mono truncate">{badge.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={clearMessages}
            title="Reset Chat Session"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={onClose}
            title="Close Assistant"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Quick Slash Skills Bar */}
      <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pr-1">
          <Terminal size={11} className="text-sky-400" />
          <span>Skills:</span>
        </div>
        {SLASH_SKILLS.map((s) => (
          <button
            key={s.command}
            onClick={() => sendMessage(s.command)}
            disabled={isTyping}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 font-mono text-[11px] flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            <span>{s.icon}</span>
            <span className="font-bold">{s.command}</span>
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div key={msg.id} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[92%] p-3.5 rounded-2xl text-xs ${
                  isUser
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-sm'
                }`}
              >
                {msg.commandBadge && (
                  <div className="mb-2 pb-1.5 border-b border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-sky-300 font-bold">
                    <Terminal size={11} />
                    <span>Executed {msg.commandBadge}</span>
                  </div>
                )}

                <FormattedMarkdown text={msg.content} />

                {/* Tool: Interactive Gamified Duel Card */}
                {msg.toolType === 'duel' && msg.toolData && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-3">
                    {msg.toolData.map((q: any, qIdx: number) => {
                      const selected = selectedDuelAnswers[`${msg.id}-${qIdx}`];
                      const isAnswered = selected !== undefined;
                      const isCorrect = selected === q.correctAnswer;

                      return (
                        <div key={qIdx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                          <p className="font-bold text-xs text-white">{qIdx + 1}. {q.prompt}</p>
                          <div className="grid grid-cols-1 gap-1.5">
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
                                  className={`px-3 py-1.5 rounded-lg text-left text-xs border transition flex items-center justify-between cursor-pointer ${optCls}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && optIdx === q.correctAnswer && <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                          {isAnswered && (
                            <p className="text-[11px] text-slate-400 mt-1 italic">
                              {isCorrect ? '✅ Spot on!' : '❌ Invariant review: '}{q.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tool: Curated Literature RFCs */}
                {msg.toolType === 'literature' && Array.isArray(msg.toolData) && (
                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 gap-2">
                    {msg.toolData.map((ref: any, idx: number) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 group transition block text-xs"
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-bold text-sky-400 group-hover:underline flex items-center gap-1">
                            {ref.title}
                            <ExternalLink size={11} className="text-slate-500 group-hover:text-sky-400" />
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[9px] uppercase">{ref.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{ref.takeaway}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-sky-400 bg-slate-900/60 p-3 rounded-2xl border border-sky-500/20 max-w-sm">
            <div className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span>AI Systems Oracle synthesizing verified analysis...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area with Slash Autocomplete */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 relative">
        {/* Slash Autocomplete Popup */}
        {slashMenuOpen && matchingSkills.length > 0 && (
          <div className="absolute bottom-full left-3.5 right-3.5 mb-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 max-h-64 overflow-y-auto custom-scrollbar z-50">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800 mb-1">
              Select Skill or System Prompt (Tab/Enter)
            </div>
            {matchingSkills.map((s, idx) => (
              <button
                key={s.command}
                onClick={() => executeSkill(s)}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                  idx === selectedSkillIdx ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm">{s.icon}</span>
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-xs block">{s.command}</span>
                    <span className={`text-[11px] truncate block ${idx === selectedSkillIdx ? 'text-sky-100' : 'text-slate-400'}`}>
                      {s.description}
                    </span>
                  </div>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase shrink-0 ${
                  idx === selectedSkillIdx ? 'bg-sky-700 text-white' : 'bg-slate-950 text-slate-500'
                }`}>
                  {s.category}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-900 rounded-2xl p-1.5 border border-slate-800 focus-within:border-sky-500/60 transition shadow-inner">
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type / to invoke skills (/breakdown, /duel, /rfcs, /audit, /mock-defense, /innovate, /ux)..."
            rows={1}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputVal.trim() || isTyping}
            className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white transition cursor-pointer shrink-0 shadow-md"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
