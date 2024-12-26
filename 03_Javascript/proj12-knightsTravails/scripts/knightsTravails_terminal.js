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
}


let kt = new Knight([0,0]);      // Initialize knight with start cell
let res = kt.knightMoves([7,7])  // Return total moves to end cell
console.log(`=> You made it in ${res.totalMoves} moves! Here's your path`);
console.log(res.steps);