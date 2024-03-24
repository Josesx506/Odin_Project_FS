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
        item.addEventListener("click", operate);
    });
}

function operate(event) {
    let activeElement = event.target;
    let elementClasses = activeElement.classList;
    let topScreenText = topScreen.textContent;
    let bottomScreenText = bottomScreen.textContent;

    // Add numbers to screen
    if (elementClasses.contains("numbers")) {
        if (bottomScreenText === "0") {
            bottomScreen.textContent = activeElement.textContent;
        } else if (bottomScreenText !== "0" && bottomScreenText.length < maxLen) {
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

    // Adjust operators
    if (elementClasses.contains("special")) {
        console.log(activeElement.textContent);
    }

    // Clear screen listener
    if (bottomScreen.textContent === "0") {
        clearAllTrigger.textContent = "AC";
    } else if (bottomScreen.textContent !== "0") {
        clearAllTrigger.textContent = "C";
    }
    console.log(topScreenText);//"√x" "x2"
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
        topScreen.textContent = "";
        bottomScreen.textContent = 0;
    } 
}