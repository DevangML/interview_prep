const users = [
  { firstName: "John", lastName: "Dohj", age: 24 },
  { firstName: "Mark", lastName: "Dohj", age: 24 },
  { firstName: "Luke", lastName: "Dohj", age: 28 },
  { firstName: "Mathew", lastName: "Dohj", age: 30 }
];

// Task 1 : list of full names of all users
// ["John Dohj", ...]

const output = users.map((x) => x.firstName + " " + x.lastName);

console.log(output);

// How many people of certain ages (unique)
// {26: 2, 75: 1, 50:1}

// Reduce example, reducing array to an object

const output2 = users.reduce(function (acc, curr) {

  if (acc[curr.age]) {
    acc[curr.age] = ++acc[curr.age]
  }
  else {
    acc[curr.age] = 1
  }

  return acc;
}, {});

console.log(output2);

// Find out firstName of all persons with age < 30

const output3 = users.filter((x) => x.age < 30);

console.log(output3);