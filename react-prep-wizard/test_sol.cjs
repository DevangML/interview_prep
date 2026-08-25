const css = `.nav { display: flex; gap: .5rem; }
.nav a { background: aliceblue; padding: .5rem 1rem; }

.last {
  /* TODO — push me right */
}
`;
const sol = "margin-left: auto;";

const solutionCode = css.replace(/^.*TODO.*$/m, `  ${sol.trim()}`);
console.log(solutionCode);
