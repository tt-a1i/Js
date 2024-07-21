let arr = [1,2,3,[3,[4,[5]]]]

function reduceFlat(arr){
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur) ? prev.concat(reduceFlat(cur)) : prev.push(cur)
    }, [])
}
console.log(reduceFlat(arr));