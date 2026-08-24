const before1 = '      <div className="red">';
const after1 = '</div>';

const before2 = '      <>';
const after2 = '</>';

const before3 = '      {';
const after3 = '}';

const regexBefore = /(<[a-zA-Z0-9_.-]*[^>]*>|<>\s*|\b(return|function|class|if|else|for)\b|\{|\[|\()\s*$/;
const regexAfter = /^\s*(<\/[a-zA-Z0-9_.-]*>|<\/>|\}|\]|\))/;

console.log(regexBefore.test(before1), regexAfter.test(after1));
console.log(regexBefore.test(before2), regexAfter.test(after2));
console.log(regexBefore.test(before3), regexAfter.test(after3));

