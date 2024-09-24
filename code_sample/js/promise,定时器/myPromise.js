class MyPromise {
	constructor(executor) {
		this.status = "pending"; // 初始状态为 pending
		this.value = undefined; // 成功时的值
		this.reason = undefined; // 失败时的原因
		this.onResolvedCallbacks = []; // 存储成功回调
		this.onRejectedCallbacks = []; // 存储失败回调

		// resolve 函数，用来将 promise 的状态从 pending 改为 fulfilled
		const resolve = (value) => {
			if (this.status === "pending") {
				this.status = "fulfilled";
				this.value = value;
				this.onResolvedCallbacks.forEach((fn) => fn()); // 执行所有成功的回调
			}
		};

		// reject 函数，用来将 promise 的状态从 pending 改为 rejected
		const reject = (reason) => {
			if (this.status === "pending") {
				this.status = "rejected";
				this.reason = reason;
				this.onRejectedCallbacks.forEach((fn) => fn()); // 执行所有失败的回调
			}
		};

		try {
			executor(resolve, reject); // 立即执行 executor 函数
		} catch (err) {
			reject(err); // 如果执行过程中有错误，直接执行 reject
		}
	}

	// then 方法，实现链式调用
	then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === "function" ? onFulfilled : (value) => value;
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: (reason) => {
						throw reason;
				  };

		return new MyPromise((resolve, reject) => {
			if (this.status === "fulfilled") {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value);//如果这行出现错误,下一行代码不会执行
						resolve(x); // 将 then 中的返回值传递给下一个 promise
					} catch (error) {
						reject(error); // 捕获执行 then 中函数的错误
					}
				});
			}

			if (this.status === "rejected") {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason);
						resolve(x); // 将 then 中的返回值传递给下一个 promise
					} catch (error) {
						reject(error); // 捕获执行 then 中函数的错误
					}
				});
			}

			if (this.status === "pending") {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value);
							resolve(x);
						} catch (error) {
							reject(error);
						}
					});
				});

				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason);
							resolve(x);
						} catch (error) {
							reject(error);
						}
					});
				});
			}
		});
	}

	// catch 方法，捕获错误
	catch(onRejected) {
		return this.then(null, onRejected);
	}
}

// 测试示例
const testPromise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve("Success!");
		// reject('Error!');
	}, 1000);
});

testPromise
	.then((value) => {
		console.log(value);
		return "Step 2";
	})
	.then((value) => {
		console.log(value);
		throw new Error("Something went wrong");
	})
	.catch((err) => {
		console.log("Caught error:", err.message);
	});
