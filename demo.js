let person = {
    name: 'alice',
    age: 27,
    sayHello: function(){
        console.log('hello, my name is ' + this.name);
        
    }
}
let anotherPerson = Object.create(person)

console.log(anotherPerson.__proto__ === person);
console.log(anotherPerson.prototype === person.prototype);

anotherPerson.name = 'bob'
anotherPerson.age = 11
anotherPerson.sayHello()