import { Gameboard } from "./board";

describe("Gameboard Tests", () => {
    let board;

    beforeAll(() => {
        // Initialize the board before tests
        board = new Gameboard(10);
    });

    test("Insert Ship", () => {
        board.placeShip(0, 1, 4, "hor"); 
        expect(board.board[0][1]).toEqual(board.ships[0]); 
        expect(board.board[0][3]).toEqual(board.ships[0]);
    });

    test("Invalid Ship Placement", () => {
        expect(() => board.placeShip(0, 4, 3, "hor")).toThrow("Invalid ship placement.");
    });

    test("Receive Attack - Miss", () => {
        const result = board.receiveAttack(3, 5); // Attack an empty cell
        expect(result).toBe("Miss");
        expect(board.board[3][5]).toBe(0);        // Ensure the cell is marked as missed
    });

    test("Prevent Repeated Grid Attack", () => {
        const result = board.receiveAttack(3, 5); // Attack an empty cell
        expect(result).toBe("Already attacked");
        expect(board.board[3][5]).toBe(0);        // Ensure the cell is marked as missed
    });

    test("Receive Attack - Hit", () => {
        board.placeShip(2, 2, 5, "ver");
        const result = board.receiveAttack(2, 2); // Attack a cell with a ship
        expect(result).toBe("Hit");
        expect(board.board[2][2]).toBe(-1);       // Ensure the board registered the hit
        expect(board.ships[1].hits).toBe(1);      // Ensure the ship pointer registered the hit
    });

    test("Are All Ships Sunk", () => {
        // Sink the battleship
        for (let i = 1; i < 5; i++) {
            board.receiveAttack(0, i);
        }
        expect(board.ships[0].isSunk()).toBe(true); // Battleship is sunk
        expect(board.allShipsSunk()).toBe(false);   // Other ships are still be afloat

        // Sink the carrier
        for (let j = 3; j < 7; j++) {
            board.receiveAttack(j, 2);
        }
        expect(board.ships[1].isSunk()).toBe(true); // Carrier is sunk
        expect(board.allShipsSunk()).toBe(true);    // All ships are sunk

    });
});