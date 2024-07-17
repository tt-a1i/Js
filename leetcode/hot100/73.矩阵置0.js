/* 思路:
创建两个布尔数组 row 和 col，分别用于标记哪些行和列需要置零。

第一次遍历矩阵，当遇到 0 时，标记对应的行和列。

第二次遍历矩阵，根据 row 和 col 的标记来设置相应的元素为 0。 */
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length
    const row = new Array(m).fill(0)
    const col = new Array(n).fill(0)
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(matrix[i][j] === 0){
                row[i] = col[j] = 1
            }
        }
    }
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(row[i] || col[j]){
                matrix[i][j] = 0
            }
        }
    }
};


