function Demo1() {
    return function() {
        console.log(1)
    }
}
const d1 = new Demo1();

class Demo2 {}
const d2 = new Demo2();

d1()