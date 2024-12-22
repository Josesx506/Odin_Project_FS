## Trees
Trees are a special kind of graph. Binary trees are trees where each tree has at most 2 child nodes. Understanding trees requires understanding stacks and queues.

#### Queues
Data structure of first-in-first-out (FIFO) like an assembly line in school. Best way I understand how to solve it is using a 
***head-tail*** and node structure. It's especially useful for Breadth-First-Search (BFS) in traversing tree structures.

#### Stacks
Data structure of last-in-first-out (LIFO) like a literal stack/pile of books. Best way I understand how to solve it is using a 
***head-only*** node structure. It's especially useful for Depth-First-Search (DFS) in traversing tree structures.

### Traversing trees
In Depth First Search, the order in which we access a node in can be 
- Pre-order - <`root_node`><left_node><right_node>
- In-order - <left_node><`root_node`><right_node>
- Post-order - <left_node><right_node><`root_node`>

>[!Note]
> The position of the root-node diagonally decreases from left to right as you access the nodes from pre-order -> in-order -> post-order. In-order traversal of a binary-search-tree gives a sorted list.

Breadth First Search can only be traversed from left to right in a pattern known as Level-order traversal. This uses a queue or array to append and pop items respectively from the tree.

### Complexity
Max. Time and Space complexity -> `O(n)`. Best/Average Time/Space Complexity -> `O(log n)`
