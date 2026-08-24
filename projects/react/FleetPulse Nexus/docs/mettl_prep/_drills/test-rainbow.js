const cm = {
  getLine: () => "      <div>",
};
const line = cm.getLine();
const match = line.match(/^(\s+)/);
if(match) {
  const spaces = match[1];
  console.log(spaces.length);
}
