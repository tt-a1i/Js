function deepCopy(obj, map = new WeakMap()){
    if(!obj || typeof obj !== 'object') return obj;
    if(map.has(obj)) return map.get(obj);
    let copy = Array.isArray(obj) ? [] : {}
    map.set(obj, copy)
    if(Array.isArray(obj)){
        for(let i = 0; i < obj.length; i++){
            copy[i] = deepCopy(obj[i], map)
        }
    }else{
        for(let item in obj){
            copy[item] = deepCopy(obj[item], map)
        }
    }
    return copy;
}
const obj = {name:'a', friends:['tom', 'jerry']}
obj.self = obj;
const newObj = deepCopy(obj)
console.log(newObj);
console.log(newObj.self === newObj);


