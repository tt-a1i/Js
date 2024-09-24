function myPromiseRace(promises){
    if(!promises[Symbol.iterator]) {
        throw new TypeError('must be iterable')
    }
    const promiseArr = Array.from(promises)
    return new Promise((resolve, reject) => {
        promiseArr.forEach(promise => {
            promise
                .then(value => resolve(value))
                .catch(error => {
                    reject(error)
                })
                
        })
    })
}
const promises1 = [
    Promise.reject(1),
    Promise.reject(2),
    Promise.reject(3)
];

myPromiseRace(promises1)
    .then(results => console.log('Test 1:', results))
    .catch(error => console.log('Test 1 Error:', error));