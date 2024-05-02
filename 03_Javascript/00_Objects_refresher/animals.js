// Original object
function Animal (name, energy) {
    this.name = name
    this.energy = energy
    this.eat = function (amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    };
    this.sleep = function (length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    };
  }
// Additional prototype - post creation
Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
};

// New oject with inherited class and extended prototype breed
function Dog (name, energy, breed) {
    Animal.call(this, name, energy);
    this.breed = breed;
};
// Use Object.create to overwrite the initial prototype. 
// This allows the Dog object to access methods not defined in the original Animal object like `.play()`
// Trying to implement dog1.play(2) without creating the prototype will raise an error
Dog.prototype = Object.create(Animal.prototype);

const dog1 = new Dog("Batuta", 5, "rottweiler");

console.log(dog1.sleep(2));
console.log(dog1.energy); // Should return 7
console.log(dog1.valueOf());


// Function objects
function Car(color) {
    this.color = color
};
Car.prototype.getColor = function() {
    return `The car color is ${this.color}`
};

// Inheriting a function object
const ToyCar = function(color, doors) {
    Car.call(this, color); // Assign the color prototype from Car
    this.doors = doors;
};
// Overwriting the ToyCar prototype with Car to allow it access
// additional methods like getColor() not original specified at Car's init
ToyCar.prototype = Object.create(Car.prototype)


// Create a new object with the extended class
const legoCar = new ToyCar("green",4);
console.log(legoCar instanceof ToyCar); // returns True
console.log(legoCar instanceof Car);     // returns True
console.log(legoCar.getColor());