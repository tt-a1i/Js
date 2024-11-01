class EventEmitter{
	constructor(){
		this.events = {}
	}
	on(event, listener){
		this.events[event] ??= []
		this.events[event].push(listener)
	}
	off(event, listener){
		this.events[event] = this.events[event].filter(item => item !== listener)
	}
	emit(event, ...args){
		this.events[event].forEach(f => f(...args))
	}
	once(event, listener){
		const onceListener = (...args) => {
			listener(...args)
			this.off(event, onceListener)
		}
		this.on(event, onceListener)
	}
}