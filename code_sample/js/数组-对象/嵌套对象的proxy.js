const handler = {
	get(target, property, receiver) {
		const value = Reflect.get(target, property, receiver);
		console.log(`get property ${property} value is ${JSON.stringify(value)}`);
		if (typeof value === "object" && value !== null) {
			return new Proxy(value, handler);
		}
		return value;
	},
	set(target, property, value, receiver) {
		console.log(`Setting property "${property}" to "${value}"`);
		return Reflect.set(target, property, value, receiver);
	},
};

const nestedObject = {
	a: 1,
	b: {
		c: 2,
		d: {
			e: 3,
		},
	},
};
const obj = new Proxy(nestedObject, handler);
obj.a
obj.b.c = 4;
