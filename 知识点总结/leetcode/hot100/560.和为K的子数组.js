var subarraySum = function (nums, k) {
    const map = new Map()
    map.set(0, 1)
    let count = 0
    let pre = 0
    for(let n of nums){
        pre += n
        if(map.has(pre - k)){
            count += map.get(pre - k)
        }
        if(map.has(pre)){
            map.set(pre, map.get(pre) + 1)
        }else{
            map.set(pre, 1)
        }
    }
    return count
}