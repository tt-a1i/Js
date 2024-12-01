/**
 * 串行执行多个 Promise
 * @param {Array<Function>} promiseFactories - 返回 Promise 的函数数组
 * @return {Promise<Array>} - 包含所有 Promise 结果的数组
 */
function runPromisesSerially(promiseFactories) {
    const results = [];
    let sequence = Promise.resolve();

    promiseFactories.forEach((promiseFactory, index) => {
        sequence = sequence
            .then(() => promiseFactory())
            .then((result) => {
                results.push(result);
            })
            .catch((error) => {
                // 如果需要在某个 Promise 失败时停止整个序列，可以抛出错误
                // 否则，可以选择记录错误并继续
                throw error;
                // 或者使用 results.push({ error });
            });
    });

    return sequence.then(() => results);
}
// 示例异步函数，返回 Promise
function asyncTask(time, value) {
    return () =>
        new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Task ${value} completed after ${time}ms`);
                resolve(value);
            }, time);
        });
}

// 创建多个 Promise 工厂函数
const tasks = [
    asyncTask(1000, 'A'),
    asyncTask(500, 'B'),
    asyncTask(1500, 'C'),
    asyncTask(700, 'D'),
];

// 串行执行 Promise
runPromisesSerially(tasks)
    .then((results) => {
        console.log('All tasks completed. Results:', results);
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });
