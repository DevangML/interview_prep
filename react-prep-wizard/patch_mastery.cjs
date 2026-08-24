const fs = require('fs');
const p = 'src/data/masteryStream.ts';
let text = fs.readFileSync(p, 'utf-8');

// 1. Update MASTERY_TRACKS Type in interface
text = text.replace(
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis';",
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis' | 'js_traps' | 'react_ecosystem';"
);

// 2. Add the two new tracks to MASTERY_TRACKS array
const newTracks = `  { id: 'js_traps', name: 'JS Traps & Execution', icon: '🪤' },
  { id: 'css_layouts', name: 'CSS 2D Layouts', icon: '🥋' },
  { id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },
  { id: 'react_practical', name: 'React Machine Coding', icon: '🏗️' },
  { id: 'react_ecosystem', name: 'Ecosystem (Redux/Router)', icon: '📦' },`;

text = text.replace(
  /  { id: 'css_layouts', name: 'CSS 2D Layouts', icon: '🥋' },\n  { id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },\n  { id: 'react_practical', name: 'React Machine Coding', icon: '🏗️' },/,
  newTracks
);

// 3. Import the new arrays
text = `import { jsTrapsUnits } from './tracks/jsTraps';\nimport { ecosystemUnits } from './tracks/reactEcosystem';\n` + text;

// 4. Inject them into MASTERY_UNITS
text = text.replace(
  "...coreUnits,",
  "...coreUnits,\n  ...jsTrapsUnits,\n  ...ecosystemUnits,"
);

fs.writeFileSync(p, text, 'utf-8');
