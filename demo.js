var obj1 = {
	name: "obj1",
	fn: function () {
		console.log(this.name);
	},
};
var obj2 = { name: "obj2" };
var obj3 = { name: "obj3" };
obj1.fn();//
var newFn = obj1.fn;
newFn();
newFn.call(obj2);
obj3.fn = newFn;
obj3.fn();
