function canBeStrictlyDecreasing(arr) {
    // 辅助函数：检查数组是否严格递减
    function isStrictlyDecreasing(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] >= array[i - 1]) {
                return false;
            }
        }
        return true;
    }

    // 如果原数组已经严格递减，直接返回 true
    if (isStrictlyDecreasing(arr)) {
        return true;
    }

    // 尝试移除每一个元素，检查剩下的元素是否严格递减
    for (let i = 0; i < arr.length; i++) {
        let newArr = arr.slice(0, i).concat(arr.slice(i + 1));
        if (isStrictlyDecreasing(newArr)) {
            return true;
        }
    }

    // 如果没有找到满足条件的情况，返回 false
    return false;
}

// 测试
console.log(canBeStrictlyDecreasing([5, 3, 4, 2])); // true
console.log(canBeStrictlyDecreasing([5, 3, 2, 1])); // true
console.log(canBeStrictlyDecreasing([5, 5, 3, 2])); // true
console.log(canBeStrictlyDecreasing([1, 2, 3, 4])); // false
console.log(canBeStrictlyDecreasing([10, 5, 7, 4, 3])); // true
