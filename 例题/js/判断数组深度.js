function getMaxDepth(arr){
    if(!Array.isArray(arr)) return 0;
    let depth = 0;
    arr.forEach(item => {
        depth = Math.max(depth, getMaxDepth(item))
    })
    return depth + 1;
}
const exampleArray = [1, [2, [3, [4, [5]]]], 6, [7, [8, [9]]]];
console.log(getMaxDepth(exampleArray)); // 输出：5