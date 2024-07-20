/**
 * 递归
 */
/* const res = []
function flat(arr){
    for(let i in arr){
        if(Array.isArray(arr[i])) flat(arr[i])
        else res.push(arr[i])
    }
}
flat([1,2,3,[4,5,[6]]])
console.log(res); */
const arr = [1,2,3,[4,5,[6]]]
/**
 * flat方法
 */
/* console.log(arr.flat(Infinity)); */
/**
 * reduce
 */
/* function reduceFlat(arr){
    return arr.reduce((pre, cur) => {
        return Array.isArray(cur) ? pre.concat(reduceFlat(cur)) : pre.concat(cur)
    }, [])
}
console.log(reduceFlat(arr)); */
//避免循环引用
function safeFlatten(array, parentArrays = []) {
    let result = []
    for(const item of array){
        if(Array.isArray(item)){
            if(parentArrays.includes(item)){
                throw new Error('Detected a cycle in array')
            }
            parentArrays.push(item)
            result = result.concat(safeFlatten(item, parentArrays))
            parentArrays.pop()
        }else{
            result.push(item)
        }
    }
    return result
}
let a = [1, 2, 3];
let b = [a, 4];
a.push(b); // 在数组 a 中添加一个对数组 b 的引用，形成循环

try {
    console.log(safeFlatten(a));
} catch (e) {
    console.log(e.message); // 应打印 "Detected a cycle in array"
}