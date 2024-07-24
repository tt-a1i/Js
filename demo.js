function repeat(fn, delay, times){
  let count = 0
  function func(){
    if(count++ < times){
      fn()
      setTimeout(func, delay)
    }
  }
  func()
}
repeat(() => console.log(1), 1000, 5)