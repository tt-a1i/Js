console.log("脚本开始");

setTimeout(() => {
	console.log("宏任务：setTimeout");
}, 0);

Promise.resolve().then(() => {
	console.log("微任务：Promise");
});

requestAnimationFrame(() => {
	console.log("requestAnimationFrame");
});

console.log("脚本结束");
