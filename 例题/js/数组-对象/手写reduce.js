function myReduce(array, callback, initialValue) {
    // 初始化累加器和索引变量
    let accumulator = initialValue;
    let startIndex = 0;

    // 如果没有提供初始值，使用数组的第一个元素作为初始值
    if (accumulator === undefined) {
        // 在数组为空的情况下，没有初始值会报错
        if (array.length === 0) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        accumulator = array[0];
        startIndex = 1;
    }

    // 迭代数组
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    // 返回累加器
    return accumulator;
}

// 测试自定义的 reduce 函数
const numbers = [1, 2, 3, 4];
const sum = myReduce(numbers, (acc, current) => acc + current, 0);
console.log(sum); // 输出 10