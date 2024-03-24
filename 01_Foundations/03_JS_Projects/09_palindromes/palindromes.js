function removePunctuation(text) {
    return text.replace(/[^\w\s]|_/g, '');
};

function reverseString(text) {
    if (text.length === 0) {
        return ""
    } else {
        let firstString = text[0];
        let remainingString = text.slice(1,);
        return reverseString(remainingString) + firstString
    }
};

const palindromes = function (text) {
    // Make the letters consistently lower or upper case
    let lower = text.toLowerCase();
    // Remove all punctuations
    lower = removePunctuation(lower);
    // Replace all whitespaces
    lower = lower.replace(/\s/g, "");
    // Reverse the string and compare the original and reversed
    let reversed = reverseString(lower);
    return (lower === reversed);
};


// Do not edit below this line
module.exports = palindromes;
