//洗牌算法
function shuffleArray(array) {
	// 创建数组的一个副本，以避免修改原始数组
	let arr = array.slice();

	for (let i = arr.length - 1; i > 0; i--) {
		// 随机选择一个索引，范围从 0 到 i
		const j = Math.floor(Math.random() * (i + 1));

		// 交换 arr[i] 和 arr[j]
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}
// 示例
const originalArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffleArray(originalArray);

console.log("Original Array:", originalArray);
console.log("Shuffled Array:", shuffledArray);

console.log("====================================");

//sort方法
function shuffleArray2(array) {
	return array.sort(() => Math.random() - 0.5);
}

// 示例
//sort的时间复杂度是O(n Log n)
const originalArray2 = [1, 2, 3, 4, 5];
const shuffledArray2 = shuffleArray2(originalArray);

console.log("Original Array:", originalArray2);
console.log("Shuffled Array:", shuffledArray2);
