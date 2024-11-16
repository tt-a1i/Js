function observe(obj, callback) {
	Object.keys(obj).forEach((key) => {
		let value = obj[key];

		// 如果值是对象，则递归调用 observe 函数
		if (typeof value === "object" && value !== null) {
			observe(value, callback);
		}

		Object.defineProperty(obj, key, {
			get() {
				return value;
			},
			set(newValue) {
				if (newValue !== value) {
					value = newValue;

					// 如果新值是对象，则递归调用 observe 函数
					if (typeof value === "object" && value !== null) {
						observe(value, callback);
					}

					callback();
				}
			},
			configurable: true,
			enumerable: true,
		});
	});

	return obj;
}

const data = {
	a: 1,
	b: {
		c: 2,
	},
};

observe(data, () => {
	console.log("数据发生变化");
});

data.b.c = 3; // 输出：数据发生变化
