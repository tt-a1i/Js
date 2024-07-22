function myFlatten(arr, depth = Infinity) {
	const map = new WeakMap();
	function flatten(arr, depth) {
		if (depth < 1) return arr.slice();
		if (map.has(arr)) return map.get(arr);
		const result = [];
		map.set(arr, result);
		for (const item of arr) {
			if (Array.isArray(item)) {
				result.push(...flatten(item, depth - 1));
			}else{
                result.push(item)
            }
		}
        return result
	}
    return flatten(arr, depth)
}
// 创建一个循环引用的数组
const arr = [1, 2, [3, 4]];
arr[2].push(arr);

console.log(myFlatten(arr));
