for(var i = 0; i < 5; i++){
	let a = i;
	(setTimeout(function(){
		console.log(a);
	}, 0))
}
for(var i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	}, 0)
}
/*
你的问题涉及到JavaScript中的变量作用域和异步行为。让我们仔细看一下这两段代码。

### 第1段代码：

```javascript
for (var i = 0; i < 5; i++) {
    let a = i;
    setTimeout(function() {
        console.log(a);
    }, 0);
}
```

在这个循环中，`let`声明了一个名为`a`的块级作用域变量。这意味着在每次迭代时，`a`都会是一个新的变量实例，并且它的值是当时`i`的值。因此，每个`setTimeout`闭包捕获了当时的`a`值，分别是`0, 1, 2, 3, 4`。

### 第2段代码：

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 0);
}
```

在这段代码中，`i`是使用`var`声明的，这意味着它在函数作用域或全局作用域内是共享的。在`setTimeout`实际执行时，循环已经结束，所以`i`的值是循环结束后的值，也就是`5`。因此，每次执行`console.log(i)`时，输出的都是`5`。

### 为什么第1段代码能输出`0, 1, 2, 3, 4`：

关键在于`let`和块级作用域。在第1段代码中，`let a = i;`确保每个`setTimeout`闭包都捕获了各自独立的变量`a`，而这个`a`正是当时的`i`的值。

### 总结：

- **第1段代码**利用`let`的块作用域，使得每个循环迭代内的`a`是独立的变量实例，保存了当前`i`的值。
- **第2段代码**由于`var`的函数作用域特性，在整个循环中只有一个`i`，被五个闭包共享，所以所有回调在执行时都访问到相同的`i`，即循环结束后的值`5`。

通过理解变量的作用域和异步执行时的上下文捕获，就可以理解代码行为的差异。 */