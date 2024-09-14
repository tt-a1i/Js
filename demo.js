function A(){
	this.a = []
}
let b = new A()
let c = new A()
console.log(b.a);
b.a.push(1)
console.log(c.a);
