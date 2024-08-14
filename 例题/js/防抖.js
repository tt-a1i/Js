//this 关键字的指向主要依赖于函数的调用方式，而非仅仅是它在哪里被定义。
//在你的 debounce 函数示例中，this 的指向并不固定，而是动态取决于函数的调用上下文, 箭头函数没有自己的this
function debounce(fn, delay){
  let timer = null;
  return function(...args){
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
          fn.apply(this, args)
          console.timeEnd()
      }, delay)
  }
}
let log = () => console.log(1)
let fn = debounce(log, 2000)
console.time()
fn()
setTimeout(fn, 1500)
setTimeout(fn, 3000)