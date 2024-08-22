var rotate = function(matrix) {
    let n = matrix.length;

    // 转置矩阵,行列互换
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let tmp = matrix[j][i];
            matrix[j][i] = matrix[i][j];
            matrix[i][j] = tmp;
        }
    }

    // 列互换
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};