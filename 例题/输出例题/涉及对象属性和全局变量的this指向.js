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
  }
}
say()
obj.say()
obj.say = say
obj.say()
/*
111
window
window
222
111
222 */