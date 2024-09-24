let a = 1;
function foo(a) {
	return a = a + 1;
}//2
var b = foo(a);
function foo(a) {
	return a = a + 2;
}
const c = foo(a);
function foo(a) {
	return a = a + 3;
}
console.log(a, b, c);
