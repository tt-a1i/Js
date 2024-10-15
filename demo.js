function quickSort(arr, low = 0, high = arr.length - 1) {
	if (low < high) {
		let pivotIdx = partition(arr, low, high);
		quickSort(arr, low, pivotIdx - 1);
		quickSort(arr, pivotIdx + 1, high);
	}
	return arr;
}
function partition(arr, low, high) {
	let pivot = arr[high];
	let i = low - 1;
	for (let j = low; j < high; j++) {
		if (arr[j] <= pivot) {
            i++
            [arr[i], arr[j]] = [arr[j], arr[i]]
		}
	}
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    return i + 1
}
let arr = [1,3,4,2,6,9,6]
console.log(quickSort(arr));

