import { grade } from './grader';
import type { GradeResult } from './grader';
import type { MasteryUnit } from '../data/masteryStream';
import type { CompileResult } from '../types';
import { captureLogs, logsVerdict } from './graders/jsSnippetGrader';
import { gradeWithAst } from './graders/astGradeClient';

export type { GradeResult } from './grader';

const HARNESS_CSS =
  '*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:14px system-ui;color:#0f172a;background:#fff}';

function htmlAsScript(html: string): string {
  return `document.getElementById('root').innerHTML = ${JSON.stringify(html)};`;
}

export async function gradeUnit(
  unit: MasteryUnit,
  userCode: string,
  compile: (code: string) => Promise<CompileResult>,
): Promise<GradeResult> {
  const { type, solutionCode, baseHtml = '', baseCss = '', specs } = unit.practice;

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
    
    if (mineC.error) return { pass: false, checks: [], error: `your component did not compile: ${mineC.error}`, gradedAt: Date.now() };
    if (theirsC.error) return { pass: false, checks: [], error: `reference did not compile: ${theirsC.error}`, gradedAt: Date.now() };
    if (astResult && astResult.error) return { pass: false, checks: [], error: `AST parser failed: ${astResult.error}`, gradedAt: Date.now() };

    if (astResult && !astResult.valid) {
      return { pass: false, checks: astResult.checks.map(c => ({ label: c.label, expected: 'Rule Followed', actual: c.actual, ok: c.ok })), gradedAt: Date.now() };
    }

    const domResult = await grade({
      baseCSS: HARNESS_CSS + baseCss,
      referenceCSS: '',
      referenceJs: theirsC.code || '',
      attemptCSS: '',
      attemptJs: mineC.code || '',
      props: [],
      widths: [900],
    });
    
    if (astResult && astResult.checks) {
      domResult.checks = [
        ...astResult.checks.map(c => ({ label: c.label, expected: 'Rule Followed', actual: c.actual, ok: c.ok })), 
        ...domResult.checks
      ];
    }
    return domResult;
  }

  return grade({
    baseCSS: HARNESS_CSS + baseCss,
    referenceCSS: solutionCode,
    referenceJs: htmlAsScript(baseHtml),
    attemptCSS: userCode,
    attemptJs: htmlAsScript(baseHtml),
    props: specs.map((s) => s.split('—')[0].trim()),
  });
}
