import type { MasteryUnit } from '../../data/masteryStream';

/**
 * Intelligent local heuristics fallback engine for offline or WebLLM initialization states.
 */
export function generateLocalHeuristicResponse(
  promptText: string,
  unit: MasteryUnit,
  userCode: string
): string {
  const lower = promptText.toLowerCase();
  const hasCode = userCode && userCode.trim().length > 0;
  const isStarter = userCode.trim() === unit.practice.starterCode.trim();

  if (lower.includes('dispute') || lower.includes('challenge') || lower.includes('debate') || lower.includes('erred') || lower.includes('impartial')) {
    if (!hasCode || isStarter) {
      return `### ⚖️ Impartial Arbitration Review\n\nYour editor currently contains the **starter code**.\n\n**To arbitrate a dispute:**\n1. Write your solution in the editor.\n2. State your reasoning or point of debate.\n3. I will objectively contrast your AST and execution logic against the problem specifications!`;
    }

    return `### ⚖️ Impartial Arbitration Analysis for \`${unit.title}\`\n\n**1. Specification Contract:**\n${unit.practice.specs.map((s, i) => `   - **Requirement ${i + 1}:** \`${s}\``).join('\n')}\n\n**2. Code Analysis:**\nYour code is being evaluated strictly against the invariant contract rather than any rigid template.\n\n**3. Symmetrical Verification:**\n- If your code produces required DOM/state mutations without side effects, your approach is valid.\n- If a test fails on strict whitespace or AST ordering, that is a test false negative.`;
  }

  if (lower.includes('diagnose') || lower.includes('bug') || lower.includes('issue') || lower.includes('fix')) {
    if (!hasCode || isStarter) {
      return `### 🔍 Code Diagnosis\n\nYour editor currently contains the **starter template** for **${unit.title}**.\n\n**Key Requirements:**\n${unit.practice.specs.map((s, i) => `${i + 1}. \`${s}\``).join('\n')}\n\nStart implementing the core logic and ask me again to review!`;
    }

    const checks: string[] = [];
    if (unit.practice.type === 'jsx') {
      if (userCode.includes('useState') && userCode.includes('set') && !userCode.includes('return (')) {
        checks.push('⚠️ Missing component return statement with JSX.');
      }
      if (userCode.includes('useEffect') && !userCode.includes('[') && userCode.includes('fetch')) {
        checks.push('⚠️ Missing dependency array on `useEffect` with network call.');
      }
      if (userCode.includes('.push(') || userCode.includes('.splice(')) {
        checks.push('⚠️ Direct state mutation detected (`push`/`splice`). React requires immutable updates.');
      }
    } else if (unit.practice.type === 'css') {
      if (userCode.includes('float:') && !userCode.includes('clear:')) {
        checks.push('⚠️ Legacy float used without clearfix.');
      }
      if (userCode.includes('!important')) {
        checks.push('⚠️ Used `!important` — consider increasing specificity.');
      }
    } else if (unit.practice.type === 'js_snippet' && userCode.includes('var ')) {
      checks.push('⚠️ Prefer `const` or `let` over `var` to avoid variable hoisting bugs.');
    }

    if (checks.length > 0) {
      return `### 🔍 Initial Diagnostic Findings\n\n${checks.join('\n\n')}\n\n**Specs:**\n${unit.practice.specs.map((s) => `- ${s}`).join('\n')}`;
    }

    return `### 🔍 Impartial Code Diagnosis for \`${unit.title}\`\n\nYour code looks on the right track structurally! Run **Run Tests & Verify** to see exact test output.`;
  }

  if (lower.includes('concept') || lower.includes('explain') || lower.includes('theory')) {
    return `### 💡 Core Concept: ${unit.title}\n\n${unit.theory.hook}\n\n**Deep Dive:**\n${unit.theory.deepDive}\n\n**Takeaway:**\n${unit.takeaway || 'Always ensure clean state boundaries.'}`;
  }

  if (lower.includes('edge') || lower.includes('case') || lower.includes('trap')) {
    return `### 🧪 Edge Cases for ${unit.title}\n\n1. **Boundary Values:** Empty collections, null/undefined properties.\n2. **Race Conditions:** Rapid triggers, stale closures, unmounted updates.\n3. **Cleanup:** Unsubscribing listeners, clearing timers.`;
  }

  if (lower.includes('interview') || lower.includes('pitch') || lower.includes('faang')) {
    return `### 🎯 Senior Interview Pitch for ${unit.title}\n\n${unit.theory.interviewPitch || `"In production, I separate concerns between data fetching, business logic, and presentation."`}`;
  }

  return `### 💡 Guiding Advice for ${unit.title}\n\n**Task:** ${unit.practice.task}\n\n**Hint:**\n${unit.hints && unit.hints.length > 0 ? unit.hints[0] : unit.theory.hook}`;
}
