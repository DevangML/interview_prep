const fs = require('fs');
let code = fs.readFileSync('c100.js', 'utf8');

const target = `    if(r.error){ fail(r.error); return; }
    ok();
    var base = (cur.useApp===false) ? '*,*::before,*::after{box-sizing:border-box}' : APP;`;

const replacement = `    var base = (cur.useApp===false) ? '*,*::before,*::after{box-sizing:border-box}' : APP;
    if(r.error){ 
      fail(r.error);
      // Still show compare mode for before/after even if mine has syntax error
      if(compareMode) {
        if(!PV_BEFORE) PV_BEFORE = new Preview($('#out_before'), { mode: 'react' });
        if(!PV_AFTER) PV_AFTER = new Preview($('#out_after'), { mode: 'react' });
        if(!PV_MINE) PV_MINE = new Preview($('#out_mine'), { mode: 'react' });
        
        var afterCss = cur.css.replace(/^.*TODO.*$/m, cur.sol || '');
        var markup = "import React from 'react';\\nexport default function App(){\\n  return (\\n" + (cur.markup || '<div/>') + "\\n  );\\n}";
        
        COMPILE.compileAsync(markup).then(function(rBefore) {
          if (runId !== CURRENT_RUN) return;
          PV_BEFORE.update(base + '\\n' + cur.css, '', null, rBefore.code || '');
          PV_AFTER.update(base + '\\n' + afterCss, '', null, rBefore.code || '');
          // Leave mine as is or blank
          PV_MINE.update(base + '\\n' + $('#css').value, '', null, '');
        });
      }
      return; 
    }
    ok();`;

code = code.replace(target, replacement);
fs.writeFileSync('c100.js', code);
console.log("Patched c100.js error handling for compare mode");
