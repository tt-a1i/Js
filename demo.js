function deepCopy(obj, map = new WeakMap()){
  if(obj === null || typeof obj !== 'object'){
    return obj
  }
  if(map.has(obj)) return map.get(obj);
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

const original = { name: "John", friends: ["Jane", "Bob"] };
original.self = original; // 创建一个循环引用
const clone = deepCopy(original);
console.log(clone);
console.log(clone.self === clone); // true，说明循环引用被正确处理