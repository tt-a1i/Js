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