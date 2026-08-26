/**
 * Task-Aware Dynamic Context Synthesizer & Multi-Factor Compactor
 * Complies with ARCHITECTURE.md v2.3 & PRD Section 3.1:
 * - Replaces rigid 20/30/35/15 splits with Task-Aware Soft-Target Budgeting
 * - Replaces naive turn slicing (N > 6) with Multi-Factor Semantic Compaction
 *   (Preserves architectural decisions, unresolved bugs, and user constraints)
 */

export type TaskDomain = 'code_debugging' | 'system_design' | 'socratic_dialogue' | 'concept_theory';

export interface TaskAwareContextPolicy {
  domain: TaskDomain;
  budgetCap: number; // 8,192 to 16,384 tokens
  priorityStack: Array<'ast_evidence' | 'normative_spec' | 'episodic_trace' | 'rag_chunks' | 'dialogue_history'>;
  softTargets: {
    evidenceSoftLimit: number;
    invariantsSoftLimit: number;
    historySoftLimit: number;
  };
}

export const DOMAIN_POLICIES: Record<TaskDomain, TaskAwareContextPolicy> = {
  code_debugging: {
    domain: 'code_debugging',
    budgetCap: 8192,
    priorityStack: ['ast_evidence', 'normative_spec', 'episodic_trace', 'rag_chunks', 'dialogue_history'],
    softTargets: { evidenceSoftLimit: 4000, invariantsSoftLimit: 1500, historySoftLimit: 1500 }
  },
  system_design: {
    domain: 'system_design',
    budgetCap: 12288,
    priorityStack: ['normative_spec', 'episodic_trace', 'rag_chunks', 'ast_evidence', 'dialogue_history'],
    softTargets: { evidenceSoftLimit: 2000, invariantsSoftLimit: 4000, historySoftLimit: 3000 }
  },
  socratic_dialogue: {
    domain: 'socratic_dialogue',
    budgetCap: 8192,
    priorityStack: ['episodic_trace', 'normative_spec', 'dialogue_history', 'rag_chunks', 'ast_evidence'],
    softTargets: { evidenceSoftLimit: 1000, invariantsSoftLimit: 2500, historySoftLimit: 3500 }
  },
  concept_theory: {
    domain: 'concept_theory',
    budgetCap: 8192,
    priorityStack: ['normative_spec', 'rag_chunks', 'dialogue_history', 'episodic_trace', 'ast_evidence'],
    softTargets: { evidenceSoftLimit: 1000, invariantsSoftLimit: 4000, historySoftLimit: 2500 }
  }
};

export interface ChatMessageContext {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  commandBadge?: string;
  isArchDecision?: boolean;
  isUnresolvedDefect?: boolean;
  isRedundantToolIO?: boolean;
}

export class TaskAwareContextSynthesizer {
  /**
   * Estimates tokens from character count (~4 chars per token)
   */
  public static estimateTokens(text: string): number {
    return Math.ceil((text || '').length / 4);
  }

  /**
   * Scores message turns by information density & persistence value
   */
  public static scoreMessagePreservation(msg: ChatMessageContext, activeDomain: TaskDomain): number {
    let score = 1.0;
    const text = (msg.content || '').toLowerCase();

    // High Value Indicators
    if (msg.isArchDecision || text.includes('decided') || text.includes('architecture') || text.includes('trade-off')) score += 3.0;
    if (msg.isUnresolvedDefect || text.includes('error') || text.includes('race') || text.includes('failing')) score += 2.5;
    if (text.includes('function') || text.includes('class') || text.includes('return') || text.includes('const')) score += 1.5;

    // Low Value / Redundant Indicators
    if (msg.isRedundantToolIO || text.includes('ok') || text.includes('thanks') || text.includes('got it')) score -= 2.0;

    return Math.max(0.1, score);
  }

