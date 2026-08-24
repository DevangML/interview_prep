/* Stable live preview: build the iframe document ONCE, then patch it in place.
   CSS edits swap a <style> node. React edits re-render into the SAME root.
   No script tags in iframe => zero extension CSP conflicts, zero reload, zero white flash. */
(function(){
function Preview(iframe, opts){
  opts=opts||{};
  this.fr=iframe; this.mode=opts.mode||'css';
  this.ready=false; this.queued=null; this.booted=false;
  var f=this.fr;
  f.style.transition='opacity 140ms ease';
  f.style.opacity='1';
}
Preview.prototype._boot=function(baseCSS, userCSS, html, cb){
  var self=this, f=this.fr;
  var react = this.mode==='react';
  
  var d = null;
  try {
    d = f.contentDocument || (f.contentWindow && f.contentWindow.document);
  } catch(e){}

  var doc='<!doctype html><html><head><meta charset="utf-8">'
    +'<style id="__base">*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}'+(baseCSS||'')+'</style>'
    +'<style id="__user">'+(userCSS||'')+'</style>'
    +'<style>#root,body{transition:opacity 120ms ease}</style></head><body>'
    +(react?'<div id="root"></div>':(html||''))
    +'</body></html>';

  if(d && typeof d.open === 'function'){
    try {
      d.open();
      d.write(doc);
      d.close();
      self.ready=true; self.booted=true;
      if(react){
        var w=f.contentWindow;
        w.React = window.React || (window.parent && window.parent.React);
        w.ReactDOM = window.ReactDOM || (window.parent && window.parent.ReactDOM);
        w.onerror=function(m){ if(self.onerror) self.onerror({message:String(m)}); };
        if(w.ReactDOM && w.ReactDOM.createRoot && d.getElementById('root')){
          w.__root = w.ReactDOM.createRoot(d.getElementById('root'));
        }
      }
      if(cb) cb();
      if(self.queued){ var q=self.queued; self.queued=null; self.update(q.base,q.css,q.html,q.code); }
      return;
    } catch(err){}
  }

  // Fallback to srcdoc if direct write fails
  f.addEventListener('load', function onl(){
    f.removeEventListener('load', onl);
    self.ready=true; self.booted=true;
    if(react){
      var w=f.contentWindow;
      w.React = window.React || (window.parent && window.parent.React);
      w.ReactDOM = window.ReactDOM || (window.parent && window.parent.ReactDOM);
      w.onerror=function(m){ if(self.onerror) self.onerror({message:String(m)}); };
      if(w.ReactDOM && w.ReactDOM.createRoot && f.contentDocument && f.contentDocument.getElementById('root')){
        w.__root = w.ReactDOM.createRoot(f.contentDocument.getElementById('root'));
      }
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
  // Safari/Firefox clears iframe DOM on display:none. If root is gone, we must reboot!
  if(this.mode==='react' && !d.getElementById('root')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  if(this.mode!=='react' && !d.getElementById('__base')){ this.booted=false; this._boot(baseCSS,userCSS,html); return; }
  var HARD='*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
  var b=d.getElementById('__base'), want=HARD+(baseCSS||'');
  if(b && b.textContent!==want) b.textContent=want;
  var u=d.getElementById('__user'); if(u) u.textContent=userCSS||'';
  if(this.mode==='react'){
    if(!w.__root){
      if(!w.ReactDOM){
        w.React = window.React || (window.parent && window.parent.React);
        w.ReactDOM = window.ReactDOM || (window.parent && window.parent.ReactDOM);
      }
      if(w.ReactDOM && w.ReactDOM.createRoot && d.getElementById('root')){
        w.__root = w.ReactDOM.createRoot(d.getElementById('root'));
      } else {
        this.booted=false; this._boot(baseCSS,userCSS,html); return;
      }
    }
    var R=w.React || window.React;
    try{
      var fn=new w.Function('React','ReactDOM', code)(R, w.ReactDOM || window.ReactDOM);
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
