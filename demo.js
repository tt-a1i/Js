// 使用闭包实现的 getPrime 方法，每次调用返回一个质数
const getPrime = (function() {
    let current = 2;

    function isPrime(n) {
        if (n < 2) return false;
        for(let i = 2; i <= Math.sqrt(n); i++) {
            if(n % i === 0) return false;
        }
        return true;
    }

    return function() {
        while (true) {
            if (isPrime(current)) {
                return current++;
            }
            current++;
        }
    };
})();
// 示例使用
console.log(getPrime()); // 输出: 2
console.log(getPrime()); // 输出: 3
console.log(getPrime()); // 输出: 5
console.log(getPrime()); // 输出: 7
console.log(getPrime());