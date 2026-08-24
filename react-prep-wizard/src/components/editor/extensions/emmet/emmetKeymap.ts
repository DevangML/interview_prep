import { keymap } from '@codemirror/view';
import type { EditorView, Command } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { acceptCompletion, completionStatus } from '@codemirror/autocomplete';
import { indentMore, indentLess, insertNewlineAndIndent } from '@codemirror/commands';
import { indentRange } from '@codemirror/language';
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { expandCssEmmet } from './cssEmmet';
import { expandJsxEmmet } from './jsxEmmet';

export function createUnifiedEnterCommand(lang: 'jsx' | 'css' | 'html'): Command {
  return (view: EditorView) => {
    const { state } = view;
    if (state.readOnly) return false;

    // 1. Accept completion if popup is active & item is highlighted
    if (completionStatus(state) === 'active') {
      if (acceptCompletion(view)) return true;
    }

    // 2. Direct Emmet expansion (JSX tags, classNames, CSS d:f, pos:a)
    if (lang === 'css' && expandCssEmmet(view)) return true;
    if ((lang === 'jsx' || lang === 'html') && expandJsxEmmet(view)) return true;

    // 3. Fallback to package expandAbbreviation
    try {
      if (expandAbbreviation(view)) return true;
    } catch {
      // ignore
    }

    // 4. Re-indent current line and insert indented newline
    const range = state.selection.main;
    const line = state.doc.lineAt(range.head);
    const changes = indentRange(state, line.from, line.from);
    if (!changes.empty) view.dispatch({ changes, userEvent: 'format' });
    return insertNewlineAndIndent(view);
  };
}

export function createUnifiedTabCommand(lang: 'jsx' | 'css' | 'html'): Command {
  return (view: EditorView) => {
    const { state } = view;
    if (state.readOnly) return false;

    // 1. Accept completion if active
    if (completionStatus(state) === 'active') {
      if (acceptCompletion(view)) return true;
    }

    // 2. Direct Emmet expansion
    if (lang === 'css' && expandCssEmmet(view)) return true;
    if ((lang === 'jsx' || lang === 'html') && expandJsxEmmet(view)) return true;

    // 3. Package expansion
    try {
      if (expandAbbreviation(view)) return true;
    } catch {
      // ignore
    }

    // 4. Indent
    return indentMore(view);
  };
}

export function emmetKeymapExtension(lang: 'jsx' | 'css' | 'html') {
  return Prec.highest(
    keymap.of([
      { key: 'Enter', run: createUnifiedEnterCommand(lang) },
      { key: 'Tab', run: createUnifiedTabCommand(lang), shift: indentLess },
    ]),
  );
}
