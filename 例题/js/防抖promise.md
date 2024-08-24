您的 `debouncePromise` 函数基本上是正确的，但有一些细节需要注意。总体来说，您的代码是努力确保防抖函数在给定的延迟时间内只执行最后一次调用。您也有效地使用了 `Promise` 来封装异步行为，但有几个微小的改进会使代码更加健壮。

### 修正与优化

1. **立即生成新的 Promise**: 当前方式只在 `pendingPromise` 为 null 时生成新的 Promise，这样的逻辑会导致在后续调用中无法捕获未处理的新 Promise。我们应该始终返回一个新的 Promise。

2. **作用域和清理**: `timeout` 和 `pendingPromise` 的控制需要小心，以确保它们的状态在每次调用后都干净。

### 改进后的防抖函数

```javascript
function debouncePromise(fn, delay) {
  let timeout = null;
  let pendingPromise = null;
  let lastArgs = null;

  return function(...args) {
    // 清除之前的定时器
    if (timeout) {
      clearTimeout(timeout);
    }

    lastArgs = args;

    if (!pendingPromise) {
      // 设定一个新的 Promise，以便控制 resolve/reject
      pendingPromise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
          // 执行原始函数
          fn(...lastArgs)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              pendingPromise = null;
            });
        }, delay);
      });
    }

    return pendingPromise;
  };
}

// 示例用法:

// 模拟一个异步操作的函数，比如从API获取数据
function fetchData(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data for ${query}`);
    }, 1000); // 模拟网络延迟
  });
}

// 创建一个防抖处理的版本
const debouncedFetchData = debouncePromise(fetchData, 300);

// 调用防抖函数
debouncedFetchData('query1').then(console.log).catch(console.error);
debouncedFetchData('query2').then(console.log).catch(console.error);
// 只有最后一次调用的'query2'会被真正执行
```

### 解释

1. **lastArgs**: 用来保存最后一次调用的参数，以确保最终被执行的函数使用的是最近一次调用时的参数。

2. **始终返回新的 Promise**: 每次调用 `debouncedFetchData` 函数时都会返回一个新的 Promise，而不论 `pendingPromise` 是否为 null。这确保了每次调用都能捕获到返回的 Promise，无论其是在何时实际完成的。

### 成品的工作原理

1. **第一次调用**: `debouncedFetchData('query1')` 设置一个 300ms 的定时器。
2. **第二次调用**: `debouncedFetchData('query2')` 将会清除第一次调用的定时器，并设置新的 300ms 定时器，同时更新 `lastArgs` 为 `"query2"`。

假如没有新调用在 300ms 内发生，定时器到点时会执行 `fetchData('query2')`，并且该结果会被传递给所有调用的 `.then` 和 `.catch` 表达式。

通过这样的方式，您实现了防抖，同时确保 Promise 的管理正确。

# 为什么没有输出

在当前的实现中，您可能会遇到没有输出的情况，原因在于 `pendingPromise` 的创建逻辑。因为 `pendingPromise` 是在 `if (!pendingPromise)` 语句下创建的，所以当第一次调用进行到这里时，`pendingPromise` 正确地创建了，并且接收到之后传递的 Promise。然而，当再次调用防抖函数时，如果 `timeout` 被清除且 `pendingPromise` 依然存在，第二次调用不会重新创建 `pendingPromise`，导致在 `300ms` 内无法进入执行逻辑。

### 解决方案

为了确保每次调用都正确地创建 Promise 并在适当的时机执行函数，可以稍微调整实现方式。我们需要确保 `pendingPromise` 是每次都被正确分配，并且在 `timeout` 被清除的情况下也能够处理正确的新调用。

以下是经过改进的实现：

```javascript
function debouncePromise(fn, delay) {
  let timeout = null;
  let pendingPromiseResolve = null;
  let pendingPromiseReject = null;
  let lastArgs = null;

  return function(...args) {
    // 清除之前的定时器
    if (timeout) {
      clearTimeout(timeout);
    }

    lastArgs = args;

    // 创建一个新的 Promise，每次返回调用者
    const promise = new Promise((resolve, reject) => {
      pendingPromiseResolve = resolve;
      pendingPromiseReject = reject;
    });

    timeout = setTimeout(() => {
      fn(...lastArgs)
        .then(pendingPromiseResolve)
        .catch(pendingPromiseReject)
        .finally(() => {
          pendingPromiseResolve = null;
          pendingPromiseReject = null;
        });
    }, delay);

    return promise;
  };
}

// 示例用法:

