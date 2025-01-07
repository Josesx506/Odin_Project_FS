import { Player } from "../models/player";
import { randomShipPositioning } from "./aiShips";
import PubSub from 'pubsub-js';

let loadGameCss = false;

function createPlayerBoard (id) {
    const element = document.createElement("div");

    const newPlayer = new Player();
    newPlayer.id = id;
    const playBoard = newPlayer.board;

    const boardView = document.createElement("div");
    boardView.classList.add("btshp-grid-cntr",id);

    let legend = document.createElement("legend");
    legend.textContent = `${id.toUpperCase()}-Board`;

    playBoard.board.forEach((rowCell,rowIdx) => {
        rowCell.forEach((colCell,colIdx) => {
            let cellBtn = document.createElement("div");
            cellBtn.classList.add("grid-cell");
            if (id !== "ai") {
                cellBtn.classList.add("droppable");
            }
            cellBtn.dataset.row = rowIdx;
            cellBtn.dataset.column = colIdx;
            boardView.appendChild(cellBtn);
        })
    });

    element.appendChild(legend);
    element.appendChild(boardView);

    return [element, newPlayer];
}

function createShips(shipName,shipSize) {
    const element = document.createElement("div");
    element.classList.add("ship",`${shipName}-cntr`,"draggable-source");
    element.dataset.size = shipSize;
    element.draggable = true;

    for (let i=0; i<shipSize; i++){
        const inset = document.createElement("div");
        inset.classList.add(`${shipName}-${i}`);
        element.appendChild(inset)
    };

    return element;
}

function createShipContainer () {
    const shipCntr = document.createElement("div");
    shipCntr.classList.add("ships-placeholder");

    let carrier = createShips("carrier",5);
    let battleship = createShips("battleship",4);
    let cruiser = createShips("cruiser",3);
    let submarine = createShips("submarine",3);
    let destroyer = createShips("destroyer",2);

    shipCntr.appendChild(carrier);
    shipCntr.appendChild(battleship);
    shipCntr.appendChild(cruiser);
    shipCntr.appendChild(submarine);
    shipCntr.appendChild(destroyer);

    return shipCntr;
}

function createMessageBoard () {
    const element = document.createElement("div");
    element.classList.add("msg-board");
    element.innerHTML = "Drag and drop player ships to board. Click on first cell <br>"
    element.innerHTML += "to rotate ship. Invalid drops/rotations are disallowed."

    return element;
}


