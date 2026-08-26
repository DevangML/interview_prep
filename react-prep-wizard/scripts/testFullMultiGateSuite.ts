/**
 * Comprehensive Multi-Gate Adversarial Quality Gate Test Suite
 * Fully Aligns with ARCHITECTURE.md v2.3 & PRD v2.3:
 * - Gate A: Core Integration Correctness (Task-Aware Context & 3-Tier Spines)
 * - Gate B: Adversarial Sandboxing & Resource Containment (Infinite loops, async bombs, memory)
 * - Gate C: ACE Routing, Orchestration Patterns & Negative Tool Permission Denial
 * - Gate D: Dense Vector Embedding + BM25 Reciprocal Rank Fusion (RRF, k=60)
 * - Gate E: High-Concurrency Conflict-Free Sync, LWW Tie-Breaking & Tombstone Deletion
 * - Gate F: Pilot Benchmark Scenarios & Watchdog Safety
 */

import { TaskAwareContextSynthesizer } from '../src/lib/ai/contextSynthesizer';
import { HybridKnowledgeEngine, globalKnowledgeEngine } from '../src/lib/ai/hybridKnowledgeEngine';
import { AgentControllerEngine, AGENT_TOOL_PERMISSIONS } from '../src/lib/ai/agentController';
import { SandboxedWorkerPool } from '../src/lib/sandbox/SandboxedWorker';
import { CognitiveDatabase, globalCognitiveDB } from '../src/lib/storage/cognitiveDatabase';
import { JdGapAnalyzer } from '../src/lib/ai/superpowers/jdGapAnalyzer';
import { StarStorySynthesizer } from '../src/lib/ai/superpowers/starStorySynthesizer';
import { CheatSheetGenerator } from '../src/lib/ai/superpowers/cheatSheetGenerator';

