const fs = require('fs');
let types = fs.readFileSync('src/data/tracks/types.ts', 'utf-8');

types = types.replace(
  "| 'js_traps' | 'react_ecosystem';",
  "| 'js_traps' | 'react_ecosystem' | 'js_practical';"
);
types = types.replace(
  "{ id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },",
  "{ id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },\n  { id: 'js_practical', name: 'Vanilla JS Machine Coding', icon: '🛠️' },"
);
fs.writeFileSync('src/data/tracks/types.ts', types, 'utf-8');

let mastery = fs.readFileSync('src/data/masteryStream.ts', 'utf-8');
mastery = mastery.replace(
  "import { jsTrapsUnits } from './tracks/jsTraps';",
  "import { jsTrapsUnits } from './tracks/jsTraps';\nimport { jsPracticalUnits } from './tracks/jsPractical';"
);
mastery = mastery.replace(
  "...jsTrapsUnits,",
  "...jsPracticalUnits,\n  ...jsTrapsUnits,"
);
fs.writeFileSync('src/data/masteryStream.ts', mastery, 'utf-8');
