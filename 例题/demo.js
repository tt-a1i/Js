function myPromiseAll(promises) {
  if (!promises[Symbol.iterator]) {
    throw new TypeError("Argument must be iterable");
  }
  const promiseArr = Array.from(promises);
  return new Promise((resolve, reject) => {
    const results = [];
    let computed = 0;
    if (promiseArr.length === 0) {
      resolve(results);
      return;
    }
    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          computed++;
          if (computed === promiseArr.length) {
            resolve(results);
            return;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
let promise1 = [
    Promise.resolve(1),
    Promise.reject(3)

]
myPromiseAll(promise1)
    .then(resolve => console.log(resolve))
    .catch(reject => console.log(reject))