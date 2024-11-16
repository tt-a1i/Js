function createDeepObserver(target, callback) {
	const handler = {
		get(target, prop, receiver) {
			const value = Reflect.get(target, prop, receiver);

			if (value && typeof value === "object") {
				return new Proxy(value, handler);
			}

			return value;
		},
		set(target, prop, value, receiver) {
			const result = Reflect.set(target, prop, value, receiver);

			callback();

			return result;
		},
		deleteProperty(target, prop) {
			const result = Reflect.deleteProperty(target, prop);

			callback();

			return result;
		},
	};

	return new Proxy(target, handler);
}

const data = {
	a: 1,
	b: {
		c: 2,
	},
};

const observedData = createDeepObserver(data, () => {
	console.log("数据发生变化");
});

observedData.b.c = 3; // 输出：数据发生变化
delete observedData.b.c; // 输出：数据发生变化
observedData.d = { e: 4 }; // 输出：数据发生变化
observedData.d.e = 5; // 输出：数据发生变化
