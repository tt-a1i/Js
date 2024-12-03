function reduceToMap(arr, callback){
    return arr.reduce((acc, cur) => {
        let temp = callback(cur)
        acc.push(temp)
        return acc
    }, [])
}

let arr = [1,2,3]
console.log(arr.map(n => n * 2))

console.log(reduceToMap(arr, n => n * 2))