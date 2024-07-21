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
  }
  
  obj.sayName() // 打印什么
  const func = obj.sayName
  func() // 打印什么