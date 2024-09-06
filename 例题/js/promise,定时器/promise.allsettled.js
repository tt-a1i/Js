// 自定义实现 Promise.allSettled
function allSettled(promises) {
    return new Promise((resolve) => {
        // 用于存储所有结果
        const results = [];
        // 计数已处理的 promise
        let completedPromises = 0;

        // 对每一个 promise 进行处理
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = { status: 'fulfilled', value };
                completedPromises++;
                // 所有 promise 已处理完毕时，解析最终结果
                if (completedPromises === promises.length) {
                    resolve(results);
                }
            }).catch(reason => {
                results[index] = { status: 'rejected', reason };
                completedPromises++;
                // 所有 promise 已处理完毕时，解析最终结果
                if (completedPromises === promises.length) {
                    resolve(results);
                }
            });
        });

        // 若为空数组，立即解析空结果数组
        if (promises.length === 0) {
            resolve(results);
        }
    });
}

// 示例
const promise1 = Promise.resolve(42);
const promise2 = Promise.reject('Error occurred');
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, 'Delayed'));

allSettled([promise1, promise2, promise3]).then(results => {
    console.log(results); // 输出每个 promise 的状态和结果
});