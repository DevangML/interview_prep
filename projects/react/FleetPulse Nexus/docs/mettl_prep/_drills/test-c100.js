const fs = require('fs');
let code = fs.readFileSync('c100.js', 'utf8');
console.log(code.includes('runId !== CURRENT_RUN'));
