(function(){
var $=function(s){return document.querySelector(s)};
var APP='', S='<'+'script', E='<'+'/script>';
var DEMO_JSX=[
"import React, { useState } from 'react';",
"",
"export default function App() {",
"  const [query, setQuery] = useState('');",
"  const plans = ['Starter', 'Team', 'Scale'];",
"  const shown = plans.filter(p => p.toLowerCase().includes(query.toLowerCase()));",
"",
"  return (",
"    <div className=\"stack\">",
"      <div className=\"between box\">",
"        <strong>Pricing</strong>",
"        <input",
"          className=\"input\"",
"          style={{ width: 'auto' }}",
"          placeholder=\"Filter plans\u2026\"",
"          value={query}",
"          onChange={e => setQuery(e.target.value)}",
"        />",
"      </div>",
"",
"      <div className=\"switcher\">",
"        {shown.map(name => (",
"          <div className=\"box stack\" key={name}>",
"            <strong>{name}</strong>",
"            <p className=\"muted\" style={{ margin: 0, fontSize: '.875rem' }}>From $19/mo</p>",
"            <button className=\"btn\" data-v=\"primary\">Choose</button>",
"          </div>",
"        ))}",
"        {shown.length === 0 && <p className=\"muted\">No plans match \u201c{query}\u201d.</p>}",
"      </div>",
"    </div>",
"  );",
"}",
""
].join('\n');
var DEMO_CSS=[
"/* app.css is loaded. UNITS: rem for type+space, em for control padding,",
"   ch for line length, dvh for full height, clamp() for fluid type.",
"   Hairlines and shadows stay px on purpose. */",
".box   { box-shadow: 0 1px 2px rgb(0 0 0 / .05); }",
".stack { --space: 1.5rem; }"].join('\n');

var PV=null;
function ok(){ $('#err').classList.remove('show'); $('#stat').textContent='ok'; $('#stat').style.color='seagreen'; }
function bad(m){ $('#err').textContent=m; $('#err').classList.add('show'); $('#stat').textContent='error'; $('#stat').style.color='firebrick'; }
function run(){
  var r=COMPILE.compile($('#jsx').value);
  if(r.error){ bad(r.error); return; }
  var code=r.code;
  if(!PV){ PV=new Preview($('#out'),{mode:'react'}); PV.onerror=function(e){bad('Runtime — '+e.message)}; PV.onok=ok; }
  PV.update(SHEETS.text('app.css')+'\nbody{padding:1rem}', $('#css').value, null, code);
  return;
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
$('#fmt').onclick=function(){ FMT.applyTo($('#css'),'css',run); };
$('#fmtjsx').onclick=function(){ FMT.applyTo($('#jsx'),'jsx',run); };

var q=new URLSearchParams(location.search);
var jParam=q.get('jsx'), cParam=q.get('css');
$('#jsx').value = (jParam != null ? jParam : DEMO_JSX);
$('#css').value = (cParam != null ? cParam : DEMO_CSS);
if(typeof VIEWPORT!=='undefined') VIEWPORT.mount($('#out'));
fetch('app.css').then(function(r){return r.text()}).then(function(t){
  APP=t; $('#appcss').value=t;
  SHEETS.register('app.css', $('#appcss'), 'app.css');
  SHEETS.register('styles.css', $('#css'), 'styles.css');
  SHEETS.onChange(function(){ clearTimeout(run._t); run._t=setTimeout(run,180); });
  if(window.FILES) FILES.auto();
  run();
}).catch(run);

})();
