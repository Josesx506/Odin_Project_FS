class Node {
    constructor(loc,parent=null){
        this.data = loc;
        this.repr = `${loc[0]},${loc[1]}`;  // string representation for `visited` set
        this.parent = parent;               // Parent node for path reconstruction
    }
}

class Knight {
    constructor(loc,totCells=8){
        this.startPos = new Node(loc);
        this.totVtx = totCells-1;
    }

    /**
     * Basic move of a chess knight is two steps forward and one step 
     * to the side or one step forward and two steps to the side. It 
     * can face any direction.
     * @param {Array} loc 
     * @returns {Array}
     */
    validMoves(loc) {
        let moves = [];
        moves.push([loc[0]+1, loc[1]-2]);
        moves.push([loc[0]+1, loc[1]+2]);
        moves.push([loc[0]-1, loc[1]-2]);
        moves.push([loc[0]-1, loc[1]+2]);
        moves.push([loc[0]+2, loc[1]-1]);
        moves.push([loc[0]+2, loc[1]+1]);
        moves.push([loc[0]-2, loc[1]-1]);
        moves.push([loc[0]-2, loc[1]+1]);

        // Filter the moves list to ensure all locations remain on the chessboard
        moves = moves.filter(move => {
            return (move[0]>=0) && (move[0]<=this.totVtx) && (move[1]>=0) && (move[1]<=this.totVtx);
        })
        return moves;
    };

    // Document all the moves from a start to end vertex using a queue and visit set.
    knightMoves(endPos, start=this.startPos) {
        let queue = [];
        let visited= new Set();    // Set data sturcture to ensure visited nodes are not repeated since graph is undirected

        queue.push(start);

        while (queue.length>0) {
            // Dequeue node
            let actNode = queue.shift();
            visited.add(actNode.repr);   // Add the string representation of the grid location to the set

            // Process Node
            if (actNode.data[0]===endPos[0] && actNode.data[1]===endPos[1]) {
                return this.constructPath(actNode);
            }

            // Add Neighbors
            for (let neighborLoc of this.validMoves(actNode.data)) {
                let neighborNode = new Node(neighborLoc, actNode);

                // skip revisiting vertex if vertex has been visited
                if (!visited.has(neighborNode.repr)) {
                    queue.push(neighborNode);
                };
            };
        }
    }

    // Reconstruct path from endnode to parent and estimate shortest path
    constructPath(endNode) {
        const path = [];
        let current = endNode;

        // Trace back from the end node to the start node
        while (current !== null) {
            path.unshift(current.data); // Prepend to reconstruct the path in correct order
            current = current.parent;
        }

        return { totalMoves: path.length - 1, steps: path };
    }
};

/* The Board will be the game background */
function Gameboard() {
    const rows = 8;
    const columns = rows;
    const board = [];

    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
          board[i] = [];
          for (let j = 0; j < columns; j++) {
            board[i].push("");
          }
        };
    }

    initializeBoard();
  
    // This will be the method of getting the entire board that our UI will eventually need to render it.
    const getBoard = () => board;

    return { getBoard, initializeBoard};
}


