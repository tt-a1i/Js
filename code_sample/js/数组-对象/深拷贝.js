function deepCopy(obj, cache = new WeakMap()) {
	// 基本数据类型直接返回
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	// 检查是否已经拷贝过该对象，避免循环引用
	if (cache.has(obj)) {
		return cache.get(obj);
	}

	// 处理特殊对象类型
	if (obj instanceof Date) {
		return new Date(obj);
	}

	if (obj instanceof RegExp) {
		return new RegExp(obj);
	}

	// 创建新的数组或对象
	const copy = Array.isArray(obj) ? [] : {};
	cache.set(obj, copy);

	// 处理数组和普通对象
    //缺点:Object.keys在处理数组时会遍历数组的索引，可能会带来一些性能开销
	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key], cache);
	});

	return copy;

    /*
    未简写版本
    // 处理数组
    if (Array.isArray(obj)) {
        const copy = [];
        cache.set(obj, copy);
        obj.forEach((item, index) => {
            copy[index] = deepCopy(item, cache);
        });
        return copy;
    }

    // 处理普通对象
    const copy = {};
    cache.set(obj, copy);
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
    */
}

// 示例使用
const original = {
	a: 1,
	b: {
		c: 2,
		d: [3, 4, { e: 5 }],
	},
	f: new Date(),
	g: /abc/i,
	h: function () {
		console.log("Hello");
	},
};

const copied = deepCopy(original);

console.log(copied);
console.log(copied.b.d[2] === original.b.d[2]); // false，表示深拷贝成功
console.log(JSON.parse(JSON.stringify(original)));

//d: [3, 4, { e: 5 }],为什么这部分输出的是d: [ 3, 4, [Object] ]
//会简化输出, 浏览器运行就可以展开了
