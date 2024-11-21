/**
 * 归并排序主函数
 * @param {Array} arr - 需要排序的数组
 * @returns {Array} - 排序后的数组
 */
function mergeSort(arr) {
	// 如果数组长度小于或等于1，直接返回数组，因为单个元素或空数组已经是有序的
	if (arr.length <= 1) {
		return arr;
	}

	// 计算数组的中间位置
	const mid = Math.floor(arr.length / 2);

	// 将数组分割成左右两部分
	const left = arr.slice(0, mid);
	const right = arr.slice(mid);

	// 递归地对左右两部分进行排序
	const sortedLeft = mergeSort(left);
	const sortedRight = mergeSort(right);

	// 合并排序后的左右两部分
	return merge(sortedLeft, sortedRight);
}

/**
 * 合并两个有序数组
 * @param {Array} left - 左侧有序数组
 * @param {Array} right - 右侧有序数组
 * @returns {Array} - 合并后的有序数组
 */
function merge(left, right) {
	let result = []; // 用于存储合并后的结果
	let leftIndex = 0; // 左侧数组的索引
	let rightIndex = 0; // 右侧数组的索引

	// 比较左右两个数组的元素，将较小的元素放入结果数组
	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] <= right[rightIndex]) {
			result.push(left[leftIndex]);
			leftIndex++;
		} else {
			result.push(right[rightIndex]);
			rightIndex++;
		}
	}

	// 如果左侧数组还有剩余元素，将其添加到结果数组
	while (leftIndex < left.length) {
		result.push(left[leftIndex]);
		leftIndex++;
	}

	// 如果右侧数组还有剩余元素，将其添加到结果数组
	while (rightIndex < right.length) {
		result.push(right[rightIndex]);
		rightIndex++;
	}

	return result;
}

// 测试用例
const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // 输出: [3, 9, 10, 27, 38, 43, 82]
