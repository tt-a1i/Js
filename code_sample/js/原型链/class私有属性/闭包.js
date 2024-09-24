const ExampleClass = (function() {
    // 构造函数
    function ExampleClass(value) {
      // 私有变量
      let privateField = value;
      
      // 公共方法
      this.getPrivateField = function() {
        return privateField;
      };
      
      this.setPrivateField = function(value) {
        privateField = value;
      };
    }
    
    return ExampleClass;
  })();
  
  const instance = new ExampleClass('Hello, Private Fields using Closures!');
  console.log(instance.getPrivateField());  // 输出：Hello, Private Fields using Closures!
  // 不直接暴露私有变量，因此无法访问
  // console.log(instance.privateField);      // 输出：undefined