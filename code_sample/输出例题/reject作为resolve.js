//promise的回调里的参数第一个一定是resolve，第二个才是reject,只是写成reject,实际上是resolve
const p = new Promise(reject => {
    reject(1)
})
    .catch((err) => {
        console.log(err)
    })
    //then只接收1个回调,后续的自动忽略
    //这里没有接收res,如果改为(res) => console.log(res),就输出res了
    .then(
        () => console.log(1),
        () => console.log(2)
    )
//promise 在resolve后加入到队列还没执行, 所以输出pending
console.log('one', p)
//这里promise已经执行完了, 所以是undefined
setTimeout(() => console.log(p), 2000)