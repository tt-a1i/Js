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