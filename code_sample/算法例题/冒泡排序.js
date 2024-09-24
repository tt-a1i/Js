function bubbleSort(arr){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(arr[j] < arr[j + 1]){
                let tmp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = tmp
            }
        }
    }
    console.log(arr);
}
bubbleSort([1,2,6,3,8,4,2,77,221])