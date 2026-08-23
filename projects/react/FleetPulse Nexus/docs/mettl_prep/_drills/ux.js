/* UX — toasts, a real dialog, and a PERMANENT preview toolbar.
   No portal, no fullscreen, no hover-revealed buttons: panes are sized by shell.css
   and every control is always visible. */
(function(){
var CSS = [
'.ux-btn{border:1px solid var(--ui-line2,silver);background:var(--ui-surface,#fff);border-radius:.35rem;',
' font:600 .7rem system-ui;padding:.18rem .5rem;cursor:pointer;color:var(--ui-muted,dimgray);line-height:1.4;',
' transition:background-color 150ms ease,color 150ms ease}',
'.ux-btn:hover{background:var(--ui-sunken,whitesmoke);color:var(--ui-ink2,#334155)}',
'.ux-btn:focus-visible{outline:2px solid var(--ui-accent,steelblue);outline-offset:2px}',
'.ux-btn[aria-pressed=true]{background:var(--ui-accent,steelblue);border-color:var(--ui-accent,steelblue);color:#fff}',
'.pv-bar{display:flex;gap:.25rem;align-items:center;padding:.25rem .45rem;flex:none;',
' border-bottom:1px solid var(--ui-line,gainsboro);background:var(--ui-bg2,#f6f8fa)}',
'.ux-toasts{position:fixed;bottom:1rem;left:50%;translate:-50% 0;z-index:10000;display:grid;gap:.4rem;justify-items:center}',
'.ux-toast{background:var(--ui-nav,#0f172a);color:#fff;padding:.5rem .9rem;border-radius:.5rem;',
' font:600 .8rem system-ui;box-shadow:0 8px 24px rgb(0 0 0/.25);animation:ux-in 180ms ease}',
'.ux-toast[data-t=ok]{background:var(--ui-ok,seagreen)}.ux-toast[data-t=err]{background:var(--ui-danger,firebrick)}',
'@keyframes ux-in{from{opacity:0;translate:0 .5rem}to{opacity:1;translate:0 0}}',
'.ux-ask{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;background:rgb(15 23 42 / .5)}',
'.ux-card{background:#fff;border-radius:.75rem;padding:1.25rem;max-width:26rem;width:calc(100% - 2rem);',
' box-shadow:0 20px 50px rgb(0 0 0/.3);display:grid;gap:.75rem}',
'.ux-card h3{margin:0;font-size:1rem}.ux-card p{margin:0;color:dimgray;font-size:.88rem}',
'.ux-card .row{display:flex;gap:.5rem;justify-content:flex-end}',
'.ux-card button{padding:.45rem .9rem;border-radius:.4rem;border:1px solid var(--ui-line2,silver);background:#fff;',
' font:600 .82rem system-ui;cursor:pointer}',
'.ux-card button.p{background:var(--ui-accent,steelblue);border-color:var(--ui-accent,steelblue);color:#fff}',
'@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms !important;transition-duration:.01ms !important}}'
].join('');
var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

var tray=document.createElement('div'); tray.className='ux-toasts';
function toast(msg,kind,ms){
  if(!tray.parentNode && document.body) document.body.appendChild(tray);
  var t=document.createElement('div'); t.className='ux-toast'; if(kind) t.dataset.t=kind;
  t.textContent=msg; tray.appendChild(t);
  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); },200); }, ms||2200);
}
function ask(title,body,okLabel){
  return new Promise(function(res){
    var ov=document.createElement('div'); ov.className='ux-ask';
    ov.innerHTML='<div class="ux-card" role="dialog" aria-modal="true"><h3></h3><p></p>'
      +'<div class="row"><button data-a="no">Cancel</button><button class="p" data-a="yes"></button></div></div>';
    ov.querySelector('h3').textContent=title;
    ov.querySelector('p').textContent=body;
    ov.querySelector('[data-a=yes]').textContent=okLabel||'Continue';
    function done(v){ ov.remove(); document.removeEventListener('keydown',esc); res(v); }
    function esc(e){ if(e.key==='Escape') done(false); }
    ov.addEventListener('click',function(e){
      if(e.target===ov) return done(false);
      var a=e.target.dataset && e.target.dataset.a; if(a) done(a==='yes');
    });
    document.addEventListener('keydown',esc);
    document.body.appendChild(ov);
    ov.querySelector('[data-a=yes]').focus();
  });
}

/* one always-visible toolbar per preview */
function previewTools(fr){
  if(!fr || fr.__tools) return; fr.__tools=true;
  var vp=fr.closest('.vp'), bar=vp && vp.querySelector('.vp-bar');
  if(!bar){
    var host=fr.closest('.stage') || fr.parentElement;
    if(!host || !host.parentElement) return;
    bar=document.createElement('div'); bar.className='pv-bar';
    host.parentElement.insertBefore(bar, host);
  }
  function add(txt,title,fn){
    var x=document.createElement('button'); x.type='button'; x.className='ux-btn';
    x.textContent=txt; x.title=title; x.setAttribute('aria-label',title);
    x.onclick=function(e){ e.preventDefault(); fn(x); };
    bar.appendChild(x);
  }
  if(typeof DIRECT!=='undefined')
    add('✥','Direct edit — click any element in the result to move, resize and restyle it. Changes are written into the CSS.',function(x){
      var on=DIRECT.attach(fr,x); toast(on?'Click an element in the preview':'Direct edit off', on?'ok':null,1400); });
  if(typeof XRAY!=='undefined')
    add('◱','X-ray — hover any element to see content, padding, border and margin drawn to scale with numbers',function(x){
      var on=XRAY.attach(fr,x); toast(on?'X-ray on — hover an element':'X-ray off', on?'ok':null,1400); });
}

/* headless bridge: one per preview. It spans every registered sheet (app.css included). */
function bridgeFor(fr){
  if(!fr || fr.__bridged || typeof INSPECTOR==='undefined') return;
  fr.__bridged=true;
  INSPECTOR.mount({iframe:fr});
}

function enhance(root){
  var r=root||document;
  r.querySelectorAll('iframe').forEach(previewTools);
  r.querySelectorAll('iframe').forEach(bridgeFor);
  r.querySelectorAll('.CodeMirror').forEach(function(){});   // no-op: sizing is Split.js's job
}
function inEditor(n){ while(n&&n!==document.body){ if(n.classList&&n.classList.contains('CodeMirror')) return true; n=n.parentNode; } return false; }
var pending=null;
document.addEventListener('DOMContentLoaded',function(){
  enhance();
  function typing(){
    var a=document.activeElement;
    return !!(a && a.closest && a.closest('.CodeMirror'));
  }
  new MutationObserver(function(muts){
    if(typing()) return;                       // never re-enhance mid-keystroke
    for(var i=0;i<muts.length;i++){
      if(inEditor(muts[i].target)) continue;
      clearTimeout(pending); pending=setTimeout(function(){ if(!typing()) enhance(); },250);
      return;
    }
  }).observe(document.body,{childList:true,subtree:true});
});
window.UX={toast:toast, ask:ask, enhance:enhance};
})();
