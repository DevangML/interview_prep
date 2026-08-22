(function(){
var $=function(s){return document.querySelector(s)};
var W=320,H=220,cur=null,best={};
try{ best=JSON.parse(localStorage.getItem('match:best')||'{}'); }catch(e){}

/* DOM -> canvas with zero dependencies: serialize into an SVG foreignObject.
   Both target and attempt go through the identical pipeline, so the comparison is fair. */
function paint(cv, css, html, cb){
  var doc='<div xmlns="http://www.w3.org/1999/xhtml" style="width:'+W+'px;height:'+H+'px;'
    +'display:flex;align-items:flex-start;justify-content:flex-start;background:white">'
    +'<style>'+css.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</style>'+html+'</div>';
  var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'">'
    +'<foreignObject x="0" y="0" width="100%" height="100%">'+doc+'</foreignObject></svg>';
  var img=new Image();
  img.onload=function(){ var g=cv.getContext('2d',{willReadFrequently:true});
    g.clearRect(0,0,W,H); g.fillStyle='#fff'; g.fillRect(0,0,W,H); g.drawImage(img,0,0); cb&&cb(); };
  img.onerror=function(){ cb&&cb(); };
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function compare(){
  var a=$('#cT').getContext('2d',{willReadFrequently:true}).getImageData(0,0,W,H).data;
  var b=$('#cY').getContext('2d',{willReadFrequently:true}).getImageData(0,0,W,H).data;
  var g=$('#cD').getContext('2d',{willReadFrequently:true});
  var out=g.createImageData(W,H), d=out.data, same=0, n=W*H;
  for(var i=0;i<n;i++){
    var o=i*4;
    var diff=Math.abs(a[o]-b[o])+Math.abs(a[o+1]-b[o+1])+Math.abs(a[o+2]-b[o+2]);
    if(diff<24){ same++; d[o]=245;d[o+1]=245;d[o+2]=245;d[o+3]=255; }
    else { d[o]=220;d[o+1]=38;d[o+2]=38;d[o+3]=255; }
  }
  g.putImageData(out,0,0);
  return same/n*100;
}
function score(){
  paint($('#cY'), cur.base+'\n'+$('#code').value, cur.html, function(){
    var pct=compare();
    var el=$('#score'); el.textContent=pct.toFixed(1)+'%';
    el.dataset.s = pct>=99.9?'':(pct>=90?'low':'bad');
    $('#chars').textContent=$('#code').value.replace(/\s+/g,' ').trim().length+' chars';
    $('#win').classList.toggle('show', pct>=99.9);
    if(pct>=99.9 && typeof UX!=='undefined' && !cur.__won){ cur.__won=true; UX.toast('Pixel perfect 🎯','ok'); }
    var b=best[cur.id]||0; if(pct>b){ best[cur.id]=pct; try{localStorage.setItem('match:best',JSON.stringify(best))}catch(e){} draw(); }
  });
}
function pick(b){
  cur=b; cur.__won=false;
  document.querySelectorAll('.item').forEach(function(i){i.setAttribute('aria-current',i.dataset.id===b.id)});
  $('#teach').textContent=b.teach; $('#lvl').textContent=b.level;
  $('#hp').textContent=b.hint; $('#hb').parentElement.classList.remove('open');
  $('#code').value=localStorage.getItem('match:'+b.id)||b.start;
  [$('#cT'),$('#cY'),$('#cD')].forEach(function(c){c.width=W;c.height=H;c.style.width='100%'});
  paint($('#cT'), b.base+'\n'+b.sol, b.html, score);
}
function draw(){
  $('#items').innerHTML=BATTLES.map(function(b){
    var s=best[b.id]?('<span class="pct">'+best[b.id].toFixed(0)+'%</span>'):'';
    return '<div class="item" data-id="'+b.id+'">'+s+'<b>'+b.title+'</b>'
      +'<small><span class="lvl">'+b.level+'</span></small></div>';
  }).join('');
  document.querySelectorAll('.item').forEach(function(el){
    el.onclick=function(){ pick(BATTLES.filter(function(x){return x.id===el.dataset.id})[0]); };
    if(cur) el.setAttribute('aria-current', el.dataset.id===cur.id);
  });
}
var t;
$('#code').addEventListener('input',function(){ clearTimeout(t); t=setTimeout(function(){
  score(); if(cur) localStorage.setItem('match:'+cur.id,$('#code').value); },260); });
$('#hb').onclick=function(){ $('#hb').parentElement.classList.toggle('open'); };
$('#reset').onclick=function(){ if(!cur)return; $('#code').value=cur.start; localStorage.removeItem('match:'+cur.id); score(); };
$('#sol').onclick=function(){ if(!cur)return;
  var go = (typeof UX!=='undefined') ? UX.ask('Show the solution?','You lose the win, but you keep the lesson.','Show it')
                                     : Promise.resolve(true);
  go.then(function(y){ if(!y)return; $('#code').value=cur.sol; score(); }); };
$('#fmt').onclick=function(){ if(typeof FMT!=='undefined') FMT.applyTo($('#code'),'css',score); };
draw(); pick(BATTLES[0]);
})();
