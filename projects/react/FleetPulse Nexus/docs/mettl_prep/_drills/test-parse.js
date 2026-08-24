function parseEmmet(abbr, isJsx){
  var tag = 'div', id = '', classes = [], attrs = {};
  var classAttr = isJsx ? 'className' : 'class';
  var str = abbr;

  var textMatch = str.match(/\{([^}]*)\}/);
  var text = '';
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

function expandNode(abbr){
  var res = parseEmmet(abbr, true);
  if(!res) return null;
  return res.open + res.text + res.close;
}

console.log(expandNode('.red'));
console.log(expandNode('div.red'));
