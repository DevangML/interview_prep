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

/* ── CSS 100 gauntlet ── */
{
  const ctx2={console};ctx2.window=ctx2;require('vm').createContext(ctx2);
  require('vm').runInContext(fs.readFileSync(path.join(DIR,'css100.js'),'utf8'),ctx2);
  const S=ctx2.CSS100, It=S.items;
  ok('CSS 100 has exactly 100 questions', It.length===100, 'got '+It.length);
  ok('ids are unique', new Set(It.map(i=>i.id)).size===100);
  const seen=new Set(It.map(i=>i.cat));
  ok('every declared topic has questions', S.cats.every(c=>seen.has(c.k)),
     'missing: '+S.cats.filter(c=>!seen.has(c.k)).map(c=>c.k));
  ok('no question uses React state or events',
     !It.some(i=>/useState|useEffect|useRef|useMemo|onClick|onChange|onSubmit/.test(i.jsx)),
     'these are CSS questions — reactivity would change what is being tested');
  ok('the learner writes the markup, not just the CSS',
     It.every(i=>i.jsx.includes('TODO — build this structure') && i.markup && i.markup.length>10),
     'component.jsx must start as an empty shell with the structure specified');
  ok('the structure spec names exact class names',
     It.every(i=>{ const cls=(i.markup.match(/className="([^"]*)"/g)||[]).map(s=>s.split('"')[1].split(' ')[0]);
       return cls.every(cn=>i.jsx.includes('.'+cn)); }),
     'the CSS depends on those class names, so the spec must give them');
  ok('the reference markup is revealed with the answer',
     fs.readFileSync(path.join(DIR,'c100.js'),'utf8').includes('it.markup'));
  ok('every component is a real importable file',
     It.every(i=>i.jsx.includes("import React from 'react'") && i.jsx.includes('export default')),
     'the boilerplate must be exactly what Mettl expects');
  ok('every question states what to use and for what',
     It.every(i=>Array.isArray(i.use) && i.use.length && i.use.every(u=>u.length===2 && u[0] && u[1])),
     'nothing may be left to the learner to pick');
  const drawn=d=>((d.box||[]).filter(b=>b&&b.length>=4).length)+((d.frame&&d.frame.length>=4)?1:0);
  ok('every diagram actually draws something', It.every(i=>drawn(i.dia)>0),
     'an empty array is truthy — the old assertion passed on dia:{box:[]}');
  ok('no diagram box has undefined geometry',
     It.every(i=>(i.dia.box||[]).every(b=>b.length>=4 && b.slice(0,4).every(n=>typeof n==='number'))),
     'dia:{box:[[]]} used to emit <rect x="undefined"> and pass');
  ok('two-state questions draw BOTH states',
     ['TRK-02','TRK-04','TRK-05','TRK-06','CQ-04','UNI-04','ANT-03'].every(id=>It.find(i=>i.id===id).dia.alt),
     'for these the second state IS the lesson');
  ok('no dead diagram keys remain', It.every(i=>Object.keys(i.dia).every(k=>
     ['w','h','frame','box','gap','note','arrow','track','alt','labels'].includes(k))),
     'box2 was authored on 3 items and never rendered');
  ok('every question has hints, an answer and a rationale',
     It.every(i=>i.hints && i.hints.length && i.sol && i.why && i.goal && i.task));
  ok('the editable file always marks the missing part',
     It.every(i=>/TODO/.test(i.css)), It.filter(i=>!/TODO/.test(i.css)).map(i=>i.id).join(','));
  ok('items with no observable change say so',
     It.filter(i=>i.visual===false).every(i=>i.verify && i.verify.length>20),
     'the page promises "compare your preview to the diagram" — it must not lie');
  ok('use[] names properties, not class names',
     It.every(i=>i.use.some(u=>!u[0].startsWith('.'))),
     'PRM-08 listed .cover/.stack, which tells the learner nothing about what to type');
  const C=load('compile.js').COMPILE;
  const broken=It.filter(i=>C.build(i.jsx).error);
  ok('every component compiles', broken.length===0,
     broken.slice(0,3).map(i=>i.id+': '+C.build(i.jsx).error.split('\n')[0]).join(' | '));
  const D=load('dia.js').DIA;
  const badDia=It.filter(i=>{ const s=D.figure(i.dia); return !/<(svg|div)/.test(s)||!/<\/(svg|div)>$/.test(s); });
  ok('every diagram renders', badDia.length===0, badDia.map(i=>i.id).join(','));
  const noRect=It.filter(i=>!/<rect/.test(D.figure(i.dia)));
  ok('every diagram emits at least one rect', noRect.length===0,
     'render() always emits <svg>...</svg>, so the old wrapper check could not fail: '+noRect.map(i=>i.id).join(','));
  const app=fs.readFileSync(path.join(DIR,'app.css'),'utf8');
  const defined=new Set([...app.matchAll(/^\.([a-z][\w-]*)/gm)].map(m=>m[1]));
  const leak=It.filter(i=>i.useApp!==false &&
    [...i.css.matchAll(/\.([a-z][\w-]*)[^{]*\{[^}]*TODO/g)].map(m=>m[1]).some(a=>defined.has(a)));
  ok('app.css never answers a question for you', leak.length===0,
     'these load app.css but ask you to write a class it already defines: '+leak.map(i=>i.id).join(','));
  ok('the box-sizing question withholds the universal reset',
     It.find(i=>i.id==='BOX-01').useApp===false);
  const ctrl=fs.readFileSync(path.join(DIR,'c100.js'),'utf8');
  ok('the controller honours useApp', /cur\.useApp===false\s*\)\s*\?/.test(ctrl),
     'a bare grep for the string passed even with the branch inverted');
  ok('a question that would be pre-solved withholds app.css',
     It.find(i=>i.id==='TRK-05').useApp===false,
     'app.css .grid ships repeat(auto-fit,...) — it answered the auto-fit half outright');
  const page=fs.readFileSync(path.join(DIR,'css100.html'),'utf8');
  ['css100.js','c100.js','dia.js','compile.js','editor.js'].forEach(f=>
    ok('css100.html loads '+f, page.includes('src="'+f)));
}

