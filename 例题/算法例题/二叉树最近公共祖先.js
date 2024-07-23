var lowestCommonAncestor = function(root, p, q) {
    if(!root || root === p || root === q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if(!left) return right
    if(!right) return left
    return root
};