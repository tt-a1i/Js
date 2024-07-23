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
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  
    // 发布事件
    emit(event, ...args) {
      if (!this.events[event]) return;
      this.events[event].forEach(listener => listener(...args));
    }
  }
  
  // 示例使用
  const emitter = new EventEmitter();
  
  const greetListener = (name) => {
    console.log(`Hello, ${name}!`);
  };
  
  emitter.on('greet', greetListener);
  emitter.emit('greet', 'Alice');  // 输出: Hello, Alice!
  
  emitter.off('greet', greetListener);
  emitter.emit('greet', 'Bob');    // 没有输出，因为已经取消订阅
  