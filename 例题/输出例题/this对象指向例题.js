var bar = 'window'
function say(){
  var bar = '111'
  console.log(bar);// '111' （局部变量 bar）
  //函数内部的this指向全局
  console.log(this.bar);// 'window' （this 指向全局对象，this.bar 即 window.bar）
}
const obj = {
  bar: '222',
  say(){
    console.log(bar);// 没有声明 var bar，所以它会查找最近的上级作用域中的 bar，即全局作用域中的 bar
    console.log(this.bar);// this 指向 obj 对象，this.bar 即 obj.bar
  }
}
say()// 全局调用
obj.say()// 作为对象的方法调用
obj.say = say
obj.say()// 作为对象的方法调用，但函数体是 say