const ScreenController = (function () {
    // Cache DOM
    const gameView = document.querySelector(".board");
    const msgView = document.querySelector(".message-board");
    const resetBtn = document.querySelector(".reset-btn");

    // Store the last traversal path
    let lastTraversal = null;

    const game = Gameboard();
    var ktnBtn = document.createElement("img");
    ktnBtn.src = "knight.png";
    ktnBtn.classList.add("knight-key","inactive");

    function formatResetBtn() {
        resetBtn.textContent = "Reset Knight";
        resetBtn.style.color = "lightgreen";
        resetBtn.style.backgroundColor = "white";
    };

    function resetViews() {
        msgView.innerHTML = `Click on the knight to initialize movement. <br>Once active click on any cell to travail`;
        resetBtn.textContent = "Reset Knight";
        resetBtn.style.color = "white";
        resetBtn.style.backgroundColor = "lightgray";
    };

    const updateScreen = (game,grdRow=3,grdCol=3) => {
        // clear the board
        gameView.textContent = "";
        resetBtn.disabled = false;

        // get the newest version of the board
        const board = game.getBoard();

        // Render board squares
        board.forEach((rowCell, rowIndex) => {
            rowCell.forEach((colCell, colIndex) => {
            // Anything clickable should be a button!!
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            // Create a data attribute to identify the column. This makes it easier to pass into our `populateMoves` function 
            cellButton.dataset.row = rowIndex
            cellButton.dataset.column = colIndex
            cellButton.textContent = "";
            gameView.appendChild(cellButton);
            })
        });

        let actvVertex = document.querySelector(`.board button[data-row="${grdRow}"][data-column="${grdCol}"]`);
        actvVertex.appendChild(ktnBtn);

        ktnBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (ktnBtn.classList.contains("inactive")) {
                ktnBtn.classList.remove("inactive");
                ktnBtn.classList.add("active");
                msgView.innerHTML = "Active Knight"
                msgView.style.color = "green";
            } else {
                ktnBtn.classList.remove("active");
                ktnBtn.classList.add("inactive");
                msgView.innerHTML = "Inactive! Click knight to travail again."
                msgView.style.color = "black";
            }
        }); 
    };

    // Add event listener for the board
    function clickHandlerBoard(e, game) {;
        let ktnBkg = document.querySelector(".knight-key");
        ktnBkg = ktnBkg.closest("button");
        let ktnRow = ktnBkg.dataset.row;
        let ktnCol = ktnBkg.dataset.column;
        [ktnRow,ktnCol] = [parseInt(ktnRow),parseInt(ktnCol)];

        const selRow = e.target.dataset.row;
        const selCol = e.target.dataset.column;
        // Make sure I've clicked a column and not the gaps in between
        if (e.target.disabled || (!selRow && !selCol)) return;

        // Calculate the path the knight has to travail
        if (ktnBtn.classList.contains("active") && selRow && selCol && (ktnRow!==selRow) && (ktnCol!==selCol)){
            let [intRow, intColumn] = [parseInt(selRow),parseInt(selCol)];

            let kt = new Knight([ktnRow,ktnCol]);          // Initialize knight with start cell
            lastTraversal = kt.knightMoves([intRow, intColumn])  // Return total moves to end cell. Use var instead of let to expand func 

            // Message board
            msgView.innerHTML = `Moved knight from [${ktnRow},${ktnCol}] to [${selRow},${selCol}] in ${lastTraversal.totalMoves} moves` + 
            "<br>Check console for edge list or click any cell to clear path.";
            msgView.style.color = "black";


            actvVertex = document.querySelector(`.board button[data-row="${selRow}"][data-column="${selCol}"]`);
            actvVertex.appendChild(ktnBtn);
            
            console.log(`Traversed path:\n${JSON.stringify(lastTraversal.steps).replace(/],\[/g, "]\n[")}`);

            if (ktnBtn.classList.contains("active")) {
                ktnBtn.classList.remove("active");
                ktnBtn.classList.add("inactive");
            };

            formatResetBtn();
            updateScreen(game,selRow,selCol);

            lastTraversal["steps"].forEach((loc,idx) => {
                let pathVertex = document.querySelector(`.cell[data-row="${loc[0]}"][data-column="${loc[1]}"]`);
                if ((idx!==lastTraversal["steps"].length-1)) {
                    pathVertex.textContent = idx;
                }
            });
        } else {
            updateScreen(game,ktnRow,ktnCol);
            lastTraversal = null;
        }; 
    }

    const onScreenGame = (e) => {
        resetBtn.addEventListener("click", (e) => {
            game.initializeBoard();
            updateScreen(game);
            formatResetBtn();
            resetViews();
            resetBtn.disabled = true;
        });
    };

    // Initialize the event listeners
    gameView.addEventListener("click", (e) => {
        clickHandlerBoard(e, game);
    });

    updateScreen(game);
    
    resetBtn.addEventListener("click", onScreenGame);

}) ();

// Call Module
ScreenController;