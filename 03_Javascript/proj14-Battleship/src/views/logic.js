import { AIController } from "../models/aiPlayer";
import PubSub from 'pubsub-js';

function gameLogic(p1, pAI) {
    let shipPlaceholder = document.querySelector(".ships-placeholder");
    let p1Board = document.querySelector(".btshp-grid-cntr.p1");
    let pAIBoard = document.querySelector(".btshp-grid-cntr.ai");
    let resetGame = document.querySelector(".start-game-btn button");
    let msgInfo = document.querySelector(".msg-board");
    let hardReset = document.querySelector(".home-reset");

    pAI.active = true;
    let aiMoves = new AIController(p1.board);
    let gameOver = false;

    function removeAllBoardListeners() {
        p1Board.childNodes.forEach(grid => {
            grid.removeEventListener("click", handleP1Click);
            grid.removeEventListener("click", handlePAIClick);
        });
        pAIBoard.childNodes.forEach(grid => {
            grid.removeEventListener("click", handleP1Click);
            grid.removeEventListener("click", handlePAIClick);
        });
    }

    function handleP1Click(e) {
        if (p1.active && !gameOver) {
            handleClick(e, pAI, msgInfo, p1, switchTurns);
        }
    }

    function handlePAIClick(e) {
        if (pAI.active && !gameOver) {
            handleClick(e, p1, msgInfo, pAI, switchTurns);
        }
    }

    function updateMessageBoard(message) {
        if (!gameOver) {
            msgInfo.textContent = message;
        }
    }

    function endGame(winner) {
        gameOver = true;
        msgInfo.innerHTML = `Game Over! ${winner.toUpperCase()} wins!`;
        msgInfo.innerHTML += `<br>Click top right to reset game.`
        document.querySelectorAll(".grid-cell").forEach(cell => {
            cell.classList.add("disabled");
        });
        p1Board.classList.add("inactive-board");
        pAIBoard.classList.add("inactive-board");
    }

    function handleAITurn() {
        if (gameOver) return;

        const [x, y, result, shipName] = aiMoves.makeMove();
        let targetCell = p1Board.querySelector(`[data-row="${x}"][data-column="${y}"]`);
        let cellToUpdate = targetCell;

        if (targetCell.childNodes.length > 0) {
            targetCell.classList.add("disabled");
            cellToUpdate = targetCell.firstChild.firstChild;
        }
        
        switch (result) {
            case "Miss":
                cellToUpdate.classList.add("miss-shot");
                updateMessageBoard(`AI's shot missed`);
                break;
            case "Hit":
                cellToUpdate.classList.add("hit-shot");
                updateMessageBoard(`AI hit P1's ${shipName}`);
                break;
            case "Sunk":
                cellToUpdate.classList.add("hit-shot");
                updateMessageBoard(`AI sunk P1's ${shipName}`);
                break;
        }
        cellToUpdate.classList.add("disabled");

        if (p1.board.allShipsSunk()) {
            endGame("AI");
            return;
        }

        setTimeout(() => {
            if (!gameOver) switchTurns();
        }, 1000);
    }

    function switchTurns() {
        if (gameOver) return;

        removeAllBoardListeners();
        
        p1.active = !p1.active;
        pAI.active = !pAI.active;

        if (p1.active) {
            updateMessageBoard("P1's turn");
            pAIBoard.childNodes.forEach(grid => {
                if (!grid.classList.contains("disabled")) {
                    grid.addEventListener("click", handleP1Click);
                }
            });
            p1Board.classList.add("inactive-board");
            pAIBoard.classList.remove("inactive-board");
        } else {
            updateMessageBoard("AI's turn");
            pAIBoard.classList.add("inactive-board");
            p1Board.classList.remove("inactive-board");
            handleAITurn();
        }
    }

    switchTurns();
    // if (shipPlaceholder.children.length === 0 && resetGame.classList.contains("reset-game")) { 
        
    // }

    resetGame.addEventListener("click", (e) => {
        e.preventDefault();
        hardReset.click();
    })
}

function handleClick(e, player, msg, opp, switchTurns) {
    e.preventDefault();

    if (!player.board.allShipsSunk()) {
        let curGrid;
        if (e.target.classList.contains("grid-cell")) {
            curGrid = e.target;
        } else {
            curGrid = e.target.parentElement.parentElement;
        }
        
        let [gx, gy] = [parseInt(curGrid.dataset.row), parseInt(curGrid.dataset.column)];
        let gCell = player.board.board[gx][gy];
        let action = player.board.receiveAttack(gx, gy);
        
        switch (action) {
            case "Miss":
                e.target.classList.add("miss-shot");
                msg.textContent = `${opp.id.toUpperCase()}'s shot missed`;
                break;
            case "Hit":
                e.target.classList.add("hit-shot");
                msg.textContent = `${opp.id.toUpperCase()} hit ${player.id.toUpperCase()}'s ${gCell.name}`;
                break;
            case "Sunk":
                e.target.classList.add("hit-shot");
                msg.textContent = `${opp.id.toUpperCase()} sunk ${player.id.toUpperCase()}'s ${gCell.name}`;
                break;
        }
        e.target.classList.add("disabled");
        
        if (player.board.allShipsSunk()) {
            msg.textContent = `Game Over! ${opp.id.toUpperCase()} wins!`;
            document.querySelectorAll(".grid-cell").forEach(cell => {
                cell.classList.add("disabled");
            });
            return;
        }
        
        // switchTurns();

        setTimeout(() => {
            switchTurns();
        }, 1000);
    }
}

export { gameLogic };