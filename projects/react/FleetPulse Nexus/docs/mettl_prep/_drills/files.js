/* FILES — VSCode-style tabs + breadcrumb for a group of editors.
   Editors stop being stacked one below the other; only the active file is mounted,
   which also keeps the CodeMirror instance count at one per group. */
(function(){
var NAME={ jsx:{f:'Component.jsx', icon:'⬡', crumb:'src'},
           css:{f:'styles.css',    icon:'❖', crumb:'src'},
           html:{f:'index.html',   icon:'◧', crumb:'src'} };
function fileOf(el){
  var ta=el.querySelector('textarea');
  if(ta && ta.id==='appcss') return {f:'app.css', icon:'❖', crumb:'src'};
  return null;
}

function group(host, panes){
  if(!host || host.__files) return; host.__files=true;
  var bar=document.createElement('div'); bar.className='fx-bar';
  var crumb=document.createElement('div'); crumb.className='fx-crumb';
  host.insertBefore(crumb, host.firstChild);
  host.insertBefore(bar, crumb.nextSibling);

  var active=0;
  function show(i){
    active=i;
    panes.forEach(function(p,n){ p.el.hidden = n!==i; });
    bar.querySelectorAll('.fx-tab').forEach(function(t,n){ t.setAttribute('aria-selected', n===i); });
    var meta=panes[i].file||NAME[panes[i].mode]||NAME.jsx;
    crumb.innerHTML='<span>'+meta.crumb+'</span><i>›</i><b>'+meta.f+'</b>';
    var ta=panes[i].el.querySelector('textarea');
    if(ta){ if(!ta.__cm && window.EDITOR && EDITOR.ready) EDITOR.upgrade(ta);
            else if(ta.__editor) setTimeout(function(){ta.__editor.refresh()},20); }
  }
  panes.forEach(function(p,i){
    var m=p.file||NAME[p.mode]||NAME.jsx;
    var t=document.createElement('button'); t.type='button'; t.className='fx-tab';
    t.setAttribute('role','tab'); t.setAttribute('aria-selected', i===0);
    t.innerHTML='<span class="fx-i">'+m.icon+'</span>'+m.f;
    t.onclick=function(){ show(i); };
    bar.appendChild(t);
  });
  bar.setAttribute('role','tablist');
  // arrow-key roving
  bar.addEventListener('keydown',function(e){
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
    e.preventDefault();
    show((active + (e.key==='ArrowRight'?1:panes.length-1)) % panes.length);
    bar.querySelectorAll('.fx-tab')[active].focus();
  });
  show(0);
  return {show:show};
}

function auto(){
  document.querySelectorAll('.col, .pb').forEach(function(host){
    var eds=[].slice.call(host.querySelectorAll(':scope > .ed'));
    if(eds.length<2) return;
    var panes=eds.map(function(el){
      var ta=el.querySelector('textarea');
      return {el:el, mode:(ta&&ta.dataset.mode)||'jsx', file:fileOf(el), ta:ta};
    });
    var api=group(host, panes); if(api) GROUPS.push({api:api,panes:panes});
  });
}
document.addEventListener('DOMContentLoaded',function(){ setTimeout(auto,60); });
var GROUPS=[];
function showMode(mode){
  for(var i=0;i<GROUPS.length;i++){ var g=GROUPS[i];
    for(var j=0;j<g.panes.length;j++) if(g.panes[j].mode===mode){ g.api.show(j); return true; } }
  return false;
}
/* jump to the tab that owns a specific textarea — used when a gesture writes to app.css */
function showFor(ta){
  for(var i=0;i<GROUPS.length;i++){ var g=GROUPS[i];
    for(var j=0;j<g.panes.length;j++) if(g.panes[j].ta===ta){ g.api.show(j); return true; } }
  return false;
}
window.FILES={auto:auto, group:group, showMode:showMode, showFor:showFor};
})();
