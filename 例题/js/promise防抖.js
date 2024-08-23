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