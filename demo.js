function isCycle(obj, set = new WeakSet()){
    if(!obj || typeof obj !== 'object') return false;
    if(set.has(obj)) return true;
    set.add(obj)
    for(let key in obj){
        if(isCycle(obj[key], set)){
            return true;
        }
    }
    return false;
}
const obj = {name:'a', friend: 'tom'}
console.log(isCycle(obj));



