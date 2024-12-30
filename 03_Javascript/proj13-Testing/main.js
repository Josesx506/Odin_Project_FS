function capitalize(string) {
    let cap = string.charAt(0).toUpperCase() + string.slice(1);
    return cap;
};

function reverseString(string) {
    if (string.length === 0) {
        return ""
    }
    let pre = string.charAt(0);
    return reverseString(string.slice(1)) + pre;
};

function calculator(a,b,operation) {
    switch (operation) {
        case "add":
            result = a + b;
            break
        case "subtract":
            result = a - b;
            break
        case "multiply":
            result = a * b;
            break
        case "divide":
            if (b===0){
                throw new Error("zero division not allowed");
            }
            result = a / b;
            break
        default:
            result = "incorrect operation";
    }
    return result;
}


function caesarCipher(string, sf) {
    let alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let enc = "";

    string.split('').forEach((element) => {
        if (alphabets.includes(element.toLowerCase())) {
            let idx = alphabets.indexOf(element.toLowerCase());
            idx = (idx + sf) % 26;
            if (element === element.toUpperCase()) {
                enc += alphabets[idx].toUpperCase();
            } else {
                enc += alphabets[idx];
            }     
        } else {enc += element};
    });
    
    return enc;
}

function analyzeArray(array) {
    if (array.length===0) {
        throw new Error("Array is empty.")
    }
    let sum = array.reduce((prev,curr) => prev+curr,0);
    let avg = Math.round(sum / array.length);

    let res = {
        average: avg,
        min: Math.min(...array),
        max: Math.max(...array),
        length: array.length
    }
    return res;
}

module.exports = { capitalize,reverseString,calculator,caesarCipher,analyzeArray };