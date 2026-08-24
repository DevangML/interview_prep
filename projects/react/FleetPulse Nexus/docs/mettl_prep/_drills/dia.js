/* DIA — the target, drawn.
 *
 * Every challenge says what it should LOOK like, not just what it should do.
 * A challenge declares boxes, gaps and annotations; this draws a wireframe of
 * the finished result so you can compare your preview against the intent.
 *
 *   dia:{ w:320, h:170,
 *     frame:[0,0,320,170,'.wrap'],           // dashed container
 *     box:[[10,10,90,50,'A'], ...],          // solid child boxes
 *     gap:[[100,10,20,'gap',1]],             // dimension line: x,y,len,label,horizontal
 *     note:[[10,150,'stacks below 30rem']],  // free text
 *     arrow:[[10,80,300,80,'main axis']],    // labelled arrow
 *     track:[[10,4,90,'1fr'],...] }          // track header above the grid
 */
(function(){
var NS='http://www.w3.org/2000/svg';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function t(x,y,s,cls,anchor){
  return '<text x="'+x+'" y="'+y+'" class="'+(cls||'dl')+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+esc(s)+'</text>';
}
var KNOWN={w:1,h:1,frame:1,box:1,gap:1,note:1,arrow:1,track:1,alt:1,labels:1};
/* Diagrams were being clipped because w/h were hand-guessed while the shapes moved.
   Measure the content and grow the viewBox to fit it — never trim. */
function getBounds(d){
  var minX = 0, minY = 0, maxX = d.w || 320, maxY = d.h || 170;
  var pad = 8;
  
  if (d.frame) {
    minX = Math.min(minX, d.frame[0] - 2);
    minY = Math.min(minY, d.frame[1] - 2);
    maxX = Math.max(maxX, d.frame[0] + d.frame[2] + 4);
    maxY = Math.max(maxY, d.frame[1] + d.frame[3] + 4);
  }
  (d.box || []).forEach(function(b){
    if (b.length >= 4) {
      minX = Math.min(minX, b[0] - 2);
      minY = Math.min(minY, b[1] - 2);
      maxX = Math.max(maxX, b[0] + b[2] + 4);
      maxY = Math.max(maxY, b[1] + b[3] + 4);
    }
  });
  (d.gap || []).forEach(function(g){
    var isHoriz = g[4] !== 0;
    var lab = String(g[3] || '');
    if (isHoriz) {
      minX = Math.min(minX, g[0] - 4);
      maxX = Math.max(maxX, g[0] + g[2] + 4);
      minY = Math.min(minY, g[1] - 12);
      maxY = Math.max(maxY, g[1] + 8);
    } else {
      minX = Math.min(minX, g[0] - 4);
      maxX = Math.max(maxX, g[0] + 8 + lab.length * 6.5);
      minY = Math.min(minY, g[1] - 4);
      maxY = Math.max(maxY, g[1] + g[2] + 4);
    }
  });
  (d.arrow || []).forEach(function(a){
    minX = Math.min(minX, Math.min(a[0], a[2]) - 4);
    maxX = Math.max(maxX, Math.max(a[0], a[2]) + 12);
    minY = Math.min(minY, Math.min(a[1], a[3]) - 12);
    maxY = Math.max(maxY, Math.max(a[1], a[3]) + 6);
  });
  (d.track || []).forEach(function(a){
    minX = Math.min(minX, a[0] - 2);
    maxX = Math.max(maxX, a[0] + a[2] + 4);
    minY = Math.min(minY, a[1] - 2);
    maxY = Math.max(maxY, a[1] + 16);
  });
  (d.note || []).forEach(function(n){
    var w = d.w || 320;
    var max = Math.max(8, Math.floor((w - n[0]) / 5.0));
    var words = String(n[2]).split(' ');
    var line = '', lines = [];
    words.forEach(function(word){
      if ((line + ' ' + word).trim().length > max) { lines.push(line.trim()); line = word; }
      else line += ' ' + word;
    });
    if (line.trim()) lines.push(line.trim());
    var maxLineLen = 0;
    lines.forEach(function(l){ if (l.length > maxLineLen) maxLineLen = l.length; });
    minX = Math.min(minX, n[0]);
    maxX = Math.max(maxX, n[0] + maxLineLen * 6.0 + 8);
    minY = Math.min(minY, n[1] - 4);
    maxY = Math.max(maxY, n[1] + (lines.length - 1) * 11 + 14);
  });

  var vx = minX < 0 ? minX : 0;
  var vy = minY < 0 ? minY : 0;
  var vw = Math.ceil(maxX - vx) + pad;
  var vh = Math.ceil(maxY - vy) + pad;
  return { vx: vx, vy: vy, vw: vw, vh: vh };
}

function render(d){
  if(!d) return '';
  for(var k in d) if(d.hasOwnProperty(k) && !KNOWN[k])
    (console.warn||function(){})('dia: unknown key "'+k+'" — nothing will be drawn for it');
  var b=getBounds(d);
  var o=[];
  o.push('<svg viewBox="'+b.vx+' '+b.vy+' '+b.vw+' '+b.vh+'" width="100%" role="img" aria-label="Expected result" class="dia">');
  o.push('<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">'
        +'<path d="M0 0 L8 4 L0 8 z" class="dh"/></marker></defs>');
  (d.track||[]).forEach(function(a){                       // grid track header
    o.push('<line x1="'+a[0]+'" y1="'+(a[1]+7)+'" x2="'+(a[0]+a[2])+'" y2="'+(a[1]+7)+'" class="dt"/>');
    o.push(t(a[0]+a[2]/2, a[1]+5, a[3], 'dtl','middle'));
  });
  if(d.frame){ var f=d.frame;
    o.push('<rect x="'+f[0]+'" y="'+f[1]+'" width="'+f[2]+'" height="'+f[3]+'" rx="4" class="df"/>');
    if(f[4]) o.push(t(f[0]+4, f[1]+12, f[4], 'dfl'));
  }
  (d.box||[]).forEach(function(b){
    var cls='db'+(b[5]==='ghost'?' ghost':b[5]==='hi'?' hi':'');
    o.push('<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" rx="3" class="'+cls+'"/>');
    if(b[4]) o.push(t(b[0]+b[2]/2, b[1]+b[3]/2+4, b[4], 'dbl','middle'));
  });
  (d.gap||[]).forEach(function(g){                          // dimension line with ticks
    var x=g[0],y=g[1],L=g[2],lab=g[3],horiz=g[4]!==0;
    if(horiz){
      o.push('<line x1="'+x+'" y1="'+y+'" x2="'+(x+L)+'" y2="'+y+'" class="dg"/>');
      o.push('<line x1="'+x+'" y1="'+(y-4)+'" x2="'+x+'" y2="'+(y+4)+'" class="dg"/>');
      o.push('<line x1="'+(x+L)+'" y1="'+(y-4)+'" x2="'+(x+L)+'" y2="'+(y+4)+'" class="dg"/>');
      o.push(t(x+L/2, y-6, lab, 'dgl','middle'));
    }else{
      o.push('<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y+L)+'" class="dg"/>');
      o.push('<line x1="'+(x-4)+'" y1="'+y+'" x2="'+(x+4)+'" y2="'+y+'" class="dg"/>');
      o.push('<line x1="'+(x-4)+'" y1="'+(y+L)+'" x2="'+(x+4)+'" y2="'+(y+L)+'" class="dg"/>');
      o.push(t(x+6, y+L/2+3, lab, 'dgl'));
    }
  });
  (d.arrow||[]).forEach(function(a){
    o.push('<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+a[2]+'" y2="'+a[3]+'" class="da" marker-end="url(#ah)"/>');
    if(a[4]) o.push(t((a[0]+a[2])/2, a[1]-5, a[4], 'dal','middle'));
  });
  (d.note||[]).forEach(function(n){
    var max=Math.max(8, Math.floor(((d.w||320)-n[0])/5.0));
    var words=String(n[2]).split(' '), line='', lines=[];
    words.forEach(function(word){
      if((line+' '+word).trim().length>max){ lines.push(line.trim()); line=word; }
      else line+=' '+word;
    });
    if(line.trim()) lines.push(line.trim());
    lines.forEach(function(L,k){ o.push(t(n[0], n[1]+k*11, L, 'dn')); });
  });
  o.push('</svg>');
  return o.join('');
}
/* two states side by side — for "before/at breakpoint" and container-query targets */
function pair(a,b,la,lb){
  return '<div class="diapair"><figure>'+render(a)+'<figcaption>'+esc(la||'wide')+'</figcaption></figure>'
        +'<figure>'+render(b)+'<figcaption>'+esc(lb||'narrow')+'</figcaption></figure></div>';
}
/* The single entry point the page uses. An item that declares `alt` is a two-state
   question — the second state IS the lesson, so it must be drawn, not described. */
function figure(d){
  if(!d) return '';
  if(d.alt){ var L=d.labels||['wide','narrow']; return pair(d, d.alt, L[0], L[1]); }
  return render(d);
}
window.DIA={render:render, pair:pair, figure:figure};
})();
