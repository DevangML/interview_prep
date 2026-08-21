/* Shared formatters: CSS + JSX/HTML. Loaded by every page with an editor. */
(function(){
var BS = String.fromCharCode(92);   // backslash, kept out of literals for clarity

function fmtCSS(css){
  var out='',ind=0,i=0;
  css=css.replace(/\s+/g,' ').replace(/\s*([{};,])\s*/g,'$1');
  while(i<css.length){
    var c=css[i];
    if(css.startsWith('/*',i)){var e=css.indexOf('*/',i)+2;out+='  '.repeat(ind)+css.slice(i,e)+'\n';i=e;continue;}
    if(c==='{'){out=out.trimEnd()+' {\n';ind++;i++;continue;}
    if(c==='}'){ind=Math.max(0,ind-1);out=out.trimEnd()+'\n'+'  '.repeat(ind)+'}\n';i++;continue;}
    if(c===';'){out+=';\n';i++;continue;}
    if(out.endsWith('\n')||out===''){out+='  '.repeat(ind);}
    out+=c;i++;
  }
  return out.replace(/\n{3,}/g,'\n\n').replace(/}\n(?!\n|$)/g,'}\n\n').trim()+'\n';
}

/* Every ELEMENT on its own line. Short text-only elements stay inline: <b>Hi</b> */
function breakTags(src){
  var out='', i=0, n=src.length, q=null, inTag=false, brace=0;
  while(i<n){
    var c=src[i];
    if(q){ out+=c; if(c===q && src[i-1]!==BS) q=null; i++; continue; }
    if(c==='"'||c==="'"||(c==='`'&&!inTag)){ q=c; out+=c; i++; continue; }
    if(inTag && c==='{'){ brace++; out+=c; i++; continue; }
    if(inTag && c==='}'){ brace--; out+=c; i++; continue; }

    if(c==='<' && !inTag){
      if(out.length && !/\n\s*$/.test(out)) out=out.replace(/[ \t]+$/,'')+'\n';
      inTag=true; out+=c; i++; continue;
    }
    if(c==='>' && inTag && brace===0 && src[i-1]!=='='){   // '=>' inside an attribute is not a tag close
      inTag=false; out+=c;
      var j=i+1; while(j<n && /\s/.test(src[j])) j++;
      if(j<n && src[j]!=='<' && src[j]!=='{'){
        // plain text child — if it is short and ends at a closing tag, keep the element on one line
        var k=j, txt='';
        while(k<n && src[k]!=='<' && src[k]!=='{'){ txt+=src[k]; k++; }
        if(k<n && src[k]==='<' && src[k+1]==='/' && txt.trim().length<=48){
          out+=txt.trim(); i=k;
          var e=src.indexOf('>',k); out+=src.slice(k,e+1); i=e+1;
          var m=i; while(m<n && /\s/.test(src[m])) m++;
          if(m<n && (src[m]==='<'||src[m]==='{')) out+='\n';
          i=m; continue;
        }
      }
      if(j<n && (src[j]==='<' || src[j]==='{')) out+='\n';
      i=j; continue;
    }
    if(!inTag && c==='}'){
      out+=c;
      var p=i+1; while(p<n && /\s/.test(src[p])) p++;
      if(p<n && (src[p]==='<'||src[p]==='{')) out+='\n';
      i=p; continue;
    }
    out+=c; i++;
  }
  // a closer that trails an expression still gets its own line:  )}</ul>  ->  )}\n</ul>
  return out.replace(/([)}\]])(<\/)/g,'$1\n$2').replace(/(>)([)}\]])/g,'$1\n$2');
}

function strip(line){                    // remove string contents so their brackets do not count
  var q=null,o='';
  for(var i=0;i<line.length;i++){
    var c=line[i];
    if(q){ if(c===q && line[i-1]!==BS) q=null; continue; }
    if(c==='"'||c==="'"||c==='`'){ q=c; continue; }
    o+=c;
  }
  return o;
}
function noBraces(s){                    // drop {...} so '=>' inside attributes cannot fake a tag close
  var o='',d=0;
  for(var i=0;i<s.length;i++){
    var c=s[i];
    if(c==='{'){d++;continue;}
    if(c==='}'){if(d>0){d--;continue;}}
    if(d===0)o+=c;
  }
  return o;
}
function delta(line){
  var s=noBraces(strip(line));
  var brc=(strip(line).match(/[({[]/g)||[]).length-(strip(line).match(/[)}\]]/g)||[]).length;
  var opens=(s.match(/<[A-Za-z][^<>]*>/g)||[]).filter(function(t){return t.slice(-2)!=='/>'}).length;
  var closes=(s.match(/<\/[A-Za-z][^<>]*>/g)||[]).length;
  return (opens-closes)+brc;
}
function closer(line){ var s=line.trim(); return /^<\//.test(s)||/^[)}\]]/.test(s); }

function fmtJSX(src){
  var pre=src;
  if(typeof Babel!=='undefined'){
    try{
      pre=Babel.transform(src,{
        parserOpts:{plugins:['jsx'],allowReturnOutsideFunction:true},
        generatorOpts:{retainLines:false,compact:false,concise:false},
        plugins:[],presets:[]
      }).code;
    }catch(e){}
  }
  var lines=breakTags(pre).split('\n')
    .map(function(l){return l.replace(/\s+$/,'').trim()})
    .filter(function(l){return l.length});

  var depth=0,res=[];
  lines.forEach(function(l){
    if(closer(l)) depth=Math.max(0,depth-1);
    res.push('  '.repeat(depth)+l);
    var d=delta(l); if(closer(l)) d+=1;
    depth=Math.max(0,depth+d);
  });

  var txt=res.join('\n');
  // return <jsx>;   ->   return (\n  <jsx>\n);
  txt=txt.replace(/^([ \t]*)return[ \t]*\n([\s\S]*?);[ \t]*$/m,function(m,ind,body){
    if(body.trim().charAt(0)!=='<') return m;
    var inner=body.split('\n').map(function(x){return '  '+x}).join('\n');
    return ind+'return (\n'+inner+'\n'+ind+');';
  });
  txt=txt.replace(/=>(?=[^\s])/g,'=> ').replace(/[ \t]+\/>/g,' />');
  return txt+'\n';
}

window.FMT={css:fmtCSS,jsx:fmtJSX};
})();
