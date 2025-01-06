import logo from "../css/noun-battleship-4933124.svg"
let loadHomeCss = false;

export default function homePage(){
    loadHomeCss = true;
    if (loadHomeCss) {
        import("../css/home.css");
    }
    
    const element = document.createElement("div");
    element.classList.add("home-page-content");

    let title = document.createElement("div");
    title.classList.add("home-title");
    title.textContent = "BATTLESHIP";

    let newGame = document.createElement("button");
    newGame.classList.add("new-game-btn");
    newGame.textContent = "New Game";

    let btsIcon = document.createElement("img");
    btsIcon.src = logo
    btsIcon.classList.add("home-battleship-icon");

    element.appendChild(title);
    element.appendChild(newGame);
    element.appendChild(btsIcon);

    loadHomeCss = false;
    return element;
};