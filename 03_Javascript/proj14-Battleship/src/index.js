import homePage from "./views/home";
import { SetupController } from "./views/controller";
import { gameLogic } from "./views/logic";

const hardReset = document.querySelector(".home-reset");
const body = document.getElementById("content");

function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function renderApplication(pages) {
    if (!pages || !body) return;
    clearElement(body);
    body.appendChild(pages);
};

// Load the home page for the first time
function main () {
    renderApplication(new homePage());

    const initGame = document.querySelector(".new-game-btn");
    let startDOM;
    let setupObj;

    initGame.addEventListener("click", (e) => {
        e.preventDefault();
        // Setup the game by placing your ships. AI locations are random
        setupObj = new SetupController();
        renderApplication(setupObj.body);
        startDOM = document.querySelector(".start-game-btn");

        // Begin game after ship placement
        startDOM.addEventListener("click", (e)=>{
            e.preventDefault();
            gameLogic(setupObj.p1,setupObj.pAI)});
    })
}

main();

hardReset.addEventListener("click", (e) => {
    e.preventDefault();
    main();
});