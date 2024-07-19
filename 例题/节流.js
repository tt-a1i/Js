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
test = () => console.log(1);
let fn = throttle(test, 3000)
fn()