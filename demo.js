let obj1 = { a: 1, b: { c: 2 } };
let obj2 = Object.assign({}, obj1);
// 或者使用展开运算符
// let obj2 = { ...obj1 };

obj2.a = 3;
obj2.b.c = 4;

console.log(obj1); // { a: 1, b: { c: 4 } }
console.log(obj2); // { a: 3, b: { c: 4 } }