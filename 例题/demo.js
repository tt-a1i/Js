function myPromise(promises){
  if(!promises[Symbol.iterator]){
    throw new TypeError('must be iterable')
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
        .catch(error => reject(error))
    })
  })
}
let promise1 = [
  Promise.resolve(1),
  Promise.reject(2)
]
myPromise(promise1)
  .then(value => console.log(value))
  .catch(error => console.log(error))