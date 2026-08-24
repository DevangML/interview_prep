/* CSS 100 — page controller.
   One item at a time: the target diagram, what to use, the file to edit, the result. */
(function(){
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var I=CSS100.items, C=CSS100.cats, cur=null, PV=null, APP='';
var KEY='css100:', DONE='css100:done';
var restoring=false;
var done=(function(){ try{ return JSON.parse(localStorage.getItem(DONE)||'{}'); }catch(e){ return {}; } })();
/* fetch rejects ASYNCHRONOUSLY — try/catch cannot see it, so file:// produced an
   unhandled rejection on every open, hint and reveal. */
var log=function(ev,x){ try{ fetch('/api/activity',{method:'POST',body:JSON.stringify(
  Object.assign({ev:ev,page:'css100'},x||{}))}).catch(function(){}); }catch(e){} };

function save(){ try{ localStorage.setItem(DONE,JSON.stringify(done)); }catch(e){} }

/* A saved buffer belongs to the starter it was forked from. Without this, editing a
   question in css100.js leaves every learner on the old text with no way back. */
function stamp(s){ var h=5381; for(var i=0;i<s.length;i++) h=((h*33)^s.charCodeAt(i))>>>0; return h.toString(36); }
function bufKey(it){ return KEY+it.id+':'+stamp(it.css); }
function jsxKey(it){ return KEY+it.id+':jsx:'+stamp(it.jsx); }
function load(k, fallback){ try{ var v=localStorage.getItem(k); return v===null?fallback:v; }catch(e){ return fallback; } }
function store(k,v){ try{ localStorage.setItem(k,v); }catch(e){ note('Could not save — browser storage is full.'); } }
function note(msg){ var s=document.querySelector('#stat'); if(s){ s.textContent=msg; s.className='stat bad'; } }
/* Quotes matter: these strings go into data-tip="..." attributes, and a question
   title containing a quote would terminate the attribute early. */
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

/* ── list ── */
function buildList(){
  var host=$('#list'), filter=$('#filter').value, out=[];
  C.forEach(function(c){
    if(filter!=='all' && filter!==c.k) return;
    var items=I.filter(function(i){ return i.cat===c.k; });
    var n=items.filter(function(i){ return done[i.id]; }).length;
    out.push('<div class="grp"><p class="glab">'+esc(c.n)+' <span>'+n+'/'+items.length+'</span></p>');
    items.forEach(function(i){
      out.push('<button class="item'+(done[i.id]?' ok':'')+'" data-id="'+i.id+'"'
        +' data-tip="'+esc(i.goal)+'"><span class="iid">'+i.id+'</span>'
        +'<span class="ttl">'+esc(i.title)+'</span></button>');
    });
    out.push('</div>');
  });
  host.innerHTML=out.join('');
  $$('.item',host).forEach(function(b){ b.onclick=function(){ pick(byId(b.dataset.id)); }; });
  if(window.TIP) TIP.seed(host);
  var total=I.length, ok=I.filter(function(i){ return done[i.id]; }).length;
  $('.prog i').style.width=(ok/total*100)+'%';
  $('#cnt').textContent=ok+' / '+total+' solved';
}
function byId(id){ for(var k=0;k<I.length;k++) if(I[k].id===id) return I[k]; return null; }

/* ── brief ── */
function renderBrief(it){
  var use=it.use.map(function(u){
    return '<li><code>'+esc(u[0])+'</code><span>'+esc(u[1])+'</span></li>';
  }).join('');
  var hints=it.hints.map(function(h,n){
    return '<div class="hint"><button type="button" data-h="'+n+'" data-tip="Open only when stuck — hint use is logged">'
      +'Hint '+(n+1)+'</button><p>'+esc(h)+'</p></div>';
  }).join('');
  $('#brief').innerHTML=
     '<h2><span class="iid">'+it.id+'</span> '+esc(it.title)+'</h2>'
    +'<p class="goal">'+esc(it.goal)+'</p>'
    +'<p class="slab">Expected result</p>'+DIA.figure(it.dia)
    +'<p class="slab">What to use — and for what</p><ul class="use">'+use+'</ul>'
    +'<p class="slab">Your task</p><p class="task">'+esc(it.task)+'</p>'
    +(it.verify ? '<p class="verify"><b>'+(it.visual===false
        ? 'No visual change — this one is read-and-reason.'
        : 'How to check:')+'</b> '+esc(it.verify)+'</p>' : '')
    +'<p class="slab">Hints</p>'+hints
    +'<div class="sol"><button type="button" id="showsol" data-tip="Reveal the reference answer">Show the answer</button>'
    +'<pre></pre></div>'
    +'<p class="slab">Why this is asked</p><p class="why">'+esc(it.why)+'</p>';
  $$('#brief [data-h]').forEach(function(b){ b.onclick=function(){
    b.parentElement.classList.toggle('open'); log('hint',{id:it.id,hint:+b.dataset.h+1}); };});
  $('#showsol').onclick=function(){
    var pre=$('#brief .sol pre');
    pre.textContent='component.jsx\n\n'+it.markup.replace(/^\s{4}/gm,'')
                   +'\n\nstyles.css\n\n'+it.sol;
    $('#brief .sol').classList.add('open'); log('solution',{id:it.id});
  };
  if(window.TIP) TIP.seed($('#brief'));
}

/* ── run ── */
function run(){
  if(!cur) return;
  var r=COMPILE.compile($('#jsx').value);
  if(r.error){ fail(r.error); return; }
  ok();
  if(!PV){ PV=new Preview($('#out'),{mode:'react'});
           PV.onerror=function(e){ fail('Runtime — '+e.message); }; }
  /* app.css is loaded for every question EXCEPT the ones that teach a rule it
     already ships — otherwise the stylesheet would silently answer the TODO. */
  var base = (cur.useApp===false) ? '*,*::before,*::after{box-sizing:border-box}' : APP;
  PV.update(base+'\n'+$('#css').value, '', null, r.code);
}
function fail(m){ var e=$('#err'); e.textContent=m; e.classList.add('show');
  $('#stat').textContent='error'; $('#stat').className='stat bad'; }
function ok(){ $('#err').classList.remove('show');
  $('#stat').textContent='running'; $('#stat').className='stat good'; }

/* ── pick ── */
function pick(it){
  if(!it) return;
  cur=it;
  $$('.item').forEach(function(b){ b.setAttribute('aria-current', b.dataset.id===it.id); });
  renderBrief(it);
  $('#jsx').value = load(jsxKey(it), it.jsx);
  $('#css').value = load(bufKey(it), it.css);      // '' is a real answer, not 'unset'
  var t=document.querySelector('.ftab[data-f=app]');
  t.hidden = it.useApp===false;
  t.title = it.useApp===false ? '' : 'app.css — linked into the preview, read-only here';
  $('#appnote').hidden = it.useApp!==false;
  if(it.useApp===false && !$('#appwrap').hidden) showFile('css');
  $('#markdone').setAttribute('aria-pressed', !!done[it.id]);
  $('#markdone').textContent = done[it.id] ? 'Solved ✓' : 'Mark solved';
  if(window.EDITOR && EDITOR.ready){ EDITOR.upgrade($('#jsx')); EDITOR.upgrade($('#css')); }
  if(window.FILES) FILES.showFor($('#css'));
  location.hash=it.id;
  run();
  log('open',{id:it.id});
}

/* ── files ── */
function showFile(which){
  $$('.ftab').forEach(function(t){ t.setAttribute('aria-selected', t.dataset.f===which); });
  $('#jsxwrap').hidden = which!=='jsx';
  $('#csswrap').hidden = which!=='css';
  $('#appwrap').hidden = which!=='app';
  if(window.EDITOR && EDITOR.ready){
    EDITOR.upgradeAll();
    requestAnimationFrame(function(){ EDITOR.redraw(); });   // a pane just became visible
  }
}

/* ── boot ── */
function boot(){
  $('#filter').innerHTML='<option value="all">All 17 topics</option>'
    +C.map(function(c){ return '<option value="'+c.k+'">'+esc(c.n)+'</option>'; }).join('');
  $('#filter').onchange=buildList;
  buildList();

  $$('.ftab').forEach(function(t){ t.onclick=function(){ showFile(t.dataset.f); }; });

  /* One compile per pause, not per keystroke — run() rebuilds the whole preview. */
  var t=null, debounced=function(){ clearTimeout(t); t=setTimeout(run,120); };
  $('#css').addEventListener('input',function(){
    if(cur && !restoring) store(bufKey(cur),$('#css').value);
    debounced();
  });
  $('#jsx').addEventListener('input',function(){
    if(cur && !restoring) store(jsxKey(cur),$('#jsx').value);   // JSX edits were being discarded
    debounced();
  });

  $('#reset').onclick=function(){ if(!cur) return;
    restoring=true;
    $('#css').value=cur.css; $('#jsx').value=cur.jsx;
    try{ localStorage.removeItem(bufKey(cur)); localStorage.removeItem(jsxKey(cur)); }catch(e){}
    setTimeout(function(){ restoring=false; },200);      // outlive CodeMirror's change debounce
    run(); };
  $('#fmt').onclick=function(){ if(window.FMT) FMT.applyTo($('#css'),'css',run); };
  $('#markdone').onclick=function(){ if(!cur) return;
    done[cur.id]=!done[cur.id]; save(); buildList();
    $$('.item').forEach(function(b){ b.setAttribute('aria-current', b.dataset.id===cur.id); });
    $('#markdone').setAttribute('aria-pressed',!!done[cur.id]);
    $('#markdone').textContent=done[cur.id]?'Solved ✓':'Mark solved';
    log(done[cur.id]?'solved':'unsolved',{id:cur.id}); };
  $('#next').onclick=function(){ var n=I.indexOf(cur); pick(I[(n+1)%I.length]); };
  $('#prev').onclick=function(){ var n=I.indexOf(cur); pick(I[(n-1+I.length)%I.length]); };

  fetch('app.css').then(function(r){ return r.text(); }).then(function(t){
    APP=t; $('#app').value=t; if(window.SHEETS) SHEETS.register('app.css',$('#app')); run();
  }).catch(function(){
    note('app.css could not be loaded — questions that rely on it will look wrong.');
    run();
  });

  addEventListener('hashchange',function(){
    var it=byId(location.hash.slice(1));
    if(it && (!cur || it.id!==cur.id)) pick(it);
  });
  showFile('jsx');
  pick(byId(location.hash.slice(1)) || I[0]);
  if(window.PANES && PANES.ready) PANES.auto();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
