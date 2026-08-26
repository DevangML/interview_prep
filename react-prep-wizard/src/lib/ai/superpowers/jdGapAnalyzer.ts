/**
 * Live JD Semantic Gap Analyzer & Auto-Curriculum Builder (Mary — Business Analyst)
 * Scans job descriptions, extracts matched skills and gap areas,
 * builds a targeted 5-day drill curriculum, and persists to Cognitive DB.
 */

import { globalCognitiveDB, type JdGapAnalysisRecord } from '../../storage/cognitiveDatabase';

export class JdGapAnalyzer {
  private static CURRICULUM_KEYWORDS = [
    'react 19', 'server actions', 'useactionstate', 'useoptimistic', 'fiber reconciler',
    'v8 engine', 'hidden classes', 'inline cache', 'garbage collection', 'loaf',
    'distributed systems', 'redis', 'sliding window', 'rate limiting', 'crdt', 'consistent hashing',
    'web workers', 'comlink', 'sharedarraybuffer', 'webgpu', 'opfs', 'indexeddb',
    'wcag 2.2 aaa', 'touch targets', 'state machines', 'solid principles', 'ast transpilation'
  ];

  /**
   * Analyzes raw job description text and persists the structured analysis into DB
   */
  public static async analyzeAndSave({
    companyName,
    targetRole,
    jdText
  }: {
    companyName: string;
    targetRole: string;
    jdText: string;
  }): Promise<JdGapAnalysisRecord> {
    const cleanJd = jdText.toLowerCase();
    const matchedSkills: string[] = [];
    const missingGaps: string[] = [];

    this.CURRICULUM_KEYWORDS.forEach(kw => {
      if (cleanJd.includes(kw)) {
        matchedSkills.push(kw);
      } else {
        missingGaps.push(kw);
      }
    });

    // Detect Company-Specific Architectural Archetypes
    let customArchetype = 'General Senior Fullstack / Systems';
    if (cleanJd.includes('storage') || cleanJd.includes('backup') || cleanJd.includes('dedup') || companyName.toLowerCase().includes('druva')) {
      customArchetype = 'Distributed Storage & Deduplication (Druva / Cloud Storage)';
    } else if (cleanJd.includes('adtech') || cleanJd.includes('rtb') || cleanJd.includes('latency') || companyName.toLowerCase().includes('pubmatic')) {
      customArchetype = 'Ultra-Low-Latency AdTech & Memory Pooling (PubMatic / RTB)';
    } else if (cleanJd.includes('payment') || cleanJd.includes('ledger') || cleanJd.includes('fintech') || companyName.toLowerCase().includes('mastercard')) {
      customArchetype = 'Distributed Idempotency & Financial Ledgers';
    }

    const customCurriculumPlan = [
      {
        day: 1,
        focus: 'Core Platform & Memory Lifecycle',
        keyInvariants: ['V8 Monomorphic Shapes', 'Zero-GC Hot Paths', 'Microtask Queue Ordering'],
        practiceTasks: ['Trace V8 Map transitions', 'Implement zero-allocation object pool']
      },
      {
        day: 2,
        focus: 'React 19 Actions & Fiber Reconciliation',
        keyInvariants: ['useActionState Transition Boundaries', 'useOptimistic Immediate Rendering', 'Rollback Safety'],
        practiceTasks: ['Build optimistic multi-tenant mutation form', 'Handle async abort signals']
      },
      {
        day: 3,
        focus: 'Distributed Systems & Rate Limiting',
        keyInvariants: ['Sliding Window Counter Interpolation', 'Atomic Redis Lua Transactions', 'Consistent Hash Partitions'],
        practiceTasks: ['Implement atomic sliding window rate limiter', 'Design multi-region failover cluster']
      },
      {
        day: 4,
        focus: 'CRDTs & High-Concurrency Data Sync',
        keyInvariants: ['LWW-Element-Set Convergence', 'Vector Clocks', 'Tombstone Garbage Collection'],
        practiceTasks: ['Build peer-to-peer collaborative state synchronizer', 'Resolve split-brain write conflicts']
      },
      {
        day: 5,
        focus: `Mock Defense for ${companyName} (${customArchetype})`,
        keyInvariants: ['Staff-Level Trade-Off Defense', 'Quantified Metrics', 'STAR Behavioral Impact'],
        practiceTasks: [`Simulate 45-minute Principal Round at ${companyName}`, 'Generate 1-Page Pre-Interview Cheat Sheet']
      }
    ];

    const record: JdGapAnalysisRecord = {
      id: `jd-${companyName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      companyName,
      targetRole,
      jdRawText: jdText,
      matchedSkills: matchedSkills.slice(0, 8),
      missingGaps: missingGaps.slice(0, 6),
      customCurriculumPlan,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Commit to Cognitive Database
    await globalCognitiveDB.put('jd_analyses', record);
    return record;
  }
}
