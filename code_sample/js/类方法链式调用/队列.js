class Person {
    constructor(name) {
        this.name = name;
        this.queue = [];
        //用于控制队列的状态，确保任务按顺序一个接一个地执行
        //如果没有，每次添加任务到队列时都会立即调用next()
        //这可能导致多个任务几乎同时开始执行，特别是在任务非常快速或同步的情况下
        this.isRunning = false;
    }

    sayHi() {
        this.queue.push(() => {
            console.log(`hello ${this.name}`);
            this.next();
        });
        this.run();
        return this;
    }

    sleep(seconds) {
        this.queue.push(() => {
            setTimeout(() => {
                console.log('I am weak up');
                this.next();
            }, seconds * 1000);
        });
        this.run();
        return this;
    }

    weak() {
        this.queue.push(() => {
            console.log('I am weak');
            this.next();
        });
        this.run();
        return this;
    }

    run() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.next();
        }
    }

    next() {
        if (this.queue.length > 0) {
            const task = this.queue.shift();
            task();
        } else {
            this.isRunning = false;
        }
    }
}

// 示例使用
const person = new Person('Jack');
person.sayHi().sleep(3).weak();