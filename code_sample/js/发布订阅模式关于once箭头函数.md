为什么通过箭头函数就可以保持引用

通过箭头函数保持 onceListener 引用的原因与 JavaScript 中函数的定义方式和**this 绑定**机制有关。箭头函数和普通函数在处理 this 和函数引用时有一些关键的区别。下面我们来详细解释一下：

1. 函数引用的区别
当你使用普通函数（function onceListener(...)）时，每次调用 onceListener 会创建一个新的函数对象。即使函数体看起来相同，但在 JavaScript 中，函数是对象，每次声明都是不同的实例。因此，当你调用 this.off(event, onceListener) 时，它无法正确移除，因为 off 方法期待的是与 on 方法中添加的完全相同的函数引用。

例子：
javascript
复制代码
once(event, listener) {
    function onceListener(...args) {
        listener(...args);
        this.off(event, onceListener); // 这里的 onceListener 是新创建的，不是之前 on 中注册的那个
    }
    this.on(event, onceListener);
}
每次调用 onceListener 都会创建一个新的函数对象，这意味着在 this.off(event, onceListener) 中，传递的 onceListener 和之前 this.on(event, onceListener) 注册的不是同一个函数对象。
因此，事件监听器无法正确移除。
2. 箭头函数的行为
使用箭头函数时，onceListener 是通过闭包来保持对同一个函数对象的引用。这样就不会创建新的函数实例，能够确保 this.off(event, onceListener) 能够正确找到并移除之前注册的 onceListener。

使用箭头函数的例子：
javascript
复制代码
once(event, listener) {
    const onceListener = (...args) => {
        listener(...args);
        this.off(event, onceListener);  // 这里的 onceListener 与 on 注册的 onceListener 是相同的引用
    }
    this.on(event, onceListener);
}
通过 const onceListener = (...args) => {...}，onceListener 保持在同一个作用域内（闭包中）。因此，当 this.off(event, onceListener) 被调用时，它能够找到与 on 方法中注册的相同的函数引用。
这是因为在箭头函数的定义中，onceListener 是通过变量 const 绑定的，它不会在每次执行时重新创建一个新的函数对象。
3. 为什么箭头函数不会创建新的引用？
箭头函数不像普通函数那样重新创建函数对象，它的绑定是静态的。这意味着当你通过箭头函数声明一个变量时，这个变量会在它所在的作用域（比如闭包）中被创建，并且在整个作用域生命周期内保持不变。

由于箭头函数在定义时不会创建新的 this，并且与普通函数不同的是，它没有自己的 arguments 或 this，因此它更依赖外部作用域的上下文。这使得箭头函数可以作为闭包的一部分，被正确地引用，而不会重新创建新的函数对象。

4. 对比普通函数与箭头函数的引用问题
普通函数：

javascript
复制代码
function onceListener(...args) {
    listener(...args);
    this.off(event, onceListener); // 新的函数对象
}
这里每次调用 onceListener，JavaScript 都会创建一个新的函数对象，因此当你调用 off 时，无法匹配到最初注册的监听器。

箭头函数：

javascript
复制代码
const onceListener = (...args) => {
    listener(...args);
    this.off(event, onceListener); // 保持同一个函数引用
};
箭头函数通过闭包，确保 onceListener 在整个作用域中都是同一个函数引用，因此可以成功地移除监听器。

总结：
箭头函数通过闭包机制可以保持对同一个函数引用的访问，而普通函数每次都会创建新的函数实例。通过使用箭头函数，onceListener 在 on 和 off 方法中的引用始终一致，确保能够正确移除事件监听器。这也是为什么箭头函数能够解决普通函数在事件监听移除时遇到的问题。