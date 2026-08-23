/* TIP — one tooltip element for the whole page.
 * Overlap is impossible by construction: there is exactly ONE node, reused.
 * Reads data-tip (or title, which it steals so the native tooltip never fires).
 * Flips above/below and clamps horizontally so it can never leave the viewport.
 */
(function(){
var CSS=[
'#tip{position:fixed;z-index:2147483600;pointer-events:none;opacity:0;',
' background:var(--ui-nav,#0f172a);color:#fff;font:500 12px/1.45 system-ui,-apple-system,sans-serif;',
' padding:.4rem .55rem;border-radius:.4rem;max-width:20rem;box-shadow:0 6px 20px rgb(15 23 42 / .28);',
' transform:translateY(3px);transition:opacity 120ms ease,transform 120ms ease}',
'#tip.on{opacity:1;transform:translateY(0)}',
'#tip b{display:block;font-weight:650;margin-bottom:.1rem}',
'#tip kbd{display:inline-block;background:rgb(255 255 255 / .16);border-radius:3px;padding:0 .25rem;',
' font:600 11px ui-monospace,monospace;margin-left:.25rem}',
'#tip::after{content:"";position:absolute;width:8px;height:8px;background:inherit;transform:rotate(45deg)}',
'#tip[data-p=top]::after{bottom:-4px;left:var(--ax,50%);margin-left:-4px}',
'#tip[data-p=bottom]::after{top:-4px;left:var(--ax,50%);margin-left:-4px}',
'@media(prefers-reduced-motion:reduce){#tip{transition:none}}'
].join('');
var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

var el=null, timer=null, cur=null;
function node(){
  if(!el){ el=document.createElement('div'); el.id='tip'; el.setAttribute('role','tooltip');
           (document.body||document.documentElement).appendChild(el); }
  return el;
}
function textFor(t){
  var d=t.getAttribute('data-tip');
  if(!d && t.title){ d=t.title; t.setAttribute('data-tip',d); t.removeAttribute('title'); }
  if(!d) return null;
  var key=t.getAttribute('data-key');
  var parts=d.split(' — ');
  var html = parts.length>1
    ? '<b>'+esc(parts[0])+'</b>'+esc(parts.slice(1).join(' — '))
    : esc(d);
  if(key) html+='<kbd>'+esc(key)+'</kbd>';
  return html;
}
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function show(t){
  var html=textFor(t); if(!html) return;
  var n=node(); n.innerHTML=html; n.classList.add('on');
  var r=t.getBoundingClientRect();
  n.style.left='0px'; n.style.top='0px';                 // measure unconstrained
  var w=n.offsetWidth, h=n.offsetHeight, pad=8;
  var above = r.top - h - 10 > pad;
  var top = above ? r.top - h - 10 : r.bottom + 10;
  var left = r.left + r.width/2 - w/2;
  left = Math.max(pad, Math.min(innerWidth - w - pad, left));
  n.style.left=Math.round(left)+'px';
  n.style.top=Math.round(top)+'px';
  n.dataset.p = above ? 'top' : 'bottom';
  n.style.setProperty('--ax', Math.round(r.left + r.width/2 - left)+'px');
  cur=t;
}
function hide(){ clearTimeout(timer); if(el){ el.classList.remove('on'); } cur=null; }

function target(e){
  var t=e.target;
  while(t && t!==document.body){
    if(t.nodeType===1 && (t.hasAttribute('data-tip') || (t.title && t.title.trim()))) return t;
    t=t.parentElement;
  }
  return null;
}
document.addEventListener('mouseover',function(e){
  var t=target(e); if(!t || t===cur) return;
  clearTimeout(timer); timer=setTimeout(function(){ show(t); }, 320);
},true);
document.addEventListener('mouseout',function(e){
  var t=target(e); if(!t) return;
  hide();
},true);
document.addEventListener('focusin',function(e){ var t=target(e); if(t) show(t); });
document.addEventListener('focusout',hide);
addEventListener('scroll',hide,true); addEventListener('keydown',function(e){ if(e.key==='Escape') hide(); });
document.addEventListener('mousedown',hide,true);

/* label anything that ships without one */
var DEFAULTS={
  '#fmt':'Format — reflow this file with Prettier',
  '#fmtjsx':'Format — reflow the component with Prettier',
  '#fmtcode':'Format — reflow your code with Prettier',
  '#reset':'Reset — restore the starting code',
  '#sol':'Show solution — try every hint first',
  '#mark':'Mark done — saves to the campaign and awards XP',
  '#restart':'Restart — new shuffled run'
};
function seed(){
  Object.keys(DEFAULTS).forEach(function(sel){
    var n=document.querySelector(sel);
    if(n && !n.getAttribute('data-tip') && !n.title) n.setAttribute('data-tip', DEFAULTS[sel]);
  });
  document.querySelectorAll('.fx-tab').forEach(function(t){
    if(!t.getAttribute('data-tip')) t.setAttribute('data-tip','Open '+t.textContent.trim()+' — this file stays live in the preview');
  });
  document.querySelectorAll('.vp-bar [data-d]').forEach(function(b){
    if(!b.getAttribute('data-tip') && b.title) { b.setAttribute('data-tip',b.title); b.removeAttribute('title'); }
  });
  document.querySelectorAll('#gnav a.lnk').forEach(function(a){
    if(!a.getAttribute('data-tip')){
      var n=a.textContent.trim().replace(/^[^A-Za-z]+/,'');
      a.setAttribute('data-tip','Go to '+n); a.setAttribute('data-key','g '+n[0].toLowerCase());
    }
  });
}
document.addEventListener('DOMContentLoaded',function(){ seed(); setTimeout(seed,600); setTimeout(seed,1800); });
window.TIP={show:show, hide:hide, seed:seed};
})();
