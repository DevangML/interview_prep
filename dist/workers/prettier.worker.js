/* Classic worker — see babel.worker.js for why importScripts needs this. */
importScripts('/vendor/prettier-standalone.js');
importScripts('/vendor/prettier-babel.js');
importScripts('/vendor/prettier-estree.js');
importScripts('/vendor/prettier-postcss.js');
importScripts('/vendor/prettier-html.js');

function plugins() {
  var p = self.prettierPlugins || {};
  return Object.keys(p).map(function (k) { return p[k]; });
}

self.onmessage = function (ev) {
  var msg = ev.data || {};
  var done = function (out, err) { self.postMessage({ id: msg.id, code: out, error: err }); };
  try {
    var out = self.prettier.format(msg.code || '', {
      parser: msg.parser,
      plugins: plugins(),
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
    });
    // prettier 3 returns a promise, prettier 2 a string
    if (out && typeof out.then === 'function') {
      out.then(function (v) { done(v); }, function (e) { done(msg.code, String((e && e.message) || e)); });
    } else {
      done(out);
    }
  } catch (e) {
    done(msg.code, String((e && e.message) || e));
  }
};

self.postMessage({ ready: true });
