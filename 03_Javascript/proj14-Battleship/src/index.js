import homePage from "./views/home";
import { SetupController } from "./views/controller";
import { gameLogic } from "./views/logic";
import PubSub from "pubsub-js";

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
renderApplication(new homePage());

const initGame = document.querySelector(".new-game-btn");
initGame.addEventListener("click", (e) => {
    e.preventDefault();
    // Setup the game by placing your ships. AI locations are random
    let setupObj = new SetupController();
    renderApplication(setupObj.body);

    // Begin game after ship placement
    PubSub.subscribe("GAME_STARTED", () => {
        gameLogic(setupObj.p1,setupObj.pAI)});
});

PubSub.subscribe("GAME_PROGRESS", (msg, resetBtn) => {
    console.log(msg);
    console.log(resetBtn);
    resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        renderApplication(new homePage());
    });
});

PubSub.subscribe("GAME_ENDED", (msg, resetBtn) => {
    resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        renderApplication(new homePage());
    });
});

hardReset.addEventListener("click", (e) => {
    e.preventDefault();
    renderApplication(new homePage());
});