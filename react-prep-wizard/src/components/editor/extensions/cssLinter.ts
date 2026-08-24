import { linter } from '@codemirror/lint';
import type { Diagnostic } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';

export const cssLinter = linter((view: EditorView) => {
  const diagnostics: Diagnostic[] = [];
  const text = view.state.doc.toString();
  const lines = text.split('\n');

  let openBraces = 0;
  let inRule = false;

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    const lineStart = view.state.doc.line(lineIdx + 1).from;

    // Check for unmatched closing brace
    if (trimmed.includes('}')) {
      if (openBraces === 0) {
        diagnostics.push({
          from: lineStart + line.indexOf('}'),
          to: lineStart + line.indexOf('}') + 1,
          severity: 'error',
          message: 'Unexpected closing brace "}"',
        });
      } else {
        openBraces--;
        inRule = openBraces > 0;
      }
    }

    if (trimmed.includes('{')) {
      openBraces++;
      inRule = true;
    }

    // Inside a rule: check for missing colons on property-like lines
    if (inRule && trimmed && !trimmed.startsWith('/*') && !trimmed.endsWith('{') && !trimmed.startsWith('}')) {
      if (!trimmed.includes(':') && !trimmed.endsWith(';')) {
        diagnostics.push({
          from: lineStart,
          to: lineStart + line.length,
          severity: 'warning',
          message: 'CSS declaration is missing a colon or semicolon',
        });
      }
    }
  });

  if (openBraces > 0) {
    const lastLine = view.state.doc.line(lines.length);
    diagnostics.push({
      from: lastLine.from,
      to: lastLine.to,
      severity: 'error',
      message: `Unclosed CSS block (${openBraces} missing "}")`,
    });
  }

  return diagnostics;
});
