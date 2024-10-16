
Algorithms are a set of instructions with which to solve problems. Pseudo-code is an english-like way to describe an algorithm.

Algorithm Complexity
- Big O - Worst case scenario
- Big Omega $\Omega$ - Best case scenario
- Big Theta $\theta$ - Average case scenario

### Big O notation
The Big O Notations in the order of speed from fastest to slowest are:
- O(1) - Constant Complexity
- O(log N) - Logarithmic Complexity - A logarithm is the power to which a number (the base) must be raised in order to get some other number $log_2 16 = 2^4$, so it'll take
four steps to complete an operation instead of 16. Algorithms with logarithmic time are often “divide and conquer” style, meaning the data set is cut down/reduced upon each 
loop iteration.  e.g. *Binary Search*
- O(N) - Linear Complexity
- O(N log N) - N x log N Complexity - This notation usually implies we have an algorithm which initially is `O(log N)` such as our example earlier of Binary Search where it repeatedly 
breaks an array in half, but with `O(N log N)` each of those array halves is processed by another algorithm with a complexity of O(N). An example is *Merge Sort*
- O(n²) - Quadratic Complexity - 2 nested loops
- O(n³) - Cubic Complexity - 3 nested loops
- O(2ⁿ) - Exponential Complexity
- O(N!) - Factorial Complexity

The `%timeit` equivalent for JS is
```JS
const t0 = performance.now()
// Add function here...
const t1 = performance.now()
console.log("The function took: " + (t1 - t0) + " milliseconds.")
```

**Space complexity** has the same Big O notations like time complexity above. Much more difficult to quantify, it's especially useful during refactoring.