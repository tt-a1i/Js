/**
 * 多次传入参数，返回绑定this之后的函数
 *
 */
Function.prototype.Bind = function (context, ...args) {
	context = context || window;
	let fn = this;
	let f = Symbol();
	const result = function (...args1) {
		if (this instanceof fn) {
			// 如果是通过 new 调用的，this 是新创建的实例
			this[f] = fn; // 将原始函数暂时作为实例的一个属性
			let res = this[f](...args, ...args1); // 执行原函数
			delete this[f]; // 删除该临时属性
			return res; // 返回结果
		} else {
			// 普通函数调用时，绑定指定的 context
			context[f] = fn; // 将原函数作为 context 的一个临时属性
			let res = context[f](...args, ...args1); // 执行函数
			delete context[f]; // 删除临时属性
			return res; // 返回结果
		}
	};
	// 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
	// 实现继承的方式: 使用Object.create
	//即使执行了 result.prototype = Object.create(fn.prototype)，
	//代码也不会报错，只是生成的原型不会被使用
	result.prototype = Object.create(fn.prototype);
	return result;
};

function greet(greeting, punctuation) {
	console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

const boundGreet = greet.Bind(person, "Hello");
boundGreet("!"); // 输出: Hello, Alice!
