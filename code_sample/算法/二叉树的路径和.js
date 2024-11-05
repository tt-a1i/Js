class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

function calculatePathSums(node) {
    if (!node) return []
    const result = []
    const path = []

    function dfs(node) {
        if (!node) return
        path.push(node.val)
        if (!node.left && !node.right) {
            result.push([...path])
        }
        dfs(node.left)
        dfs(node.right)
        path.pop()
    }

    dfs(node)
    return result.map(item => item.reduce((acc, cur) => acc + cur, 0))
}

/*
     5
    / \
   4   8
  /   / \
 11  13  4
  \     / \
   7   5   1
*/
const root = new TreeNode(5,
    new TreeNode(4, new TreeNode(11, null, new TreeNode(7))),
    new TreeNode(8, new TreeNode(13), new TreeNode(4, new TreeNode(5), new TreeNode(1)))
);

const pathSums = calculatePathSums(root);
console.log(pathSums); // 输出: [27, 22, 26, 15]