function dragPlayerShips(player) {
    let draggedShip;
    let shipPlaceholder = document.querySelector(".ships-placeholder");

    function rotateShip(e) {
        e.preventDefault();
        let activeShip = e.target.parentElement;
        let curGrid = activeShip.parentElement;
    
        if (activeShip.classList.contains("ship") && activeShip.classList.contains("draggable-source")) {
            if (curGrid.classList.contains("grid-cell")) {
                let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];
                let shipSize = parseInt(activeShip.dataset.size);
                let currOrientation = activeShip.classList.contains("vertical") ? "ver" : "hor";
                let newOrientation = currOrientation==="ver" ? "hor" : "ver";
                
                if ((newOrientation==="hor" && player.board.canPlaceShip(gridX,gridY+1,shipSize,newOrientation)) || 
                    (newOrientation==="ver" && player.board.canPlaceShip(gridX+1,gridY,shipSize,newOrientation))
                ) {
                    e.target.parentElement.classList.toggle("vertical");
    
                    player.board.removeShip(gridX,gridY,shipSize,currOrientation);
                    let shipName = activeShip.classList[1].replace("-cntr","");
                    player.board.placeShip(gridX,gridY,shipSize,newOrientation,shipName);
                    // console.log(player.board.printBoard());
                    activeShip.style.margin = 0;
                }
                
            } else {
                e.target.parentElement.classList.toggle("vertical");
            }
    }};

    function dragStart(e) {
        draggedShip = e.target;
        let curGrid = draggedShip.parentElement;
        if (curGrid.classList.contains("grid-cell")) {
            let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];
            let shipSize = parseInt(draggedShip.dataset.size);
            let shipOrientation = draggedShip.classList.contains("vertical") ? "ver" : "hor";
            player.board.removeShip(gridX,gridY,shipSize,shipOrientation);
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }
    
    function dropShip(e) {
        e.preventDefault();
        let curGrid = e.target;
        let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];
        let shipSize = parseInt(draggedShip.dataset.size);
        let shipOrientation = draggedShip.classList.contains("vertical") ? "ver" : "hor";

        if (player.board.canPlaceShip(gridX,gridY,shipSize,shipOrientation)) {
            let shipName = draggedShip.classList[1].replace("-cntr","");
            player.board.placeShip(gridX,gridY,shipSize,shipOrientation,shipName);
            // console.log(player.board.printBoard());

            if (draggedShip.parentElement) {
                draggedShip.parentElement.removeChild(draggedShip);
            }
    
            // Append ship to the target cell
            curGrid.appendChild(draggedShip);
            
            draggedShip.style.margin = 0;
        }
        triggerStart(shipPlaceholder,allShips);
    }

    const allShips = document.querySelectorAll(".ship.draggable-source");

    allShips.forEach((activeShip) => {
        activeShip.addEventListener("dragstart", dragStart)
        activeShip.addEventListener("click", rotateShip);
    });

    const playerGrids = document.querySelectorAll(".grid-cell.droppable");
    playerGrids.forEach((playerBlock) => {
        playerBlock.addEventListener("dragover", dragOver);
        playerBlock.addEventListener("drop", dropShip);
    });
}

function createStartBtn () {
    let element = document.createElement("div");
    element.classList.add("start-game-btn");

    let start = document.createElement("button");
    start.textContent = "Start Game";
    start.disabled=true;
    element.appendChild(start);

    return element;
}

function triggerStart(shipPlaceholder, shipElement) {
    let startDOM = document.querySelector(".start-game-btn button");
    let msgDOM = document.querySelector(".msg-board");
    
    if (shipPlaceholder.children.length===0) {
        startDOM.disabled=false;
        msgDOM.innerHTML = "All ships have been placed. <br>Click Start to begin."
    
        startDOM.addEventListener("click", (e) => {
            e.preventDefault();

            // Disable editing the ships
            shipElement.forEach((elm) => {
                elm.classList.remove("draggable-source");
                elm.draggable = false;
            });

            // Format the game reset button
            startDOM.textContent = "Reset Game";
            startDOM.classList.add("reset-game");
            startDOM.style.color = "white";
            startDOM.style.backgroundColor = "red";
            msgDOM.innerHTML = "Player1's turn.";
        });

    }
}


function SetupController() {    
    loadGameCss = true;
    if (loadGameCss) {
        import("../css/game.css");
    }

    const element = document.createElement("div");
    element.classList.add("game-cntr");

    const gameCntr = document.createElement("div");
    gameCntr.classList.add("boards-cntr");

    let [p1Board, p1] = createPlayerBoard("p1");
    let [pAIBoard, pAI] = createPlayerBoard("ai");

    gameCntr.appendChild(p1Board);
    gameCntr.appendChild(pAIBoard);

    // Create the container for ships
    const shipCntr = createShipContainer();

    // Create the message container
    const msgCntr = createMessageBoard();

    // Create the start button
    const startBtn = createStartBtn();

    element.appendChild(gameCntr);
    element.appendChild(shipCntr);
    element.appendChild(msgCntr);
    element.appendChild(startBtn);

    // Randomly position the AI ships
    randomShipPositioning(pAI,pAIBoard);

    // Initialize drag and drop after DOM is loaded
    setTimeout(() => {
        dragPlayerShips(p1);
    }, 0);
    

    loadGameCss = false;
    return {body: element,
        p1: p1,
        pAI: pAI
    };
}

export { SetupController };