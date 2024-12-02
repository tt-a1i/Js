/**
 * 树节点类
 */
class TreeNode {
    /**
     * 创建一个树节点
     * @param {number} val - 节点的值
     * @param {TreeNode|null} left - 左子节点
     * @param {TreeNode|null} right - 右子节点
     */
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * 计算所有从根到叶子的路径拼接数字的总和
 * @param {TreeNode|null} root - 树的根节点
 * @returns {number} 所有路径数字的总和
 */
function calculatePathSum(root) {

    let numArr = [], res = []
    /**
     * 辅助函数，进行深度优先搜索
     * @param {TreeNode|null} node - 当前节点
     */
    function helper(root){
        if(!root) {
            return
        }
        numArr.push(root.val)
        if(!root.left && !root.right){
            res.push(numArr.join(''))
        } else {
            helper(root.left)
            helper(root.right)
        }
        numArr.pop()
    }

    helper(root);
    return res.reduce((acc, cur) => acc += parseInt(cur), 0)
}

// 示例使用
const root = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4),
        new TreeNode(5)
    ),
    new TreeNode(3)
);

console.log(calculatePathSum(root)); // 输出 262