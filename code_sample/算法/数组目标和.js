//双指针,乱序数组可先排序,也可用map做
function findTargetSum(arr, target){
    let l = 0, r = arr.length - 1;
    const res = []
    while(l < r){
        let sum = arr[l] + arr[r]
        if(sum === target){
            res.push([arr[l], arr[r]])
            l++
            r--
            while(l < r && arr[l] === arr[l - 1]) l++
            while(l < r && arr[r] === arr[r + 1]) r--
        }else if(sum < target){
            l++
        }else{
            r--
        }
    }
    return res
}
const arr = [1, 3, 5, 7, 8, 9];
console.log(findTargetSum(arr, 10));