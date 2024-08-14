function quickSort(arr, low = 0, high = arr.length - 1) {
	while (low < high) {
		let pivotIndex = partition(arr, low, high);
		quickSort(arr, low, pivot - 1);
		quickSort(arr, pivot + 1, high);
	}
	return arr;
}
function partition(arr, low, high) {
	const pivot = arr[high];
	let i = low - 1;
	for (let j = low; j < high; j++) {
		if (arr[j] <= pivot) {
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}
	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	return i + 1;
}
