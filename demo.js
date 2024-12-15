function myPromiseAll(promises){
    if(!promises[Symbol.iterator]){
        throw new Error(`argument must be iterable`)
    }
    const promiseArr = Array.from(promises)
    const result = []
    let computed = 0
    return new Promise((resolve, reject) => {
        if(promiseArr.length === 0){
            resolve(result)
        }
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(res => {
                    result[index] = res
                    computed++
                    if(computed === promiseArr.length){
                        resolve(result)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    })
}
const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3)
]
myPromiseAll(promises)
    .then(res => console.log(res))
    .catch(err => console.log(err))