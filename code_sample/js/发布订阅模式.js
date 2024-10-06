class EventEmitter {
	static #instance = null; // 存储单例实例
    static #allowInstantiation = false; // 私有标志，控制实例化

    constructor() {
        if (!EventEmitter.#allowInstantiation) {
            throw new Error('Use EventEmitter.getInstance() to create an instance.');
        }
        this.events = {}; // 初始化 events 对象
    }

    static getInstance() {
        if (!EventEmitter.#instance) {
            EventEmitter.#allowInstantiation = true; // 允许实例化
            EventEmitter.#instance = new EventEmitter(); // 创建实例
            EventEmitter.#allowInstantiation = false; // 立即禁止实例化
        }
        return EventEmitter.#instance;
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

const emitter = EventEmitter.getInstance();

emitter.once('test', test)
emitter.emit('test', 2)
emitter.emit('test', 2)

emitter.on("welcome", say)
emitter.emit('welcome', 'tom')
emitter.off('welcome', say)
emitter.emit('welcome', 'tom')
