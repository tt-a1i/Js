let fn = () => console.log(1)

console.log(typeof fn)
console.log(Object.prototype.toString.call(fn))
console.log(fn instanceof Function)
console.log(fn.constructor)