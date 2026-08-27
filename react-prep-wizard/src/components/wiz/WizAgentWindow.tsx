import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, RotateCcw, X, Zap, Database, Globe, Sparkles, ChevronDown } from 'lucide-react';
import type { WizContext } from '../../lib/ai/wiz-agi-system';
import { getWizBackend } from '../../lib/ai/wiz-backend-service';
import { WizMessage } from './WizMessage';
import { WizThinkingTrace } from './WizThinkingTrace';
import { WizToolInvocation } from './WizToolInvocation';

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
      content: `# 🧠 WIZ: Adaptive General Intelligence

I'm **WIZ** — your AGI-class reasoning engine with:
- ✅ **Full data access** (PostgreSQL, IndexedDB, Redis)
- ✅ **Real-time web MCP** + dynamic server registration
- ✅ **76+ BMad skills** (specialized reasoning agents)
- ✅ **Chain-of-Thought reasoning** with self-verification
- ✅ **Multi-perspective analysis** and uncertainty quantification

**Capabilities:**
- Deep hierarchical reasoning (up to 3 depths)
- Tool orchestration (data → web → skills)
- Real-time learning from verification
- Context-aware knowledge synthesis

What would you like to explore? (Ask anything — I have no constraints.)`,
      timestamp: Date.now()
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load system health on mount
  useEffect(() => {
    if (!isOpen) return;

    const backend = getWizBackend();
    backend.getSystemHealth().then(setSystemHealth).catch(console.error);
  }, [isOpen]);

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

      // Create WIZ context
      const wizContext: WizContext = {
        userId,
        sessionId: `session-${Date.now()}`,
        requestId: `req-${Date.now()}`,
        timestamp: Date.now(),
        dataAccessLevel: 'full',
        availableMcps: backend.listMcpServers().map(s => s.id),
        availableSkills: [], // Would load from backend
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
    <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-gradient-to-b from-slate-950 to-slate-900 border-l border-indigo-500/30 shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-indigo-500/50 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center animate-pulse">
            <Brain size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">WIZ AGI</div>
            <div className="text-xs text-indigo-300">Adaptive General Intelligence</div>
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
        <div className="flex gap-2 mb-2">
          <div className="text-xs text-slate-400 flex gap-3">
            <span className="flex items-center gap-1">
              <Database size={12} /> Full Data Access
            </span>
            <span className="flex items-center gap-1">
              <Globe size={12} /> Web MCP
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} /> 76 Skills
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything — full data + web + skills available..."
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
  );
}
