function Person(name) {
	this.name = name;
}

const alice = new Person("Alice");

console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true

// 自定义 instanceof 检查
function customInstanceOf(instance, constructor) {
	let proto = Object.getPrototypeOf(instance);
	const prototype = constructor.prototype;

	while (proto !== null) {
		if (proto === prototype) {
			return true;
		}
		proto = Object.getPrototypeOf(proto);
	}

	return false;
}

console.log(customInstanceOf(alice, Person)); // true
console.log(customInstanceOf(alice, Object)); // true
