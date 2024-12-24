class Node{
    constructor(value){
        this.data = value;
        this.left = null;
        this.right = null;
    }
}


class BST {
    constructor(array){
        this.balanceTree(array);
    }

    balanceTree(array){
        array = array.sort(function(a, b){return a - b});
        this.root = this.buildTree(array, 0, array.length-1);
    }

    // Recursively convert a sorted array into a Binary Search Tree
    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        let midPnt = start + Math.floor((end - start) / 2);
        let root = new Node(array[midPnt]);

        // Create the left and right subtrees
        root.left = this.buildTree(array, start, midPnt-1);
        root.right = this.buildTree(array, midPnt+1, end);

        return root;
    }

    // Find, Insert, Delete operations 
    find(value, node = this.root) {
        if (!node) {return false}
        if (value < node.data) {
            return this.find(value, node.left);
        }
        if (value > node.data) {
            return this.find(value, node.right);
        }
        if (value === node.data) {
            return node;
        }
    }

    insert(entry, root=this.root, rebalance=false) {
        if (!root){
            return new Node(entry);
        }
        // Duplicates not allowed
        if (root.data === entry)
            return root;
            
        if (entry < root.data)
            root.left = this.insert(entry, root.left);
        else if (entry > root.data)
            root.right = this.insert(entry, root.right);
        
        // Rebalance the tree
        if (root===this.root && rebalance===true) {
            this.rebalance(root);
        }

        return root;
    }

    // This mainly works when the right child is not empty, 
    // which is  the case we need in BST delete.
    getSuccessor(curNode) {
        curNode = curNode.right;
        while (curNode !== null && curNode.left !== null) {
            curNode = curNode.left;
        }
        return curNode;
    }

    deleteItem(value, root=this.root, rebalance=false) {
        // Base case
        if (!root) {return root};
    
        // If data to be searched is in a subtree
        if (root.data > value) {
            root.left = this.deleteItem(value, root.left);
        } else if (root.data < value) {
            root.right = this.deleteItem(value, root.right);
        } else {
            // If root matches with the given data
    
            // Cases when root has 0 children / only right child
            if (root.left === null) 
                return root.right;
    
            // When root has only left child
            if (root.right === null) 
                return root.left;
    
            // When both children are present
            let succ = this.getSuccessor(root);
            root.data = succ.data;
            root.right = this.deleteItem(succ.data, root.right);
        }
        
        // Rebalance the tree
        if (root===this.root && rebalance===true) {
            this.rebalance(root);
        }

        return root;
    }

    // Tree Traversal
    levelOrder(node=this.root) {
        let queueArr = [];
        let outArr = [];
    
        if (!node) {
            return;
        } else {
            queueArr.push(node);
            while (queueArr.length!==0) {
                node = queueArr.shift();
                outArr.push(node.data);
                if (node.left) {
                    queueArr.push(node.left);
                }
                if (node.right) {
                    queueArr.push(node.right);
                }
            };
            return outArr;
        }
    }

    preorderRecursive(root,outarr) {
        if (root !== null) {
            outarr.push(root.data);
            this.preorderRecursive(root.left,outarr);
            this.preorderRecursive(root.right,outarr);
        }
    }

    inorderRecursive(root,outarr) {
        if (root !== null) {
            this.inorderRecursive(root.left,outarr);
            outarr.push(root.data);
            this.inorderRecursive(root.right,outarr);
        }
    }

    postorderRecursive(root,outarr) {
        if (root !== null) {
            this.postorderRecursive(root.left,outarr);
            this.postorderRecursive(root.right,outarr);
            outarr.push(root.data);
        }
    }

    preorder(){
        let root = this.root;
        let output = [];
        this.preorderRecursive(root,output);
        return output;
    }

    inorder(){
        let root = this.root;
        let output = [];
        this.inorderRecursive(root,output);
        return output;
    }

    postorder(){
        let root = this.root;
        let output = [];
        this.postorderRecursive(root,output);
        return output;
    }

    // Height and depth operations
    findHeight(root) {
        if (!root) {
            return -1;
        }
    
        let leftHeight = this.findHeight(root.left);
        let rightHeight = this.findHeight(root.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    height(value) {
        let searchNode = this.find(value);
        let nodeHeight = null;
        if (!searchNode) {
            return nodeHeight;
        } else {
            nodeHeight = this.findHeight(searchNode);
            return nodeHeight;
        }
    }

    depth(value,root=this.root) {
        if (!root) {
            return -1;
        }
        let dist = -1;

        if ((root.data == value) || 
            (dist = this.depth(value, root.left)) >= 0 || 
            (dist = this.depth(value, root.right)) >= 0) {
            return dist + 1;;
        }
        
        return dist;
    }

    // Check if the tree is balanced
    isBalanced(root=this.root){
    
        // Base condition
        if(!root)
            return true
    
        // for left and right subtree height
        let lh = this.findHeight(root.left)
        let rh = this.findHeight(root.right)
    
        // allowed values for (lh - rh) are 1, -1, 0
        if ((Math.abs(lh - rh) <= 1) && 
            (this.isBalanced(root.left)== true) && 
            (this.isBalanced( root.right) == true))
            return true
    
        // if we reach here means tree is not height-balanced tree
        return false
    }

    rebalance(root=this.root) {
        let arr = [];
        this.inorderRecursive(root,arr);
        this.balanceTree(arr);
    }
    
    prettyPrint(node, prefix = "", isLeft = true)  {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

let inpArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 67, 6345, 324];
let bst = new BST(inpArr);

// Insert items
bst.insert(3770);
bst.insert(3550);
bst.insert(3250);
bst.insert(5);

// Delete Items
bst.deleteItem(4);
bst.deleteItem(7);
bst.deleteItem(3250);
bst.deleteItem(3550);

// Height and Depth
console.log(`\nheight of node 9: ${bst.height(9)}`);
console.log(`depth of node 9: ${bst.depth(9)}\n`);

// Traversal
console.log("Pre-balance Traversal");
console.log(`Pre-order traversal:\t[${bst.preorder()}]`);
console.log(`In-order traversal:\t[${bst.inorder()}]`);
console.log(`Post-order traversal:\t[${bst.postorder()}]`);
console.log(`Level-order traversal:\t[${bst.levelOrder()}]`);

// Balance
console.log(`\nIs the tree balanced? ${bst.isBalanced()}`);
bst.rebalance();
console.log(`Is the tree balanced? ${bst.isBalanced()}\n`);

console.log("Post-balance Traversal");
console.log(`Pre-order traversal:\t[${bst.preorder()}]`);
console.log(`In-order traversal:\t[${bst.inorder()}]`);
console.log(`Post-order traversal:\t[${bst.postorder()}]`);
console.log(`Level-order traversal:\t[${bst.levelOrder()}]`);

// Print output
let root = bst.root;
bst.prettyPrint(root);
console.log(`Tree Height: ${bst.findHeight(root)}`);




// Random Array
let rArr = Array.from({length: 50}, () => Math.floor(Math.random() * 50));
bstr = new BST(rArr);
console.log(`\nIs the new tree balanced? ${bstr.isBalanced()}`);
bstr.insert(150);bstr.insert(200);bstr.insert(250);
console.log(`Is the new tree balanced? ${bstr.isBalanced()}`);
bstr.rebalance();
console.log(`Is the new tree balanced? ${bstr.isBalanced()}`);
console.log(`Balanced In-order traversal:\t[${bstr.inorder()}]`);
console.log(`Tree Height: ${bstr.findHeight(bstr.root)}`);
