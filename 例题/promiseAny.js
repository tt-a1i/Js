function myPromiseRace(promises){
    if(!promises[Symbol.iterator]) {
        throw new TypeError('must be iterable')
    }
    const promiseArr = Array.from(promises)

    return new Promise((resolve, reject) => {
        const results = []
        promiseArr.forEach((promise, index) => {
            promise
                .then(value => resolve(value))
                .catch(error => {
                    reject(error)
                })
                
        })
    })
}