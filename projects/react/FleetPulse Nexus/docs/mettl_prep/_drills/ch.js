(function(){
var $=function(s){return document.querySelector(s)};
var cur=null, APP='', S='<'+'script', E='<'+'/script>';
var log=function(ev,x){try{fetch('/api/activity',{method:'POST',body:JSON.stringify(Object.assign({ev:ev,page:'practice'},x||{}))})}catch(e){}};

var PV=null;
function run(){
  if(!cur) return;
  var r=COMPILE.compile($('#code').value);
  if(r.error){ $('#err').textContent=r.error; $('#err').classList.add('show');
               $('#stat').textContent='error'; $('#stat').style.color='firebrick'; return; }
  var js=r.code;
  $('#err').classList.remove('show'); $('#stat').textContent='running'; $('#stat').style.color='seagreen';
  if(!PV){ PV=new Preview($('#out'),{mode:'react'});
    PV.onerror=function(e){ $('#err').textContent='Runtime — '+e.message; $('#err').classList.add('show');
      $('#stat').textContent='error'; $('#stat').style.color='firebrick'; }; }
  PV.update(SHEETS.text('app.css')+'\nbody{padding:1rem}', '', null, js);
}
addEventListener('message',function(e){ if(e.data&&e.data.t==='err'){
  $('#err').textContent=e.data.m; $('#err').classList.add('show');
  $('#stat').textContent='error'; $('#stat').style.color='firebrick'; }});

function hintCount(){ var n=$('#brief').querySelectorAll('.hint.open').length;
  $('#hintstat').textContent = n ? n+' hint'+(n>1?'s':'')+' used' : 'no hints used'; }

function pick(c){
  cur=c;
  document.querySelectorAll('.item').forEach(function(i){ i.setAttribute('aria-current', i.dataset.id===c.id); });
  $('#time').textContent=c.time;
  $('#brief').innerHTML=
    '<div><h2>'+c.title+'</h2><div class="tags">'+c.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div></div>'+
    '<p class="brief">'+c.brief+'</p>'+
    '<p class="ph" style="padding:0;border:0;background:none;position:static">Requirements</p>'+
    '<ul class="req">'+c.req.map(function(r,i){return '<li><input type="checkbox" id="r'+i+'"><label for="r'+i+'">'+r+'</label></li>'}).join('')+'</ul>'+
    '<p class="ph" style="padding:0;border:0;background:none;position:static">Hints — open only when stuck</p>'+
    c.hints.map(function(h,i){return '<div class="hint"><button type="button" data-h="'+i+'">Hint '+(i+1)+'</button><p>'+h+'</p></div>'}).join('');
  $('#brief').querySelectorAll('[data-h]').forEach(function(b){ b.onclick=function(){
    b.parentElement.classList.toggle('open'); hintCount(); log('hint',{id:c.id,hint:+b.dataset.h+1}); };});
  hintCount();
  $('#code').value = localStorage.getItem('practice:'+c.id) || c.start;
  run(); log('open_challenge',{id:c.id});
}

var t;
$('#code').addEventListener('input',function(){ clearTimeout(t); t=setTimeout(function(){ run();
  if(cur) localStorage.setItem('practice:'+cur.id, $('#code').value); },260); });
$('#fmtcode').onclick=function(){ FMT.applyTo($('#code'),'jsx',run); };
$('#reset').onclick=function(){ if(!cur)return; $('#code').value=cur.start; localStorage.removeItem('practice:'+cur.id); run(); };
$('#sol').onclick=function(){ if(!cur)return;
  UX.ask('Show the worked solution?','Try every hint first — the struggle is where the learning is.','Show it')
   .then(function(yes){ if(!yes) return;
     $('#code').value=cur.sol; run(); log('solution',{id:cur.id}); UX.toast('Solution loaded'); }); };
document.querySelectorAll('.vp button').forEach(function(b){ b.onclick=function(){
  document.querySelectorAll('.vp button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
  $('#out').style.width = b.dataset.w==='0' ? '100%' : b.dataset.w+'px'; };});

$('#items').innerHTML = CHALLENGES.map(function(c){
  return '<div class="item" data-id="'+c.id+'"><b>'+c.title+'</b><span><span class="lvl">'+c.level+'</span>'+c.time+'</span></div>';
}).join('');
document.querySelectorAll('.item').forEach(function(el){ el.onclick=function(){
  pick(CHALLENGES.filter(function(c){return c.id===el.dataset.id})[0]); };});

if(typeof VIEWPORT!=='undefined') VIEWPORT.mount($('#out'));
fetch('app.css').then(function(r){return r.text()}).then(function(t){
  APP=t; var a=$('#appcss'); if(a){ a.value=t;
    SHEETS.register('app.css', a, 'app.css');
    SHEETS.onChange(function(){ clearTimeout(run._t); run._t=setTimeout(run,180); }); }
  if(window.FILES) FILES.auto();
  pick(CHALLENGES[0]);
}).catch(function(){pick(CHALLENGES[0])});
log('open');
})();
