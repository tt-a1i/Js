function getNestedProperty(obj, path, defaultValue = undefined) {
    // 将字符串路径分割为数组，以支持“a.b.c”或["a", "b", "c"]两种形式
    const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);

    // 使用 reduce 迭代路径数组
    return pathArray.reduce((accumulator, key) => {
        // 确保当前累加器是对象，并且键值存在
        if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, key)) {
            return accumulator[key];
        }
        // 如果路径不存在，则返回默认值
        return defaultValue;
    }, obj);
}

// 使用示例 
const data = {
    user: {
        profile: {
            name: 'Alice',
            age: 30
        }
    }
};

console.log(getNestedProperty(data, 'user.profile.name')); // 输出: Alice
console.log(getNestedProperty(data, ['user', 'profile', 'age'])); // 输出: 30
console.log(getNestedProperty(data, 'user.profile.occupation', 'unknown')); // 输出: unknown