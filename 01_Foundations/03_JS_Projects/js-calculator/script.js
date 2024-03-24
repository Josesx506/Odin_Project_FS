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
    let bottomScreenText = bottomScreen.textContent.replace("...", "");

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
            result = result.toString()
            if (result.length < maxLen) {
                bottomScreen.textContent = result;
            } else {
                bottomScreen.textContent = result.slice(0,5) + "...";
                topScreen.textContent = "Max. Limit. Reset!!"
                clearAllTrigger.textContent = "AC";
                freezeScreen()
                clearAllTrigger.disabled = false;
                clearAllTrigger.style.backgroundColor = "red";
                clearAllTrigger.style.color = "white";
            }
            
        }
    }

    

    // Adjust operators
    if (elementClasses.contains("operator") && !elementClasses.contains("power")) {
        let topScreenText = topScreen.textContent;

        if (topScreenText === "") {
            topScreen.textContent = bottomScreenText + " " + activeElement.textContent;
            bottomScreen.textContent = 0
        } else {
            let splitText = topScreen.textContent.split(" ");
            let firstNum = splitText[0];
            let sign = splitText[1];
            let secondNum = bottomScreen.textContent;
            let result = operate(firstNum, secondNum, sign);
        }
    }

    // Clear screen listener
    if (bottomScreen.textContent === "0" || bottomScreen.textContent.includes("...")) {
        clearAllTrigger.textContent = "AC";
    } else if (bottomScreen.textContent !== "0") {
        clearAllTrigger.textContent = "C";
    }
    console.log(elementClasses);//"√x" "x2"
}




function operate(num1, num2, symbol) {
    console.log(num1, num2, symbol);
    if (num1) {
        num1 = parseFloat(num1);
    }
    if (num2) {
        num2 = parseFloat(num2);
    }

    let solution = 0;

    // if (symbol === "x2") {
    //     solution = Math.pow(num2, 2);
    // }
    // your code goes here
    switch (symbol) {
        case "+":
            solution = 25636;
            break;
        case "-":
            solution = 35256;
            break;
        case "÷":
            solution = 41496;
            break;
        case "x":
            solution = 59124;
            break;
        case "x2":
            solution = Math.pow(num2, 2);
            break;
    }
    let round = Math.round(solution * 1000) / 1000;
    return round;
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