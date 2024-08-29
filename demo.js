class EventEmitter{
	constructor(){
		this.events = {}
	}
	on(event, listener){
		if(!this.events[event]){
			this.events[event] = []
		}
		this.events[event].push(listener)
	}
	destroy(event, listener){
		if(!this.events[event]) return;
		this.events[event] = this.events[event].filter(l => l !== listener)
	}
	emit(event, ...args){
		if(!this.events[event]) return;
		this.events[event].forEach(l => l(...args))
	}
}
const emitter1 = new EventEmitter()
const greet = name => console.log(name);
emitter1.on('greet', greet)
emitter1.emit('greet', 'tiger')
emitter1.destroy('greet', greet)
emitter1.emit('greet', 'tiger')

