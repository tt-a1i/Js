function myFlatten(arr, depth = Infinity, map = new WeakMap()){
    if(depth < 1) return arr.slice();
    if(map.has(arr)) return map.get(arr);
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