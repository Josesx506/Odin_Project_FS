const add = function(num1, num2) {
  return num1 + num2
};

const subtract = function(num1, num2) {
	return num1 - num2
};

const sum = function(arr) {
  let totals = arr.reduce((total, initial) => total + initial, 0)
  return totals
};

const multiply = function(arr) {
  let totals = arr.reduce((total, initial) => total * initial, 1)
  return totals
};

const power = function(num, pow) {
	return Math.pow(num, pow)
};

const factorial = function(num) {
	if (num === 1 || num === 0) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};

