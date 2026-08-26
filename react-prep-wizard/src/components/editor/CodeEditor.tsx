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
import { aiDiagnosticsExtension, setAiFindings, clearAiFindings } from './extensions/aiDiagnostics';
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
import { cyberpunkObsidianExtension } from './extensions/cyberpunkTheme';
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
  aiFindings?: AnchoredFinding[];
  /** Accessible name for the editor. CodeMirror renders a `role="textbox"`
   *  element, which is unusable with a screen reader unless it is named. */
  ariaLabel?: string;
}

export default function CodeEditor({
  value, onChange, lang, readOnly = false, className = '',
  autoFocus = false, mode = 'practice', onFormat, onKeystroke, onEditorReady,
  aiFindings, ariaLabel,
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
      ...cyberpunkObsidianExtension,
      ...aiDiagnosticsExtension(),
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
      EditorView.contentAttributes.of({
        'aria-label': ariaLabel ?? `${lang.toUpperCase()} code editor`,
      }),
      emmetConfig.of({ syntax: lang as any }),
      emmetKeymapExtension(lang),
      Prec.highest(keymap.of([
        ...closeBracketsKeymap,
        ...searchKeymap,
        { key: 'Shift-Alt-f', run: () => { onFormatRef.current?.(); return true; } },
        { key: 'Mod-s', run: () => { onFormatRef.current?.(); return true; }, preventDefault: true },
      ])),
    ];
  }, [lang, exam, vimMode, suggestionsOn, readOnly, ariaLabel]);

  return (
    <div className={`flex flex-col flex-1 min-h-0 relative bg-slate-950 ${className}`}>
      <div className="flex-1 min-h-0 bg-slate-950">
        <CodeMirror
          value={value}
          onChange={(val) => onChange?.(val)}
          onCreateEditor={(view) => { viewRef.current = view; onEditorReady?.(view); }}
          extensions={extensions}
          readOnly={readOnly}
          autoFocus={autoFocus}
          theme="dark"
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
