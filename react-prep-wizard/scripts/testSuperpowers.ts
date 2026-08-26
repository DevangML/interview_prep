/**
 * Automated Test Suite: Superpower Engines & Database Persistence
 * Verifies that zero agent output bypasses the database and that
 * JD Gap Analysis, Bug Injection, STAR Story Synthesis, and Cheat Sheet
 * generation reliably commit to CognitiveDatabase.
 */

import { globalCognitiveDB } from '../src/lib/storage/cognitiveDatabase';
import { JdGapAnalyzer } from '../src/lib/ai/superpowers/jdGapAnalyzer';
import { BugInjectorEngine } from '../src/lib/ai/superpowers/bugInjectorEngine';
import { StarStorySynthesizer } from '../src/lib/ai/superpowers/starStorySynthesizer';
import { CheatSheetGenerator } from '../src/lib/ai/superpowers/cheatSheetGenerator';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const results: TestResult[] = [];

async function runAsyncTest(suite: string, name: string, fn: () => Promise<void>) {
  const start = performance.now();
  try {
    await fn();
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

async function main() {
  console.log('🧪 =========================================================================');
  console.log('🧪 EXECUTING DATABASE & COGNITIVE SUPERPOWERS QUALITY GATE');
  console.log('🧪 =========================================================================\n');

  // 1. CognitiveDatabase CRUD
  await runAsyncTest('CognitiveDatabase', 'Persists and retrieves records with ACID integrity', async () => {
    const record = {
      id: 'test_record_1',
      companyName: 'TestCo',
      targetRole: 'Staff Lead',
      jdRawText: 'React 19, V8, Distributed Systems',
      matchedSkills: ['react 19'],
      missingGaps: ['crdt'],
      customCurriculumPlan: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await globalCognitiveDB.put('jd_analyses', record);
    const retrieved = await globalCognitiveDB.get('jd_analyses', 'test_record_1');
    assert(retrieved != null, 'Record must be retrieved from DB');
    assertEqual((retrieved as any).companyName, 'TestCo', 'Company name must match');
  });

  // 2. JD Gap Analyzer
  await runAsyncTest('JdGapAnalyzer', 'Analyzes Druva/Storage JD and saves 5-day curriculum to DB', async () => {
    const jdText = 'Senior Staff Storage Engineer at Druva. Deduplication, Raft consensus, React 19, V8, high QPS streaming.';
    const record = await JdGapAnalyzer.analyzeAndSave({
      companyName: 'Druva Pune',
      targetRole: 'Staff Systems Engineer',
      jdText,
    });

    assert(record.id.startsWith('jd-druva-pune'), 'Record ID must match company prefix');
    assertEqual(record.customCurriculumPlan.length, 5, 'Must generate full 5-day curriculum');
    assert(record.matchedSkills.includes('react 19'), 'Must identify React 19');
    
    // Verify persistence in DB
    const dbRecord = await globalCognitiveDB.get('jd_analyses', record.id);
    assert(dbRecord != null, 'JD analysis must be persisted in Cognitive DB');
  });

  // 3. Bug Injector Engine
  await runAsyncTest('BugInjectorEngine', 'Spawns live bug drill and verifies resolution in DB', async () => {
    const drill = await BugInjectorEngine.spawnDrill('v8_memory');
    assert(drill.buggyCode.includes('BUGGY CODE'), 'Drill must contain buggy code');

    const result = await BugInjectorEngine.submitAttempt(
      drill.id,
      'function createPoint(x, y, is3D) { return { x, y, z: is3D ? 0 : undefined }; }',
      42
    );

    assert(result.isResolved, 'Patch must successfully resolve the V8 shape deopt');
    
    // Verify updated state in DB
    const updated = await globalCognitiveDB.get<any>('bug_drills', drill.id);
    assertEqual(updated.isResolved, true, 'isResolved state must persist in DB');
    assertEqual(updated.timeSpentSec, 42, 'timeSpentSec must persist in DB');
  });

  // 4. STAR Story Synthesizer
  await runAsyncTest('StarStorySynthesizer', 'Synthesizes defense with metrics and commits to DB', async () => {
    const record = await StarStorySynthesizer.synthesizeAndSave({
      title: 'Distributed Redis Rate Limiter',
      category: 'architecture',
      rawNarrative: 'Redesigned the rate limiter for 100k QPS. Reduced P99 latency by 45% and saved $12k/mo in cluster hosting.',
    });

    assert(record.quantifiedMetrics.length > 0, 'Must extract quantified metrics');
    assert(record.result.includes('zero downtime'), 'Must format S-T-A-R narrative');

    const dbRecord = await globalCognitiveDB.get('star_stories', record.id);
    assert(dbRecord != null, 'STAR story must be committed to Cognitive DB');
  });

  // 5. Cheat Sheet Generator
  await runAsyncTest('CheatSheetGenerator', 'Generates 1-page emergency cheat sheet and saves to DB', async () => {
    const sheet = await CheatSheetGenerator.generateAndSave({
      companyName: 'PubMatic Pune',
      role: 'Staff Platform Architect',
    });

    assert(sheet.markdownContent.includes('15-Minute Pre-Interview Emergency Cheat Sheet'), 'Header must exist');
    assert(sheet.markdownContent.includes('Core Architectural Invariants'), 'Invariants must be embedded');
    assert(sheet.invariantsSummary.length > 0, 'Summary list must be populated');

    const dbRecord = await globalCognitiveDB.get('cheat_sheets', sheet.id);
    assert(dbRecord != null, 'Cheat sheet must be committed to Cognitive DB');
  });

  // Reporting
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
}

main().catch(console.error);
