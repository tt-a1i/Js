function myNew(constructor, ...args) {
  //声名一个空对象
  const obj = {};
  //设置新对象的原型链,继承构造函数对象的属性和方法
  Object.setPrototypeOf(obj, constructor.prototype)
  //绑定this并且执行函数
  let result = constructor.apply(obj, args)
  //判断是否产生了新对象,如果构造函数返回一个非对象的值,则返回obj对象
  return result instanceof Object ? result : obj
}
function Person(name){
  this.name = name;
}
const person = myNew(Person, 'tom')
console.log(person.name);
console.log(Person.constructor === Person);
