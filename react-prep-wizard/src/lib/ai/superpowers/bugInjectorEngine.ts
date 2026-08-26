/**
 * Adversarial Bug Injection Sparring Engine (Winston — System Architect)
 * Injects realistic concurrency bugs, memory leaks, and shape deopts into code,
 * times the diagnosis, and commits drill performance to the database.
 */

import { globalCognitiveDB, type BugDrillRecord } from '../../storage/cognitiveDatabase';

export class BugInjectorEngine {
  private static BUG_TEMPLATES: BugDrillRecord[] = [
    {
      id: 'bug_v8_shape_deopt',
      title: 'V8 Hidden Class Polymorphic Deoptimization',
      category: 'v8_memory',
      difficulty: 'Senior',
      buggyCode: `// BUGGY CODE: High QPS Event Dispatcher
function createPoint(x, y, is3D) {
  const pt = { x, y };
  if (is3D) {
    pt.z = 0; // Dynamic property addition creates divergent hidden classes!
  }
  return pt;
}

// 100,000 invocations flip call-site to Megamorphic Dictionary Mode
for (let i = 0; i < 100000; i++) {
  createPoint(i, i + 1, i % 2 === 0);
}`,
      cleanSolution: `// FIXED: Maintain deterministic property initialization order
function createPoint(x, y, is3D) {
  return {
    x,
    y,
    z: is3D ? 0 : undefined // Stable hidden class shape across all invocations
  };
}`,
      explanation: 'Adding properties conditionally to existing object instances creates divergent hidden class transition trees, deoptimizing TurboFan JIT to slow generic dictionary lookups.',
      timeLimitSec: 300,
      createdAt: Date.now()
    },
    {
      id: 'bug_async_race_state',
      title: 'React 19 Server Action Stale Closure Race Condition',
      category: 'async_race',
      difficulty: 'Staff',
      buggyCode: `// BUGGY CODE: Search Typeahead with Race Condition
function SearchUser({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Missing AbortController: Slow query responses overwrite fast newer queries!
    fetch('/api/users?q=' + query)
      .then(res => res.json())
      .then(result => setData(result));
  }, [query]);

  return <div>{data?.name}</div>;
}`,
      cleanSolution: `// FIXED: Cancel in-flight requests on dependency change
function SearchUser({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/users?q=' + query, { signal: controller.signal })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [query]);

  return <div>{data?.name}</div>;
}`,
      explanation: 'Network latency variance allows older, slower HTTP requests to resolve after newer requests, corrupting UI state. Using an AbortController in the cleanup lifecycle guarantees deterministic state.',
      timeLimitSec: 360,
      createdAt: Date.now()
    }
  ];

  /**
   * Spawns a new bug sparring drill and commits it to DB
   */
  public static async spawnDrill(category?: 'concurrency' | 'v8_memory' | 'async_race'): Promise<BugDrillRecord> {
    const template = category 
      ? this.BUG_TEMPLATES.find(t => t.category === category) || this.BUG_TEMPLATES[0]
      : this.BUG_TEMPLATES[Math.floor(Math.random() * this.BUG_TEMPLATES.length)];

    const record: BugDrillRecord = {
      ...template,
      id: `drill-${template.id}-${Date.now()}`,
      createdAt: Date.now()
    };

    await globalCognitiveDB.put('bug_drills', record);
    return record;
  }

  /**
   * Evaluates user patch attempt and commits results to DB
   */
  public static async submitAttempt(
    drillId: string,
    userCode: string,
    timeSpentSec: number
  ): Promise<{ isResolved: boolean; feedback: string }> {
    const drill = await globalCognitiveDB.get<BugDrillRecord>('bug_drills', drillId);
    if (!drill) {
      return { isResolved: false, feedback: 'Drill record not found in database.' };
    }

    const clean = userCode.toLowerCase().replace(/\s+/g, ' ');
    const isResolved = clean.includes('abortcontroller') || clean.includes('abort()') || clean.includes('z:') || clean.includes('undefined');

    drill.userAttempt = userCode;
    drill.isResolved = isResolved;
    drill.timeSpentSec = timeSpentSec;

    await globalCognitiveDB.put('bug_drills', drill);

    return {
      isResolved,
      feedback: isResolved
        ? `✅ **Drill Solved!** (${timeSpentSec}s) — You successfully neutralized the ${drill.category} defect.`
        : `❌ **Defect Still Active** — ${drill.explanation}`
    };
  }
}
