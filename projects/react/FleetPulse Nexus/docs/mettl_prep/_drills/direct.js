/* DIRECT — all manipulation happens ON the rendered element. No control panel anywhere.
   Click an element in the live result: it gets 8 resize handles, a move grab, inner
   padding handles, and a colour chip for every colour your CSS sets on it.
   Every drag writes straight back into the CSS. */
(function(){
var AGENT = function(){
  if (window.__direct) { window.__direct.toggle(); return; }

  var sel=null, mode=null, sx=0, sy=0, sw=0, sh=0, spad=null, smar=null, srad=0, sgap=0, on=true, props=[];
  var A='rgb(70 130 180)';
  var L=document.createElement('div');
  L.style.cssText='position:fixed;inset:0;z-index:2147483000;pointer-events:none;display:none';
  document.documentElement.appendChild(L);

  function el(css,parent){ var d=document.createElement('div'); d.style.cssText=css; (parent||L).appendChild(d); return d; }
  var ring = el('position:absolute;border:2px solid '+A+';box-sizing:border-box;pointer-events:none;border-radius:2px');
  var padBox = el('position:absolute;border:1px dashed rgb(147 196 125);box-sizing:border-box;pointer-events:none');
  var tip = el('position:absolute;background:#0f172a;color:#fff;font:600 11px ui-monospace,monospace;'
    +'padding:3px 7px;border-radius:4px;white-space:nowrap;pointer-events:none;display:none;z-index:5');
  var chips = el('position:absolute;display:flex;gap:4px;pointer-events:auto;z-index:6');

  var HS={}, DIRS=['nw','n','ne','e','se','s','sw','w'];
  var CUR={nw:'nwse-resize',n:'ns-resize',ne:'nesw-resize',e:'ew-resize',
           se:'nwse-resize',s:'ns-resize',sw:'nesw-resize',w:'ew-resize'};
  DIRS.forEach(function(d){
    HS[d]=el('position:absolute;width:11px;height:11px;background:#fff;border:2px solid '+A+';'
      +'border-radius:2px;pointer-events:auto;cursor:'+CUR[d]);
    HS[d].addEventListener('mousedown',function(e){ start(e,d); });
  });
  var PADS={};
  ['pt','pr','pb','pl'].forEach(function(k){
    PADS[k]=el('position:absolute;background:rgb(147 196 125 / .35);pointer-events:auto;'
      +'cursor:'+((k==='pt'||k==='pb')?'ns-resize':'ew-resize'));
    PADS[k].title='Padding — drag to change this side only';
    PADS[k].addEventListener('mousedown',function(e){ start(e,k); });
  });
  var MARG={};
  ['mt','mr','mb','ml'].forEach(function(k){
    MARG[k]=el('position:absolute;background:rgb(246 178 107 / .32);pointer-events:auto;'
      +'cursor:'+((k==='mt'||k==='mb')?'ns-resize':'ew-resize'));
    MARG[k].title='Margin — drag to change this side only';
    MARG[k].addEventListener('mousedown',function(e){ start(e,k); });
  });
  var RAD=el('position:absolute;width:12px;height:12px;border:2px solid '+A+';background:#fff;'
    +'border-radius:50%;pointer-events:auto;cursor:nwse-resize');
  RAD.title='Corner radius — drag toward the centre to round it';
  RAD.addEventListener('mousedown',function(e){ start(e,'radius'); });
  var GAP=el('position:absolute;background:rgb(124 58 237 / .35);pointer-events:auto;cursor:col-resize');
  GAP.title='Gap — drag to change the space between children';
  GAP.addEventListener('mousedown',function(e){ start(e,'gap'); });
  var LINK=el('position:absolute;pointer-events:none');

  function px(v){ return Math.round(parseFloat(v)||0); }
  function pad(){ var s=getComputedStyle(sel);
    return {t:px(s.paddingTop),r:px(s.paddingRight),b:px(s.paddingBottom),l:px(s.paddingLeft)}; }

  function place(){
    if(!sel){ L.style.display='none'; return; }
    L.style.display='block';
    var r=sel.getBoundingClientRect(), p=pad();
    ring.style.cssText+=';left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
    padBox.style.cssText+=';left:'+(r.left+p.l)+'px;top:'+(r.top+p.t)+'px;'
      +'width:'+Math.max(0,r.width-p.l-p.r)+'px;height:'+Math.max(0,r.height-p.t-p.b)+'px';
    var X={nw:[r.left,r.top],n:[r.left+r.width/2,r.top],ne:[r.right,r.top],e:[r.right,r.top+r.height/2],
           se:[r.right,r.bottom],s:[r.left+r.width/2,r.bottom],sw:[r.left,r.bottom],w:[r.left,r.top+r.height/2]};
    DIRS.forEach(function(d){ HS[d].style.left=(X[d][0]-5.5)+'px'; HS[d].style.top=(X[d][1]-5.5)+'px'; });
    PADS.pt.style.cssText+=';left:'+(r.left+p.l)+'px;top:'+r.top+'px;width:'+Math.max(0,r.width-p.l-p.r)+'px;height:'+Math.max(3,p.t)+'px';
    PADS.pb.style.cssText+=';left:'+(r.left+p.l)+'px;top:'+(r.bottom-Math.max(3,p.b))+'px;width:'+Math.max(0,r.width-p.l-p.r)+'px;height:'+Math.max(3,p.b)+'px';
    PADS.pl.style.cssText+=';left:'+r.left+'px;top:'+(r.top+p.t)+'px;width:'+Math.max(3,p.l)+'px;height:'+Math.max(0,r.height-p.t-p.b)+'px';
    PADS.pr.style.cssText+=';left:'+(r.right-Math.max(3,p.r))+'px;top:'+(r.top+p.t)+'px;width:'+Math.max(3,p.r)+'px;height:'+Math.max(0,r.height-p.t-p.b)+'px';
    var cs=getComputedStyle(sel);
    var m={t:px(cs.marginTop),r:px(cs.marginRight),b:px(cs.marginBottom),l:px(cs.marginLeft)};
    MARG.mt.style.cssText+=';left:'+r.left+'px;top:'+(r.top-Math.max(3,m.t))+'px;width:'+r.width+'px;height:'+Math.max(3,m.t)+'px';
    MARG.mb.style.cssText+=';left:'+r.left+'px;top:'+r.bottom+'px;width:'+r.width+'px;height:'+Math.max(3,m.b)+'px';
    MARG.ml.style.cssText+=';left:'+(r.left-Math.max(3,m.l))+'px;top:'+r.top+'px;width:'+Math.max(3,m.l)+'px;height:'+r.height+'px';
    MARG.mr.style.cssText+=';left:'+r.right+'px;top:'+r.top+'px;width:'+Math.max(3,m.r)+'px;height:'+r.height+'px';
    var rad=px(cs.borderTopLeftRadius);
    RAD.style.left=(r.left+Math.max(8,rad)-6)+'px'; RAD.style.top=(r.top+Math.max(8,rad)-6)+'px';
    // gap handle: only when this element lays out its children with a gap
    var lays=(cs.display==='flex'||cs.display==='grid'||cs.display==='inline-flex');
    var kids=sel.children;
    if(lays && kids.length>1){
      var a=kids[0].getBoundingClientRect(), b=kids[1].getBoundingClientRect();
      var vertical = b.top >= a.bottom-1;
      GAP.style.display='block';
      if(vertical){ GAP.style.cursor='row-resize';
        GAP.style.cssText+=';left:'+a.left+'px;top:'+a.bottom+'px;width:'+a.width+'px;height:'+Math.max(3,b.top-a.bottom)+'px'; }
      else { GAP.style.cursor='col-resize';
        GAP.style.cssText+=';left:'+a.right+'px;top:'+a.top+'px;width:'+Math.max(3,b.left-a.right)+'px;height:'+a.height+'px'; }
    } else GAP.style.display='none';
    chips.style.left=r.left+'px'; chips.style.top=(r.top-26)+'px';
  }

  function drawChips(){
    chips.innerHTML='';
    props.filter(function(p){ return p.isColor; }).forEach(function(p){
      var c=document.createElement('label');
      c.title=p.prop+' — click to change';
      c.style.cssText='width:20px;height:20px;border-radius:5px;border:2px solid #fff;cursor:pointer;'
        +'box-shadow:0 1px 4px rgb(0 0 0/.35);background:'+p.val+';display:block;position:relative;overflow:hidden';
      var i=document.createElement('input'); i.type='color';
      try{ i.value=p.hex||'#000000'; }catch(e){}
      i.style.cssText='position:absolute;inset:0;opacity:0;cursor:pointer;border:0;padding:0';
      i.addEventListener('input',function(){ c.style.background=i.value;
        parent.postMessage({t:'d:set', prop:p.prop, val:i.value},'*'); });
      c.appendChild(i); chips.appendChild(c);
    });
  }

  function pick(e){
    var t=e.target;
    if(t===document.documentElement||t===document.body||L.contains(t)) return;
    sel=t; place();
    parent.postMessage({t:'d:select', tag:t.tagName.toLowerCase(),
      cls:(typeof t.className==='string'?t.className:''), id:t.id||''},'*');
  }
  document.addEventListener('click',function(e){ if(!on) return;
    e.preventDefault(); e.stopPropagation(); pick(e); },true);
  document.addEventListener('mouseover',function(e){ if(!on||sel||mode) return;
    var t=e.target; if(t===document.documentElement||t===document.body||L.contains(t)) return;
    L.style.display='block'; var r=t.getBoundingClientRect();
    ring.style.cssText+=';border-style:dashed;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
  },true);

  var NEED={ move:[{prop:'translate',val:'0px 0px'}],
             radius:[{prop:'border-radius',val:'0px'}],
             gap:[{prop:'gap',val:'0px'}],
             pt:[{prop:'padding-top',val:'0px'}], pr:[{prop:'padding-right',val:'0px'}],
             pb:[{prop:'padding-bottom',val:'0px'}], pl:[{prop:'padding-left',val:'0px'}],
             mt:[{prop:'margin-top',val:'0px'}], mr:[{prop:'margin-right',val:'0px'}],
             mb:[{prop:'margin-bottom',val:'0px'}], ml:[{prop:'margin-left',val:'0px'}] };
  function start(e,m){
    if(!sel) return;
    mode=m; sx=e.clientX; sy=e.clientY;
    var need=NEED[m] || [{prop:'width',val:Math.round(sel.getBoundingClientRect().width)+'px'},
                         {prop:'height',val:Math.round(sel.getBoundingClientRect().height)+'px'}];
    parent.postMessage({t:'d:begin', props:need},'*');
    var r=sel.getBoundingClientRect(); sw=r.width; sh=r.height; spad=pad();
    var cs0=getComputedStyle(sel);
    smar={t:px(cs0.marginTop),r:px(cs0.marginRight),b:px(cs0.marginBottom),l:px(cs0.marginLeft)};
    srad=px(cs0.borderTopLeftRadius); sgap=px(cs0.gap)||px(cs0.columnGap)||0;
    ring.style.borderStyle='solid';
    e.preventDefault(); e.stopPropagation();
    document.addEventListener('mousemove',move,true);
    document.addEventListener('mouseup',stop,true);
  }
  function show(txt,x,y){ tip.style.display='block'; tip.textContent=txt;
    tip.style.left=(x+12)+'px'; tip.style.top=(y-26)+'px'; }
  function move(e){
    if(!mode||!sel) return;
    var dx=e.clientX-sx, dy=e.clientY-sy, out={};
    if(mode==='move'){ out.translate=Math.round(dx)+'px '+Math.round(dy)+'px';
      show('translate '+out.translate, e.clientX, e.clientY); }
    else if(mode==='radius'){
      var v=Math.max(0,Math.round(srad+(dx+dy)/2)); out['border-radius']=v+'px';
      show('radius '+v+'px', e.clientX, e.clientY);
    }
    else if(mode==='gap'){
      var vertical=GAP.style.cursor==='row-resize';
      var v=Math.max(0,Math.round(sgap+(vertical?dy:dx))); out.gap=v+'px';
      show('gap '+v+'px', e.clientX, e.clientY);
    }
    else if(mode[0]==='m'){
      var mk={mt:'margin-top',mr:'margin-right',mb:'margin-bottom',ml:'margin-left'}[mode];
      var mb0={mt:smar.t,mr:smar.r,mb:smar.b,ml:smar.l}[mode];
      var md = mode==='mt'? -dy : mode==='mb'? dy : mode==='ml'? -dx : dx;
      var mv=Math.max(0,Math.round(mb0+md)); out[mk]=mv+'px';
      show(mk+' '+mv+'px', e.clientX, e.clientY);
    }
    else if(mode[0]==='p'){
      var k={pt:'padding-top',pr:'padding-right',pb:'padding-bottom',pl:'padding-left'}[mode];
      var base={pt:spad.t,pr:spad.r,pb:spad.b,pl:spad.l}[mode];
      var d = mode==='pt'? dy : mode==='pb'? -dy : mode==='pl'? dx : -dx;
      var v=Math.max(0,Math.round(base+d)); out[k]=v+'px';
      show(k+' '+v+'px', e.clientX, e.clientY);
    } else {
      var w=sw, h=sh;
      if(mode.indexOf('e')>-1) w=sw+dx; if(mode.indexOf('w')>-1) w=sw-dx;
      if(mode.indexOf('s')>-1) h=sh+dy; if(mode.indexOf('n')>-1) h=sh-dy;
      if(w!==sw) out.width=Math.max(8,Math.round(w))+'px';
      if(h!==sh) out.height=Math.max(8,Math.round(h))+'px';
      show((out.width?'w '+out.width+'  ':'')+(out.height?'h '+out.height:''), e.clientX, e.clientY);
    }
    parent.postMessage({t:'d:live', set:out},'*');
    requestAnimationFrame(place);
  }
  function stop(){ mode=null; tip.style.display='none';
    document.removeEventListener('mousemove',move,true);
    document.removeEventListener('mouseup',stop,true);
    parent.postMessage({t:'d:commit'},'*'); place(); }

  document.addEventListener('mousedown',function(e){
    if(!on||!sel||mode) return;
    if(e.target===sel){ start(e,'move'); }
  },true);
  addEventListener('scroll',place,true); addEventListener('resize',place);
  addEventListener('message',function(e){
    var m=e.data||{};
    if(m.t==='d:props'){ props=m.props||[]; drawChips(); place(); }
    if(m.t==='d:reframe'){ requestAnimationFrame(place); }
    if(m.t==='d:link'){
      LINK.innerHTML='';
      if(!m.sel){ return; }
      var list=[]; try{ list=document.querySelectorAll(m.sel); }catch(err){ return; }
      L.style.display='block';
      [].forEach.call(list,function(node){
        var r=node.getBoundingClientRect();
        var b=document.createElement('div');
        b.style.cssText='position:absolute;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;'
          +'height:'+r.height+'px;border:2px dashed rgb(124 58 237);border-radius:3px;'
          +'background:rgb(124 58 237 / .07);pointer-events:none';
        LINK.appendChild(b);
      });
      clearTimeout(LINK.__t);
      LINK.__t=setTimeout(function(){ LINK.innerHTML=''; if(!sel) L.style.display='none'; }, 2000);
    }
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ sel=null; L.style.display='none'; } });

  window.__direct={
    toggle:function(){ on=!on; if(!on){ sel=null; L.style.display='none'; } return on; },
    matches:function(list){ if(!sel) return [];
      return list.filter(function(s){ try{ return sel.matches(s); }catch(err){ return false; } }); },
    reframe:place
  };
  parent.postMessage({t:'d:ready'},'*');
};
function attach(iframe, btn){
  try{
    var w=iframe.contentWindow; if(!w) return false;
    if(w.__direct){ var s=w.__direct.toggle(); btn&&btn.setAttribute('aria-pressed',s); return s; }
    w.eval('('+AGENT.toString()+')()');
    btn&&btn.setAttribute('aria-pressed','true');
    return true;
  }catch(e){ return false; }
}
window.DIRECT={attach:attach};
})();
