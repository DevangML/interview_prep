function replaceCss() {
  const css = ".ratio {\n  width: 100%;\n  background: steelblue;\n  color: white;\n  /* TODO — one line */\n}\n";
  const sol = "aspect-ratio: 16 / 9;";
  return css.replace(/^.*TODO.*$/m, sol || '');
}
console.log(replaceCss());
