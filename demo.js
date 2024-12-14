//在有序数组中查找目标值第一次出现的位置，没有则返回-1
function findTarget(arr, n){
    let idx = null
    let l = 0, r = arr.length - 1
    while(l <= r){
        let middle = Math.floor((l + r) / 2)
        let num = arr[middle]
        if(num === n){
            while(arr[middle] === arr[middle - 1]) middle--
            idx = middle
            break
        }else if(num < n){
            l = middle + 1
        }else{
            r = middle - 1
        }
    }
    return idx === null ? -1 : idx
}
let arr = [1,2,3,3,3,3,3,4]
console.log(findTarget(arr, 3))