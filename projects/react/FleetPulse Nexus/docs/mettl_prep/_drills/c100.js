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

/* ── difficulty helper ── */
function getDifficulty(it){
  var id=it.id;
  if(id.startsWith('BOX-') || id.startsWith('PLC-') || id.startsWith('FLEX-01') || id.startsWith('FLEX-02')) return { name:'Easy', cls:'diff-easy' };
  if(id.startsWith('TRK-') || id.startsWith('CQ-') || id.startsWith('MIX-') || id.startsWith('AREA-') || id.startsWith('XTRA-')) return { name:'Hard', cls:'diff-hard' };
  return { name:'Medium', cls:'diff-med' };
}

/* ── brief — LeetCode layout ── */
function renderBrief(it){
  var diff=getDifficulty(it);
  var use=it.use.map(function(u){
    return '<li><code>'+esc(u[0])+'</code><span>'+esc(u[1])+'</span></li>';
  }).join('');
  var hints=it.hints.map(function(h,n){
    return '<div class="hint"><button type="button" data-h="'+n+'" data-tip="Open only when stuck — hint use is logged">'
      +'Hint '+(n+1)+'</button><p>'+esc(h)+'</p></div>';
  }).join('');
  $('#brief').innerHTML=
     '<div class="lc-header">'
    +'<div class="lc-title-row"><h2><span class="iid">'+it.id+'</span> '+esc(it.title)+'</h2></div>'
    +'<div class="lc-badges">'
    +'<span class="diff-badge '+diff.cls+'">'+diff.name+'</span>'
    +'<span class="tag-badge">'+esc(it.cat.toUpperCase())+'</span>'
    +'<span class="tag-badge">Mettl Assessment</span>'
    +'</div></div>'
    +'<p class="lc-desc">'+esc(it.task)+'</p>'
    +'<div class="lc-example">'
    +'<h4 class="lc-slab">Example 1: Visual Target Layout</h4>'
    +'<div class="lc-dia-wrap">'+DIA.figure(it.dia)+'</div>'
    +'<p class="lc-goal"><strong>Target Objective:</strong> '+esc(it.goal)+'</p>'
    +(it.verify ? '<p class="verify"><b>'+(it.visual===false
        ? 'No visual change — read-and-reason:'
        : 'How to check:')+'</b> '+esc(it.verify)+'</p>' : '')
    +'</div>'
    +'<h4 class="lc-slab">Constraints & Required Properties</h4>'
    +'<ul class="lc-const-list">'+use+'</ul>'
    +'<div class="spec-checks"><p class="spec-title">Automated Test Cases</p><ul class="spec-list" id="speclist"></ul></div>'
    +'<details class="interview-card">'
    +'<summary>🎙️ How to Pitch This in Technical Rounds</summary>'
    +'<div class="interview-body">'
    +'<p><strong>Interviewer:</strong> "How do you implement <em>'+esc(it.title)+'</em> in production?"</p>'
    +'<blockquote>"'+esc(it.goal)+' We declare <code>'+it.use.map(function(u){return esc(u[0]);}).join(', ')+'</code> to '+esc(it.use[0]?it.use[0][1]:'')+'."</blockquote>'
    +'<p><strong>Architectural Rationale:</strong> '+esc(it.why)+'</p>'
    +'</div></details>'
    +'<div class="lc-accordion">'
    +'<h4 class="lc-slab">Hints & Reference Solution</h4>'
    +hints
    +'<div class="sol"><button type="button" id="showsol" data-tip="Reveal the reference answer">Show Reference Solution</button>'
    +'<pre></pre></div>'
    +'</div>';
  $$('#brief [data-h]').forEach(function(b){ b.onclick=function(){
    b.parentElement.classList.toggle('open'); log('hint',{id:it.id,hint:+b.dataset.h+1}); };});
  $('#showsol').onclick=function(){
    var pre=$('#brief .sol pre');
    pre.textContent='component.jsx\n\n'+it.markup.replace(/^\s{4}/gm,'')
                   +'\n\nstyles.css\n\n'+it.sol;
    $('#brief .sol').classList.add('open'); log('solution',{id:it.id});
  };
  if(window.TIP) TIP.seed($('#brief'));
  checkSpec();
}

