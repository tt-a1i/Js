function myReduce(arr, callback, initialValue){
	let startIndex = 0;
	let acc = initialValue;
	if(!acc){
		if(arr.length === 0){
			throw new TypeError('argument error')
		}
		acc = arr[0]
		startIndex = 1
	}
	for(let i = startIndex; i < arr.length; i++){
		acc = callback(acc, arr[i], i, arr);
	}
	return acc;
}
let arr = [1,2,3,5]
console.log(myReduce(arr, (acc, curr) => acc + curr, 1));
