function shuffleArray(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let n = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[n]] = [
			arr[n],
			arr[i],
		];
	}
}
// 使用示例
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Original Array:", arr);
console.log("Shuffled Array:", shuffleArray(arr));
