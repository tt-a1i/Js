//空间复杂度O(n)
var rotate = function(nums, k) {
    const n = nums.length
    let arr = new Array(n).fill(0)
    for(let i = 0; i < n; i++){
        arr[(i + k) % n] = nums[i]
    }
    for(let i in nums) nums[i] = arr[i]
    console.log(nums);
};
//反转法,空间复杂度O(1)
var rotate2 = function(nums, k) {
    k %= nums.length;  // 处理 k 大于数组长度的情况
    let n = nums.length
    reverse(nums, 0, n - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, n - 1)
    console.log(nums);
    function reverse(nums, start, end){
        let tmp 
        while(start < end){
            tmp = nums[end]
            nums[end] = nums[start]
            nums[start] = tmp
            start++
            end--
        }
    }
};
rotate2([-1,-100,3,99], 2)