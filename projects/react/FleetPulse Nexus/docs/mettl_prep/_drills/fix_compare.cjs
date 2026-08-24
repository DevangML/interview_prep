const fs = require('fs');
let code = fs.readFileSync('c100.js', 'utf8');

const oldCode = `      Promise.all([
        COMPILE.compileAsync(markup),
        COMPILE.compileAsync(markup)
      ]).then(function(res) {
        if (runId !== CURRENT_RUN) return;
        var rBefore = res[0];
        var rAfter = res[1];`;

const newCode = `      COMPILE.compileAsync(markup).then(function(rBefore) {
        if (runId !== CURRENT_RUN) return;
        var rAfter = rBefore;`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('c100.js', code);
console.log("Patched compareMode!");
