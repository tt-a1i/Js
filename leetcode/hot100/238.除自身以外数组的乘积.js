var productExceptSelf = function(nums) {
    const n = nums.length
    const res = new Array(n)
    res[0] = 1
    //除自身以外的左侧数组乘积
    for(let i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1]
    }
    let tmp = 1
    //除自身以外的右侧数组乘积
    for(let i = n - 2; i >= 0; i--){
        tmp *= nums[i + 1]
        res[i] *= tmp
    }
    return res
}