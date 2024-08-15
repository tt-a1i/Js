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
    off(event, listener){
        if(!this.events[event]){
            return;
        }
        this.events[event] = this.events[event].filter(l => l !== listener)
    }
    emit(event, ...args){
        if(!this.events[event]) return;
        this.events[event].forEach(l => l(args))
    }
}
function greet(name){
    console.log(`hello ${name}`);
}
const emitter = new EventEmitter()
emitter.on('greet', greet)
emitter.emit('greet', 'tom')