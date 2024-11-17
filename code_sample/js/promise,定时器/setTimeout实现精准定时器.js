function preciseSetInterval(callback, interval, ...args) {
    let start = Date.now();
    let handle;
	let stop = false
    function loop() {
		if(stop) return
        const now = Date.now();
        const elapsed = now - start;
        const remaining = interval - (elapsed % interval);
        // 调用回调函数
        callback(...args);

        // 设置下一个定时任务
        handle = setTimeout(loop, remaining);
    }

    // 启动第一个定时任务
    handle = setTimeout(loop, interval);

    // 返回一个清除定时器的函数
    return {
        clear: function () {
			stop = true
            clearTimeout(handle);
        },
    };
}

// 使用示例
const interval = 1000; // 每1秒执行一次
const count = 5; // 执行5次

let i = 0;
const timer = preciseSetInterval(() => {
    console.log(`执行第 ${i + 1} 次，当前时间: ${new Date().toISOString()}`);
    i++;
    if (i === count) {
        timer.clear(); // 达到指定次数后停止
    }
}, interval);
