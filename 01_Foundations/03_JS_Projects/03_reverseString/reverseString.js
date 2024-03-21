const reverseString = function(inputString) {
    if (inputString.length === 0) {
        return ""
    } else {
        let firstChar = inputString[0]
        let remainingChar = inputString.slice(1,)
        return reverseString(remainingChar) + firstChar
    }
};

// Do not edit below this line
module.exports = reverseString;
