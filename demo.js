function func(fun, n, delay){
  let times = 0;
  let timer = null;
  return function cursive(){
    if(times === n){
      clearTimeout(timer);
      return;
    }
    timer = setTimeout(() => {
      fun();
      times++;
      cursive()
    }, delay)
  }
}
const fn = () => console.log(1)
let log = func(fn, 3, 1000)
log()
