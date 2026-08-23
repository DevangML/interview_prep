(function(){
var $=function(s){return document.querySelector(s)};
var LIMIT={mcq:25, snippet:150};              // seconds
var q=[], i=0, right=0, streak=0, best=0, missed=[], t0=0, tick=null, answered=false;

function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0;var x=a[i];a[i]=a[j];a[j]=x;} return a; }
function start(){
  q=shuffle(RAPID); i=0; right=0; streak=0; best=0; missed=[]; render();
}
function hud(){
  $('#meta').textContent=(i+1)+' / '+q.length+'  ·  '+right+' right';
  $('#streak').textContent=streak>1?('🔥 '+streak+' streak'):'';
  $('#prog').style.width=(i/q.length*100)+'%';
}
function timer(sec,onEnd){
  clearInterval(tick); t0=Date.now();
  (function run(){ var left=sec-Math.floor((Date.now()-t0)/1000);
    $('#timer').textContent=left>0?left+'s':'0s';
    $('#timer').style.color = left<=5 ? 'var(--ui-danger)' : 'var(--ui-warn)';
    if(left<=0){ clearInterval(tick); onEnd(); } })();
  tick=setInterval(function(){ var left=sec-Math.floor((Date.now()-t0)/1000);
    $('#timer').textContent=left>0?left+'s':'0s';
    $('#timer').style.color = left<=5 ? 'var(--ui-danger)' : 'var(--ui-warn)';
    if(left<=0){ clearInterval(tick); onEnd(); } },250);
}
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
function fmtQ(s){ return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>'); }

function next(){ i++; if(i>=q.length) finish(); else render(); }

function render(){
  answered=false; hud();
  var it=q[i], c=$('#card');
  if(it.t==='mcq'){
    c.innerHTML='<span class="tag">'+it.topic+'</span><p class="q">'+fmtQ(it.q)+'</p>'
      +'<div class="opts">'+it.a.map(function(o,n){
          return '<button class="opt" data-n="'+n+'"><span class="k">'+'ABCD'[n]+'</span><span>'+fmtQ(o)+'</span></button>'; }).join('')
      +'</div><p class="why" id="why"></p><div class="row"><button class="btn p" id="nx" style="display:none">Next →</button>'
      +'<span class="meta" id="hintk" style="color:var(--ui-faint)">press A–D</span></div>';
    c.querySelectorAll('.opt').forEach(function(b){ b.onclick=function(){ answer(+b.dataset.n); }; });
    $('#nx').onclick=next;
    timer(LIMIT.mcq, function(){ if(!answered) answer(-1); });
  } else {
    c.innerHTML='<span class="tag">'+it.topic+'</span><p class="q">'+fmtQ(it.q)+'</p>'
      +'<div class="snip"><textarea id="code" spellcheck="false" data-no-cm="1"></textarea>'
      +'<div class="row"><button class="btn p" id="run">Run tests</button>'
      +'<button class="btn" id="sol">Show solution</button>'
      +'<span class="verdict" id="v"></span></div></div>'
      +'<p class="why" id="why"></p><div class="row"><button class="btn p" id="nx" style="display:none">Next →</button></div>';
    $('#code').value=it.start;
    $('#run').onclick=runSnippet; $('#sol').onclick=function(){ $('#code').value=it.sol; };
    $('#nx').onclick=next;
    timer(LIMIT.snippet, function(){ reveal(false); });
  }
}
function answer(n){
  if(answered) return; answered=true; clearInterval(tick);
  var it=q[i], ok=(n===it.c);
  document.querySelectorAll('.opt').forEach(function(b){
    b.disabled=true;
    if(+b.dataset.n===it.c) b.dataset.s='right';
    else if(+b.dataset.n===n) b.dataset.s='wrong';
  });
  reveal(ok);
}
function runSnippet(){
  var it=q[i], name=(it.sol.match(/^\s*(?:const|function)\s+(\w+)/)||[])[1];
  var fn;
  try{ fn=new Function($('#code').value+'\n;return '+name+';')(); }
  catch(e){ $('#v').dataset.v='fail'; $('#v').textContent='Syntax — '+e.message.slice(0,60); return; }
  Promise.resolve().then(function(){ return it.test(fn); }).then(function(r){
    if(r===true){ $('#v').dataset.v='pass'; $('#v').textContent='✓ tests pass'; clearInterval(tick); reveal(true); }
    else { $('#v').dataset.v='fail'; $('#v').textContent='✗ tests fail — try again'; }
  }).catch(function(e){ $('#v').dataset.v='fail'; $('#v').textContent='✗ threw — '+String(e.message).slice(0,50); });
}
function reveal(ok){
  answered=true; clearInterval(tick);
  var it=q[i];
  if(ok){ right++; streak++; best=Math.max(best,streak); }
  else { streak=0; missed.push(it); }
  var w=$('#why'); w.classList.add('show');
  w.innerHTML='<b>'+(ok?'Right. ':'The point: ')+'</b>'+fmtQ(it.why);
  var nx=$('#nx'); if(nx) nx.style.display='';
  hud();
  if(typeof UX!=='undefined' && ok && streak>0 && streak%5===0) UX.toast(streak+' in a row 🔥','ok',1400);
}
function finish(){
  clearInterval(tick); $('#timer').textContent=''; $('#prog').style.width='100%';
  var pct=Math.round(right/q.length*100);
  $('#card').innerHTML='<div class="done"><div class="big">'+pct+'%</div>'
   +'<p class="q" style="font-weight:500">'+right+' of '+q.length+' · best streak '+best+'</p>'
   +(missed.length?'<div class="missed"><p class="q" style="font-size:.9rem">Re-drill these:</p>'
      +missed.map(function(m){return '<div><b>'+m.topic+'</b> — '+fmtQ(m.why)+'</div>'}).join('')+'</div>'
     :'<p class="q" style="font-size:.95rem;color:var(--ui-ok)">Clean sweep.</p>')
   +'<button class="btn p" id="again">Run again</button></div>';
  $('#again').onclick=start;
  try{ fetch('/api/activity',{method:'POST',body:JSON.stringify({ev:'rapid',page:'rapid',
    score:pct,right:right,total:q.length,streak:best,missed:missed.map(function(m){return m.topic})})}); }catch(e){}
}
addEventListener('keydown',function(e){
  if(/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
  var k=e.key.toUpperCase(), n='ABCD'.indexOf(k);
  if(n>-1 && !answered && q[i] && q[i].t==='mcq'){ e.preventDefault(); answer(n); }
  if((e.key==='Enter'||e.key===' ') && answered){ e.preventDefault(); next(); }
});
start();
})();
