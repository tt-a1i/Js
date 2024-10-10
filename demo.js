// const name = 'hong'
// const obj = {
// 	name: 'ming',
// 	a(){
// 		return this.name
// 	}
// }
// console.log(obj.a())
// console.log((obj.a)())

const name = 'hong'
const obj = {
	name: 'ming',
	a: () => {
		return this.name
	}
}
const c = obj.a
console.log(obj.a())
console.log(obj.a())
console.log(c())