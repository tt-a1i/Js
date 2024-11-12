// 自定义实现 Promise.allSettled
function allSettled(promises) {
	return new Promise((resolve) => {
		const results = [];
		let computed = 0;

		// 若为空数组，立即解析空结果数组
		if (promises.length === 0) {
			resolve(results);
			return;
		}

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((value) => {
					results[index] = { status: "fulfilled", value };
				})
				.catch((reason) => {
					results[index] = { status: "rejected", reason };
				})
				.finally(() => {
					computed++;
					if (computed === promises.length) {
						resolve(results);
					}
				});
		});
	});
}

//示例
const promises = [
	Promise.resolve(42), // 将解决为数字 42
	Promise.reject("Error occurred"), // 将被拒绝，并带有错误信息 "Error occurred"
	new Promise((resolve, reject) =>
		setTimeout(resolve, 100, "Delayed resolution")
	), // 100ms 后解决为 "Delayed resolution"
	new Promise((resolve, reject) => setTimeout(reject, 50, "Delayed rejection")), // 50ms 后被拒绝，并带有错误信息 "Delayed rejection"
];

allSettled(promises).then((results) => {
	console.log(results); // 输出每个 promise 的状态和结果
});
