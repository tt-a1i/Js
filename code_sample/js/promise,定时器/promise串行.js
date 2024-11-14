function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function createPromise(value, delayTime) {
	return () =>
		delay(delayTime).then(() => {
			console.log(`Promise ${value} resolved`);
			return value;
		});
}

const promises = [
	createPromise(1, 1000),
	createPromise(2, 2000),
	createPromise(3, 1500),
];

function runSerial(promises) {
	return promises.reduce((promiseChain, currentPromise) => {
		return promiseChain.then((results) =>
			currentPromise().then((currentResult) => [...results, currentResult])
		);
	}, Promise.resolve([]));
}

runSerial(promises)
	.then((results) => {
		console.log("All promises resolved:", results);
	})
	.catch((error) => {
		console.error("Error occurred:", error);
	});
