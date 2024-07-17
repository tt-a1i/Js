var spiralOrder = function (matrix) {
    let l = 0,
        u = 0,
        r = matrix[0].length - 1,
        d = matrix.length - 1;
    const res = []
    while (l <= r && u <= d) {
        for (let i = l; i <= r; i++) {
            res.push(matrix[u][i]);
        }
        u++;
        for (let i = u; i <= d; i++) {
            res.push(matrix[i][r]);
        }
        r--;
        if (u <= d) {
            for (let i = r; i >= l; i--) {
                res.push(matrix[d][i]);
            }
            d--;
        }
        if (l <= r) {
            for (let i = d; i >= u; i--) {
                res.push(matrix[i][l]);
            }
            l++;
        }
    }
    return res;
};
