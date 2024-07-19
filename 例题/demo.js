function myPromiseAll(promises){
    if(!promises[Symbol.iterator]){
        throw new TypeError('...')
    }
    const promiseArr = Array.from(promises)
    return new Promise((resolve, reject) => {
        const results = []
        let computed = 0
        if(promiseArr.length === 0){
            resolve(results)
            return
        }
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value
                    computed++
                    if(computed === promiseArr.length){
                        resolve(results)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    })
}
let promises = [
    Promise.resolve(1),
    Promise.reject(2)
]
myPromiseAll(promises)
    .then(resolve => console.log('resolve',resolve))
    .catch(error => console.log('error', error))