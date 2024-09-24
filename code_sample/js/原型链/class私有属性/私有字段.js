class ExampleClass {
    // 私有字段
    #privateField;
    
    constructor(value) {
      this.#privateField = value;
    }
    
    getPrivateField() {
      return this.#privateField;
    }
    
    setPrivateField(value) {
      this.#privateField = value;
    }
  }
  
  const instance = new ExampleClass('Hello, Private Fields!');
  console.log(instance.getPrivateField());  // 输出：Hello, Private Fields!
  // 以下行会抛出语法错误，因为私有字段不能在类外部访问
  // console.log(instance.#privateField);    