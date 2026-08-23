/* Node test harness for the pure logic. No browser, no pane, deterministic.
   This is the thing whose absence let broken code ship. */
const fs=require('fs'), path=require('path');
const DIR=path.join(__dirname,'..');
let pass=0, fail=[];
function ok(name,cond,detail){ cond?pass++:fail.push(name+(detail?' — '+detail:'')); }
function load(...files){
  const g={window:{},document:{createElement:()=>({getContext:()=>({fillStyle:''}),style:{},setAttribute(){},appendChild(){}}),
    addEventListener(){},dispatchEvent(){},querySelectorAll:()=>[],head:{appendChild(){}}},
    Babel:{transform:c=>({code:c})},localStorage:{getItem:()=>null,setItem(){}},
    setTimeout,clearTimeout,console,
    Event:function(t,o){ this.type=t; Object.assign(this,o||{}); },
    CustomEvent:function(t,o){ this.type=t; Object.assign(this,o||{}); },
    Promise, JSON, Math, Date, Array, Object, String, Number, RegExp, Function, Error};
  g.globalThis=g; g.self=g;
  const vm=require('vm'); vm.createContext(g);
  files.forEach(f=>vm.runInContext(fs.readFileSync(path.join(DIR,f),'utf8'),g,{filename:f}));
  return g.window;
}

/* ── cssmodel: offsets and write stability ── */
{
  const W=load('cssmodel.js'), M=W.CSSMODEL, ta=v=>({value:v,dispatchEvent(){}});
  ['.a{ padding: 10px; color: red }','.a{padding:10px;color:red}','.a {\n  padding: 10px;\n  color: red;\n}','.a{ color : red ; }']
    .forEach((css,i)=>M.parse(css).forEach(r=>r.decls.forEach(d=>
      ok('offsets exact #'+i, css.slice(d.start,d.end)===d.val, JSON.stringify(d.val)))));
  let t=ta('.card{background:steelblue;padding:1rem}\n.card p{margin:0}\n.wrap{display:grid;gap:8px}');
  for(let f=0;f<60;f++){ M.write(t,'.card','padding',(10+f)+'px'); M.write(t,'.wrap','gap',(8+f)+'px');
    M.write(t,'.card','width',(200+f)+'px'); M.write(t,'.card','border-radius',f+'px'); }
  ok('240 writes: no drift', /padding:69px/.test(t.value)&&/gap:67px/.test(t.value)
    &&/width: 259px/.test(t.value)&&/border-radius: 59px/.test(t.value), t.value.replace(/\n/g,' '));
  ok('240 writes: no duplication', (t.value.match(/width/g)||[]).length===1);
  ok('240 writes: sibling intact', /\.card p\{margin:0\}/.test(t.value));
  t=ta('.a{ width:1px }\n.b{ width:2px }'); M.write(t,'.b','width','9px');
  ok('no cross-rule write', /\.a\{ width:1px \}/.test(t.value)&&/\.b\{ width:9px \}/.test(t.value));
  t=ta('.a{ color:red }'); M.write(t,'.a','h','1px',{noCreate:true});
  ok('noCreate honoured', !/h:/.test(t.value));
}

/* ── compile: real React files only, no libraries ── */
{
  const W=load('compile.js'), C=W.COMPILE;
  const shapes=[
    ["import React, { useState } from 'react';\nexport default function App(){ return null; }",'App'],
    ["import React from 'react';\nclass App extends React.Component{ render(){return null} }\nexport default App;",'App'],
    ["import React from 'react';\nexport default class App extends React.Component{ render(){return null} }",'App'],
    ["import { useState } from 'react';\nexport default function Counter(){ return null; }",'Counter']];
  shapes.forEach(([s,want],i)=>{ const r=C.build(s);
    ok('file shape #'+i, !r.error && r.name===want, r.error||r.name); });
  ok('no self-shadowed React', !/const React = React/.test(C.build(shapes[0][0]).code));
  const bad=C.build("import axios from 'axios';\nexport default function App(){return null}");
  ok('library import rejected', !!bad.error && /axios/.test(bad.error));
  ok('missing export caught', !!C.build("function App(){return null}").error);
}

/* ── app.css: the mandatory core must stay small and typable ── */
{
  const css=fs.readFileSync(path.join(DIR,'app.css'),'utf8');
  const iA=css.indexOf('PART A · MANDATORY — type'), iB=css.indexOf('PART B · ADD-ONS — not tested');
  ok('app.css split present', iA>-1 && iB>iA);
  const A=css.slice(iA,iB), B=css.slice(iB);
  const real=t=>t.split('\n').filter(l=>l.trim()&&!/^\s*(\/\*|\*|─|═)/.test(l)).length;
  ok('Part A stays small', real(A)<=22, real(A)+' lines');
  ok('Part B stays small', real(B)<=8, real(B)+' lines');
  ['color-mix','@container','container-type','subgrid',':where(','clip-path','* 999']
    .forEach(x=>ok('Part A free of '+x, !A.includes(x)));
  ok('Part A has the reset first', A.indexOf('box-sizing')<A.indexOf('.stack'));
}

