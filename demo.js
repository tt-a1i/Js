function intersect(...arr){
	const sets = arr.map(item => new Set(item))
	const result = sets[0]
	for(let i = 1; i < sets.length; i++){
		result.forEach(item => {
			if(!sets[i].has(item)){
				result.delete(item)
			}
		})
	}
	return Array.from(result)
}
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
const array3 = [5, 6, 7, 8, 9];

console.log(intersect(array1, array2, array3))