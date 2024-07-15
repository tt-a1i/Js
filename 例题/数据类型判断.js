
let datatType = function (data){
    if(Object.is(data, NaN) === true) return 'NaN'
    if(Array.isArray(data)) return 'Array'
    if(data === null) return null
    return typeof data
}
console.log(datatType(NaN));
let a = 123
console.log(a.toFixed(5));
console.log(parseInt('123as'));
