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
