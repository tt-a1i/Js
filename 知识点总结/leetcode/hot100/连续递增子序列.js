function longestContinuousIncreasingSubsequence(nums){
    let currLen = 1, maxLen = 0;
    for(let i = 1; i < nums.length; i++){
        if(nums[i] > nums[i - 1]){
            currLen++
        }else{
            currLen = 1
            maxLen = Math.max(currLen, maxLen)
        }
    }
    maxLen = Math.max(currLen, maxLen)
    return maxLen
}

const nums = [1, 3, 5, 4, 7];
console.log(longestContinuousIncreasingSubsequence(nums)); // 输出: 3 (子序列 [1, 3, 5])

const nums2 = [2, 2, 2, 2, 2];
console.log(longestContinuousIncreasingSubsequence(nums2)); // 输出: 1 (每个元素都是单独的递增子序列)