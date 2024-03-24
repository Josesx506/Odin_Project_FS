const clearAllTrigger = document.querySelector(".clear-all")
const deleteTrigger = document.querySelector(".delete")
const topScreen = document.querySelector(".top-screen")
const bottomScreen = document.querySelector(".bottom-screen")
const equalsTrigger = document.querySelector(".equal-to")

// Length of input characters
const maxLen = 7;

// Equivalent of jQuery $document.ready()
document.addEventListener("DOMContentLoaded", function() {
    calculator()
});


function calculator() {

    equalsTrigger.addEventListener("click", completeOperation)

    deleteTrigger.addEventListener("click", backspace)

    clearAllTrigger.addEventListener("click", clearScreen)

    // Listen for button clicks across all buttons
    let inputButtons = document.querySelectorAll(".inp-btn");
    inputButtons.forEach(function(item) {
        item.addEventListener("click", processInput);
    });
}

function processInput(event) {
    let activeElement = event.target;
    let elementClasses = activeElement.classList;
    let bottomScreenText = bottomScreen.textContent;

    // Add numbers to screen
    if (bottomScreenText.length < maxLen) {
        if (elementClasses.contains("numbers")) {
            if (bottomScreenText === "0") {
                bottomScreen.textContent = activeElement.textContent;
            } else if (bottomScreenText !== "0") {
                bottomScreen.textContent = bottomScreenText + activeElement.textContent;
            } 
        }

        // Adjust input for decimal input
        if (elementClasses.contains("decimal") && !bottomScreenText.includes(".")) {
            bottomScreen.textContent = bottomScreenText + activeElement.textContent;
        }

        // Adjust input for negative sign
        if (elementClasses.contains("plus-minus") && !bottomScreenText.includes("-")) {
            if (bottomScreenText !== "0"){
                bottomScreen.textContent = "-" + bottomScreenText;
            }
        }

        if (elementClasses.contains("power")) {
            let firstNum = "";
            let sign = activeElement.textContent;
            let secondNum = bottomScreen.textContent;
            let result = operate(firstNum, secondNum, sign);
            if (result !== undefined) {
                bottomScreen.textContent = result;
            }
        }
    }

    

    // Adjust operators
    if (elementClasses.contains("operator") && !elementClasses.contains("power")) {
        let topScreenText = topScreen.textContent;
        let activeElement = event.target;

        if (topScreenText === "") {
            topScreen.textContent = bottomScreenText + " " + activeElement.textContent;
            bottomScreen.textContent = 0
        } else if (topScreenText !== "" && bottomScreen.textContent === "0") {
            // Update only the symbol if the bottom number is not changed
            topScreen.textContent = topScreenText.slice(0,-2) + " " + activeElement.textContent;
        } else {
            let splitText = topScreen.textContent.split(" ");
            let firstNum = splitText[0];
            let sign = splitText[1];
            let secondNum = bottomScreen.textContent;
            let result = operate(firstNum, secondNum, sign);
            // Update the screen
            if (result !== undefined) {
                topScreen.textContent = result + " " + activeElement.textContent;
                bottomScreen.textContent = 0;
            }
        }
    }

    // Clear screen listener
    if (bottomScreen.textContent === "0" || bottomScreen.textContent.includes("...")) {
        clearAllTrigger.textContent = "AC";
    } else if (bottomScreen.textContent !== "0") {
        clearAllTrigger.textContent = "C";
    }
}




function operate(num1, num2, symbol) {
    if (num1) {
        num1 = parseFloat(num1);
    }
    if (num2) {
        num2 = parseFloat(num2);
    }

    let solution;

    switch (symbol) {
        case "+":
            solution = add(num1, num2);
            break;
        case "-":
            solution = subtract(num1, num2);
            break;
        case "÷":
            solution = divide(num1, num2);
            break;
        case "x":
            solution = multiply(num1, num2);
            break;
        case "x2":
            solution = Math.pow(num2, 2);
            break;
    }
    let round = Math.round(solution * 1000) / 1000;
    round = round.toString()

    if (round.length < maxLen) {
        return round;
    } else {
        bottomScreen.textContent = round.slice(0,5) + "...";
        topScreen.textContent = "Max. Limit. Reset!!!!"
        clearAllTrigger.textContent = "AC";
        freezeScreen()
        clearAllTrigger.disabled = false;
        clearAllTrigger.style.backgroundColor = "red";
        clearAllTrigger.style.color = "white";
    }
}

// Operators implementation
const add = function(num1, num2) {
    return num1 + num2;
};

const subtract = function(num1, num2) {
    return num1 - num2;
};

const multiply = function(num1, num2) {
    return num1 * num2;
};

const divide = function(num1, num2) {
    if (num2 === 0) {
        alert("Zero Division Error\nEnter a non-zero value")
    } else {
        return num1 / num2;
    }
};

function completeOperation(event) {
    let topScreenText = topScreen.textContent;
    if (topScreenText === "") {
        alert("Incomplete operation\nEnter a second value")
    } else {
        let splitText = topScreen.textContent.split(" ");
        let firstNum = splitText[0];
        let sign = splitText[1];
        let secondNum = bottomScreen.textContent;
        let result = operate(firstNum, secondNum, sign);
        // Update the screen
        if (result !== undefined) {
            topScreen.textContent =  "";
            bottomScreen.textContent = result;
        }
    }
}


function backspace(event) {
    // Remove the last character - backspace
    let bottomScreenText = bottomScreen.textContent;

    if (bottomScreenText.length <= 1 || bottomScreenText === "") {
        bottomScreen.textContent = 0;
    } else if (bottomScreenText !== "0" && bottomScreenText.length > 1) {
        bottomScreen.textContent = bottomScreenText.slice(0,-1);
    }
}


function clearScreen(event) {
    // Clear the screen
    let activeElement = event.target;

    if (activeElement.textContent === "C") {
        bottomScreen.textContent = 0;
    } else if(activeElement.textContent === "AC") {
        unfreezeScreen()
        topScreen.textContent = "";
        bottomScreen.textContent = 0;
    } 
}


function freezeScreen() {
    // Listen for button clicks across all buttons
    let inputButtons = document.querySelectorAll(".inp-btn");
    inputButtons.forEach(function(item) {
        item.disabled = true;
    });
}

function unfreezeScreen() {
    clearAllTrigger.style.backgroundColor = "#f0f0f0";
    clearAllTrigger.style.color = "black";
    // Listen for button clicks across all buttons
    let inputButtons = document.querySelectorAll(".inp-btn");
    inputButtons.forEach(function(item) {
        item.disabled = false;
    });
}