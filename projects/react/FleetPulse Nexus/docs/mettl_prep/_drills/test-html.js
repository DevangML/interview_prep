const fs = require('fs');
const html = fs.readFileSync('css100.html', 'utf8');
console.log(html.match(/editor\.js\?v=\d+/)[0]);
