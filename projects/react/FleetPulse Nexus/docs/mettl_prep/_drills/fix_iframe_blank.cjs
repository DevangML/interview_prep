const fs = require('fs');
let code = fs.readFileSync('preview.js', 'utf8');

const oldCheck = `  var d=this.fr.contentDocument, w=this.fr.contentWindow;
  if(!d||!w){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  var HARD='*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
  var b=d.getElementById('__base'), want=HARD+(baseCSS||'');`;

const newCheck = `  var d=this.fr.contentDocument, w=this.fr.contentWindow;
  if(!d||!w){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  // Safari/Firefox clears iframe DOM on display:none. If root is gone, we must reboot!
  if(this.mode==='react' && !d.getElementById('root')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  var HARD='*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
  var b=d.getElementById('__base'), want=HARD+(baseCSS||'');`;

code = code.replace(oldCheck, newCheck);
fs.writeFileSync('preview.js', code);
console.log("Patched preview.js iframe reset bug!");
