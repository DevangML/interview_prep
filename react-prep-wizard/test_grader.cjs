const fs = require('fs');
const code = fs.readFileSync('src/data/css100.ts', 'utf8');

// Find FLEX-11
const lines = code.split('\n');
const idx = lines.findIndex(l => l.includes('"FLEX-11"'));
console.log(lines.slice(idx, idx + 20).join('\n'));
