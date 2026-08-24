const fs = require('fs');
const path = require('path');
const p = path.resolve('src/components/editor/extensions/emmet/jsxEmmet.ts');
let text = fs.readFileSync(p, 'utf-8');

// Replace the multiline simple tag expansion with inline expansion
const oldSimpleTag = `      // Simple tag (e.g. div.red)
      const insert = \`\${openTag}\\n\${childIndent}\\n\${baseIndent}\${closeTag}\`;
      const cursorTarget = startPos + openTag.length + 1 + childIndent.length;`;

const newSimpleTag = `      // Simple tag (e.g. div.red) -> INLINE expansion
      const insert = \`\${openTag}\${closeTag}\`;
      const cursorTarget = startPos + openTag.length;`;

text = text.replace(oldSimpleTag, newSimpleTag);

fs.writeFileSync(p, text, 'utf-8');
