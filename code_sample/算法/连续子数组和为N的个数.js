/*前缀和 + 哈希表
将当前元素num加到prefixSum上，更新前缀和。
检查prefixCount中是否存在prefixSum - N这个键。
如果存在，说明我们找到了一个和为N的子数组，因为当前前缀和减去N等于之前的某个前缀和，这意味着这两个前缀和之间的元素和为N。
如果存在，就将count增加prefixCount.get(prefixSum - N)的值，即这个前缀和出现的次数。
更新prefixCount中prefixSum的值，如果prefixSum已经存在，就将其对应的值加1，否则设置为1。
*/
function subarraySum(nums, N){
    let prefixSum = 0, count = 0
    const map = new Map()
    map.set(0, 1)
    for(let n of nums){
        prefixSum += n
        if(map.has(prefixSum - N)){
            count += map.get(prefixSum - N)
        }
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1)
    }
    return count
}

const nums = [1, 2, 3, 4, 5];
const N = 9;
console.log(subarraySum(nums, N)); // 输出: 2