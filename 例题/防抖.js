function debounce(fn, delay){
    let timer = null
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
const test = () => console.log(333);
let fn = debounce(test, 2000)
fn()