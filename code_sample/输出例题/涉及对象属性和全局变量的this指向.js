var bar = 'window'
function say(){
  var bar = '111'
  console.log(bar);
  console.log(this.bar);
}
const obj = {
  bar: '222',
  say(){
    console.log(bar);
    console.log(this.bar);
  }//111 win win 222 111 222
}
say()
obj.say()
obj.say = say
obj.say()
