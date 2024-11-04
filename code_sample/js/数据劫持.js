let obj1 = {
	a: 1,
};
Object.defineProperty(obj1, "a", {
	get() {
		console.log("get trigger");
		return Reflect.get(obj1, "_a");
	},
	set(value) {
		console.log("set trigger");
		return Reflect.set(obj1, "_a", value);
	},
});
obj1.a;
obj1.a = 2;


console.log('\n', '---------------------------------------------------------------', '\n');




let obj2 = {
	a: 1,
};

// 创建一个 handler 对象，定义代理的行为
let handler = {
	// 捕获属性读取操作
	get: function (target, property, receiver) {
		console.log(
			`Property ${property} has been read with value ${target[property]}`
		);
		return Reflect.get(target, property, receiver);
	},
	// 捕获属性设置操作
	set: function (target, property, value, receiver) {
		console.log(`Property ${property} set to ${value}`);
		return Reflect.set(target, property, value, receiver);
	},
};

let proxy = new Proxy(obj2, handler);

console.log(proxy.a); 

proxy.a = 2;
console.log(proxy.a); 
