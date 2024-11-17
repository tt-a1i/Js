//bind 方法会创建一个新的函数，这个新函数的 this 值会被永久绑定到 bind 方法的第一个参数。
//这意味着，无论新函数如何被调用，其 this 值都不会改变
const a = {
	method: function () {
		console.log(this);
	},
};

const b = {
	prop: "b",
};

const c = {
	prop: "c",
};

a.method.bind(b).call(c); // 输出: { prop: 'b' }
