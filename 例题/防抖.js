//this 关键字的指向主要依赖于函数的调用方式，而非仅仅是它在哪里被定义。
//在你的 debounce 函数示例中，this 的指向并不固定，而是动态取决于函数的调用上下文, 箭头函数没有自己的this
function debounce(fn, delay){
    let timer
    //返回的是一个函数,所以下面的this取决于调用者所处的上下文环境
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