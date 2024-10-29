其实我还是不太理解,我不是用for of来遍历promise数组吗,为什么最先执行的是第3个而不是第一个

你的疑惑在于 `for...of` 循环的执行顺序和 Promise 的状态变化之间的关系。这里有几个要点来解释为什么 `Promise.resolve(3)` 会是最先完成的，而不是数组中的第一个 Promise：

1. **异步执行**：`Promise.resolve()` 会立即返回一个已解决的 Promise，而 `Promise.reject()` 则立即返回一个已拒绝的 Promise。尽管你使用 `for...of` 遍历 `promises` 数组，但 Promise 的状态是异步的，它们的完成时间取决于它们内部的实现，而不是数组中的位置。

2. **执行顺序**：当你遍历 `promiseArr` 时，`Promise.reject(1)` 和 `Promise.reject(2)` 被立即创建并标记为拒绝，但它们的处理（即调用 `catch`）是在下一个事件循环中执行的。与此同时，`Promise.resolve(3)` 也被立即创建并标记为解决，但由于它是解决的状态，所以它的处理会在 `then` 中被立即调用。

3. **Promise 的处理机制**：
   - `Promise.reject(1)` 和 `Promise.reject(2)` 被拒绝，并且会在下一个事件循环中调用它们的 `catch` 处理器。
   - `Promise.resolve(3)` 则会在同一轮事件循环中被立即处理，并调用 `resolve`。

4. **处理优先级**：由于 `Promise.resolve(3)` 是解决状态，并且没有延迟，因此它会在 JavaScript 执行线程中优先处理。即使它在数组中是最后一项，但它的状态变化是在调用 `.then()` 时立即执行的。

所以，虽然你用 `for...of` 遍历了数组，但由于 Promise 的状态是异步的，最终的执行顺序取决于它们的状态改变，而不是数组中的位置。这就是为什么 `Promise.resolve(3)` 最终成为了第一个完成的 Promise。