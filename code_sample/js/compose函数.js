function compose(...fns){
    return function(arg){
        return fns.reduceRight((acc, fn) => fn(acc), arg)
    }
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composedFn = compose(square, double, addOne);

console.log(composedFn(2)); // 输出: 36