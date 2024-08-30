// 为Array.prototype添加一个last方法
Object.defineProperty(Array.prototype, "last", {
	value: function () {
		// 检查数组是否为空
		if (this.length === 0) {
			return undefined; // 或者抛出错误，取决于需求
		}
		// 返回数组的最后一个元素
		return this[this.length - 1];
	},
	writable: true,
	configurable: true,
	enumerable: false, // 设置为不可枚举，避免在遍历数组时出现
});

// 示例用法
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.last()); // 输出: 5

const emptyArray = [];
console.log(emptyArray.last()); // 输出: undefined