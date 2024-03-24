let numbers = [1,2,3,4,5];

// Map method
function addSix(num) {
    return num + 6;
  }

let added = numbers.map(addSix);
console.log(added);


// Filter method
function isOdd(num) {
    return (num % 2 !== 0)
}

let filt = numbers.filter(isOdd);
console.log(filt);


// Reduce method
/* Just like .map() and .filter() the reduce method expects a callback function. 
However, there are two key differences with this array method: 

- The callback function takes two arguments instead of one. 
  The first argument is the accumulator, which is the current 
  value of the result at that point in the loop. The first time through, 
  this value will either be set to the initialValue (described in 
  the next bullet point), or the first element in the array 
  if no initialValue is provided. The second argument for the 
  callback is the current value, which is the item currently being iterated on.

- It also takes in an initialValue as a second argument (after the callback), 
  which helps when we don’t want our initial value to be the first element in 
  the array. For instance, if we wanted to sum all numbers in an array, we could 
  call reduce without an initialValue, but if we wanted to sum all numbers in an 
  array and add 10, we could use 10 as our initialValue.
*/

let multiplied = numbers.reduce((total, currentItem) => total * currentItem, 1); // Outputs 120;
console.log(multiplied);