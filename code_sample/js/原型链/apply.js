/**
 *
 * @param {object} context
 * @param {Array} args
 * 数组，一次性传入参数，立即执行
 */
Function.prototype.myApply = function(context, args){
	context = context || globalThis
	const unique = Symbol()
	context[unique] = this
	const result = context[unique](...(args || []))
	delete context[unique]
	return result
}

function greet(greeting, punctuation) {
	console.log(greeting + " " + this.name + punctuation);
}

const person = { name: "Alice" };

greet.myApply(person, ["Hello", "!"]); // 输出: "Hello Alice!"

// 测试不传递 context
// const globalResult = greet.myApply(null, ["Hi", "."]);
// console.log(globalResult); // 在浏览器中输出: "Hi undefined."
