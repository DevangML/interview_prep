const code = `
  setTimeout(() => console.log('async'), 10);
  console.log('sync');
`;

const logs = [];
const mockConsole = {
  log: (...args) => {
    logs.push(args.join(' '));
  }
};

const fn = new Function('console', code);
fn(mockConsole);

setTimeout(() => {
  console.log(logs);
}, 20);
