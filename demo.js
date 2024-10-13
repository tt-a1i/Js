function flatReduce(arr){
	return arr.reduce((prev, cur) => {
		return Array.isArray(cur) ? prev.concat(flatReduce(cur)) : prev.concat(cur)
	},[])
}
let arr = [1,[2,[3]]]
console.log(flatReduce(arr))