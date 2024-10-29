class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(value){
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            this.length += 1;
            return this;
        } else {
            this.tail.next = node;
            this.tail = this.tail.next;
            this.length += 1;
            return this;
        }
    }

    dequeue() {
        if (!this.head) {
            return this;
        } else {
            this.head = this.head.next;
            this.length -= 1;
            return this;
        }
    }

    size(){
        return this.length;
    }

    isEmpty(){
        return (this.length===0);
    }

    print(){
        let arr = [];
        if (this.length===0){
            console.log(arr);
        } else {
            let tHead = this.head;
            while (tHead.next!==null){
                arr.push(tHead.value);
                tHead = tHead.next;
            }
            arr.push(tHead.value);
            console.log(arr);
        }
    }
}

console.log("******  QUEUES  *******");

let queue = new Queue();
console.log(queue.dequeue());

console.log(queue.isEmpty());
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

queue.print();
console.log(queue.size());

queue.dequeue();
queue.dequeue();
queue.dequeue();

queue.print();
console.log(queue.size());

queue.enqueue(5);
queue.enqueue(6);

queue.print();
console.log(queue.size());
console.log(queue.isEmpty());


class Stack{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    push(value){
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.length += 1;
            return this;
        } else {
            node.next = this.head;
            this.head = node;
            this.length += 1;
            return this;
        }
    }

    pop() {
        if (!this.head) {
            return this;
        } else {
            this.head = this.head.next;
            this.length -= 1;
            return this;
        }
    }

    size(){
        return this.length;
    }

    isEmpty(){
        return (this.length===0);
    }

    print(){
        let arr = [];
        if (this.length===0){
            console.log(arr);
        } else {
            let tHead = this.head;
            while (tHead.next!==null){
                arr.push(tHead.value);
                tHead = tHead.next;
            }
            arr.push(tHead.value);
            console.log(arr);
        }
    }
};

console.log("\n******  STACKS  *******");
let stack = new Stack();
console.log(stack.pop());

console.log(stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

stack.print();
console.log(stack.length);

stack.pop();
stack.pop();

stack.print();
console.log(stack.length);