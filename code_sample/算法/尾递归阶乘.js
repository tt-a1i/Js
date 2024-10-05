function factorial(n){
    function helper(num, acc){
        if(num > n) return acc;
        return helper(num + 1, acc * num);
    }
    return helper(1, 1)
}
console.log(factorial(5));