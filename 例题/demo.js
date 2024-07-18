function myPromiseAll(promises){
    if(!promises[Symbol.iterator]){
        throw new TypeError('Argument must be iterable')
    }
    const promiseAll = Array.from(promises)
    return new Promise((resolve, reject) => {
        const results = []
        let computed = 0
        if(promiseAll.length === 0){
            resolve(results)
            return
        }
        promiseAll.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value
                    computed++
                    if(computed === promiseAll.length){
                        resolve(results)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    })
}
const promises1 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ];
  
  myPromiseAll(promises1)
    .then(results => console.log('Test 1:', results))
    .catch(error => console.error('Test 1 Error:', error));