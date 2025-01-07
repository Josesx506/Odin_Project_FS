import { Gameboard } from "./board";

class Player{
    constructor(id){
        this.id = id;
        this.board = new Gameboard();
        this.active = false;
    }
};

export { Player };