Function.prototype.myApply = function(ctx, args){
    ctx = ctx || globalThis
    const f = Symbol()
    ctx[f] = this
    const res = ctx[f](...(args || []))
    delete ctx[f]
    return res
}
function say(a, b){
    console.log(this.name + ` ${a} + ${b}`)
}
say.myApply({name: 'tom'}, [1,2])
