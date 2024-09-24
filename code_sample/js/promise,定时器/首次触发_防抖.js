function debounce(func, wait, immediate = false) {
    let timeout;

    return function(...args) {
        const context = this;

        const later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

// 使用示例
const myDebouncedFunction = debounce(() => {
    console.log('Function executed');
}, 2000, true);

// 这个函数将在第一次调用时立即执行
myDebouncedFunction();
// 如果在2秒内继续调用，上述函数将不会再次执行




/*
定义 timeout 变量以存储延时器 ID。
later 函数在延迟时间后执行，它只会在 immediate 为 false 的情况下调用 func。
callNow 变量用于判断是否应该立即调用 func，这发生在 immediate 为 true 且 timeout 尚未定义时（意味着这是第一次执行）。
clearTimeout(timeout): 如果防抖函数再次调用，就会清除当前的定时器，以便重置计时。
timeout = setTimeout(later, wait): 设置一个新的定时器，以便在指定延迟后调用 later 函数。
如果 callNow 是 true，立即调用 func。
当 immediate 设置为 true 时，防抖函数会在第一次调用立即执行 func，且在接下来的等待时间内不会再次调用。后续调用只有在等待时间过去后且没有继续调用时，才会再次执行（除非立刻又有其他调用重新开始计时） */