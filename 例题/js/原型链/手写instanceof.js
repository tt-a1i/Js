function myInstanceof(instance, constructor) {
    // 获取构造函数的 prototype 属性
    const prototype = constructor.prototype;
    // 获取对象的原型
    let proto = Object.getPrototypeOf(instance);

    // 沿着原型链查找
    while (true) {
        if (proto === null) {
            return false; // 到达原型链顶端，仍未找到
        }
        if (proto === prototype) {
            return true; // 找到匹配
        }
        proto = Object.getPrototypeOf(proto);
    }
}
function Person() {}
function Car() {}

var person = new Person();
// 测试自定义的 myInstanceof 函数
console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Car)); // false
console.log(myInstanceof(person, Object)); // true