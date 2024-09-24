class EventEmitter {
	constructor() {
		this.events = {};
	}
	// 订阅事件
	on(event, listener) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
	}
	// 取消订阅事件
	off(event, listener) {
		if (!this.events[event]) return;
		this.events[event] = this.events[event].filter((l) => l !== listener);
	}
	// 发布事件
	emit(event, ...args) {
		if (!this.events[event]) return;
		this.events[event].forEach((listener) => listener(...args));
	}
}
// 示例使用
const say = (name) => console.log("hello " + name);
const greet = (name) => console.log("Greetings, " + name);

const emitter = new EventEmitter();

emitter.on("welcome", say);
emitter.on("welcome", greet); // Now there are two subscribers

emitter.emit("welcome", "Alice"); // Outputs: hello Alice, Greetings, Alice

// Unsubscribe a specific listener
emitter.off("welcome", greet);

emitter.emit("welcome", "Bob"); // Outputs: hello Bob
