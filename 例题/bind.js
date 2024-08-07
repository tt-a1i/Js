/**
 * 多次传入参数，返回绑定this之后的函数
 * 
 */
Function.prototype.myBind = function (context, ...args1) {
	const self = this;
	return function (...args2) {
		return self.apply(context, args1.concat(args2));
	};
};
function greet(greeting, punctuation) {
	console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

const boundGreet = greet.myBind(person, "Hello");
boundGreet("!"); // 输出: Hello, Alice!
