function repeat(callback, delay, times){
    let count = 0
     function fn(){
        if(count < times){
            callback()
            count++
            setTimeout(fn, delay)
        }
    }
    fn()
}
repeat(() => console.log(1), 1000, 5)