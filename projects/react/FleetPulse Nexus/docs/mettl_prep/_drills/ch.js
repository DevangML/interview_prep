(function(){
var $=function(s){return document.querySelector(s)};
var cur=null, APP='', S='<'+'script', E='<'+'/script>';
var log=function(ev,x){try{fetch('/api/activity',{method:'POST',body:JSON.stringify(Object.assign({ev:ev,page:'practice'},x||{}))})}catch(e){}};

function run(){
  if(!cur) return;
  var js;
  try{ js=Babel.transform('function App(){\n'+$('#code').value+'\n}',{presets:[['react',{}]]}).code; }
  catch(e){ $('#err').textContent='JSX error — '+e.message; $('#err').classList.add('show');
            $('#stat').textContent='error'; $('#stat').style.color='firebrick'; return; }
  $('#err').classList.remove('show'); $('#stat').textContent='running'; $('#stat').style.color='seagreen';
  $('#out').srcdoc='<!doctype html><html><head><meta charset="utf-8"><style>'+APP+'\nbody{padding:1rem}</style></head><body>'
    +'<div id="root"></div>'
    +S+' src="vendor/react.js">'+E+S+' src="vendor/react-dom.js">'+E+S+'>'
    +'var R=React,useState=R.useState,useEffect=R.useEffect,useMemo=R.useMemo,useRef=R.useRef,'
    +'useCallback=R.useCallback,useReducer=R.useReducer,Fragment=R.Fragment;'
    +'window.onerror=function(m){parent.postMessage({t:"err",m:"Runtime — "+m},"*")};'
    +'try{'+js+'\nReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));}'
    +'catch(e){parent.postMessage({t:"err",m:"Runtime — "+e.message},"*");}'
    +E+'</body></html>';
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
$('#reset').onclick=function(){ if(!cur)return; $('#code').value=cur.start; localStorage.removeItem('practice:'+cur.id); run(); };
$('#sol').onclick=function(){ if(!cur)return;
  if(!confirm('Show the worked solution? Try every hint first — the struggle is where the learning is.')) return;
  $('#code').value=cur.sol; run(); log('solution',{id:cur.id}); };
document.querySelectorAll('.vp button').forEach(function(b){ b.onclick=function(){
  document.querySelectorAll('.vp button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
  $('#out').style.width = b.dataset.w==='0' ? '100%' : b.dataset.w+'px'; };});

$('#items').innerHTML = CHALLENGES.map(function(c){
  return '<div class="item" data-id="'+c.id+'"><b>'+c.title+'</b><span><span class="lvl">'+c.level+'</span>'+c.time+'</span></div>';
}).join('');
document.querySelectorAll('.item').forEach(function(el){ el.onclick=function(){
  pick(CHALLENGES.filter(function(c){return c.id===el.dataset.id})[0]); };});

fetch('app.css').then(function(r){return r.text()}).then(function(t){APP=t;pick(CHALLENGES[0]);})
  .catch(function(){pick(CHALLENGES[0])});
log('open');
})();
