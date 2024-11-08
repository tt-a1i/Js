function curry(fn) {
	// your code here
	return function helper(...args) {
		if (args.length >= fn.length) {
            console.log('args:', args)
			return fn(...args);
		} else {
			return function (...moreArgs) {
				return helper(...args.concat(moreArgs));
			};
		}
	};
}
const join = (a, b, c) => {
	console.log(`${a}_${b}_${c}`) ;
};
const curriedJoin = curry(join);
curriedJoin(1, 2, 3); // '1_2_3'
curriedJoin(1)(2, 3); // '1_2_3'
curriedJoin(1, 2)(3); // '1_2_3'
curriedJoin(1)(2)(3)
