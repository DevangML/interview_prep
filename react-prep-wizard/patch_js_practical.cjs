const fs = require('fs');
let text = fs.readFileSync('src/data/masteryStream.ts', 'utf-8');

// 1. Add 'js_practical' to trackId union
text = text.replace(
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis' | 'js_traps' | 'react_ecosystem';",
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis' | 'js_traps' | 'react_ecosystem' | 'js_practical';"
);

// 2. Add to MASTERY_TRACKS
text = text.replace(
  "{ id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },",
  "{ id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },\n  { id: 'js_practical', name: 'Vanilla JS Machine Coding', icon: '🛠️' },"
);

// 3. Add Import
text = "import { jsPracticalUnits } from './tracks/jsPractical';\n" + text;

// 4. Inject into MASTERY_UNITS
text = text.replace(
  "...coreUnits,",
  "...coreUnits,\n  ...jsPracticalUnits,"
);

fs.writeFileSync('src/data/masteryStream.ts', text, 'utf-8');
