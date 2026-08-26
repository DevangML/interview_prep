import { grade } from './grader';
import type { GradeResult, CheckResult } from './grader';
import type { MasteryUnit } from '../data/masteryStream';
import type { CompileResult } from '../types';

/**
 * Grades a Mastery unit by comparing what the browser actually produced from
 * the learner's code against what it produces from the reference solution.
 *
 * The Crucible previously had one verdict mechanism: a button the learner
 * pressed themselves. A currency you print yourself is not a currency, and a
 * readiness number built on it cannot be trusted. This replaces the button.
 *
 * Three practice types, three ways of being right:
 *  - `css`        → same markup, two stylesheets: compare computed layout.
 *  - `jsx`        → two components: compare the rendered trees.
 *  - `js_snippet` → two programs: compare what they log.
 */

export type { GradeResult } from './grader';

const HARNESS_CSS =
  '*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;color:#0f172a;background:#fff}';

interface CapturedExecution {
  logs: string[];
  assertions: { label: string; expected: string; actual: string; ok: boolean }[];
  env: Record<string, any>;
  error?: string;
}

/** Runs a snippet with a captured console and test runner, returning logs, assertions, and final env. */
function captureLogs(code: string): CapturedExecution {
  const logs: string[] = [];
  const assertions: { label: string; expected: string; actual: string; ok: boolean }[] = [];
  const env: Record<string, any> = {};
  
  const fmt = (args: unknown[]) =>
    args
      .map((a) => {
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch { return String(a); }
      })
      .join(' ');
      
  const mockConsole = {
    log: (...a: unknown[]) => logs.push(fmt(a)),
    info: (...a: unknown[]) => logs.push(fmt(a)),
    warn: (...a: unknown[]) => logs.push(`[WARN] ${fmt(a)}`),
    error: (...a: unknown[]) => logs.push(`[ERROR] ${fmt(a)}`),
  };
  
  const mockAssert = {
    equal: (actual: unknown, expected: unknown, label = 'strict equality') => {
      assertions.push({
        label,
        expected: fmt([expected]),
        actual: fmt([actual]),
        ok: actual === expected,
      });
    },
    deepEqual: (actual: unknown, expected: unknown, label = 'deep equality') => {
      const a = fmt([actual]);
      const e = fmt([expected]);
      assertions.push({
        label,
        expected: e,
        actual: a,
        ok: a === e,
      });
    }
  };

  try {
    const wrappedCode = `
      ${code}
      try { if (typeof p1 !== 'undefined') __env.p1 = p1; } catch(e){}
      try { if (typeof p2 !== 'undefined') __env.p2 = p2; } catch(e){}
      try { if (typeof obj1 !== 'undefined') __env.obj1 = typeof obj1 === 'object' && obj1 ? JSON.parse(JSON.stringify(obj1)) : obj1; } catch(e){}
      try { if (typeof obj2 !== 'undefined') __env.obj2 = typeof obj2 === 'object' && obj2 ? JSON.parse(JSON.stringify(obj2)) : obj2; } catch(e){}
      try { if (typeof user !== 'undefined') __env.user = typeof user === 'object' && user ? JSON.parse(JSON.stringify(user)) : user; } catch(e){}
      try { if (typeof shallow !== 'undefined') __env.shallow = typeof shallow === 'object' && shallow ? JSON.parse(JSON.stringify(shallow)) : shallow; } catch(e){}
      try { if (typeof user2 !== 'undefined') __env.user2 = typeof user2 === 'object' && user2 ? JSON.parse(JSON.stringify(user2)) : user2; } catch(e){}
      try { if (typeof deep !== 'undefined') __env.deep = typeof deep === 'object' && deep ? JSON.parse(JSON.stringify(deep)) : deep; } catch(e){}
    `;
    // eslint-disable-next-line no-new-func
    new Function('console', 'assert', '__env', wrappedCode)(mockConsole, mockAssert, env);
    return { logs, assertions, env };
  } catch (e) {
    return { logs, assertions, env, error: e instanceof Error ? e.message : String(e) };
  }
}

