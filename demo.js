function myNew(constructor, ...args){
    const obj = {}
    Object.setPrototypeOf(obj, constructor.prototype)
    const result = constructor.apply(obj, args)
    return result instanceof constructor ? result : obj
}