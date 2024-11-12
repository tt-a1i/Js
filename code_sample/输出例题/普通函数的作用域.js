window.name = '小明'
var name = '小红'

function fn(){
	console.log(name)
}
function printName(f){
	var name = '小兰'
	f()
}
printName(fn)

console.log(window.name)//小红