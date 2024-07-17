var searchMatrix = function(matrix, target) {
    const n = matrix[0].length - 1, m = matrix.length - 1
    let row = 0, col = n
    while(row <= m && col >= 0){
        if(matrix[row][col] === target) return true
        else if(matrix[row][col] < target) row++
        else col--
    }
    return false
}