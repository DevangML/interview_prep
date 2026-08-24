/* COMPILE — turn a real React FILE into something runnable with no bundler.
 *
 * You write exactly what you would write in the test:
 *     import React, { useState } from 'react';
 *     export default function App() { ... }
 *
 * There is no npm here, so imports are resolved against the vendored globals.
 * Anything other than react / react-dom is REJECTED with the reason — Mettl's
 * simulator has no package manager either, so a third-party import is a real failure.
 */
(function(){
var ALLOWED={'react':'React','react-dom':'ReactDOM','react-dom/client':'ReactDOM'};

function resolveImports(src){
  var head=[], bad=null;
  src=src.replace(/^[ \t]*import\s+([^\n]*?)\s+from\s+['"]([^'"]+)['"]\s*;?[ \t]*$/gm,
    function(all, spec, mod){
      var g=ALLOWED[mod];
      if(!g){ bad=bad||mod; return ''; }
      spec=spec.trim();
      var named=spec.match(/\{([^}]*)\}/);
      var def=spec.replace(/\{[^}]*\}/,'').replace(/,/g,'').trim();
      if(def && def!==g) head.push('const '+def+' = '+g+';');   // `const React = React` is a TDZ crash
      if(named && named[1].trim()) head.push('const {'+named[1].trim()+'} = '+g+';');
      return '';
    });
  src=src.replace(/^[ \t]*import\s+['"]([^'"]+)['"]\s*;?[ \t]*$/gm, function(all,mod){
    if(!ALLOWED[mod]) bad=bad||mod;                 // bare side-effect import (e.g. a CSS file)
    return '';
  });
  return {src:src, head:head, bad:bad};
}

function findExport(src){
  var name=null;
  // `export default function(){}` has no name to return — give it one first.
  src=src.replace(/export\s+default\s+function\s*\(/, 'const __default = function (');
  if(/__default/.test(src)) name='__default';
  // export default function App() {}
  src=src.replace(/export\s+default\s+(function\s+([A-Za-z_$][\w$]*))/, function(a,fn,n){ name=n; return fn; });
  // export default class App extends React.Component {}
  src=src.replace(/export\s+default\s+(class\s+([A-Za-z_$][\w$]*))/, function(a,cl,n){ name=n; return cl; });
  // export default App;
  if(!name) src=src.replace(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?/, function(a,n){ name=n; return ''; });
  // export default () => ... / export default function () {}
  if(!name && /export\s+default\s+/.test(src)){
    name='__default';
    src=src.replace(/export\s+default\s+/, 'const __default = ');
  }
  src=src.replace(/^\s*export\s+(?=(const|let|var|function|class)\b)/gm,'');   // named exports
  return {src:src, name:name};
}


/* The lint must never fire on text that only LOOKS like markup. Blank out every
   string, template literal and comment first, preserving length and newlines so
   match offsets still index the original source. */
function maskLiterals(src){
  var out=src.split(''), i=0, n=src.length, q=null, depth=0;
  function blank(a,b){ for(var k=a;k<b&&k<n;k++) if(out[k]!=='\n') out[k]=' '; }
  while(i<n){
    var ch=src[i], nx=src[i+1];
    if(ch==='/'&&nx==='/'){ var e=src.indexOf('\n',i); if(e<0)e=n; blank(i,e); i=e; continue; }
    if(ch==='/'&&nx==='*'){ var e2=src.indexOf('*/',i); e2=e2<0?n:e2+2; blank(i,e2); i=e2; continue; }
    if(ch==='"'||ch==="'"){
      q=ch; var j=i+1;
      while(j<n && src[j]!==q){ if(src[j]==='\\') j++; j++; }
      blank(i+1,j); i=j+1; continue;
    }
    if(ch==='`'){
      var j2=i+1;
      while(j2<n && src[j2]!=='`'){ if(src[j2]==='\\') j2++; j2++; }
      blank(i+1,j2); i=j2+1; continue;
    }
    i++;
  }
  return out.join('');
}

/* A void element written HTML-style. Brace-aware: an attribute value may contain
   `>` inside a JSX expression (`onChange={e => f(e)}`), which a plain [^>]* eats. */
var VOID=/^(br|hr|img|input|area|base|col|embed|link|meta|source|track|wbr)$/;
function unclosedVoid(masked){
  var re=/<([a-z]+)\b/g, m;
  while((m=re.exec(masked))){
    if(!VOID.test(m[1])) continue;
    var i=m.index+m[0].length, depth=0, end=-1;
    for(; i<masked.length; i++){
      var ch=masked[i];
      if(ch==='{') depth++;
      else if(ch==='}') depth--;
      else if(ch==='>' && depth===0){ end=i; break; }
    }
    if(end<0) continue;
    if(masked[end-1]==='/') continue;                    // already self-closed
    return m[1];
  }
  return null;
}

/* Pasted HTML compiles fine and then explodes inside React as a minified error
   code, which teaches nothing. Catch the four HTML-isms first and name the fix. */
function splitDecls(s){
  var out=[], buf='', depth=0, q=null;
  for(var i=0;i<s.length;i++){
    var ch=s[i];
    if(q){ buf+=ch; if(ch===q) q=null; continue; }
    if(ch==="'"||ch==='"'){ q=ch; buf+=ch; continue; }
    if(ch==='(') depth++;
    if(ch===')') depth--;
    if(ch===';' && depth===0){ out.push(buf); buf=''; continue; }   // url(a?x=1;y=2) survives
    buf+=ch;
  }
  if(buf.trim()) out.push(buf);
  return out;
}
function toStyleObject(s){
  var out=[];
  splitDecls(s).forEach(function(d){
    var i=d.indexOf(':'); if(i<0) return;   // only the FIRST colon — url(https://…) keeps its own
    var p=d.slice(0,i).trim(), v=d.slice(i+1).trim(); if(!p||!v) return;
    if(p.slice(0,2)!=='--') p=p.replace(/-([a-z])/g,function(_,ch){return ch.toUpperCase();});
    out.push((p.slice(0,2)==='--'?JSON.stringify(p):p)+': '+JSON.stringify(v));
  });
  return 'style={{ '+out.join(', ')+' }}';
}
function lintJSX(raw){
  var src=maskLiterals(raw);
  var m=/<[a-zA-Z][^<>]*?[\s"']style\s*=\s*(["\x27])/.exec(src);
  if(m){
    var q=m[1], a=m.index+m[0].length, b=raw.indexOf(q,a);
    var val=b<0?'':raw.slice(a,b);
    return 'In JSX `style` takes an object, not a string — CSS text is not JavaScript.\n\n'
      +'  style='+q+val.replace(/\s+/g,' ')+q+'\n\nbecomes\n\n  '+toStyleObject(val)
      +'\n\nDouble braces: the outer pair is the JSX expression, the inner one is the object.';
  }
  if(/<[a-zA-Z][^<>]*?\sclass\s*=/.test(src))
    return '`class` is a reserved word in JavaScript. JSX uses `className`.';
  if(/<label[^<>]*?\sfor\s*=/.test(src))
    return '`for` is a reserved word in JavaScript. JSX uses `htmlFor`.';
  var v=unclosedVoid(src);
  if(v) return '`<'+v+'>` never closes in HTML, but JSX has no void elements — '
    +'every tag must close. Write `<'+v+' />`.';
  return null;
}

