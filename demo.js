function sumPairs(ints, s) {
	const map = new Map();
	let m = null,
		n = null;
	for (let i = 0; i < ints.length; i++) {
		if (map.has(s - ints[i])) {
			if (!m && !n) {
				m = s - ints[i];
				n = ints[i];
			}
			else if (i < map.get(n)) {
				m = s - ints[i];
				n = ints[i];
			}
		}
		map.set(ints[i], i);
	}
	return !m ? undefined : [m, n];
}
let ints = [1, -2, 3, 0, -6, 1];
console.log(sumPairs(ints, -6));