/* ── automated spec verifier ── */
function checkSpec(){
  if(!cur) return;
  var list=$('#speclist');
  if(!list) return;
  var css=$('#css').value||'';
  var allPass=true;
  var out=cur.use.map(function(u){
    var raw=u[0].trim();
    var clean=raw.replace(/[:()]/g,'').trim();
    var pass=false;
    if(raw.indexOf(':')!==-1){
      var parts=raw.split(':');
      var prop=parts[0].trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      var val=parts[1].trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      var reg=new RegExp(prop+'\\s*:\\s*[^;}]*'+val,'i');
      pass=reg.test(css);
    } else {
      var escaped=clean.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      var reg=new RegExp('(^|[\\s;:{,])'+escaped,'i');
      pass=reg.test(css);
    }
    if(!pass) allPass=false;
    return '<li class="spec-item '+(pass?'pass':'pending')+'">'
      +(pass?'✓':'○')+' <code>'+esc(raw)+'</code> '+(pass?'matched':'needed')+'</li>';
  });
  list.innerHTML=out.join('');
}

/* ── HUD & Sprint state ── */
var hudActive=false;
var timerInterval=null, timerLeft=75, timerActive=false;

function updateTimerUI(){
  var d=$('#timerdisplay');
  if(!d) return;
  d.textContent=timerLeft+'s';
  d.style.background=timerLeft<=15?'#b91c1c':(timerLeft<=30?'#d97706':'#1e293b');
}
function startTimer(){
  clearInterval(timerInterval);
  timerLeft=75;
  updateTimerUI();
  if(!timerActive) return;
  $('#timerdisplay').hidden=false;
  timerInterval=setInterval(function(){
    timerLeft--;
    updateTimerUI();
    if(timerLeft<=0){
      clearInterval(timerInterval);
      $('#timerdisplay').textContent='⏰ Time up!';
    }
  },1000);
}

var PV_BEFORE=null, PV_AFTER=null, PV_MINE=null;
var compareMode=false, measureMode=false;

function injectMeasurement(iframe){
  if(!iframe || !iframe.contentDocument) return;
  try {
    var doc = iframe.contentDocument;
    var existing = doc.querySelectorAll('.measure-badge-injected');
    existing.forEach(function(e){ e.parentNode.removeChild(e); });
    if(!measureMode) return;
    var elems = doc.querySelectorAll('.card, .box, .item, .grid, .cell, .hero, .bar, .truncate, div > div, button');
    elems.forEach(function(el){
      var rect = el.getBoundingClientRect();
      if(rect.width === 0 || rect.height === 0) return;
      var cs = doc.defaultView.getComputedStyle(el);
      var b = doc.createElement('div');
      b.className = 'measure-badge-injected';
      b.style.cssText = 'position:absolute;z-index:9999;background:rgba(15,23,42,0.9);color:#38bdf8;font:700 9px/1.2 ui-monospace,monospace;padding:2px 5px;border-radius:3px;border:1px solid #0284c7;pointer-events:none;transform:translateY(-100%);box-shadow:0 2px 4px rgba(0,0,0,0.3);';
      b.textContent = Math.round(rect.width) + 'px × ' + Math.round(rect.height) + 'px (' + cs.boxSizing + ')';
      el.style.position = (cs.position === 'static' ? 'relative' : cs.position);
      el.appendChild(b);
    });
  } catch(e){}
}

/* ── run ── */
function run(){
  if(!cur) return;
  var r=COMPILE.compile($('#jsx').value);
  if(r.error){ fail(r.error); return; }
  ok();
  var base = (cur.useApp===false) ? '*,*::before,*::after{box-sizing:border-box}' : APP;
  
  if(!PV){
    PV=new Preview($('#out'),{mode:'react'});
    PV.onerror=function(e){ fail('Runtime — '+e.message); };
  }
  PV.update(base+'\n'+$('#css').value, '', null, r.code);
  setTimeout(function(){ injectMeasurement($('#out')); }, 120);

  if(compareMode){
    if(!PV_BEFORE) PV_BEFORE = new Preview($('#out_before'), { mode: 'react' });
    if(!PV_AFTER) PV_AFTER = new Preview($('#out_after'), { mode: 'react' });
    if(!PV_MINE) PV_MINE = new Preview($('#out_mine'), { mode: 'react' });

    var rBefore = COMPILE.compile("import React from 'react';\nexport default function App(){\n  return (\n" + (cur.markup || '<div/>') + "\n  );\n}");
    var rAfter = COMPILE.compile("import React from 'react';\nexport default function App(){\n  return (\n" + (cur.markup || '<div/>') + "\n  );\n}");

    var afterCss = cur.css.replace(/^.*TODO.*$/m, cur.sol || '');

    PV_BEFORE.update(base + '\n' + cur.css, '', null, rBefore.code || '');
    PV_AFTER.update(base + '\n' + afterCss, '', null, rAfter.code || '');
    PV_MINE.update(base + '\n' + $('#css').value, '', null, r.code);

    setTimeout(function(){
      injectMeasurement($('#out_before'));
      injectMeasurement($('#out_after'));
      injectMeasurement($('#out_mine'));
    }, 150);
  }

  checkSpec();
  if(hudActive){
    $('#hudoverlay').innerHTML=DIA.figure(cur.dia);
    $('#hudoverlay').hidden=false;
  }
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
  var activeTab = $('.ftab[aria-selected=true]');
  var f = (activeTab && activeTab.dataset.f) || 'jsx';
  if(it.useApp===false && f==='app') f = 'css';
  $('#markdone').setAttribute('aria-pressed', !!done[it.id]);
  $('#markdone').textContent = done[it.id] ? 'Solved ✓' : 'Mark solved';
  showFile(f);
  if(hudActive){
    $('#hudoverlay').innerHTML=DIA.figure(it.dia);
    $('#hudoverlay').hidden=false;
  }
  if(timerActive) startTimer();
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
  var ta = which === 'jsx' ? $('#jsx') : (which === 'css' ? $('#css') : $('#app'));
  if(window.EDITOR && EDITOR.ready){
    var cm = EDITOR.of(ta);
    if(!cm){
      cm = EDITOR.upgrade(ta);
    }
    if(cm){
      requestAnimationFrame(function(){
        try{ cm.refresh(); cm.focus(); }catch(e){}
      });
    }
  } else if(ta && !ta.readOnly){
    ta.focus();
  }
}

