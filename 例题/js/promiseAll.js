function myPromiseAll(promises){
    //首先确保是可迭代对象
    if(!promises[Symbol.iterator]){
        throw new TypeError('Argument must be iterable')
    }

    //将可迭代对象转换为数组
    const promsieArray = Array.from(promises)
    //返回一个新的promise
    return new Promise((resolve, reject) => {
        const result = []//存储结果的数组
        let computed = 0//跟踪已经resolve的数量
        //数组为空,直接resolve并返回result
        if(promsieArray.length === 0) {
            resolve(result)
            return
        }
        //遍历所有的promise
        promsieArray.forEach((promise, index) => {
            //使用promise.resolve来处理非promise的值
            //如果不需要处理非promise的值,直接promise.then,可以直接用[1,2,3]这种数组来测试
            //可以安全地处理promise和非promise值，无需担心调用非promise值上不存在的.then()方法，从而避免引发错误
            Promise.resolve(promise)
                .then(value => {
                    //结果存储在对应索引位置
                    result[index] = value
                    computed++
                    //所有promise都完成,解决返回的 Promise
                    if(computed === promsieArray.length){
                        resolve(result)
                    }
                })
                .catch(error => {
                    // 如果有任何一个 Promise 失败，立即拒绝返回的 Promise
                    reject(error)
                })
        })
    })
}
const promises1 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3)
  ];
  
  myPromiseAll(promises1)
    .then(results => console.log('Test 1:', results))
    .catch(error => console.log('Test 1 Error:', error));