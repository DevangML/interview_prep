const fs = require('fs');
const path = require('path');
const p = path.resolve('src/components/editor/CodeEditor.tsx');
let text = fs.readFileSync(p, 'utf-8');

// Add import for emmetConfig
if (!text.includes('emmetConfig')) {
  text = text.replace(
    "import { emmetKeymapExtension } from './extensions/emmet/emmetKeymap';",
    "import { emmetKeymapExtension } from './extensions/emmet/emmetKeymap';\nimport { emmetConfig } from '@emmetio/codemirror6-plugin';"
  );
}

// Add emmetConfig to the extensions array
const emmetConfigStr = "      emmetConfig({ jsx: lang === 'jsx' }),\n      emmetKeymapExtension(lang),";
text = text.replace(
  "emmetKeymapExtension(lang),",
  emmetConfigStr
);

fs.writeFileSync(p, text, 'utf-8');
