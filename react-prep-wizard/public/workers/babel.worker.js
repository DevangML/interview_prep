/* Classic worker — importScripts is illegal in module workers, which is why the
   previous bundled version silently died on load and left the preview blank. */
importScripts('/vendor/babel.min.js');

var IMPORT_RE = /^import\s+.*?from\s+['"]([^'"]+)['"];?/gm;
var SIDE_IMPORT_RE = /^import\s+['"][^'"]+['"];?/gm;
var EXPORT_RE = /export\s+default\s+/;

/* Must be globalThis-qualified: `const React = React` would shadow the global
   and blow up with a temporal-dead-zone error inside the sandbox. */
var ALLOWED = {
  react: 'globalThis.React',
  'react-dom': 'globalThis.ReactDOM',
  'react-dom/client': 'globalThis.ReactDOM',
};

function resolveImports(code) {
  return code
    .replace(SIDE_IMPORT_RE, '')
    .replace(IMPORT_RE, function (match, mod) {
      var global = ALLOWED[mod];
      if (!global) return '/* blocked: ' + mod + ' */';
      var names = match
        .replace(/;\s*$/, '')
        .replace(/^import\s+/, '')
        .replace(/\s+from\s+['"][^'"]+['"]$/, '')
        .trim();
      if (names.charAt(0) === '{') return 'const ' + names + ' = ' + global + ';';
      // `React, { useState }` → default plus named
      var parts = names.split(/,(.+)/);
      var out = 'const ' + parts[0].trim() + ' = ' + global + ';';
      if (parts[1] && parts[1].trim()) out += ' const ' + parts[1].trim() + ' = ' + global + ';';
      return out;
    });
}

function compile(code) {
  try {
    var processed = resolveImports(code).replace(EXPORT_RE, 'var __DEFAULT__ = ');
    var result = Babel.transform(processed, {
      presets: ['react'],
      filename: 'component.jsx',
      sourceType: 'script',
    });
    return { code: result.code };
  } catch (e) {
    return { error: (e && e.message) || String(e) };
  }
}

self.onmessage = function (ev) {
  var msg = ev.data || {};
  var res = compile(msg.code || '');
  res.id = msg.id;
  self.postMessage(res);
};

self.postMessage({ ready: true });
