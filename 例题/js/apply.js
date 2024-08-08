/**
 *
 * @param {object} context
 * @param {Array} args
 * 数组，一次性传入参数，立即执行
 */
Function.prototype.myApply = function (context, args) {
	context = context || window;

	//使用symbol防止影响到context内部状态
	const fnSymbol = Symbol("fn");
	context[fnSymbol] = this;
	//context[fnSymbol] 是什么？
	//context[fnSymbol] 是一个对当前函数（即 this）的引用。通过 context[fnSymbol] = this，我们将当前函数（this）赋值给 context 对象的 fnSymbol 属性。
	//this 能传参吗？
	//是的，this 是一个函数对象，函数对象是可以被调用并传递参数的。在 JavaScript 中，函数也是对象，所以 this 作为一个函数对象是可以被调用的。

	const result = context[fnSymbol](...(args || []));

	delete context[fnSymbol];
	return result;
};

function greet(greeting, punctuation) {
	console.log(greeting + " " + this.name + punctuation);
}

const person = { name: "Alice" };

greet.myApply(person, ["Hello", "!"]); // 输出: "Hello Alice!"

// 测试不传递 context
// const globalResult = greet.myApply(null, ["Hi", "."]);
// console.log(globalResult); // 在浏览器中输出: "Hi undefined."
