const obj = {
    name: 'bar',
    sayName: function() {
      let self = this
      console.log(this.name);
      console.log(self.name);
      (function() {
        console.log(this.name);
        console.log(self.name);
      })()
    }
  }//立即执行函数的对象指向全局
  //普通函数内部的 this 并不指向函数内部。
  //this 的值取决于函数的调用方式，而不是函数的定义方式。
  //在大多数情况下（非严格模式下的全局调用），如果没有明确指定，this 会指向全局对象。
  obj.sayName()
  const func = obj.sayName
  func() 