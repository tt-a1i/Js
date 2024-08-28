function func(arr, pos = arr.length - 1){
	if(pos < 0) return;
	console.log(arr[pos]);
	func(arr, pos - 1)
}
func([1,2,3,4,5])