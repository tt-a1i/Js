function myNew(constructor, ...args) {
	const obj = {};
	Object.setPrototypeOf(obj, constructor.prototype);
	const result = constructor.apply(obj, args);
	return result instanceof Object ? result : obj;
}
function Animal(name) {
	this.name = name;
}
let tiger = myNew(Animal, "tiger");
console.log(tiger.name);