function logsVerdict(mine: CapturedExecution, theirs: CapturedExecution, unitId?: string): GradeResult {
  const checks: CheckResult[] = [];
  if (mine.error) {
    return { pass: false, checks, error: `your code threw: ${mine.error}`, gradedAt: Date.now() };
  }

  // --- UNIT-SPECIFIC SEMANTIC INVARIANT CHECKS ---
  if (unitId === 'js-primitives-vs-references') {
    const p1Passed = (mine.env.p1 !== undefined && mine.env.p2 !== undefined && mine.env.p1 !== mine.env.p2) ||
      mine.logs.some(l => l.includes('hello') || l.includes('5'));
    const obj1Passed = (mine.env.obj1 && (mine.env.obj1.val === 99 || mine.env.obj1.val !== 10)) ||
      mine.logs.some(l => l.includes('99'));

    checks.push({
      label: 'Primitive value isolated on reassignment',
      expected: 'Original primitive unchanged',
      actual: p1Passed ? 'Original primitive unchanged' : 'Primitive overwritten',
      ok: Boolean(p1Passed)
    });
    checks.push({
      label: 'Object reference mutated shared heap memory',
      expected: 'obj1.val mutated to 99',
      actual: obj1Passed ? 'obj1.val mutated to 99' : 'obj1.val unchanged',
      ok: Boolean(obj1Passed)
    });

    return { pass: checks.every(c => c.ok), checks, gradedAt: Date.now() };
  }

  if (unitId === 'js-shallow-vs-deep') {
    const shallowMutated = (mine.env.user?.address?.city === 'London') || mine.logs.some(l => l.includes('London'));
    const deepProtected = (mine.env.user2?.address?.city === 'New York') || mine.logs.some(l => l.includes('New York'));

    checks.push({
      label: 'Shallow copy mutates nested object on original',
      expected: 'Original address.city mutated to London',
      actual: shallowMutated ? 'Original address.city mutated to London' : 'Original address not mutated',
      ok: Boolean(shallowMutated)
    });
    checks.push({
      label: 'Deep copy isolates nested objects',
      expected: 'Original address.city remains New York',
      actual: deepProtected ? 'Original address.city remains New York' : 'Original address mutated',
      ok: Boolean(deepProtected)
    });

    return { pass: checks.every(c => c.ok), checks, gradedAt: Date.now() };
  }

  // --- ASSERTION-BASED GENERAL GRADING ---
  if (mine.assertions.length > 0 && mine.assertions.every(a => a.ok)) {
    return {
      pass: true,
      checks: mine.assertions.map(a => ({ label: a.label, expected: a.expected, actual: a.actual, ok: a.ok })),
      gradedAt: Date.now()
    };
  }

  // If the reference solution uses assertions and user ran assertions
  if (theirs.assertions.length > 0 && mine.assertions.length >= theirs.assertions.length) {
    for (let i = 0; i < theirs.assertions.length; i++) {
      const t = theirs.assertions[i];
      const m = mine.assertions[i];
      checks.push({
        label: m.label || t.label || `Assertion ${i + 1}`,
        expected: t.expected,
        actual: m.actual,
        ok: m.ok && m.actual === t.expected
      });
    }
    return { pass: checks.every(c => c.ok), checks, gradedAt: Date.now() };
  }

  // --- LOG-BASED FALLBACK GRADING ---
  checks.push({
    label: 'console — number of lines',
    expected: String(theirs.logs.length),
    actual: String(mine.logs.length),
    ok: mine.logs.length === theirs.logs.length,
  });
  
  const n = Math.max(mine.logs.length, theirs.logs.length);
  for (let i = 0; i < n; i++) {
    const e = theirs.logs[i] ?? '(nothing)';
    const a = mine.logs[i] ?? '(nothing)';
    if (e !== a) {
      checks.push({ label: `console line ${i + 1}`, expected: e, actual: a, ok: false });
    }
  }
  
  if (checks.length === 1 && checks[0].ok) {
    checks.push({ label: 'console output', expected: 'matches reference', actual: 'matches', ok: true });
  }
  
  return { pass: checks.every((c) => c.ok), checks, gradedAt: Date.now() };
}

