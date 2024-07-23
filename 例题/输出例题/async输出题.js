async function f1(){
    console.log(1);
}
async function f2(){
    console.log(2);
    await console.log(3);
    console.log(5);
}
function f3(){
    console.log(4);
}
f1()
f2()
f3()