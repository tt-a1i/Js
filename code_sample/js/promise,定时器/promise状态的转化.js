// 定义一个会抛出异常的函数
let p;
function throwError() {
	return p = new Promise((resolve, reject) => {
		// 模拟异步操作
		setTimeout(() => {
			// 抛出异常
			reject(new Error("发生错误"));
		}, 1000);
	});
}

// 链式调用 Promise
throwError()
	.then(() => {
		console.log("这是第一个 .then 调用");
		// 这里可以返回一个值或者另一个 Promise
		return "第一个 then 的结果";
	})
	.then((result) => {
		console.log(result);
		// 再次抛出异常
		throw new Error("第二个 then 中的错误");
	})
	.catch((error) => {
		// 捕获第一个 .then 中的异常
		console.error("第一个 .catch 捕获:", error.message);
		console.log(p)
	
	})
	.then(() => {
		console.log("这是第三个 .then 调用");
		console.log(p)
		// 返回一个值
		return "第三个 then 的结果";
	})
	.catch((error) => {
		// 捕获第二个 .then 中的异常
		console.error("第二个 .catch 捕获:", error.message);
	})
	.then((result) => {
		console.log(result);
		console.log(p)
	})
	.catch((error) => {
		// 捕获任何在链中发生的异常
		console.error("最终 .catch 捕获:", error.message);
	});
