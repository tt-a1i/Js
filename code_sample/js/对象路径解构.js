function flattenObject(obj, parentKey = '', result = []) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // 递归处理嵌套对象
                flattenObject(obj[key], newKey, result);
            } else {
                // 将路径和值添加到结果数组中
                result.push({ path: newKey, value: obj[key] });
            }
        }
    }
    return result;
}
// 示例使用
const obj = {
    a: "111",
    b: {
        c: "222",
        name: "peter",
        d: {
            e: "333",
            f: "444"
        }
    }
};

const flattenedArray = flattenObject(obj);
console.log(flattenedArray);