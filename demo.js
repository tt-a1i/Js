Function.prototype.myApply = function(context, args){
	context = context || window
	const unique = Symbol()
	context[unique] = this
	const result = context[unique](...(args || []))
	delete context[unique]
	return result
}
function hello(name1, name2) {
	console.log(this.greet + ` ${name1} ${name2}`);
}
hello.myApply({ greet: "hello" }, ["tom", "jack"]);

Function.prototype.myCall = function(context, ...args){
	context = context || window
	const unique = Symbol()
	context[unique] = this
	const result = context[unique](...args)
	delete context[unique]
	return result
}
hello.myCall({greet: 'hello'}, 'tom', 'jack')


// Function.prototype.myBind = function(context, )
