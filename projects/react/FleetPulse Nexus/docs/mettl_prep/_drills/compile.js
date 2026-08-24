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
  // export default function App() {}
  src=src.replace(/export\s+default\s+(function\s+([A-Za-z_$][\w$]*))/, function(a,fn,n){ name=n; return fn; });
  // export default class App extends React.Component {}
  src=src.replace(/export\s+default\s+(class\s+([A-Za-z_$][\w$]*))/, function(a,cl,n){ name=n; return cl; });
  // export default App;
  src=src.replace(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?/, function(a,n){ name=n; return ''; });
  // export default () => ... / export default function () {}
  if(!name && /export\s+default\s+/.test(src)){
    name='__default';
    src=src.replace(/export\s+default\s+/, 'const __default = ');
  }
  src=src.replace(/^\s*export\s+(?=(const|let|var|function|class)\b)/gm,'');   // named exports
  return {src:src, name:name};
}

/* Pasted HTML compiles fine and then explodes inside React as a minified error
   code, which teaches nothing. Catch the four HTML-isms first and name the fix. */
function toStyleObject(s){
  var out=[];
  s.split(';').forEach(function(d){
    var i=d.indexOf(':'); if(i<0) return;
    var p=d.slice(0,i).trim(), v=d.slice(i+1).trim(); if(!p||!v) return;
    if(p.slice(0,2)!=='--') p=p.replace(/-([a-z])/g,function(_,ch){return ch.toUpperCase();});
    out.push((p.slice(0,2)==='--'?JSON.stringify(p):p)+': '+JSON.stringify(v));
  });
  return 'style={{ '+out.join(', ')+' }}';
}
function lintJSX(src){
  var m=src.match(/\bstyle\s*=\s*(["\x27])([\s\S]*?)\1/);
  if(m) return 'In JSX `style` takes an object, not a string — CSS text is not JavaScript.\n\n'
    +'  '+m[0].replace(/\s+/g,' ')+'\n\nbecomes\n\n  '+toStyleObject(m[2])
    +'\n\nDouble braces: the outer pair is the JSX expression, the inner one is the object.';
  if(/<[a-z][^>]*\sclass\s*=/.test(src))
    return '`class` is a reserved word in JavaScript. JSX uses `className`.';
  if(/<label[^>]*\sfor\s*=/.test(src))
    return '`for` is a reserved word in JavaScript. JSX uses `htmlFor`.';
  var v=src.match(/<(br|hr|img|input)\b([^>]*)>/);
  if(v && !/\/\s*$/.test(v[2])) return '`<'+v[1]+'>` never closes in HTML, but JSX has no void elements — '
    +'every tag must close. Write `<'+v[1]+' />`.';
  return null;
}

/* returns { code, name, error } — code is plain JS ready for new Function */
function build(source){
  var i=resolveImports(source);
  if(i.bad) return {error:'`'+i.bad+'` cannot be imported. The test environment has no package '
    +'manager — only react and react-dom are available. Write it yourself.'};
  var lint=lintJSX(i.src);
  if(lint) return {error:lint};
  var e=findExport(i.src);
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
function compile(source){
  var b=build(source);
  if(b.error) return b;
  try{
    var out=Babel.transform(b.code,{presets:[['react',{}]],parserOpts:{allowReturnOutsideFunction:true}}).code;
    return {code:out, name:b.name};
  }catch(err){ return {error:'Syntax — '+err.message}; }
}
window.COMPILE={compile:compile, build:build, lint:lintJSX, allowed:ALLOWED};
})();
