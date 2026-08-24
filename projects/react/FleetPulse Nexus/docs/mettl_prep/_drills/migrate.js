/* Buffers saved before component code became real files are body-only and will not
   compile. Clear them once, then remember we did. Runs before any page script. */
(function(){
  var V='v4';
  try{
    if(localStorage.getItem('drills:codeVersion')===V) return;
    Object.keys(localStorage).forEach(function(k){
      if(!/^(arena|practice|match|uiladder|playground):/.test(k)) return;
      var val=localStorage.getItem(k)||'';
      var looksLikeComponent = val.indexOf('<')>-1 || /use(State|Effect)\s*\(/.test(val);
      var htmlish = /\sclass\s*=|style\s*=\s*"/.test(val);
      if(looksLikeComponent && (val.indexOf('export default')<0 || htmlish)) localStorage.removeItem(k);
    });
    localStorage.setItem('drills:codeVersion',V);
  }catch(e){}
})();
