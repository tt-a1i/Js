function threeSum(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // 排序数组

    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复的元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // 跳过重复的元素
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

// 示例
const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
// 输出: [[-1, -1, 2], [-1, 0, 1]]