function get(object, path, defaultValue) {
	//路径转换为数组
	// const pathArray = Array.isArray(path)
	// 	? path
	// 	: path.replace(/\[(\d+)\]/g, ".$1").split(".");
	const pathArray = Array.isArray(path) ? path: path.split('.')
	let result = object;
	for (const key of pathArray) {
		result = result ? result[key] : undefined;
		if (result === undefined) return defaultValue;
	}
	return result;
}

const obj = { a: { b: { c: 42 } } };

console.log(get(obj, 'a.b.c')); // 输出: 42
console.log(get(obj, 'a.b.d', 'default')); // 输出: 'default'
console.log(get(obj, ['a', 'b', 'c'])); // 输出: 42
console.log(get(obj, 'a.b.c.d', 'default')); // 输出: 'default'
