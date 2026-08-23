/* Formatting + typing behaviour.
   - Prettier when present, fallback otherwise.
   - ONE delegated keydown listener on document => works for textareas created later
     (ladder lessons, arena, practice) with no per-page wiring.
   - FMT.applyTo() handles the async format + assignment so call sites never see a Promise. */
(function(){
var P=null,PL=null;
function ready(){ if(P) return true;
  if(typeof prettier!=='undefined'&&typeof prettierPlugins!=='undefined'){P=prettier;PL=prettierPlugins;return true;}
  return false; }
var OPTS={semi:true,singleQuote:true,printWidth:72,tabWidth:2,jsxSingleQuote:false};

async function jsx(src){ if(ready()){try{return await P.format(src,Object.assign({parser:'babel',plugins:[PL.babel,PL.estree]},OPTS));}catch(e){}} return src; }
async function css(src){ if(ready()){try{return await P.format(src,{parser:'css',plugins:[PL.postcss],tabWidth:2,printWidth:80});}catch(e){}} return fbCSS(src); }
async function html(src){ if(ready()&&PL.html){try{return await P.format(src,{parser:'html',plugins:[PL.html],tabWidth:2});}catch(e){}} return src; }

function fbCSS(s){var o='',i=0,d=0;s=s.replace(/\s+/g,' ').replace(/\s*([{};,])\s*/g,'$1');
 while(i<s.length){var c=s[i];
  if(s.startsWith('/*',i)){var e=s.indexOf('*/',i)+2;o+='  '.repeat(d)+s.slice(i,e)+'\n';i=e;continue;}
  if(c==='{'){o=o.trimEnd()+' {\n';d++;i++;continue;}
  if(c==='}'){d=Math.max(0,d-1);o=o.trimEnd()+'\n'+'  '.repeat(d)+'}\n';i++;continue;}
  if(c===';'){o+=';\n';i++;continue;}
  if(o.endsWith('\n')||o===''){o+='  '.repeat(d);} o+=c;i++;}
 return o.replace(/\n{3,}/g,'\n\n').trim()+'\n';}

/* format a textarea in place; never returns a Promise to the caller's .value */
function applyTo(ta, mode, cb){
  if(!ta) return;
  var src=ta.value, keep=ta.selectionStart;
  (mode==='css'?css(src):jsx(src)).then(function(out){
    if(typeof out!=='string') return;
    ta.value=out;
    try{ ta.selectionStart=ta.selectionEnd=Math.min(keep,out.length); }catch(e){}
    ta.dispatchEvent(new Event('input',{bubbles:true}));
    if(cb) cb();
  });
}

/* ---------- typing: indent-aware Enter / Tab / closers ---------- */
var OPEN={'{':'}','(':')','[':']'};
function modeOf(ta){
  if(ta.dataset && ta.dataset.mode) return ta.dataset.mode;
  if(ta.id==='css') return 'css';
  if(/^\s*[.#:@*a-z-]+[^<>]*\{/.test(ta.value||'') && (ta.value||'').indexOf('<')===-1) return 'css';
  return 'jsx';
}
function onKey(e){
  var ta=e.target;
  if(!ta || ta.tagName!=='TEXTAREA' || ta.readOnly) return;
  if(ta.__editor) return;          // CodeMirror handles indent/brackets/tabs natively
  var v=ta.value, s=ta.selectionStart, t=ta.selectionEnd, mode=modeOf(ta);

  if(e.key==='Tab'){
    e.preventDefault();
    if(s!==t){ var a=v.lastIndexOf('\n',s-1)+1, blk=v.slice(a,t);
      var nb=e.shiftKey?blk.replace(/^ {1,2}/gm,''):blk.replace(/^/gm,'  ');
      ta.value=v.slice(0,a)+nb+v.slice(t); ta.selectionStart=a; ta.selectionEnd=a+nb.length;
    }else{ ta.value=v.slice(0,s)+'  '+v.slice(t); ta.selectionStart=ta.selectionEnd=s+2; }
    ta.dispatchEvent(new Event('input',{bubbles:true})); return;
  }

  if(e.key==='Enter'){
    e.preventDefault();
    var ls=v.lastIndexOf('\n',s-1)+1;
    var ind=(v.slice(ls,s).match(/^[ \t]*/)||[''])[0];
    var head=v.slice(0,s).replace(/[ \t]+$/,'');
    var last=head.slice(-1);
    var tail=v.slice(t).replace(/^[ \t]*/,'');
    var openTag = mode!=='css' && /<[A-Za-z][^<>]*>$/.test(head) && !/\/>$/.test(head);
    var deeper  = !!OPEN[last] || openTag;
    var closerNext = (OPEN[last] && tail.charAt(0)===OPEN[last]) ||
                     (openTag && tail.slice(0,2)==='</');
    var inner = deeper ? ind+'  ' : ind;
    var ins = closerNext ? '\n'+inner+'\n'+ind : '\n'+inner;
    ta.value=v.slice(0,s)+ins+v.slice(t);
    ta.selectionStart=ta.selectionEnd=s+1+inner.length;
    ta.dispatchEvent(new Event('input',{bubbles:true})); return;
  }

  if(e.key==='}'||e.key===')'||e.key===']'){
    var ls2=v.lastIndexOf('\n',s-1)+1;
    if(s===t && /^[ \t]+$/.test(v.slice(ls2,s))){
      e.preventDefault();
      var cut=v.slice(ls2,s).replace(/ {1,2}$/,'');
      ta.value=v.slice(0,ls2)+cut+e.key+v.slice(t);
      ta.selectionStart=ta.selectionEnd=ls2+cut.length+1;
      ta.dispatchEvent(new Event('input',{bubbles:true}));
    }
  }
}
document.addEventListener('keydown', onKey, true);      // capture => beats page handlers

window.FMT={jsx:jsx, css:css, html:html, applyTo:applyTo, cssSync:fbCSS, ready:ready,
            attach:function(){}, attachAll:function(){}};   // no-ops kept for old call sites
})();
