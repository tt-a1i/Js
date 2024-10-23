function limitConcurrency(requests, limit) {
	let activeCount = 0;
	let activeIdx = 0;
    const results = new Array(requests.length).fill(null);
	return new Promise((resolve, reject) => {
		
		function next() {
			if (activeCount === 0 && activeIdx === requests.length) {
				resolve(results);
				return;
			}
			while (activeCount < limit && activeIdx < requests.length) {
				let resIdx = activeIdx;
				let request = requests[activeIdx++];
                activeCount++
				request()
					.then((res) => (results[resIdx] = res))
					.catch((err) => (results[resIdx] = err))
					.finally(() => {
						activeCount--;
						next();
					});
			}
		}
		next();
	});
}
const request = (i) => () =>
	new Promise((resolve) => {
		console.log(`Request ${i} started`);
		setTimeout(() => {
			resolve(`Request ${i} completed`);
			console.log(`Request ${i} completed`);
		}, Math.random() * 1000);
	});

const requests = Array.from({ length: 10 }, (_, i) => request(i));
limitConcurrency(requests, 2).then((results) => {
	console.log("All requests completed");
	console.log(results);
});
