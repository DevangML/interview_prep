/* SHEETS — the registry of EDITABLE stylesheets on a page.
   app.css and the page/lesson CSS are both real buffers. Anything that reads CSS
   (preview render, direct-manipulation writes, the file tabs) goes through here,
   so there is exactly one source of truth per sheet. */
(function(){
var list=[];                                  // [{name, ta, label}]
function register(name, ta, label){
  if(!ta) return null;
  var found=byName(name);
  if(found){ found.ta=ta; return found; }
  var s={name:name, ta:ta, label:label||name};
  list.push(s);
  document.dispatchEvent(new CustomEvent('sheets:change',{detail:s}));
  return s;
}
function byName(n){ for(var i=0;i<list.length;i++) if(list[i].name===n) return list[i]; return null; }
function all(){ return list.slice(); }
function text(name){ var s=byName(name); return s? s.ta.value : ''; }
/* everything the preview should inject, in cascade order: app.css first */
function combined(extra){
  var out=[];
  var app=byName('app.css'); if(app) out.push(app.ta.value);
  list.forEach(function(s){ if(s.name!=='app.css') out.push(s.ta.value); });
  if(extra) out.push(extra);
  return out.join('\n');
}
/* which sheet owns a rule for this selector? later sheets win the cascade */
function ownerOf(sel){
  var win=null;
  list.forEach(function(s){
    var m=CSSMODEL.parse(s.ta.value);
    for(var i=0;i<m.length;i++) if(m[i].sel===sel) win=s;   // last match wins
  });
  return win;
}
function selectors(){
  var out=[];
  list.forEach(function(s){
    CSSMODEL.parse(s.ta.value).forEach(function(r){ if(out.indexOf(r.sel)<0) out.push(r.sel); });
  });
  return out;
}
var subs=[];
function wire(){
  list.forEach(function(s){
    subs.forEach(function(fn){
      s.__on=s.__on||[];
      if(s.__on.indexOf(fn)<0){ s.__on.push(fn); s.ta.addEventListener('input',fn); }
    });
  });
}
function onChange(fn){
  if(subs.indexOf(fn)>-1) return;            // no duplicate subscriptions
  subs.push(fn); wire();
}
document.addEventListener('sheets:change', wire);
window.SHEETS={register:register, byName:byName, all:all, text:text,
               combined:combined, ownerOf:ownerOf, selectors:selectors, onChange:onChange};
})();