/* ── JSX lint catches HTML-isms before React throws a minified code ── */
{
  const C=load('compile.js').COMPILE;
  const f=b=>"import React from 'react';\nexport default function App(){ return (\n"+b+"\n); }";
  const err=b=>(C.build(f(b)).error||'');
  ok('string style is caught, not auto-fixed',
     err('  <div style="display:grid; gap: 1rem">x</div>').includes('takes an object'),
     'React reports this as minified error #62, which teaches nothing');
  ok('the fix is spelled out',
     err('  <div style="display:grid; gap: 1rem">x</div>').includes('style={{ display: "grid", gap: "1rem" }}'));
  ok('a multi-line style attribute is still caught',
     err('  <div style="display:grid;\n    gap: 1rem">x</div>').includes('takes an object'),
     'the old auto-fix used (.*?) with no s flag and silently skipped these');
  ok('class is caught',    err('  <div class="c">x</div>').includes('className'));
  ok('for is caught',      err('  <label for="n">N</label>').includes('htmlFor'));
  ok('void tags caught',   err('  <div>a<br>b</div>').includes('<br />'));
  ok('correct JSX passes', !err('  <div className="c" style={{ gap: "1rem" }}>x<br />y</div>'));
  const h=fs.readFileSync(path.join(DIR,'ladder.html'),'utf8');
  ok('no render path bypasses COMPILE', !/function jsxdoc\(/.test(h),
     'jsxdoc() transpiled straight through Babel, skipping every lint');
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

/* ── React error #62 defense: the compiler refuses, it does not paper over ── */
{
  const W=load('compile.js'), C=W.COMPILE;
  const sample="import React from 'react';\nexport default function App(){\n  return <div style=\"margin: 0; padding-top: 10px; --space: 1rem\">Test</div>;\n}";
  const built=C.build(sample);
  ok('a string style is refused, never silently rewritten',
     (built.error||'').includes('takes an object'),
     'auto-fixing hides a mistake Mettl will not auto-fix');
  ok('the refusal names the exact replacement',
     (built.error||'').includes('style={{ margin: "0", paddingTop: "10px", "--space": "1rem" }}'));

  const h=fs.readFileSync(path.join(DIR,'ladder.html'),'utf8');
  ok('ladder.html includes convertHtmlToJsx', h.includes('function convertHtmlToJsx'));
  ok('ladder.html playground uses convertHtmlToJsx', h.includes('convertHtmlToJsx(l.html'));

  const pg=fs.readFileSync(path.join(DIR,'pg.js'),'utf8');
  ok('pg.js does not double-decode query params', !/decodeURIComponent\(q\.get/.test(pg),
     'URLSearchParams.get() already decodes percent-encoding; decodeURIComponent() causes URIError on CSS with % units');
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
