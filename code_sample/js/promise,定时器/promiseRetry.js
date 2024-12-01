function promiseRetry(fn, times) {
    return new Promise((resolve, reject) => {
        function attempt() {
            fn()
                .then((res) => resolve(res))
                .catch((err) => {
                    if (times-- > 0) {
                        console.log('failed, retry, times:', times);
                        attempt();
                    } else {
                        reject(err);
                    }
                });
        }
        attempt();
    });
}
function func() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('err');
        }, 1000);
    });
}
promiseRetry(func, 3)
    .then((res) => console.log('success ', res))
    .catch((err) => console.log('failed ', err));

/**
 * 重试执行一个返回 Promise 的函数
 * @param {Function} fn - 返回 Promise 的函数
 * @param {number} retries - 最大重试次数
 * @param {number} delay - 每次重试之间的延迟时间（毫秒）
 * @returns {Promise} - 最终 Promise 的结果
 */
/*高级点的版本
async function promiseRetry(fn, retries, delay) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            // 尝试执行函数并返回结果
            return await fn();
        } catch (error) {
            if (attempt === retries) {
                // 如果达到最大重试次数，抛出错误
                console.log(`第 ${attempt} 次尝试失败`);
                throw error;
            }
            // 如果设置了延迟，则等待
            if (delay) {
                console.log(`第 ${attempt} 次尝试失败，${delay}ms 后重试...`);
                //这行代码的作用是在异步函数中创建一个暂停点，使函数在继续执行前等待指定的时间。
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
}
// 模拟一个可能会失败的异步任务
function unreliableTask() {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        console.log(`尝试执行任务，随机数: ${rand.toFixed(2)}`);
        if (rand < 0.99) {
            reject('任务失败');
        } else {
            resolve('任务成功');
        }
    });
}

// 使用 promiseRetry 函数重试执行 unreliableTask
promiseRetry(unreliableTask, 5, 1000)
    .then((result) => {
        console.log(`最终结果: ${result}`);
    })
    .catch((error) => {
        console.error(`所有重试都失败了: ${error}`);
    });

*/
