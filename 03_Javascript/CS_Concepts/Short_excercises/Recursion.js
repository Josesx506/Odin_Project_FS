function sumTo(n) {
    if (n <= 0) {
        return n
    }
    else if (n === 1) {
        return 1
    } else {
        return n + sumTo(n - 1)
    };
};

function sumTo(n) {
    // Arithmetic Progression - faster than recursive implementation
    if (n <= 0) {
        return n
    } else {
    return n * (n + 1) / 2
    };
}

function factorial(n) {
    if (n <= 0) {
        return 0
    }
    else if (n === 1) {
        return 1
    } else {
        return n * factorial(n - 1)
    };
}

function factorial(n) {
    // Recursive implementation with ternary operator
    return (n != 1) ? n * factorial(n - 1) : 1;
};

function fib(n) {
    if ( n <=2 ) {
        return 1
    } else {
        return fib(n-1) + fib(n-2)
    }
}

function fib(n, res = [0, 1, 1]) {
    // fibonacci with memoization to store previous results and make it faster
    if (res[n]) {
        return res[n];
    }

    res[n] = fib(n - 1, res) + fib(n - 2, res);
    return res[n];
}


let linkedList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
};

function printLL(list) {
    console.log(list.value);
    if (list.next) {
        return printLL(list.next);
    }
}

function collatz(n) {
    if (n === 1) {
        console.log(n);
        return 1;
    } else if (n % 2 === 0) {
        console.log(n);
        return collatz(n/2)
    } else {
        console.log(n);
        return collatz((3*n)+1);
    }
}

function count_partitions(n, m) {
    // problem definition https://www.youtube.com/watch?v=ngCos392W4w
    if (n === 0) {
        return 1;
    } else if (m===0 || n<0) {
        return 0;
    } else {
        return count_partitions(n-m,m) + count_partitions(n, m-1)
    }
}

console.log(sumTo(-3));
console.log(factorial(4));
console.log(fib(77));
console.log(count_partitions(5,3));
printLL(linkedList);
collatz(50);