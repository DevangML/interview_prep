const regex = /(?:<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\b(?:return|function|class|if|else|for)\b|\{|\[|\()\s*$/;
console.log(regex.test('<>'));
console.log(regex.test('<div>'));
console.log(regex.test('<div class="red">'));
console.log(regex.test('.card {'));
console.log(regex.test('return ('));
console.log(regex.test('if (true) {'));
console.log(regex.test('function() {'));
console.log(regex.test('/>'));
