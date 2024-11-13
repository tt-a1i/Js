function myPromiseRace(promises) {
	if (!promises[Symbol.iterator]) {
		throw Error("error");
	}
	const promiseArr = Array.from(promises);
	return new Promise((resolve, reject) => {
		let settled = false; // 标记是否已经 settled
		for (let promise of promiseArr) {
			Promise.resolve(promise)
				.then((res) => {
					if (!settled) {
						settled = true; // 标记为已解决
						resolve(res);
					}
				})
				.catch((err) => {
					if (!settled) {
						settled = true; // 标记为已拒绝
						reject(err);
					}
				});
		}
	});
}

const promises = [
	Promise.reject(1),
	Promise.reject(2),
	Promise.resolve(3),
	Promise.reject(4),
];
myPromiseRace(promises)
	.then((res) => console.log("res", res))
	.catch((err) => console.log("rej", err));
/* 在 Promise.race 中，当第一个 Promise 被兑现（resolve）或拒绝（reject）后，
后续的 Promise 仍然会继续执行，
但它们的结果不会影响已经完成的 Promise.race 返回的 Promise 实例
一旦 Promise 实例完成，它的状态就固定下来，不会再改变
 
Promise.myRace = function (promises) {
	return new Promise((resolve, reject) => {
		// 遍历传入的每一个 Promise 实例
		promises.forEach((promise) => {
			// 将每个 Promise 转换为真正的 Promise 对象（处理可能不是 Promise 的情况）
			Promise.resolve(promise).then(
				// 如果有一个 Promise 状态变为 fulfilled，则 resolve 新的 Promise
				(value) => resolve(value),
				// 如果有一个 Promise 状态变为 rejected，则 reject 新的 Promise
				(reason) => reject(reason)
			);
		});
	});
};

// 测试示例
const promise1 = new Promise((resolve) =>
	setTimeout(() => resolve("one"), 500)
);
const promise2 = new Promise((resolve) =>
	setTimeout(() => resolve("two"), 100)
);

Promise.myRace([])
	.then((result) => console.log(result)) // 输出 "two"
	.catch((error) => console.error(error)); // 如果有错误，输出错误

*/