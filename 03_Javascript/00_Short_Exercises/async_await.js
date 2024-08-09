const server = {
    people: [
      {
        name: "Odin",
        age: 20,
      },
      {
        name: "Thor",
        age: 35,
      },
      {
        name: "Freyja",
        age: 29,
      },
    ],
  
    getPeople() {
      return new Promise((resolve, reject) => {
        // Simulating a delayed network call to the server
        setTimeout(() => {
          resolve(this.people);
        }, 2000);
      });
    },
  };

  
function getPersonsInfo(name) {
    return server.getPeople().then(people => {
        return people.find(person => { return person.name === name });
    });
};

async function getPersonsInfo(name) {
    const people = await server.getPeople();
    const person = people.find(person => { return person.name === name });
    return person;
};

// Calling console log on the results
getPersonsInfo("Odin"); // Prints nothing because only a promise is returned
getPersonsInfo("Thor"); // Prints nothing because only a promise is returned
let tamS = getPersonsInfo("Freyja").then(console.log); // Prints results as actual object

// Showing the difference in print statements.
async function test_plus_5(num) {
  return num + 5
};
let val = test_plus_5(5);
console.log(val);        // Return Promise object
console.log(val.then(console.log)); // Return actual result
