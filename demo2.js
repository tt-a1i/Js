let obj1 = {
	a: 2,
}
Object.defineProperty(obj1, 'a', {
	get(){
		console.log('get')
		return Reflect.get(obj1, '_a')
	},
	set(value){
		console.log('set')
		return Reflect.set(obj1, '_a', value)
	}
})
obj1.a = 2
console.log(obj1.a)

let obj2 = {
	a:3
}
let handler = {
	get(target, property, receiver){
		console.log('get')
		return Reflect.get(target, property, receiver)
	},
	set(target, property, value, receiver){
		console.log('set')
		return Reflect.set(target,property, value, receiver)
	}
}
let proxy = new Proxy(obj2, handler)

proxy.a
proxy.a = 3