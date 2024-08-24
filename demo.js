function debouncePromise(fn, delay){
  let timer = null;
  let promisePendingResolve = null;
  let promisePendingReject = null;
  let lastArgs = null;
  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    lastArgs = args;
    const promise = new Promise((resolve, reject) => {
      promisePendingResolve = resolve;
      promisePendingReject = reject;
    })
    timer = setTimeout(() => {
      fn(...lastArgs)
        .then(promisePendingResolve)
        .catch(promisePendingReject)
        .finally(() => {
          promisePendingResolve = null;
          promisePendingReject = null;
        })
    }, delay)
    return promise;
  }
}
function fetchData(query){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(query)
    }, 1000)
  })
}
const debounce = debouncePromise(fetchData, 300)
debounce('query1').then(console.log).catch(console.error)
debounce('query2').then(console.log).catch(console.error)