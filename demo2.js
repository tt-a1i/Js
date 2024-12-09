Array.prototype.myReduce = function(cb, initialValue){
    let currIndex = 0, accumulator = 0
    if(!initialValue){
        currIndex = 1
        accumulator = this[0]
    }
    for(let i = currIndex; i < this.length; i++){
        accumulator = cb(accumulator, this[i], i, this)
    }
    return accumulator
}
console.log([1,2,3].myReduce((a, b) => a + b, 0))