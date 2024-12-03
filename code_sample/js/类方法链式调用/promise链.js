class Person {
    constructor(name) {
        this.name = name;
        this.queue = Promise.resolve();
    }
    sayHi() {
        this.queue = this.queue.then(() => {
            console.log(`hello ${this.name}`);
        });
        return this;
    }
    sleep(seconds) {
        this.queue = this.queue.then(() => {
            return new Promise(resolve => setTimeout(() => {
                console.log(`already sleep`)
                resolve()
            }, seconds * 1000));
        });
        return this;
    }
    weak() {
        this.queue = this.queue.then(() => {
            console.log('I am weak');
        });
        return this;
    }
}
// 示例使用
const person = new Person('Jack');
person.sayHi().sleep(3).weak();