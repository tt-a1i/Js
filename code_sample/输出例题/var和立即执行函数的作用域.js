var name = "Tom";
(function () {
	if (typeof name == "undefined") {
		var name = "Jack";//这里的name声明会提升到当前作用域顶部, 覆盖全局的name, 所以if判断会是undefined
		console.log("Goodbye " + name);
	} else {
		console.log("Hello " + name);
	}
})();
