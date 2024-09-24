function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // 创建一个 2D 数组 dp 并初始化
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    dp[0][0] = grid[0][0];

    // 初始化第一行
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }

    // 初始化第一列
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }

    // 填充 dp 数组
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);
        }
    }

    // 返回到达右下角的最短路径的代价
    return dp[m-1][n-1];
}

// 示例使用
const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];

console.log(minPathSum(grid)); // 输出：7