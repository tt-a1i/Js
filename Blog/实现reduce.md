# 实现 JavaScript 的 `reduce` 方法

## 1. 什么是 `reduce` 方法？

`reduce` 方法接受一个回调函数作为参数，并且将数组中的每个元素与一个累加器（`accumulator`）进行计算，最终返回累加结果。它的基本语法如下：

```javascript
array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)
```

### 1.1 参数解析

- callback(accumulator, currentValue, currentIndex, array)：回调函数，reduce在每次迭代时会调用这个函数。
  - `accumulator`：累加器，保存回调函数执行后的中间结果。
  - `currentValue`：当前正在处理的元素值。
  - `currentIndex`：当前元素的索引。
  - `array`：正在被遍历的数组。
- **initialValue**：累加器的初始值。如果没有提供，`reduce` 会默认将数组的第一个元素作为初始值。

### 1.2 例子

一个常见的使用场景是对数组元素进行求和：

```javascript
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 输出: 15
```

------

## 2. 自己实现 `reduce` 方法

### 2.1 实现 `myReduce` 方法

在 `Array.prototype` 上添加一个名为 `myReduce` 的方法，模仿内置的 `reduce` 方法，支持类似的功能。以下是实现代码：

```javascript
Array.prototype.myReduce = function(cb, initialValue) {
    let currIndex = 0, accumulator = 0;

    // 如果没有提供 initialValue，则将数组的第一个元素作为初始值
    if (initialValue === undefined) {
        currIndex = 1; // 从索引 1 开始，因为索引 0 已经被作为初始值
        accumulator = this[0]; // 使用数组的第一个元素作为初始值
    } else {
        accumulator = initialValue; // 如果提供了初始值，则使用初始值
    }

    // 遍历数组，从 currIndex 开始执行回调函数
    for (let i = currIndex; i < this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator; // 返回累加的结果
};
```

### 2.2 测试 `myReduce`

现在可以使用自定义的 `myReduce` 方法来实现和内置 `reduce` 相同的功能。假设要对数组进行求和：

```javascript
const arr = [1, 2, 3, 4, 5];
const sum = arr.myReduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 输出: 15
```

在这个例子中，传入了一个回调函数 `(a, b) => a + b`，该函数会对数组中的每个元素进行累加。`myReduce` 会返回 15，这是数组中所有元素的和。

------

## 3. 深入理解 `reduce` 的工作机制

### 3.1 初始值的作用

如果提供了 `initialValue`，`reduce` 会将其作为第一次调用回调时的 `accumulator`。如果没有提供 `initialValue`，`reduce` 会将数组的第一个元素作为初始值，并从数组的第二个元素开始执行回调函数。

举个例子，如果没有提供 `initialValue`，我们可以通过 `myReduce` 来模拟：

```javascript
const arr = [1, 2, 3, 4];
const sum = arr.myReduce((accumulator, currentValue) => accumulator + currentValue);
console.log(sum); // 输出: 10
```

此时，`accumulator` 的初始值是 `1`（数组的第一个元素），接着开始与数组中的其余元素进行累加。

### 3.2 空数组的处理

对于空数组，`reduce` 方法会返回 `initialValue`，如果没有提供 `initialValue`，则会抛出一个 `TypeError`。例如：

```javascript
const emptyArr = [];
try {
    const result = emptyArr.myReduce((acc, val) => acc + val);
    console.log(result); // 会抛出 TypeError
} catch (error) {
    console.log(error.message); // 输出: Reduce of empty array with no initial value
}
```

如果数组为空并且没有提供初始值，因为没有元素可以进行迭代，因此会抛出错误。

------

## 4. `reduce` 的常见应用

### 4.1 数组扁平化

一个嵌套数组，想要将其扁平化成一个一维数组：

```javascript
const arr = [[1, 2], [3, 4], [5, 6]];
const flattened = arr.reduce((acc, val) => acc.concat(val), []);
console.log(flattened); // 输出: [1, 2, 3, 4, 5, 6]
```

### 4.2 统计数组中每个元素的出现次数

```javascript
const arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
const count = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
}, {});
console.log(count); // 输出: { apple: 2, banana: 3, orange: 1 }
```

------

`reduce`在平常还是很好用的，可以用来做一些方便的数组操作。