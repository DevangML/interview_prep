/* UX layer — applied to every page. Knobs on every CSS editor, fullscreen portals,
   resizable splits, toasts, and a consistent breathing/motion pass. */
(function(){
var CSS = `
:root{--ux-gap:.6rem;--ux-r:.5rem;--ux-line:gainsboro;--ux-brand:steelblue}
.ux-btn{border:1px solid var(--ux-line);background:white;border-radius:.35rem;font:600 .68rem system-ui;
 padding:.15rem .45rem;cursor:pointer;color:dimgray;line-height:1.4;transition:background-color 140ms ease,color 140ms ease}
.ux-btn:hover{background:whitesmoke;color:#334155}
.ux-btn:focus-visible{outline:2px solid var(--ux-brand);outline-offset:2px}
.ux-host{position:relative}
.ux-exp{position:absolute;top:.35rem;right:.35rem;z-index:5;opacity:0;display:flex;gap:.2rem;transition:opacity 140ms ease}
.ux-btn[aria-pressed=true]{background:steelblue;border-color:steelblue;color:white}
.ux-host:hover .ux-exp,.ux-exp:focus-visible{opacity:1}
.ux-full{position:fixed !important;inset:0 !important;z-index:9998 !important;width:auto !important;
 height:auto !important;max-width:none !important;max-height:none !important;margin:0 !important;
 border-radius:0 !important;box-shadow:0 0 0 100vmax rgb(15 23 42 / .55)}
body.ux-locked{overflow:hidden}
.ux-esc{position:fixed;top:.6rem;right:.6rem;z-index:9999;background:#0f172a;color:white;border:0;
 border-radius:.4rem;padding:.35rem .7rem;font:600 .72rem system-ui;cursor:pointer;display:none}
body.ux-locked .ux-esc{display:block}
.ux-split{position:relative;flex:none;background:transparent;z-index:3}
.ux-split[data-dir=v]{cursor:col-resize;width:.5rem;margin:0 -.25rem}
.ux-split[data-dir=h]{cursor:row-resize;height:.5rem;margin:-.25rem 0}
.ux-split::after{content:"";position:absolute;inset:40% 0;background:var(--ux-line);border-radius:99px;transition:background-color 140ms ease}
.ux-split[data-dir=h]::after{inset:0 40%}
.ux-split:hover::after{background:var(--ux-brand)}
.ux-toasts{position:fixed;bottom:1rem;left:50%;translate:-50% 0;z-index:10000;display:grid;gap:.4rem;justify-items:center}
.ux-toast{background:#0f172a;color:white;padding:.5rem .9rem;border-radius:.5rem;font:600 .8rem system-ui;
 box-shadow:0 8px 24px rgb(0 0 0/.25);animation:ux-in 180ms ease}
.ux-toast[data-t=ok]{background:seagreen}.ux-toast[data-t=err]{background:firebrick}
@keyframes ux-in{from{opacity:0;translate:0 .5rem}to{opacity:1;translate:0 0}}
.ux-ask{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;background:rgb(15 23 42 / .5);animation:ux-fade 140ms ease}
@keyframes ux-fade{from{opacity:0}to{opacity:1}}
.ux-card{background:white;border-radius:.75rem;padding:1.25rem;max-width:26rem;width:calc(100% - 2rem);
 box-shadow:0 20px 50px rgb(0 0 0/.3);display:grid;gap:.75rem}
.ux-card h3{margin:0;font-size:1rem}.ux-card p{margin:0;color:dimgray;font-size:.88rem}
.ux-card .row{display:flex;gap:.5rem;justify-content:flex-end}
.ux-card button{padding:.45rem .9rem;border-radius:.4rem;border:1px solid var(--ux-line);background:white;font:600 .82rem system-ui;cursor:pointer}
.ux-card button.p{background:var(--ux-brand);border-color:var(--ux-brand);color:white}


/* the classic flex overflow fix: a flex child's min-height defaults to auto, so it
   refuses to shrink and spills over its neighbours. Force it to 0 down the chain. */
.col,.ed,.side,.ux-ed,.pb,.panel{min-height:0}
.ux-ed{overflow:hidden}
.ux-ed textarea{min-height:4rem}
.ux-tall{flex:2 1 0 !important;min-height:0}

/* control pane: its own independent, resizable, scrollable pane */
.ux-pane{display:flex;flex-direction:column;min-height:0;flex:none;border:1px solid var(--ux-line);
 border-radius:var(--ux-r);background:snow;overflow:hidden;margin-top:.4rem}
.ux-pane > .kn-body{flex:1;min-height:0;overflow:auto;max-height:none}
.ux-pane .kn-hd{flex:none}
.ux-pane.closed{flex:none}
.ux-pane.closed > .kn-body,.ux-pane.closed > .ux-grip{display:none}
.ux-pane > .ux-grip{flex:none}
.kn{border:0;margin:0;background:transparent}

/* editors: stretchable in place, no portal needed */
.ux-ed{position:relative;display:flex;flex-direction:column;min-height:0}
.ux-ed textarea{resize:vertical !important;min-height:5rem;max-height:none}
.ux-tools{position:absolute;top:.3rem;right:.3rem;z-index:6;display:flex;gap:.2rem;opacity:0;transition:opacity 140ms ease}
.ux-ed:hover .ux-tools,.ux-tools:focus-within{opacity:1}
.ux-grip{height:.55rem;flex:none;cursor:row-resize;position:relative;margin-top:.15rem}
.ux-grip::after{content:"";position:absolute;inset:.2rem 42%;background:var(--ux-line);border-radius:99px;transition:background-color 140ms ease}
.ux-grip:hover::after{background:var(--ux-brand)}
.ux-tall{flex:2 !important}
textarea,.stage,iframe,.panel,.kn{transition:box-shadow 140ms ease,border-color 140ms ease}
textarea:focus{border-color:var(--ux-brand)}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms !important;transition-duration:.01ms !important}}
`;
var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

/* ---------- toasts + a real dialog instead of alert/confirm ---------- */
var tray=document.createElement('div'); tray.className='ux-toasts';
function toast(msg,kind,ms){ document.body.appendChild(tray);
  var t=document.createElement('div'); t.className='ux-toast'; if(kind)t.dataset.t=kind; t.textContent=msg;
  tray.appendChild(t); setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){t.remove()},200); }, ms||2200); }
