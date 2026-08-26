import { keymap } from '@codemirror/view';
import type { EditorView, Command } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { acceptCompletion, completionStatus } from '@codemirror/autocomplete';
import { indentMore, indentLess, insertNewlineAndIndent } from '@codemirror/commands';
import { indentRange } from '@codemirror/language';
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';

function handleTagSplit(view: EditorView): boolean {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from !== to || state.readOnly) return false;

  const line = state.doc.lineAt(from);
  const textBefore = line.text.slice(0, from - line.from);
  const textAfter = line.text.slice(from - line.from);
  const baseIndentMatch = line.text.match(/^(\s*)/);
  const baseIndent = baseIndentMatch ? baseIndentMatch[1] : '';

  const tagMatchBefore = textBefore.match(/<([a-zA-Z0-9_-]+)[^>]*>$/);
  const tagMatchAfter = textAfter.match(/^<\/([a-zA-Z0-9_-]+)>/);
  
  if (tagMatchBefore && tagMatchAfter && tagMatchBefore[1] === tagMatchAfter[1]) {
    const nextIndent = baseIndent + '  ';
    const insert = `\n${nextIndent}\n${baseIndent}`;
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + 1 + nextIndent.length },
      userEvent: 'emmet.split',
    });
    return true;
  }
  
  return false;
}

export function createUnifiedEnterCommand(): Command {
  return (view: EditorView) => {
    const { state } = view;
    if (state.readOnly) return false;

    // 1. Accept completion if popup is active & item is highlighted
    if (completionStatus(state) === 'active') {
      if (acceptCompletion(view)) return true;
    }

    // 2. Tag Splitting: <tag>|</tag> + Enter
    if (handleTagSplit(view)) return true;

    // 3. Fallback to package expandAbbreviation on enter
    try {
      if (expandAbbreviation(view)) return true;
    } catch {
      // ignore
    }

    // 4. Default: Re-indent current line and insert indented newline
    const range = state.selection.main;
    const line = state.doc.lineAt(range.head);
    const changes = indentRange(state, line.from, line.from);
    if (!changes.empty) view.dispatch({ changes, userEvent: 'format' });
    return insertNewlineAndIndent(view);
  };
}

export function createUnifiedTabCommand(): Command {
  return (view: EditorView) => {
    const { state } = view;
    if (state.readOnly) return false;

    // 1. Accept completion if active
    if (completionStatus(state) === 'active') {
      if (acceptCompletion(view)) return true;
    }

    // 2. Emmet Package expansion
    try {
      if (expandAbbreviation(view)) return true;
    } catch {
      // ignore
    }

    // 3. Indent
    return indentMore(view);
  };
}

export function emmetKeymapExtension(lang?: 'jsx' | 'css' | 'html' | 'js') {
  return Prec.highest(
    keymap.of([
      { key: 'Enter', run: createUnifiedEnterCommand() },
      { key: 'Tab', run: createUnifiedTabCommand(), shift: indentLess },
    ]),
  );
}
