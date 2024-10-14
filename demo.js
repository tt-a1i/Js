function Test(){

}
Test.prototype.fn = function(){
    console.log(1);
}
let test = new Test()
test.fn()

test.fn = function(){
    console.log(2)
}
test.fn()

console.log(test.prototype = {});
