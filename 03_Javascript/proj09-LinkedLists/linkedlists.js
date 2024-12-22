class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}


class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            this.size += 1;
            return this;
        } else {
            this.tail.next = node;
            this.tail = this.tail.next;
            this.size += 1;
            return this;
        }
    }

    prepend(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            this.size += 1;
            return this;
        } else {
            node.next = this.head;
            this.head = node;
            this.size += 1;
            return this;
        }
    }

    at(index) {
        let start = 0;
        if (!this.head) {return "Error: List is empty"};
        let node = this.head;
        while (node.next!==null  && start<=index) {
            if (start===index) {
                return node;
            } else {
                node = node.next;
                start += 1;
            }
        }
        return null;
    }

    pop() {
        let node = this.head;
        while (node.next.next!==null) {
            node = node.next;
        }
        node.next = null;
        this.tail = node;
        this.size -= 1;
        return this;
    }

    contains(value) {
        if (!this.head) {return "Error: List is empty"};
        let node = this.head;
        while (node.next!==null) {
            if (node.value === value) {
                return true;
            } else {
                node = node.next;
            }
        }
        return false;
    }

    find(value) {
        if (!this.head) {return "Error: List is empty"};
        let node = this.head;
        let index = 0;
        while (node.next!==null) {
            if (node.value === value) {
                return index;
            } else {
                node = node.next;
                index += 1;
            }
        }
        return null;
    }

    insertAt(value, index) {
        if (!this.head) {return "Error: List is empty"};
        let node = this.head;
        let newNode= new Node(value);
        let currIdx = 0;
        // Edge case at the start of the list;
        if (index===0) {
            this.prepend(value);
            return this;
        }
        while (node.next!==null && currIdx<=index) {
            if (currIdx === index-1) {
                newNode.next = node.next;
                node.next = newNode;
                this.size += 1;
                return this
            } else {
                node = node.next;
                currIdx += 1;
            }
        }
        // Edge case at the end of the list;
        this.append(value);
        return this;
    }

    removeAt(index) {
        if (!this.head) {return "Error: List is empty"};
        if (index > this.size-1){return "Warning: Input index is longer than list size"};

        let node = this.head;
        let currIdx = 0;
        // Edge case at the start of the list;
        if (index===0) {
            this.head = this.head.next;
            this.size -= 1;
            return this;
        }

        while (node.next!==null) {
            if (currIdx === index-1) {
                node.next = node.next.next;
                this.size -= 1;
                if (node.next === null) {
                    this.tail = node;
                }
                return this
            }
            node = node.next;
            currIdx += 1;
        }
    }

    toString() {
        if (!this.head) {return "Error: List is empty"};
        let node = this.head;
        let output = "";
        while (node.next!==null) {
            output += `(${node.value}) -> `
            node = node.next;
        }
        output += `(${node.value}) -> null`
        return output;
    }
};



const list = new LinkedList();
console.log(list.find("joe"));

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");


console.log(`${list.toString()}, size:${list.size}`);

list.pop();
list.prepend("joe");

console.log(`${list.toString()}, size:${list.size}`);

console.log(`The index of cat is ${list.find("cat")}`);
console.log(`Does the list have a cat node? ${list.contains("cat")}`);
console.log(`${list.toString()}, size:${list.size}`);

list.insertAt("lion",3);

console.log(`${list.toString()}, size:${list.size}`);

console.log(list.removeAt(90));
list.removeAt(5);
list.append("tobs");
console.log(`${list.toString()}, size:${list.size}`);