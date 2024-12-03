Array.prototype.myFlatMap = function(callback){
    return this.reduce((acc, cur, index, array) => {
        const temp = callback(cur, index , array)
        return acc.concat(temp)
    }, [])
}
const nums = [1,2,3]
console.log(nums.map(n => [n]))
console.log(nums.myFlatMap((num) => [num, num * 2]))