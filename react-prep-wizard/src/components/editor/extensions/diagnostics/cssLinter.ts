import { linter } from '@codemirror/lint';
import type { Diagnostic } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { isKnownCssProperty } from '../cssProperties';

/**
 * CSS diagnostics.
 *
 * Previously validated against a hand-written set of ~68 property names, which
 * did not include `box-sizing` — so the app's own first drill was told its
 * subject was a typo. Validation now asks the browser (see `cssProperties.ts`),
 * which cannot fall out of date.
 *
 * Two further rules, both learned from that failure:
 *
 * 1. **An unknown property is a warning, never an error.** The linter is not
 *    more authoritative than the engine; if it is unsure, it must say so
 *    quietly. A red error that is wrong costs more than a missing warning.
 *
 * 2. **Do not report the mess you are standing in.** Half-typed CSS parses as a
 *    syntax error on almost every keystroke. Errors touching the cursor are
 *    suppressed — you already know that line is unfinished; you are writing it.
 */
export const cssLinter = linter((view: EditorView): Diagnostic[] => {
  const diagnostics: Diagnostic[] = [];
  const { state } = view;
  const tree = syntaxTree(state);
  const cursor = state.selection.main.head;

  tree.iterate({
    enter: (node) => {
      if (node.name === 'PropertyName') {
        const prop = state.doc.sliceString(node.from, node.to).trim();
        if (!isKnownCssProperty(prop)) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: 'warning',
            message: `"${prop}" is not a property this browser recognises. Check the spelling, or ignore this if it is intentional.`,
          });
        }
      }

      if (node.type.isError) {
        // The line under the caret is being written, not broken.
        const touchesCursor = cursor >= node.from - 1 && cursor <= node.to + 1;
        if (touchesCursor) return;
        diagnostics.push({
          from: node.from,
          to: Math.max(node.to, node.from + 1),
          severity: 'error',
          message: 'CSS syntax error: check for a missing colon, semicolon or brace.',
        });
      }
    },
  });

  return diagnostics;
}, { delay: 400 });
