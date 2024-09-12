function throttle(fn, delay){
    let timer = null
    return function(...args){
        if(!timer) {
            fn.apply(this, args)
            timer = setTimeout(() => {
                timer = null
            }, delay)
        }
    }
}
let test = () => console.log(1);
let fn = throttle(test, 3000)
fn(); // 应该会立即输出 1
setTimeout(fn, 1000); // 不会输出，因为在 3000ms 内
setTimeout(fn, 4000); // 应该会输出 1，因为超过了 3000ms