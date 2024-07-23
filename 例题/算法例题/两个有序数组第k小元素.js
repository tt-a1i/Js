function fn(arr1, arr2, k){
    let p1 = 0, p2 = 0
    while(p1 < arr1.length && p2 < arr2.length){
        if(p1 + p2 === k - 1){
            return Math.min(arr1[p1], arr2[p2])
        }
        if(arr1[p1] > arr2[p2]) p2++;
        else p1++;
        if(p1 === arr1.length) return arr2[k - p1 - 1]
        if(p2 === arr2.length) return arr1[k - p2 - 1]
    }
}
console.log(fn([1,2,3],[4,5,6], 5));
