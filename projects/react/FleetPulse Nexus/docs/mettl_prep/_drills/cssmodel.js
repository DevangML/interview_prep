/* CSSMODEL v2 — declarations are identified by (selector, property), NEVER by offset.
 *
 * WHY: v1 carried character offsets across edits and patched them incrementally.
 * Any re-parse landing mid-drag desynced them, so a write meant for `padding` could
 * land inside `width`. Offsets are now recomputed from the live text on every single
 * write and thrown away immediately after. Nothing stale can survive a gesture.
 */
(function(){
function parse(css){
  var rules=[], i=0, n=css.length;
  while(i<n){
    if(css.startsWith('/*',i)){ var e=css.indexOf('*/',i); i=(e<0?n:e+2); continue; }
    if(css[i]==='@'){
      var b=css.indexOf('{',i); if(b<0) break;
      var d=1,j=b+1; while(j<n&&d>0){ if(css[j]==='{')d++; else if(css[j]==='}')d--; j++; }
      parse(css.slice(b+1,j-1)).forEach(function(r){
        r.start+=b+1; r.end+=b+1;
        r.decls.forEach(function(x){ x.start+=b+1; x.end+=b+1; });
        r.atRule=css.slice(i,b).trim(); rules.push(r);
      });
      i=j; continue;
    }
    var open=css.indexOf('{',i); if(open<0) break;
    var sel=css.slice(i,open).replace(/^[\s;}]+/,'').trim();
    var depth=1,k=open+1; while(k<n&&depth>0){ if(css[k]==='{')depth++; else if(css[k]==='}')depth--; k++; }
    var body=css.slice(open+1,k-1), base=open+1, decls=[], m;
    var re=/([-a-zA-Z]+)\s*:\s*([^;}]+)/g;
    while((m=re.exec(body))!==null){
      var raw=m[2];
      var lead=raw.length-raw.replace(/^\s+/,'').length;      // trailing/leading space is NOT
      var trimmed=raw.trim();                                  // part of the value we splice
      var vs=base+m.index+m[0].length-raw.length+lead;
      decls.push({prop:m[1].trim(), val:trimmed, start:vs, end:vs+trimmed.length});
    }
    if(sel) rules.push({sel:sel, decls:decls, start:i, end:k, atRule:null});
    i=k;
  }
  return rules;
}
function ruleFor(model, sel){
  for(var i=0;i<model.length;i++) if(model[i].sel===sel) return model[i];
  return null;
}
function declFor(model, sel, prop){
  var r=ruleFor(model, sel); if(!r) return null;
  for(var i=r.decls.length-1;i>=0;i--) if(r.decls[i].prop===prop) return r.decls[i];
  return null;
}
function flash(cm, index){
  if(!cm) return;
  var line=cm.posFromIndex(index).line;
  cm.addLineClass(line,'background','cm-changed');
  clearTimeout(flash['t'+line]);
  flash['t'+line]=setTimeout(function(){ try{ cm.removeLineClass(line,'background','cm-changed'); }catch(e){} },1100);
  return line;
}
/* THE ONLY WRITE PATH. Re-parses from live text, finds by identity, splices once. */
function write(ta, sel, prop, val, opts){
  opts=opts||{};
  var cm=ta.__editor, text=ta.value;
  var model=parse(text);
  var d=declFor(model, sel, prop);
  var line=null;
  if(d){
    if(d.val===val) return {line:null, changed:false};
    if(cm){ cm.replaceRange(val, cm.posFromIndex(d.start), cm.posFromIndex(d.end)); line=flash(cm,d.start); }
    else  { ta.value=text.slice(0,d.start)+val+text.slice(d.end); ta.dispatchEvent(new Event('input',{bubbles:true})); }
  } else {
    if(opts.noCreate) return {line:null, changed:false};
    var r=ruleFor(model, sel); if(!r) return {line:null, changed:false};
    var at=r.end-1;
    // if the last declaration has no trailing ';', inserting after it merges the two
    // into a single value (`color: red\n  width: 10px`). Terminate it first.
    var before=text.slice(0, at).replace(/\s+$/,'');
    var needSemi = before.length && before.charAt(before.length-1)!==';' && before.charAt(before.length-1)!=='{';
    var ins=(needSemi?';':'')+'\n  '+prop+': '+val+';';
    if(cm){ cm.replaceRange(ins, cm.posFromIndex(at)); line=flash(cm, at+3); }
    else  { ta.value=text.slice(0,at)+ins+text.slice(at); ta.dispatchEvent(new Event('input',{bubbles:true})); }
  }
  return {line:line, changed:true};
}
function ruleAt(model, index){
  for(var i=0;i<model.length;i++) if(index>=model[i].start && index<=model[i].end) return model[i];
  return null;
}
window.CSSMODEL={parse:parse, write:write, declFor:declFor, ruleFor:ruleFor, ruleAt:ruleAt, flash:flash};
})();
