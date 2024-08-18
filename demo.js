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
  setTimeout(fn, 1500)
