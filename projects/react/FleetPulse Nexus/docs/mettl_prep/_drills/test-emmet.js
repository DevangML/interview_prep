const before = '      div.red';
const m = before.match(/(?:^|[\s(>{<])([a-zA-Z0-9_#.\->+*\[\]{}=$"':]+)$/);
console.log(m[1]);
