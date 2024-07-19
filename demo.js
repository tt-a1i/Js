function throttle(fn, delay){
    let timer = null
    return function(...args){
        if(!timer){
            fn.apply(this, args)
            setTimeout(() => {
                timer = null
            }, delay)
        }
    }
}
function debounce(fn, delay){
    let timer
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, ...args)
            timer = null
        }, delay)
    }
}