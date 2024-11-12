function intersect(...arrays) {
	return arrays.reduce((acc, arr) => {
		return acc.filter((item) => arr.includes(item));
	});
}

// 示例用法
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
const array3 = [5, 6, 7, 8, 9];

console.log(intersect(array1, array2, array3)); // 输出: [5]
