/* X-RAY — a box-model inspector for the live preview.
   Bret Victor's rule: if a change is real but invisible, the environment is at fault.
   Hover any element and see margin / border / padding / content drawn to scale,
   with the numbers. Toggle per preview; injected into the iframe, no page reload. */
(function(){
var AGENT = function(){
  if (window.__xray) { window.__xray.toggle(); return; }
  var C={margin:'rgba(246,178,107,.55)',border:'rgba(255,229,153,.65)',
         padding:'rgba(147,196,125,.55)',content:'rgba(111,168,220,.55)'};
  var box=document.createElement('div'), tip=document.createElement('div');
  box.style.cssText='position:fixed;pointer-events:none;z-index:2147483646;display:none';
  tip.style.cssText='position:fixed;pointer-events:none;z-index:2147483647;display:none;'+
    'background:#0f172a;color:#fff;font:600 11px ui-monospace,Menlo,monospace;padding:5px 8px;'+
    'border-radius:5px;white-space:pre;box-shadow:0 4px 14px rgba(0,0,0,.35);line-height:1.5';
  document.documentElement.appendChild(box); document.documentElement.appendChild(tip);

  function layer(x,y,w,h,color,label){
    var d=document.createElement('div');
    d.style.cssText='position:absolute;left:'+x+'px;top:'+y+'px;width:'+Math.max(0,w)+'px;height:'+
      Math.max(0,h)+'px;background:'+color+';box-sizing:border-box';
    if(label){ d.title=label; }
    return d;
  }
  function px(v){ return Math.round(parseFloat(v)||0); }

  function draw(el){
    var r=el.getBoundingClientRect(), s=getComputedStyle(el);
    var m={t:px(s.marginTop),r:px(s.marginRight),b:px(s.marginBottom),l:px(s.marginLeft)};
    var bd={t:px(s.borderTopWidth),r:px(s.borderRightWidth),b:px(s.borderBottomWidth),l:px(s.borderLeftWidth)};
    var p={t:px(s.paddingTop),r:px(s.paddingRight),b:px(s.paddingBottom),l:px(s.paddingLeft)};
    box.innerHTML=''; box.style.display='block';
    box.style.left='0px'; box.style.top='0px'; box.style.width='100%'; box.style.height='100%';
    var inner=document.createElement('div'); inner.style.cssText='position:absolute;inset:0';
    // margin box
    inner.appendChild(layer(r.left-m.l, r.top-m.t, r.width+m.l+m.r, r.height+m.t+m.b, C.margin));
    // border box
    inner.appendChild(layer(r.left, r.top, r.width, r.height, C.border));
    // padding box
    inner.appendChild(layer(r.left+bd.l, r.top+bd.t, r.width-bd.l-bd.r, r.height-bd.t-bd.b, C.padding));
    // content box
    inner.appendChild(layer(r.left+bd.l+p.l, r.top+bd.t+p.t,
      r.width-bd.l-bd.r-p.l-p.r, r.height-bd.t-bd.b-p.t-p.b, C.content));
    box.appendChild(inner);

    var name=el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).join('.'):'');
    var cw=Math.round(r.width-bd.l-bd.r-p.l-p.r), ch=Math.round(r.height-bd.t-bd.b-p.t-p.b);
    tip.textContent =
      name.slice(0,46)+'\n'+
      'content  '+cw+' × '+ch+'\n'+
      'padding  '+p.t+' '+p.r+' '+p.b+' '+p.l+'\n'+
      'border   '+bd.t+' '+bd.r+' '+bd.b+' '+bd.l+'\n'+
      'margin   '+m.t+' '+m.r+' '+m.b+' '+m.l+'\n'+
      'box-sizing  '+s.boxSizing+'   →  border-box '+Math.round(r.width)+' × '+Math.round(r.height);
    tip.style.display='block';
    var tw=tip.offsetWidth, th=tip.offsetHeight;
    tip.style.left=Math.min(innerWidth-tw-6, Math.max(6, r.left))+'px';
    tip.style.top =(r.top-th-8 > 6 ? r.top-th-8 : r.bottom+8)+'px';
  }
  function clear(){ box.style.display='none'; tip.style.display='none'; }

  function over(e){
    var el=e.target;
    if(!el||el===document.documentElement||el===document.body||box.contains(el)) return clear();
    draw(el);
  }
  var on=true;
  document.addEventListener('mousemove',function(e){ if(on) over(e); },true);
  document.addEventListener('mouseleave',clear,true);
  window.__xray={ toggle:function(){ on=!on; if(!on) clear(); return on; }, on:function(){return on} };
};

function attach(iframe, btn){
  try{
    var w=iframe.contentWindow;
    if(!w) return false;
    if(w.__xray){ var s=w.__xray.toggle(); btn.setAttribute('aria-pressed',s); return s; }
    w.eval('('+AGENT.toString()+')()');
    btn.setAttribute('aria-pressed','true');
    return true;
  }catch(e){ return false; }
}
window.XRAY={attach:attach};
})();
