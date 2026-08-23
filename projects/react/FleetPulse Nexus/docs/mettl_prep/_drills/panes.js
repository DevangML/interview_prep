/* PANES — draggable splitters. Replaces the portal/grip buttons I removed.
   Horizontal: editor column vs live result. Vertical: stacked editors inside a column.
   Sizes persist per page so the layout you set stays set. */
(function(){
if(typeof Split==='undefined'){ window.PANES={ready:false}; return; }
var KEY='panes:'+location.pathname;
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } }
function save(id,sizes){ var s=load(); s[id]=sizes; try{ localStorage.setItem(KEY,JSON.stringify(s)); }catch(e){} }

function refresh(){
  if(window.EDITOR && EDITOR.refreshAll) EDITOR.refreshAll();
  document.querySelectorAll('iframe').forEach(function(f){
    try{ f.contentWindow.postMessage({t:'d:reframe'},'*'); }catch(e){}
  });
}
function split(id, els, dir, minSizes){
  if(els.length<2) return null;
  var saved=load()[id];
  setTimeout(function(){
    document.querySelectorAll('.gutter:not([data-tip])').forEach(function(g){
      g.setAttribute('data-tip', g.classList.contains('gutter-horizontal')
        ? 'Resize — drag to give this pane more or less width'
        : 'Resize — drag to give this pane more or less height');
    });
  },60);
  return Split(els,{
    direction: dir==='v' ? 'horizontal' : 'vertical',
    sizes: saved || els.map(function(){ return 100/els.length; }),
    minSize: minSizes || 80,
    gutterSize: 8,
    snapOffset: 0,
    onDrag: refresh,
    onDragEnd: function(sizes){ save(id,sizes); refresh(); }
  });
}
function auto(){
  // main: editor column | preview column  (skip a 3-col layout with its own list pane)
  var main=document.querySelector('main');
  if(main && !main.__split){
    var cols=[].slice.call(main.children).filter(function(c){
      return c.nodeType===1 && !c.classList.contains('gutter');
    });
    if(cols.length===2 || cols.length===3){
      main.__split=true;
      main.style.display='flex';
      main.style.gridTemplateColumns='';
      cols.forEach(function(c){ c.style.minWidth='0'; });
      split('main', cols, 'v', cols.length===3?[140,220,220]:[240,240]);
    }
  }
  // stacked editors inside a column that has no file tabs
  document.querySelectorAll('.col').forEach(function(col,i){
    if(col.__split) return;
    if(col.querySelector('.fx-bar')) return;          // tabs already own this group
    var eds=[].slice.call(col.children).filter(function(c){
      return c.nodeType===1 && c.classList.contains('ed');
    });
    if(eds.length<2) return;
    col.__split=true;
    split('col'+i, eds, 'h', 60);
  });
}
document.addEventListener('DOMContentLoaded',function(){ setTimeout(auto,180); });
window.PANES={auto:auto, ready:true, refresh:refresh};
})();
