async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processArray() {
	for (const n of [1, 2, 3, 4, 5]) {
		await sleep(1000);
		console.log(n);
	}
}

processArray();
