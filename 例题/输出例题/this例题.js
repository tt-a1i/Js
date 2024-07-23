var obj = {
    name: 'obj',
    foo1: () => {
        console.log(this.name);
    },
    foo2: function () {
        console.log(this.name)
        return () => {
            console.log(this.name);
        }
    }
}
var name = 'window'
obj.foo1()
obj.foo2()()
let fn = obj.foo2()
fn()