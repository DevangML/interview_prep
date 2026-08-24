import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';

type Lang = 'jsx' | 'css' | 'html';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  lang: Lang;
  readOnly?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const langMap = {
  jsx: () => javascript({ jsx: true, typescript: false }),
  css: () => css(),
  html: () => html(),
};

const baseTheme = EditorView.theme({
  '&': { fontSize: '13px', height: '100%' },
  '.cm-scroller': { fontFamily: 'ui-monospace, Menlo, monospace', overflow: 'auto' },
  '.cm-content': { minHeight: '100%' },
  '.cm-gutters': { backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' },
});

export default function CodeEditor({
  value,
  onChange,
  lang,
  readOnly = false,
  className = '',
  autoFocus = false,
}: Props) {
  const handleChange = useCallback(
    (val: string) => { onChange?.(val); },
    [onChange],
  );

  return (
    <div className={`flex-1 min-h-0 ${className}`}>
      <CodeMirror
        value={value}
        onChange={handleChange}
        extensions={[langMap[lang](), baseTheme]}
        readOnly={readOnly}
        autoFocus={autoFocus}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          indentOnInput: true,
        }}
        style={{ height: '100%' }}
      />
    </div>
  );
}
