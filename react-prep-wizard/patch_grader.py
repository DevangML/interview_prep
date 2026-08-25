import re

with open('src/lib/unitGrader.ts', 'r') as f:
    content = f.read()

replacement = """interface CapturedExecution {
  logs: string[];
  assertions: { label: string; expected: string; actual: string; ok: boolean }[];
  error?: string;
}

/** Runs a snippet with a captured console and test runner, returning logs and assertions. */
function captureLogs(code: string): CapturedExecution {
  const logs: string[] = [];
  const assertions: { label: string; expected: string; actual: string; ok: boolean }[] = [];
  
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
    // eslint-disable-next-line no-new-func
    new Function('console', 'assert', code)(mockConsole, mockAssert);
    return { logs, assertions };
  } catch (e) {
    return { logs, assertions, error: e instanceof Error ? e.message : String(e) };
  }
}

function logsVerdict(mine: CapturedExecution, theirs: CapturedExecution): GradeResult {
  const checks: CheckResult[] = [];
  if (mine.error) {
    return { pass: false, checks, error: `your code threw: ${mine.error}`, gradedAt: Date.now() };
  }

  // If the reference solution uses assertions, we grade EXCLUSIVELY on assertions (Memory/Logic mode)
  if (theirs.assertions.length > 0) {
    if (mine.assertions.length < theirs.assertions.length) {
      checks.push({
        label: 'Test Cases Executed',
        expected: String(theirs.assertions.length),
        actual: String(mine.assertions.length),
        ok: false
      });
      return { pass: false, checks, error: "You deleted or failed to reach required assertions.", gradedAt: Date.now() };
    }
    
    // Evaluate the user's assertions
    for (let i = 0; i < theirs.assertions.length; i++) {
      const t = theirs.assertions[i];
      const m = mine.assertions[i];
      checks.push({
        label: m.label || t.label || `Assertion ${i + 1}`,
        expected: t.expected,
        actual: m.actual,
        ok: m.ok && m.actual === t.expected // Must match the reference expected value AND pass
      });
    }
    
    return { pass: checks.every(c => c.ok), checks, gradedAt: Date.now() };
  }

  // Fallback to legacy string-matching logs (Execution Trace mode)
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
}"""

content = re.sub(
    r'/\*\* Runs a snippet with a captured console and returns everything it logged\. \*/.*?function logsVerdict.*?return \{ pass: checks\.every\(\(c\) => c\.ok\), checks, gradedAt: Date\.now\(\) \};\n\}',
    replacement,
    content,
    flags=re.DOTALL
)

# Also update the call site in gradeUnit
content = content.replace(
    'return logsVerdict(mine.logs, theirs.logs, mine.error);',
    'return logsVerdict(mine, theirs);'
)

with open('src/lib/unitGrader.ts', 'w') as f:
    f.write(content)
