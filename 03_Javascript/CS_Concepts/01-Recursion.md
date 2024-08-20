### Recursion
Recursion algorithms are algorithms that call themselves. In the simplest description, they can be regarded as `loops`. When implemented with a `for` or `while` loop, a *break* statement/condition is required which is included at the top of recursive functions.
- An example of calculating the power of a number
    ```JS
    // For loop with break condition "n"
    function pow(x, n) {
        let result = 1;

        // multiply result by x n times in the loop
        for (let i = 0; i < n; i++) {
            result *= x;
        }

        return result;
    };

    // Recursive implementation with if-else break statement
    function pow(x, n) {
        if (n == 1) {
            return x;
        } else {
            return x * pow(x, n - 1);
        }
    };

    // Recursive implementation with ternary operator "?"
    function pow(x, n) {
        return (n == 1) ? x : (x * pow(x, n - 1));
    };
    ```
    The recursive implementation can be designed to be generally shorter than loop implementation.

#### Recursion Depth
The maximal number of nested calls (including the first one) is called *recursion depth*. This can also be envisaged like the longest length of the for/while loop. In the example above, it will be exactly `n` i.e. the maximum power value e.g. `pow(5, 2)`. The recursion depth is 2. The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000, some engines allow more, but 100000 is probably out of limit for the majority of them.
