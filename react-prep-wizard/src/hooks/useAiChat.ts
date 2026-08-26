import { useState, useCallback, useEffect } from 'react';
import type { MasteryUnit } from '../data/tracks/types';
import { generateLocalHeuristicResponse } from '../lib/socratic/chatHeuristics';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface UseAiChatParams {
  unit: MasteryUnit;
  userCode: string;
  chatWithMentor: (params: {
    unitTitle: string;
    category: string;
    trackName: string;
    taskDescription: string;
    specs: string[];
    userCode: string;
    practiceType?: string;
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  }) => Promise<string | null>;
  isAiReady?: boolean;
}

export function useAiChat({ unit, userCode, chatWithMentor, isAiReady }: UseAiChatParams) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init',
      role: 'assistant',
      content: `👋 I'm your **Impartial AI Mentor & Adjudicator** for **${unit.title}** (${unit.trackName}).\n\nI have full context of your task requirements and your editor's code. You can ask for advice, request diagnosis, or **challenge/debate any test failure**!`,
      timestamp: Date.now(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: `init-${unit.id}`,
        role: 'assistant',
        content: `👋 I'm your **Impartial AI Mentor & Adjudicator** for **${unit.title}** (${unit.trackName}).\n\nReady to impartially diagnose your code, debate your implementation against specs, or explain concepts. What would you like to explore?`,
        timestamp: Date.now(),
      },
    ]);
  }, [unit.id, unit.title, unit.trackName]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      let reply: string | null = null;

      if (isAiReady) {
        reply = await chatWithMentor({
          unitTitle: unit.title,
          category: unit.category,
          trackName: unit.trackName,
          taskDescription: unit.practice.task,
          specs: unit.practice.specs,
          userCode,
          practiceType: unit.practice.type,
          messages: newHistory.filter((m) => m.role !== 'system').map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });
      }

      if (!reply) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        reply = generateLocalHeuristicResponse(text, unit, userCode);
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Failed to send AI chat message:', err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: generateLocalHeuristicResponse(text, unit, userCode),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, isAiReady, chatWithMentor, unit, userCode]);

  const sendQuickPrompt = useCallback((type: 'dispute' | 'diagnose' | 'concept' | 'edge_cases' | 'interview_pitch' | 'hint') => {
    const prompts = {
      dispute: '⚖️ Impartial Review: Please evaluate whether I actually erred or if the test/grader made an incorrect assumption.',
      diagnose: '🔍 Please impartially diagnose my current code against problem specifications. Highlight bugs or logic flaws.',
      concept: '💡 Explain the core concept behind this problem in depth with mental models.',
      edge_cases: '🧪 What critical edge cases and interview traps should I account for?',
      interview_pitch: '🎯 How should I verbally pitch and explain my technical architecture in an interview?',
      hint: '🧗 Can you give me a progressive clue or guiding question to help me with the next step?'
    };
    sendMessage(prompts[type]);
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: `init-${unit.id}-${Date.now()}`,
        role: 'assistant',
        content: `Chat history cleared. I'm ready to help with **${unit.title}**!`,
        timestamp: Date.now(),
      },
    ]);
  }, [unit.id, unit.title]);

  return { messages, isTyping, sendMessage, sendQuickPrompt, clearMessages };
}
