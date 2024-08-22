var maxSubArray = function(nums) {
    const res = [nums[0]]
    for(let i = 1; i < nums.length; i++){
        if(nums[i] + res[i - 1] <= nums[i]){
            res.push(nums[i])
        }else{
            res.push(nums[i] + res[i - 1])
        }
    }
    return Math.max(...res)
}
//优化
/**
空间复杂度优化：原版本使用了一个数组 res 来存储每个位置的最大子数组和，空间复杂度为 O(n)。
优化后的版本只使用了两个变量 maxSum 和 currentSum，将空间复杂度降低到 O(1)。

时间复杂度优化：虽然两个版本的时间复杂度都是 O(n)，但优化后的版本减少了数组操作（push），这在处理大型数组时可能会有一些性能提升。

代码简化：优化后的版本更加简洁，易于理解和维护。
避免使用 spread 操作符：原版本在返回时使用了 Math.max(...res)，这在处理非常大的数组时可能会导致栈溢出。优化后的版本直接返回 maxSum，避免了这个潜在问题。
 */
var maxSubArray = function(nums) {
    let maxSum = nums[0]
    let currSum = nums[0]
    for(let i = 1; i < nums.length; i++){
        currSum = Math.max(currSum + nums[i], nums[i])
        maxSum = Math.max(maxSum, currSum)
    }
    return maxSum
}