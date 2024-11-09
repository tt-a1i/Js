// 第一个版本（保存最后一次调用）
function throttle1(fn, del) {
	var timeout = null;
	var lastArgs = null;
	return function (...args) {
		if (!timeout) {
			fn(...args);
			timeout = setTimeout(() => {
				lastArgs && fn(...lastArgs);
				lastArgs = null;
				timeout = null;
			}, del);
		} else lastArgs = args;
	};
}

// 第二个版本（丢弃中间调用）
function throttle2(fn, delay) {
	let timer = null;
	return function (...args) {
		if (!timer) {
			fn.apply(this, args);
			timer = setTimeout(() => {
				timer = null;
			}, delay);
		}
	};
}
let test = () => console.log(1);
let fn = throttle2(test, 3000);
fn(); // 应该会立即输出 1
setTimeout(fn, 1000); // 不会输出，因为在 3000ms 内
setTimeout(fn, 4000); // 应该会输出 1，因为超过了 3000ms
