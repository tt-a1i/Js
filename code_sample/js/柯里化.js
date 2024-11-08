function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...moreArgs) {
				//这里是用了apply所以传数组, 如果直接传递需要...运算符, 
				//因为在计算函数参数的时候1个数组只算一个参数,并不会计算数组元素数量
				return curried.apply(this, args.concat(moreArgs));
			};
		}
	};
}
function add(a, b, c) {
	return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6
console.log(curriedAdd(1, 2, 3)); // 输出 6
