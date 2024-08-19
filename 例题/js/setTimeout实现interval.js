function customInterval(callback, delay) {
    function intervalFunction() {
      callback();
      setTimeout(intervalFunction, delay);
    }
  
    setTimeout(intervalFunction, delay);
  }
  
  // 使用示例
  customInterval(() => {
    console.log('This message is logged every 1 second');
  }, 1000);