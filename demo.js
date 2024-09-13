//通过立即执行函数表达式（IIFE）创建一个新的作用域，
//将每次循环的 i 值传递给 IIFE，从而在每次迭代中捕获不同的 i 值。
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  })(i);
}
