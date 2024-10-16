Function.prototype.Bind = function(ctx, ...args){
	ctx = ctx || globalThis
	const fn = this
	const f = Symbol()
	const result = function (...moreArgs) {
        const isConstructor = this instanceof result;
        const target = isConstructor ? this : ctx;

        target[f] = fn;
        const res = target[f](...args, ...moreArgs);
        delete target[f];  // Cleanup symbol reference

        return res;
    };
	result.prototype = Object.create(fn.prototype)
	return result 
}

function greet(greeting, punctuation) {
	console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

const boundGreet = greet.Bind(person, "Hello");
boundGreet("!"); // 输出: Hello, Alice!


// function add(a, b, c) {
//     return a + b + c;
// }

// const boundAdd = add.Bind(null, 1, 2);
// console.log(boundAdd(3)); // 输出: 6