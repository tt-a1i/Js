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
}//win obj obj obj obj
//箭头函数的this是在创建时确定的,
var name = 'window'
obj.foo1()
obj.foo2()()
let fn = obj.foo2()
fn()