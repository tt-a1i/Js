async function f1(){
    console.log(1);
}
async function f2(){
    console.log(2);
    await console.log(3);
    //解开注释呢
    console.log(5);
}
function f3(){
    console.log(4);
}
f1()
f2()
f3()
/*
f1() 被调用。虽然它是一个异步函数，但它不包含任何 await 语句，所以它会同步执行并立即打印 1。

f2() 被调用。它首先同步执行并打印 2。

在 f2() 中，遇到 await console.log(3)。这里，console.log(3) 会立即执行并打印 3，但 await 会暂停 f2() 函数的剩余部分的执行，并将控制权交回给调用栈。

f3() 被调用，它是一个普通的同步函数，所以立即执行并打印 4。

此时，主调用栈已经清空，但是 f2() 函数还有未完成的部分（await 之后的代码）。这部分代码会被放入微任务队列（microtask queue）。

事件循环检查微任务队列，发现 f2() 的剩余部分，执行它。但在这个例子中，await 之后没有更多的代码，所以没有额外的输出。 */