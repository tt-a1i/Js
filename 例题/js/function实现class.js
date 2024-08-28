//function和prototype实现类
function Person(name){
    this.name = name;
}
Person.prototype.greet = function(){
    console.log(`Hello ${this.name}`);
}
const person1 = new Person('tom')
person1.greet()

//class实现同样的功能（ES6）
class Animal{
    constructor(name) {
        this.name = name
    }
    greet(){
        console.log(`Hello ${this.name}`);
    }
}
const animal1 = new Animal('tiger')
animal1.greet()