var name = "window";
var obj = {
	name: "obj",
	say() {
		console.log(this.name);
	},
	say1: () => {
		console.log(this.name);
	},
};
obj.say();
obj.say1();
var fn = obj.say;
var fn1 = obj.say1;
fn();
fn1();
//obj 
//undefined
//undifined
//undefined