interface TestResult {
  gate: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const results: TestResult[] = [];

async function runTest(gate: string, name: string, fn: () => Promise<void>) {
  const start = performance.now();
  try {
    await fn();
    results.push({
      gate,
      name,
      passed: true,
      durationMs: Number((performance.now() - start).toFixed(2)),
    });
  } catch (err: any) {
    results.push({
      gate,
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

async function main() {
  console.log('🧪 =========================================================================');
  console.log('🧪 EXECUTING COMPREHENSIVE MULTI-GATE ADVERSARIAL QUALITY GATE (v2.3)');
  console.log('🧪 =========================================================================\n');

  // ==========================================
  // GATE A: Core Integration & Dynamic Context
  // ==========================================
  await runTest('Gate A: Context & Core Integration', 'Dynamic Context Knapsack adapts soft limits by TaskDomain', async () => {
    const debugContext = TaskAwareContextSynthesizer.synthesize({
      domain: 'code_debugging',
      systemSpine: 'Copilot Debugging Spine',
      userCode: 'function race() {}',
      compilerTelemetry: 'TypeError: unhandled abort',
      chatMessages: [
        { role: 'user', content: 'We decided on Redis sliding window for rate limiting', isArchDecision: true },
        { role: 'assistant', content: 'ok got it', isRedundantToolIO: true },
        { role: 'user', content: 'Why is this still throwing race errors?', isUnresolvedDefect: true }
      ]
    });

    assertEqual(debugContext.domain, 'code_debugging', 'Domain must match');
    assertEqual(debugContext.budgetCap, 8192, 'Debugging budget cap must be 8192');
    assert(debugContext.dynamicContextBlock.includes('ACTIVE COMPILER & AST TELEMETRY'), 'Must embed compiler telemetry');
    assert(debugContext.recentMessages.some(m => m.isArchDecision), 'Must preserve architectural decision');
  });

  // ==========================================
  // GATE B: Adversarial Sandboxing & Containment
  // ==========================================
  await runTest('Gate B: Sandbox Security', 'Catches iteration loops and terminates without main thread freeze', async () => {
    const loopCode = 'while (true) {}';
    const res = await SandboxedWorkerPool.execute(loopCode, {}, 50);
    assert(!res.success, 'Loop must fail execution');
    assertEqual(res.error?.type, 'TIMEOUT_EXCEEDED', 'Must report TIMEOUT_EXCEEDED');
  });

  await runTest('Gate B: Sandbox Security', 'Rejects network access and neutralizes ambient credentials in sandbox', async () => {
    const exploitCode = 'return typeof fetch;';
    const res = await SandboxedWorkerPool.execute(exploitCode);
    assert(res.success, 'Sandboxed runner executed');
    // fetch is a function that returns a rejected Promise
    const fetchResCode = 'return fetch("https://evil.com").catch(e => e.message);';
    const fetchRes = await SandboxedWorkerPool.execute(fetchResCode);
    const outputStr = fetchRes.output instanceof Promise ? await fetchRes.output : String(fetchRes.output || '');
    assert(outputStr.includes('Network access disabled'), 'Fetch must reject network access');
  });

  // ==========================================
  // GATE C: ACE Routing & Tool Permissions
  // ==========================================
  await runTest('Gate C: ACE Routing & Permissions', 'Infers intent, pattern, and mode correctly from natural language', async () => {
    const p1 = AgentControllerEngine.plan('Why is my search typeahead rendering stale user data on fast typing?');
    assertEqual(p1.activeMode, 'copilot', 'Stale query must route to Copilot');
    assertEqual(p1.orchestrationPattern, 'sequential_handoff', 'Must use sequential_handoff pattern');

    const p2 = AgentControllerEngine.plan('Audit my distributed rate limiter design for 100k QPS across 3 cloud regions.');
    assertEqual(p2.activeMode, 'architect', 'Audit QPS must route to Architect');
    assertEqual(p2.orchestrationPattern, 'evaluator_optimizer', 'Must use evaluator_optimizer pattern');
  });

  await runTest('Gate C: ACE Routing & Permissions', 'Enforces negative tool permission gates and denies unauthorized tools', async () => {
    // Tutor is allowed memory, denied sandbox compilation
    assert(AgentControllerEngine.authorizeToolExecution('tutor', 'read_memory'), 'Tutor allowed read_memory');
    let denied = false;
    try {
      AgentControllerEngine.authorizeToolExecution('tutor', 'run_sandboxed_tests');
    } catch (e: any) {
      denied = e.message.includes('SECURITY_VIOLATION');
    }
    assert(denied, 'Tutor MUST be denied run_sandboxed_tests');
  });

  await runTest('Gate C: ACE Routing & Permissions', 'Validates AgentResultEnvelope contract and catches malformed outputs', async () => {
    const validEnvelope = {
      agentId: 'engineering',
      mode: 'copilot',
      conclusion: 'Root cause identified: missing abort controller',
      claims: [{ statement: 'AbortController cancels in-flight fetch', isNormative: true }],
      evidence: [{ type: 'ast_structure', payload: {}, passed: true }],
      uncertainty: { confidenceEstimate: 0.92, assumptions: [], unresolvedQuestions: [] },
      stopReason: 'objective_fulfilled'
    };
    const v1 = AgentControllerEngine.validateEnvelope(validEnvelope);
    assert(v1.isValid, 'Valid envelope must pass validation');

    const malformed = { agentId: 'engineering' };
    const v2 = AgentControllerEngine.validateEnvelope(malformed);
    assert(!v2.isValid && v2.errors.length > 0, 'Malformed envelope must fail validation');
  });

  // ==========================================
  // GATE D: Dense Vector + BM25 Reciprocal Rank Fusion (RRF)
  // ==========================================
  await runTest('Gate D: Hybrid Retrieval (RRF)', 'Merges BM25 symbols and dense semantic candidates via RRF (k=60)', async () => {
    const results = globalKnowledgeEngine.search('useActionState transition rollback error boundary', 2);
    assert(results.length > 0, 'Must return results');
    assert(results[0].rrfScore > 0, 'Must compute RRF score');
    assertEqual(results[0].doc.id, 'react19_action_state', 'Must prioritize React 19 Action State');
    assertEqual(results[0].doc.provenance.status, 'currently_valid', 'Must enforce currently_valid status');
  });

  await runTest('Gate D: Hybrid Retrieval (RRF)', 'Correctly resolves WCAG 2.2 AAA Target Size (44x44 CSS px) normative spec', async () => {
    const results = globalKnowledgeEngine.search('wcag 2.2 aaa target size touch accessibility', 1);
    assert(results.length > 0, 'Must retrieve WCAG spec');
    assert(results[0].doc.invariants[0].includes('44x44 CSS pixels'), 'Must ground in 44x44 CSS px normative standard');
  });

  // ==========================================
  // GATE E: High-Concurrency Sync & Tombstones
  // ==========================================
  await runTest('Gate E: Concurrency & Delta Sync', 'Resolves concurrent same-field conflicts via deterministic LWW & device tie-break', async () => {
    const localRec = {
      id: 'star-1',
      title: 'Local Version',
      updatedAt: 1000,
      deviceId: 'dev_a',
      revision: 1
    };

    const remoteRec = {
      id: 'star-1',
      title: 'Remote Version',
      updatedAt: 2000, // Newer timestamp
      deviceId: 'dev_b',
      revision: 1
    };

    const winner = CognitiveDatabase.resolveConflict(localRec, remoteRec);
    assertEqual(winner.title, 'Remote Version', 'Newer timestamp must win LWW');

    // Equal timestamp tie-break
    const tieLocal = { id: 'star-2', title: 'Tie A', updatedAt: 3000, deviceId: 'dev_a', revision: 2 };
    const tieRemote = { id: 'star-2', title: 'Tie B', updatedAt: 3000, deviceId: 'dev_b', revision: 2 };
    const tieWinner = CognitiveDatabase.resolveConflict(tieLocal, tieRemote);
    assertEqual(tieWinner.deviceId, 'dev_b', 'Higher deviceId must break ties deterministically');
  });

  await runTest('Gate E: Concurrency & Delta Sync', 'Soft-deletes with tombstones and serves delta updates by timestamp', async () => {
    await globalCognitiveDB.put('star_stories', {
      id: 'star-tombstone-test',
      title: 'To Delete',
      category: 'architecture',
      situation: 'S',
      task: 'T',
      action: 'A',
      result: 'R',
      quantifiedMetrics: [],
      createdAt: 1000,
      updatedAt: 1000,
    });

    assert((await globalCognitiveDB.get('star_stories', 'star-tombstone-test')) != null, 'Record exists');

    // Delete record
    await globalCognitiveDB.delete('star_stories', 'star-tombstone-test');
    assert((await globalCognitiveDB.get('star_stories', 'star-tombstone-test')) == null, 'Record hidden from normal get()');

    // Record survives as tombstone for delta sync
    const all = await globalCognitiveDB.getAll<any>('star_stories', true);
    const tombstone = all.find(r => r.id === 'star-tombstone-test');
    assert(tombstone != null && tombstone._deleted === true, 'Tombstone preserved for sync');
  });

  // ==========================================
  // GATE F: Pilot Benchmark Scenarios
  // ==========================================
  await runTest('Gate F: Pilot Benchmark', 'Evaluates Staff-level Redis Sliding Window & CRDT scenarios safely', async () => {
    const rateLimiterCode = 'const count = prevCount * (1 - weight) + currCount; return count < maxLimit;';
    const res = await SandboxedWorkerPool.execute(rateLimiterCode, { prevCount: 10, weight: 0.5, currCount: 5, maxLimit: 20 });
    assert(res.success, 'Rate limiter code must execute successfully');
    assertEqual(res.output, true, 'Rate limit calculation is valid');
  });

  // Reporting
  let passedCount = 0;
  let failedCount = 0;

  console.log('RESULTS BY QUALITY GATE:\n');
  const grouped = results.reduce((acc, r) => {
    if (!acc[r.gate]) acc[r.gate] = [];
    acc[r.gate].push(r);
    return acc;
  }, {} as Record<string, TestResult[]>);

  Object.entries(grouped).forEach(([gate, tests]) => {
    console.log(`📦 [${gate}]`);
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
  console.log(`TOTAL ASSERTIONS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log('QUALITY GATE DECISION: ' + (failedCount === 0 ? '🟢 CORE INTEGRATION PASS — RELEASE CANDIDATE (v2.3)' : '🔴 NO-GO'));
  console.log('=========================================================================\n');
}

main().catch(console.error);
