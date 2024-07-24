function myPromiseAny(promises) {
    if (!promises[Symbol.iterator]) {
        throw new TypeError('must be iterable')
    }
    const promiseArr = Array.from(promises)
    return new Promise((resolve, reject) => {
        let errors = [];
        let rejectedCount = 0;

        if (promiseArr.length === 0) {
            reject(errors);
            return;
        }
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => resolve(value))
                .catch(error => {
                    errors[index] = error;
                    rejectedCount++;
                    if (rejectedCount === promiseArr.length) {
                        reject(errors);
                    }
                })
        })
    })
}
const promises1 = [
    Promise.reject(1),
    Promise.reject(2),
    Promise.reject(3)
];

myPromiseAny(promises1)
    .then(results => console.log('Test 1:', results))
    .catch(error => console.log('Test 1 Error:', error));