import type { AstCheckResult } from './astWorker';

const worker = new Worker(new URL('./astWorker.ts', import.meta.url), { type: 'module' });

const gradeWithAst = (code: string, unitId: string): Promise<AstCheckResult> => {
  return new Promise((resolve) => {
    const onMessage = (e: MessageEvent) => {
      worker.removeEventListener('message', onMessage);
      resolve(e.data);
    };
    worker.addEventListener('message', onMessage);
    worker.postMessage({ code, unitId });
  });
};

export async function gradeUnit(
  unit: MasteryUnit,
  userCode: string,
  compile: (code: string) => Promise<CompileResult>,
): Promise<GradeResult> {
  const { type, solutionCode, baseHtml = '', baseCss = '', specs } = unit.practice;

  // Some units teach by editing in place — the source has no separate answer to
  // compare against. Say so plainly rather than passing or failing on nothing.
  if (solutionCode.trim() === userCode.trim() && solutionCode.trim() === unit.practice.starterCode.trim()) {
    return {
      pass: false,
      checks: specs.map((s) => ({ label: s, expected: 'your judgement', actual: 'not attempted', ok: false })),
      error: 'This unit teaches by editing in place — the source carries no separate solution to compare against. Check it against the spec list yourself, then override.',
      gradedAt: Date.now(),
    };
  }

  if (type === 'js_snippet') {
    const mine = captureLogs(userCode);
    const theirs = captureLogs(solutionCode);
    return logsVerdict(mine, theirs, unit.id);
  }

  if (type === 'jsx') {
    const [mineC, theirsC, astResult] = await Promise.all([
      compile(userCode), 
      compile(solutionCode),
      gradeWithAst(userCode, unit.id)
    ]);
    
    if (mineC.error) {
      return { pass: false, checks: [], error: `your component did not compile: ${mineC.error}`, gradedAt: Date.now() };
    }
    if (theirsC.error) {
      return { pass: false, checks: [], error: `reference did not compile: ${theirsC.error}`, gradedAt: Date.now() };
    }
    if (astResult && astResult.error) {
      return { pass: false, checks: [], error: `AST parser failed: ${astResult.error}`, gradedAt: Date.now() };
    }

    if (astResult && !astResult.valid) {
       // Return early if architectural rules are broken
       return { pass: false, checks: astResult.checks.map(c => ({ label: c.label, expected: 'Rule Followed', actual: c.actual, ok: c.ok })), gradedAt: Date.now() };
    }

    const domResult = await grade({
      baseCSS: HARNESS_CSS + baseCss,
      referenceCSS: '',
      referenceJs: theirsC.code || '',
      attemptCSS: '',
      attemptJs: mineC.code || '',
      props: [],
      // A component is judged at one width; responsive behaviour is the CSS units' job.
      widths: [900],
    });
    
    // Inject AST success checks at the top
    if (astResult && astResult.checks) {
      domResult.checks = [
        ...astResult.checks.map(c => ({ label: c.label, expected: 'Rule Followed', actual: c.actual, ok: c.ok })), 
        ...domResult.checks
      ];
    }
    
    return domResult;
  }

  // css: identical markup, two stylesheets — the difference is entirely the CSS.
  return grade({
    baseCSS: HARNESS_CSS + baseCss,
    referenceCSS: solutionCode,
    referenceJs: htmlAsScript(baseHtml),
    attemptCSS: userCode,
    attemptJs: htmlAsScript(baseHtml),
    props: specs.map((s) => s.split('—')[0].trim()),
  });
}

/**
 * The grader renders through a compiled component; CSS units carry plain HTML.
 * Injecting it directly keeps one code path instead of two sandboxes.
 */
function htmlAsScript(html: string): string {
  // Deliberately does NOT define __DEFAULT__: the sandbox renders a React root
  // when it finds one, and that would wipe the markup we just injected.
  return `document.getElementById('root').innerHTML = ${JSON.stringify(html)};`;
}
