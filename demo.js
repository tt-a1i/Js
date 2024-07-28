Object.prototype.a = 1
Function.prototype.b = 2
function test(){

}
var t = new test()
console.log(test.b);
console.log(t.a);
console.log(t.b);