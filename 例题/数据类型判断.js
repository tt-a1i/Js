
let datatType = function (data){
    if(Object.is(data, NaN) === true) return 'NaN'
    if(Array.isArray(data)) return 'Array'
    if(data === null) return null
    return typeof data
}
console.log(checkType(5)); 
console.log(checkType('hello')); 
console.log(checkType([1, 2, 3])); 
console.log(checkType(null)); 
console.log(checkType(NaN)); 
console.log(checkType({ name: 'John' })); 
console.log(checkType(true)); 


