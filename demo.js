class Person{
    constructor(name){
        this.name = name
        this.queue = Promise.resolve()
    }
    say(){
        console.log('hello')
        return this
    }
    sleep(seconds){
        this.queue = this.queue.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('sleep')
                    resolve()
                }, seconds * 1000)
            })
        })
        return this
    }
    weak(){
        this.queue = this.queue.then(
            () => {
                return new Promise(resolve => {
                    console.log('weak')
                    resolve()
                })
            }
        )
        return this
    }
}
const person = new Person('tom')
person.say().sleep(3).weak()