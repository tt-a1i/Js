function lengthOfLIS1(nums) {
	const dp = Array(nums.length).fill(1);
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1);
			}
		}
	}
	return Math.max(...dp);
}
function lengthOfLIS2(nums) {
	if (nums.length === 0) return 0;

	const lis = [];

	for (const num of nums) {
		let left = 0,
			right = lis.length;
		while (left < right) {
			const mid = Math.floor((left + right) / 2);
			if (lis[mid] < num) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}

		// 如果 left 是在最后一个位置，说明 num 是最大的，需要添加到 lis
		if (left === lis.length) {
			lis.push(num);
		} else {
			// 替换，维持最小的元素
			lis[left] = num;
		}
	}

	return lis.length;
}
// 测试用例
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS2(nums)); // 输出: 4
