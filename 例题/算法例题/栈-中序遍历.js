class TreeNode {
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
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