/**
 * 深度比较两个值是否相等
 * @param {*} a - 第一个值
 * @param {*} b - 第二个值
 * @return {boolean} - 如果相等则返回 true，否则返回 false
 */
function deepEqual(a, b) {
    // 如果两个值严格相等，则返回 true
    if (a === b) return true;

    // 如果任一值为 null 或不是对象，则返回 false
    if (a === null || typeof a !== 'object' ||
        b === null || typeof b !== 'object') {
        return false;
    }

    // 获取两个对象的键
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // 如果键的数量不同，则对象不同
    if (keysA.length !== keysB.length) return false;

    // 检查所有键和值是否相等
    for (let key of keysA) {
        // 如果 b 没有 a 的键，则不同
        if (!keysB.includes(key)) return false;

        // 递归比较键对应的值
        if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
}
// 基本数据类型比较
console.log(deepEqual(1, 1)); // true
console.log(deepEqual(1, '1')); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(undefined, undefined)); // true
console.log(deepEqual(NaN, NaN)); // false （NaN !== NaN）

// 数组比较
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([1, 2, 3], [1, 2, '3'])); // false
console.log(deepEqual([1, 2], [1, 2, 3])); // false

// 对象比较
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };
console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false

// 混合类型比较
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })); // true
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, '3'] })); // false

// 不同类型对象比较
console.log(deepEqual({ a: 1 }, [ 'a', 1 ])); // false