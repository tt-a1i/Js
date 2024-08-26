function createRecursiveTimer(callback, maxTimes, delay) {
    let timer = null; // 定时器引用
    function executeRecursiveTimer(times = 0) {
        if (times >= maxTimes) {
            clearTimeout(timer); // 清除最后一个定时器
            return;
        }
        clearTimeout(timer); // 在每次递归调用之前清除现有定时器
        timer = setTimeout(() => {
            callback();
            executeRecursiveTimer(times + 1);
        }, delay);
    }
    return executeRecursiveTimer;
}

const logMessage = () => console.log('Hello, world!');
let startLogging = createRecursiveTimer(logMessage, 3, 1000);
startLogging(); // 执行递归定时器调用