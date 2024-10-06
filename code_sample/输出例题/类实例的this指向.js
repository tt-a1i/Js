var name = 2
class test{
    name = 1;
    test = () => {
        console.log(this.name)
    }
}
let n = new test()
n.test()