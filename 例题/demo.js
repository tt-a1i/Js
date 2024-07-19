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
          if(computed === results.length){
            resolve(results)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}