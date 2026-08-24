const fs = require('fs');
let code = fs.readFileSync('preview.js', 'utf8');

code = code.replace(/scr\.src = 'vendor\/react\.js';/g, "scr.src = window.location.href.replace(/[^\\/]+$/, '') + 'vendor/react.js';");
code = code.replace(/scr2\.src = 'vendor\/react-dom\.js';/g, "scr2.src = window.location.href.replace(/[^\\/]+$/, '') + 'vendor/react-dom.js';");

fs.writeFileSync('preview.js', code);
console.log("Patched preview script paths!");
