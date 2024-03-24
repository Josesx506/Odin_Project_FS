const fibonacci = function(num) {
    num = parseInt(num); // Convert strings to int
    if (num < 0) {
        return "OOPS";
    } else if (num === 0) {
        return 0
    } else if (num > 0 && num <3) {
        return 1
    } else {
        return fibonacci(num-1) + fibonacci(num-2)
    }
};

// Do not edit below this line
module.exports = fibonacci;
