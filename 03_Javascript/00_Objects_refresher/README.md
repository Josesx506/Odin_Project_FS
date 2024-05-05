# Object 
- [Prototypes](#creating-prototypes)
- [Object Inheritance](#object-inheritance)
- [Mutl-variable definition](#object-destructuring)
- [Factory Functions](#factory-functions)
- [Constructors and Private Functions](#private-variables-and-functions)

### Creating Prototypes
Objects in JS are equivalent to python classes. All objects in JavaScript have a `prototype`. Protoypes are synonymous to class methods and attributes in python. `this.prototype` is the JS equivalent of `self.method` in python.
```JS
// object literal
table = {
  drawers: 2;
  legs: 4;
};

// constructor or object function
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name)
  };
}

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');
player1.sayName(); // logs 'steve'
player2.sayName(); // logs 'also steve'
```
In this example above, both *player1* and *player2* can access all the attributes of the `Player` object i.e. `name | marker | sayName()`. To check that the protoypes of the objects are equal, you can run
```JS
Object.getPrototypeOf(player1) === Player.prototype; // returns true
```

Additional prototypes can be added to the original object after it has been created
```JS
Player.prototype.sayHello = function() {
   console.log(`Hello, I am player $x{this.name}!`);
};
```
**All** the protoypes of a class can be printed out with some *in-built* prototypes of an object like `.valueOf()`. This only returns prototypes that were declared in the object during `init`. It doesn't print out protypes that were externally defined e.g `sayHello()` in the step above.
```JS
// Output may slightly differ based on the browser
player1.valueOf(); // Output: Object { name: "steve", marker: "X", sayName: sayName() }
```

### Checking Prototypes
To check if an object has a prototype, we can use `hasOwnProperty("targetPrototypeName")`
```JS
player1.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true
```
The `valueOf` prototype in player1 is inherited from the Player object which is why it prints false initially but it works when called because the prototype exists within the parent object.<br>

## Object Inheritance
### Object.setPrototypeOf() - SLOW Performance!!!!!
Prototypes can be inherited across classes using the `setPrototypeOf` command.
```JS
// Create an initial object Person with 3 prototypes
function Person(name) {
  this.name = name;
  this.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
  };
}

// Create a second object Player with 2 intitial and 1 subsequent prototype
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
Player.prototype.getMarker = function() {
  console.log(`My marker is '${this.marker}'`);
};


// Now make `Player` objects inherit from `Person`. I removed the console log statements
Object.setPrototypeOf(Player.prototype, Person.prototype);
Object.getPrototypeOf(Player.prototype); // Check that the new prototpyes have been inherited
```


### Object.create() - Improved Performance!!!!!
Trying to inherit prototypes with an equals sign will result in some prototypes of one of the objects being overwritten `Player.prototype = Person.prototype;`. In this example, if both objects have a `sayName()` prototype that behaves differently, the sayName in the Player object will be overwritten with the one in the Person object. <br>

Prototype inheritance can also be implemented at init like python with the `Object.create()` method. <br>
`Object.setPrototypeOf` ***slows down JS*** in real life applications, Object.create() should be used instead. Object.create is used to extend constructors i.e. take a base object and add additional prototypes/methods to it instead of writing it from scratch. It also works on function objects.
```JS
// Regular objects
const cat = {
    
    makeSound: function() {
        console.log(this.sound)
    };
}

// Inherit the cass class
const mark = Object.create(cat)

// Function objects
function Car(color) {
    this.color = color
};
Car.prototype.getColor = function() {
    return `The car color is ${this.color}`
};

// Inheriting a function object.
// ToyCar has been expanded to have a doors attribute too
const ToyCar = function(color, doors) {
    Car.call(this, color); // Assign the color prototype from Car
    this.doors = doors;
};
// Overwriting the ToyCar prototype with Car to allow it access
// additional methods like getColor() not original specified at Car's init
ToyCar.prototype = Object.create(Car.prototype)


// Create a new object with the extended class
const legoCar = new ToyCar();
console.log(legoCar instanceof ToyCar); // returns True
console.log(legoCar instanceof Car);    // returns True
console.log(legoCar.getColor());        // returns "The car color is green"
```


### Factory functions
The one downside of object functions (constructors) is that if the `new ObjectFunctionName()` is not specified, it would return an error that is hard to debug. A solution will be to create ***factory functions***. Factory functions allow wrapping of return statements in curly braces that enable JS to decode the return statement as an object.
```JS
const name = "Bob";
const age = 28;
const color = "red";

// example return without curly braces which would resulted in a mess - Bob 28 red
console.log(name, age, color);

// Wrapping it in some { } makes it an object! It logs { name: "Bob", age: 28, color: "red" }
console.log({ name, age, color });

// This is a contructor which looks lke 
const User = function (name) {
  this.name = name;
  this.discordName = "@" + name;
}

// hey, this is a constructor - then this can be refactored into a factory!
function createUser (name) {
  const discordName = "@" + name;
  return { name, discordName };
}
// and that's very similar, except since it's just a function, we don't need a new keyword
```

### Object destructuring
Object destructuring allows upacking multiple variables from an object / array.
```JS
// Create two const variables, a and b from obj
const obj = { a: 1, b: 2 };
const { a, b } = obj;

// Extract the first and second index values from the array
const array = [1, 2, 3, 4, 5];
const [ zerothEle, firstEle ] = array;
```

### Private Variables and Functions
Functions in JavaScript form ***closures***. A closure refers to the *combination* of a function and the surrounding state in which the function was declared. Closures allow us to specify private functions. These are functions that update an attribute with an object but cannot be accessed from outside the object e.g. We can implement custom `count` or `length` functions within an object using private variables.
```JS
function createUser (name) {
  const discordName = "@" + name;

  let reputation = 0;
  const getReputation = () => reputation;    // Reads the reputation variable
  const giveReputation = () => reputation++; // Increments the reputation variable

  return { name, discordName, getReputation, giveReputation };
}

const josh = createUser("josh");
josh.giveReputation();
josh.giveReputation();

console.log({
  discordName: josh.discordName,
  reputation: josh.getReputation()
});
// logs { discordName: "@josh", reputation: 2 }
```
The `reputation` variable is private, and can only be accessed by the specified closures. <br><br>

Factory function can also be inherited in 2 ways. In the *first scenario*, you can extract multiple factory variables from a preexisting function using variable declustering in your new factory function
```JS
function createPlayer (name, level) {
  const { getReputation, giveReputation } = createUser(name);    // declustering old factory variables

  const increaseLevel = () => level++;
  return { name, getReputation, giveReputation, increaseLevel };
}
```
Factory functions can also nbe inherited within a function and reassigned using the `Object.assign` method.
```JS
function createPlayer (name, level) {
  const user = createUser(name);

  const increaseLevel = () => level++;
  return Object.assign({}, user, { increaseLevel });
}
```
A good use of factory functions is ***encapsulation***, i.e. bundling data, code, or something into a single unit like a class. These modules can be exported across fles and enable ***namespacing*** i.e. a technique that is used to avoid naming collisions in our programs. Encapsulation allows definition of **Modules**. Modules can house not only functions, but arrays, objects and primitives as well. The can be defined as `const ModuleName ()();` where the first brack houses whatever the module wants. The first bracket allows JS to evaluate the function or array being passed to the module e.g
```JS
let a = 1;
a.toString();
// can be rewritten as 
(1).toString();
// This is the same concept that powers modules. Note:
1.toString(); //generates an error because 1 has not been evaluated by JS and assigned a type
```
This allows hiding particular functions and preventing users from directly accessing our code or methods. An example of a calculator module is
```JS
const calculator = (function () {
  let calcType = "basic";
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return { add, sub, mul };
})();

calculator.add(3,5); // 8
calculator.sub(6,2); // 4
calculator.mul(14,5534); // 77476
```
In the example above `calcType` is not exposed by the function, and other methods like `div()` can also be hidden. <br>
Some developers prefer to write modules first, then classes after if needed. 
- Modules should not really have any global variables.
- There should be efficient DOM usage with DOM caching.
- Try as much as possible not to repeat code multiple times.

PubSub can also be used to expose and destroy apis.