const arr = [1, [2, 3, [4]], [5, [6, 7, [8]]]];
function maxArrDepth(arr) {
	if (!Array.isArray(arr)) return 0;
	let depth = 0;
	for (const item of arr) {
		depth = Math.max(depth, maxArrDepth(item) + 1);
	}
	return depth;
}
console.log(maxArrDepth(arr));
