let arr = new Array()
for(var i = 0; i < 10; i++){
	arr.push(function(){
		return console.info(i)
	})
}
arr[0]()
arr[1]()
arr[2]()