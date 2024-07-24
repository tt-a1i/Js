function myPromiseAll(promises){
  if(!promises[Symbol.iterator]) {
    throw new TypeError('must be iterable')
  }
  let promiseArr = Array.from(promises)

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
        .catch(err => reject(err))
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
  .catch(error => console.log('Test 1 Error:', error));