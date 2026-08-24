function testRegex(before) {
  var m = before.match(/(?:^|[\s(>{<])([a-zA-Z0-9_#.[\]{}="'-]+)$/);
  return m ? m[1] : null;
}
console.log('div.red', testRegex('div.red'));
console.log('  span.badge', testRegex('  span.badge'));
console.log('<div class="red">', testRegex('<div class="red">'));
console.log('    <div class="red">', testRegex('    <div class="red">'));
console.log('    </div>', testRegex('    </div>'));
console.log('return (', testRegex('return ('));
console.log('/>', testRegex('/>'));
console.log('    className="test"', testRegex('    className="test"'));
