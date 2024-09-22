class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态为 pending
    this.value = undefined; // 存储决议值
    this.handlers = []; // 存储 then 和 catch 的回调函数

    try {
      executor(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve = (value) => {
    // 如果不是 pending 状态，忽略
    if (this.state !== 'pending') return;
    // 模拟真实的 Promise 行为，使用 setTimeout 来异步执行
    setTimeout(() => {
      if (value && typeof value.then === 'function') {
        return value.then(this._resolve, this._reject);
      }
      this.state = 'fulfilled'; // 状态变为 fulfilled
      this.value = value;
      this.handlers.forEach((h) => this._handle(h));
    });
  };

  _reject = (error) => {
    if (this.state !== 'pending') return;
    setTimeout(() => {
      this.state = 'rejected'; // 状态变为 rejected
      this.value = error;
      this.handlers.forEach((h) => this._handle(h));
    });
  };

  _handle(handler) {
    if (this.state === 'pending') {
      this.handlers.push(handler);
    } else {
      if (this.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
        setTimeout(() => {
          handler.onFulfilled(this.value);
        });
      } else if (this.state === 'rejected' && typeof handler.onRejected === 'function') {
        setTimeout(() => {
          handler.onRejected(this.value);
        });
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._handle({
        onFulfilled: value => {
          // 提供默认处理函数
          if (!onFulfilled) {
            resolve(value);
          } else {
            try {
              resolve(onFulfilled(value));
            } catch (error) {
              reject(error);
            }
          }
        },
        onRejected: error => {
          if (!onRejected) {
            reject(error);
          } else {
            try {
              resolve(onRejected(error));
            } catch (error) {
              reject(error);
            }
          }
        }
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

async function runTests() {
  console.log('测试用例1: 异步决议');
  let promise1 = new MyPromise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, 100);
  });

  promise1.then((value) => {
    console.log(value); // 应该输出 'success'
  });

  console.log('测试用例2: 异步拒绝');
  let promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('failure'));
    }, 100);
  });

  promise2.catch((reason) => {
    console.error(reason.message); // 应该输出 'failure'
  });

  console.log('测试用例3: 执行器函数抛出错误');
  let promise3 = new MyPromise(() => {
    throw new Error('failure');
  });

  promise3.catch((reason) => {
    console.error(reason.message); // 应该输出 'failure'
  });
}

runTests();