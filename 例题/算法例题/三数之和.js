//排序后相加, 复杂度NlogN
//遍历 On
function threeNumsSum(arr){
    let n1 = -Infinity, n2 = -Infinity, n3 = -Infinity;
    arr.forEach(n => {
        if(n > n1){
            n3 = n2;
            n2 = n1;
            n1 = n;
        }else if(n > n2){
            n3 = n2;
            n2 = n;
        }else if(n > n3){
            n3 = n;
        }
    });
    return n1 + n2 + n3;
}
let arr = [10, 20, 30, 5, 40, 50, 40, 30];
console.log(threeNumsSum(arr));
