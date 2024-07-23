function repeat(callback, delay, times){
  let count = 0
  function fn(){
    if(count++ < times){
      callback()
      setTimeout(fn, delay)
    }
  }
  fn()
}
repeat(() => console.log(2), 1000, 5)