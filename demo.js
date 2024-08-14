function quickSort(arr, low = 0, high = arr.length - 1) {
	if (low < high) {
		let pivotInd = partition(arr, low, high);
		quickSort(arr, low, pivotInd - 1);
		quickSort(arr, pivotInd + 1, high);
	}
	return arr;
}
function partition(arr, low, high) {
	const pivot = arr[high];
	let i = low - 1;
	for (let j = low; j < high; j++) {
		if (arr[j] >= pivot) {
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}
	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	return i + 1;
}
console.log(quickSort([1,3,4,6,3,2]));

