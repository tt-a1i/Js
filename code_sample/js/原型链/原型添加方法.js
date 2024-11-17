// 写一道题，在Array原型上添加一个两数之和的方法，会有多组，求乘积最大的一组
Array.prototype.twoSumMaxProduct = function (target) {
	// 初始化最大乘积和对应的组合
	let maxProduct = -Infinity;
	let maxPair = [];

	// 使用哈希表存储已经访问过的元素及其索引
	const map = new Map();

	// 遍历数组
	for (let i = 0; i < this.length; i++) {
		const complement = target - this[i];
		if (map.has(complement)) {
			// 计算当前组合的乘积
			const product = this[i] * complement;
			// 更新最大乘积和对应的组合
			if (product > maxProduct) {
				maxProduct = product;
				maxPair = [this[i], complement];
			}
		}
		// 将当前元素及其索引存入哈希表
		map.set(this[i], i);
	}

	// 返回乘积最大的组合
	return maxPair;
};

// 示例用法
const nums = [2, 7, 11, 15, 3, 6];
const target = 9;
const result = nums.twoSumMaxProduct(target);
console.log(result); // 输出: [3, 6]
