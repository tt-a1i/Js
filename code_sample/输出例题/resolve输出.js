function test(){
    console.log(1)
    setTimeout(() => console.log(2))
    Promise.resolve(3).then((val) => console.log(val))
    console.log(4)
}
test()