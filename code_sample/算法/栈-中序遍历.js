class TreeNode {
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
/**
 * 
 * @param {class} root 
 * @returns array
    时间复杂度是 O(n)，其中 n 是树中的节点数，因为每个节点都被访问一次。
    空间复杂度在最坏情况下（树完全倾斜）是 O(n)，但对于平衡树，平均情况下是 O(log n)。
 */
function inorderTraversal(root){
    const result = [];
    const stack = [];
    let current = root;

    while(current !== null || stack.length > 0){
        while(current){
            stack.push(current);
            current = current.left;
        }

        current = stack.pop()
        result.push(current.val);
        current = current.right;
    }

    return result;
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

console.log(inorderTraversal(root));// 输出: [4, 2, 5, 1, 3]
