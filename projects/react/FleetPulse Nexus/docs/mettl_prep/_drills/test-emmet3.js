const before = 'Object.keys()';
const m = before.match(/(?:^|[\s(>{<])([a-zA-Z0-9_#.\->+*\[\]{}=$"':]+)$/);
console.log(m ? m[1] : null);
