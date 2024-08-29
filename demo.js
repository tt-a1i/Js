function myReduce(arr, callback, initialValue) {
	let accumulator = initialValue;
	let startIndex = 0;
	if (!accumulator) {
		if (arr.length === 0) {
			throw new TypeError("reduce of empty array with no initial value");
		}
		accumulator = arr[0];
		startIndex = 1;
	}
	for (let i = startIndex; i < arr.length; i++) {
		accumulator = callback(accumulator, arr[i], i, arr);
	}
	return accumulator;
}
let arr = [1,2,3,5]
let sum = myReduce(arr, (acc, curr) => acc += curr, 0)
console.log(sum);

