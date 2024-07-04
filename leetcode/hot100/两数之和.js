var twoSum = function (nums, target) {
    const map = new Map()
    for(let i in nums){
        if(map.has(target - nums[i])){
            return [+map.get(target - nums[i]), +i]
        }
        map.set(nums[i], i)
    }
}
let nums = [2,7,11,15]
console.log(twoSum(nums, 9));