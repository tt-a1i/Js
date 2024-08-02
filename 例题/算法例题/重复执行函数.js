function repeat(callback, delay, times){
    let count = 0
     function fn(){
        if(count < times){
            count++
            setTimeout(fn, delay)
            callback()
        }
    }
    fn()
}
repeat(() => console.log(1), 1000, 5)