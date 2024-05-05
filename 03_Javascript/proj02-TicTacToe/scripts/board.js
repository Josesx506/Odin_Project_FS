/* The Board will be the game background */
function Gameboard() {
    const rows = 3;
    const columns = rows;
    const board = [];

    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
          board[i] = [];
          for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
          }
        };
    }

    initializeBoard();

    const winnerDeclared = false;
    const drawDeclared = false;
  
    // This will be the method of getting the entire board that our UI will eventually need to render it.
    const getBoard = () => board;

    // Insert a token. Check if the Cell in the specified row and column is empy, else reject the move
    const dropToken = (row, column, player) => {
        const availableCells = (board[row][column].getValue() === "");
        if (!availableCells || winnerDeclared || drawDeclared) return;
        board[row][column].addToken(player);
    };

    // This method will be used to print our board to the console.
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.table(boardWithCellValues);
    };

    return { getBoard, initializeBoard, winnerDeclared, drawDeclared, dropToken, printBoard };
}


/* The Cell will be responsible for storing the player moves */
function Cell() {
    let value = "";

    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
        value = player;
    };

    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;

    return { addToken, getValue };
}

/* The GameController will be responsible for controlling the flow and state */
function GameController(playerList = [
                            {name: "Player One", 
                             token: 1},
                            {name: "Player Two", 
                             token: 2}
                        ]) {
    const board = Gameboard();

    const players = playerList;
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
    };

    /* Functions to evaluate who won or lost */
    const winGameStatus = (row,col) => {
        const boardSize = board.getBoard()[0].length;

        // Array for storing the player progress. If the value any 4 directions is equal to the board size, the player has won
        let [ rowCounts, colCounts, diagCounts, antidiagCounts ] = [0, 0, 0, 0];
        
        // Count the winning conditions on the board
        for (let i = 0; i < boardSize; i++) {
            if (board.getBoard()[i][col].getValue() === getActivePlayer().token) { rowCounts++; }
            if (board.getBoard()[row][i].getValue() === getActivePlayer().token) { colCounts++; }
            if (row === col && board.getBoard()[i][i].getValue() === getActivePlayer().token) { diagCounts++; }
            if (row + col === boardSize - 1 && board.getBoard()[i][(boardSize-1)-i].getValue() === getActivePlayer().token) { antidiagCounts++; }
        };
        
        if (rowCounts === boardSize || colCounts === boardSize || diagCounts === boardSize || antidiagCounts === boardSize) {
            return true;
        } else {
            return false;
        };
    };

    const drawGameStatus = () => {
        let boardStatus = board.getBoard();
        const draw = boardStatus.flat().every(cell => cell.getValue() !== "");
        return draw;
    };
  
    const playRound = (row, column) => {
        board.dropToken(row, column, getActivePlayer().token);

        /*  This is where we would check for a winner/draw and handle that logic, such as a win message. */
        if (winGameStatus(row, column)) {
            board.printBoard();
            board.winnerDeclared = true;
            return
        } else if (drawGameStatus()) {
            board.printBoard();
            board.drawDeclared = true;
        } else if (!board.winnerDeclared) {
            // Switch player turn
            switchPlayerTurn();
            printNewRound();
        };
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    return { board, playRound, getActivePlayer };
}





/* Module implementation. Constructors work just fine too */
const ScreenController = (function () {
    // Cache DOM
    const gameView = document.querySelector(".board");
    const msgView = document.querySelector(".message-board");
    const players = document.querySelectorAll(".player-key");
    const resetBtn = document.querySelector(".reset-btn");

    function formatResetBtn() {
        resetBtn.textContent = "Reset Game";
        resetBtn.style.color = "lightgreen";
        resetBtn.style.backgroundColor = "white";
        players.forEach((button) => {
            if (button.disabled) {button.style.backgroundColor = "rgba(255, 127, 80, 0.4)"}
            else {button.style.backgroundColor = "lightgreen"}
        });
    };

    function disableGameBoard() {
        buttonChildren = Array.from(gameView.children);
        buttonChildren.forEach(button => {
            button.disabled = true;
        })
    };

    function resetViews() {
        msgView.textContent = "Click on any button to select a player";
        resetBtn.textContent = "Play New Game";
        resetBtn.style.color = "white";
        resetBtn.style.backgroundColor = "lightgray";

    };

    const updateScreen = (game) => {
        // clear the board
        gameView.textContent = "";
        
        // get the newest version of the board and player turn
        const board = game.board.getBoard();
        const activePlayer = game.getActivePlayer();

        // Render board squares
        board.forEach((rowCell, rowIndex) => {
            rowCell.forEach((colCell, colIndex) => {
            // Anything clickable should be a button!!
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            // Create a data attribute to identify the column. This makes it easier to pass into our `playRound` function 
            cellButton.dataset.row = rowIndex
            cellButton.dataset.column = colIndex
            cellButton.textContent = colCell.getValue();
            if (cellButton.textContent !== "") {cellButton.disabled=true};
            gameView.appendChild(cellButton);
            })
        });  
        
        // Break Point to update the screen
        if (game.board.winnerDeclared) {
            disableGameBoard()
            formatResetBtn()
            msgView.textContent = `${game.getActivePlayer().name} has won! Reset game to continue`;
            return
        } else if (game.board.drawDeclared) {
            disableGameBoard()
            formatResetBtn()
            msgView.textContent = "Game is Tied! Reset game to continue";
            return
        } else {
            // Display player's turn
            msgView.textContent = `${activePlayer.name}'s turn...`
        };   
    };

    // Add event listener for the board
    function clickHandlerBoard(e, game) {;
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        // Make sure I've clicked a column and not the gaps in between
        if (e.target.disabled && !selectedRow && !selectedColumn) return;
        let [intRow, intColumn] = [parseInt(selectedRow),parseInt(selectedColumn)]
        game.playRound(intRow, intColumn);
        updateScreen(game);
    }


    const onScreenGame = (e) => {
        selectedPlayer = e.target;
        const playerList = []
        buttonChildren = Array.from(e.target.parentNode.children);
        buttonChildren.forEach(button => {
            button.disabled = true;
            formatResetBtn()
            playerList.push({name: `Player ${button.textContent}`,
                             token: button.textContent});
        });
        selectedPlayer.classList = selectedPlayer.classList + " selected-player"
        selectedPlayer.style.backgroundColor = "lightblue";
        msgView.textContent = `Starting new game with Player "${selectedPlayer.textContent}"`

        // Sort the player list based on selection
        if (playerList[0].name !== `Player ${selectedPlayer.textContent}`) {
            let [p1, p2] = [playerList[0], playerList[1]];
            playerList[0] = p2;
            playerList[1] = p1;
        }

        const game = GameController(playerList);

        // Initial render
        updateScreen(game);

        gameView.addEventListener("click", (e) => {
            clickHandlerBoard(e, game)
        });

        resetBtn.addEventListener("click", (e) => {
            game.board.initializeBoard();       // Reset the board
            game.board.winnerDeclared = false;
            game.board.drawDeclared = false;
            updateScreen(game)                  // Update the users views
            disableGameBoard()
            players.forEach((button) => {button.disabled=false;});
            formatResetBtn()
            resetViews()
        })
    };
    
    players.forEach((playerSelection) => {
        playerSelection.addEventListener("click", onScreenGame)
    })
}) ();

// Call Module
ScreenController;