  /**
   * Compresses conversational history using multi-factor density scoring instead of turn-count truncation
   */
  public static compactHistory(
    messages: ChatMessageContext[],
    activeDomain: TaskDomain,
    maxHistoryTokens: number
  ): { preservedMessages: ChatMessageContext[]; summaryBlock?: string } {
    if (messages.length === 0) return { preservedMessages: [] };

    // Score all turns
    const scored = messages.map((m, idx) => ({
      msg: m,
      score: this.scoreMessagePreservation(m, activeDomain),
      recencyBonus: (idx + 1) / messages.length * 2.0,
      tokens: this.estimateTokens(m.content)
    }));

    let currentTokens = 0;
    const kept: ChatMessageContext[] = [];
    const archivedPoints: string[] = [];

    // Traverse from newest to oldest
    for (let i = scored.length - 1; i >= 0; i--) {
      const item = scored[i];
      const totalScore = item.score + item.recencyBonus;

      if (currentTokens + item.tokens <= maxHistoryTokens && totalScore >= 1.5) {
        kept.unshift(item.msg);
        currentTokens += item.tokens;
      } else {
        if (item.score >= 2.0) {
          archivedPoints.unshift(`• [${item.msg.role.toUpperCase()}]: ${item.msg.content.slice(0, 80)}...`);
        }
      }
    }

    const summaryBlock = archivedPoints.length > 0
      ? `[COMPACTED CONTEXT SUMMARY (${archivedPoints.length} key points preserved)]:\n${archivedPoints.join('\n')}`
      : undefined;

    return { preservedMessages: kept, summaryBlock };
  }

  /**
   * Synthesizes task-conditioned context envelope
   */
  public static synthesize({
    domain = 'socratic_dialogue',
    systemSpine,
    invariantRules = [],
    topicContext,
    userCode,
    compilerTelemetry,
    chatMessages = [],
  }: {
    domain?: TaskDomain;
    systemSpine: string;
    invariantRules?: string[];
    topicContext?: {
      title?: string;
      area?: string;
      summary?: string;
    };
    userCode?: string;
    compilerTelemetry?: string | null;
    chatMessages?: ChatMessageContext[];
  }) {
    const policy = DOMAIN_POLICIES[domain];
    const { preservedMessages, summaryBlock } = this.compactHistory(chatMessages, domain, policy.softTargets.historySoftLimit);

    const dynamicBlocks: string[] = [];

    // 1. Topic Context
    if (topicContext && (topicContext.title || topicContext.summary)) {
      dynamicBlocks.push(`[ACTIVE TOPIC & ARCHITECTURAL CONTEXT]:\n▪ Title: ${topicContext.title || 'N/A'}\n▪ Area: ${topicContext.area || 'Web Platform'}\n▪ Summary: ${topicContext.summary || 'N/A'}`);
    }

    // 2. Pinned Invariants
    if (invariantRules.length > 0) {
      dynamicBlocks.push(`[PINNED INVARIANT GROUND TRUTH (Must Obey)]:\n${invariantRules.map(r => `▪ ${r}`).join('\n')}`);
    }

    // 3. Compacted History Summary
    if (summaryBlock) {
      dynamicBlocks.push(summaryBlock);
    }

    // 3. Active Code & Compiler Telemetry
    if (compilerTelemetry) {
      dynamicBlocks.push(`[ACTIVE COMPILER & AST TELEMETRY]:\n${compilerTelemetry.slice(0, policy.softTargets.evidenceSoftLimit * 4)}`);
    }

    if (userCode) {
      dynamicBlocks.push(`[WORKSPACE CODE STATE]:\n\`\`\`javascript\n${userCode.slice(0, policy.softTargets.evidenceSoftLimit * 4)}\n\`\`\``);
    }

    // The caller reports this to the user, so it has to be measured rather than
    // guessed: everything actually being sent, over the cap for this domain.
    const dynamicContextBlock = dynamicBlocks.join('\n\n');
    const usedTokens =
      this.estimateTokens(systemSpine) +
      this.estimateTokens(dynamicContextBlock) +
      preservedMessages.reduce((n, m) => n + this.estimateTokens(m.content), 0);

    return {
      systemPrompt: systemSpine,
      dynamicContextBlock,
      recentMessages: preservedMessages,
      domain,
      budgetCap: policy.budgetCap,
      usedTokens,
      /** Fraction of the domain budget consumed, clamped for display. */
      budgetUtilization: Math.min(1, usedTokens / policy.budgetCap)
    };
  }
}

export const globalContextSynthesizer = TaskAwareContextSynthesizer;
export { TaskAwareContextSynthesizer as ContextSynthesizer };
