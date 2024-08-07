Function.prototype.myCall = function (context, ...args) {
	context = context || window;

	const uniqueSymbol = Symbol("uniqueSymbol");
	context[uniqueSymbol] = this;

	const result = context[uniqueSymbol](...args);

    //清理现成，防止外部操作导致不必要的异常
	delete context[uniqueSymbol];

	return result;
};
function greet(greeting, punctuation) {
	console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Tom'}

greet.myCall(person, 'hello', '!')