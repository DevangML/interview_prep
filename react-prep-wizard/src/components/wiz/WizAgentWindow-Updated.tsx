import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, RotateCcw, X, Zap, Database, Globe, Sparkles, ChevronDown, Settings } from 'lucide-react';
import type { WizContext } from '../../lib/ai/wiz-agi-system';
import { getWizBackend } from '../../lib/ai/wiz-backend-service';
import { UserSkillSelector, allSkills } from '../../lib/ai/skill-registry';
import { WizMessage } from './WizMessage';
import { WizThinkingTrace } from './WizThinkingTrace';
import { WizToolInvocation } from './WizToolInvocation';
import { SkillSelector } from './SkillSelector';

interface WizAgentWindowProps {
  userId: string;
  onClose: () => void;
  isOpen: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'thinking';
  content: string;
  timestamp: number;
  toolInvocations?: Array<{
    id: string;
    type: 'data_query' | 'mcp_call' | 'skill_invoke';
    tool: string;
    status: 'pending' | 'complete' | 'error';
    result?: any;
  }>;
  thinkingTrace?: {
    intent: string;
    domain: string;
    reasoning: string;
    confidence: number;
  };
}

export default function WizAgentWindow({ userId, onClose, isOpen }: WizAgentWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `# 🧠 WIZ: Evidence-Grounded Agent Orchestration

I'm **WIZ** — your general-purpose reasoning engine with:
- ✅ **Full data access** (PostgreSQL read-only, IndexedDB, Redis)
- ✅ **Real-time web access** (MCP + dynamic server registration)
- ✅ **76+ BMad skills** (you choose which ones to use)
- ✅ **Environment-loop reasoning** (observe → act → verify → learn)
- ✅ **External evidence verification** (tests, specs, data, not just LLM self-critique)

**How it works:**
1. **Select Skills** (sidebar) — Choose which specialized reasoning modes to activate. Nothing loads by default.
2. **Ask Anything** — I'll use your selected skills + data access to reason through your question.
3. **See Decisions** — Activity trace shows what I did, what evidence supports it, where it's weak.

**No hidden thinking. No auto-injected skills. Just you + me + tools you choose.**

Select some skills in the sidebar to get started, or ask away and I'll tell you what skills would help.`,
      timestamp: Date.now()
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSkillSelector, setShowSkillSelector] = useState(false);

  // Skill management
  const [skillSelector] = useState(() => new UserSkillSelector(userId, `session-${Date.now()}`));
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [excludedSkillIds, setExcludedSkillIds] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load system health on mount
  useEffect(() => {
    if (!isOpen) return;

    const backend = getWizBackend();
    backend.getSystemHealth().then(setSystemHealth).catch(console.error);
  }, [isOpen]);

  const handleSelectSkill = (skillId: string) => {
    if (!selectedSkillIds.includes(skillId)) {
      const newSelection = [...selectedSkillIds, skillId];
      setSelectedSkillIds(newSelection);
      skillSelector.selectSkills([skillId]);
    }
  };

  const handleDeselectSkill = (skillId: string) => {
    const newSelection = selectedSkillIds.filter(id => id !== skillId);
    setSelectedSkillIds(newSelection);
    skillSelector.deselectSkills([skillId]);
  };

  const handleExcludeSkill = (skillId: string) => {
    if (!excludedSkillIds.includes(skillId)) {
      const newExcluded = [...excludedSkillIds, skillId];
      setExcludedSkillIds(newExcluded);
      skillSelector.excludeSkills([skillId]);

      // Also deselect if currently selected
      if (selectedSkillIds.includes(skillId)) {
        handleDeselectSkill(skillId);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const backend = getWizBackend();

      // Create WIZ context with ONLY selected skills (not all 76)
      const wizContext: WizContext = {
        userId,
        sessionId: `session-${Date.now()}`,
        requestId: `req-${Date.now()}`,
        timestamp: Date.now(),
        dataAccessLevel: 'full',
        availableMcps: backend.listMcpServers().map(s => s.id),
        availableSkills: selectedSkillIds, // ONLY what user selected
        conversationHistory: messages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        })),
        systemMetadata: {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          locale: navigator?.language || 'en-US'
        }
      };

      // Call backend API to process with WIZ
      const response = await fetch('/api/wiz/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: inputValue,
          context: wizContext
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get WIZ response');
      }

      const result = await response.json();

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: result.response,
        timestamp: Date.now(),
        toolInvocations: result.toolInvocations || [],
        thinkingTrace: result.thinking
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `**Error**: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    if (confirm('Clear conversation history?')) {
      setMessages(messages.slice(0, 1)); // Keep welcome message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-l border-indigo-500/30 shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-indigo-500/50 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center animate-pulse">
            <Brain size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">WIZ AGI</div>
            <div className="text-xs text-indigo-300">
              {selectedSkillIds.length} skill{selectedSkillIds.length !== 1 ? 's' : ''} active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {systemHealth && (
            <div className="text-xs">
              {systemHealth.status === 'healthy' ? (
                <span className="text-emerald-400">● Healthy</span>
              ) : systemHealth.status === 'degraded' ? (
                <span className="text-yellow-400">● Degraded</span>
              ) : (
                <span className="text-red-400">● Error</span>
              )}
            </div>
          )}

          <button
            onClick={() => setShowSkillSelector(!showSkillSelector)}
            title="Manage skills"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            <Zap size={16} />
          </button>

          <button
            onClick={handleClear}
            title="Clear history"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={onClose}
            title="Close WIZ"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-red-900/30 transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Messages Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id}>
                <WizMessage
                  message={msg}
                  isExpanded={expandedMessage === msg.id}
                  onToggleExpand={() =>
                    setExpandedMessage(expandedMessage === msg.id ? null : msg.id)
                  }
                />

                {msg.thinkingTrace && expandedMessage === msg.id && (
                  <WizThinkingTrace thinking={msg.thinkingTrace} />
                )}

                {msg.toolInvocations && msg.toolInvocations.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    {msg.toolInvocations.map((tool) => (
                      <WizToolInvocation key={tool.id} tool={tool} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-indigo-400 animate-spin" />
                </div>
                <div className="flex-1 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <div className="text-sm text-slate-300">WIZ is thinking...</div>
                  <div className="text-xs text-slate-500 mt-1 flex gap-2">
                    <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                    <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700/50 bg-slate-900/50 p-4 shrink-0">
            <div className="text-xs text-slate-400 flex gap-3 mb-2">
              <span className="flex items-center gap-1">
                <Database size={12} /> Full Data Access
              </span>
              <span className="flex items-center gap-1">
                <Globe size={12} /> Web MCP
              </span>
              <span className="flex items-center gap-1">
                <Zap size={12} /> {selectedSkillIds.length} Skills
              </span>
            </div>

            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedSkillIds.length > 0
                    ? `Ask anything. Using: ${allSkills
                        .filter(s => selectedSkillIds.includes(s.id))
                        .map(s => s.name)
                        .slice(0, 2)
                        .join(', ')}${selectedSkillIds.length > 2 ? '...' : ''}`
                    : 'Select some skills first (Zap icon), then ask...'
                }
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none"
                rows={3}
                disabled={isLoading}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-lg text-white transition flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Skill Selector Sidebar (Toggleable) */}
        {showSkillSelector && (
          <div className="w-96 bg-slate-950 border-l border-slate-700/50 overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 bg-slate-950 border-b border-slate-700/50 p-3 flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm">Skills Library</h3>
              <button
                onClick={() => setShowSkillSelector(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3">
              <SkillSelector
                selectedSkillIds={selectedSkillIds}
                onSelectSkill={handleSelectSkill}
                onDeselectSkill={handleDeselectSkill}
                excludedSkillIds={excludedSkillIds}
                onExcludeSkill={handleExcludeSkill}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
