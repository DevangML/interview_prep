const fs = require('fs');

for (const f of ['src/pages/MasteryPage.tsx', 'src/pages/PlaygroundPage.tsx']) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/import { useDebouncedCallback } from 'use-debounce';\n?/g, '');
  c = c.replace(/  const debouncedFormat = useDebouncedCallback\(\(\) => \{\n    handleFormat\(\);\n  \}, 800\);\n\n?/g, '');
  fs.writeFileSync(f, c);
}
console.log('Cleaned');
