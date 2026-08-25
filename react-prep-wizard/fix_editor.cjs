const fs = require('fs');
const path = require('path');

const file = path.join('src', 'components', 'editor', 'CodeEditor.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { useMemo, useEffect } from 'react';", "import { useMemo, useEffect, useRef } from 'react';");

const setupRefs = `  const onFormatRef = useRef(onFormat);
  const onKeystrokeRef = useRef(onKeystroke);
  
  useEffect(() => {
    onFormatRef.current = onFormat;
    onKeystrokeRef.current = onKeystroke;
  }, [onFormat, onKeystroke]);`;

content = content.replace("const exam = mode === 'exam';", setupRefs + "\n  const exam = mode === 'exam';");

content = content.replace("if (u.docChanged && onKeystroke) onKeystroke();", "if (u.docChanged && onKeystrokeRef.current) onKeystrokeRef.current();");

content = content.replace("{ key: 'Shift-Alt-f', run: () => { onFormat?.(); return true; } },", "{ key: 'Shift-Alt-f', run: () => { onFormatRef.current?.(); return true; } },");
content = content.replace("{ key: 'Mod-s', run: () => { onFormat?.(); return true; }, preventDefault: true },", "{ key: 'Mod-s', run: () => { onFormatRef.current?.(); return true; }, preventDefault: true },");

content = content.replace("}, [lang, exam, vimMode, suggestionsOn, readOnly, onFormat, onKeystroke]);", "}, [lang, exam, vimMode, suggestionsOn, readOnly]);");

fs.writeFileSync(file, content);
console.log('Fixed CodeEditor.tsx');
