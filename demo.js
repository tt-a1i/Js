// 保存原始的 Array 原型
const arrayProto = Array.prototype;

// 创建一个新的对象继承自 Array.prototype
const arrayMethods = Object.create(arrayProto);

// 需要拦截的数组方法
const methodsToPatch = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
];

// 重写这些方法
methodsToPatch.forEach(function (method) {
	const original = arrayProto[method]; // 保存原始方法
	Object.defineProperty(arrayMethods, method, {
		value: function (...args) {
			const result = original.apply(this, args); // 调用原始方法

			// 获取该数组的观察者对象
			const ob = this.__ob__;

			// 对新增元素进行响应式处理
			let inserted;
			switch (method) {
				case "push":
				case "unshift":
					inserted = args;
					break;
				case "splice":
					inserted = args.slice(2); // splice 的第三个参数是新插入的元素
					break;
			}
			if (inserted) ob.observeArray(inserted); // 对新增元素进行响应式处理

			// 通知依赖更新
			ob.dep.notify();

			return result;
		},
		configurable: true,
		writable: true,
	});
});
const data = [];
data.__proto__ = arrayMethods; // 手动设置响应式

data.__ob__ = {
	dep: {
		notify: () => console.log("视图更新！"),
	},
	observeArray: (items) => console.log("新元素变为响应式", items),
};

data.push(1); // 输出：新元素变为响应式 [1]，视图更新！
data.pop(); // 输出：视图更新！
