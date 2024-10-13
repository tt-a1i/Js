const original = {
	a: 1,
	b: [2, 3],
	c: {
		d: 4,
		func: function () {
			console.log("Function");
		},
	},
	e: undefined,
	f: NaN,
	g: Infinity,
	h: Symbol("h"),
	i: { j: undefined, k: NaN, l: Infinity, m: Symbol("m") },
	o: new Date()
};

// 创建循环引用
// original.i.n = original;

const stringified = JSON.stringify(original);
const parsed = JSON.parse(stringified);

console.log(parsed);
