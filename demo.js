function func(arr, target){
    const map = new Map()
    const res = []
    for(let i = 0; i < arr.length; i++){
        if(map.has(target - arr[i])){
            res.push([target - arr[i], arr[i]])
        }
        map.set(arr[i], i)
    }
    return res
}
const arr = [1,3,5,7,8,9]
console.log(func(arr, 10));