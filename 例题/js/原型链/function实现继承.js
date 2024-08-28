// 超类（父类）
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

// 子类
function Dog(name, breed) {
    // 调用父类的构造函数
    Animal.call(this, name);
    this.breed = breed;
}

// 子类继承超类的方法
Dog.prototype = Object.create(Animal.prototype);
// 确保子类的构造函数指向是子类本身
Dog.prototype.constructor = Dog;

// 添加子类特有的方法
Dog.prototype.bark = function() {
    console.log(`${this.name} barks.`);
};

// 创建实例
const dog = new Dog('Rex', 'German Shepherd');
dog.speak();  // 输出: Rex makes a noise.
dog.bark();   // 输出: Rex barks.


/*Animal.call(this, name)：在子类构造函数中调用父类构造函数以初始化父类的属性。
Dog.prototype = Object.create(Animal.prototype)：创建一个Animal的原型副本，并将其赋值给Dog.prototype，这样Dog的实例可以继承Animal的原型方法。
Dog.prototype.constructor = Dog：因为上一步我们改变了Dog.prototype，所以需要重新设置constructor属性指向Dog本身。*/





/*class和extends实现继承 (ES6)
// 超类（父类）
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

// 子类
class Dog extends Animal {
    constructor(name, breed) {
        // 调用父类构造函数
        super(name);
        this.breed = breed;
    }

    bark() {
        console.log(`${this.name} barks.`);
    }
}

// 创建实例
const dog = new Dog('Rex', 'German Shepherd');
dog.speak();  // 输出: Rex makes a noise.
dog.bark();   // 输出: Rex barks.
*/