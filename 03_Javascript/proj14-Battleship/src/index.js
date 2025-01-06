import Ship from "./models/ships"
import GameBoard from "./models/board"
import Player from "./models/player"
import homePage from "./views/home";
import { GameController } from "./views/controller";

const hardReset = document.querySelector(".home-reset");
const body = document.getElementById("content");


function loadcomponent(pages) {
    body.innerHTML = ""
    body.appendChild(pages);
};

// Load the home page for the first time
const loadHome = new homePage();
loadcomponent(loadHome);

hardReset.addEventListener("click", (e) => {
    e.preventDefault();
    loadcomponent(loadHome);
});

const initGame = document.querySelector(".new-game-btn");
initGame.addEventListener("click", (e) => {
    e.preventDefault();
    loadcomponent(new GameController());
});


// const resetGame = document.querySelector(".reset-game");
// resetGame.addEventListener("click", (e) => {
//     e.preventDefault();
//     loadcomponent(loadHome);
// });