function ask(title,body,okLabel){
  return new Promise(function(res){
    var ov=document.createElement('div'); ov.className='ux-ask';
    ov.innerHTML='<div class="ux-card" role="dialog" aria-modal="true"><h3></h3><p></p>'
      +'<div class="row"><button data-a="no">Cancel</button><button class="p" data-a="yes"></button></div></div>';
    ov.querySelector('h3').textContent=title; ov.querySelector('p').textContent=body;
    ov.querySelector('[data-a=yes]').textContent=okLabel||'Continue';
    function done(v){ ov.remove(); document.removeEventListener('keydown',esc); res(v); }
    function esc(e){ if(e.key==='Escape') done(false); }
    ov.addEventListener('click',function(e){
      if(e.target===ov) return done(false);
      var a=e.target.dataset&&e.target.dataset.a; if(a) done(a==='yes'); });
    document.addEventListener('keydown',esc);
    document.body.appendChild(ov); ov.querySelector('[data-a=yes]').focus();
  });
}

/* ---------- fullscreen portal (element stays in the DOM, so iframes keep state) ---------- */
var esc=document.createElement('button'); esc.className='ux-esc'; esc.textContent='Close   esc';
document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(esc)});
if(document.body) document.body.appendChild(esc);
var full=null;
function expand(el){
  if(full){ collapse(); if(full===el) return; }
  full=el; el.classList.add('ux-full'); document.body.classList.add('ux-locked');
}
function collapse(){ if(!full) return; full.classList.remove('ux-full'); full=null; document.body.classList.remove('ux-locked'); }
esc.onclick=collapse;
addEventListener('keydown',function(e){ if(e.key==='Escape') collapse(); });

function addExpand(el,label){
  if(!el || el.__uxExp) return; el.__uxExp=true;
  el.classList.add('ux-host');
  var bar=document.createElement('div'); bar.className='ux-exp';
  var fr=el.tagName==='IFRAME'?el:el.querySelector('iframe');
  if(fr && typeof XRAY!=='undefined'){
    var x=document.createElement('button'); x.className='ux-btn'; x.type='button';
    x.textContent='◱'; x.title='X-ray the box model — hover any element'; x.setAttribute('aria-label','X-ray box model');
    x.onclick=function(ev){ ev.stopPropagation();
      var on=XRAY.attach(fr,x);
      if(typeof UX!=='undefined') UX.toast(on?'X-ray on — hover an element':'X-ray off', on?'ok':null,1500); };
    bar.appendChild(x);
  }
  var b=document.createElement('button'); b.className='ux-btn'; b.type='button';
  b.textContent='⛶'; b.title=(label||'Expand')+' — Esc to close'; b.setAttribute('aria-label',label||'Expand');
  b.onclick=function(ev){ ev.stopPropagation(); expand(el); };
  bar.appendChild(b);
  el.appendChild(bar);
}

