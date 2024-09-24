// 实现一个_get函数，它接受三个参数object, keypath, defaultValue
// object是个对象
// keypath是你的对象object的调用路径，它可能是属性的获取，可能是方法的调用，也有可能是数组元素的获取，调用的格式如有右所示：a.b[1].c(1,2)
// defaultValue是默认值，当获取的值为undefined时返回它。
// 最后返回通过keypath的调用路径获取的对象中的某个属性值或某个方法调用结果。
//type _get = (object: Object, keypath: string, defaultValue: any) => any;
function _get(object, keypath, defaultValue) {
    try {
        let funcBody;

        if (keypath.charAt(0) === '[') {
            funcBody = `return obj${keypath}`;
        } else {
            funcBody = `return obj.${keypath}`;
        }
        //new的新函数的 参数, 函数体
        const func = new Function('obj', funcBody);
        const result = func(object);

        return result === undefined ? defaultValue : result;
    } catch (err) {
        return defaultValue;
    }
}

// Example usage:
const obj = {
    a: {
        b: [
            { c: (x, y) => x + y },
            { d: 42 }
        ]
    }
};

const result1 = _get(obj, 'a.b[0].c(1, 2)', 'default'); // Should return 3
const result2 = _get(obj, 'a.b[1].d', 'default'); // Should return 42
const result3 = _get(obj, 'a.b[2]', 'default'); // Should return 'default'

console.log(result1); // Output: 3
console.log(result2); // Output: 42
console.log(result3); // Output: 'default'
