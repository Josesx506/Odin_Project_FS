class Ship {
    constructor(length,name){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.name = name
    };

    hit(){
        if (this.hits < this.length){
            this.hits += 1;
        }
    };

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
            return true;
        } else {return false};
    }
};

export { Ship };
// module.exports = { Ship };