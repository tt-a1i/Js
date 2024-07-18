async function async1(){
    console.log('async1 start');
    await async2()
    console.log('async1 end');
}

async function async2(){
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1()

new Promise(function (resolve){
    console.log('promise1');
    resolve()
}).then(function(){
    console.log('promise2');
})

console.log('script end');
/*
这段代码涉及到 JavaScript 的事件循环、宏任务、微任务以及 async/await 的执行机制。让我们逐步分析输出顺序：

首先执行同步代码：

打印 "script start"
遇到 setTimeout，将其回调函数放入宏任务队列

调用 async1 函数：

打印 "async1 start"
遇到 await async2()，执行 async2 函数
打印 "async2"
async2 函数结束，返回一个 Promise
await 使 async1 函数剩余部分被放入微任务队列
遇到 new Promise，执行其中的同步代码：

打印 "promise1"
调用 resolve()，将 then 中的回调放入微任务队列
执行最后一行同步代码：

打印 "script end"
同步代码执行完毕，开始执行微任务队列：

执行 async1 函数剩余部分，打印 "async1 end"
执行 Promise 的 then 回调，打印 "promise2"
微任务队列清空，执行宏任务队列：

执行 setTimeout 的回调，打印 "setTimeout"
因此，最终的输出顺序是：

script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
这个顺序反映了 JavaScript 的事件循环机制：先执行同步代码，然后执行微任务，最后执行宏任务。
async/await 本质上是 Promise 的语法糖，await 后面的代码相当于放在 Promise.then 中执行，因此也是作为微任务处理的。 */