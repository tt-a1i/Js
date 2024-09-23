console.log(Object.__proto__ === Object.prototype)
console.log(Object.__proto__)
console.log(Function.__proto__ === Function.prototype)

console.log(Object.prototype.__proto__)

console.log(Function.__proto__ === Function.prototype); // true
console.log(Object.__proto__ === Function.prototype);   // true
console.log(Function.prototype.__proto__ === Object.prototype); // true