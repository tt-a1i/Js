var moveZeroes = function(nums) {
    let j = 0
    for(let i in nums){
        if(nums[i] !== 0){
            let tmp = nums[i]
            nums[i] = nums[j]
            nums[j++] = tmp
        }
    }
    return nums
}
let nums = [0,1,0,3,12]
console.log(moveZeroes(nums));