/* ---------- draggable splitters ---------- */
function makeSplit(container,dir){
  if(!container || container.__uxSplit) return; container.__uxSplit=true;
  var kids=[].slice.call(container.children).filter(function(c){return c.nodeType===1});
  if(kids.length<2) return;
  var a=kids[0], b=kids[1];
  var s=document.createElement('div'); s.className='ux-split'; s.dataset.dir=dir;
  container.insertBefore(s,b);
  var drag=false;
  s.addEventListener('pointerdown',function(e){ drag=true; s.setPointerCapture(e.pointerId); e.preventDefault(); });
  s.addEventListener('pointerup',function(e){ drag=false; try{s.releasePointerCapture(e.pointerId)}catch(_){} });
  s.addEventListener('pointermove',function(e){
    if(!drag) return;
    var r=container.getBoundingClientRect();
    var pct = dir==='v' ? (e.clientX-r.left)/r.width : (e.clientY-r.top)/r.height;
    pct=Math.min(.85,Math.max(.15,pct));
    if(dir==='v') container.style.gridTemplateColumns=(pct*100)+'% 0 auto';
    else container.style.gridTemplateRows=(pct*100)+'% 0 auto';
    container.style[dir==='v'?'gridTemplateColumns':'gridTemplateRows']=(pct*100)+'% .5rem 1fr';
  });
}

/* ---------- knobs on every CSS editor, including ones created later ---------- */
function knobFor(ta){
  if(!ta || ta.__uxKnobs) return; if(typeof KNOBS==='undefined') return;
  if((ta.dataset.mode||'')!=='css') return;
  ta.__uxKnobs=true;

  // Sibling of the editor shell, NOT inside it — so it sizes and scrolls on its own.
  var shell = ta.closest('.ux-ed') || ta.parentElement;
  var pane=document.createElement('section'); pane.className='ux-pane';
  pane.innerHTML='<p class="kn-hd">🎛 Adjust the values you wrote'
    +'<span class="sp"></span><span class="kn-n"></span>'
    +'<button class="ux-btn" data-k="pop" title="Expand this panel">⛶</button>'
    +'<button class="ux-btn" data-k="tog" title="Collapse">▾</button></p>'
    +'<div class="kn-body"></div><div class="ux-grip" title="Drag to resize"></div>';
  shell.insertAdjacentElement('afterend', pane);

  var body=pane.querySelector('.kn-body');
  body.style.height='9rem';
  KNOBS.mount(ta, body);

  function count(){ pane.querySelector('.kn-n').textContent=body.querySelectorAll('.kn-row').length+' controls'; }
  new MutationObserver(count).observe(body,{childList:true}); count();

  pane.querySelector('.kn-hd').addEventListener('click',function(e){
    var k=e.target.dataset&&e.target.dataset.k;
    if(k==='pop'){ e.stopPropagation(); expand(pane); return; }
    pane.classList.toggle('closed');
    var b=pane.querySelector('[data-k=tog]'); if(b) b.textContent=pane.classList.contains('closed')?'▸':'▾';
  });

  // independent vertical resize
  var g=pane.querySelector('.ux-grip'), on=false,y0=0,h0=0;
  g.addEventListener('pointerdown',function(e){on=true;y0=e.clientY;h0=body.getBoundingClientRect().height;
    g.setPointerCapture(e.pointerId);e.preventDefault();});
  g.addEventListener('pointermove',function(e){ if(!on)return;
    body.style.height=Math.max(60,h0+(e.clientY-y0))+'px'; });
  g.addEventListener('pointerup',function(e){on=false;try{g.releasePointerCapture(e.pointerId)}catch(_){}} );
  g.addEventListener('dblclick',function(){ body.style.height='9rem'; });
}


