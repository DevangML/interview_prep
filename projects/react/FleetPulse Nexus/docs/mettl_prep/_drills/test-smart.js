function testSmart(before, after) {
  var baseIndent = (before.match(/^(\s*)/) || ['',''])[1];
  
  var isBetweenBrackets = /(<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\{|\[|\()\s*$/.test(before) && 
                          /^\s*(<\/[a-zA-Z0-9_.-]+>|<\/>|\}|\]|\))/.test(after);
  
  if (isBetweenBrackets) {
    return 'CASE 1';
  }

  var endsWithOpen = /(?:<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\b(?:return|function|class|if|else|for)\b|\{|\[|\()\s*$/.test(before);
  var isSelfClosing = /\/>\s*$/.test(before);
  
  if (endsWithOpen && !isSelfClosing) {
    return 'CASE 2';
  }

  return 'CASE 3';
}
console.log('between div:', testSmart('  <div class="test">', '</div>'));
console.log('after div:', testSmart('  <div class="test">', ''));
console.log('after self closing:', testSmart('  <img src="test" />', ''));
console.log('after css block open:', testSmart('.card {', ''));
console.log('after css prop:', testSmart('  color: red;', ''));
console.log('between braces:', testSmart('function test() {', '}'));
console.log('empty line:', testSmart('', ''));
