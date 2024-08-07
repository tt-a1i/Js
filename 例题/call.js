/**
 *手写call
 *call是参数列表，一次性传入参数
 */
Function.prototype.myCall = function(context, ...args) {
    context = context || window;

    const unique = Symbol('unique');
    context[unique] = this;

    const result = context[unique](...args);

    delete context[unique];

    return result;
}

function greet(greeting, punctuation) {
	console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Tom'}

greet.myCall(person, 'hello', '!')