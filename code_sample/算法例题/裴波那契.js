//数组
function fibonacci1(n){
    let fib = [0, 1]
    for(let i = 2; i <= n; i++){
        fib[i] = fib[i - 1] + fib[i - 2]
    }
    return fib[n]
}
//循环
function fibonacci2(n){
    if(n < 2) return n;
    let a = 0, b = 1, c;
    for(let i = 2; i <= n; i++){
        c = a + b;
        a = b;
        b = c;
    }
    return c
}


//闭包
function fibonacci3(n){
    const memo = {}
    function helper(n){
        if(n < 2) return n;
        if(memo[n]) return memo[n]
        return memo[n] = helper(n - 1) + helper(n - 2)
    }
    return helper(n)
}
console.log(fibonacci3(10)); // 输出: 55