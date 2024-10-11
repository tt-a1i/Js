function Animal(name, type) {
    this.name = name;
    this.type = type
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

function Dog(name, type) {
    Animal.call(this, name, type); // 调用父构造函数
}
let dog = new Dog('a', 'c')
console.log(dog.type)
