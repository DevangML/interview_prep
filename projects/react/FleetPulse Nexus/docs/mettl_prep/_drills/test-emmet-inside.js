function isInsideOpenTag(before) {
  var lastOpen = before.lastIndexOf('<');
  var lastClose = before.lastIndexOf('>');
  return lastOpen > lastClose;
}
console.log('<div ', isInsideOpenTag('<div '));
console.log('<div class="red"', isInsideOpenTag('<div class="red"'));
console.log('<div>div.red', isInsideOpenTag('<div>div.red'));
console.log('div.red', isInsideOpenTag('div.red'));
