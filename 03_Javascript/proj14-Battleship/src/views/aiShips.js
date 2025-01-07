function randomShipPositioning(player, boardGui, maxGridSize=10) {
    let shipLengths = [5,4,3,3,2];
    let shipNames = ["carrier","battleship","cruiser","submarine","destroyer"];
    shipLengths.forEach((shipLen,idx) => {
        let placement = addShip(player,shipLen,shipNames[idx],maxGridSize);
        while (placement !== "placed") {
            placement = addShip(player,shipLen,shipNames[idx],maxGridSize);
        }
    });
    // console.log(player.board.printBoard());
}

function addShip(player, shipLen, shipName, maxGridSize=10) {
    let randX = Math.floor(Math.random() * maxGridSize);
    let randY = Math.floor(Math.random() * maxGridSize);
    let randDir = Math.random() < 0.5;
    let randOrientation = randDir ? "ver" : "hor";

    if (player.board.canPlaceShip(randX,randY,shipLen,randOrientation)) {
        player.board.placeShip(randX,randY,shipLen,randOrientation,shipName);
        // console.log(`${randX},${randY},${shipLen},${randOrientation}`);
        return "placed";
    } else {
        return "invalid";
    }
}


export { randomShipPositioning };