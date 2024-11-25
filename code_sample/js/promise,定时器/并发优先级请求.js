class RequestQueue {
	constructor(maxConcurrent = 10) {
		this.maxConcurrent = maxConcurrent;
		this.running = 0;
		this.queue = [];
	}

	add(task, priority = 0) {
		return new Promise((resolve, reject) => {
			this.queue.push({ task, priority, resolve, reject });
			this.queue.sort((a, b) => b.priority - a.priority);
			this.run();
		});
	}

	async run() {
		if (this.running >= this.maxConcurrent || this.queue.length === 0) {
			return;
		}

		this.running++;
		const { task, resolve, reject } = this.queue.shift();

		try {
			const result = await task();
			resolve(result);
		} catch (error) {
			reject(error);
		} finally {
			this.running--;
			this.run();
		}
	}
}

const requestQueue = new RequestQueue(10);

function myFetch(url, options = {}, priority = 0) {
	return requestQueue.add(() => fetch(url, options), priority);
}

// Usage example:
//myFetch('https://api.example.com/data', {}, 2); // High priority
//myFetch('https://api.example.com/data', {}, 0); // Normal priority
