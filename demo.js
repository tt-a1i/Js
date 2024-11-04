Object.prototype.a = 1;
Function.prototype.b = 2;
function test() {}
var t = new test();
console.log(t.a);//1
console.log(t.b);//2
