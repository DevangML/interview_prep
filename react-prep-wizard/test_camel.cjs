function camel(prop) {
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
console.log(camel('margin-left'));
