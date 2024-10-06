class EventEmitter {
	constructor() {
		this.events = {};
	}
	// 订阅事件
	on(event, listener) {
		(this.events[event] ??= new Set()).add(listener)
	}
	// 取消订阅事件
	off(event, listener) {
		this.events[event]?.delete(listener)
	}
	// 发布事件
	emit(event, ...args) {
		this.events[event]?.forEach((listener) => listener(...args));
	}
	// 订阅一次事件，触发后自动取消订阅
    once(event, listener) {
        const onceListener = (...args) => {
            listener(...args);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
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
