const fs = require('fs');
const text = fs.readFileSync('src/data/masteryStream.ts', 'utf-8');
const blocks = text.split(/^const /m);
console.log(blocks.map(b => b.substring(0, 30)));
