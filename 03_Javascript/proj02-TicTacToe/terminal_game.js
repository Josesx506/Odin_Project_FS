function Gameboard() {
    const rows = 3;
    const columns = rows;
    const board = [];

    // Generate the magic squares that will be used to evaluate if the game has been won
    const magicSquares = generateMagicSquare(rows);
    // console.table(magicSquares);
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
          board[i] = [];
          for (let j = 0; j < columns; j++) {
            board[i].push(Cell(magicSquares[i][j]));
          }
        };
    }

    initializeBoard();
  
    // This will be the method of getting the entire board that our UI will eventually need to render it.
    const getBoard = () => board;

    // In order to drop a token, we need to find what the lowest point of the
    // selected column is, *then* change that cell's value to the player number
    const dropToken = (row, column, player) => {
        // Check if the Cell in the specified row and column on the Board is empty
        const availableCells = (board[row][column].getValue() === 0);

        // If false, the move is invalid. Stop execution.
        if (!availableCells) return;

        // Otherwise, I have a valid cell, add the players token to the selected row and column
        board[row][column].addToken(player);
    };

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI // getSquareIndex
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
       
        // Convert each row to a string with pipe characters
        const formattedRows = boardWithCellValues.map(row => row.join(" | "));

        // Create a separator line
        const separator = boardWithCellValues[0].map((_, index) => {
            let sepStr = "--- ";
            if (index === 0) {
                sepStr = "-- ";
            } else if (index === boardWithCellValues[0].length-1) {
                sepStr = "--";
            }
            return sepStr
        }).join('');

        // Print the table
        console.log("\n" + formattedRows.join("\n" + separator + "\n") + "\n");
        // Print the table
        // console.table(boardWithCellValues);
    };

    // Here, we provide an interface for the rest of our application to interact with the board
    return { getBoard, initializeBoard, dropToken, printBoard };
}

function generateMagicSquare(n){
    magicSquare = Array(n).fill(0).map(x => Array(n).fill(0)); 
 
    // Initialize position for 1
    let i = parseInt(n / 2);
    let j = n - 1;
 
    // One by one put all values in magic square
    for (num = 1; num <= n * n;) {
        if (i == -1 && j == n) // 3rd condition
        {
            j = n - 2;
            i = 0;
        }
        else {
            // 1st condition helper if next number goes to out of square's right side
            if (j == n)
                j = 0;
 
            // 1st condition helper if next number is goes to out of square's upper side
            if (i < 0)
                i = n - 1;
        }
        // 2nd condition
        if (magicSquare[i][j] != 0) {
            j -= 2;
            i++;
            continue;
        }
        else
            // set number
            magicSquare[i][j] = num++;
 
        // 1st condition
        j++;
        i--;
    };
    
    return magicSquare;
}

function Cell(sqrIndexValue) {
    let sqrIndex = sqrIndexValue || "none";  // Optional argument for magic square
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };

    const getSquareIndex  = () => sqrIndex;
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue,
      getSquareIndex
    };
}

function Player (playerName, playerToken, gameBoard) {
    const name = playerName;
    const token = playerToken;

    const board = gameBoard;    // Extract the board from the game

    const getPlayerName = () => name;
    const getPlayerToken = () => token;

    const getPlayerWin = (row,col) => {
        const boardSize = board.getBoard()[0].length;

        // Array for storing the player progress. If the value any 4 directions is equal to the board size, the player has won
        let rowCounts = 0;
        let colCounts = 0;
        let diagCounts = 0;
        let antidiagCounts = 0;
        
        // Count the winning conditions on the board
        for (let i = 0; i < boardSize; i++) {
            if (board.getBoard()[i][col].getValue() === token) {
                rowCounts++;
            }
            if (board.getBoard()[row][i].getValue() === token) {
                colCounts++;
            }
            if (row === col && board.getBoard()[i][i].getValue() === token) {
                diagCounts++;
            }
            if (row + col === boardSize - 1 && board.getBoard()[i][(boardSize-1)-i].getValue() === token) {
                antidiagCounts++;
            }
        };
        
        if (rowCounts === boardSize || colCounts === boardSize || diagCounts === boardSize || antidiagCounts === boardSize) {
            return true;
        } else {
            return false;
        };
    };

    return { getPlayerName, getPlayerToken, getPlayerWin }
}

/* 
** The GameController will be responsible for controlling the flow and state 
** of the game's turns, as well as whether anybody has won the game
*/
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();

    const players = [Player(playerOneName, token=1, board),
        Player(playerTwoName, token=2, board)];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().getPlayerName()}'s turn.`);
    };

    const drawGameStatus = () => {
        let boardStatus = board.getBoard();
        const draw = boardStatus.flat().every(cell => cell.getValue() !== 0);
        return draw;
    };
  
    const playRound = (row, column) => {
      // Drop a token for the current player
      console.log(`Dropping ${getActivePlayer().getPlayerName()}'s token into row ${row}, column ${column}...`);

      board.dropToken(row, column, getActivePlayer().getPlayerToken());
  
      /*  This is where we would check for a winner and handle that logic, such as a win message. */
      let winGameStatus = getActivePlayer().getPlayerWin(row, column);

      if (winGameStatus) {
        console.log(`\n\n###### ${getActivePlayer().getPlayerName()} has won ${winGameStatus} ######`);
        console.log("Printing final game status\n");
        board.printBoard();
        console.log("Resetting Board!!!!");
        board.initializeBoard(); // Reset
        return;
      } else if (drawGameStatus()) {
        console.log("\n\n###### Draw, game has no winner ######");
        console.log("Printing final game status\n");
        board.printBoard();
        console.log("Resetting Board!!!!");
        board.initializeBoard(); // Reset
        return;
      } else {
        // Switch player turn
        switchPlayerTurn();
        printNewRound();
      };
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return { playRound, getActivePlayer };
}

const game = GameController();

// Draw Game Play
game.playRound(0,0)
game.playRound(0,1)
game.playRound(0,2)
game.playRound(1,1)
game.playRound(1,0)
game.playRound(2,0)
game.playRound(1,2)
game.playRound(2,2)
game.playRound(2,1)

// Player 1 wins
game.playRound(0,2)
game.playRound(0,1)
game.playRound(1,1)
game.playRound(1,0)
game.playRound(2,0)