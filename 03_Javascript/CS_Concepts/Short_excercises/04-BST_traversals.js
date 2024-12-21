/*
        1
       / \
      2   3
         / \
        4   5
*/

class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.next = null;
    }
}

function bfsLevelOrder(node) {
    // let bfsQueue = new Queue();
    let arr = [];

    if (!node) {
        return;
    } else {
        arr.push(node);
        while (arr.length!==0) {
            node = arr.shift();
            console.log(node.value);
            if (node.left) {
                arr.push(node.left);
            }
            if (node.right) {
                arr.push(node.right);
            }
        };
    }
}

let A = new TreeNode(1);
let B = new TreeNode(2);
let C = new TreeNode(3);
let D = new TreeNode(4);
let E = new TreeNode(5);


A.left = B;
A.right = C;
B.left = D;
B.right = E;

console.log("#### BFS / Level-order search");
let sortArr = bfsLevelOrder(A);




function dfsPreOrder(node){
    if (!node) {
        return;
    } else {
        console.log(node.value);
        if (node.left) {
            dfsPreOrder(node.left);
        }
        if (node.right) {
            dfsPreOrder(node.right);
        }
    }
};

function dfsInOrder(node){
    if (!node) {
        return;
    } else {
        if (node.left) {
            dfsInOrder(node.left);
        }
        console.log(node.value);
        if (node.right) {
            dfsInOrder(node.right);
        }
    }
};

function dfsPostOrder(node){
    if (!node) {
        return;
    } else {
        if (node.left) {
            dfsPostOrder(node.left);
        }
        if (node.right) {
            dfsPostOrder(node.right);
        }
        console.log(node.value);
    }
};

console.log("#### DFS Pre-order search");
dfsPreOrder(A);
console.log("#### DFS In-order search");
dfsInOrder(A);
console.log("#### DFS Post-order search");
dfsPostOrder(A);