/* ── boot ── */
function boot(){
  $('#filter').innerHTML='<option value="all">All '+C.length+' topics</option>'
    +C.map(function(c){ return '<option value="'+c.k+'">'+esc(c.n)+'</option>'; }).join('');
  $('#filter').onchange=buildList;
  buildList();

  $$('.ftab').forEach(function(t){ t.onclick=function(){ showFile(t.dataset.f); }; });

  $('#vtab-live').onclick=function(){
    compareMode=false;
    $('#vtab-live').classList.add('active');
    $('#vtab-compare').classList.remove('active');
    $('#prevwrap').hidden=false;
    $('#comparewrap').hidden=true;
    run();
  };

  $('#vtab-compare').onclick=function(){
    compareMode=true;
    $('#vtab-compare').classList.add('active');
    $('#vtab-live').classList.remove('active');
    $('#prevwrap').hidden=true;
    var wrap=$('#comparewrap');
    wrap.hidden=false;
    if(!wrap.innerHTML.trim()){
      wrap.innerHTML=
        '<div class="compare-pane compare-before">'
        + '<div class="compare-header">🔴 Problem Baseline (BEFORE)</div>'
        + '<iframe id="out_before" title="before-preview"></iframe>'
        + '</div>'
        + '<div class="compare-pane compare-after">'
        + '<div class="compare-header">🟢 Target Solution (AFTER)</div>'
        + '<iframe id="out_after" title="after-preview"></iframe>'
        + '</div>'
        + '<div class="compare-pane compare-mine">'
        + '<div class="compare-header">🔵 Your Code (LIVE)</div>'
        + '<iframe id="out_mine" title="mine-preview"></iframe>'
        + '</div>';
      PV_BEFORE=null; PV_AFTER=null; PV_MINE=null;
    }
    run();
  };

  $('#measurebtn').onclick=function(){
    measureMode=!measureMode;
    this.style.background=measureMode?'#0284c7':'';
    this.style.color=measureMode?'white':'';
    run();
  };

  $('#hudbtn').onclick=function(){
    hudActive=!hudActive;
    this.style.background=hudActive?'seagreen':'';
    this.style.color=hudActive?'white':'';
    $('#hudoverlay').hidden=!hudActive;
    if(hudActive && cur) $('#hudoverlay').innerHTML=DIA.figure(cur.dia);
  };

  $('#cruciblebtn').onclick=function(){
    timerActive=!timerActive;
    this.setAttribute('aria-pressed', timerActive);
    this.style.background=timerActive?'seagreen':'';
    this.style.color=timerActive?'white':'';
    $('#timerdisplay').hidden=!timerActive;
    if(timerActive){
      startTimer();
    } else {
      clearInterval(timerInterval);
    }
  };

  var acBtn = $('#actoggle');
  if(acBtn && window.EDITOR && EDITOR.isSuggestionsEnabled){
    function updateAcBtn(){
      var enabled = EDITOR.isSuggestionsEnabled();
      acBtn.textContent = '💡 Suggestions: ' + (enabled ? 'ON' : 'OFF');
      acBtn.style.background = enabled ? '#dcfce7' : '#f1f5f9';
      acBtn.style.color = enabled ? '#15803d' : '#475569';
    }
    updateAcBtn();
    acBtn.onclick = function(){
      var next = !EDITOR.isSuggestionsEnabled();
      EDITOR.setSuggestions(next);
      updateAcBtn();
    };
  }

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
