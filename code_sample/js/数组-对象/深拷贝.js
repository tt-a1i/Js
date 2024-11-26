/* function deepCopy(obj, hash = new WeakMap()) {
	// 如果 obj 不是对象（包括 null），直接返回 obj
    if (Object(obj) !== obj) return obj; // Handle primitives
    if (hash.has(obj)) return hash.get(obj); // Handle circular references
    let result;
    if (obj instanceof Set) {
        result = new Set();
        hash.set(obj, result);
        obj.forEach(value => result.add(deepCopy(value, hash)));
    } else if (obj instanceof Map) {
        result = new Map();
        hash.set(obj, result);
        obj.forEach((value, key) => result.set(deepCopy(key, hash), deepCopy(value, hash)));
    } else if (obj instanceof Date) {
        result = new Date(obj);
    } else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags);
    } else if (typeof obj === 'function') {
        result = obj.bind(null);
    } else if (Array.isArray(obj)) {
        result = [];
        hash.set(obj, result);
        obj.forEach((item, index) => result[index] = deepCopy(item, hash));
    } else {
        result = Object.create(Object.getPrototypeOf(obj));
        hash.set(obj, result);
        Reflect.ownKeys(obj).forEach(key => result[key] = deepCopy(obj[key], hash));
    }
    return result;
} */
function deepCopy(obj, hash = new WeakMap()) {
    // 如果 obj 不是对象（包括 null），直接返回 obj
    if (Object(obj) !== obj) return obj; // 处理原始值
    if (hash.has(obj)) return hash.get(obj); // Handle circular references

    let result;
    const objType = Object.prototype.toString.call(obj);

    switch (objType) {
        case '[object Set]':
            result = new Set();
            hash.set(obj, result);
            obj.forEach((value) => result.add(deepCopy(value, hash)));
            break;
        case '[object Map]':
            result = new Map();
            hash.set(obj, result);
            obj.forEach((value, key) => result.set(deepCopy(key, hash), deepCopy(value, hash)));
            break;
        case '[object Date]':
            result = new Date(obj);
            break;
        case '[object RegExp]':
            result = new RegExp(obj.source, obj.flags);
            break;
        case '[object Function]':
            result = obj.bind(null);
            break;
        case '[object Array]':
            result = [];
            hash.set(obj, result);
            obj.forEach((item, index) => (result[index] = deepCopy(item, hash)));
            break;
        default:
            // 创建一个新对象，继承自原对象的原型
            result = Object.create(Object.getPrototypeOf(obj));
            hash.set(obj, result);
            // 获取原对象的所有属性（包括不可枚举属性和符号属性）
            //只会获取对象自身的属性，不包括原型链上的属性。
            Reflect.ownKeys(obj).forEach((key) => (result[key] = deepCopy(obj[key], hash)));
            break;
    }

    return result;
}
// Example usage
const original = {
    number: 1,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    date: new Date(),
    regex: /test/gi,
    array: [1, 2, { nested: 'obj' }],
    set: new Set([1, 2, 3]),
    map: new Map([['key', 'value']]),
    func: function () {
        return 'function';
    },
    [Symbol('id')]: 123,
};
original.self = original; // Circular reference

const copied = deepCopy(original);
console.log(copied);
copied.array[2]['key'] = 'value';
console.log(copied.array[2]);
console.log(original.array[2]);
