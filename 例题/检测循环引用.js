function detectCircularReference(obj) {
    const seen = new WeakSet();
  
    function detect(value) {
      if (typeof value !== 'object' || value === null) {
        return false;
      }
  
      if (seen.has(value)) {
        return true; // 发现循环引用
      }
  
      seen.add(value);
  
      for (let key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          if (detect(value[key])) {
            return true;
          }
        }
      }
  
      return false;
    }
  
    return detect(obj);
  }
  
  // 使用示例
  const obj1 = { a: 1, b: 2 };
  console.log(detectCircularReference(obj1)); // false
  
  const obj2 = { a: 1 };
  obj2.self = obj2;
  console.log(detectCircularReference(obj2)); // true
  
  const obj3 = { a: { b: { c: {} } } };
  obj3.a.b.c.d = obj3.a;
  console.log(detectCircularReference(obj3)); // true