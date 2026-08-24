var before = "div.red";
var lastOpen = before.lastIndexOf('<');
var lastClose = before.lastIndexOf('>');
if (lastOpen > lastClose) { console.log('blocked by tag'); process.exit(0); }

var m = before.match(/(?:^|[\s(>{])([a-zA-Z0-9_#.[\]{}="'-]+)$/);
if(!m) { console.log('no match'); process.exit(0); }
var abbr = m[1];
console.log('abbr:', abbr);

var isTag = /^(div|span|button|input|label|p|h[1-6]|section|header|footer|nav|aside|main|article|ul|ol|li|table|form|select|option|textarea|img|a|strong|em|br|hr)$/i.test(abbr);
var isLikely = /^[.#a-zA-Z]/.test(abbr) && (/[#.[\]{]/.test(abbr) || isTag);

if(!isLikely) { console.log('not likely'); process.exit(0); }

if (isTag && !/[#.[\]{]/.test(abbr)) {
  if (!/^\s*[a-zA-Z0-9_-]+$/.test(before)) { console.log('blocked tag word'); process.exit(0); }
}
console.log('will expand:', abbr);
