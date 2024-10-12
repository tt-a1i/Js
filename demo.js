function myNew(constructor, ...args) {
	const obj = {};
	Object.setPrototypeOf(obj, constructor.prototype);
	const copy = constructor.apply(obj, args);
	return copy instanceof Object ? copy : obj;
}
function Test(name) {
	this.name = name;
}
const test = myNew(Test, "tom");
console.log(test.name);
console.log(test instanceof Test);

console.dir(test);
