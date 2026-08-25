import re

with open('src/data/masteryStream.ts', 'r') as f:
    content = f.read()

starter = """// 1. Primitives:
let p1 = 5;
let p2 = p1;
p2 = 10;
// Use assert.equal(actual, expected) to prove memory state
assert.equal(p1, 5, "p1 is isolated");

// 2. Objects:
let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 99;
// Test if obj1.val changed
// assert.equal(obj1.val, ...);"""

solution = """let p1 = 5;
let p2 = p1;
p2 = 10;
assert.equal(p1, 5, "p1 is isolated");

let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 99;
assert.equal(obj1.val, 99, "obj1.val mutated");"""

content = re.sub(
    r"starterCode: `// 1\. Primitives:.*?(?=\`,)",
    f"starterCode: `{starter}",
    content,
    flags=re.DOTALL
)

content = re.sub(
    r"solutionCode: `let p1 = 'hello';.*?(?=\`,)",
    f"solutionCode: `{solution}",
    content,
    flags=re.DOTALL
)

with open('src/data/masteryStream.ts', 'w') as f:
    f.write(content)
