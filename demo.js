var a = 1;
(
  function(){
    var a = 3;
    a = 2;
  }()
)
console.log(a);