/* ---------- editors: expand, stretch, fit — without leaving the page ---------- */
function editorShell(ta){
  if(!ta || ta.__uxEd) return; ta.__uxEd=true;
  var host = ta.closest('.ed') || ta.closest('.side') || ta.parentElement;
  if(!host) return;
  host.classList.add('ux-ed');
  var tools=host.querySelector(':scope > .ux-tools');
  if(!tools){ tools=document.createElement('div'); tools.className='ux-tools'; host.appendChild(tools); }
  function btn(txt,title,fn){
    var b=document.createElement('button'); b.type='button'; b.className='ux-btn';
    b.textContent=txt; b.title=title; b.setAttribute('aria-label',title);
    b.onclick=function(e){ e.preventDefault(); e.stopPropagation(); fn(b); };
    tools.appendChild(b); return b;
  }
  btn('\u21d5','Fit height to the code',function(){
    if(!innerHeight) return;
    ta.style.flex='none'; ta.style.height='auto';
    ta.style.height=Math.max(80, Math.min(ta.scrollHeight+8, Math.round(innerHeight*0.7)))+'px';
  });
  btn('\u21f1','Give this editor more room',function(b){
    host.classList.toggle('ux-tall');
    var big=host.classList.contains('ux-tall');
    b.textContent=big?'\u21f2':'\u21f1'; b.title=big?'Restore size':'Give this editor more room';
  });
  btn('\u26f6','Expand fullscreen — Esc to close',function(){ expand(host); });

  if(!host.querySelector(':scope > .ux-grip')){
    var g=document.createElement('div'); g.className='ux-grip'; g.title='Drag to resize · double-click to reset';
    ta.insertAdjacentElement('afterend', g);
    var y0=0,h0=0,on=false;
    g.addEventListener('pointerdown',function(e){ on=true; y0=e.clientY; h0=ta.getBoundingClientRect().height;
      ta.style.flex='none'; g.setPointerCapture(e.pointerId); e.preventDefault(); });
    g.addEventListener('pointermove',function(e){ if(!on) return;
      ta.style.height=Math.max(80, h0+(e.clientY-y0))+'px'; });
    g.addEventListener('pointerup',function(e){ on=false; try{g.releasePointerCapture(e.pointerId)}catch(_){} });
    g.addEventListener('dblclick',function(){ ta.style.height=''; ta.style.flex=''; host.classList.remove('ux-tall'); });
  }
}

function autoSplit(){
  document.querySelectorAll('main').forEach(function(m){
    if(m.__uxSplit) return;
    var cs=getComputedStyle(m);
    if(cs.display!=='grid') return;
    if(!m.getBoundingClientRect().width) return;
    var cols=cs.gridTemplateColumns.split(' ').filter(Boolean);
    if(cols.length!==2) return;
    var kids=[].slice.call(m.children).filter(function(c){return c.nodeType===1});
    if(kids.length<2) return;
    m.__uxSplit=true;
    var s=document.createElement('div'); s.className='ux-split'; s.dataset.dir='v';
    s.title='Drag to resize · double-click to reset';
    m.insertBefore(s, kids[1]);
    function set(p){ m.style.gridTemplateColumns=p+'% .5rem 1fr'; }
    set(50);
    var on=false;
    s.addEventListener('pointerdown',function(e){on=true;s.setPointerCapture(e.pointerId);e.preventDefault()});
    s.addEventListener('pointermove',function(e){ if(!on) return; var r=m.getBoundingClientRect();
      set(Math.min(85,Math.max(15,Math.round((e.clientX-r.left)/r.width*100)))); });
    s.addEventListener('pointerup',function(e){on=false;try{s.releasePointerCapture(e.pointerId)}catch(_){}} );
    s.addEventListener('dblclick',function(){ set(50); });
  });
}

function enhance(root){
  (root||document).querySelectorAll('textarea').forEach(editorShell);
  (root||document).querySelectorAll('textarea[data-mode=css]').forEach(knobFor);
  autoSplit();
  (root||document).querySelectorAll('.stage, .lesson.open .side:last-child, .panel').forEach(function(el){
    if(el.querySelector('iframe')||el.tagName==='IFRAME') addExpand(el,'Expand preview');
  });
  (root||document).querySelectorAll('.rz').forEach(function(el){ addExpand(el,'Expand preview'); });
}
document.addEventListener('DOMContentLoaded',function(){
  enhance();
  new MutationObserver(function(muts){
    muts.forEach(function(m){ [].forEach.call(m.addedNodes,function(n){ if(n.nodeType===1) enhance(n); }); });
  }).observe(document.body,{childList:true,subtree:true});
});
addEventListener('resize',function(){ clearTimeout(autoSplit._t); autoSplit._t=setTimeout(autoSplit,150); });
window.UX={toast:toast, ask:ask, expand:expand, collapse:collapse, enhance:enhance, split:makeSplit, autoSplit:autoSplit};
})();
