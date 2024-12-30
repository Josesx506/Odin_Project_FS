#!/usr/bin/node

/**
 * Implement recursive fibonacci with memoization to store 
 * previous results, making it faster during computation with 
 * a storage tradeoff
 * @param {Number} n - max fib number to be computed
 * @param {Array} res - input array for first 3 fib numbers
 * @returns 
 */
function fib(n, res = [0, 1, 1]) {
    if (res[n]) {
        return res[n];
    }
    res[n] = fib(n - 1, res) + fib(n - 2, res);
    return res[n];
}

/**
 * Sort an array using recursive sort methods
 * Saves temporary arrays that split the original 
 * input down the middle and compares left and right 
 * to find the smallest value before sorting.
 * @param {Array} array - input array
 * @returns sorted
 */
function mergesort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midPoint = Math.floor(array.length / 2);
    let leftArray = array.slice(0, midPoint);
    let rightArray = array.slice(midPoint, array.length);

    leftArray = mergesort(leftArray);
    rightArray = mergesort(rightArray);

    return merge(leftArray, rightArray);
};

/**
 * Helper function for mergesort
 * @param {Array} left 
 * @param {Array} right 
 * @returns 
 */
function merge(left, right) {
    let sorted = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] > right[rightIdx]) {
            sorted.push(right[rightIdx]);
            rightIdx++;
        } else {
            sorted.push(left[leftIdx]);
            leftIdx++;
        }
    }
    sorted = sorted.concat(left.slice(leftIdx, left.length))
    sorted = sorted.concat(right.slice(rightIdx, right.length))

    return sorted;
}

let n = 77;
console.log(`fibonacci (${n})`)
console.log(fib(n));

testArray = [2,5,1,3,3,5,6,8,9,0,12,20];
console.log(`Mergesort of [${testArray}] gives`)
console.log(mergesort(testArray));

console.log("This was printed recursively");