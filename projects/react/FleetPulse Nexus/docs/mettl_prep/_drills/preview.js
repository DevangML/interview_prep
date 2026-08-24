/* Stable live preview: build the iframe document ONCE, then patch it in place.
   CSS edits swap a <style> node. React edits re-render into the SAME root.
   No srcdoc reassignment => no white flash, no scroll jump, no script re-download. */
(function(){
function Preview(iframe, opts){
  opts=opts||{};
  this.fr=iframe; this.mode=opts.mode||'css';     // 'css' | 'react'
  this.ready=false; this.queued=null; this.booted=false;
  var f=this.fr;
  f.style.transition='opacity 140ms ease';
  f.style.opacity='1';
}
Preview.prototype._boot=function(baseCSS, userCSS, html, cb){
  var self=this, f=this.fr;
  var react = this.mode==='react';
  var doc='<!doctype html><html><head><meta charset="utf-8">'
    +'<style id="__base">*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}'+(baseCSS||'')+'</style>'
    +'<style id="__user">'+(userCSS||'')+'</style>'
    +'<style>#root,body{transition:opacity 120ms ease}</style></head><body>'
    +(react?'<div id="root"></div>':(html||''))
    +(react?'<scr'+'ipt src="vendor/react.js"></scr'+'ipt><scr'+'ipt src="vendor/react-dom.js"></scr'+'ipt>':'')
    +'</body></html>';
  f.addEventListener('load', function onl(){
    f.removeEventListener('load', onl);
    self.ready=true; self.booted=true;
    if(react){
      var w=f.contentWindow;
      w.onerror=function(m){ if(self.onerror) self.onerror({message:String(m)}); };
      w.__root = w.ReactDOM.createRoot(f.contentDocument.getElementById('root'));
    }
    if(cb) cb();
    if(self.queued){ var q=self.queued; self.queued=null; self.update(q.base,q.css,q.html,q.code); }
  });
  f.srcdoc=doc;
};
Preview.prototype.update=function(baseCSS, userCSS, html, code){
  if(!this.booted){ this.queued={base:baseCSS,css:userCSS,html:html,code:code}; this._boot(baseCSS,userCSS,html); return; }
  if(!this.ready){ this.queued={base:baseCSS,css:userCSS,html:html,code:code}; return; }
  var d=this.fr.contentDocument, w=this.fr.contentWindow;
  if(!d||!w){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  var HARD='*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
  var b=d.getElementById('__base'), want=HARD+(baseCSS||'');
  if(b && b.textContent!==want) b.textContent=want;   // != not indexOf: a SHORTER base must win too
  var u=d.getElementById('__user'); if(u) u.textContent=userCSS||'';      // ← CSS: one text swap, zero reload
  if(this.mode==='react'){
    if(!w.__root){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
    var R=w.React;
    try{
      // the compiled file already resolves its own imports against React
      var fn=new w.Function('React','ReactDOM', code)(R, w.ReactDOM);
      // Re-render into the SAME root and the SAME document: React diffs the DOM instead of
      // the browser rebuilding the page. No reload, no white flash, no scroll jump.
      // (Component identity changes each edit, so useState resets — same as any playground.)
      w.__root.render(R.createElement(fn));
      this.error=null;
    }catch(e){ this.error=e; if(this.onerror) this.onerror(e); return; }
  }else if(html!=null && d.body && d.body.getAttribute('data-h')!==html){
    d.body.setAttribute('data-h',html); d.body.innerHTML=html;
  }
  if(this.onok) this.onok();
};
Preview.prototype.showError=function(msg){
  if(this.onerror) this.onerror({message:msg});
};
Preview.prototype.reset=function(){ this.booted=false; this.ready=false; };
window.Preview=Preview;
})();