/* returns { code, name, error } — code is plain JS ready for new Function */
function build(source){
  var i=resolveImports(source);
  // a commented-out `export default X` must not win over the real one
  var codeOnly=maskLiterals(i.src);
  if(i.bad) return {error:'`'+i.bad+'` cannot be imported. The test environment has no package '
    +'manager — only react and react-dom are available. Write it yourself.'};
  var lint=lintJSX(i.src);
  if(lint) return {error:lint};
  var e=findExport(/export\s+default/.test(codeOnly) ? i.src : codeOnly);
  if(!e.name){
    var hasDecl=/^\s*(import\b|export\b|function\s+[A-Za-z_$]|class\s+[A-Za-z_$]|(const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(\(|function|async|[A-Za-z_$][\w$]*\s*=>))/m.test(source);
    var looksLikeBody=!hasDecl && /^\s*return\s*\(?\s*</m.test(source);
    return {error: looksLikeBody
      ? 'This is a component body, not a file. Wrap it:\n\n'
        +"import React from 'react';\n\nexport default function App() {\n  …your code…\n}"
      : 'No default export found. End the file with `export default App;` '
        +'or write `export default function App() { … }`.'};
  }
  return {code:i.head.join('\n')+'\n'+e.src+'\n;return '+e.name+';', name:e.name};
}

/* full pipeline: file -> JSX transpiled -> runnable factory source */
var babelUrl = window.location.href.replace(/[^/]+$/, "vendor/babel.min.js");
var workerCode = `
  importScripts("` + babelUrl + `");
  self.onmessage = function(e) {
    try {
      var out = Babel.transform(e.data.code, {presets: [['react', {}]], parserOpts: {allowReturnOutsideFunction:true}}).code;
      self.postMessage({ id: e.data.id, result: {code: out, name: e.data.name} });
    } catch(err) {
      self.postMessage({ id: e.data.id, result: {error: 'Syntax — ' + err.message} });
    }
  };
`;
var workerBlob = new Blob([workerCode], {type: 'application/javascript'});
var babelWorker = new Worker(URL.createObjectURL(workerBlob));
var jobCounter = 0;
var callbacks = {};

babelWorker.onmessage = function(e) {
  var cb = callbacks[e.data.id];
  if (cb) {
    delete callbacks[e.data.id];
    cb(e.data.result);
  }
};

function compileAsync(source) {
  return new Promise(function(resolve) {
    var b = build(source);
    if(b.error) { resolve(b); return; }
    var id = ++jobCounter;
    callbacks[id] = resolve;
    babelWorker.postMessage({ id: id, code: b.code, name: b.name });
  });
}

function compile(source){
  var b=build(source);
  if(b.error) return b;
  try{
    var out=Babel.transform(b.code,{presets:[['react',{}]],parserOpts:{allowReturnOutsideFunction:true}}).code;
    return {code:out, name:b.name};
  }catch(err){ return {error:'Syntax — '+err.message}; }
}
window.COMPILE={compile:compile, compileAsync:compileAsync, build:build, lint:lintJSX, allowed:ALLOWED};
})();
