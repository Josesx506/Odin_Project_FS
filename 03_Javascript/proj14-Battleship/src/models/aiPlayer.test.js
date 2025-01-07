import { Gameboard } from "./board";  // Import the original GameBoard class
import { AIController } from "./aiPlayer";  // Import the AIController class

describe("AIController with actual GameBoard", () => {
    let gameBoard;
    let aiController;

    beforeEach(() => {
        // Create a new game board
        gameBoard = new Gameboard(10);

        // Create the AIController instance, passing the actual game board
        aiController = new AIController(gameBoard);
        
        // Manually place two ships on the game board (you may use placeShip method or a direct setup)
        gameBoard.placeShip(1, 1, 4, "hor", "battleship");  // Place a ship at (1,1) of size 3 horizontally
        gameBoard.placeShip(3, 3, 3, "ver", "submarine");    // Place another ship at (3,3) of size 2 vertically
    });

    describe("processAttackResult()", () => {
        it("should update successfulHits, lastHit, and nextMovesQueue when hit", () => {
            const x = 1, y = 1;


            // Simulate a hit on the board
            aiController.processAttackResult(x, y, "Hit");

            // Assert the AI state has been updated
            expect(aiController.successfulHits).toContainEqual([x, y]);
            expect(aiController.lastHit).toEqual([x, y]);
            expect(aiController.nextMovesQueue.length).toBeGreaterThan(0);
        });

        it("should reset nextMovesQueue and lastHit when ship is sunk", () => {
            const x = 1, y = 1;

            // Simulate sinking the ship
            aiController.processAttackResult(x, y, "Sunk");

            // Assert the AI state has been reset
            expect(aiController.successfulHits).toEqual([]);
            expect(aiController.lastHit).toBeNull();
            expect(aiController.nextMovesQueue).toEqual([]);
        });
    });

    describe("getAdjacentPositions()", () => {
        it("should return valid adjacent positions", () => {
            const x = 2, y = 2;

            // Get adjacent positions
            const positions = aiController.getAdjacentPositions(x, y);

            // Assert valid adjacent positions are returned
            expect(positions).toEqual(
                expect.arrayContaining([
                    [1, 2],  // up
                    [2, 3],  // right
                    [3, 2],  // down
                    [2, 1],  // left
                ])
            );
        });

        it("should filter out attacked positions", () => {
            const x = 2, y = 2;

            // Mark position as attacked
            gameBoard.board[2][2] = 0;  // Mark the cell as attacked

            // Get adjacent positions
            const positions = aiController.getAdjacentPositions(x, y);

            // Assert that the attacked position is not included
            expect(positions).not.toContainEqual([2, 2]);
        });
    });

    describe("getRandomPosition()", () => {
        it("should return a valid random position", () => {
            // Mark a position as attacked
            gameBoard.board[0][0] = 0;  // Mark as attacked

            const randomPosition = aiController.getRandomPosition();

            // Assert random position is valid and not attacked
            expect(randomPosition).not.toEqual([0, 0]);
            expect(randomPosition[0]).toBeGreaterThanOrEqual(0);
            expect(randomPosition[0]).toBeLessThan(gameBoard.size);
            expect(randomPosition[1]).toBeGreaterThanOrEqual(0);
            expect(randomPosition[1]).toBeLessThan(gameBoard.size);
        });
    });

    describe("makeMove()", () => {
        it("should return a position from the nextMovesQueue when available", () => {
            const x = 3, y = 3;
            aiController.successfulHits.push([x, y]);  // Manually add a hit
            aiController.nextMovesQueue.push([x - 1, y]);  // Add an adjacent position to the queue

            const move = aiController.makeMove();

            // Assert the AI chooses the next move from the queue
            expect(move).toEqual([x - 1, y, "Miss"]);
        });

        it("should return a random position if no moves are in the queue", () => {
            
            // aiController.nextMovesQueue.push([3, 3]);
            // for (let i=0; i<8; i++) {
            //     console.log(aiController.nextMovesQueue);
            //     console.log(aiController.successfulHits);
            //     console.log(aiController.makeMove());
            // }

            const randomMove = aiController.makeMove();
            // Assert the move is valid
            expect(randomMove).toBeTruthy();
            expect(randomMove[0]).toBeGreaterThanOrEqual(0);
            expect(randomMove[1]).toBeGreaterThanOrEqual(0);
        });
    });
});
