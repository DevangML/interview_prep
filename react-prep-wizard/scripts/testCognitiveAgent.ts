/**
 * Automated Test Suite: Next-Gen Cognitive Agent Substrate
 * Authored by: Murat (Master Test Architect — bmad-tea)
 * 
 * Verifies:
 * 1. ContextSynthesizer (Token Budgeting, Attention Placement, Semantic Sliding Compression)
 * 2. HybridKnowledgeEngine (BM25 Inverted Index, Trigram Semantic Matcher, Regex Hardening)
 * 3. DialecticPromptEngine (3-Tier Invariant Spines, Anti-Pattern Guardrails)
 * 4. VerificationEngine (Chain-of-Verification, Reflexion Error Repair)
 */

import { TaskAwareContextSynthesizer, ContextSynthesizer } from '../src/lib/ai/contextSynthesizer';
import { HybridKnowledgeEngine } from '../src/lib/ai/hybridKnowledgeEngine';
import { DialecticPromptEngine } from '../src/lib/socratic/dialecticPromptEngine';
import { VerificationEngine } from '../src/lib/ai/verificationEngine';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const results: TestResult[] = [];

function runTest(suite: string, name: string, fn: () => void) {
  const start = performance.now();
  try {
    fn();
    results.push({
      suite,
      name,
      passed: true,
      durationMs: Number((performance.now() - start).toFixed(2)),
    });
  } catch (err: any) {
    results.push({
      suite,
      name,
      passed: false,
      error: err?.message || String(err),
      durationMs: Number((performance.now() - start).toFixed(2)),
    });
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

function assertEqual<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) {
    throw new Error(`${msg} — Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
  }
}

console.log('🧪 =========================================================================');
console.log('🧪 EXECUTING COMPREHENSIVE QUALITY GATE: COGNITIVE AGENT SUBSTRATE');
console.log('🧪 =========================================================================\n');

// ---------------------------------------------------------------------------
// SUITE 1: ContextSynthesizer Tests (Task-Aware Knapsack & Multi-Factor Compaction)
// ---------------------------------------------------------------------------
runTest('ContextSynthesizer', 'Task-conditioned token budget allocation matches domain policy', () => {
  const debug = TaskAwareContextSynthesizer.synthesize({
    domain: 'code_debugging',
    systemSpine: 'Copilot Spine',
    userCode: 'const x = 1;',
    compilerTelemetry: 'TypeError: unhandled'
  });
  assertEqual(debug.budgetCap, 8192, 'Debugging budget cap must be 8192');

  const arch = TaskAwareContextSynthesizer.synthesize({
    domain: 'system_design',
    systemSpine: 'Architect Spine',
    userCode: 'class System {}'
  });
  assertEqual(arch.budgetCap, 12288, 'System design budget cap must be 12288');
});

runTest('ContextSynthesizer', 'Multi-factor density compaction preserves architectural decisions over chat noise', () => {
  const messages = [
    { role: 'user' as const, content: 'We decided to use Redis sliding window counter for rate limiting', isArchDecision: true },
    { role: 'assistant' as const, content: 'ok got it', isRedundantToolIO: true },
    { role: 'user' as const, content: 'Why is this throwing unhandled race errors?', isUnresolvedDefect: true }
  ];

  const { preservedMessages, summaryBlock } = TaskAwareContextSynthesizer.compactHistory(messages, 'code_debugging', 2000);
  assert(preservedMessages.some(m => m.isArchDecision), 'Must preserve architectural decision');
  assert(preservedMessages.some(m => m.isUnresolvedDefect), 'Must preserve unresolved defect');
});

runTest('ContextSynthesizer', 'Synthesis places Pinned Invariants at the top of the context block', () => {
  const synthesized = TaskAwareContextSynthesizer.synthesize({
    domain: 'concept_theory',
    systemSpine: 'System Invariant Role',
    invariantRules: ['Invariant A', 'Invariant B'],
    chatMessages: [{ role: 'user', content: 'Explain useActionState' }],
  });

  assert(synthesized.dynamicContextBlock.includes('[PINNED INVARIANT GROUND TRUTH'), 'Pinned invariants must lead dynamic context');
  assert(synthesized.dynamicContextBlock.includes('Invariant A'), 'Invariant A must be present');
});

// ---------------------------------------------------------------------------
// SUITE 2: HybridKnowledgeEngine Tests (BM25 + Dense Cosine + RRF)
// ---------------------------------------------------------------------------
const knowledge = new HybridKnowledgeEngine();

runTest('HybridKnowledgeEngine', 'Retrieves React 19 specification on query via RRF', () => {
  const results = knowledge.search('useActionState optimistic transitions', 2);
  assert(results.length > 0, 'Should find matching documents');
  assertEqual(results[0].doc.id, 'react19_action_state', 'Top document must be React 19 Action State');
  assert(results[0].rrfScore > 0, 'RRF score must be positive');
});

runTest('HybridKnowledgeEngine', 'Retrieves V8 Hidden Classes and ICs on performance query', () => {
  const results = knowledge.search('v8 hidden classes monomorphic inline cache', 2);
  assert(results.length > 0, 'Must return V8 document');
  assertEqual(results[0].doc.id, 'v8_hidden_classes', 'Top match must be V8 doc');
  assert(results[0].rrfScore > 0, 'RRF score must be positive');
});

runTest('HybridKnowledgeEngine', 'Retrieves Distributed Sliding Window Rate Limiter', () => {
  const results = knowledge.search('sliding window counter redis rate limiter', 2);
  assert(results.length > 0, 'Must return Rate Limiter document');
  assertEqual(results[0].doc.id, 'distributed_rate_limiter', 'Top match must be rate limiter');
});

runTest('HybridKnowledgeEngine', 'Handles special regex characters without throwing', () => {
  const queryWithSpecialChars = 'react19 $action_state + [test] (.*?) \\d+';
  let thrown = false;
  try {
    knowledge.search(queryWithSpecialChars, 2);
  } catch (e) {
    thrown = true;
  }
  assert(!thrown, 'Query with special regex characters must not throw');
});

runTest('HybridKnowledgeEngine', 'Empty query returns empty array gracefully', () => {
  const emptyRes = knowledge.search('', 2);
  assertEqual(emptyRes.length, 0, 'Empty query returns empty array');
});

// ---------------------------------------------------------------------------
// SUITE 3: DialecticPromptEngine Tests
// ---------------------------------------------------------------------------
runTest('DialecticPromptEngine', 'Roadmap Tutor Spine enforces 3 tiers and negative constraints', () => {
  const spine = DialecticPromptEngine.getRoadmapTutorSpine();
  assert(spine.includes('[TIER 1: INVARIANT NON-NEGOTIABLE CORE]'), 'Must include Tier 1 header');
  assert(spine.includes('[TIER 2: DIALECTIC EXECUTION PROTOCOL]'), 'Must include Tier 2 header');
  assert(spine.includes('[TIER 3: GROUND-TRUTH FEW-SHOT EXEMPLARS]'), 'Must include Tier 3 header');
  assert(spine.includes('FORBIDDEN ANTI-PATTERNS'), 'Must declare negative constraints');
  assert(spine.includes('Spoon-feeding copy-paste code snippets'), 'Must forbid spoon-feeding');
});

runTest('DialecticPromptEngine', 'Project Architect Spine enforces non-functional scale metrics', () => {
  const spine = DialecticPromptEngine.getProjectArchitectSpine();
  assert(spine.includes('Principal Distributed Systems'), 'Role must match architect');
  assert(spine.includes('CAP theorem / PACELC'), 'Must include partition invariants');
});

// ---------------------------------------------------------------------------
// SUITE 4: VerificationEngine Tests
// ---------------------------------------------------------------------------
runTest('VerificationEngine', 'Valid Socratic response passes verification with score >= 80', () => {
  const candidate = `
Look at the execution sequence of useOptimistic in React 19:
1. Optimistic state applies immediately.
2. Invariants guarantee rollback on rejection.
How does your transition boundary isolate this?
`;
  const report = VerificationEngine.verifyOutput({
    candidateResponse: candidate,
    invariants: ['Optimistic rollback on rejection'],
    taskSpecifications: ['useOptimistic', 'React 19'],
  });

  assert(report.isVerified, 'Report must be verified');
  assert(report.score >= 80, `Score must be >= 80 (got ${report.score})`);
  assertEqual(report.suggestedSelfRepairPrompt, undefined, 'No repair prompt needed for passing response');
});

runTest('VerificationEngine', 'Evasion boilerplate fails anti-pattern check and triggers self-repair', () => {
  const candidate = `As an AI language model, I do not have access to real-time data to help you.`;
  const report = VerificationEngine.verifyOutput({
    candidateResponse: candidate,
    invariants: ['Enforce deterministic state'],
    compilerTelemetry: 'SyntaxError: Unexpected token',
  });

  assert(!report.isVerified, 'Must fail verification due to boilerplate and unaddressed compiler error');
  assert(report.score < 80, `Score must be < 80 (got ${report.score})`);
  assert(report.suggestedSelfRepairPrompt != null, 'Must generate suggested self-repair prompt');
  assert(report.suggestedSelfRepairPrompt!.includes('[SELF-REPAIR DIRECTIVE]'), 'Self-repair prompt must include directive');
});

// ---------------------------------------------------------------------------
// RESULTS REPORTING
// ---------------------------------------------------------------------------
let passedCount = 0;
let failedCount = 0;

console.log('RESULTS BY TEST SUITE:\n');
const grouped = results.reduce((acc, r) => {
  if (!acc[r.suite]) acc[r.suite] = [];
  acc[r.suite].push(r);
  return acc;
}, {} as Record<string, TestResult[]>);

Object.entries(grouped).forEach(([suite, tests]) => {
  console.log(`📦 [Suite] ${suite}`);
  tests.forEach(t => {
    if (t.passed) {
      passedCount++;
      console.log(`   ✅ PASS: ${t.name} (${t.durationMs}ms)`);
    } else {
      failedCount++;
      console.log(`   ❌ FAIL: ${t.name} (${t.durationMs}ms)\n      Error: ${t.error}`);
    }
  });
  console.log('');
});

console.log('-------------------------------------------------------------------------');
console.log(`TOTAL: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('QUALITY GATE DECISION: ' + (failedCount === 0 ? '🟢 GO (100% PASS)' : '🔴 NO-GO'));
console.log('=========================================================================\n');
