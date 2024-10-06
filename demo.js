let activeEffect = null
export function effect(fn){
    activeEffect = fn
    fn()
    activeEffect = null
}

export function reactive(obj){
    const map = {}
    return new Proxy(obj, {
        get(target, key){
            if(activeEffect){
                if(!map[key]){
                    map[key] = []
                }
                map[key].push(activeEffect)
            }
            return target[key]
        },
        set(target, key, value){
            target[key] = value
            map[key] ?.forEach(fn => fn())
            return true
        }
    })
}
export function ref(value){
    return reactive({value})
}