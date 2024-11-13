function deleteNth(arr, n) {
	const map = new Map();
	return arr.filter((num, index) => {
		if (map.has(num)) {
			if (map.get(num) === n) return false;
            map.set(num, (map.get(num) || 0) + 1);
			return true;
		} else {
			map.set(num, (map.get(num) || 0) + 1);
			return true;
		}
	});
}
console.log(deleteNth([1,1,3,3,7,2,2,2,2], 3))
