import { Gameboard } from "./board";

class Player{
    constructor(id){
        this.id = id;
        this.board = new Gameboard();
    }
};

export { Player };