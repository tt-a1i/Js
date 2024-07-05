var threeSum = function (nums) {
    //关键在于边界判断
	if (!nums || nums.length < 3) return;
	let res = [];
	nums.sort((a, b) => a - b);
    //使用下标来操作不要用forin
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 0) break;
		let l = i + 1,
			r = nums.length - 1;
        //剪枝去重,注意边界
		if (i > 0 && nums[i] === nums[i - 1]) continue;
        //边界
		while (l < r) {
			let sum = nums[i] + nums[l] + nums[r];
			if (sum === 0) {
				res.push([nums[i], nums[l], nums[r]]);
                //边界
				while (l < r && nums[l] === nums[l + 1]) l++;
				while (l < r && nums[r] === nums[r - 1]) r--;
				l++;
				r--;
			} else if (sum < 0) l++;
			else if (sum > 0) r--;
		}
	}
	return res;
};
let nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
