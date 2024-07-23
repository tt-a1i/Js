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
// const arr = [1,2,3,[4,5,[6]]]


/**
 * flat方法
 */
/* console.log(arr.flat(Infinity)); */


/**
 * reduce
 */
/* function reduceFlat(arr){
    return arr.reduce((pre, cur) => {
        注意这里只能使用concat而不能使用push方法,因为concat方法返回新的数组,push方法返回数组长度
        return Array.isArray(cur) ? pre.concat(reduceFlat(cur)) : pre.concat(cur)
    }, [])
}
console.log(reduceFlat(arr)); */



//避免循环引用
/* function safeFlatten(array, parentArrays = []) {
    let result = []
    for(const item of array){
        if(Array.isArray(item)){
            if(parentArrays.includes(item)){
                throw new Error('Detected a cycle in array')
            }
            parentArrays.push(item)
            result.push(...safeFlatten(item, parentArrays))
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
} */



//循环引用扁平化
function myFlatten(arr, depth = Infinity, map = new WeakMap()){
    if(depth < 1) return arr.slice()
    if(map.has(arr)) return map.get(arr)
    const result = []
    map.set(arr, result)
    for(let item of arr){
      if(Array.isArray(item)){
        result.push(...myFlatten(item, depth - 1, map))
      }else{
        result.push(item)
      }
    }
    return result
  }
  // 创建一个循环引用的数组
  const arr = [1, 2, [3, 4]];
  arr[2].push(arr);
  
  console.log(myFlatten(arr));
  // 输出: [1, 2, 3, 4]