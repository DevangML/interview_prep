const fs = require('fs');
let code = fs.readFileSync('preview.js', 'utf8');

const oldCheck = `  // Safari/Firefox clears iframe DOM on display:none. If root is gone, we must reboot!
  if(this.mode==='react' && !d.getElementById('root')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }`;

const newCheck = `  // Safari/Firefox clears iframe DOM on display:none. If root is gone, we must reboot!
  if(this.mode==='react' && !d.getElementById('root')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  if(this.mode!=='react' && !d.getElementById('__base')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }`;

code = code.replace(oldCheck, newCheck);
fs.writeFileSync('preview.js', code);
console.log("Patched preview.js iframe reset bug for all modes!");
