class TreeNode {
    constructor(value = 0, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function zigzagLevelOrder(root) {
    if (!root) return [];

    const results = [];
    let level = 0;
    let queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (level % 2 === 0) {
                // left to right
                currentLevel.push(node.value);
            } else {
                // right to left
                currentLevel.unshift(node.value);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        results.push(currentLevel);
        level++;
    }

    return results;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const result = zigzagLevelOrder(root);

console.log(result); // 输出 [[1], [3, 2], [4, 5, 6, 7]]
