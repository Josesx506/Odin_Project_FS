import { Ship } from "./ships";

// const Ship = require("./ships").Ship;

class Gameboard{
    constructor(size=10){
        this.size = size;
        this.board = this.initializeBoard(size);
        this.ships = []; // Store all ships placed on the board
    }

    initializeBoard = (size) => {
        let board = [];
        for (let i = 0; i < size; i++) {
          board[i] = [];
          for (let j = 0; j < size; j++) {
            board[i].push(null);
          }
        };
        return board;
    }

    isValidCoord(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    // Check if a ship can be inserted
    canPlaceShip(startX, startY, length, direction) {

        // Check each cell based on direction
        for (let i = 0; i < length; i++) {
            let x = startX;
            let y = startY;

            if (direction === "hor") {
                y += i;                          // Increment x for horizontal placement
            } else if (direction === "ver") {
                x += i;                          // Increment y for vertical placement
            }

            // Ensure coordinates are valid and unoccupied
            if (!this.isValidCoord(x, y) || this.board[x][y] !== null) {
                return false;
            }
        }

        return true;
    }

    // Place a ship
    placeShip(startX, startY, shipLen, direction) {
        let newShip = new Ship(shipLen);

        if (!this.canPlaceShip(startX, startY, newShip.length, direction)) {
            throw new Error("Invalid ship placement.");
        }

        // Place the ship on the board
        for (let i = 0; i < newShip.length; i++) {
            let x = startX;
            let y = startY;

            if (direction === "hor") {
                y += i;
            } else if (direction === "ver") {
                x += i;
            }
            
            this.board[x][y] = newShip; // Store a reference to the ship
        };
        this.ships.push(newShip);
    };

    removeShip(startX, startY, shipLen, direction) {

        let targetShip;
        
        // Place the ship on the board
        for (let i = 0; i < shipLen; i++) {
            let x = startX;
            let y = startY;

            if (direction === "hor") {
                y += i;
            } else if (direction === "ver") {
                x += i;
            }

            if (typeof this.board[x][y] !== "object") {
                throw new Error("Invalid ship location");
            } else {
                targetShip = this.board[x][y]; // Store a reference to the ship
            };
            
            this.board[x][y] = null;
        };
        let shipIndex = this.ships.indexOf(targetShip);
        this.ships.splice(shipIndex,1);
    };

    receiveAttack(x, y) {
        if (!this.isValidCoord(x, y)) {
            throw new Error("Invalid attack coordinates.");
        }

        let cell = this.board[x][y];

        if (cell === null) { // Missed attack
            this.board[x][y] = 0; // Mark the cell as a miss
            return "Miss";
        } else if (typeof cell === "object") { // Hit a ship
            cell.hit();               // Call the ship's hit method
            this.board[x][y] = -1;    // Mark the cell as a hit
            return cell.isSunk() ? "Sunk" : "Hit";
        } else {
            return "Already attacked";
        }
    }

    allShipsSunk() {
        return this.ships.every((ship) => ship.isSunk() === true);
    }

    printBoard() {
        let res = "";
        for (let r = 0; r < this.size; r++) {
          let srow = "";
          for (let c = 0; c < this.size; c++) {
            srow += " " + this.board[r][c];
          }
          res += `[${srow} ]` + "\n";
        }
        return res;
    }
}


export { Gameboard };

// let brd = new Gameboard(10);
// console.log(brd.printBoard());
// brd.placeShip(0,0,3,"ver");
// brd.placeShip(0,4,5,"hor");

// brd.receiveAttack(1,0);
// brd.receiveAttack(2,0);
// brd.receiveAttack(3,0);

// console.log(brd.allShipsSunk());

// brd.receiveAttack(0,0);
// brd.receiveAttack(0,4);
// console.log(brd.printBoard());
// console.log(brd.allShipsSunk());

// console.log(brd.ships);