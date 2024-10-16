function limitConcurrency(requests, limit) {
	let activeCount = 0;
	let currentIndex = 0;
	let results = Array(requests.length).fill(undefined); // 预先填充Undefined
	return new Promise((resolve, reject) => {
		function next() {
			if (currentIndex === requests.length && activeCount === 0) {
				resolve(results);
				return;
			}
			//在并发限制下运行请求
			while (activeCount < limit && currentIndex < requests.length) {
				const requestIndex = currentIndex++;
				const request = requests[requestIndex];

				activeCount++;
				request()
					.then((result) => {
						results[requestIndex] = result;
					})
					.catch((error) => {
						results[requestIndex] = error;
					})
					.finally(() => {
						activeCount--;
						next(); //递归调用，执行下一个请求
					});
			}
		}
		next();
	});
}

// 示例：使用以上的 limitConcurrency 函数
const request = (i) => () =>
	new Promise((resolve) => {
		console.log(`Request ${i} started`);
		setTimeout(() => {
			resolve(`Request ${i} completed`);
			console.log(`Request ${i} completed`);
		}, Math.random() * 1000);
	});

const requests = Array.from({ length: 10 }, (_, i) => request(i));
limitConcurrency(requests, 3).then((results) => {
	console.log("All requests completed");
	console.log(results);
});
