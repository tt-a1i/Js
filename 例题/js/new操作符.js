function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = 1
}

const person1 = new Person('Alice', 25);
console.log(person1.name); // 输出：Alice
console.log(person1.age);  // 输出：25
function myNew(constructor, ...args) {
    // 1. 创建一个新的空对象
    const obj = {};

    // 2. 将这个空对象的原型指向构造函数的 prototype 属性
    Object.setPrototypeOf(obj, constructor.prototype);

    // 3. 将构造函数的 this 绑定到新创建的对象上，并执行构造函数中的代码
    const result = constructor.apply(obj, args);

    // 4. 如果构造函数返回一个对象，那么这个对象将作为 new 表达式的结果返回；否则，返回新创建的对象
    return result instanceof Object ? result : obj;
}

// 测试 myNew 函数
const person2 = myNew(Person, 'Bob', 30);
console.log(person2.name); // 输出：Bob
console.log(person2.age);  // 输出：30
console.log(person2.sex);
//peron2是通过 Person 构造函数创建的对象
console.log(person2 instanceof Function);//false
console.log(Person instanceof Function);//true
console.log(Person instanceof Object);//true
console.log(Function instanceof Object);//true