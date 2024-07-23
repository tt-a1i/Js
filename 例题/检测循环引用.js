function detectCircularReference1(obj) {
	const seen = new WeakSet();
	function detect(value) {
		if (typeof value !== "object" || value === null) {
			return false;
		}

		if (seen.has(value)) {
			return true; // 发现循环引用
		}
		seen.add(value);

		for (let key in value) {
        //Object.prototype.hasOwnProperty.call(obj, key) 可以避免这些问题。
        //这种方式是在 Object.prototype 上找到原始的 hasOwnProperty 方法，并通过 call 方法将其应用到指定的对象 obj 上，
        //从而确保能够正确地判断对象自身是否具有指定的属性 key，而不受对象本身属性或原型链的影响。
        //例子:如果对象 foo 有一个自定义的 hasOwnProperty 方法返回false结果就不正确了
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
//简写版
function detectCircularReference(obj, set = new WeakSet()){
	if(obj === null || typeof obj !== 'object') return false;
	if(set.has(obj)) return true;
	set.add(obj);
	for(let key in obj){
	  if(Object.prototype.hasOwnProperty.call(obj, key)){
		if(detectCircularReference(obj[key], set)) return true;
	  }
	}
	return false;
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
