var a = 0;
console.log(a, window.a);
if (1) {
    //函数提升了,输出是局部变量的函数
	console.log(a, window.a);
    //在执行函数之前,修改的还是全局
	a = 1;
	console.log(a, window.a);
	function a() {}
	console.log(a, window.a);
	a = 21;
	console.log(a, window.a);
	console.log("里面", a);
}
console.log("外部", a);