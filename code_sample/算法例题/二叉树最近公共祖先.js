var lowestCommonAncestor = function(root, p, q) {
    if(!root || root === p || root === q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if(!left) return right
    if(!right) return left
    return root
};
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);

console.log(lowestCommonAncestor(root, root.left, root.right).val); // 应该输出 3
console.log(lowestCommonAncestor(root, root.left, root.left.right).val); // 应该输出 5
console.log(lowestCommonAncestor(root, root.left.left, root.left.right).val); // 应该输出 5