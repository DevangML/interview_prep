const fs = require('fs');
let code = fs.readFileSync('c100.js', 'utf8');
console.log("Has CURRENT_RUN?", code.includes('CURRENT_RUN'));
