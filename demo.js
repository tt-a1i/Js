function preciseTimer(callback, interval, times) {
	let startTime = Date.now();
	let count = 0;
	let requestId = null;

	function tick() {
		const now = Date.now();
		const elapsed = now - startTime;

		if (elapsed >= interval) {
			callback();
			count++;
			startTime = now;

			if (count === times) {
				cancelAnimationFrame(requestId);
				return;
			}
		}

		requestId = requestAnimationFrame(tick);
	}

	requestId = requestAnimationFrame(tick);

	return {
		clear: function () {
			cancelAnimationFrame(requestId);
		},
	};
}

// 使用示例
let i = 0;
const timer = preciseTimer(
	() => {
		console.log(`执行第 ${i + 1} 次，当前时间: ${new Date().toISOString()}`);
		i++;
	},
	1000,
	5
);
