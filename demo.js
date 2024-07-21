function deepCopy(obj, map = new WeakMap()){
    if(obj !== 'object' || obj === null){
        return obj
    }
    
    if(map.has(obj)){
        return map.get(obj)
    } 
    let copy 
    if(Array.isArray(obj)){
        copy = []
        map.set(obj, copy)
        for(let i = 0; i < obj.length; i++){
            copy[i] = deepCopy(obj[i], map)
        }
    }else{
        copy = {}
        map.set(obj, copy)
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                copy[key] = deepCopy(obj[key], map)
            }
        }
    }
    return copy
}
let obj = {
    a: 1,
    b: [1,2,3],
    c: 'abc'
}
console.log(deepCopy(obj));