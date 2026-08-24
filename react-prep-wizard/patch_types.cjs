const fs = require('fs');
let types = fs.readFileSync('src/data/tracks/types.ts', 'utf-8');

types = types.replace(
  "| 'js_traps' | 'react_ecosystem';",
  "| 'js_traps' | 'react_ecosystem' | 'js_practical';"
);
fs.writeFileSync('src/data/tracks/types.ts', types, 'utf-8');
