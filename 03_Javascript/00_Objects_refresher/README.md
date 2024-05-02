# Object 
### Creating Prototypes
Objects in JS are equivalent to python classes. All objects in JavaScript have a `prototype`. Protoypes are synonymous to class methods and attributes in python. `this.prototype` is the JS equivalent of `self.method` in python.
```JS
// object literal
table = {
  drawers: 2;
  legs: 4;
};

// object function
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
