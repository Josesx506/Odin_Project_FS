- [Classes Intro](#classes)
- [Similarities with Python](#similarities-with-python)
- [Static Fields](#static-fields)
- [Private properties](#private-fields)
- [Class inheritance (extend)](#class-inheritance)
- [Class composition](#class-composition-avoiding-inheritance)

### Classes
Classes in JS are very similar to ***`constructors`*** which are desecribed [here](00_Objects_refresher/README.md#private-variables-and-functions). One of the main differences is that dot notations cannot be used directly like private variables and functions that are used in constructores. In classes, a getter and setter function are required before dot notation can be used. Getters are defined with `get` functions, and setters are defined with `set` functions. Both of them are requred to create and read a proper that exists within a class.
```JS
let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```
A property can either be an accessor (has `get/set` methods) or a data property (has a `value`) but it can't be both. Class syntax is used like object literals, and requires a `new` prefix when being assigned to a variable. This is a feature that can be skipped when using ***constructors/modules***. Unlike functions, classes don't require brackets before curly braces i.e. `function funcName () {}` vs `class ClassName {}`.
```JS
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

// Usage:
let user = new User("John");
user.sayHi();
```
Like modules and constructors, no commas are required to separate internal elements of a class. This is different from how object literals (think python dicts) are set up. Classes are non-enumerable i.e. you can't loop over them, and they have a special internal property called `[[IsClassConstructor]]: true` that differentiates them from constructors and other object types. An example of using getters and setters in classes is shown below. When accessing constructor fields from with get and set, an underscore notation e.g. `_name` must be used for the field/attribute within the getter and setter to avoid a `RangeError: Maximum call stack size exceeded` error (from my personal tests). The constructor is akin to the init function in a python class.
```JS
class User {
  constructor(name,age) {
    // invokes the setter
    this.name = name;
    this.age = age;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let user = new User("John");
alert(user.name); // John
alert(user.age);  // undefined

user = new User(""); // Name is too short.
```
**Note**: Unlike python classes, if a constructor requires two arguments and you pass in only one when creating the instance of the class, JS will not raise and error, and will instead assign undefined to the omitted argument field. You will only get an error if you try to call a method that references that field. <br>
Name fields in a class are not added to the prototype and can only be accessed with the dot notation (internally).
```JS
class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();         // Hello, John!
let user = new User();
alert(user.name);           // John
alert(User.prototype.name); // undefined
```
The Basic class syntax looks like this:
```JS
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```
### Similarities with Python
Like python classes, specific methods or fields do not have to be returned in JS classes (unlike making a class work as a constructor / module). Other similarities between JS and Python classes are:
|     |  JS  | Python |
| :-- | :--: | :----: |
| declaration | constructor() | __init__() |
| reference method | this.method() | self.method() |
| reference field | this.field | self.field |

If the method/ field is not defined inside the constructor at the initialization of the class, a getter would need to be defined to access it.

```JS
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
  *getSides() {
    yield this.height;
    yield this.width;
    yield this.height;
    yield this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
console.log([...square.getSides()]); // [10, 10, 10, 10]
```
### Static Fields
The `static` keyword defines a static method or field for a class. Static properties (fields and methods) are defined on the class itself instead of each instance. Static methods are often used to create utility functions for an application, whereas static fields are useful for caches, fixed-configuration, or any other data that doesn't need to be replicated across instances.
```JS
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance; // undefined
p2.displayName; // undefined
p2.distance; // undefined

console.log(Point.displayName); // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

### Private fields
Private fields can also be created within the class that cannot be referenced outside the class by including a `#` prefix to the variable. It's an error to reference private fields from outside of the class; they can only be read or written within the class body. By defining things that are not visible outside of the class, you ensure that your classes' users can't depend on internals, which may change from version to version. Private fields can only be declared up-front in a field declaration. They cannot be created later through assigning to them, the way that normal properties can.
```JS
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}
```

### Class inheritance
The `extends` keyword is used in class declarations or class expressions to create a class as a child of another constructor (either a class or a function). Inheritance is when you define your data types around what they are.
```JS
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.
```

If there is **no constructor present in the subclass**, it needs to first call super() before using this. The super keyword can also be used to call corresponding methods of super class.
```JS
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}

const l = new Lion("Fuzzy");
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```

### Class Composition (avoiding inheritance)
If a parent class that will be inherited has complex constructors during declaration, **composition** can be used to avoid conflicts. This helps to avoid inheritance at the expense of repeated a lot of the parent class function. It reduces the coupling of the child class to the parent class, and only uses that parent object as an implementation detail. Additional details can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#avoiding_inheritance). Composition is when you design your data type around what it does. An example is decribed below
```JS
class ReadOnlyMap {
  #data;                          // private field that cannot be accessed externally
  constructor(values) {
    this.#data = new Map(values);
  }
  get(key) {
    return this.#data.get(key);
  }
  has(key) {
    return this.#data.has(key);
  }
}
```

Some developers favor *composition* over *inheritance* but there's no perfect reason for using one over the other and each design implementation depends on the need case. The Odin project appears to favor composition over inheritance.