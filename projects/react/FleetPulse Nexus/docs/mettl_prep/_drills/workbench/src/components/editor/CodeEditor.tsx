import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { EditorView, keymap } from '@codemirror/view';
import type { Command } from '@codemirror/view';
import { Prec, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { indentUnit, indentRange, indentOnInput, bracketMatching } from '@codemirror/language';
import { insertNewlineAndIndent, indentMore, indentLess } from '@codemirror/commands';
import {
  closeBrackets, closeBracketsKeymap, acceptCompletion, startCompletion,
} from '@codemirror/autocomplete';
import {
  abbreviationTracker, emmetCompletionSource, expandAbbreviation, wrapWithAbbreviation,
  enterAbbreviationMode,
  balanceInward, balanceOutward, selectNextItem, selectPreviousItem,
  goToNextEditPoint, goToPreviousEditPoint, goToTagPair, removeTag, splitJoinTag,
  evaluateMath, toggleComment as emmetToggleComment,
  incrementNumber1, decrementNumber1, incrementNumber01, decrementNumber01,
  incrementNumber10, decrementNumber10,
  EmmetKnownSyntax,
} from '@emmetio/codemirror6-plugin';
import { rainbowIndent } from './rainbowIndent';
import type { EditorMode } from '../../store';

type Lang = 'jsx' | 'css' | 'html';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  lang: Lang;
  readOnly?: boolean;
  className?: string;
  autoFocus?: boolean;
  /** practice = every assist on. exam = every assist the real one strips, stripped. */
  mode?: EditorMode;
  /** Runs on Shift-Alt-F / Mod-S — full-document Prettier pass. */
  onFormat?: () => void;
  /** Fires once per input transaction; feeds attempt telemetry. */
  onKeystroke?: () => void;
  /** Hands the live view out so the command palette can drive editor commands. */
  onEditorReady?: (view: EditorView) => void;
}

const langMap: Record<Lang, () => Extension> = {
  jsx: () => javascript({ jsx: true, typescript: false }),
  css: () => css(),
  html: () => html(),
};

const emmetSyntax: Record<Lang, EmmetKnownSyntax> = {
  jsx: EmmetKnownSyntax.jsx,
  css: EmmetKnownSyntax.css,
  html: EmmetKnownSyntax.html,
};

