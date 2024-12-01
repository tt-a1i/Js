/**
 * @param {number[]} nums
 * @return {number[]}
 */
var longestIncreasingSubsequence = function (nums) {
    if (nums.length === 0) return [];

    const tails = [];
    const predecessors = Array(nums.length).fill(-1);

    for (let i = 0; i < nums.length; i++) {
        let left = 0,
            right = tails.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[tails[mid]] < nums[i]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        if (left === tails.length) {
            tails.push(i);
        } else {
            tails[left] = i;
        }

        if (left > 0) {
            predecessors[i] = tails[left - 1];
        }
    }

    // 重建LIS
    let lis = [];
    let index = tails[tails.length - 1];
    while (index !== -1) {
        lis.push(nums[index]);
        index = predecessors[index];
    }

    return lis.reverse();
};

// 示例测试
const nums = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log(longestIncreasingSubsequence(nums)); // 输出: [0, 2, 6, 9, 11, 15]
