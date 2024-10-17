function mySort(arr){
    let p0 = 0
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 0){
            [arr[p0], arr[i]] = [arr[i], arr[p0]]
            p0++
        }
    }
    return arr
}
console.log(mySort([1, 0, 1, 1, 0, 0, 1, 0]));