/* ── compile diagnoses the right cause ── */
{
  const C=load('compile.js').COMPILE;
  const real="import React from 'react';\nfunction App(){\n  const a=1;\n  return (<div/>);\n}";
  ok('body-detect does not fire on a real file',
     (C.build(real).error||'').includes('No default export'),
     'every React file has a top-level const and a return < — the old heuristic matched them all');
  ok('body-detect fires on an actual body',
     (C.build('  const a=1;\n  return (\n    <div/>\n  );').error||'').includes('component body'));
  ok('an import cannot swallow the export',
     C.build("import React from 'react';\nexport default function App(){\n  const t='from';\n  return <b/>;\n}").name==='App',
     'the lazy [\\s\\S]*? in the import regex could span lines and eat the export');
  const h=fs.readFileSync(path.join(DIR,'ladder.html'),'utf8');
  ok('ladder Reset restores the right file', /ta\.value=\(isJ\?l\.jsx:l\.css\)/.test(h),
     'Reset wrote l.css into JSX lessons, all of which have css:null — it blanked the editor');
}

/* ── every shipped buffer is a real React file ── */
{
  function bodyish(s){ if(typeof s!=='string'||s.includes('export default')) return false;
    if(/<code>|<\/b>|<br>/.test(s)) return false; if(!s.includes('\n')) return false;
    return /\breturn\s*\(?\s*</.test(s); }
  const W=load('challenges.js');
  let bad=[];
  W.CHALLENGES.forEach(c=>['start','sol'].forEach(k=>{ if(bodyish(c[k])) bad.push('practice '+c.id+'.'+k); }));
  const h=fs.readFileSync(path.join(DIR,'ladder.html'),'utf8');
  let i=h.indexOf('const DATA=')+11,d=0,j=i;
  for(;;){ if(h[j]==='{')d++; else if(h[j]==='}'){d--; if(!d)break;} j++; }
  const L=JSON.parse(h.slice(i,j+1).replace(/<\\\//g,'</')).lessons;
  L.filter(l=>l.isjsx).forEach(l=>{ if(bodyish(l.jsx)) bad.push('ladder '+l.title.slice(0,24)); });
  ok('no body-only buffers ship', bad.length===0, bad.join(', '));
  ok('open-in-playground emits a file', /const j=isJ\?\(ta\?ta\.value:l\.jsx\):\(l\.jsx\|\|\("import React/.test(h));
  const mig=fs.readFileSync(path.join(DIR,'migrate.js'),'utf8');
  ok('stale buffers are migrated', /export default/.test(mig) && /removeItem/.test(mig));
}

/* ── focus safety + body-only guidance ── */
{
  const ed=fs.readFileSync(path.join(DIR,'editor.js'),'utf8');
  ok('no document-wide editor observer', !/new MutationObserver\([\s\S]{0,200}?observe\(document\.body/.test(ed),
     'an observer re-scanning on every mutation is what blurred the editor');
  ok('focused editors are never disposed', /hasFocus\(\)\)\s*return/.test(ed));
  ok('format never steals focus', /if\(cm\.hasFocus\(\)\)\s*return/.test(ed),
     'async Prettier resolving after a click would blur the editor');
  ok('format restores scroll+cursor', /scrollTo\(s\.left,s\.top\)/.test(ed));
  ok('format wrapped in cm.operation', /cm\.operation\(/.test(ed));

  const W=load('compile.js'), C=W.COMPILE;
  const body='const [n,setN]=useState(0);\nreturn (<div className="box">{n}</div>);';
  const r=C.build(body);
  ok('body-only gets a fix, not a rule', !!r.error && /component body, not a file/.test(r.error));
  ok('the fix is copy-pasteable', !!r.error && /export default function App\(\)/.test(r.error));

  const ar=fs.readFileSync(path.join(DIR,'arena.html'),'utf8');
  ok('arena blank fallback compiles', !/return <div className=\\"box\\">Start here/.test(ar));
}

/* ── contrast floor: never claim a colour scheme we do not have ── */
{
  const th=fs.readFileSync(path.join(DIR,'theme.css'),'utf8');
  ok('no unbacked dark scheme', !/color-scheme:\s*light\s+dark/.test(th),
     'color-scheme: light dark with no dark palette turns controls white-on-white');
  ok('defensive contrast present', /defensive contrast/.test(th));
  ['button,.btn,.b,.tb,.mini,.opt,.ux-btn','.vp-bar button','.fx-tab']
    .forEach(sel=>ok('colour set for '+sel, th.includes(sel)));
}

/* ── content: challenges are real files; rapid solutions pass their own tests ── */
{
  const W=load('challenges.js');
  let bad=[];
  W.CHALLENGES.forEach(c=>['start','sol'].forEach(k=>{
    if(!/^import React/.test(c[k])) bad.push(c.id+'.'+k+' no import');
    if(!/export default function App/.test(c[k])) bad.push(c.id+'.'+k+' no export');
  }));
  ok('challenges are real files', bad.length===0, bad.join(', '));
}
(async()=>{
  const W=load('rapid-items.js');
  const S=W.RAPID.filter(x=>x.t==='snippet');
  for(const x of S){
    const name=(x.sol.match(/^\s*(?:const|function)\s+(\w+)/)||[])[1];
    try{ const fn=new Function(x.sol+'\n;return '+name+';')();
         ok('snippet '+x.topic, (await x.test(fn))===true); }
    catch(e){ ok('snippet '+x.topic, false, e.message.slice(0,40)); }
  }
  const mcq=W.RAPID.filter(x=>x.t==='mcq');
  ok('mcq well-formed', mcq.every(m=>m.a.length===4&&m.c>=0&&m.c<4&&m.why), 'shape');
  console.log('\n'+pass+' passed, '+fail.length+' failed');
  if(fail.length) { console.log('FAILED:'); fail.forEach(f=>console.log('  · '+f)); process.exit(1); }
  console.log('all green');
})();