// 模拟一个异步操作的函数，比如从API获取数据
function fetchData(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data for ${query}`);
    }, 1000); // 模拟网络延迟
  });
}

// 创建一个防抖处理的版本
const debouncedFetchData = debouncePromise(fetchData, 300);

// 调用防抖函数
debouncedFetchData('query1').then(console.log).catch(console.error);
debouncedFetchData('query2').then(console.log).catch(console.error);
// 只有最后一次调用的'query2'会被真正执行
```

### 解释

1. **新 Promise**: 每次调用 `debouncedFetchData` 时，都会创建一个新的 Promise，并将 `resolve` 和 `reject` 存储在外部变量中。
   
2. **存储 `lastArgs`**: 在每次调用时，先保存最后一次调用的参数 `lastArgs`，然后利用这些参数在 `setTimeout` 回调中调用实际的函数 `fn`。

3. **定时器控制**: 每次调用时，都会清除现有的定时器，并重新设置一个新的定时器。

4. **Promise resolve/reject**: 当定时器到达时，调用原始异步函数，并根据其结果调用外部存储的 `resolve` 或 `reject`。

### 测试

您可以测试此实现，如之前一样，调用 `debouncedFetchData` 函数，并查看输出是否按预期进行：

```javascript
debouncedFetchData('query1').then(console.log).catch(console.error);
debouncedFetchData('query2').then(console.log).catch(console.error);
// 只有最后一次的 'query2' 调用会被实际执行，输出 "Data for query2"
```

这样，最后一次向 `debouncedFetchData` 方法传递的调用 (即，`debouncedFetchData('query2')`) 会执行函数 `fetchData`，并将结果传递给最外层 Promise。

# 那是不是第一个是错误的

是的，第一个实现并不是完全错误，但它未能正确处理多次调用的情况。这导致了在快速连续调用时，无法达到预期的防抖效果。

### 主要问题

1. **`pendingPromise` 的初始逻辑**：第一次调用时，`pendingPromise` 会被正确创建，但随后的调用（在它被清空之前）不会进入这个逻辑块，从而阻止了新的Promise的创建，这导致多个调用只返回第一个Promise。
  
2. **解决函数传参问题（`lastArgs`）**：确保在最后一次调用中使用最新的参数。

### 修正后的实现

以下是一个调整后的实现，确保每次调用都生成新的Promise，同时保证防抖功能按预期工作：

```javascript
function debouncePromise(fn, delay) {
  let timeout = null;
  let pendingPromiseResolve = null;
  let pendingPromiseReject = null;
  let lastArgs = null;

  return function(...args) {
    // 清除之前的定时器
    if (timeout) {
      clearTimeout(timeout);
    }

    lastArgs = args;

    // 创建一个新的 Promise，每次返回调用者
    const promise = new Promise((resolve, reject) => {
      pendingPromiseResolve = resolve;
      pendingPromiseReject = reject;
    });

    // 设置新的定时器
    timeout = setTimeout(() => {
      fn(...lastArgs)
        .then(pendingPromiseResolve)
        .catch(pendingPromiseReject)
        .finally(() => {
          pendingPromiseResolve = null;
          pendingPromiseReject = null;
        });
    }, delay);

    return promise;
  };
}

// 示例用法:

// 模拟一个异步操作的函数，比如从API获取数据
function fetchData(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data for ${query}`);
    }, 1000); // 模拟网络延迟
  });
}

// 创建一个防抖处理的版本
const debouncedFetchData = debouncePromise(fetchData, 300);

// 调用防抖函数
debouncedFetchData('query1').then(console.log).catch(console.error);
debouncedFetchData('query2').then(console.log).catch(console.error);
// 只有最后一次调用的 'query2' 会被真正执行
```

### 改进亮点

1. **每次调用创建新的Promise**：每次调用`debouncedFetchData`都会生成一个新的Promise，避免了之前因为多次调用返回同一个Promise而导致的问题。
  
2. **正确清理定时器**：每次调用都会清理上一次的定时器，并重新设置新的定时器，实现防抖的效果。

3. **异步操作结果传递**：异步操作 `fn(...lastArgs)` 完成后，回调会调用适当的 `resolve` 或 `reject`，从而传递最终的结果或错误。

通过这些修改，您可以确保 `debouncePromise` 函数在快速、多次调用时始终遵循防抖逻辑，同时返回最新的调用结果。



# 题

// 实现一个_get函数，它接受三个参数object, keypath, defaultValue // object是个对象 // keypath是你的对象object的调用路径，它可能是属性的获取，可能是方法的调用，也有可能是数组元素的获取，调用的格式如有右所示：a.b[1].c(1,2) // defaultValue是默认值，当获取的值为undefined时返回它。 // 最后返回通过keypath的调用路径获取的对象中的某个属性值或某个方法调用结果。 type _get = (object: Object, keypath: string, defaultValue: any) => any;

作者：Runtus
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网