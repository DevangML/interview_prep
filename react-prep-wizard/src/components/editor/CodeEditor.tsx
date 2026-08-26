import { useMemo, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { EditorView, keymap } from '@codemirror/view';
import { Prec, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { indentUnit, indentOnInput, bracketMatching } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';
import { search, searchKeymap } from '@codemirror/search';

import { rainbowIndent } from './rainbowIndent';
import { aiDiagnostics, setAiFindings, clearAiFindings } from './extensions/aiDiagnostics';
import type { AnchoredFinding } from '../../lib/anchorFindings';
import { cssCompletionSource } from './extensions/autocomplete/cssAutocomplete';
import { jsxCompletionSource } from './extensions/autocomplete/jsxAutocomplete';
import { emmetKeymapExtension } from './extensions/emmet/emmetKeymap';
import { emmetConfig } from '@emmetio/codemirror6-plugin';
import { hoverDocumentation } from './extensions/tooltips/hoverDoc';
import { cssLinter } from './extensions/diagnostics/cssLinter';
import { colorPreviewExtension } from './extensions/colorPreview';
import { autoCloseJSXTags, activePairTheme } from './extensions/visual/tagAutoCloseRename';
import { getVimExtension, setupVimCommands } from './extensions/vim/vimExtension';
import VimStatusBar from './VimStatusBar';
import { useStore } from '../../store';
import type { EditorMode } from '../../store';

type Lang = 'jsx' | 'js' | 'css' | 'html';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  lang: Lang;
  readOnly?: boolean;
  className?: string;
  autoFocus?: boolean;
  mode?: EditorMode;
  onFormat?: () => void;
  onKeystroke?: () => void;
  onEditorReady?: (view: EditorView) => void;
  /** Line-anchored AI findings; rendered where the mistake is, not in a panel. */
  aiFindings?: AnchoredFinding[];
}

const editorTheme = EditorView.theme({
  '&': { fontSize: '13px', height: '100%' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: 'ui-monospace, Menlo, Monaco, "Cascadia Code", monospace', overflow: 'auto' },
  '.cm-content': { minHeight: '100%', padding: '4px 0' },
  '.cm-gutters': { backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', color: '#64748b' },
  '.cm-activeLine': { backgroundColor: 'rgba(2, 132, 199, 0.04)' },
  '.cm-activeLineGutter': { backgroundColor: '#e2e8f0', color: '#0f172a', fontWeight: 'bold' },
  '.cm-tooltip-autocomplete': { backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)' },
  '.cm-tooltip-autocomplete > ul > li': { padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': { backgroundColor: '#0284c7', color: '#ffffff' },
  '.cm-completionDetail': { opacity: 0.7, fontStyle: 'italic', marginLeft: '6px' },
});

export default function CodeEditor({
  value, onChange, lang, readOnly = false, className = '',
  autoFocus = false, mode = 'practice', onFormat, onKeystroke, onEditorReady,
  aiFindings,
}: Props) {
  const viewRef = useRef<EditorView | null>(null);
    const onFormatRef = useRef(onFormat);
  const onKeystrokeRef = useRef(onKeystroke);
  
  useEffect(() => {
    onFormatRef.current = onFormat;
    onKeystrokeRef.current = onKeystroke;
  }, [onFormat, onKeystroke]);
  const exam = mode === 'exam';
  const { vimMode, suggestionsOn } = useStore();

  useEffect(() => {
    setupVimCommands(() => onFormatRef.current?.());
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: aiFindings?.length ? setAiFindings.of(aiFindings) : clearAiFindings.of(null),
    });
  }, [aiFindings]);

  const extensions = useMemo(() => {
    const common: Extension[] = [
      (lang === 'jsx' || lang === 'js') ? javascript({ jsx: true, typescript: false }) : lang === 'css' ? css() : html(),
      editorTheme,
      // The AI verdict belongs on the offending line, not in a side panel.
      ...aiDiagnostics(),
      EditorView.lineWrapping,
      indentUnit.of('  '),
      EditorState.tabSize.of(2),
      bracketMatching(),
      activePairTheme,
      rainbowIndent(2),
      colorPreviewExtension,
      search({ top: true }),
      getVimExtension(vimMode && !readOnly),
      EditorView.updateListener.of((u) => {
        if (u.docChanged && onKeystrokeRef.current) onKeystrokeRef.current();
      }),
    ];

    if (exam) return common;

    return [
      ...common,
      indentOnInput(),
      closeBrackets(),
      autoCloseJSXTags,
      hoverDocumentation(),
      lintGutter(),
      lang === 'css' ? cssLinter : [],
      EditorState.languageData.of(() => [{
        autocomplete: suggestionsOn ? (lang === 'css' ? cssCompletionSource : jsxCompletionSource) : undefined,
      }]),
            emmetConfig.of({ syntax: lang as any }),
      emmetKeymapExtension(lang),
      Prec.highest(keymap.of([
        ...closeBracketsKeymap,
        ...searchKeymap,
        { key: 'Shift-Alt-f', run: () => { onFormatRef.current?.(); return true; } },
        { key: 'Mod-s', run: () => { onFormatRef.current?.(); return true; }, preventDefault: true },
      ])),
    ];
  }, [lang, exam, vimMode, suggestionsOn, readOnly]);

  return (
    <div className={`flex flex-col flex-1 min-h-0 relative ${className}`}>
      <div className="flex-1 min-h-0">
        <CodeMirror
          value={value}
          onChange={(val) => onChange?.(val)}
          onCreateEditor={(view) => { viewRef.current = view; onEditorReady?.(view); }}
          extensions={extensions}
          readOnly={readOnly}
          autoFocus={autoFocus}
          theme="light"
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            bracketMatching: false,
            closeBrackets: false,
            autocompletion: !exam && suggestionsOn,
            indentOnInput: false,
            defaultKeymap: true,
          }}
          style={{ height: '100%' }}
        />
      </div>
      <VimStatusBar />
    </div>
  );
}
