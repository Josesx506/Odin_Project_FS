### JS
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
A property can either be an accessor (has `get/set` methods) or a data property (has a `value`) but it can't be both.