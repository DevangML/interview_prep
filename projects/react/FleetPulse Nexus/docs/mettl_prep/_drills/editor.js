/* EDITOR v2 — CodeMirror behind a textarea contract, with Emmet, smart auto-indent on Enter, Cmd-K Cmd-C comments, and toggleable IntelliSense suggestions.
 */
(function(){
/* Silence the scroll-blocking-listener violations: default these to passive when the
   caller did not specify. CodeMirror registers them non-passively by default. */
(function(){
  var P={touchstart:1,touchmove:1,wheel:1,mousewheel:1};
  var add=EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener=function(type,fn,opts){
    if(P[type] && (opts===undefined || opts===false)) opts={passive:true};
    else if(P[type] && opts && typeof opts==='object' && opts.passive===undefined && !opts.__keep)
      opts=Object.assign({},opts,{passive:true});
    return add.call(this,type,fn,opts);
  };
})();

/* ── Rainbow Indent Guides (Precise Character-Aligned Overlay) ── */
if(typeof CodeMirror!=='undefined'){
  CodeMirror.defineMode("rainbow-indents", function(config) {
    var indentUnit = config.indentUnit || 2;
    var colors = ['rainbow-1', 'rainbow-2', 'rainbow-3', 'rainbow-4', 'rainbow-5', 'rainbow-6'];
    return {
      token: function(stream) {
        var isLeadingSpace = /^\s*$/.test(stream.string.slice(0, stream.pos));
        if (isLeadingSpace) {
          if (stream.eat(' ')) {
            var spacesEaten = 1;
            while (spacesEaten < indentUnit && stream.eat(' ')) { spacesEaten++; }
            var blockIndex = Math.floor((stream.pos - 1) / indentUnit);
            return colors[blockIndex % colors.length];
          }
          if (stream.eat('\t')) {
            var blockIndex = stream.pos - 1;
            return colors[blockIndex % colors.length];
          }
        }
        stream.skipToEnd();
        return null;
      }
    };
  });
}
if(typeof CodeMirror==='undefined'){ window.EDITOR={ready:false, upgrade:function(){}, upgradeAll:function(){}, refreshAll:function(){}}; return; }
var MODE={css:'css', jsx:'jsx', js:'javascript', html:'htmlmixed'};
var LIVE=[];
var MAX = (document.querySelectorAll('textarea').length > 6) ? 2 : 6;
var OFF = /[?&]nocm=1/.test(location.search) || localStorage.getItem('drills:nocm')==='1';

/* Suggestions / Autocomplete toggle switch state */
var SUGGESTIONS_ENABLED = (localStorage.getItem('drills:suggestions') !== '0');

/* ── Emmet Engine ── */
function parseEmmet(abbr, isJsx){
  var classAttr = isJsx ? 'className' : 'class';

  function findSplit(str, op){
    var depth=0, inBracket=0, inBrace=0;
    for(var i=0;i<str.length;i++){
      var c=str[i];
      if(c==='(') depth++;
      else if(c===')') depth--;
      else if(c==='[') inBracket++;
      else if(c===']') inBracket--;
      else if(c==='{') inBrace++;
      else if(c==='}') inBrace--;
      else if(depth===0 && inBracket===0 && inBrace===0 && c===op){
        return i;
      }
    }
    return -1;
  }

  function expandNode(str){
    str = str.trim();
    if(!str) return '';

    if(str.startsWith('(') && str.endsWith(')')){
      var inner = str.slice(1,-1);
      if(findSplit(inner, ')')===-1) return expandNode(inner);
    }

    var childIdx = findSplit(str, '>');
    if(childIdx !== -1){
      var parent = str.slice(0, childIdx);
      var rest = str.slice(childIdx + 1);
      var parentExp = expandSingle(parent);
      var childExp = expandNode(rest);
      return parentExp.open + (childExp ? '\n  ' + childExp.replace(/\n/g, '\n  ') + '\n' : '') + parentExp.close;
    }

    var sibIdx = findSplit(str, '+');
    if(sibIdx !== -1){
      return expandNode(str.slice(0, sibIdx)) + '\n' + expandNode(str.slice(sibIdx + 1));
    }

    var multMatch = str.match(/^(.+?)\*(\d+)$/);
    if(multMatch){
      var base = multMatch[1];
      var count = parseInt(multMatch[2], 10);
      var res = [];
      for(var i=1; i<=count; i++){
        res.push(expandNode(base.replace(/\$/g, i)));
      }
      return res.join('\n');
    }

    var single = expandSingle(str);
    return single.open + single.text + single.close;
  }

  function expandSingle(str){
    var tag = '';
    var id = '';
    var classes = [];
    var text = '';
    var attrs = {};

    var textMatch = str.match(/\{([^}]*)\}/);
    if(textMatch){
      text = textMatch[1];
      str = str.replace(/\{[^}]*\}/, '');
    }

    var attrMatches = str.match(/\[([^\]]*)\]/g);
    if(attrMatches){
      attrMatches.forEach(function(m){
        var inner = m.slice(1, -1);
        var pairs = inner.split(' ');
        pairs.forEach(function(p){
          var parts = p.split('=');
          var k = parts[0];
          var v = parts.slice(1).join('=');
          if(k) attrs[k] = v ? v.replace(/["']/g, '') : '';
        });
      });
      str = str.replace(/\[[^\]]*\]/g, '');
    }

    var tagMatch = str.match(/^([a-zA-Z0-9_-]+)/);
    if(tagMatch){
      tag = tagMatch[1];
      str = str.slice(tag.length);
    } else {
      tag = 'div';
    }

    var idMatches = str.match(/#([a-zA-Z0-9_-]+)/g);
    if(idMatches){
      id = idMatches[0].slice(1);
    }

    var classMatches = str.match(/\.([a-zA-Z0-9_-]+)/g);
    if(classMatches){
      classMatches.forEach(function(c){ classes.push(c.slice(1)); });
    }

    if(id) attrs.id = id;
    if(classes.length) attrs[classAttr] = classes.join(' ');

    var attrKeys = Object.keys(attrs);
    var attrStr = attrKeys.map(function(k){ return ' ' + k + '="' + attrs[k] + '"'; }).join('');
    var selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link'].indexOf(tag.toLowerCase()) !== -1;
    if(selfClosing && isJsx){
      return { open: '<' + tag + attrStr + ' />', text: '', close: '' };
    }
    return { open: '<' + tag + attrStr + '>', text: text, close: '</' + tag + '>' };
  }

  return expandNode(abbr);
}

function expandEmmetIfAny(cm, isJsx){
  var cur = cm.getCursor();
  var line = cm.getLine(cur.line);
  var before = line.slice(0, cur.ch);
  
  // Never expand if we are currently inside an open HTML tag
  var lastOpen = before.lastIndexOf('<');
  var lastClose = before.lastIndexOf('>');
  if (lastOpen > lastClose) return false;

  var m = before.match(/(?:^|[\s(>{])([a-zA-Z0-9_#.[\]{}="'-]+)$/);
  if(!m) return false;
  var abbr = m[1];
  
  // Must look like a real abbreviation: either has . or #, or is an explicit HTML tag.
  var isTag = /^(div|span|button|input|label|p|h[1-6]|section|header|footer|nav|aside|main|article|ul|ol|li|table|form|select|option|textarea|img|a|strong|em|br|hr)$/i.test(abbr);
  var isLikely = /^[.#a-zA-Z]/.test(abbr) && (/[#.[\]{]/.test(abbr) || isTag);
  
  if(!isLikely) return false;
  
  // If it's just a raw tag name (like "span"), only expand on Enter if it's the ONLY thing on the line.
  // Otherwise, typing `const span = 1;` and hitting enter would expand it.
  if (isTag && !/[#.[\]{]/.test(abbr)) {
    if (!/^\s*[a-zA-Z0-9_-]+$/.test(before)) return false;
  }

  try {
    var expanded = parseEmmet(abbr, isJsx);
    if(!expanded) return false;
    hideSuggestions();
    var from = { line: cur.line, ch: cur.ch - abbr.length };
    cm.replaceRange(expanded, from, cur);
    var openTagEnd = expanded.indexOf('>');
    if(openTagEnd !== -1 && !expanded.startsWith('<img') && !expanded.startsWith('<input') && !expanded.endsWith('/>')){
      cm.setCursor({ line: from.line, ch: from.ch + openTagEnd + 1 });
    } else {
      cm.setCursor({ line: from.line, ch: from.ch + expanded.length });
    }
    return true;
  } catch(err) {
    return false;
  }
}

/* ── Smart Newline & Indent Engine on Enter ── */
function smartNewlineAndIndent(cm){
  var cur = cm.getCursor();
  var line = cm.getLine(cur.line);
  var before = line.slice(0, cur.ch);
  var after = line.slice(cur.ch);
  var baseIndent = (line.match(/^(\s*)/) || ['',''])[1];
  
  // Case 1: Between brackets { }, [ ], or JSX tags <div> </div>, <> </>
  var isBetweenBrackets = /(<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\{|\[|\()\s*$/.test(before) && 
                          /^\s*(<\/[a-zA-Z0-9_.-]+>|<\/>|\}|\]|\))/.test(after);
  
  if (isBetweenBrackets) {
    var insert = '\n' + baseIndent + '  \n' + baseIndent;
    cm.replaceRange(insert, cur);
    cm.setCursor({ line: cur.line + 1, ch: baseIndent.length + 2 });
    return;
  }

  // Case 2: Line ending with an opening tag (<>, <tag>), brace, bracket, or keyword
  var endsWithOpen = /(?:<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\b(?:return|function|class|if|else|for)\b|\{|\[|\()\s*$/.test(before);
  var isSelfClosing = /\/>\s*$/.test(before);
  
  if (endsWithOpen && !isSelfClosing) {
    var insert = '\n' + baseIndent + '  ';
    cm.replaceRange(insert, cur);
    cm.setCursor({ line: cur.line + 1, ch: baseIndent.length + 2 });
    return;
  }

  // Case 3: Standard newline preserving base indentation
  var insert = '\n' + baseIndent;
  cm.replaceRange(insert, cur);
  cm.setCursor({ line: cur.line + 1, ch: baseIndent.length });
}

/* ── Commenting & Auto-Formatting ── */
function commentAndFormat(cm, mode, action){
  if(typeof cm.toggleComment === 'function'){
    if(action === 'comment' && typeof cm.lineComment === 'function'){
      cm.lineComment();
    } else if(action === 'uncomment' && typeof cm.uncomment === 'function'){
      cm.uncomment();
    } else {
      cm.toggleComment();
    }
  } else {
    var sel = cm.getSelection();
    if(mode === 'css'){
      cm.replaceSelection('/* ' + (sel || cm.getLine(cm.getCursor().line)) + ' */');
    } else {
      cm.replaceSelection('{/* ' + (sel || cm.getLine(cm.getCursor().line)) + ' */}');
    }
  }
  if(window.FMT){
    var fmtFn = (mode === 'css') ? FMT.css : FMT.jsx;
    if(fmtFn){
      fmtFn(cm.getValue()).then(function(out){
        if(typeof out === 'string' && out.trim()){
          cm.operation(function(){
            var c=cm.getCursor(), s=cm.getScrollInfo();
            cm.setValue(out);
            try{ cm.setCursor(c); cm.scrollTo(s.left,s.top); }catch(e){}
          });
        }
      }).catch(function(){});
    }
  }
}

/* ── Suggestions / Autocomplete Dictionary ── */
var DICT = {
  cssProps: [
    'display', 'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
    'grid-auto-flow', 'grid-auto-rows', 'grid-auto-columns', 'grid-column', 'grid-row', 'grid-area',
    'gap', 'row-gap', 'column-gap',
    'justify-content', 'align-items', 'justify-items', 'align-content',
    'place-items', 'place-content', 'place-self', 'justify-self', 'align-self',
    'flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-basis',
    'position', 'inset', 'top', 'bottom', 'left', 'right', 'z-index',
    'overflow', 'overflow-x', 'overflow-y', 'box-sizing',
    'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
    'background', 'background-color', 'background-image', 'background-size', 'background-position',
    'color', 'font-size', 'font-weight', 'font-family', 'line-height', 'text-align',
    'text-overflow', 'white-space', 'word-break', '-webkit-line-clamp', '-webkit-box-orient',
    'border', 'border-radius', 'border-color', 'border-width', 'border-style',
    'outline', 'box-shadow', 'opacity', 'visibility', 'transform', 'transition', 'animation',
    'cursor', 'pointer-events', 'color-mix', 'container-type', 'container-name'
  ],
  cssVals: [
    'grid', 'flex', 'none', 'block', 'inline', 'inline-block', 'inline-flex', 'inline-grid',
    '1fr', '2fr', '3fr', 'repeat(auto-fit, minmax(180px, 1fr))', 'repeat(auto-fill, minmax(180px, 1fr))', 'repeat(3, 1fr)', 'minmax(0, 1fr)', 'fit-content', 'max-content', 'min-content',
    'space-between', 'space-around', 'space-evenly', 'center', 'start', 'end', 'flex-start', 'flex-end', 'stretch', 'baseline',
    'row', 'column', 'row-reverse', 'column-reverse', 'wrap', 'nowrap', 'wrap-reverse',
    'relative', 'absolute', 'fixed', 'sticky', 'static',
    'border-box', 'content-box', 'hidden', 'visible', 'auto', 'scroll', 'ellipsis', 'clip',
    'break-word', 'break-all', 'pointer', 'transparent', 'currentColor',
    'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', 'translateY(-4px)', 'translateX(0)', 'scale(1.05)',
    '150ms ease', '300ms ease-in-out', 'solid', 'dashed', 'dotted', 'var(--token)'
  ],
  htmlTags: [
    'div', 'span', 'button', 'input', 'label', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'section', 'header', 'footer', 'nav', 'aside', 'main', 'article',
    'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'form', 'select', 'option', 'textarea', 'img', 'a', 'strong', 'em', 'code', 'pre',
    'figure', 'figcaption', 'Fragment'
  ],
  jsxAttrs: [
    'className', 'id', 'style', 'type', 'value', 'placeholder', 'defaultValue',
    'onClick', 'onChange', 'onSubmit', 'onKeyDown', 'key', 'ref',
    'disabled', 'checked', 'defaultChecked', 'readOnly', 'required', 'autoFocus',
    'tabIndex', 'role', 'aria-label', 'aria-hidden', 'aria-expanded', 'aria-selected', 'aria-controls', 'aria-current',
    'href', 'src', 'alt', 'title'
  ]
};

var suggestHUD = null;
var suggestActiveIndex = 0;
var suggestItems = [];
var suggestCM = null;
var suggestToken = null;
var suggestNavigated = false;

function hideSuggestions(){
  if(suggestHUD && suggestHUD.parentNode){
    suggestHUD.parentNode.removeChild(suggestHUD);
  }
  suggestHUD = null;
  suggestItems = [];
  suggestCM = null;
  suggestToken = null;
  suggestNavigated = false;
}

function showSuggestions(cm, items, token, coords){
  hideSuggestions();
  if(!items || !items.length) return;
  suggestItems = items;
  suggestCM = cm;
  suggestToken = token;
  suggestActiveIndex = 0;
  suggestNavigated = false;

  var hud = document.createElement('div');
  hud.className = 'cm-suggest-hud';
  hud.style.left = Math.max(10, Math.min(window.innerWidth - 220, coords.left)) + 'px';
  hud.style.top = (coords.bottom + 4) + 'px';

  items.slice(0, 8).forEach(function(it, idx){
    var el = document.createElement('div');
    el.className = 'cm-suggest-item' + (idx === 0 ? ' active' : '');
    el.innerHTML = '<span class="cm-suggest-text">' + it.text + '</span>'
      + '<span class="cm-suggest-kind">' + it.kind + '</span>';
    el.onmousedown = function(e){
      e.preventDefault();
      applySuggestion(idx);
    };
    hud.appendChild(el);
  });

  document.body.appendChild(hud);
  suggestHUD = hud;
}

function applySuggestion(idx){
  if(!suggestCM || !suggestToken || !suggestItems[idx]) return;
  var choice = suggestItems[idx].text;
  var cur = suggestCM.getCursor();
  var from = { line: cur.line, ch: cur.ch - suggestToken.length };
  suggestCM.replaceRange(choice, from, cur);
  var cm = suggestCM; // keep reference before hideSuggestions clears it
  hideSuggestions();
  cm.focus();
}

function checkSuggestions(cm, mode){
  if(!SUGGESTIONS_ENABLED) { hideSuggestions(); return; }
  var cur = cm.getCursor();
  var line = cm.getLine(cur.line);
  var before = line.slice(0, cur.ch);
  var m = before.match(/([a-zA-Z0-9_-]+)$/);
  if(!m || m[1].length < 1){ hideSuggestions(); return; }
  var tok = m[1];
  var low = tok.toLowerCase();

  var list = [];
  if(mode === 'css'){
    var isVal = before.indexOf(':') !== -1 && before.indexOf(':') < cur.ch;
    if(isVal){
      DICT.cssVals.forEach(function(v){
        if(v.toLowerCase().indexOf(low) !== -1) list.push({ text: v, kind: 'val' });
      });
    } else {
      DICT.cssProps.forEach(function(p){
        if(p.toLowerCase().indexOf(low) !== -1) list.push({ text: p + ': ', kind: 'prop' });
      });
    }
  } else {
    var isTag = /<[a-zA-Z0-9_-]*$/.test(before) || /(?:^|\s)[a-zA-Z0-9_-]*$/.test(before);
    if(isTag){
      DICT.htmlTags.forEach(function(t){
        if(t.toLowerCase().indexOf(low) !== -1) list.push({ text: t, kind: 'tag' });
      });
    }
    DICT.jsxAttrs.forEach(function(a){
      if(a.toLowerCase().indexOf(low) !== -1) list.push({ text: a + '=""', kind: 'attr' });
    });
  }

  if(list.length){
    var coords = cm.cursorCoords(true, 'page');
    showSuggestions(cm, list, tok, coords);
  } else {
    hideSuggestions();
  }
}

function dispose(cm){
  try{ if(cm.hasFocus && cm.hasFocus()) return; }catch(e){}
  try{ var ta=cm.getTextArea && cm.getTextArea(); cm.toTextArea();
       if(ta){ delete ta.__cm; delete ta.__editor; delete ta.__watched;
               try{ delete ta.value; }catch(e){} } }catch(e){}
}
function budget(){
  LIVE=LIVE.filter(function(c){
    var w=c.getWrapperElement&&c.getWrapperElement();
    if(!w || !document.body.contains(w)){ dispose(c); return false; }
    return true;
  });
  while(LIVE.length>MAX){
    var cm=LIVE.shift();
    var w=cm.getWrapperElement&&cm.getWrapperElement();
    if(w && document.body.contains(w)){ LIVE.push(cm); break; }
    dispose(cm);
  }
}

function upgrade(ta){
  if(OFF) return null;
  if(!ta || ta.__cm || ta.readOnly || ta.dataset.noCm==='1') return null;
  if(!document.body.contains(ta)) return null;
  ta.__cm=true;
  var modeName = ta.dataset.mode || 'jsx';
  var cm=CodeMirror.fromTextArea(ta,{
    mode: MODE[modeName]||MODE.jsx,
    lineNumbers:true, indentUnit:2, tabSize:2, smartIndent:true,
    lineWrapping:true,
    scrollbarStyle:'native',
    autoCloseBrackets:true, autoCloseTags:true, matchBrackets:true,
    styleActiveLine:true, viewportMargin:10,
    extraKeys:{
      Tab:function(c){
        if(c.somethingSelected()){
          c.indentSelection('add');
          return;
        }
        if(modeName !== 'css'){
          if(expandEmmetIfAny(c, modeName === 'jsx')){
            return;
          }
        }
        if(suggestHUD){
          applySuggestion(suggestActiveIndex);
          return;
        }
        c.replaceSelection('  ');
      },
      'Shift-Tab':function(c){ c.indentSelection('subtract'); },
      'Ctrl-/':function(c){ commentAndFormat(c, modeName, 'toggle'); },
      'Cmd-/':function(c){ commentAndFormat(c, modeName, 'toggle'); },
      'Ctrl-K Ctrl-C':function(c){ commentAndFormat(c, modeName, 'comment'); },
      'Cmd-K Cmd-C':function(c){ commentAndFormat(c, modeName, 'comment'); },
      'Ctrl-K Ctrl-U':function(c){ commentAndFormat(c, modeName, 'uncomment'); },
      'Cmd-K Cmd-U':function(c){ commentAndFormat(c, modeName, 'uncomment'); },
      Down:function(c){
        if(suggestHUD){
          suggestNavigated = true;
          suggestActiveIndex = (suggestActiveIndex + 1) % Math.min(8, suggestItems.length);
          var items = suggestHUD.querySelectorAll('.cm-suggest-item');
          items.forEach(function(it, i){ it.classList.toggle('active', i === suggestActiveIndex); });
          return;
        }
        CodeMirror.commands.goLineDown(c);
      },
      Up:function(c){
        if(suggestHUD){
          suggestNavigated = true;
          suggestActiveIndex = (suggestActiveIndex - 1 + Math.min(8, suggestItems.length)) % Math.min(8, suggestItems.length);
          var items = suggestHUD.querySelectorAll('.cm-suggest-item');
          items.forEach(function(it, i){ it.classList.toggle('active', i === suggestActiveIndex); });
          return;
        }
        CodeMirror.commands.goLineUp(c);
      },
      Enter:function(c){
        if(suggestHUD && suggestNavigated){
          applySuggestion(suggestActiveIndex);
          return;
        }
        if(modeName !== 'css' && expandEmmetIfAny(c, modeName === 'jsx')){
          return;
        }
        hideSuggestions();
        smartNewlineAndIndent(c);
      },
      Esc:function(c){
        if(suggestHUD){
          hideSuggestions();
          return;
        }
      }
    }
  });

  var native=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value');
  Object.defineProperty(ta,'value',{configurable:true,
    get:function(){ return cm.getValue(); },
    set:function(v){ v=(v==null?'':String(v)); if(v===cm.getValue()) return;
      cm.setValue(v); native.set.call(ta,v); }});

  var t=null;
  cm.on('change',function(instance, changeObj){
    native.set.call(ta,cm.getValue());
    clearTimeout(t);
    t=setTimeout(function(){ ta.dispatchEvent(new Event('input',{bubbles:true})); },70);
    if(changeObj && changeObj.origin !== 'setValue'){
      checkSuggestions(cm, modeName);
    }
  });
  cm.on('blur', function(){
    setTimeout(hideSuggestions, 150);
  });

  /* VS Code Cmd+K chord listener */
  var cmdKPending = false, cmdKTimer = null;
  cm.on('keydown', function(instance, ev){
    if((ev.metaKey || ev.ctrlKey) && (ev.key === 'k' || ev.keyCode === 75)){
      cmdKPending = true;
      clearTimeout(cmdKTimer);
      cmdKTimer = setTimeout(function(){ cmdKPending = false; }, 1500);
      return;
    }
    if(cmdKPending){
      if(ev.key === 'c' || ev.keyCode === 67){
        ev.preventDefault();
        cmdKPending = false;
        commentAndFormat(cm, modeName, 'comment');
      } else if(ev.key === 'u' || ev.keyCode === 85){
        ev.preventDefault();
        cmdKPending = false;
        commentAndFormat(cm, modeName, 'uncomment');
      } else {
        cmdKPending = false;
      }
    }
  });

  ta.__editor=cm; LIVE.push(cm); budget();
  if(window.FMT){
    FMT[(ta.dataset.mode==='css')?'css':'jsx'](cm.getValue()).then(function(out){
      if(typeof out!=='string') return;
      if(!out.trim() || out===cm.getValue()) return;
      if(out.trim().length < Math.min(8, cm.getValue().trim().length)) return;
      if(cm.hasFocus()) return;
      cm.operation(function(){
        var c=cm.getCursor(), s=cm.getScrollInfo();
        cm.setValue(out);
        try{ cm.setCursor(c); cm.scrollTo(s.left,s.top); }catch(err){}
      });
    }).catch(function(){});
  }
  if(window.LSP && LSP.attach){
    LSP.attach(cm, modeName);
  }
  cm.addOverlay("rainbow-indents");
  setTimeout(function(){cm.refresh()},0);
  return cm;
}
function visible(ta){
  return ta.offsetParent!==null && ta.getBoundingClientRect().height>0;
}
function upgradeVisible(root){
  if(OFF) return;
  if(focused()) return;
  var list=[];
  (root||document).querySelectorAll('textarea').forEach(function(ta){
    if(!ta.__cm && visible(ta)) list.push(ta);
  });
  list.slice(0, MAX).forEach(upgrade);
  budget();
}
var pending=null, busy=false;
function schedule(){ if(busy) return; clearTimeout(pending); pending=setTimeout(function(){
  busy=true; try{ upgradeVisible(); } finally { setTimeout(function(){busy=false;},50); } },200); }

function focused(){
  var a=document.activeElement;
  if(!a) return false;
  if(a.tagName==='TEXTAREA'||a.tagName==='INPUT') return true;
  return !!(a.closest && a.closest('.CodeMirror'));
}

document.addEventListener('DOMContentLoaded',function(){
  upgradeVisible();
  ['click','change'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      var t=e.target;
      if(t && t.closest && t.closest('.CodeMirror')) return;
      schedule();
    }, true);
  });
  addEventListener('resize',function(){ clearTimeout(schedule._r);
    schedule._r=setTimeout(function(){ if(!focused()) upgradeVisible(); },250); });
});

function redraw(root){
  var tas=(root||document).querySelectorAll('textarea');
  for(var i=0;i<tas.length;i++){
    var cm=tas[i].__editor;
    if(cm && tas[i].offsetParent!==null) try{ cm.refresh(); }catch(err){}
  }
}

window.EDITOR={
  ready:!OFF, off:OFF, upgrade:upgrade, upgradeAll:upgradeVisible, refresh:schedule, redraw:redraw,
  refreshAll:function(root){ (root||document).querySelectorAll('.CodeMirror').forEach(function(e){ e.CodeMirror&&e.CodeMirror.refresh(); }); },
  of:function(ta){ return ta&&ta.__editor; }, live:function(){ return LIVE.length; },
  parseEmmet: parseEmmet,
  smartNewlineAndIndent: smartNewlineAndIndent,
  setSuggestions: function(enabled){
    SUGGESTIONS_ENABLED = !!enabled;
    localStorage.setItem('drills:suggestions', SUGGESTIONS_ENABLED ? '1' : '0');
    if(!SUGGESTIONS_ENABLED) hideSuggestions();
    return SUGGESTIONS_ENABLED;
  },
  isSuggestionsEnabled: function(){
    return SUGGESTIONS_ENABLED;
  }
};
})();
