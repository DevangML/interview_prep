const fs = require('fs');
let code = fs.readFileSync('c100.js', 'utf8');

// Function to safely inject focus
const focusCode = `\n    if(window.EDITOR && EDITOR.ready){ var cm=EDITOR.of($('#jsx')); if(cm) cm.focus(); }`;

// Inject into #vtab-live
code = code.replace(/(\$\('#vtab-live'\)\.onclick=function\(\)\{[\s\S]*?run\(\);)/, `$1${focusCode}`);

// Inject into #vtab-compare
code = code.replace(/(\$\('#vtab-compare'\)\.onclick=function\(\)\{[\s\S]*?run\(\);)/, `$1${focusCode}`);

// Inject into #hudbtn
code = code.replace(/(\$\('#hudbtn'\)\.onclick=function\(\)\{[\s\S]*?\}\n  \};)/, `$1${focusCode}`);

// Inject into #measurebtn
code = code.replace(/(\$\('#measurebtn'\)\.onclick=function\(\)\{[\s\S]*?\}\n  \};)/, `$1${focusCode}`);

fs.writeFileSync('c100.js', code);
console.log("Patched button clicks!");
