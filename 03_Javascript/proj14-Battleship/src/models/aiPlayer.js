class AIController{
    constructor(board) {
        this.board = board;
        this.lastHit = null;
        this.successfulHits = [];
        this.nextMovesQueue = [];
        this.attackedPositions = new Set();
        this.shipOrientation = null;      // "horizontal" or "vertical" or null
        this.huntingDirection = null;     // "forward" or "backward" or null
    }

    positionToString(row, col) {
        return `${row},${col}`;
    }

    isPositionAttacked(x, y) {
        return (typeof this.board.board[x][y] === "number");
    }

    determineShipOrientation() {
        if (this.successfulHits.length < 2) return null;

        const [x1, y1] = this.successfulHits[this.successfulHits.length - 2];
        const [x2, y2] = this.successfulHits[this.successfulHits.length - 1];

        if (x1 === x2) return "horizontal";
        if (y1 === y2) return "vertical";
        return null;
    }

    getDirectionalMoves(x, y) {
        if (!this.shipOrientation) return [];

        if (this.shipOrientation === "horizontal") {
            return [
                [x, y + 1], // right
                [x, y - 1]  // left
            ].filter(pos => 
                this.board.isValidCoord(pos[0], pos[1]) && !this.isPositionAttacked(pos[0], pos[1])
            );
        } else {            // vertical
            return [
                [x - 1, y], // up
                [x + 1, y]  // down
            ].filter(pos => 
                this.board.isValidCoord(pos[0], pos[1]) && !this.isPositionAttacked(pos[0], pos[1])
            );
        }
    }

    // Get adjacent positions (up, right, down, left)
    getAdjacentPositions(x, y) {
        return [
            [x - 1, y], // up
            [x, y + 1], // right
            [x + 1, y], // down
            [x, y - 1]  // left
        ].filter(pos => 
            this.board.isValidCoord(pos[0],pos[1]) && !this.isPositionAttacked(pos[0],pos[1])
        );
    }

    // processAttackResult(x, y, result) {
    //     this.attackedPositions.add(this.positionToString(x, y));

    //     if (result === "Hit" || result === "Sunk") {
    //         this.successfulHits.push([x, y]);
            
    //         if (result === "Hit") {
    //             this.lastHit = [x, y];
    //             // Add adjacent positions to the queue
    //             const adjacentPositions = this.getAdjacentPositions(x,y);
    //             this.nextMovesQueue.push(...adjacentPositions);
    //         } else {
    //             // Ship was sunk, reset hunting mode
    //             this.lastHit = null;
    //             this.nextMovesQueue = [];
    //         }
    //     }
    // }


    processAttackResult(x, y, result) {
        this.attackedPositions.add(this.positionToString(x, y));

        if (result === "Hit" || result === "Sunk") {
            this.successfulHits.push([x, y]);
            
            if (result === "Hit") {
                this.lastHit = [x, y];
                
                // Determine ship orientation after second hit
                if (this.successfulHits.length >= 2) {
                    this.shipOrientation = this.determineShipOrientation();
                    
                    if (this.shipOrientation) {
                        // Clear the queue and add directional moves
                        this.nextMovesQueue = [];
                        this.nextMovesQueue.push(...this.getDirectionalMoves(x, y));
                    }
                } else {
                    // First hit - add all adjacent positions
                    this.nextMovesQueue.push(...this.getAdjacentPositions(x, y));
                }
            } else { // "Sunk"
                // Reset all tracking when ship is sunk
                this.lastHit = null;
                this.nextMovesQueue = [];
                this.successfulHits = [];
                this.shipOrientation = null;
                this.huntingDirection = null;
            }
        } else if (result === "Miss" && this.shipOrientation) {
            // If we miss while knowing orientation, try the opposite direction
            const lastHit = this.successfulHits[this.successfulHits.length - 1];
            this.nextMovesQueue = this.getDirectionalMoves(...lastHit);
        }
    }

    getRandomPosition() {
        let available = [];
        for (let x = 0; x < this.board.size; x++) {
            for (let y = 0; y < this.board.size; y++) {
                if (!this.isPositionAttacked(x, y)) {
                    available.push([x, y]);
                }
            }
        }
        return available[Math.floor(Math.random() * available.length)];
    }

    // Make the next move
    makeMove() {
        let pos;
        let result;
        let tempCell;
        let shipName;

        // If we have queued moves from previous hits, try those first
        while (this.nextMovesQueue.length > 0) {
            pos = this.nextMovesQueue.shift();
            tempCell = this.board.board[pos[0]][pos[1]];
            if (!this.isPositionAttacked(pos[0],pos[1])) {
                if (tempCell !== null && typeof tempCell === "object") {
                    shipName = this.board.board[pos[0]][pos[1]].name;
                }
                result = this.board.receiveAttack(pos[0],pos[1]);
                this.processAttackResult(pos[0],pos[1],result);
                return [...pos, result, shipName];
            }
        }

        // If no queued moves or all queued moves were invalid, get a random position
        pos = this.getRandomPosition();
        tempCell = this.board.board[pos[0]][pos[1]];
        if (tempCell !== null && typeof tempCell === "object") {
            shipName = this.board.board[pos[0]][pos[1]].name;
        }
        result = this.board.receiveAttack(pos[0],pos[1]);
        this.processAttackResult(pos[0],pos[1],result);
        

        return [...pos, result, shipName];
    }
}

export { AIController };