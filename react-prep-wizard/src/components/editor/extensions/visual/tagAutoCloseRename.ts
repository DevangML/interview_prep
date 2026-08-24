import { EditorState, Transaction } from '@codemirror/state';
import type { ChangeSpec } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

export const autoCloseJSXTags = EditorState.transactionFilter.of((tr: Transaction) => {
  if (!tr.docChanged || tr.annotation(Transaction.userEvent) !== 'input.type') return tr;

  const changes: ChangeSpec[] = [];
  tr.changes.iterChanges((_fromA, _toA, _fromB, toB, inserted) => {
    if (inserted.toString() === '>') {
      const line = tr.newDoc.lineAt(toB);
      const textBefore = line.text.slice(0, toB - line.from);
      const match = textBefore.match(/<([a-zA-Z0-9_-]+)(?:\s+[^>]*)?>$/);

      if (match && !textBefore.endsWith('/>')) {
        const tagName = match[1];
        if (!VOID_TAGS.has(tagName.toLowerCase())) {
          changes.push({ from: toB, insert: `</${tagName}>` });
        }
      }
    }
  });

  return changes.length > 0 ? [tr, { changes, userEvent: 'tag.autoclose' }] : tr;
});

export const activePairTheme = EditorView.theme({
  '.cm-matchingBracket': {
    backgroundColor: 'rgba(2, 132, 199, 0.25) !important',
    outline: '1px solid #38bdf8 !important',
    color: '#0284c7 !important',
    fontWeight: 'bold',
    borderRadius: '2px',
  },
  '.cm-nonmatchingBracket': {
    backgroundColor: 'rgba(239, 68, 68, 0.25) !important',
    outline: '1px solid #ef4444 !important',
    color: '#ef4444 !important',
  },
});
