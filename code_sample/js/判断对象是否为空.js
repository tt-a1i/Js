const obj = {};

function isEmpty1(obj) {
	return Object.keys(obj).length === 0;
}
console.log(isEmpty1({})); // 输出: true
console.log(isEmpty1({ key: "value" })); // 输出: false

console.log('---------------------------------------------------')

function isEmpty2(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}
console.log(isEmpty2({})); // 输出: true
console.log(isEmpty2({ key: "value" })); // 输出: false

console.log('---------------------------------------------------')


function isEmpty3(obj) {
	return JSON.stringify(obj) === "{}";
}
console.log(isEmpty3({})); // 输出: true
console.log(isEmpty3({ key: "value" })); // 输出: false

console.log('---------------------------------------------------')


function isEmpty4(obj) {
	return Object.entries(obj).length === 0;
}
console.log(isEmpty4({})); // 输出: true
console.log(isEmpty4({ key: "value" })); // 输出: false

console.log('---------------------------------------------------')


function isEmpty5(obj) {
	return Object.getOwnPropertyNames(obj).length === 0;
}
console.log(isEmpty5({})); // 输出: true
console.log(isEmpty5({ key: "value" })); // 输出: false

console.log('---------------------------------------------------')


function isEmpty6(obj) {
	return Reflect.ownKeys(obj).length === 0;
}
console.log(isEmpty6({})); // 输出: true
console.log(isEmpty6({ key: "value" })); // 输出: false
