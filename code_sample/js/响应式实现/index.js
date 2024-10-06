let activeEffect = null
export function effect(fn){
    //在执行fn更新页面数据时,会触发proxy的get,进而对依赖进行收集
    activeEffect = fn
    fn()
    activeEffect = null
}

export function reactive(obj){
    const effectMap = {}
    return new Proxy(obj, {
        get(target, key){
            if(activeEffect){
                if(!effectMap[key]){
                    effectMap[key] = []
                }
                effectMap[key].push(activeEffect)
            }
            console.log('收集依赖', key, activeEffect);
            return target[key]
        },
        set(target, key, val){
            console.log('派发更新');
            target[key] = val
            effectMap[key] ?.forEach(fn => fn());
            return true
        }
    })
}

export function ref(value){
    return reactive({value: value})
}