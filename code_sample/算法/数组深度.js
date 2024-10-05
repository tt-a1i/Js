function getArrDepth(arr){
    if(!Array.isArray(arr)) return 0;
    let depth = 0;
    arr.forEach(item => {
        depth = Math.max(depth, getArrDepth(item) + 1)
    })
    return depth
}


const arr = [1,[2,3,[4]],[5,[6,[8]]]];
console.log(getArrDepth(arr));
