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

/** Runs a snippet with a captured console and returns everything it logged. */
function captureLogs(code: string): { logs: string[]; error?: string } {
  const logs: string[] = [];
  const fmt = (args: unknown[]) =>
    args
      .map((a) => {
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch { return String(a); }
      })
      .join(' ');
  const mock = {
    log: (...a: unknown[]) => logs.push(fmt(a)),
    info: (...a: unknown[]) => logs.push(fmt(a)),
    warn: (...a: unknown[]) => logs.push(`[WARN] ${fmt(a)}`),
    error: (...a: unknown[]) => logs.push(`[ERROR] ${fmt(a)}`),
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function('console', code)(mock);
    return { logs };
  } catch (e) {
    return { logs, error: e instanceof Error ? e.message : String(e) };
  }
}

function logsVerdict(mine: string[], theirs: string[], myErr?: string): GradeResult {
  const checks: CheckResult[] = [];
  if (myErr) {
    return {
      pass: false,
      checks,
      error: `your code threw: ${myErr}`,
      gradedAt: Date.now(),
    };
  }
  checks.push({
    label: 'console — number of lines',
    expected: String(theirs.length),
    actual: String(mine.length),
    ok: mine.length === theirs.length,
  });
  const n = Math.max(mine.length, theirs.length);
  for (let i = 0; i < n; i++) {
    const e = theirs[i] ?? '(nothing)';
    const a = mine[i] ?? '(nothing)';
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
    return logsVerdict(mine.logs, theirs.logs, mine.error);
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