const baseTheme = EditorView.theme({
  '&': { fontSize: '13px', height: '100%' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: 'ui-monospace, Menlo, monospace', overflow: 'auto' },
  '.cm-content': { minHeight: '100%' },
  '.cm-gutters': { backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' },
  // The tracker's own class is `emmet-tracker`; styling `emmet-abbreviation`
  // (which does not exist) is why the underline was invisible.
  '.emmet-tracker': { borderBottom: '1px dashed #0284c7', backgroundColor: '#e0f2fe80' },
  '.emmet-preview': { fontSize: '12px', fontFamily: 'ui-monospace, Menlo, monospace' },
  '.emmet-wrap-with-abbreviation': { padding: '4px 6px' },
});

/** Exam mode looks different so you can never mistake which one you are in. */
const examTheme = EditorView.theme({
  '.cm-gutters': { backgroundColor: '#1e293b', color: '#94a3b8', borderRight: '1px solid #334155' },
  '.cm-activeLineGutter': { backgroundColor: '#334155' },
});

/**
 * Enter: re-indent the line being left, then break with correct indentation.
 * The line you just finished snaps into place instead of keeping whatever
 * indent you happened to type. Practice only — the real assessment does not
 * tidy up after you, so exam mode gets a plain newline.
 */
const formatOnEnter: Command = (view) => {
  const { state } = view;
  const line = state.doc.lineAt(state.selection.main.head);
  if (!state.readOnly) {
    const changes = indentRange(state, line.from, line.from);
    if (!changes.empty) view.dispatch({ changes, userEvent: 'format' });
  }
  return insertNewlineAndIndent(view);
};

/**
 * Tab expansion. The tracker's own Tab handler only fires while it is actively
 * tracking, which it often is not (JSX expression bodies, restored buffers), so
 * expansion is driven explicitly here. The `<` JSX prefix Emmet wants is removed
 * first — otherwise it survives the expansion as a stray character — and put
 * back if the abbreviation turns out not to be expandable.
 */
const emmetExpand: Command = (view) => {
  const { state } = view;
  const range = state.selection.main;
  if (!range.empty || state.readOnly) return false;
  const line = state.doc.lineAt(range.head);
  const before = line.text.slice(0, range.head - line.from);
  const m = /(\S+)$/.exec(before);
  if (!m) return false;
  const start = range.head - m[1].length;
  const prefixed = state.doc.sliceString(start, start + 1) === '<';
  if (prefixed) view.dispatch({ changes: { from: start, to: start + 1 }, userEvent: 'emmet' });
  if (expandAbbreviation(view)) return true;
  if (prefixed) view.dispatch({ changes: { from: start, insert: '<' }, userEvent: 'emmet' });
  return false;
};

/** The full Emmet command surface, straight from the package. */
function emmetKeymap(): Extension[] {
  return [
    // Ships its own prompt UI, so it is an extension rather than a command.
    wrapWithAbbreviation('Mod-Shift-a'),
    keymap.of([
    // Forces the tracker on at the cursor: live underline, live preview, and
    // Emmet's own completions. The tracker's automatic typing detection is
    // unreliable inside JSX expression bodies, so this is the deterministic way in.
    { key: 'Mod-e', run: enterAbbreviationMode },
    { key: 'Mod-d', run: balanceOutward },
    { key: 'Mod-Shift-d', run: balanceInward },
    { key: 'Mod-Shift-.', run: selectNextItem },
    { key: 'Mod-Shift-,', run: selectPreviousItem },
    { key: 'Mod-Alt-ArrowRight', run: goToNextEditPoint },
    { key: 'Mod-Alt-ArrowLeft', run: goToPreviousEditPoint },
    { key: 'Mod-Alt-t', run: goToTagPair },
    { key: 'Mod-Shift-k', run: removeTag },
    { key: "Mod-'", run: splitJoinTag },
    { key: 'Mod-Shift-y', run: evaluateMath },
    { key: 'Mod-/', run: emmetToggleComment },
    { key: 'Ctrl-ArrowUp', run: incrementNumber1 },
    { key: 'Ctrl-ArrowDown', run: decrementNumber1 },
    { key: 'Alt-ArrowUp', run: incrementNumber01 },
    { key: 'Alt-ArrowDown', run: decrementNumber01 },
    { key: 'Ctrl-Alt-ArrowUp', run: incrementNumber10 },
    { key: 'Ctrl-Alt-ArrowDown', run: decrementNumber10 },
    ]),
  ];
}

export default function CodeEditor({
  value,
  onChange,
  lang,
  readOnly = false,
  className = '',
  autoFocus = false,
  mode = 'practice',
  onFormat,
  onKeystroke,
  onEditorReady,
}: Props) {
  const exam = mode === 'exam';

  const extensions = useMemo(() => {
    const common: Extension[] = [
      langMap[lang](),
      baseTheme,
      indentUnit.of('  '),
      EditorState.tabSize.of(2),
      bracketMatching(),
      rainbowIndent(2),
      EditorView.updateListener.of((u) => {
        if (u.docChanged && onKeystroke) onKeystroke();
      }),
    ];

    if (exam) {
      return [
        ...common,
        examTheme,
        // No Emmet, no completion, no auto-close, no reformatting. Tab indents,
        // Enter breaks the line, and nothing writes code on your behalf.
        Prec.highest(keymap.of([
          { key: 'Tab', run: indentMore, shift: indentLess },
        ])),
      ];
    }

    return [
      ...common,
      indentOnInput(),
      closeBrackets(),
      // Emmet abbreviations offered as real completions, with previews, next to
      // the language's own — this is the package's completion source, not a
      // hand-rolled popup.
      EditorState.languageData.of(() => [{ autocomplete: emmetCompletionSource }]),
      abbreviationTracker({
        syntax: emmetSyntax[lang],
        mark: true,
        previewEnabled: true,
        autocompleteTab: true,
        bem: true,
        shortHex: true,
        attributeQuotes: 'double',
      }),
      ...emmetKeymap(),
      Prec.highest(keymap.of([
        ...closeBracketsKeymap,
        { key: 'Enter', run: (v) => acceptCompletion(v) || formatOnEnter(v) },
        { key: 'Tab', run: (v) => acceptCompletion(v) || emmetExpand(v) || indentMore(v), shift: indentLess },
        { key: 'Mod-i', run: startCompletion },
        { key: 'Shift-Alt-f', run: () => { onFormat?.(); return true; } },
        { key: 'Mod-s', run: () => { onFormat?.(); return true; }, preventDefault: true },
      ])),
    ];
  }, [lang, exam, onFormat, onKeystroke]);

  return (
    <div className={`flex-1 min-h-0 ${className}`}>
      <CodeMirror
        value={value}
        onChange={(val) => onChange?.(val)}
        onCreateEditor={(view) => onEditorReady?.(view)}
        extensions={extensions}
        readOnly={readOnly}
        autoFocus={autoFocus}
        theme={exam ? 'dark' : 'light'}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          bracketMatching: false,
          closeBrackets: false,
          autocompletion: !exam,
          indentOnInput: false,
          defaultKeymap: true,
        }}
        style={{ height: '100%' }}
      />
    </div>
  );
}
