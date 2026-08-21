(function(){
var $=function(s){return document.querySelector(s)};
var APP='', S='<'+'script', E='<'+'/script>';
var DEMO_JSX=[
"const [query, setQuery] = useState('');",
"const plans = ['Starter', 'Team', 'Scale'];",
"const shown = plans.filter(p => p.toLowerCase().includes(query.toLowerCase()));",
"",
"return (",
"  <div className=\"stack\">",
"    <div className=\"between box\">",
"      <strong>Pricing</strong>",
"      <input",
"        className=\"input\"",
"        style={{ width: 'auto' }}",
"        placeholder=\"Filter plans…\"",
"        value={query}",
"        onChange={e => setQuery(e.target.value)}",
"      />",
"    </div>",
"",
"    <div className=\"switcher\">",
"      {shown.map(name => (",
"        <div className=\"box stack\" key={name}>",
"          <strong>{name}</strong>",
"          <p className=\"muted\" style={{ margin: 0, fontSize: '.875rem' }}>From $19/mo</p>",
"          <button className=\"btn\" data-v=\"primary\">Choose</button>",
"        </div>",
"      ))}",
"      {shown.length === 0 && <p className=\"muted\">No plans match “{query}”.</p>}",
"    </div>",
"  </div>",
");"].join('\n');
var DEMO_CSS=[
"/* app.css is loaded. UNITS: rem for type+space, em for control padding,",
"   ch for line length, dvh for full height, clamp() for fluid type.",
"   Hairlines and shadows stay px on purpose. */",
".box   { box-shadow: 0 1px 2px rgb(0 0 0 / .05); }",
".stack { --space: 1.5rem; }"].join('\n');

function run(){
  var code;
  try{ code=Babel.transform('function App(){\n'+$('#jsx').value+'\n}',{presets:[['react',{}]]}).code; }
  catch(e){ $('#err').textContent='JSX error — '+e.message; $('#err').classList.add('show');
            $('#stat').textContent='error'; $('#stat').style.color='firebrick'; return; }
  $('#err').classList.remove('show'); $('#stat').textContent='ok'; $('#stat').style.color='seagreen';
  $('#out').srcdoc='<!doctype html><html><head><meta charset="utf-8"><style>'+APP+'\nbody{padding:1rem}\n'+$('#css').value+'</style></head><body>'
    +'<div id="root"></div>'
    +S+' src="vendor/react.js">'+E+S+' src="vendor/react-dom.js">'+E
    +S+'>'
    +'var R=React,useState=R.useState,useEffect=R.useEffect,useMemo=R.useMemo,useRef=R.useRef,'
    +'useCallback=R.useCallback,useReducer=R.useReducer,Fragment=R.Fragment;'
    +'window.onerror=function(m){parent.postMessage({t:"err",m:"Runtime — "+m},"*")};'
    +'try{'+code+'\nReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));}'
    +'catch(e){parent.postMessage({t:"err",m:"Runtime — "+e.message},"*");}'
    +E+'</body></html>';
}
addEventListener('message',function(e){ if(e.data&&e.data.t==='err'){
  $('#err').textContent=e.data.m; $('#err').classList.add('show');
  $('#stat').textContent='error'; $('#stat').style.color='firebrick'; }});

var t; function deb(){ clearTimeout(t); t=setTimeout(run,220); }
$('#jsx').addEventListener('input',deb); $('#css').addEventListener('input',deb);
document.querySelectorAll('.vp button').forEach(function(b){ b.onclick=function(){
  document.querySelectorAll('.vp button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
  $('#out').style.width = b.dataset.w==='0' ? '100%' : b.dataset.w+'px'; };});
$('#reset').onclick=function(){ $('#jsx').value=DEMO_JSX; $('#css').value=DEMO_CSS; run(); };
$('#fmt').onclick=function(){ $('#css').value=FMT.css($('#css').value); run(); };
$('#fmtjsx').onclick=function(){ $('#jsx').value=FMT.jsx($('#jsx').value); run(); };

var q=new URLSearchParams(location.search);
$('#jsx').value=q.get('jsx')?decodeURIComponent(q.get('jsx')):DEMO_JSX;
$('#css').value=q.get('css')?decodeURIComponent(q.get('css')):DEMO_CSS;
fetch('app.css').then(function(r){return r.text()}).then(function(t){APP=t;run();}).catch(run);
})();
