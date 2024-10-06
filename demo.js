class EventEmitter{
    constructor(){
        this.events = {}
    }
    on(event, listener){
        (this.events[event] ??= new Set()).add(listener)
    }
    emit(event, ...args){
        this.events[event] ?. forEach(cb => cb(...args))
    }
    off(event, listener){
        this.events[event] ?. delete(listener)
    }
    once(event, listener){
        const onceListener = (...args) => {
            listener(...args)
            this.off(event, onceListener)
        }
        this.on(event, onceListener)
    }
}
// 示例使用
const say = (name) => console.log("hello " + name);
const test = (n) => console.log(n + n)

const emitter = new EventEmitter();

emitter.once('test', test)
emitter.emit('test', 2)
emitter.emit('test', 2)

emitter.on("welcome", say)
emitter.emit('welcome', 'tom')
emitter.off('welcome', say)
emitter.emit('welcome', 'tom')